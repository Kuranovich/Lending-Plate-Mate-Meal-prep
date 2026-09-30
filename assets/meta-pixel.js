/* ==========================================================
   Meta Pixel — ВКЛЮЧЁН, но только с согласия посетителя.

   Пиксель загружается только если ENABLED = true И посетитель нажал
   «Принять» в баннере согласия (assets/consent.js). ENABLED = false
   полностью отключает пиксель, баннер и ссылку на настройки. До согласия и при
   отказе к Meta не уходит ни одного запроса; noscript-вариант не используется.

   Что отправляется: стандартное событие PageView (адрес страницы) и стандартное
   событие Contact без параметров — при нажатии на ссылку WhatsApp или Telegram.
   Не отправляется: данные калькулятора, выбранный рацион, текст сообщения
   менеджеру, другие клики (autoConfig выключен), данные пользователя
   для расширенного подбора соответствий (fbq('init') вызывается без них).
   ========================================================== */
(function () {
  var PIXEL_ID = '1412387317769778';
  var ENABLED = true; // false — полностью отключить пиксель и баннер согласия
  var started = false;
  var granted = false; // согласие действует на этой странице (не отозвано)

  // Русская страница с ?lang=en сразу перенаправляется на /en/ (см. app.js) —
  // PageView отправит уже английская страница, здесь не дублируем.
  function isRedirecting() {
    return document.documentElement.lang === 'ru' &&
      new URLSearchParams(location.search).get('lang') === 'en';
  }

  // Согласие получено: загрузить пиксель и отправить один PageView за загрузку страницы
  function grant() {
    if (!ENABLED || isRedirecting()) return false;
    granted = true;
    if (started) {
      // согласие отозвали и снова дали на той же странице — продолжаем без повторного PageView
      if (window.fbq) fbq('consent', 'grant');
      return false;
    }
    started = true;
    // Пиксель уже установлен другим кодом — второй экземпляр и второй PageView не создаём
    if (window.fbq) return false;

    /* Официальный базовый код Meta Pixel (без noscript) */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('set', 'autoConfig', false, PIXEL_ID); // без автоматического обнаружения событий
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    return true;
  }

  // Согласие отозвано: приостановить отправку на этой странице и удалить cookie Meta.
  // При следующих загрузках пиксель не загружается — выбор хранит consent.js.
  function revoke() {
    granted = false;
    if (started && window.fbq) fbq('consent', 'revoke');
    var host = location.hostname;
    ['_fbp', '_fbc'].forEach(function (name) {
      [host, '.' + host, ''].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  // Клик по ссылке на WhatsApp или Telegram — заявка менеджеру. Отправляем только
  // стандартное событие Contact, без параметров: ни рациона, ни суммы, ни текста сообщения.
  document.addEventListener('click', function (e) {
    if (!granted || !window.fbq) return;
    var link = e.target.closest && e.target.closest('a[href^="https://wa.me/"], a[href^="https://t.me/"]');
    if (link) fbq('track', 'Contact');
  });

  window.PlateMatePixel = {
    isEnabled: function () { return ENABLED; },
    isRedirecting: isRedirecting,
    grantConsent: grant,
    revokeConsent: revoke,
  };
})();
