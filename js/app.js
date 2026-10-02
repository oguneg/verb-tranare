(() => {
  "use strict";

  const VERBS = window.VERBS;
  const PARTS = window.PARTICLES;
  const app = document.getElementById("app");
  const navEl = document.getElementById("nav");
  const BATCH = 5;
  const SESSION_MAX = 30;
  const NEW_PER_SESSION = 10;
  const STORE = "verbtraning.v1";

  // Mastery levels come from each verb's review history (see lvlOf).
  const LEVELS = ["Not started", "Started", "Learning", "Familiar", "Strong", "Mastered"];
  const TCLS = ["t-inf", "t-pres", "t-pret", "t-sup"];
  const TENSES = ["Infinitiv", "Presens", "Preteritum", "Supinum"];
  const SPK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>`;
  const burst = () => `<div class="burst" aria-hidden="true">${["sage-deep", "butter-deep", "rose-deep", "sky-deep", "lilac-deep", "peach-deep"].flatMap((c, i) => [0, 1, 2].map(j => `<i style="--a:${(i * 3 + j) * 20}deg;--c:var(--${c});animation-delay:${j * 60}ms"></i>`)).join("")}</div>`;
  const speakBtn = text => `<button class="icon-btn" data-act="speak" data-text="${esc(text)}" aria-label="Listen to ${esc(plain(text))}">${SPK}</button>`;

  /* ---------- storage ---------- */
  let state = load();
  function load() {
    const base = { learned: {}, formsIntro: {}, cards: {}, showAll: false };
    let s;
    try { s = Object.assign(base, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch { s = base; }
    // older saves had conjugation cards without the "introduced" flag
    Object.keys(s.cards).filter(k => k.startsWith("C:")).forEach(k => { s.formsIntro[k.slice(2)] = s.formsIntro[k.slice(2)] || Date.now(); });
    return s;
  }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* private mode */ } }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function plain(s) { return s.replace(/\*/g, ""); }
  const hl = s => esc(s).replace(/\*(.+?)\*/g, "<mark>$1</mark>");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many || one + "s"}`;
  const tiers = [...new Set(VERBS.map(v => v.tier))].sort();
  const tierRange = {};
  tiers.reduce((from, t) => { const n = VERBS.filter(v => v.tier === t).length; tierRange[t] = `${from}–${from + n - 1}`; return from + n; }, 1);
  const tierLabel = t => t === "all" ? "All" : `Verbs ${tierRange[t]}`;
  const goto = hash => { if (location.hash === hash) route(); else location.hash = hash; };

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(plain(text));
    u.lang = "sv-SE"; u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  /* ---------- spaced repetition (SM-2 style, three answers) ---------- */
  function schedule(c, rating) {
    c = c ? { ...c } : { ease: 2.5, interval: 0, reps: 0 };
    if (rating === "again") {
      c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.due = Date.now() + 60e3;
    } else {
      if (rating === "good") c.interval = c.reps === 0 ? 2 : c.reps === 1 ? 4 : Math.round(c.interval * c.ease);
      else c.interval = c.reps === 0 ? 5 : Math.round(Math.max(c.interval, 1) * c.ease * 1.3), c.ease += 0.15;
      c.reps++; c.due = Date.now() + c.interval * 864e5;
    }
    return c;
  }
  const fmtInterval = c => c.interval === 0 ? "in a minute" : `in ${plural(c.interval, "day")}`;

  /* ---------- cards ---------- */
  const mkCard = (type, v) => ({ key: type + ":" + v.i, type, tier: v.tier, item: v });
  function allCards() {
    const cards = [];
    for (const v of VERBS) { cards.push(mkCard("A", v), mkCard("B", v), mkCard("C", v)); }
    for (const p of PARTS) cards.push({ key: "P:" + p.pv, type: "P", tier: p.tier, group: p.g, item: p });
    return cards;
  }
  const isDue = c => { const s = state.cards[c.key]; return s && s.due <= Date.now(); };
  const isNew = c => !state.cards[c.key];
  // cards the learner has been introduced to
  const isActive = c => c.type === "C" ? !!state.formsIntro[c.item.i] : c.type === "P" ? !!state.learned["P:" + c.item.pv] : !!state.learned[c.item.i];
  const activeCards = () => allCards().filter(c => c.type !== "P" && isActive(c));

  /* ---------- mastery: one level per verb ---------- */
  const lvlOf = k => {
    const c = state.cards[k];
    if (!c) return 0;
    const d = c.interval;
    return !d ? 1 : d >= 90 ? 5 : d >= 30 ? 4 : d >= 10 ? 3 : d >= 4 ? 2 : 1;
  };
  const basicsLevel = v => Math.max(state.learned[v.i] ? 1 : 0, Math.min(lvlOf("A:" + v.i), lvlOf("B:" + v.i)));
  const formsLevel = v => Math.max(state.formsIntro[v.i] ? 1 : 0, lvlOf("C:" + v.i));
  const pLevel = p => Math.max(state.learned["P:" + p.pv] ? 1 : 0, lvlOf("P:" + p.pv));
  const cardLevel = c => c.type === "C" ? formsLevel(c.item) : c.type === "P" ? pLevel(c.item) : basicsLevel(c.item);
  const pips = l => `<span class="pips" role="img" aria-label="${LEVELS[l]}, level ${l} of 5">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= l ? "on" : ""}"></i>`).join("")}</span>`;

  const introduced = () => VERBS.filter(v => state.learned[v.i]);
  const eligibleForms = () => VERBS.filter(v => state.learned[v.i] && !state.formsIntro[v.i] && (state.showAll || basicsLevel(v) >= 2));
  const nextBatch = () => VERBS.filter(v => !state.learned[v.i]).slice(0, BATCH);
  const pLearned = p => !!state.learned["P:" + p.pv];

  // What the learner can see. Features appear as they become relevant.
  function unlocks() {
    const n = introduced().length, all = state.showAll;
    const solid = VERBS.filter(v => basicsLevel(v) >= 2).length;
    return {
      n, solid,
      practice: all || n >= 1,
      verbs: all || n >= 5,
      forms: all || eligibleForms().length >= 3 || Object.keys(state.formsIntro).length > 0,
      particles: all || solid >= 10 || PARTS.some(pLearned)
    };
  }

  /* ---------- sentences ---------- */
  function sentenceRows(v, idxs, colored) {
    return idxs.map(k => {
      const [sv, en] = v.ex[k];
      return `<div class="tense ${colored ? "colored " + TCLS[k] : ""}">
        <div class="lab">${TENSES[k]}</div>
        <div class="sv">${hl(sv)}</div>
        ${speakBtn(sv)}
        <div class="en">${esc(en)}</div>
      </div>`;
    }).join("");
  }

  /* ---------- router + nav ---------- */
  const routes = { home, learn: learnView, forms: formsView, practice: practiceSetup, particles: particleSetup, pl: plView, verbs: verbsView };
  let session = null;
  const routeName = () => (location.hash.replace(/^#\//, "").split("/")[0]) || "home";

  function renderNav() {
    const u = unlocks(), name = ({ learn: "home", forms: "home", pl: "particles" }[routeName()]) || routeName();
    const items = [["home", "Home"]];
    if (u.practice) items.push(["practice", "Practice"]);
    if (u.particles) items.push(["particles", "Particle verbs"]);
    if (u.verbs) items.push(["verbs", "All verbs"]);
    navEl.innerHTML = items.length < 2 ? "" : items.map(([r, t]) => `<a href="#/${r}" class="${r === name ? "active" : ""}" ${r === name ? 'aria-current="page"' : ""}>${t}</a>`).join("");
  }

  function route() {
    session = null;
    renderNav();
    app.classList.add("enter");
    (routes[routeName()] || home)();
    window.scrollTo(0, 0);
    clearTimeout(route.t); route.t = setTimeout(() => app.classList.remove("enter"), 900);
  }
  window.addEventListener("hashchange", route);

  /* ---------- the next step ---------- */
  function nextStep() {
    const cards = activeCards();
    const fresh = cards.filter(isNew), due = cards.filter(isDue);
    const elig = eligibleForms();
    if (fresh.length) return { type: "practice", n: fresh.length, forms: fresh.every(c => c.type === "C") };
    if (due.length >= 5) return { type: "review", n: due.length };
    if (elig.length >= 3) return { type: "forms", batch: elig.slice(0, BATCH) };
    const batch = nextBatch();
    if (batch.length) return { type: "learn", batch };
    if (due.length) return { type: "review", n: due.length };
    if (elig.length) return { type: "forms", batch: elig.slice(0, BATCH) };
    return { type: "done" };
  }
  function guidedQueue() {
    const cards = activeCards(), fresh = cards.filter(isNew);
    return fresh.length ? shuffle(fresh).slice(0, NEW_PER_SESSION) : shuffle(cards.filter(isDue)).slice(0, 20);
  }
  const stepAct = s => ({ learn: "learn-start", forms: "forms-start", practice: "guided-start", review: "guided-start" }[s.type]);
  const stepButton = (s, label, cls = "primary big") => `<button class="${cls}" data-act="${stepAct(s)}">${label}</button>`;
  const wordChips = batch => `<ul class="batch-list" aria-label="Verbs in this lesson">${batch.map(v => `<li><b>${esc(v.i)}</b><span>${esc(v.en)}</span></li>`).join("")}</ul>`;

  function startLearning() {
    lesson.kind = "words"; lesson.batch = nextBatch(); lesson.idx = 0;
    if (!lesson.batch.length) { lesson.batch = null; return goto("#/home"); }
    goto("#/learn");
  }
  function startForms() {
    lesson.kind = "forms"; lesson.batch = eligibleForms().slice(0, BATCH); lesson.idx = 0;
    if (!lesson.batch.length) { lesson.batch = null; return goto("#/home"); }
    goto("#/forms");
  }
  function startGuidedPractice() { startSession(guidedQueue(), "#/home", true); }

  /* ---------- home ---------- */
  function levelBar() {
    const counts = [0, 0, 0, 0, 0, 0];
    VERBS.forEach(v => counts[basicsLevel(v)]++);
    const total = VERBS.length;
    const order = [5, 4, 3, 2, 1, 0];
    const segs = order.filter(l => counts[l]).map(l => `<i class="m${l}" style="flex:${counts[l]}" title="${LEVELS[l]}: ${counts[l]}"></i>`).join("");
    const legend = order.filter(l => counts[l] && l > 0).map(l => `<li><i class="m${l}"></i>${LEVELS[l]} <b>${counts[l]}</b></li>`).join("");
    return `<section class="card-box" aria-labelledby="yv">
      <div class="row between"><h2 id="yv">Your verbs</h2><span class="muted small">${total - counts[0]} of ${total} started</span></div>
      <div class="mbar" role="img" aria-label="Verbs by level">${segs}</div>
      ${legend ? `<ul class="legend">${legend}</ul>` : ""}
    </section>`;
  }

  function comingUp(u) {
    const rows = [];
    if (!u.forms) rows.push(`<li><b>Conjugations</b> (past and perfect forms) unlock when 3 verbs reach Learning. <span class="muted">${Math.min(u.solid, 3)} of 3</span></li>`);
    if (!u.particles) rows.push(`<li><b>Particle verbs</b> (like <i>hålla med</i>) unlock when 10 verbs reach Learning. <span class="muted">${Math.min(u.solid, 10)} of 10</span></li>`);
    return rows.length ? `<section class="coming"><h2>Coming up</h2><ul>${rows.join("")}</ul></section>` : "";
  }

  function alsoAvailable(u, step, due) {
    const rows = [];
    if (due && step.type !== "review") rows.push(`<li><button class="linklike" data-act="guided-start">Review ${plural(due, "due card")}</button></li>`);
    if (u.practice) rows.push(`<li><a href="#/practice">Practise freely</a></li>`);
    if (u.particles) rows.push(`<li><button class="linklike" data-act="pl-start">Learn particle verbs${nextParticleBatch() ? ": " + esc(stemsLabel(nextParticleBatch())) : ""}</button></li>`);
    if (u.verbs) rows.push(`<li><a href="#/verbs">Browse all verbs</a></li>`);
    return rows.length ? `<section class="also"><h2>Also</h2><ul>${rows.join("")}</ul></section>` : "";
  }

  function home() {
    const u = unlocks(), step = nextStep();
    const cards = activeCards(), due = cards.filter(isDue).length;
    let intro, card;

    if (u.n === 0) {
      intro = `<h1>Hej! Let's learn some Swedish verbs.</h1>
        <p class="lead">We start with five common ones: what they mean, and how to say them in the infinitiv (<i>att vara</i>) and presens (<i>är</i>).</p>`;
      card = `<h2>Your first five verbs</h2>${wordChips(step.batch)}${stepButton(step, "Start learning")}`;
    } else {
      const learned = u.n;
      intro = `<h1>Hej!</h1><p class="lead">${learned} ${learned === 1 ? "verb" : "verbs"} started. Here is your next step.</p>`;
      if (step.type === "learn") card = `<h2>Learn 5 new verbs</h2><p class="muted">Meaning, infinitiv and presens, with an example sentence for each.</p>${wordChips(step.batch)}${stepButton(step, "Start lesson")}`;
      else if (step.type === "practice") card = `<h2>Practise your new verbs</h2><p class="muted">${plural(step.n, "card")} from your latest lesson.</p>${stepButton(step, "Start practice")}`;
      else if (step.type === "review") card = `<h2>Review ${plural(step.n, "card")}</h2><p class="muted">Cards return just before you would forget them.</p>${stepButton(step, "Start review")}`;
      else if (step.type === "forms") card = `<h2>Learn the past forms of ${step.batch.length} verbs</h2><p class="muted">You know these verbs well enough. Now add preteritum (past) and supinum (perfect).</p>${wordChips(step.batch)}${stepButton(step, "Start lesson")}`;
      else card = `<h2>You're all caught up</h2><p class="muted">Nothing is due. Come back tomorrow, or practise freely.</p><a class="btn primary big" href="#/practice">Practise freely</a>`;
    }

    app.innerHTML = `
      <div class="hello">${intro}</div>
      <section class="card-box next" aria-label="Next step">${card}</section>
      ${u.n ? levelBar() : ""}
      ${u.n ? comingUp(u) : ""}
      ${u.n ? alsoAvailable(u, step, due) : ""}
      ${u.n ? `<p class="foot muted small">${state.showAll
        ? `Everything is showing. <button class="linklike" data-act="show-all-off">Hide advanced features</button> · `
        : `<button class="linklike" data-act="show-all-on">Show all features</button> · `}<button class="linklike" data-act="reset">Reset progress</button></p>` : ""}`;
  }

  /* ---------- lessons: words (infinitiv + presens), then forms (past + perfect) ---------- */
  const lesson = { kind: "words", batch: null, idx: 0 };

  function learnView() { if (!lesson.batch || lesson.kind !== "words") return startLearning(); lessonCard(); }
  function formsView() { if (!lesson.batch || lesson.kind !== "forms") return startForms(); lessonCard(); }

  function lessonCard() {
    const v = lesson.batch[lesson.idx], last = lesson.idx === lesson.batch.length - 1, words = lesson.kind === "words";
    const dots = lesson.batch.map((_, k) => `<i class="${k < lesson.idx ? "done" : k === lesson.idx ? "cur" : ""}"></i>`).join("");
    const body = words ? `
        <div class="vhead"><div><h2>att ${esc(v.i)}</h2><p class="meaning">${esc(v.en)}</p></div>${speakBtn(v.i)}</div>
        <div class="pair"><div><span>Infinitiv</span><b>att ${esc(v.i)}</b></div><div><span>Presens (now)</span><b>${esc(v.p)}</b></div></div>
        ${sentenceRows(v, [0, 1], false)}`
      : `
        <div class="vhead"><div><h2>att ${esc(v.i)}</h2><p class="meaning">${esc(v.en)} · you know: ${esc(v.i)}, ${esc(v.p)}</p></div>${speakBtn(v.i)}</div>
        <div class="pair"><div class="t-pret"><span>Preteritum (past)</span><b>${esc(v.t)}</b></div><div class="t-sup"><span>Supinum (perfect)</span><b>har ${esc(v.s)}</b></div></div>
        ${sentenceRows(v, [2, 3], true)}
        ${v.irr ? `<p class="note">Irregular verb: these forms follow no pattern, so learn them by heart.</p>` : ""}`;
    app.innerHTML = `
      <div class="progress"><span>${words ? "New verbs" : "Past and perfect"} · ${lesson.idx + 1} of ${lesson.batch.length}</span></div>
      <div class="dots">${dots}</div>
      <section class="card-box lesson">${body}</section>
      <div class="nav-row">
        <button data-act="lesson-prev" ${lesson.idx === 0 ? "disabled" : ""}>Back</button>
        ${last ? `<button class="primary big" data-act="lesson-finish">Practise these ${lesson.batch.length} verbs</button>` : `<button class="primary big" data-act="lesson-next">Next verb</button>`}
      </div>`;
  }

  function lessonFinish() {
    const batch = lesson.batch, words = lesson.kind === "words";
    batch.forEach(v => { (words ? state.learned : state.formsIntro)[v.i] = Date.now(); });
    save(); lesson.batch = null; renderNav();
    const cards = words ? batch.flatMap(v => [mkCard("A", v), mkCard("B", v)]) : batch.map(v => mkCard("C", v));
    startSession(shuffle(cards), "#/home", true);
  }

  /* ---------- particle verbs: learn a group that shares a stem ---------- */
  const stemOf = pv => pv.split(" ")[0];
  const pKey = p => "P:" + p.pv;

  // Batches of up to 5 particle verbs sharing a stem; stems with fewer than 3 verbs are pooled.
  function particleBatches() {
    const stems = {};
    PARTS.forEach(p => (stems[stemOf(p.pv)] = stems[stemOf(p.pv)] || []).push(p));
    const order = Object.values(stems).sort((a, b) =>
      Math.min(...a.map(x => x.tier)) - Math.min(...b.map(x => x.tier)) || b.length - a.length);
    const batches = []; let carry = [];
    for (const list of order) {
      const parts = Math.ceil(list.length / 5), size = Math.ceil(list.length / parts);
      for (let i = 0; i < list.length; i += size) {
        const chunk = list.slice(i, i + size);
        if (chunk.length >= 3) batches.push(chunk);
        else { carry = carry.concat(chunk); if (carry.length >= 3) { batches.push(carry); carry = []; } }
      }
    }
    if (carry.length) batches.push(carry);
    return batches;
  }
  function nextParticleBatch() {
    for (const b of particleBatches()) {
      const todo = b.filter(p => !pLearned(p));
      if (todo.length) return todo;
    }
    return null;
  }
  const stemsLabel = b => [...new Set(b.map(p => stemOf(p.pv)))].join(" + ");

  const pl = { batch: null, idx: 0, phase: "study", opts: [], order: [], qi: 0, wrong: [], solved: false, firstTry: 0 };

  function startParticleLearning() {
    pl.batch = nextParticleBatch();
    if (!pl.batch) return goto("#/particles");
    Object.assign(pl, { idx: 0, phase: "study", opts: shuffle(pl.batch), order: shuffle(pl.batch), qi: 0, wrong: [], solved: false, firstTry: 0 });
    goto("#/pl");
  }
  function plView() {
    if (!pl.batch) return goto("#/particles");
    return pl.phase === "study" ? plStudy() : plQuiz();
  }

  function plStudy() {
    const b = pl.batch, p = b[pl.idx], last = pl.idx === b.length - 1;
    const dots = b.map((_, k) => `<i class="${k < pl.idx ? "done" : k === pl.idx ? "cur" : ""}"></i>`).join("");
    app.innerHTML = `
      <div class="progress"><span>Particle verbs: ${esc(stemsLabel(b))} · ${pl.idx + 1} of ${b.length}</span></div>
      <div class="dots">${dots}</div>
      <section class="card-box lesson">
        <div class="vhead"><div><h2>${esc(p.pv)}</h2><p class="meaning">${esc(p.en)}</p></div>${speakBtn(p.pv)}</div>
        <div class="tense"><div class="lab">Example</div><div class="sv">${esc(p.sv)}</div>${speakBtn(p.sv)}<div class="en">${esc(p.sven)}</div></div>
        <p class="muted small" style="margin:14px 0 0">Forms: ${p.forms.map(esc).join(" · ")}</p>
      </section>
      <div class="nav-row">
        <button data-act="pl-prev" ${pl.idx === 0 ? "disabled" : ""}>Back</button>
        ${last ? `<button class="primary big" data-act="pl-quiz">Take a quick quiz</button>` : `<button class="primary big" data-act="pl-next">Next</button>`}
      </div>`;
  }

  function plQuiz() {
    const b = pl.batch;
    if (pl.qi >= pl.order.length) return plResult();
    const p = pl.order[pl.qi];
    const opts = pl.opts.map(o => {
      const cls = pl.solved && o.pv === p.pv ? "ok" : pl.wrong.includes(o.pv) ? "bad" : "";
      return `<button class="${cls}" data-act="pl-pick" data-v="${esc(o.pv)}" ${pl.solved || pl.wrong.includes(o.pv) ? "disabled" : ""}>${esc(o.pv)}</button>`;
    }).join("");
    app.innerHTML = `
      <div class="progress"><span>Quiz · ${pl.qi + 1} of ${pl.order.length}</span></div>
      <section class="card-box">
        <p class="muted">Which particle verb says this in Swedish?</p>
        <div class="big-q">${esc(p.sven)}</div>
        ${pl.solved ? `<div class="reveal">${esc(p.sv)} ${speakBtn(p.sv)}</div>` : ""}
        <div class="opts">${opts}</div>
        ${pl.wrong.length && !pl.solved ? `<p class="warn" role="status" style="margin:12px 0 0">Not quite. Try another one.</p>` : ""}
      </section>
      <div class="nav-row"><span></span>${pl.solved ? `<button class="primary big" data-act="pl-qnext">${pl.qi === pl.order.length - 1 ? "See result" : "Next question"}</button>` : ""}</div>`;
  }

  function plResult() {
    const n = pl.order.length;
    app.innerHTML = `
      <section class="card-box done-card">${burst()}
        <h2>${pl.firstTry === n ? "Perfect score" : "Quiz done"}</h2>
        <p class="muted">${pl.firstTry} of ${n} right on the first try.</p>
        <p>Next: a short flashcard round to lock these in.</p>
        <button class="primary big" data-act="pl-finish">Practise these ${n} verbs</button>
      </section>`;
  }

  function plFinish() {
    const b = pl.batch;
    b.forEach(p => { state.learned[pKey(p)] = Date.now(); });
    save(); pl.batch = null; renderNav();
    startSession(shuffle(b.map(p => ({ key: "P:" + p.pv, type: "P", tier: p.tier, group: p.g, item: p }))), "#/home", true, "particle");
  }

  /* ---------- free practice ---------- */
  const prac = { mode: "A", tier: "all", unlearned: false, irrOnly: false };
  const pprac = { tier: "all", group: "all" };

  function pool(o) {
    return allCards().filter(c => {
      if (o.mode === "P") return c.type === "P" && (o.tier === "all" || c.tier === o.tier) && (o.group === "all" || c.group === o.group);
      if (c.type !== o.mode) return false;
      if (o.irrOnly && !c.item.irr) return false;
      if (o.tier !== "all" && c.tier !== o.tier) return false;
      return o.unlearned || isActive(c);
    });
  }
  function buildQueue(o) {
    const p = pool(o);
    const due = shuffle(p.filter(isDue));
    const fresh = shuffle(p.filter(isNew)).slice(0, NEW_PER_SESSION);
    return shuffle(due.concat(fresh)).slice(0, SESSION_MAX);
  }
  const counts = p => ({ due: p.filter(isDue).length, fresh: Math.min(p.filter(isNew).length, NEW_PER_SESSION) });

  function practiceSetup() {
    const u = unlocks();
    if (!u.forms && prac.mode === "C") prac.mode = "A";
    const choice = (m, title, desc) => `<button class="choice ${prac.mode === m ? "on" : ""}" data-act="prac-mode" data-v="${m}" aria-pressed="${prac.mode === m}"><b>${title}</b><span>${desc}</span></button>`;
    const p = pool(prac), { due, fresh } = counts(p);
    const tierChips = ["all", ...tiers].map(t => `<button class="chip ${prac.tier === t ? "on" : ""}" data-act="prac-tier" data-v="${t}">${tierLabel(t)}</button>`).join("");
    const empty = due + fresh === 0;
    const why = !u.n ? `Learn your first verbs on the <a href="#/home">Home page</a> and they appear here.`
      : p.length === 0 ? `No cards match these options. Try "More options".`
      : `Nothing is due right now. Come back later, or open "More options" to include verbs you haven't learned yet.`;
    app.innerHTML = `
      <h1>Practice</h1>
      <p class="lead muted">Choose what to practise.</p>
      <div class="choices" role="group" aria-label="Practice type">
        ${choice("A", "English to Swedish", "See the English meaning, recall the Swedish verb and its presens.")}
        ${choice("B", "Swedish to English", "See the Swedish verb, recall what it means.")}
        ${u.forms ? choice("C", "Conjugations", "See the verb, recall its preteritum (past) and supinum (perfect).") : ""}
      </div>
      <section class="card-box start">
        ${empty ? `<p class="muted">${why}</p>` : `<p><b>${due}</b> to review · <b>${fresh}</b> new</p>`}
        <button class="primary big" data-act="prac-start" ${empty ? "disabled" : ""}>Start practice</button>
      </section>
      <details class="more">
        <summary>More options</summary>
        <div class="opt-title">Which verbs</div>
        <div class="groups">${tierChips}</div>
        <label class="check"><input type="checkbox" data-act="prac-irr" ${prac.irrOnly ? "checked" : ""}> Irregular verbs only</label><br>
        <label class="check"><input type="checkbox" data-act="prac-unlearned" ${prac.unlearned ? "checked" : ""}> Include verbs I haven't learned yet</label>
      </details>`;
    const d = app.querySelector("details.more"); if (d && (prac.tier !== "all" || prac.irrOnly || prac.unlearned)) d.open = true;
  }

  /* ---------- particle verbs page ---------- */
  function particleSetup() {
    const o = { ...pprac, mode: "P" };
    const groups = [...new Set(PARTS.map(p => p.g))];
    const count = g => PARTS.filter(p => p.g === g).length;
    const chips = [`<button class="chip ${pprac.group === "all" ? "on" : ""}" data-act="part-group" data-v="all">All</button>`]
      .concat(groups.map(g => `<button class="chip ${pprac.group === g ? "on" : ""}" data-act="part-group" data-v="${esc(g)}">${esc(g)} <small>${count(g)}</small></button>`)).join("");
    const p = pool(o), { due, fresh } = counts(p);
    const learnedN = PARTS.filter(pLearned).length, nb = nextParticleBatch();
    const shown = PARTS.filter(x => (pprac.group === "all" || x.g === pprac.group));
    app.innerHTML = `
      <h1>Particle verbs</h1>
      <p class="lead muted">A particle changes what the verb means: <i>hålla</i> is "to hold", <i>hålla med</i> is "to agree".</p>
      <section class="card-box next">
        <h2>${nb ? "Learn a new group" : "All groups learned"}</h2>
        ${nb ? `<p class="muted">Verbs that share a stem, so you see the pattern: <b>${esc(stemsLabel(nb))}</b>.</p>${wordChips(nb.map(x => ({ i: x.pv, en: x.en })))}<button class="primary big" data-act="pl-start">Start group</button>`
             : `<p class="muted">${learnedN} of ${PARTS.length} learned. Keep them fresh below.</p>`}
      </section>
      <section class="card-box start">
        <h2>Practise</h2>
        <p>${due + fresh === 0 ? `<span class="muted">Nothing to practise yet.</span>` : `<b>${due}</b> to review · <b>${fresh}</b> new`}</p>
        <button class="primary" data-act="part-start" ${due + fresh === 0 ? "disabled" : ""}>Start practice</button>
      </section>
      <details class="more">
        <summary>Browse all ${PARTS.length} particle verbs</summary>
        <div class="groups" style="margin-top:12px">${chips}</div>
        <div class="vlist">${shown.map(x => `
          <details class="v"><summary><span class="inf">${esc(x.pv)}</span><span class="rest">${esc(x.en)}</span>${pips(pLevel(x))}</summary>
            <div class="body"><div class="sv" style="font-size:1.1rem">${esc(x.sv)}</div><div class="muted">${esc(x.sven)}</div>
            <p class="muted small" style="margin-top:8px">${x.forms.map(esc).join(" · ")}</p></div></details>`).join("")}</div>
      </details>`;
  }

  /* ---------- flashcard session ---------- */
  function startSession(queue, back, guided, kind, opts) {
    queue = queue || buildQueue(prac);
    if (!queue.length) return;
    session = { queue, i: 0, flipped: false, total: queue.length, again: 0, back: back || location.hash, guided: !!guided, kind: kind || "verb", opts: opts || { ...prac } };
    renderSession();
  }

  const pres = v => `<div class="sub">presens: <b>${esc(v.p)}</b></div>`;
  function faces(c) {
    const v = c.item;
    if (c.type === "A") return [
      `<div class="big">${esc(v.en)}</div><div class="sub">Say it in Swedish</div>`,
      `<div class="big">att ${esc(v.i)} ${speakBtn(v.i)}</div>${pres(v)}`];
    if (c.type === "B") return [
      `<div class="big">att ${esc(v.i)} ${speakBtn(v.i)}</div><div class="sub">What does it mean?</div>`,
      `<div class="big">${esc(v.en)}</div>${pres(v)}`];
    if (c.type === "C") return [
      `<div class="big">att ${esc(v.i)} ${speakBtn(v.i)}</div><div class="sub">${esc(v.en)}</div><div class="sub ask">Past and perfect?</div>`,
      `<div class="pair"><div class="t-pret"><span>Preteritum (past)</span><b>${esc(v.t)}</b></div><div class="t-sup"><span>Supinum (perfect)</span><b>har ${esc(v.s)}</b></div></div>
       <div class="example">${hl(v.ex[2][0])}<div class="muted small">${esc(v.ex[2][1])}</div></div>`];
    return [
      `<div class="big">${esc(v.pv)} ${speakBtn(v.pv)}</div><div class="sub">What does it mean?</div>`,
      `<div class="big">${esc(v.en)}</div><div class="example">${esc(v.sv)}<div class="muted small">${esc(v.sven)}</div></div>`];
  }
  const sideLabel = (c, back) => c.type === "A" ? (back ? "Svenska" : "English") : c.type === "B" ? (back ? "English" : "Svenska") : c.type === "C" ? (back ? "Past and perfect" : "Svenska") : (back ? "English" : "Particle verb");

  function renderSession() {
    const s = session;
    if (s.i >= s.queue.length) return sessionDone();
    const c = s.queue[s.i], [front, back] = faces(c), cur = state.cards[c.key], lvl = cardLevel(c);
    const hint = r => fmtInterval(schedule(cur, r));
    app.innerHTML = `
      <div class="progress"><span>${Math.min(s.i + 1, s.queue.length)} of ${s.queue.length}</span><a href="${s.back}" data-act="end">Stop</a></div>
      <div class="dots"><i class="done" style="flex:${s.i}"></i><i style="flex:${Math.max(s.queue.length - s.i, 0)}"></i></div>
      <div class="flip ${s.flipped ? "flipped" : ""}" data-act="reveal" tabindex="0" role="button" aria-label="Show answer">
        <div class="flip-inner">
          <div class="face front"><span class="side">${sideLabel(c, false)}</span>${front}</div>
          <div class="face back"><span class="side">${sideLabel(c, true)}</span>${back}<div class="lvl">${pips(lvl)}<span>${LEVELS[lvl]}</span></div></div>
        </div>
      </div>
      <div class="actions">
        <div class="show ${s.flipped ? "hide" : ""}"><button class="primary big" data-act="reveal">Show answer</button></div>
        <div class="rate ${s.flipped ? "" : "hide"}">
          <p class="hint">Did you know it?</p>
          <div class="rate-row">
            <button class="again" data-act="rate" data-v="again">Not yet<small>${hint("again")}</small></button>
            <button class="good" data-act="rate" data-v="good">Got it<small>${hint("good")}</small></button>
            <button class="easy" data-act="rate" data-v="easy">Easy<small>${hint("easy")}</small></button>
          </div>
        </div>
      </div>`;
  }

  function reveal() {
    if (!session || session.flipped) return;
    session.flipped = true;
    app.querySelector(".flip").classList.add("flipped");
    app.querySelector(".show").classList.add("hide");
    app.querySelector(".rate").classList.remove("hide");
    app.querySelector(".rate .good").focus({ preventScroll: true });
  }

  function rate(r) {
    const s = session;
    if (!s || !s.flipped) return;
    const c = s.queue[s.i];
    state.cards[c.key] = schedule(state.cards[c.key], r);
    save();
    if (r === "again") { s.again++; s.queue.push(c); }
    s.i++; s.flipped = false;
    renderSession();
  }

  function sessionDone() {
    const s = session;
    renderNav();
    if (s.kind === "particle") return particleDone();
    const step = s.guided ? nextStep() : null;
    let cta;
    if (!s.guided) cta = `<button class="primary big" data-act="again-session">Another round</button><a class="btn" href="#/home">Home</a>`;
    else if (step.type === "done") cta = `<a class="btn primary big" href="#/home">Back to Home</a>`;
    else {
      const label = { learn: "Next: learn 5 new verbs", forms: "Next: learn past forms", practice: "Next: practise new verbs", review: "Next: review due cards" }[step.type];
      cta = `${stepButton(step, label)}<a class="btn" href="#/home">Back to Home</a>`;
    }
    app.innerHTML = `
      <section class="card-box done-card">${burst()}
        <h2>Nicely done</h2>
        <p class="muted">${plural(s.total, "card")} practised${s.again ? `. ${plural(s.again, "card")} will come back soon` : ""}.</p>
        <div class="cta-row">${cta}</div>
      </section>`;
  }

  function particleDone() {
    const s = session, nb = nextParticleBatch();
    app.innerHTML = `
      <section class="card-box done-card">${burst()}
        <h2>Group complete</h2>
        <p class="muted">${plural(s.total, "particle verb")} practised.</p>
        ${nb ? `<p>Next group: <b>${esc(stemsLabel(nb))}</b></p>` : `<p>You've learned every particle verb.</p>`}
        <div class="cta-row">
          ${nb ? `<button class="primary big" data-act="pl-start">Learn next group</button>` : ""}
          <a class="btn ${nb ? "" : "primary big"}" href="#/home">Back to Home</a>
        </div>
      </section>`;
  }

  /* ---------- all verbs ---------- */
  const vlist = { q: "", filter: "all" };
  const FILTERS = [["all", "All"], ["new", "Not started"], ["progress", "In progress"], ["mastered", "Mastered"], ["irr", "Irregular"]];
  function verbsView() {
    const chips = FILTERS.map(([f, t]) => `<button class="chip ${vlist.filter === f ? "on" : ""}" data-act="list-filter" data-v="${f}">${t}</button>`).join("");
    app.innerHTML = `
      <h1>All verbs</h1>
      <input type="search" id="q" placeholder="Search Swedish or English" value="${esc(vlist.q)}" aria-label="Search verbs">
      <div class="groups" style="margin-top:12px">${chips}</div>
      <div id="vl" aria-live="polite"></div>`;
    renderVlist();
  }
  function renderVlist() {
    const q = vlist.q.trim().toLowerCase(), f = vlist.filter;
    const list = VERBS.filter(v => {
      const l = basicsLevel(v);
      if (f === "new" && l !== 0) return false;
      if (f === "progress" && (l < 1 || l > 4)) return false;
      if (f === "mastered" && l !== 5) return false;
      if (f === "irr" && !v.irr) return false;
      return !q || v.i.includes(q) || v.en.toLowerCase().includes(q) || [v.p, v.t, v.s].some(x => x.includes(q));
    });
    document.getElementById("vl").innerHTML = list.length ? `<div class="vlist">${list.map(v => {
      const l = basicsLevel(v), fl = formsLevel(v);
      return `<details class="v"><summary>
        <span class="inf">${esc(v.i)}</span>
        <span class="rest">${esc(v.en)}</span>
        ${pips(l)}
      </summary><div class="body">
        <p class="forms-line"><b>att ${esc(v.i)}</b> · ${esc(v.p)} · ${esc(v.t)} · har ${esc(v.s)}${v.irr ? ` <span class="badge irr">irregular</span>` : ""}</p>
        <p class="muted small">Words: ${LEVELS[l]} · Past and perfect: ${LEVELS[fl]}</p>
        ${sentenceRows(v, [0, 1, 2, 3], true)}
      </div></details>`;
    }).join("")}</div>` : `<div class="empty">No verbs match. Try a different search or filter.</div>`;
  }

  /* ---------- events ---------- */
  app.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act, v = el.dataset.v;
    if (act === "speak") { e.stopPropagation(); return speak(el.dataset.text); }
    switch (act) {
      case "reveal": return reveal();
      case "rate": return rate(v);
      case "reset":
        if (confirm("Delete all progress? This removes every verb's level and all flashcard history on this device.")) { try { localStorage.removeItem(STORE); } catch { /* ignore */ } state = load(); renderNav(); home(); }
        return;
      case "show-all-on": state.showAll = true; save(); renderNav(); return home();
      case "show-all-off": state.showAll = false; save(); renderNav(); return home();
      case "learn-start": return startLearning();
      case "forms-start": return startForms();
      case "guided-start": return startGuidedPractice();
      case "lesson-next": lesson.idx++; return lessonCard();
      case "lesson-prev": lesson.idx--; return lessonCard();
      case "lesson-finish": return lessonFinish();
      case "pl-start": return startParticleLearning();
      case "pl-next": pl.idx++; return plStudy();
      case "pl-prev": pl.idx--; return plStudy();
      case "pl-quiz": pl.phase = "quiz"; return plQuiz();
      case "pl-pick": {
        const cur = pl.order[pl.qi];
        if (v === cur.pv) { pl.solved = true; if (!pl.wrong.length) pl.firstTry++; } else if (!pl.wrong.includes(v)) pl.wrong.push(v);
        return plQuiz();
      }
      case "pl-qnext": pl.qi++; pl.solved = false; pl.wrong = []; return plQuiz();
      case "pl-finish": return plFinish();
      case "prac-mode": prac.mode = v; return practiceSetup();
      case "prac-tier": prac.tier = v === "all" ? v : +v; return practiceSetup();
      case "part-group": pprac.group = v; return particleSetup();
      case "prac-start": return startSession(buildQueue(prac), location.hash, false, "verb", { ...prac });
      case "part-start": return startSession(buildQueue({ ...pprac, mode: "P" }), location.hash, false, "verb", { ...pprac, mode: "P" });
      case "end": e.preventDefault(); return goto(session ? session.back : "#/home");
      case "again-session": return startSession(buildQueue(session.opts), session.back, false, "verb", session.opts);
      case "list-filter": vlist.filter = v; return verbsView();
    }
  });
  app.addEventListener("change", e => {
    const act = e.target.dataset.act;
    if (act === "prac-irr") { prac.irrOnly = e.target.checked; practiceSetup(); }
    if (act === "prac-unlearned") { prac.unlearned = e.target.checked; practiceSetup(); }
  });
  app.addEventListener("input", e => {
    if (e.target.id === "q") { vlist.q = e.target.value; renderVlist(); }
  });
  document.addEventListener("keydown", e => {
    if (!session || session.i >= session.queue.length || e.target.closest("input, summary")) return;
    if (!session.flipped && (e.key === " " || e.key === "Enter") && !e.target.closest("a, button.icon-btn")) { e.preventDefault(); reveal(); }
    else if (session.flipped && "123".includes(e.key) && e.key.length === 1) rate(["again", "good", "easy"][+e.key - 1]);
  });

  // leaving a lesson half-way discards it
  window.addEventListener("hashchange", () => {
    if (!/^#\/(learn|forms)$/.test(location.hash)) lesson.batch = null;
    if (location.hash !== "#/pl") pl.batch = null;
  });

  route();
})();
