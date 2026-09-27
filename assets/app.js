/* ==========================================================
   Plate Mate — лендинг
   Все цены, БЖУ и контакты — в CONFIG.
   ========================================================== */
const CONFIG = {
  phoneDisplay: '+66 62 780 4528',
  whatsapp: '66627804528',                 // номер для wa.me без «+»
  telegram: 'okhealthyfood',               // username аккаунта менеджера в Telegram (без @)
  // БЖУ — диапазоны в граммах в день [от, до]: точные значения зависят от меню дня.
  plans: [
    { kcal: 1250, price: 750,  p: [85, 95],   f: [40, 50], c: [115, 130] },
    { kcal: 1500, price: 850,  p: [110, 120], f: [50, 60], c: [140, 160] },
    { kcal: 1800, price: 950,  p: [130, 140], f: [60, 70], c: [165, 180] },
    { kcal: 2000, price: 1050, p: [145, 160], f: [65, 75], c: [180, 210] },
    { kcal: 2200, price: 1150, p: [165, 180], f: [75, 85], c: [190, 210] },
  ],
  durations: [
    { days: 2,  discount: 0.30, trial: true },
    { days: 7,  discount: 0.05 },
    { days: 14, discount: 0.10 },
    { days: 30, discount: 0.15 },
  ],
  defaultKcal: 1500,
  defaultDays: 7,
  goalFactor: { lose: 0.85, keep: 1, gain: 1.1 },
  rangeTolerance: 100, // насколько ориентир может выходить за границы ассортимента
};

/* ---------- Меню на 14 дней: [завтрак, обед, ужин], у каждого блюда ru и en ---------- */
const MENU = [
  [['Гречка с омлетом, морковью по-корейски и фруктовым миксом', 'Buckwheat Omelette Breakfast'],
   ['Запечённое филе сибаса с рисом, овощами и свежим салатом', 'Baked Sea Bass with Vegetable Rice'],
   ['Куриные котлетки с запечённым картофелем и овощами под пармезаном', 'Chicken Cutlets with Roasted Potatoes']],
  [['Сочный омлет с грибами, томатами черри, овсянкой и фруктовым миксом', 'Creamy Mushroom Omelette'],
   ['Боул с лососем, рисом, овощами и соусом терияки', 'Teriyaki Salmon Bowl'],
   ['Куриные рулетики с ароматным кунжутом, зелёной гречкой и овощами по-тайски', 'Sesame Chicken Rolls with Green Buckwheat']],
  [['Ленивые вареники с ягодным соусом', 'Cottage Cheese Dumplings with Berry Sauce'],
   ['Куриное фрикасе с гречкой', 'Creamy Chicken Fricassee with Buckwheat'],
   ['Боул с лососем, киноа, гуакамоле и овощами', 'Salmon Quinoa Bowl with Guacamole']],
  [['Сливочный омлет с телятиной, зелёной гречкой и свежим салатом', 'Creamy Veal Omelette with Green Buckwheat'],
   ['Креветки в медовом соусе тахан с салатом нисуаз', 'Honey-Glazed Shrimp Tahan with Niçoise Salad'],
   ['Боул с курицей, киноа, гуакамоле, кукурузой и бобами', 'Chicken Quinoa Bowl with Guacamole']],
  [['Творожные маффины с яблоком, персиком, мёдом и фруктовым миксом', 'Homemade Cottage Cheese Muffins with Apple & Peach'],
   ['Спагетти терияки с курицей, овощами и кунжутом', 'Teriyaki Chicken Spaghetti with Vegetables'],
   ['Филе сибаса под пармезановой корочкой с запечённым картофелем и свежим овощным салатом', 'Parmesan-Crusted Sea Bass with Roasted Potatoes']],
  [['Запечённые яйца с гуакамоле, цельнозерновой овсянкой, морковью по-корейски и фруктовым миксом', 'Baked Eggs with Oatmeal & Guacamole'],
   ['Запечённый лосось с оливками, овощами и запечённым картофелем', 'Baked Salmon with Olives & Roasted Potatoes'],
   ['Курица с гречкой, томатами черри, соусом сальса и запечёнными овощами', 'Chicken with Buckwheat & Salsa']],
  [['Творожная запеканка с ягодным соусом', 'Cottage Cheese Flan with Berry Sauce'],
   ['Паста с курицей в сливочном соусе', 'Chicken Pasta in Creamy Sauce'],
   ['Чечевица с яйцом пашот, чесночными креветками и овощами', 'Lentils with Poached Egg & Garlic Shrimp']],
  [['Сырники-маффины с ягодным джемом и фруктовым миксом', 'Cheesecake Muffins with Berry Jam & Fruit Mix'],
   ['Митболы из телятины с булгуром, овощами по-мексикански и салатом со страчателлой', 'Veal Meatballs with Bulgur, Mexican Vegetables & Stracciatella Salad'],
   ['Запечённый сибас с киноа и овощами по-тайски', 'Baked Sea Bass with Quinoa & Thai-Style Vegetables']],
  [['Цельнозерновая овсянка с омлетом и творожной запеканкой с зеленью', 'Oatmeal & Omelette with Herb Cottage Cheese Bake'],
   ['Котлетки из телятины с гречкой, брокколи, грибами и овощами', 'Veal Cutlets with Buckwheat & Broccoli'],
   ['Боул с рисом, курицей, овощами и соусом терияки', 'Teriyaki Chicken Rice Bowl']],
  [['Творожная запеканка с яблоком, персиком, мёдом и фруктовым миксом', 'Homemade Cottage Cheese Bake with Apple & Peach'],
   ['Шашлык из куриного бедра с зелёной гречкой, овощами и томатной сальсой', 'Chicken Thigh Skewer with Green Buckwheat'],
   ['Соте из лосося и кальмаров с рисом и овощами', 'Salmon & Squid Rice Sauté']],
  [['Боул с лососем, киноа, яйцом и гуакамоле', 'Salmon Quinoa Bowl with Egg & Guacamole'],
   ['Курица с кунжутом, булгуром, овощами и салатом из красной капусты', 'Sesame Chicken with Bulgur'],
   ['Паэлья с креветками и морковью по-корейски', 'Shrimp Paella with Korean Carrot Salad']],
  [['Французский омлет с киноа, овощами и пармезаном', 'French Omelette with Quinoa & Vegetables'],
   ['Утиная грудка с апельсином, гречкой, овощами и кешью', 'Orange Duck Breast with Buckwheat'],
   ['Нежная курица с чечевицей и салатом из красной капусты', 'Tender Chicken with Lentils & Red Cabbage Salad']],
  [['Творожная запеканка с яблоком, персиком, мёдом и фруктовым миксом', 'Homemade Cottage Cheese Bake with Apple & Peach'],
   ['Боул с рисом, креветками, овощами и соусом терияки', 'Teriyaki Shrimp Rice Bowl'],
   ['Котлетки из телятины с булгуром и овощами по-тайски', 'Veal Cutlets with Thai-Style Bulgur']],
  [['Творожная запеканка с ягодным соусом', 'Homemade Cottage Cheese Bake with Berry Sauce'],
   ['Томлёные митболы из телятины с курагой, гречкой и запечённой морковью', 'Slow-Cooked Veal Meatballs with Buckwheat'],
   ['Запечённый сибас с киноа, морковью, спаржей и грибами', 'Baked Sea Bass with Quinoa']],
];

/* ---------- Строки, которые собираются в скрипте ----------
   Статические тексты уже вшиты в разметку: русские — в index.html,
   английские — в en/index.html (собирается tools/build-en.js). */
const STR = {
  ru: {
    kcalDay: 'ккал в день',
    kcal: 'ккал',
    protein: 'Белки', fat: 'Жиры', carbs: 'Углеводы', g: 'г',
    perDay: '/ день',
    totalFor: n => `Итого за ${daysLabel(n, 'ru')}`,
    choose: 'Выбрать', chosen: 'Выбрано',
    trial: 'пробных',
    durTrial: '2 пробных дня',
    days: n => daysLabel(n, 'ru'),
    daysTrial: n => `${n} пробных дня`,
    nearest: k => `Ближайший рацион — <b>${k} ккал</b>.`,
    chooseKcal: k => `Выбрать ${k} ккал`,
    above: (max) => `Ваш ориентир выше самого калорийного рациона (${max} ккал). Напишите менеджеру — обсудим подбор.`,
    below: (min) => `Ваш ориентир ниже самого лёгкого рациона (${min} ккал). Напишите менеджеру — обсудим, какой вариант подойдёт.`,
    discuss: 'Обсудить с менеджером',
    match: 'подходит', closest: 'ближайший', max: 'максимум',
    meals: ['Завтрак', 'Обед', 'Ужин'],
    dayN: n => `${n} день`,
    dayOf: (n, total) => `День ${n} из ${total}`,
    goal: { lose: 'снижение веса', keep: 'поддержание веса', gain: 'набор веса' },
    msg: s => [
      'Здравствуйте! Хочу заказать рацион Plate Mate.',
      `• Калорийность: ${s.kcal} ккал в день`,
      `• Срок: ${s.trial ? s.days + ' пробных дня' : daysLabel(s.days, 'ru')} (скидка ${s.pct}%)`,
      `• Стоимость: ${s.total} ฿ (${s.perDay} ฿ в день)`,
      ...(s.calc ? [`• По калькулятору: около ${s.calc.kcal} ккал, цель — ${s.calc.goal}`] : []),
      '',
      'Подскажите, пожалуйста, с какой даты можно начать доставку?',
    ].join('\n'),
    copied: 'Открываем Telegram. Текст также скопирован — если он не подставился, вставьте его в чат',
    copiedShort: 'Текст скопирован',
    copyFail: 'Не удалось скопировать — выделите текст вручную',
    menuOpen: 'Открыть меню', menuClose: 'Закрыть меню',
  },
  en: {
    kcalDay: 'kcal per day',
    kcal: 'kcal',
    protein: 'Protein', fat: 'Fat', carbs: 'Carbs', g: 'g',
    perDay: '/ day',
    totalFor: n => `Total for ${daysLabel(n, 'en')}`,
    choose: 'Choose', chosen: 'Selected',
    trial: 'trial',
    durTrial: '2 trial days',
    days: n => daysLabel(n, 'en'),
    daysTrial: n => `${n} trial days`,
    nearest: k => `The closest plan is <b>${k} kcal</b>.`,
    chooseKcal: k => `Choose ${k} kcal`,
    above: (max) => `Your guideline is above our highest plan (${max} kcal). Message our manager and we’ll find a solution together.`,
    below: (min) => `Your guideline is below our lightest plan (${min} kcal). Message our manager and we’ll discuss what suits you.`,
    discuss: 'Discuss with the manager',
    match: 'your plan', closest: 'closest', max: 'maximum',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    dayN: n => `Day ${n}`,
    dayOf: (n, total) => `Day ${n} of ${total}`,
    goal: { lose: 'weight loss', keep: 'weight maintenance', gain: 'weight gain' },
    msg: s => [
      'Hello! I’d like to order a Plate Mate meal plan.',
      `• Calories: ${s.kcal} kcal per day`,
      `• Duration: ${s.trial ? s.days + ' trial days' : daysLabel(s.days, 'en')} (${s.pct}% off)`,
      `• Price: ${s.total} ฿ (${s.perDay} ฿ per day)`,
      ...(s.calc ? [`• Calculator result: about ${s.calc.kcal} kcal, goal — ${s.calc.goal}`] : []),
      '',
      'Could you tell me when delivery can start?',
    ].join('\n'),
    copied: 'Opening Telegram. The text is also copied — if it isn’t filled in, paste it into the chat',
    copiedShort: 'Text copied',
    copyFail: 'Couldn’t copy — please select the text manually',
    menuOpen: 'Open menu', menuClose: 'Close menu',
  },
};

function daysLabel(n, lang) {
  if (lang === 'en') return `${n} ${n === 1 ? 'day' : 'days'}`;
  const m10 = n % 10, m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? 'день'
    : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'дня' : 'дней';
  return `${n} ${word}`;
}

/* ---------- Состояние ---------- */
const state = {
  lang: document.documentElement.lang === 'en' ? 'en' : 'ru', // язык задан разметкой страницы
  kcal: CONFIG.defaultKcal,
  days: CONFIG.defaultDays,
  calc: null, // { kcal, goal }
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const S = () => STR[state.lang];
const fmt = n => Math.round(n).toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'en-US');

function priceFor(kcal, days) {
  const plan = CONFIG.plans.find(p => p.kcal === kcal);
  const dur = CONFIG.durations.find(d => d.days === days);
  const total = Math.round(plan.price * days * (1 - dur.discount));
  return { plan, dur, total, perDay: Math.round(total / days), pct: Math.round(dur.discount * 100) };
}

/* ==========================================================
   Язык: русская версия — корень сайта, английская — /en/
   ========================================================== */
// Старые ссылки вида ?lang=en ведут на английскую страницу
if (state.lang === 'ru' && new URLSearchParams(location.search).get('lang') === 'en') {
  location.replace('en/' + location.hash);
}

/* ==========================================================
   Пакеты и сроки
   ========================================================== */
function renderDurations() {
  const box = $('#durations');
  box.innerHTML = CONFIG.durations.map(d => {
    const label = d.trial ? S().durTrial : S().days(d.days);
    return `<button type="button" class="duration" role="radio" aria-checked="${d.days === state.days}" data-days="${d.days}">
      ${label}<small>−${Math.round(d.discount * 100)}%</small></button>`;
  }).join('');
}

function renderPlans() {
  const s = S();
  const range = ([from, to]) => `${from}–${to}&nbsp;${s.g}`;
  $('#plansGrid').innerHTML = CONFIG.plans.map(p => {
    const { total, perDay, dur } = priceFor(p.kcal, state.days);
    const sel = p.kcal === state.kcal;
    return `<article class="plan${sel ? ' is-selected' : ''}" role="listitem" data-kcal="${p.kcal}">
      <div class="plan__kcal"><strong>${p.kcal}</strong><span>${s.kcalDay}</span></div>
      <ul class="plan__macros">
        <li><span>${s.protein}</span><b>${range(p.p)}</b></li>
        <li><span>${s.fat}</span><b>${range(p.f)}</b></li>
        <li><span>${s.carbs}</span><b>${range(p.c)}</b></li>
      </ul>
      <div class="plan__price">
        ${dur.discount ? `<s>${fmt(p.price)} ฿</s>` : ''}
        <strong>${fmt(perDay)} ฿</strong> <span>${s.perDay}</span>
      </div>
      <div class="plan__total">${s.totalFor(state.days)}<b>${fmt(total)} ฿</b></div>
      <button class="btn btn--primary" type="button" data-choose="${p.kcal}" aria-pressed="${sel}">${sel ? s.chosen : s.choose}</button>
    </article>`;
  }).join('');
}

function selectPlan(kcal) { state.kcal = kcal; renderPlans(); renderOrder(); }
function selectDays(days) { state.days = days; renderDurations(); renderPlans(); renderOrder(); }

$('#durations').addEventListener('click', e => {
  const b = e.target.closest('[data-days]');
  if (b) selectDays(+b.dataset.days);
});
$('#durations').addEventListener('keydown', e => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
  e.preventDefault();
  const list = CONFIG.durations.map(d => d.days);
  const i = list.indexOf(state.days);
  const next = list[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length];
  selectDays(next);
  $(`[data-days="${next}"]`).focus();
});

$('#plansGrid').addEventListener('click', e => {
  const btn = e.target.closest('[data-choose]');
  const card = e.target.closest('.plan');
  if (!card) return;
  selectPlan(+card.dataset.kcal);
  if (btn) $('#order').scrollIntoView({ behavior: 'smooth' });
});

// «Подобрать калорийность» — к калькулятору; на компьютере сразу ставим курсор в первое пустое поле
$$('[data-to-calc]').forEach(a => a.addEventListener('click', () => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const field = ['age', 'height', 'weight'].map(n => form.elements[n]).find(el => !el.value);
  if (field) setTimeout(() => field.focus({ preventScroll: true }), 700);
}));

// «Попробовать 2 дня −30%»
$$('[data-trial]').forEach(a => a.addEventListener('click', () => {
  const trial = CONFIG.durations.find(d => d.trial);
  if (trial) selectDays(trial.days);
}));

/* ==========================================================
   Калькулятор (Миффлин — Сан Жеор)
   ========================================================== */
const form = $('#calcForm');
let lastCalc = null;

function readForm() {
  const fd = new FormData(form);
  const num = k => parseFloat(String(fd.get(k)).replace(',', '.'));
  return {
    sex: fd.get('sex'), age: num('age'), height: num('height'), weight: num('weight'),
    activity: parseFloat(fd.get('activity')), goal: fd.get('goal'),
  };
}

function validate(d) {
  const rules = { age: [18, 80], height: [130, 220], weight: [35, 250] };
  let ok = true;
  Object.entries(rules).forEach(([k, [min, max]]) => {
    const bad = !(d[k] >= min && d[k] <= max);
    form.elements[k].classList.toggle('invalid', bad);
    form.elements[k].setAttribute('aria-invalid', String(bad));
    if (bad) ok = false;
  });
  $('#calcError').hidden = ok;
  return ok;
}

function calculate(d) {
  const bmr = 10 * d.weight + 6.25 * d.height - 5 * d.age + (d.sex === 'm' ? 5 : -161);
  const tdee = bmr * d.activity;
  const target = tdee * CONFIG.goalFactor[d.goal];
  const kcals = CONFIG.plans.map(p => p.kcal);
  const min = Math.min(...kcals), max = Math.max(...kcals);
  const nearest = kcals.reduce((a, b) => Math.abs(b - target) < Math.abs(a - target) ? b : a);
  const range = target > max + CONFIG.rangeTolerance ? 'above'
    : target < min - CONFIG.rangeTolerance ? 'below' : 'ok';
  return { bmr, tdee, target, nearest, range, min, max, goal: d.goal };
}

// Шкала рационов в карточке результата
// Шкала заполняется сверху вниз — от самого лёгкого рациона до ориентира.
function renderScale() {
  const s = S(), r = lastCalc;
  const k = CONFIG.plans.map(p => p.kcal), last = k.length - 1;
  const over = !!r && r.range === 'above';

  // позиция ориентира: 0 — первый рацион, 1 — последний, выход за край — при перевыполнении/недоборе
  let pos = 0;
  if (r) {
    if (r.target <= k[0]) pos = r.range === 'below' ? -0.07 : 0;
    else if (r.target >= k[last]) pos = over ? 1.07 : 1;
    else {
      const i = k.findIndex((v, j) => r.target >= v && r.target <= k[j + 1]);
      pos = (i + (r.target - k[i]) / (k[i + 1] - k[i])) / last;
    }
  }

  $('#scaleList').innerHTML = CONFIG.plans.map(p => {
    const match = r && p.kcal === r.nearest;
    const filled = r && (over || p.kcal <= r.target);
    const badgeText = !match ? '' : over ? s.max : r.range === 'ok' ? s.match : s.closest;
    const badge = badgeText ? `<em class="scale__badge">${badgeText}</em>` : '';
    return `<li><button type="button" class="scale__row${match ? ' is-match' : ''}${filled ? ' is-filled' : ''}" data-kcal="${p.kcal}" aria-label="${s.chooseKcal(p.kcal)}">
      <span class="scale__dot"></span><span class="scale__kcal"><b>${p.kcal}</b> ${s.kcal}</span>${badge}
      <span class="scale__price">${fmt(p.price)} ฿ ${s.perDay}</span></button></li>`;
  }).join('');

  $('#scale').classList.toggle('is-over', over);
  $('#scaleFill').style.height = `${(Math.max(0, pos) * 100).toFixed(2)}%`;
  const marker = $('#scaleMarker');
  marker.hidden = !r;
  marker.style.top = `${(pos * 100).toFixed(2)}%`;
}

$('#scaleList').addEventListener('click', e => {
  const row = e.target.closest('[data-kcal]');
  if (!row) return;
  selectPlan(+row.dataset.kcal);
  $('#plans').scrollIntoView({ behavior: 'smooth' });
});

function renderCalc() {
  renderScale();
  if (!lastCalc) return;
  const s = S(), r = lastCalc;
  $('#resultEmpty').hidden = true;
  $('#resultFull').hidden = false;
  $('#scaleHint').hidden = true;
  $('#resultPlan').hidden = false;
  $('#rKcal').textContent = fmt(r.target);
  $('#rBmr').textContent = `${fmt(r.bmr)} ${s.kcal}`;
  $('#rTdee').textContent = `${fmt(r.tdee)} ${s.kcal}`;
  $('#rGoal').textContent = `${fmt(r.target)} ${s.kcal}`;
  $('#rText').innerHTML = r.range === 'ok' ? s.nearest(r.nearest)
    : r.range === 'above' ? s.above(r.max) : s.below(r.min);
  $('#rChoose').textContent = r.range === 'ok' ? s.chooseKcal(r.nearest) : s.discuss;
}

function runCalc(animate) {
  const d = readForm();
  if (!validate(d)) return false;
  lastCalc = calculate(d);
  state.calc = { kcal: Math.round(lastCalc.target), goalKey: d.goal };
  renderCalc();
  renderOrder();
  if (animate) {
    ['#resultFull', '#resultPlan'].forEach(sel => {
      const el = $(sel);
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    });
  }
  return true;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (runCalc(true) && window.matchMedia('(max-width: 1024px)').matches) {
    $('#calcResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
// после первого расчёта результат обновляется на лету
form.addEventListener('change', () => { if (lastCalc) runCalc(false); });
form.addEventListener('input', e => {
  if (e.target.classList.contains('invalid')) e.target.classList.remove('invalid');
});

$('#rChoose').addEventListener('click', () => {
  if (!lastCalc) return;
  selectPlan(lastCalc.nearest);
  $(lastCalc.range === 'ok' ? '#plans' : '#order').scrollIntoView({ behavior: 'smooth' });
});

/* ==========================================================
   Заказ и сообщение менеджеру
   ========================================================== */
const msgEl = $('#orderMessage');

function buildMessage() {
  const s = S();
  const { total, perDay, pct, dur } = priceFor(state.kcal, state.days);
  return s.msg({
    kcal: state.kcal, days: state.days, trial: !!dur.trial, pct,
    total: fmt(total), perDay: fmt(perDay),
    calc: state.calc ? { kcal: fmt(state.calc.kcal), goal: s.goal[state.calc.goalKey] } : null,
  });
}

// Ссылки с уже подставленным текстом сообщения
function updateChatLinks() {
  const text = encodeURIComponent(msgEl.value);
  $('#btnWa').href = `https://wa.me/${CONFIG.whatsapp}?text=${text}`;
  $('#btnTg').href = `https://t.me/${CONFIG.telegram}?text=${text}`;
}

function renderOrder() {
  const s = S();
  const { total, perDay, dur } = priceFor(state.kcal, state.days);
  const daysText = dur.trial ? s.daysTrial(state.days) : s.days(state.days);
  $('#sPlan').textContent = `${state.kcal} ${s.kcal}`;
  $('#sDays').textContent = `${daysText} · −${Math.round(dur.discount * 100)}%`;
  $('#sPerDay').textContent = `${fmt(perDay)} ฿`;
  $('#sTotal').textContent = `${fmt(total)} ฿`;
  $('#barPlan').textContent = `${state.kcal} ${s.kcal} · ${daysText}`;
  $('#barTotal').textContent = `${fmt(total)} ฿ · ${fmt(perDay)} ฿ ${s.perDay}`;
  msgEl.value = buildMessage();
  updateChatLinks();
}

msgEl.addEventListener('input', updateChatLinks);

async function copyMessage() {
  try {
    await navigator.clipboard.writeText(msgEl.value);
    return true;
  } catch (e) {
    msgEl.select();
    try { return document.execCommand('copy'); } catch (err) { return false; }
  }
}

$('#btnTg').addEventListener('click', async () => {
  // Текст уже в ссылке; копируем на случай старых версий Telegram, которые его не подставляют
  if (await copyMessage()) toast(S().copied);
});
$('#btnCopy').addEventListener('click', async () => {
  toast((await copyMessage()) ? S().copiedShort : S().copyFail);
});

let toastTimer;
function toast(text) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ==========================================================
   Шапка, меню, язык
   ========================================================== */
const burger = $('.burger');
function toggleNav(open) {
  document.body.classList.toggle('nav-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? S().menuClose : S().menuOpen);
}
burger.addEventListener('click', () => toggleNav(!document.body.classList.contains('nav-open')));
$$('#nav a').forEach(a => a.addEventListener('click', () => toggleNav(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleNav(false); });

/* ==========================================================
   Прокрутка: шапка, мобильная панель, движение фото
   ========================================================== */
const header = $('#header');
const stickyBar = $('#stickyBar');
const plansSec = $('#plans');
const orderSec = $('#order');
const motionEls = $$('[data-motion]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// SMIL-анимацию скутера CSS не останавливает — ставим на паузу вручную
if (reduceMotion.matches) $$('.delivery__art svg').forEach(svg => svg.pauseAnimations && svg.pauseAnimations());

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 8);

  const vh = window.innerHeight;
  const plansTop = plansSec.getBoundingClientRect().top;
  const orderTop = orderSec.getBoundingClientRect().top;
  const showBar = plansTop < vh * 0.4 && orderTop > vh * 0.85;
  stickyBar.classList.toggle('show', showBar);
  stickyBar.setAttribute('aria-hidden', String(!showBar));
  stickyBar.querySelector('a').tabIndex = showBar ? 0 : -1;

  if (reduceMotion.matches) return;
  for (const el of motionEls) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
    el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { onScroll(); ticking = false; });
}, { passive: true });
window.addEventListener('resize', onScroll);

// Появление блоков
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
} else {
  $$('.reveal').forEach(el => el.classList.add('in'));
}

/* ==========================================================
   Старт
   ========================================================== */
/* ==========================================================
   Меню на 14 дней: слайды с прокруткой (свайп на телефоне), стрелки и номера дней
   ========================================================== */
const MEAL_ICONS = [
  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1.5-3 4-3 7v3h3"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
];
const menuTrack = $('#menuTrack');
let menuIndex = 0;

function renderMenu() {
  const s = S(), li = state.lang === 'en' ? 1 : 0, total = MENU.length;
  menuTrack.innerHTML = MENU.map((day, d) => `
    <article class="mday" role="group" aria-roledescription="slide" aria-label="${s.dayOf(d + 1, total)}">
      <div class="mday__head"><p class="mday__badge">${s.dayN(d + 1)}</p></div>
      <div class="mday__meals">
        ${day.map((dish, m) => `
          <div class="mday__meal">
            <span class="mday__icon" aria-hidden="true">${MEAL_ICONS[m]}</span>
            <div><p class="mday__label">${s.meals[m]}</p><p class="mday__dish">${dish[li]}</p></div>
          </div>`).join('')}
      </div>
    </article>`).join('');
  updateMenuUi();
}

function updateMenuUi() {
  const total = MENU.length;
  $('#menuCount').textContent = S().dayOf(menuIndex + 1, total);
  $('#menuPrev').disabled = menuIndex === 0;
  $('#menuNext').disabled = menuIndex === total - 1;
  // текущий день яркий, соседние приглушены — видно при перелистывании
  $$('.mday', menuTrack).forEach((el, i) => el.classList.toggle('is-current', i === menuIndex));
}

function goToDay(i) {
  menuIndex = Math.max(0, Math.min(MENU.length - 1, i));
  menuTrack.scrollTo({ left: menuIndex * menuTrack.clientWidth, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  updateMenuUi();
}

$('#menuPrev').addEventListener('click', () => goToDay(menuIndex - 1));
$('#menuNext').addEventListener('click', () => goToDay(menuIndex + 1));
menuTrack.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { e.preventDefault(); goToDay(menuIndex + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); goToDay(menuIndex - 1); }
});
// свайп: после прокрутки определяем, какой день в кадре
let menuScrollTimer;
menuTrack.addEventListener('scroll', () => {
  clearTimeout(menuScrollTimer);
  menuScrollTimer = setTimeout(() => {
    const i = Math.round(menuTrack.scrollLeft / menuTrack.clientWidth);
    if (i !== menuIndex) { menuIndex = i; updateMenuUi(); }
  }, 80);
}, { passive: true });
window.addEventListener('resize', () => { menuTrack.scrollLeft = menuIndex * menuTrack.clientWidth; });

function renderAll() {
  renderMenu();
  renderDurations();
  renderPlans();
  renderCalc();
  renderOrder();
}

renderAll();
onScroll();
