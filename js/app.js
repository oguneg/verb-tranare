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
  const tierLabel = t => t === "all" ? "All levels" : `Top ${t === 1 ? "1–50" : t === 2 ? "51–100" : "tier " + t}`;

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
      <div><span>Infinitiv</span><b>att ${esc(v.i)}</b></div>
      <div><span>Presens</span><b>${esc(v.p)}</b></div>
      <div><span>Preteritum</span><b>${esc(v.t)}</b></div>
      <div><span>Supinum</span><b>har ${esc(v.s)}</b></div></div>`;
  }
  function sentencesHtml(v) {
    return v.ex.map(([sv, en], k) => `
      <div class="tense">
        <div class="lab">${TENSES[k]}</div>
        <div class="sv">${hl(sv)}</div>
        <button class="icon-btn" data-act="speak" data-text="${esc(sv)}" aria-label="Listen" title="Listen">🔊</button>
        <div class="en">${esc(en)}</div>
      </div>`).join("");
  }
  const tags = v => `<span class="badge">${v.lvl}</span> <span class="badge gold">${tierLabel(v.tier)}</span>`;

  /* ---------- router ---------- */
  const routes = { home, learn: learnView, practice: practiceSetup, particles: particleSetup, verbs: verbsView };
  let session = null;

  function route() {
    session = null;
    const name = (location.hash.replace(/^#\//, "").split("/")[0]) || "home";
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
    (routes[name] || home)();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- home ---------- */
  function home() {
    const learnedN = VERBS.filter(v => state.learned[v.i]).length;
    const cards = allCards();
    const due = cards.filter(isDue).length;
    const seen = cards.filter(c => !isNew(c)).length;
    const tierBars = tiers.map(t => {
      const all = VERBS.filter(v => v.tier === t), done = all.filter(v => state.learned[v.i]).length;
      return `<div><div class="row between"><span>${tierLabel(t)}</span><span class="muted small">${done} / ${all.length}</span></div>
        <div class="bar"><i style="width:${all.length ? done / all.length * 100 : 0}%"></i></div></div>`;
    }).join("");
    app.innerHTML = `
      <section class="hero">
        <h1>Hej! Let's learn Swedish verbs.</h1>
        <p class="muted">Learn five verbs at a time with four example sentences each, then keep them fresh with spaced-repetition flashcards.</p>
      </section>
      <div class="stats">
        <div class="stat"><b>${learnedN}</b><span class="muted">of ${VERBS.length} verbs learned</span></div>
        <div class="stat"><b>${due}</b><span class="muted">flashcards due now</span></div>
        <div class="stat"><b>${seen}</b><span class="muted">cards in rotation</span></div>
      </div>
      <div class="card-box"><h3>Progress by frequency</h3>${tierBars}</div>
      <div class="cta">
        <a href="#/learn"><strong>Learn new verbs</strong><span class="muted small">5 at a time, 4 sentences each</span></a>
        <a href="#/practice"><strong>Practice flashcards</strong><span class="muted small">English ⇄ Swedish</span></a>
        <a href="#/particles"><strong>Particle verbs</strong><span class="muted small">hålla med, ta bort, …</span></a>
      </div>
      <p class="muted small" style="margin-top:28px">Progress is saved in this browser. <button class="icon-btn" data-act="reset" style="font-size:.8rem">Reset progress</button></p>`;
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
        : `<div class="empty">🎉 You've learned every verb in this group. Try another group or practice flashcards.</div>`}`;
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

  /* ---------- practice setup ---------- */
  const prac = { mode: "A", tier: "all", unlearned: false, group: "all" };

  function pool(o) {
    return allCards().filter(c => {
      if (o.mode === "P") return c.type === "P" && (o.tier === "all" || c.tier === o.tier) && (o.group === "all" || c.group === o.group);
      if (c.type !== o.mode) return false;
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
      </div>
      <p class="muted small">${prac.mode === "A" ? "Front: English. Back: Swedish infinitiv with presens, preteritum and supinum below." : "Front: Swedish infinitiv. Back: English with the Swedish conjugations below."}</p>
      <div class="opt-title">Frequency</div>
      <div class="groups">${tierChips}</div>
      <label class="check"><input type="checkbox" data-act="prac-unlearned" ${prac.unlearned ? "checked" : ""}> Include verbs I haven't learned yet</label>
      <div class="card-box" style="margin-top:20px">
        ${p.length === 0 ? `<p class="muted">${learnedN === 0 ? "You haven't learned any verbs yet. Go to Learn first, or tick the box above." : "No cards match these filters."}</p>`
          : `<p><b>${due}</b> due · <b>${fresh}</b> new ${due + fresh === 0 ? "<span class='muted'>— nothing to review right now 🎉</span>" : ""}</p>`}
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
    const tierChips = ["all", ...tiers].map(t => `<button class="chip ${prac.tier === t ? "on" : ""}" data-act="part-tier" data-v="${t}">${t === "all" ? "All levels" : t === 1 ? "Common" : "Next steps"}</button>`).join("");
    const p = pool(prac), due = p.filter(isDue).length, fresh = Math.min(p.filter(isNew).length, NEW_PER_SESSION);
    const shown = PARTS.filter(x => (prac.group === "all" || x.g === prac.group) && (prac.tier === "all" || x.tier === prac.tier));
    app.innerHTML = `
      <h1>Particle verbs</h1>
      <p class="muted">Partikelverb change meaning with their particle. Front: the particle verb. Back: English and an example sentence.</p>
      <div class="opt-title">Group by particle</div>
      <div class="groups">${chips}</div>
      <div class="opt-title">Frequency</div>
      <div class="groups">${tierChips}</div>
      <div class="card-box">
        <p><b>${due}</b> due · <b>${fresh}</b> new</p>
        <button class="primary" data-act="prac-start" ${due + fresh === 0 ? "disabled" : ""}>Start session</button>
      </div>
      <div class="vlist">${shown.map(x => `
        <details class="v"><summary><span class="inf">${esc(x.pv)}</span><span class="rest">${esc(x.en)}</span></summary>
          <div class="body"><div class="sv" style="font-size:1.1rem">${esc(x.sv)}</div><div class="muted">${esc(x.sven)}</div>
          <p class="muted small" style="margin-top:8px">${x.forms.map(esc).join(" · ")}</p></div></details>`).join("")}</div>`;
  }

  /* ---------- flashcard session ---------- */
  function startSession() {
    const queue = buildQueue(prac);
    if (!queue.length) return;
    session = { queue, i: 0, flipped: false, total: queue.length, again: 0, back: location.hash };
    renderSession();
  }

  function conjHtml(v) {
    return `<div class="conj"><div><span>Presens</span><b>${esc(v.p)}</b></div><div><span>Preteritum</span><b>${esc(v.t)}</b></div><div><span>Supinum</span><b>har ${esc(v.s)}</b></div></div>`;
  }
  function faces(c) {
    const v = c.item;
    if (c.type === "A") return [
      `<span class="side">English</span><div class="big">${esc(v.en)}</div><div class="sub">${v.lvl} · ${tierLabel(v.tier)}</div>`,
      `<span class="side">Svenska</span><div class="big">att ${esc(v.i)} <button class="icon-btn" data-act="speak" data-text="${esc(v.i)}" aria-label="Listen">🔊</button></div>${conjHtml(v)}`];
    if (c.type === "B") return [
      `<span class="side">Svenska</span><div class="big">att ${esc(v.i)} <button class="icon-btn" data-act="speak" data-text="${esc(v.i)}" aria-label="Listen">🔊</button></div><div class="sub">${v.lvl} · ${tierLabel(v.tier)}</div>`,
      `<span class="side">English</span><div class="big">${esc(v.en)}</div>${conjHtml(v)}`];
    return [
      `<span class="side">Partikelverb</span><div class="big">${esc(v.pv)} <button class="icon-btn" data-act="speak" data-text="${esc(v.pv)}" aria-label="Listen">🔊</button></div><div class="sub">particle: ${esc(v.g)}</div>`,
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
      <div class="flip ${s.flipped ? "flipped" : ""}" data-act="flip" tabindex="0" role="button" aria-label="Flip card">
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
    app.innerHTML = `
      <div class="card-box" style="text-align:center">
        <h2>Session complete 🎉</h2>
        <p class="muted">${s.total} cards reviewed${s.again ? `, ${s.again} to repeat` : ""}.</p>
        <div class="row" style="justify-content:center">
          <a class="btn primary" href="${s.back}" data-act="again-session">Another round</a>
          <a class="btn" href="#/home">Home</a>
        </div>
      </div>`;
  }

  /* ---------- verb list ---------- */
  const vlist = { q: "", tier: "all" };
  function verbsView() {
    const chips = ["all", ...tiers].map(t => `<button class="chip ${vlist.tier === t ? "on" : ""}" data-act="list-tier" data-v="${t}">${tierLabel(t)}</button>`).join("");
    app.innerHTML = `
      <h1>All verbs</h1>
      <input type="search" id="q" placeholder="Search Swedish or English…" value="${esc(vlist.q)}" aria-label="Search verbs">
      <div class="groups" style="margin-top:12px">${chips}</div>
      <div id="vl"></div>`;
    renderVlist();
  }
  function renderVlist() {
    const q = vlist.q.trim().toLowerCase();
    const list = VERBS.filter(v => (vlist.tier === "all" || v.tier === vlist.tier) &&
      (!q || v.i.includes(q) || v.en.toLowerCase().includes(q) || [v.p, v.t, v.s].some(f => f.includes(q))));
    document.getElementById("vl").innerHTML = list.length ? `<div class="vlist">${list.map(v => `
      <details class="v"><summary>
        <span class="inf">${esc(v.i)}</span>
        <span class="rest">${esc(v.p)} · ${esc(v.t)} · ${esc(v.s)} — ${esc(v.en)}</span>
        ${state.learned[v.i] ? `<span class="tick" title="Learned">✓</span>` : ""}
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
      case "learn-start": learn.batch = nextBatch(); learn.idx = 0; return learnView();
      case "learn-next": learn.idx++; return learnView();
      case "learn-prev": learn.idx--; return learnView();
      case "learn-finish":
        learn.batch.forEach(x => { state.learned[x.i] = Date.now(); });
        save(); learn.batch = null; return learnView();
      case "prac-mode": prac.mode = v; return practiceSetup();
      case "prac-tier": prac.tier = v === "all" ? v : +v; return practiceSetup();
      case "part-tier": prac.tier = v === "all" ? v : +v; return particleSetup();
      case "part-group": prac.group = v; return particleSetup();
      case "prac-start": return startSession();
      case "end": e.preventDefault(); return route();
      case "again-session": e.preventDefault(); return startSession();
      case "list-tier": vlist.tier = v === "all" ? v : +v; return verbsView();
    }
  });
  app.addEventListener("change", e => {
    const act = e.target.dataset.act;
    if (act === "toggle-en") { learn.showEn = e.target.checked; learnCard(); }
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
  window.addEventListener("hashchange", () => { if (!location.hash.startsWith("#/learn")) learn.batch = null; });

  route();
})();
