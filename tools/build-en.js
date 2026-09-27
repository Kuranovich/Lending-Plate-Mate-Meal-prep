// Собирает английскую версию сайта en/index.html из русской index.html.
// Тексты берутся из tools/i18n-en.js по ключам data-i18n и data-i18n-attr.
// Заодно проставляет в index.html версии стилей и скрипта (?v=хеш), чтобы браузеры
// не брали из кэша старые файлы после обновления сайта.
// Запуск из корня проекта: node tools/build-en.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const EN = require('./i18n-en.js');
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 0. Версии файлов: хеш содержимого меняется при каждой правке
for (const file of ['assets/styles.css', 'assets/meta-pixel.js', 'assets/consent.js', 'assets/app.js']) {
  const hash = crypto.createHash('md5').update(fs.readFileSync(path.join(root, file))).digest('hex').slice(0, 8);
  const re = new RegExp(`(["/])${file.replace(/[./]/g, '\\$&')}(\\?v=\\w+)?"`, 'g');
  if (!re.test(html)) { console.error(`Не найдена ссылка на ${file} в index.html`); process.exit(1); }
  html = html.replace(re, `$1${file}?v=${hash}"`);
}
fs.writeFileSync(indexPath, html);

const missing = new Set();
const used = new Set();
const t = key => {
  if (!(key in EN)) { missing.add(key); return null; }
  used.add(key);
  return EN[key];
};
const attrEscape = s => String(s).replace(/&(?!\w+;|#\d+;)/g, '&amp;').replace(/"/g, '&quot;');

// 1. Содержимое элементов с data-i18n
html = html.replace(
  /<(\w+)((?:\s[^>]*?)?\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
  (m, tag, attrs, key, inner) => {
    const v = t(key);
    return v == null ? m : `<${tag}${attrs}>${v}</${tag}>`;
  }
);

// 2. Атрибуты из data-i18n-attr="attr:key;attr2:key2"
html = html.replace(/<[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tagStr, spec) => {
  for (const pair of spec.split(';')) {
    const [attr, key] = pair.split(':');
    const v = t(key);
    if (v == null) continue;
    tagStr = tagStr.replace(new RegExp(`(\\s${attr}=")[^"]*"`), (_, pre) => `${pre}${attrEscape(v)}"`);
  }
  return tagStr;
});

// 3. Язык документа
html = html.replace('<html lang="ru">', '<html lang="en">');

// 4. Относительные пути к файлам: страница лежит на уровень глубже
html = html.replace(/(\s(?:src|href)=")(assets\/|images\/|favicon\.ico)/g, '$1../$2');

// 5. Собственный адрес страницы (canonical, og:url) — /en/
html = html.replace(/<[^>]*\sdata-self-url[^>]*>/g, tagStr =>
  tagStr.replace(/(\s(?:href|content)=")([^"]*)"/, (_, pre, url) => `${pre}${url}en/"`));

// 6. Переключатель языка
const switchRu = '<a href="./" hreflang="ru" lang="ru" aria-current="page">RU</a>';
const switchEn = '<a href="en/" hreflang="en" lang="en">EN</a>';
if (!html.includes(switchRu) || !html.includes(switchEn)) {
  console.error('Не найден переключатель языка в index.html');
  process.exit(1);
}
html = html
  .replace(switchRu, '<a href="../" hreflang="ru" lang="ru">RU</a>')
  .replace(switchEn, '<a href="./" hreflang="en" lang="en" aria-current="page">EN</a>');

html = html.replace('<!doctype html>',
  '<!doctype html>\n<!-- Сгенерировано tools/build-en.js из index.html. Не редактируйте вручную: правьте index.html и tools/i18n-en.js, затем запустите node tools/build-en.js -->');

if (missing.size) {
  console.error('Нет перевода для ключей:\n  ' + [...missing].join('\n  '));
  process.exit(1);
}

fs.mkdirSync(path.join(root, 'en'), { recursive: true });
fs.writeFileSync(path.join(root, 'en', 'index.html'), html);

const unused = Object.keys(EN).filter(k => !used.has(k));
console.log(`en/index.html собран: ${used.size} переводов`);
if (unused.length) console.log('Не используются в разметке: ' + unused.join(', '));
