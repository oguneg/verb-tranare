// Dictionary lexicon: thousands of verbs with forms and an English gloss (no example sentences).
// Data files (data/lex-*.js) append lines to window.LEXDATA, one verb per line:
//   1|fiska|to fish                       group 1 (fiskar, fiskade, fiskat); -as verbs are deponent (andas, andades, andats)
//   2|höra|to hear                        group 2 (hör, hörde, hört; voiceless stem k/p/s/x gets -te)
//   y|lyfta|lyfter|lyfte|lyft|to lift     explicit forms, regular
//   x|bära|bär|bar|burit|to carry         explicit forms, irregular (marked as irregular)
// Verbs already in the curated lessons (window.VERBS) are skipped.
(function () {
  const have = new Set(window.VERBS.map(v => v.i));
  const LEX = [];
  const VOICELESS = /[kpsx]$/;

  function conj(c, inf) {
    if (inf.endsWith("as") && c === "1") {
      const st = inf.slice(0, -2);
      return [inf, st + "ades", st + "ats"];
    }
    const stem = inf.slice(0, -1);
    if (c === "1") return [inf + "r", stem + "ade", stem + "at"];
    // group 2
    const base = /(mm|nn)$/.test(stem) ? stem.slice(0, -1) : stem;
    const pres = stem.endsWith("r") ? stem : stem + "er";
    return [pres, base + (VOICELESS.test(stem) ? "te" : "de"), base + "t"];
  }

  const derived = [];
  String(window.LEXDATA || "").split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line[0] === "#") return;
    if (line[0] === "+") { derived.push(line.slice(1).split("|")); return; }
    const p = line.split("|"), c = p[0];
    let inf, en, forms;
    if (c === "x" || c === "y") { inf = p[1]; forms = [p[2], p[3], p[4]]; en = p[5]; }
    else { inf = p[1]; en = p[2]; forms = conj(c, inf); }
    if (!inf || !en || have.has(inf)) return;
    have.add(inf);
    LEX.push({ i: inf, p: forms[0], t: forms[1], s: forms[2], en, irr: c === "x" });
  });

  // prefix verbs built from a base verb (prefix|base|english): they inherit the base verb's forms
  const byInf = {};
  window.VERBS.concat(LEX).forEach(v => { byInf[v.i] = v; });
  derived.forEach(([prefix, base, en]) => {
    const b = byInf[base], inf = prefix + base;
    if (!b || !en || have.has(inf)) return;
    have.add(inf);
    const v = { i: inf, p: prefix + b.p, t: prefix + b.t, s: prefix + b.s, en, irr: !!b.irr };
    LEX.push(v); byInf[inf] = v;
  });
  window.LEX = LEX;

  // base forms by infinitiv, used to build particle verbs from their stem verb
  const base = {};
  window.VERBS.concat(LEX).forEach(v => { base[v.i] = [v.p, v.t, v.s]; });
  window.VERB_BASE = base;
})();
