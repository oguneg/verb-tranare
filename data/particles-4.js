// Compact particle verb entries. Q(pv, english, swedishExample, englishExample, tier)
// Forms and the particle group are derived from the stem verb, so only the meaning and an example are written here.
(function () {
  const GROUPS = ["med", "upp", "ut", "in", "på", "av", "till", "ner", "över", "om", "fram", "bort", "ihop", "tillbaka", "efter"];
  const have = new Set(window.PARTICLES.map(p => p.pv));
  window.Q = (pv, en, sv, sven, tier) => {
    if (have.has(pv)) return;
    const stem = pv.split(" ")[0], rest = pv.slice(stem.length), b = window.VERB_BASE[stem];
    if (!b) { (window.PARTICLE_ORPHANS = window.PARTICLE_ORPHANS || []).push(pv); return; }
    const g = rest.trim().split(" ").find(w => GROUPS.includes(w)) || "övriga";
    have.add(pv);
    window.PARTICLES.push({ pv, en, sv, sven, g, tier: tier || 3, forms: b.map(f => f + rest) });
  };
})();
