// Irregular verbs (strong verbs, modals and other verbs with unpredictable forms).
// These stay part of the normal learning flow; this list also feeds the "Irregular conjugations" drill.
// To mark another verb as irregular, add its infinitiv here.
(function () {
  const IRREGULAR = [
    "vara", "ha", "göra", "kunna", "vilja", "få", "komma", "ta", "säga", "se", "gå", "veta", "ge",
    "bli", "finnas", "låta", "stå", "hålla", "sätta", "ligga", "sitta", "heta", "bo", "äta", "dricka",
    "sova", "skriva", "förstå", "lägga", "springa", "bära", "vinna", "dra", "slå", "falla", "sjunga",
    "gråta", "le", "sälja", "flyga", "välja", "bjuda", "erbjuda",
    "stiga", "bryta", "undvika", "behålla", "beskriva", "föredra", "fortsätta", "försvinna", "skjuta",
    "ljuga", "rida", "slippa", "stjäla", "tillåta", "växa", "bestå", "bita", "brinna", "dö", "frysa",
    "krypa", "sjunka", "skära", "slita", "binda",
    "fara", "finna", "gripa", "hugga", "lida", "njuta", "skrika", "smita", "sticka", "svära", "vrida", "förbjuda",
    "avgöra", "inse", "uppfinna", "avbryta", "uppstå", "rinna", "spricka", "hinna", "synas", "slåss", "knyta",
    "driva", "ingå", "vika", "tiga", "skina", "föreslå", "delta", "leda", "svälja",
    "bedra", "brista", "dölja", "flyta", "glida", "kliva", "spinna", "sprida", "stryka", "suga", "svika", "förlåta",
    "ingripa", "framstå", "överdriva", "avstå", "undgå", "umgås", "utgå", "utgöra", "anse", "inbjuda", "bortse",
    "förekomma", "framgå", "genomgå", "påstå", "uppehålla", "be", "anta", "sy",
    "duga", "förbinda", "tillgripa", "avge", "avgå", "överge", "omge", "omkomma", "utse", "vidta", "återge", "inleda",
    "smyga", "klyva", "sjuda", "glädja", "stinka", "strida", "pipa", "ryka", "gnida", "svälta", "bränna", "dammsuga"
  ];
  const set = new Set(IRREGULAR);
  window.VERBS.forEach(v => { v.irr = set.has(v.i); });
})();
