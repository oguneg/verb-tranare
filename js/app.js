(() => {
  "use strict";

  const VERBS = window.VERBS;
  const PARTS = window.PARTICLES;
  const app = document.getElementById("app");
  const BATCH = 5;
  const SESSION_MAX = 30;
  const NEW_PER_SESSION = 10;
  const STORE = "verbtraning.v1";
  const TENSES = ["Infinitiv", "Presens", "Preteritum", "Supinum"];
  const TCLS = ["t-inf", "t-pres", "t-pret", "t-sup"];
  const SPK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>`;
  const CHK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
  const burst = () => `<div class="burst" aria-hidden="true">${["sage-deep", "butter-deep", "rose-deep", "sky-deep", "lilac-deep", "peach-deep"].flatMap((c, i) => [0, 1, 2].map(j => `<i style="--a:${(i * 3 + j) * 20}deg;--c:var(--${c});animation-delay:${j * 60}ms"></i>`)).join("")}</div>`;

  /* ---------- storage ---------- */
  let state = load();
  function load() {
    const base = { learned: {}, cards: {} };
    try { return Object.assign(base, JSON.parse(localStorage.getItem(STORE) || "{}")); }
    catch { return base; }
  }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* private mode */ } }

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const hl = s => esc(s).replace(/\*(.+?)\*/g, "<mark>$1</mark>");
  const plain = s => s.replace(/\*/g, "");
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const byId = Object.fromEntries(VERBS.map(v => [v.i, v]));
  const tiers = [...new Set(VERBS.map(v => v.tier))].sort();
  const tierRange = {};
  tiers.reduce((from, t) => { const n = VERBS.filter(v => v.tier === t).length; tierRange[t] = `${from}–${from + n - 1}`; return from + n; }, 1);
  const tierLabel = t => t === "all" ? "All levels" : `Top ${tierRange[t]}`;

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(plain(text));
    u.lang = "sv-SE"; u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  /* ---------- spaced repetition (SM-2 style) ---------- */
  function schedule(c, rating) {
    c = c ? { ...c } : { ease: 2.5, interval: 0, reps: 0 };
    if (rating === "again") {
      c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.due = Date.now() + 60e3;
    } else {
      if (rating === "hard") { c.interval = c.reps === 0 ? 1 : Math.max(1, Math.round(c.interval * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); }
      else if (rating === "good") { c.interval = c.reps === 0 ? 2 : c.reps === 1 ? 4 : Math.round(c.interval * c.ease); }
      else { c.interval = c.reps === 0 ? 5 : Math.round(Math.max(c.interval, 1) * c.ease * 1.3); c.ease += 0.15; }
      c.reps++; c.due = Date.now() + c.interval * 864e5;
    }
    return c;
  }
  const fmtInterval = c => c.interval === 0 ? "<1 min" : c.interval + (c.interval === 1 ? " day" : " days");

  function allCards() {
    const cards = [];
    for (const v of VERBS) {
      cards.push({ key: "A:" + v.i, type: "A", tier: v.tier, item: v });
      cards.push({ key: "B:" + v.i, type: "B", tier: v.tier, item: v });
      if (v.irr) cards.push({ key: "C:" + v.i, type: "C", tier: v.tier, item: v });
    }
    for (const p of PARTS) cards.push({ key: "P:" + p.pv, type: "P", tier: p.tier, group: p.g, item: p });
    return cards;
  }
  const isDue = c => { const s = state.cards[c.key]; return s && s.due <= Date.now(); };
  const isNew = c => !state.cards[c.key];
  const isVerbCard = c => c.type === "A" || c.type === "B";

  /* ---------- shared renderers ---------- */
  function formsHtml(v) {
    return `<div class="forms">
      <div class="t-inf"><span>Infinitiv</span><b>att ${esc(v.i)}</b></div>
      <div class="t-pres"><span>Presens</span><b>${esc(v.p)}</b></div>
      <div class="t-pret"><span>Preteritum</span><b>${esc(v.t)}</b></div>
      <div class="t-sup"><span>Supinum</span><b>har ${esc(v.s)}</b></div></div>`;
  }
  function sentencesHtml(v) {
    return v.ex.map(([sv, en], k) => `
      <div class="tense ${TCLS[k]}">
        <div class="lab">${TENSES[k]}</div>
        <div class="sv">${hl(sv)}</div>
        <button class="icon-btn" data-act="speak" data-text="${esc(sv)}" aria-label="Listen" title="Listen">${SPK}</button>
        <div class="en">${esc(en)}</div>
      </div>`).join("");
  }
  const tags = v => `<span class="badge">${v.lvl}</span> <span class="badge gold">${tierLabel(v.tier)}</span>${v.irr ? ` <span class="badge irr">irregular</span>` : ""}`;

  /* ---------- router ---------- */
  const routes = { home, learn: learnView, practice: practiceSetup, particles: particleSetup, pl: plView, verbs: verbsView };
  let session = null;

  function route() {
    session = null;
    const name = (location.hash.replace(/^#\//, "").split("/")[0]) || "home";
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === ({ learn: "home", pl: "particles" }[name] || name)));
    app.classList.add("enter");
    (routes[name] || home)();
    window.scrollTo(0, 0);
    clearTimeout(route.t); route.t = setTimeout(() => app.classList.remove("enter"), 900);
  }
  window.addEventListener("hashchange", route);

  /* ---------- my progress (guided home) ---------- */
  const learnedVerbs = () => VERBS.filter(v => state.learned[v.i]);
  const verbCards = () => allCards().filter(isVerbCard);

  // Decides what the learner should do next: practice fresh verbs, review due cards, or learn more.
  function nextStep() {
    const cards = verbCards().filter(c => state.learned[c.item.i]);
    const fresh = cards.filter(isNew), due = cards.filter(isDue);
    if (fresh.length) return { type: "practice", fresh: fresh.length / 2, cards: fresh.length };
    if (due.length) return { type: "review", cards: due.length };
    const batch = nextBatch();
    if (batch.length) return { type: "learn", batch };
    return { type: "done" };
  }
  function guidedQueue() {
    const cards = verbCards().filter(c => state.learned[c.item.i]);
    return shuffle(cards.filter(isDue)).concat(shuffle(cards.filter(isNew))).slice(0, SESSION_MAX);
  }
  function startLearning() {
    learn.batch = nextBatch(); learn.idx = 0;
    if (!learn.batch.length) { learn.batch = null; return home(); }
    if (location.hash === "#/learn") route(); else location.hash = "#/learn";
  }
  function startGuidedPractice() { startSession(guidedQueue(), "#/home", true); }
  function goto(hash) { if (location.hash === hash) route(); else location.hash = hash; }

  function particleCard() {
    const done = PARTS.filter(pLearned).length, nb = nextParticleBatch();
    return `<div class="card-box tint-sky">
      <div class="row between"><h3>Particle verbs</h3><span class="small">${done} / ${PARTS.length} learned</span></div>
      <div class="bar part"><i style="width:${done / PARTS.length * 100}%"></i></div>
      ${nb ? `<p>Next group: <b>${esc(stemsLabel(nb))}</b> · ${nb.map(p => esc(p.pv)).join(", ")}</p>
        <div class="row"><button class="primary" data-act="pl-start">Learn this group</button><a class="btn" href="#/particles">Practice</a></div>`
        : `<p>All particle verbs learned. Keep them fresh in <a href="#/particles">Practice</a>.</p>`}
    </div>`;
  }

  function irregularCard() {
    const irr = VERBS.filter(v => v.irr), learned = irr.filter(v => state.learned[v.i]).length;
    const ready = allCards().filter(c => c.type === "C" && state.learned[c.item.i] && (isNew(c) || isDue(c))).length;
    return `<div class="card-box tint-lilac">
      <div class="row between"><h3>Irregular verbs</h3><span class="small">${learned} / ${irr.length} learned</span></div>
      <div class="bar irr"><i style="width:${irr.length ? learned / irr.length * 100 : 0}%"></i></div>
      <p>${learned === 0 ? "Irregular verbs are mixed into your normal lessons. Once you've learned some, drill their conjugations here." : ready ? `<b>${ready}</b> conjugation card${ready === 1 ? "" : "s"} ready to practice.` : "Nothing due right now. Nice!"}</p>
      <button class="primary" data-act="irr-start" ${learned === 0 ? "disabled" : ""}>Practice conjugations</button>
    </div>`;
  }

  function home() {
    const learnedN = learnedVerbs().length;
    const cards = verbCards();
    const dueN = cards.filter(c => state.learned[c.item.i] && isDue(c)).length;
    const step = nextStep();
    const phase = step.type === "learn" ? 1 : step.type === "done" ? 3 : 2;
    const path = [["1", "Learn 5 verbs"], ["2", "Practice them"], ["3", "Repeat & review"]]
      .map(([n, t], k) => `<li class="${k + 1 < phase ? "done" : k + 1 === phase ? "cur" : ""}"><span>${k + 1 < phase ? CHK : n}</span>${t}</li>`).join("");

    let card, cls;
    if (step.type === "learn") { cls = ""; card = `
      <h2>${learnedN === 0 ? "Start here: learn your first 5 verbs" : "Next: learn 5 new verbs"}</h2>
      <p class="muted">${learnedN === 0 ? "You'll see each verb in four sentences. Right after, you'll practice them with flashcards." : "Your reviews are up to date. Time to add five more verbs."}</p>
      <ul class="batch-list">${step.batch.map(v => `<li><b>${esc(v.i)}</b><span>${esc(v.en)}</span></li>`).join("")}</ul>
      <button class="primary big" data-act="learn-start">Start learning</button>`; }
    else if (step.type === "practice") { cls = "is-practice"; card = `
      <h2>Next: practice your new verbs</h2>
      <p class="muted">${step.fresh} new verb${step.fresh === 1 ? "" : "s"} · ${step.cards} flashcards, English → Swedish and back.</p>
      <button class="primary big" data-act="guided-start">Start practice</button>`; }
    else if (step.type === "review") { cls = "is-review"; card = `
      <h2>Next: review ${step.cards} due card${step.cards === 1 ? "" : "s"}</h2>
      <p class="muted">A short refresher keeps these verbs in long-term memory.</p>
      <button class="primary big" data-act="guided-start">Start review</button>`; }
    else { cls = "is-done"; card = `
      <h2>All caught up</h2>
      <p class="muted">You've learned every verb and nothing is due. Check back later, or explore particle verbs.</p>
      <a class="btn primary" href="#/particles">Particle verbs</a>`; }

    const skip = step.type !== "learn" && nextBatch().length
      ? `<p class="small" style="margin:16px 0 0;text-align:center">Feeling ahead? <button class="linklike" data-act="learn-start">Learn 5 more verbs now</button></p>` : "";

    const chips = ["all", ...tiers].map(t => `<button class="chip ${learn.tier === t ? "on" : ""}" data-act="learn-tier-home" data-v="${t}">${tierLabel(t)}</button>`).join("");
    const tierBars = tiers.map(t => {
      const all = VERBS.filter(v => v.tier === t), done = all.filter(v => state.learned[v.i]).length;
      return `<div><div class="row between"><span>${tierLabel(t)}</span><span class="muted small">${done} / ${all.length}</span></div>
        <div class="bar t${t}"><i style="width:${all.length ? done / all.length * 100 : 0}%"></i></div></div>`;
    }).join("");

    app.innerHTML = `
      <div class="hello"><h1>Hej!</h1><p class="muted">${learnedN === 0 ? "Welcome. Here is your very first step." : "Good to see you again. Here is where you are and what comes next."}</p></div>
      <ol class="path">${path}</ol>
      <div class="card-box next ${cls}">${card}${skip}</div>
      <div class="pills">
        <div class="pill-stat"><b>${learnedN}</b> of ${VERBS.length} verbs learned</div>
        <div class="pill-stat"><b>${dueN}</b> cards due now</div>
        <div class="pill-stat"><b>${cards.filter(c => !isNew(c)).length}</b> cards in rotation</div>
      </div>
      <div class="street">
        ${particleCard()}
        ${irregularCard()}
        <div class="card-box"><h3>Progress by frequency</h3>${tierBars}
          <div class="opt-title" style="margin-top:4px">Learn from</div><div class="groups" style="margin-bottom:0">${chips}</div></div>
      </div>
      <p class="muted small" style="margin-top:28px">Want to drill freely? Use <a href="#/practice">Practice</a> or <a href="#/particles">Particle verbs</a>. Progress is saved in this browser. <button class="linklike" data-act="reset">Reset progress</button></p>`;
  }

  /* ---------- learn ---------- */
  const learn = { tier: "all", batch: null, idx: 0, showEn: true };

  function nextBatch() {
    return VERBS.filter(v => !state.learned[v.i] && (learn.tier === "all" || v.tier === learn.tier)).slice(0, BATCH);
  }

  function learnView() {
    if (learn.batch) return learnCard();
    const batch = nextBatch();
    const chips = ["all", ...tiers].map(t => `<button class="chip ${learn.tier === t ? "on" : ""}" data-act="learn-tier" data-v="${t}">${tierLabel(t)}</button>`).join("");
    const remaining = VERBS.filter(v => !state.learned[v.i] && (learn.tier === "all" || v.tier === learn.tier)).length;
    app.innerHTML = `
      <h1>Learn</h1>
      <p class="muted">Each verb comes with four sentences: infinitiv, presens, preteritum and supinum. Read them, say them out loud, then move on.</p>
      <div class="opt-title">Which verbs?</div>
      <div class="groups">${chips}</div>
      ${batch.length ? `
        <div class="card-box">
          <h3>Your next ${batch.length} verbs <span class="muted small">(${remaining} left)</span></h3>
          <ul class="batch-list">${batch.map(v => `<li><b>${esc(v.i)}</b><span class="muted">${esc(v.en)}</span></li>`).join("")}</ul>
          <button class="primary" data-act="learn-start">Start</button>
        </div>`
        : `<div class="empty">You've learned every verb in this group. Try another group or practice flashcards.</div>`}`;
  }

  function learnCard() {
    const v = learn.batch[learn.idx], last = learn.idx === learn.batch.length - 1;
    const dots = learn.batch.map((_, k) => `<i class="${k < learn.idx ? "done" : k === learn.idx ? "cur" : ""}"></i>`).join("");
    app.innerHTML = `
      <div class="dots">${dots}</div>
      <div class="card-box ${learn.showEn ? "" : "hide-en"}">
        <div class="vhead">
          <div><h2>att ${esc(v.i)}</h2><div class="muted">${esc(v.en)}</div></div>
          <div>${tags(v)}</div>
        </div>
        ${formsHtml(v)}
        ${sentencesHtml(v)}
        <div class="row between" style="margin-top:10px">
          <label class="check small muted"><input type="checkbox" data-act="toggle-en" ${learn.showEn ? "checked" : ""}> Show translations</label>
          <span class="muted small">${learn.idx + 1} / ${learn.batch.length}</span>
        </div>
      </div>
      <div class="nav-row">
        <button data-act="learn-prev" ${learn.idx === 0 ? "disabled" : ""}>← Back</button>
        ${last ? `<button class="primary" data-act="learn-finish">I know these — add to flashcards</button>`
               : `<button class="primary" data-act="learn-next">Next →</button>`}
      </div>`;
  }

  /* ---------- particle verb learning (grouped by stem verb) ---------- */
  const stemOf = pv => pv.split(" ")[0];
  const pKey = p => "P:" + p.pv;
  const pLearned = p => !!state.learned[pKey(p)];

  // Batches of up to 5 particle verbs sharing a stem (all "hålla", then "ta" ...).
  // Stems with fewer than 3 verbs are pooled together so no batch is tiny.
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
    if (!pl.batch) return home();
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
    const family = b.map((x, k) => `<span class="chip ${k === pl.idx ? "on" : ""}">${esc(x.pv)}</span>`).join(" ");
    app.innerHTML = `
      <div class="dots">${dots}</div>
      <p class="muted small" style="margin:0 0 8px">Group: <b>${esc(stemsLabel(b))}</b></p>
      <div class="card-box">
        <div class="vhead">
          <div><h2>${esc(p.pv)}</h2><div class="muted">${esc(p.en)}</div></div>
          <div><span class="badge">particle: ${esc(p.g)}</span></div>
        </div>
        <div class="forms" style="grid-template-columns:repeat(3,1fr)">
          <div class="t-pres"><span>Presens</span><b>${esc(p.forms[0])}</b></div>
          <div class="t-pret"><span>Preteritum</span><b>${esc(p.forms[1])}</b></div>
          <div class="t-sup"><span>Supinum</span><b>har ${esc(p.forms[2])}</b></div>
        </div>
        <div class="tense t-inf">
          <div class="lab">Example</div>
          <div class="sv">${esc(p.sv)}</div>
          <button class="icon-btn" data-act="speak" data-text="${esc(p.sv)}" aria-label="Listen">${SPK}</button>
          <div class="en">${esc(p.sven)}</div>
        </div>
        <div class="groups" style="margin:14px 0 0">${family}</div>
      </div>
      <div class="nav-row">
        <button data-act="pl-prev" ${pl.idx === 0 ? "disabled" : ""}>← Back</button>
        ${last ? `<button class="primary" data-act="pl-quiz">Quick quiz →</button>` : `<button class="primary" data-act="pl-next">Next →</button>`}
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
      <div class="progress"><span>Question ${pl.qi + 1} of ${pl.order.length}</span><span>${esc(stemsLabel(b))}</span></div>
      <div class="card-box">
        <p class="muted small">Which particle verb says this in Swedish?</p>
        <div class="big-q">${esc(p.sven)}</div>
        ${pl.solved ? `<div class="reveal"><div style="font-size:1.1rem">${esc(p.sv)} <button class="icon-btn" data-act="speak" data-text="${esc(p.sv)}" aria-label="Listen">${SPK}</button></div></div>` : ""}
        <div class="opts">${opts}</div>
        ${pl.wrong.length && !pl.solved ? `<p class="warn small" style="margin:10px 0 0">Not quite, try again.</p>` : ""}
      </div>
      <div class="nav-row"><span></span>${pl.solved ? `<button class="primary" data-act="pl-qnext">${pl.qi === pl.order.length - 1 ? "See result" : "Next →"}</button>` : ""}</div>`;
  }

  function plResult() {
    const n = pl.order.length;
    app.innerHTML = `
      <div class="card-box done-card">${burst()}
        <h2>${pl.firstTry === n ? "Perfect!" : "Done!"}</h2>
        <p class="muted">${pl.firstTry} of ${n} right on the first try.</p>
        <p>Next, a flashcard round to lock these in.</p>
        <button class="primary big" data-act="pl-finish">Practice these ${n} cards</button>
      </div>`;
  }

  function plFinish() {
    const b = pl.batch;
    b.forEach(p => { state.learned[pKey(p)] = Date.now(); });
    save(); pl.batch = null;
    startSession(shuffle(b.map(p => ({ key: "P:" + p.pv, type: "P", tier: p.tier, group: p.g, item: p }))), "#/home", true, "particle");
  }

  /* ---------- practice setup ---------- */
  const prac = { mode: "A", tier: "all", unlearned: false, group: "all", irrOnly: false };

  function pool(o) {
    return allCards().filter(c => {
      if (o.mode === "P") return c.type === "P" && (o.tier === "all" || c.tier === o.tier) && (o.group === "all" || c.group === o.group);
      if (c.type !== o.mode) return false;
      if (o.irrOnly && !c.item.irr) return false;
      if (o.tier !== "all" && c.tier !== o.tier) return false;
      return o.unlearned || state.learned[c.item.i];
    });
  }
  function buildQueue(o) {
    const p = pool(o);
    const due = shuffle(p.filter(isDue));
    const fresh = shuffle(p.filter(isNew)).slice(0, NEW_PER_SESSION);
    return shuffle(due.concat(fresh)).slice(0, SESSION_MAX);
  }

  function practiceSetup() {
    const modeBtn = (m, title, sub) => `<button class="chip ${prac.mode === m ? "on" : ""}" data-act="prac-mode" data-v="${m}" title="${sub}">${title}</button>`;
    const tierChips = ["all", ...tiers].map(t => `<button class="chip ${prac.tier === t ? "on" : ""}" data-act="prac-tier" data-v="${t}">${tierLabel(t)}</button>`).join("");
    const p = pool(prac), due = p.filter(isDue).length, fresh = Math.min(p.filter(isNew).length, NEW_PER_SESSION);
    const learnedN = VERBS.filter(v => state.learned[v.i]).length;
    app.innerHTML = `
      <h1>Practice</h1>
      <div class="opt-title">Card direction</div>
      <div class="groups">
        ${modeBtn("A", "A · English → Swedish", "English on the front, Swedish infinitiv and conjugations on the back")}
        ${modeBtn("B", "B · Swedish → English", "Swedish infinitiv on the front, English and conjugations on the back")}
        ${modeBtn("C", "C · Irregular conjugations", "Swedish infinitiv on the front, presens / preteritum / supinum on the back (irregular verbs only)")}
      </div>
      <p class="muted small">${{ A: "Front: English. Back: Swedish infinitiv with presens, preteritum and supinum below.", B: "Front: Swedish infinitiv. Back: English with the Swedish conjugations below.", C: "Irregular verbs only. Front: the infinitiv. Back: presens, preteritum and supinum. Can you recall the forms?" }[prac.mode]}</p>
      <div class="opt-title">Frequency</div>
      <div class="groups">${tierChips}</div>
      ${prac.mode === "C" ? "" : `<label class="check" style="margin-right:1.2rem"><input type="checkbox" data-act="prac-irr" ${prac.irrOnly ? "checked" : ""}> Irregular verbs only</label>`}
      <label class="check"><input type="checkbox" data-act="prac-unlearned" ${prac.unlearned ? "checked" : ""}> Include verbs I haven't learned yet</label>
      <div class="card-box" style="margin-top:20px">
        ${p.length === 0 ? `<p class="muted">${learnedN === 0 ? "You haven't learned any verbs yet. Go to Learn first, or tick the box above." : "No cards match these filters."}</p>`
          : `<p><b>${due}</b> due · <b>${fresh}</b> new ${due + fresh === 0 ? "<span class='muted'>— nothing to review right now</span>" : ""}</p>`}
        <button class="primary" data-act="prac-start" ${due + fresh === 0 ? "disabled" : ""}>Start session</button>
      </div>`;
  }

  /* ---------- particle setup ---------- */
  function particleSetup() {
    prac.mode = "P";
    const groups = [...new Set(PARTS.map(p => p.g))];
    const count = g => PARTS.filter(p => p.g === g).length;
    const chips = [`<button class="chip ${prac.group === "all" ? "on" : ""}" data-act="part-group" data-v="all">All (${PARTS.length})</button>`]
      .concat(groups.map(g => `<button class="chip ${prac.group === g ? "on" : ""}" data-act="part-group" data-v="${esc(g)}">${esc(g)} (${count(g)})</button>`)).join("");
    const tierChips = ["all", ...tiers].map(t => `<button class="chip ${prac.tier === t ? "on" : ""}" data-act="part-tier" data-v="${t}">${t === "all" ? "All levels" : t === 1 ? "Common" : t === 2 ? "Useful" : "Advanced"}</button>`).join("");
    const p = pool(prac), due = p.filter(isDue).length, fresh = Math.min(p.filter(isNew).length, NEW_PER_SESSION);
    const shown = PARTS.filter(x => (prac.group === "all" || x.g === prac.group) && (prac.tier === "all" || x.tier === prac.tier));
    app.innerHTML = `
      <h1>Particle verbs</h1>
      <p class="muted">Partikelverb change meaning with their particle. Front: the particle verb. Back: English and an example sentence.</p>
      <div class="card-box" style="margin-bottom:16px">
        <b>Learn by stem verb</b>
        <p class="muted small" style="margin:.2rem 0 .6rem">Study particle verbs in groups that share a stem (hålla med, hålla på, …), then take a quick quiz.</p>
        <button class="primary" data-act="pl-start">${nextParticleBatch() ? "Learn next group" : "All learned"}</button>
      </div>
      <div class="opt-title">Practice by particle</div>
      <div class="groups">${chips}</div>
      <div class="opt-title">Frequency</div>
      <div class="groups">${tierChips}</div>
      <div class="card-box">
        <p><b>${due}</b> due · <b>${fresh}</b> new</p>
        <button class="primary" data-act="prac-start" ${due + fresh === 0 ? "disabled" : ""}>Start session</button>
      </div>
      <div class="vlist">${shown.map(x => `
        <details class="v"><summary><span class="inf">${esc(x.pv)}</span><span class="rest">${esc(x.en)}</span>${pLearned(x) ? `<span class="tick" title="Learned">${CHK}</span>` : ""}</summary>
          <div class="body"><div class="sv" style="font-size:1.1rem">${esc(x.sv)}</div><div class="muted">${esc(x.sven)}</div>
          <p class="muted small" style="margin-top:8px">${x.forms.map(esc).join(" · ")}</p></div></details>`).join("")}</div>`;
  }

  /* ---------- flashcard session ---------- */
  function startSession(queue, back, guided, kind) {
    queue = queue || buildQueue(prac);
    if (!queue.length) return;
    session = { queue, i: 0, flipped: false, total: queue.length, again: 0, back: back || location.hash, guided: !!guided, kind: kind || "verb" };
    renderSession();
  }

  function conjHtml(v) {
    return `<div class="conj"><div class="t-pres"><span>Presens</span><b>${esc(v.p)}</b></div><div class="t-pret"><span>Preteritum</span><b>${esc(v.t)}</b></div><div class="t-sup"><span>Supinum</span><b>har ${esc(v.s)}</b></div></div>`;
  }
  function faces(c) {
    const v = c.item;
    if (c.type === "A") return [
      `<span class="side">English</span><div class="big">${esc(v.en)}</div><div class="sub">${v.lvl} · ${tierLabel(v.tier)}</div>`,
      `<span class="side">Svenska</span><div class="big">att ${esc(v.i)} <button class="icon-btn" data-act="speak" data-text="${esc(v.i)}" aria-label="Listen">${SPK}</button></div>${conjHtml(v)}`];
    if (c.type === "C") return [
      `<span class="side">Irregular verb</span><div class="big">att ${esc(v.i)} <button class="icon-btn" data-act="speak" data-text="${esc(v.i)}" aria-label="Listen">${SPK}</button></div><div class="sub">${esc(v.en)}</div><div class="sub small" style="margin-top:14px">presens · preteritum · supinum?</div>`,
      `<span class="side">Conjugation</span><div class="big">att ${esc(v.i)}</div>${conjHtml(v)}<div class="example"><div style="font-size:1.05rem">${hl(v.ex[2][0])}</div><div class="muted small">${esc(v.ex[2][1])}</div></div>`];
    if (c.type === "B") return [
      `<span class="side">Svenska</span><div class="big">att ${esc(v.i)} <button class="icon-btn" data-act="speak" data-text="${esc(v.i)}" aria-label="Listen">${SPK}</button></div><div class="sub">${v.lvl} · ${tierLabel(v.tier)}</div>`,
      `<span class="side">English</span><div class="big">${esc(v.en)}</div>${conjHtml(v)}`];
    return [
      `<span class="side">Partikelverb</span><div class="big">${esc(v.pv)} <button class="icon-btn" data-act="speak" data-text="${esc(v.pv)}" aria-label="Listen">${SPK}</button></div><div class="sub">particle: ${esc(v.g)}</div>`,
      `<span class="side">English</span><div class="big">${esc(v.en)}</div>
       <div class="example"><div style="font-size:1.1rem">${esc(v.sv)}</div><div class="muted">${esc(v.sven)}</div></div>
       <p class="muted small" style="margin:14px 0 0">${v.forms.map(esc).join(" · ")}</p>`];
  }

  function renderSession() {
    const s = session;
    if (s.i >= s.queue.length) return sessionDone();
    const c = s.queue[s.i], [front, back] = faces(c), cur = state.cards[c.key];
    const hint = r => fmtInterval(schedule(cur, r));
    app.innerHTML = `
      <div class="progress"><span>Card ${Math.min(s.i + 1, s.queue.length)} of ${s.queue.length}</span><a href="${s.back}" class="small muted" data-act="end">End session</a></div>
      <div class="dots"><i class="done" style="flex:${s.i}"></i><i style="flex:${Math.max(s.queue.length - s.i, 0)}"></i></div>
      <div class="flip card-${c.type} ${s.flipped ? "flipped" : ""}" data-act="flip" tabindex="0" role="button" aria-label="Flip card">
        <div class="flip-inner"><div class="face front">${front}</div><div class="face back">${back}</div></div>
      </div>
      <div class="hint">${s.flipped ? "How well did you know it?" : "Click the card or press Space to flip"}</div>
      <div class="rate ${s.flipped ? "" : "invisible"}">
        <button class="again" data-act="rate" data-v="again">Again<small>${hint("again")}</small></button>
        <button data-act="rate" data-v="hard">Hard<small>${hint("hard")}</small></button>
        <button class="good" data-act="rate" data-v="good">Good<small>${hint("good")}</small></button>
        <button data-act="rate" data-v="easy">Easy<small>${hint("easy")}</small></button>
      </div>`;
  }

  function flip() {
    if (!session) return;
    session.flipped = !session.flipped;
    const el = app.querySelector(".flip");
    el.classList.toggle("flipped", session.flipped);
    app.querySelector(".rate").classList.toggle("invisible", !session.flipped);
    app.querySelector(".hint").textContent = session.flipped ? "How well did you know it?" : "Click the card or press Space to flip";
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
    if (s.kind === "particle") return particleDone();
    const step = s.guided ? nextStep() : null;
    let cta;
    if (!s.guided) cta = `<a class="btn primary" href="${s.back}" data-act="again-session">Another round</a><a class="btn" href="#/home">Home</a>`;
    else if (step.type === "learn") cta = `<button class="primary big" data-act="learn-start">Next: learn 5 new verbs</button><a class="btn" href="#/home">My progress</a>`;
    else if (step.type === "done") cta = `<a class="btn primary" href="#/home">My progress</a>`;
    else cta = `<button class="primary big" data-act="guided-start">Keep going: ${step.type === "review" ? "review due cards" : "practice new verbs"}</button><a class="btn" href="#/home">My progress</a>`;
    app.innerHTML = `
      <div class="card-box done-card">${burst()}
        <h2>Session complete</h2>
        <p class="muted">${s.total} cards reviewed${s.again ? `, ${s.again} to repeat` : ""}.</p>
        ${s.guided && step.type === "learn" ? `<p>Nice work. Ready for the next five?</p>` : ""}
        <div class="row" style="justify-content:center">${cta}</div>
      </div>`;
  }

  function particleDone() {
    const s = session, nb = nextParticleBatch();
    app.innerHTML = `
      <div class="card-box done-card">${burst()}
        <h2>Group complete</h2>
        <p class="muted">${s.total} particle verbs practised.</p>
        ${nb ? `<p>Next group: <b>${esc(stemsLabel(nb))}</b></p>` : `<p>You've learned every particle verb!</p>`}
        <div class="row" style="justify-content:center">
          ${nb ? `<button class="primary big" data-act="pl-start">Learn next group</button>` : ""}
          <a class="btn ${nb ? "" : "primary"}" href="#/home">My progress</a>
        </div>
      </div>`;
  }

  /* ---------- verb list ---------- */
  const vlist = { q: "", tier: "all", irr: false };
  function verbsView() {
    const chips = ["all", ...tiers].map(t => `<button class="chip ${vlist.tier === t ? "on" : ""}" data-act="list-tier" data-v="${t}">${tierLabel(t)}</button>`).join("");
    app.innerHTML = `
      <h1>All verbs</h1>
      <input type="search" id="q" placeholder="Search Swedish or English…" value="${esc(vlist.q)}" aria-label="Search verbs">
      <div class="groups" style="margin-top:12px">${chips}<button class="chip ${vlist.irr ? "on" : ""}" data-act="list-irr">Irregular only</button></div>
      <div id="vl"></div>`;
    renderVlist();
  }
  function renderVlist() {
    const q = vlist.q.trim().toLowerCase();
    const list = VERBS.filter(v => (vlist.tier === "all" || v.tier === vlist.tier) && (!vlist.irr || v.irr) &&
      (!q || v.i.includes(q) || v.en.toLowerCase().includes(q) || [v.p, v.t, v.s].some(f => f.includes(q))));
    document.getElementById("vl").innerHTML = list.length ? `<div class="vlist">${list.map(v => `
      <details class="v"><summary>
        <span class="inf">${esc(v.i)}</span>
        <span class="rest">${esc(v.p)} · ${esc(v.t)} · ${esc(v.s)} — ${esc(v.en)}</span>
        ${state.learned[v.i] ? `<span class="tick" title="Learned">${CHK}</span>` : ""}
      </summary><div class="body">${tags(v)}${sentencesHtml(v)}</div></details>`).join("")}</div>`
      : `<div class="empty">No verbs found.</div>`;
  }

  /* ---------- events ---------- */
  app.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act, v = el.dataset.v;
    if (act === "speak") { e.stopPropagation(); return speak(el.dataset.text); }
    switch (act) {
      case "flip": return flip();
      case "rate": return rate(v);
      case "reset":
        if (confirm("Delete all learned verbs and flashcard progress?")) { state = { learned: {}, cards: {} }; save(); home(); }
        return;
      case "learn-tier": learn.tier = v === "all" ? v : +v; return learnView();
      case "learn-start": return startLearning();
      case "guided-start": return startGuidedPractice();
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
      case "learn-tier-home": learn.tier = v === "all" ? v : +v; return home();
      case "learn-next": learn.idx++; return learnView();
      case "learn-prev": learn.idx--; return learnView();
      case "learn-finish":
        learn.batch.forEach(x => { state.learned[x.i] = Date.now(); });
        save(); learn.batch = null; return startGuidedPractice();
      case "prac-mode": prac.mode = v; return practiceSetup();
      case "prac-tier": prac.tier = v === "all" ? v : +v; return practiceSetup();
      case "part-tier": prac.tier = v === "all" ? v : +v; return particleSetup();
      case "part-group": prac.group = v; return particleSetup();
      case "prac-start": return startSession();
      case "end": e.preventDefault(); return goto(session ? session.back : "#/home");
      case "again-session": e.preventDefault(); return startSession();
      case "list-irr": vlist.irr = !vlist.irr; return verbsView();
      case "irr-start": prac.mode = "C"; prac.unlearned = false; prac.tier = "all"; return goto("#/practice");
      case "list-tier": vlist.tier = v === "all" ? v : +v; return verbsView();
    }
  });
  app.addEventListener("change", e => {
    const act = e.target.dataset.act;
    if (act === "toggle-en") { learn.showEn = e.target.checked; learnCard(); }
    if (act === "prac-irr") { prac.irrOnly = e.target.checked; practiceSetup(); }
    if (act === "prac-unlearned") { prac.unlearned = e.target.checked; practiceSetup(); }
  });
  app.addEventListener("input", e => {
    if (e.target.id === "q") { vlist.q = e.target.value; renderVlist(); }
  });
  document.addEventListener("keydown", e => {
    if (!session || session.i >= session.queue.length || e.target.closest("button")) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    else if (session.flipped && "1234".includes(e.key) && e.key) rate(["again", "hard", "good", "easy"][+e.key - 1]);
  });

  // leaving a learn batch half-way resets it
  window.addEventListener("hashchange", () => { if (!location.hash.startsWith("#/learn")) learn.batch = null; if (location.hash !== "#/pl") pl.batch = null; });

  route();
})();
