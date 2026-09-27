/* ==========================================================
   Согласие на маркетинговое отслеживание (Meta Pixel).

   - Первый визит: баннер с равнозначными кнопками «Отклонить» и «Принять»,
     ничего не выбрано заранее, пиксель не загружается.
   - Выбор хранится в localStorage (pm-consent) и действует при следующих визитах.
   - «Настройки конфиденциальности» в футере открывают баннер снова:
     можно дать согласие или отозвать его.
   - Пока в assets/meta-pixel.js ENABLED = false, баннер и ссылка в футере
     не показываются: не спрашиваем согласие на то, что не используется.
   ========================================================== */
(function () {
  var KEY = 'pm-consent';
  var pixel = window.PlateMatePixel;
  var banner = document.getElementById('consent');
  if (!pixel || !banner || !pixel.isEnabled() || pixel.isRedirecting()) return;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return v && (v.marketing === 'granted' || v.marketing === 'denied') ? v.marketing : null;
    } catch (e) { return null; }
  }
  function save(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, marketing: choice, at: new Date().toISOString() })); }
    catch (e) { /* без хранилища выбор действует только до перезагрузки */ }
  }

  // Высота баннера — чтобы под ним можно было докрутить страницу и не перекрыть панель заказа
  var root = document.documentElement;
  var ro = 'ResizeObserver' in window
    ? new ResizeObserver(function () { root.style.setProperty('--consent-h', banner.offsetHeight + 'px'); })
    : null;

  function show(fromSettings) {
    var current = read();
    banner.querySelectorAll('[data-consent-status]').forEach(function (el) {
      el.hidden = !fromSettings || el.getAttribute('data-consent-status') !== current;
    });
    banner.hidden = false;
    document.body.classList.add('has-consent');
    root.style.setProperty('--consent-h', banner.offsetHeight + 'px');
    if (ro) ro.observe(banner);
    if (fromSettings) banner.querySelector('[data-consent]').focus();
  }
  function hide() {
    banner.hidden = true;
    document.body.classList.remove('has-consent');
    root.style.setProperty('--consent-h', '0px');
    if (ro) ro.unobserve(banner);
  }

  banner.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;
    var choice = btn.getAttribute('data-consent');
    var before = read();
    save(choice);
    hide();
    if (choice === 'granted') pixel.grantConsent();
    else if (before === 'granted') pixel.revokeConsent();
  });

  // Ссылка «Настройки конфиденциальности» и описание Meta Pixel в футере
  document.querySelectorAll('[data-consent-ui]').forEach(function (el) { el.hidden = false; });
  document.querySelectorAll('[data-consent-open]').forEach(function (el) {
    el.addEventListener('click', function () { show(true); });
  });

  var choice = read();
  if (choice === 'granted') pixel.grantConsent();
  else if (choice === null) show(false);
})();
