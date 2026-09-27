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

/* ---------- Переводы ----------
   Русский текст берётся прямо из HTML, здесь — английский
   и строки, которые собираются в скрипте. */
const EN = {
  'meta.title': 'Plate Mate — daily meal plans delivered in Pattaya',
  'meta.description': 'Ready-made daily meal plans: breakfast, lunch and dinner with clear calories and macros. Five calorie options, free delivery in Pattaya every two days.',
  'nav.label': 'Page navigation',
  'nav.open': 'Open menu',
  'nav.approach': 'Approach',
  'nav.menu': 'Menu',
  'nav.calc': 'Calculator',
  'nav.plans': 'Pricing',
  'nav.delivery': 'Delivery',
  'nav.faq': 'FAQ',
  'cta.choose': 'Choose a plan',

  'hero.eyebrow': 'Meal plan delivery · Pattaya',
  'hero.title': 'Taking care of yourself starts with everyday food',
  'hero.lead': 'Ready-made daily meal plans — breakfast, lunch and dinner — with clear calories and macros. Five calorie options and free delivery in Pattaya every two days.',
  'hero.btnCalc': 'Find my plan',
  'hero.btnTrial': 'Try 2 days −30%',
  'hero.fact1': 'kcal a day — five options',
  'hero.fact2': 'meals every day',
  'hero.fact3n': '0&nbsp;฿',
  'hero.fact3': 'delivery every two days',
  'hero.alt': 'Salmon with asparagus, shrimp salad and shrimp pasta',
  'hero.chipFrom': 'from',
  'hero.chipDay': 'a day',

  'approach.eyebrow': 'Our approach',
  'approach.title': 'The benefit is in the ingredients, portions and routine',
  'approach.lead': 'We don’t promise miracles. We make eating well every day simple: clear ingredients, balanced portions and three meals a day.',
  'approach.f1.title': 'Protein and clear macro targets',
  'approach.f1.text': 'Every plan lists calories, protein, fat and carbs. Our dishes are built around protein sources — cottage cheese, chicken, duck, veal and fish. We don’t use pork. You know what you eat without counting or weighing.',
  'approach.f2.title': 'Balanced portions and five calorie options',
  'approach.f2.text': 'From 1250 to 2200 kcal a day. Portion sizes depend on the plan, so it’s easy to match your goal — losing, maintaining or gaining weight.',
  'approach.f3.title': 'Full breakfast, lunch and dinner every day',
  'approach.f3.text': 'Food for the whole day, not separate dishes. Regular meals help you build a calm routine without snacking on the go.',

  'menu.eyebrow': 'A sample day',
  'menu.title': 'One day with Plate Mate',
  'menu.lead': 'Real dishes from our menu. The menu and portion sizes depend on the plan you choose.',
  'menu.breakfast': 'Breakfast',
  'menu.lunch': 'Lunch',
  'menu.dinner': 'Dinner',
  'menu.d1.name': 'Cottage cheese muffins with fruit',
  'menu.d1.text': 'Baked cottage cheese muffins with sauce and fresh fruit — mandarin and dragon fruit. Protein in the morning and the natural sweetness of fruit.',
  'menu.d2.name': 'Veal meatballs with bulgur',
  'menu.d2.text': 'Veal meatballs in sauce, bulgur with peas, corn and carrots, cherry tomatoes with soft cheese and pesto. A filling lunch with protein and complex carbs.',
  'menu.d3.name': 'Baked sea bass with quinoa',
  'menu.d3.text': 'Baked sea bass fillet with lemon, quinoa and julienned vegetables — carrot, pepper, asparagus. A light dinner with fish protein.',

  'calc.eyebrow': 'Calorie calculator',
  'calc.title': 'Find a plan for your goal',
  'calc.lead': 'No sign-up, no phone number. The result is a guideline — you can discuss the final choice with our manager.',
  'calc.sex': 'Sex',
  'calc.female': 'Female',
  'calc.male': 'Male',
  'calc.age': 'Age',
  'calc.years': 'yrs',
  'calc.height': 'Height',
  'calc.cm': 'cm',
  'calc.weight': 'Weight',
  'calc.kg': 'kg',
  'calc.activity': 'Activity',
  'calc.act1': 'Minimal — desk job, no workouts',
  'calc.act2': 'Light — 1–3 workouts a week',
  'calc.act3': 'Moderate — 3–5 workouts a week',
  'calc.act4': 'High — 6–7 workouts a week',
  'calc.act5': 'Very high — physical work and sport',
  'calc.goal': 'Goal',
  'calc.lose': 'Lose weight',
  'calc.keep': 'Maintain',
  'calc.gain': 'Gain',
  'calc.error': 'Please check: age 18–80, height 130–220 cm, weight 35–250 kg.',
  'calc.submit': 'Calculate',
  'calc.empty': 'Fill in the form and we’ll mark your guideline and the matching plan on the scale.',
  'calc.scaleEyebrow': 'Our plans',
  'calc.scaleTitle': 'Five plans — from 1250 to 2200&nbsp;kcal',
  'calc.privacy': 'Your data isn’t sent anywhere — the calculation runs in your browser',
  'calc.yourNeed': 'Your guideline',
  'calc.kcalDay': 'kcal/day',
  'calc.bmr': 'Basal metabolic rate',
  'calc.withAct': 'With activity',
  'calc.withGoal': 'With your goal',
  'calc.note': 'Calculated with the Mifflin–St Jeor equation, adjusted for activity and goal. This is an approximate guideline, not medical advice.',

  'plans.eyebrow': 'Plans and pricing',
  'plans.title': 'Choose calories and duration',
  'plans.lead': 'Prices are for a full day: breakfast, lunch and dinner. Delivery is free.',
  'plans.durationLabel': 'Duration',
  'plans.helpTitle': 'Not sure how many calories you need?',
  'plans.helpText': 'The calculator gives you a guideline in a minute — based on your height, weight, activity and goal. No sign-up, no phone number.',
  'plans.helpBtn': 'Find my calories',
  'plans.note': 'Macros are shown as daily ranges: exact values depend on the day’s menu. Duration discounts don’t stack. Our manager will confirm the start date and any dietary details.',

  'delivery.eyebrow': 'Delivery',
  'delivery.title': 'How it works',
  'delivery.s1.t': 'Choose a plan',
  'delivery.s1.p': 'Pick calories and duration — yourself or with the calculator.',
  'delivery.s2.t': 'Message our manager',
  'delivery.s2.p': 'On WhatsApp or Telegram — we’ll prepare a message with your choice.',
  'delivery.s3.t': 'Confirm the details',
  'delivery.s3.p': 'The manager will confirm the start date, address and dietary details.',
  'delivery.s4.t': 'Get your meals',
  'delivery.s4.p': 'Free delivery in Pattaya every two days.',
  'delivery.alt': 'Illustration: a courier on a scooter delivering meals around Pattaya',
  'delivery.free': 'Free',
  'delivery.freeText': 'We deliver your meals in Pattaya every two days. The start date and address are agreed with the manager.',

  'faq.title': 'FAQ',
  'faq.q1': 'What are the dishes made of?',
  'faq.a1': 'A sample day: cottage cheese muffins with fruit, veal meatballs with bulgur and baked sea bass with quinoa. Our dishes are based on cottage cheese, chicken, duck, veal and fish; we don’t use pork. The manager will send you the full ingredients of every dish before you order. The menu and portion sizes depend on your plan.',
  'faq.q2': 'Can you take allergies or foods I don’t eat into account?',
  'faq.a2': 'Please tell the manager about any allergies or restrictions before you order. They will tell you which ingredients the dishes contain and honestly say whether a suitable option is possible.',
  'faq.q3': 'How should I store the meals?',
  'faq.a3': 'Put your meals in the fridge right after delivery. Storage conditions and shelf life are on the packaging — if anything is unclear, the manager will help.',
  'faq.q4': 'How do I reheat the dishes?',
  'faq.a4': 'Hot dishes just need reheating in a microwave. Reheating instructions are on the packaging.',
  'faq.q5': 'How do I choose the calories?',
  'faq.a5': 'Use the <a href="#calculator">calculator</a> — it shows an approximate guideline and the closest plan. You can also pick a plan yourself, and if you’re unsure, the manager will help you decide.',
  'faq.q6': 'I have high cholesterol. Is the plan right for me?',
  'faq.a6': 'Plate Mate plans are balanced everyday food, not a therapeutic diet, and we don’t promise changes in test results. If you have recommendations from your doctor, share them with the manager: we’ll show you the ingredients so you can decide together with your doctor.',
  'faq.q7': 'How often do you deliver?',
  'faq.a7': 'Every two days, free of charge within Pattaya. The manager will agree the first delivery date and address with you.',

  'order.eyebrow': 'Your choice',
  'order.title': 'One step left — message our manager',
  'order.plan': 'Plan',
  'order.duration': 'Duration',
  'order.perDay': 'Price per day',
  'order.total': 'Total',
  'order.change': 'Change selection',
  'order.msgLabel': 'Message for the manager — check it and send it yourself',
  'order.copy': 'Copy message text',
  'order.hint': 'The message is filled in automatically in WhatsApp and Telegram — just check it and press send.',

  'footer.about': 'Ready-made meal plans with delivery. Pattaya, Thailand.',
  'footer.contacts': 'Contacts',
  'footer.dataTitle': 'About calculator data',
  'footer.data': 'Age, height and weight are processed only in your browser and are never sent anywhere. We receive your order details only when you send a message to the manager yourself.',
  'footer.disclaimer': 'Plate Mate meal plans are not a therapeutic diet and do not replace a doctor’s advice.',
  'bar.cta': 'Order',
};

// Строки, которые формируются в скрипте
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
  lang: 'ru',
  kcal: CONFIG.defaultKcal,
  days: CONFIG.defaultDays,
  calc: null, // { kcal, goal }
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const S = () => STR[state.lang];
const fmt = n => Math.round(n).toLocaleString(state.lang === 'ru' ? 'ru-RU' : 'en-US');

const storage = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
};

function priceFor(kcal, days) {
  const plan = CONFIG.plans.find(p => p.kcal === kcal);
  const dur = CONFIG.durations.find(d => d.days === days);
  const total = Math.round(plan.price * days * (1 - dur.discount));
  return { plan, dur, total, perDay: Math.round(total / days), pct: Math.round(dur.discount * 100) };
}

/* ==========================================================
   Язык
   ========================================================== */
const RU = {};
function captureRu() {
  $$('[data-i18n]').forEach(el => { RU[el.dataset.i18n] = el.innerHTML; });
  $$('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (!(key in RU)) RU[key] = el.getAttribute(attr);
    });
  });
}

function setLang(lang) {
  state.lang = lang;
  const dict = lang === 'en' ? EN : RU;
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v != null) el.innerHTML = v;
  });
  $$('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  storage.set('pm-lang', lang);
  renderAll();
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

$$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

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
function renderAll() {
  renderDurations();
  renderPlans();
  renderCalc();
  renderOrder();
}

captureRu();
const urlLang = new URLSearchParams(location.search).get('lang');
const initialLang = ['ru', 'en'].includes(urlLang) ? urlLang : (storage.get('pm-lang') === 'en' ? 'en' : 'ru');
setLang(initialLang);
onScroll();
