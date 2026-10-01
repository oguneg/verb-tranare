// Tier 1: the 50 most essential verbs (A1-A2).
// Format: V(tier, cefr, infinitiv, presens, preteritum, supinum, english, then 4 pairs [swedish, english]
// in this order: infinitiv, presens, preteritum, supinum sentence.
// *asterisks* mark the verb form being trained in each sentence.
window.VERBS = window.VERBS || [];
window.V = (tier, lvl, i, p, t, s, en, ...ex) => {
  const pairs = [];
  for (let k = 0; k < ex.length; k += 2) pairs.push([ex[k], ex[k + 1]]);
  window.VERBS.push({ i, p, t, s, en, tier, lvl, ex: pairs });
};

V(1, "A1", "vara", "är", "var", "varit", "to be",
  "Jag vill *vara* hemma ikväll.", "I want to be at home tonight.",
  "Hon *är* lärare.", "She is a teacher.",
  "Igår *var* vi i Göteborg.", "Yesterday we were in Gothenburg.",
  "Jag har *varit* trött hela veckan.", "I have been tired all week.");

V(1, "A1", "ha", "har", "hade", "haft", "to have",
  "Vi vill *ha* kaffe, tack.", "We would like coffee, please.",
  "Han *har* en stor hund.", "He has a big dog.",
  "Jag *hade* ingen tid igår.", "I had no time yesterday.",
  "Jag har *haft* ont i huvudet.", "I have had a headache.");

V(1, "A1", "göra", "gör", "gjorde", "gjort", "to do, to make",
  "Vad ska vi *göra* i helgen?", "What are we going to do this weekend?",
  "Vad *gör* du just nu?", "What are you doing right now?",
  "Jag *gjorde* läxorna igår.", "I did the homework yesterday.",
  "Har du *gjort* middag?", "Have you made dinner?");

V(1, "A1", "kunna", "kan", "kunde", "kunnat", "can, to be able to, to know (a skill)",
  "Jag vill *kunna* prata svenska flytande.", "I want to be able to speak Swedish fluently.",
  "Hon *kan* simma.", "She can swim.",
  "Vi *kunde* inte komma igår.", "We couldn't come yesterday.",
  "Jag har aldrig *kunnat* laga mat.", "I have never been able to cook.");

V(1, "A1", "vilja", "vill", "ville", "velat", "to want",
  "Det är svårt att alltid *vilja* samma sak.", "It is hard to always want the same thing.",
  "Jag *vill* ha en kopp te.", "I want a cup of tea.",
  "Hon *ville* åka hem.", "She wanted to go home.",
  "Jag har alltid *velat* resa till Japan.", "I have always wanted to travel to Japan.");

V(1, "A1", "få", "får", "fick", "fått", "to get, to be allowed to",
  "Jag hoppas *få* ett jobb snart.", "I hope to get a job soon.",
  "Du *får* gå nu.", "You may go now.",
  "Vi *fick* en present av dem.", "We got a present from them.",
  "Har du *fått* mitt mejl?", "Have you received my email?");

V(1, "A1", "komma", "kommer", "kom", "kommit", "to come",
  "Jag ska *komma* hem klockan sex.", "I will come home at six o'clock.",
  "Bussen *kommer* snart.", "The bus is coming soon.",
  "Hon *kom* för sent igår.", "She came too late yesterday.",
  "Har han *kommit* än?", "Has he come yet?");

V(1, "A1", "ta", "tar", "tog", "tagit", "to take",
  "Kan du *ta* med dig paraplyet?", "Can you bring the umbrella?",
  "Jag *tar* bussen till jobbet.", "I take the bus to work.",
  "Han *tog* min cykel.", "He took my bike.",
  "Jag har *tagit* en kopp kaffe.", "I have taken a cup of coffee.");

V(1, "A1", "säga", "säger", "sa", "sagt", "to say",
  "Jag vill *säga* en sak.", "I want to say one thing.",
  "Vad *säger* du?", "What are you saying?",
  "Hon *sa* att hon var sjuk.", "She said that she was sick.",
  "Har han *sagt* något?", "Has he said anything?");

V(1, "A1", "se", "ser", "såg", "sett", "to see",
  "Jag vill *se* filmen.", "I want to see the film.",
  "Jag *ser* en fågel.", "I see a bird.",
  "Vi *såg* en film igår.", "We saw a film yesterday.",
  "Har du *sett* min nyckel?", "Have you seen my key?");

V(1, "A1", "gå", "går", "gick", "gått", "to go, to walk",
  "Jag vill *gå* hem nu.", "I want to go home now.",
  "Han *går* till skolan.", "He walks to school.",
  "Vi *gick* i skogen igår.", "We walked in the forest yesterday.",
  "Jag har *gått* i två timmar.", "I have walked for two hours.");

V(1, "A1", "veta", "vet", "visste", "vetat", "to know (a fact)",
  "Jag vill *veta* sanningen.", "I want to know the truth.",
  "Jag *vet* inte.", "I don't know.",
  "Hon *visste* svaret.", "She knew the answer.",
  "Jag har aldrig *vetat* det.", "I have never known that.");

V(1, "A1", "ge", "ger", "gav", "gett", "to give",
  "Jag vill *ge* dig en present.", "I want to give you a present.",
  "Hon *ger* mig en bok.", "She gives me a book.",
  "Han *gav* mig nyckeln.", "He gave me the key.",
  "Jag har *gett* henne pengarna.", "I have given her the money.");

V(1, "A1", "tycka", "tycker", "tyckte", "tyckt", "to think, to be of the opinion",
  "Jag brukar *tycka* att vintern är fin.", "I usually think winter is beautiful.",
  "Jag *tycker* om kaffe.", "I like coffee.",
  "Vad *tyckte* du om filmen?", "What did you think of the film?",
  "Jag har alltid *tyckt* att hon är snäll.", "I have always thought she is kind.");

V(1, "A1", "tro", "tror", "trodde", "trott", "to believe, to think",
  "Jag vill *tro* på dig.", "I want to believe you.",
  "Jag *tror* att det regnar.", "I think it is raining.",
  "Han *trodde* att jag skämtade.", "He thought I was joking.",
  "Jag har aldrig *trott* på spöken.", "I have never believed in ghosts.");

V(1, "A1", "bli", "blir", "blev", "blivit", "to become, to get",
  "Jag vill *bli* läkare.", "I want to become a doctor.",
  "Det *blir* kallt ikväll.", "It will get cold tonight.",
  "Hon *blev* sjuk igår.", "She got sick yesterday.",
  "Han har *blivit* lärare.", "He has become a teacher.");

V(1, "A1", "behöva", "behöver", "behövde", "behövt", "to need",
  "Jag kommer att *behöva* hjälp.", "I will need help.",
  "Jag *behöver* en paus.", "I need a break.",
  "Vi *behövde* mer tid.", "We needed more time.",
  "Har du *behövt* hjälp?", "Have you needed help?");

V(1, "A1", "finnas", "finns", "fanns", "funnits", "to exist, to be (there is)",
  "Det borde *finnas* en buss hit.", "There should be a bus here.",
  "Det *finns* en bank här.", "There is a bank here.",
  "Det *fanns* inga biljetter kvar.", "There were no tickets left.",
  "Det har *funnits* problem.", "There have been problems.");

V(1, "A1", "låta", "låter", "lät", "låtit", "to let, to sound",
  "Jag vill *låta* dig sova.", "I want to let you sleep.",
  "Det *låter* bra!", "That sounds good!",
  "Hon *lät* mig använda hennes bil.", "She let me use her car.",
  "Jag har *låtit* dörren vara öppen.", "I have left the door open.");

V(1, "A1", "stå", "står", "stod", "stått", "to stand",
  "Jag orkar inte *stå* här längre.", "I can't stand here any longer.",
  "Han *står* vid bussen.", "He is standing by the bus.",
  "Vi *stod* i kö i en timme.", "We stood in line for an hour.",
  "Han har *stått* där hela dagen.", "He has stood there all day.");

V(1, "A2", "hålla", "håller", "höll", "hållit", "to hold, to keep",
  "Kan du *hålla* min väska?", "Can you hold my bag?",
  "Hon *håller* mig i handen.", "She is holding my hand.",
  "Han *höll* ett tal.", "He gave a speech.",
  "Hon har *hållit* sitt löfte.", "She has kept her promise.");

V(1, "A2", "sätta", "sätter", "satte", "satt", "to put, to set (something somewhere)",
  "Du kan *sätta* boken på bordet.", "You can put the book on the table.",
  "Jag *sätter* mig här.", "I am sitting down here.",
  "Han *satte* nyckeln i låset.", "He put the key in the lock.",
  "Jag har *satt* boken på hyllan.", "I have put the book on the shelf.");

V(1, "A2", "ligga", "ligger", "låg", "legat", "to lie, to be located",
  "Jag vill *ligga* på stranden.", "I want to lie on the beach.",
  "Boken *ligger* på bordet.", "The book is lying on the table.",
  "Katten *låg* på soffan.", "The cat lay on the sofa.",
  "Jag har *legat* i sängen hela dagen.", "I have been lying in bed all day.");

V(1, "A2", "sitta", "sitter", "satt", "suttit", "to sit",
  "Vill du *sitta* här?", "Do you want to sit here?",
  "Hon *sitter* vid fönstret.", "She is sitting by the window.",
  "Vi *satt* och pratade.", "We sat and talked.",
  "Jag har *suttit* här i en timme.", "I have been sitting here for an hour.");

V(1, "A1", "heta", "heter", "hette", "hetat", "to be called",
  "Vad kommer barnet att *heta*?", "What will the child be called?",
  "Jag *heter* Anna.", "My name is Anna.",
  "Hunden *hette* Max.", "The dog was called Max.",
  "Hur har hon *hetat* tidigare?", "What was she called before?");

V(1, "A1", "tänka", "tänker", "tänkte", "tänkt", "to think, to intend",
  "Jag måste *tänka* en stund.", "I have to think for a while.",
  "Vad *tänker* du på?", "What are you thinking about?",
  "Jag *tänkte* på dig igår.", "I thought of you yesterday.",
  "Har du *tänkt* på det?", "Have you thought about it?");

V(1, "A1", "känna", "känner", "kände", "känt", "to feel, to know (a person)",
  "Jag vill *känna* mig frisk.", "I want to feel healthy.",
  "Jag *känner* mig trött.", "I feel tired.",
  "Jag *kände* henne redan som barn.", "I knew her already as a child.",
  "Har du *känt* dig sjuk?", "Have you been feeling sick?");

V(1, "A1", "bo", "bor", "bodde", "bott", "to live (reside)",
  "Jag vill *bo* i Stockholm.", "I want to live in Stockholm.",
  "Vi *bor* i en lägenhet.", "We live in an apartment.",
  "Hon *bodde* i Malmö förut.", "She used to live in Malmö.",
  "Jag har *bott* här i tre år.", "I have lived here for three years.");

V(1, "A1", "arbeta", "arbetar", "arbetade", "arbetat", "to work",
  "Jag vill *arbeta* utomlands.", "I want to work abroad.",
  "Han *arbetar* på sjukhuset.", "He works at the hospital.",
  "Hon *arbetade* hela natten.", "She worked all night.",
  "Vi har *arbetat* hårt.", "We have worked hard.");

V(1, "A1", "läsa", "läser", "läste", "läst", "to read",
  "Jag älskar att *läsa* böcker.", "I love to read books.",
  "Han *läser* tidningen.", "He is reading the newspaper.",
  "Jag *läste* en bok igår.", "I read a book yesterday.",
  "Har du *läst* den här boken?", "Have you read this book?");

V(1, "A1", "skriva", "skriver", "skrev", "skrivit", "to write",
  "Jag ska *skriva* ett brev.", "I am going to write a letter.",
  "Hon *skriver* ett mejl.", "She is writing an email.",
  "Han *skrev* en dikt.", "He wrote a poem.",
  "Jag har *skrivit* mitt namn.", "I have written my name.");

V(1, "A1", "prata", "pratar", "pratade", "pratat", "to talk, to speak",
  "Jag vill *prata* svenska.", "I want to speak Swedish.",
  "Vi *pratar* varje dag.", "We talk every day.",
  "De *pratade* i telefon.", "They talked on the phone.",
  "Har du *pratat* med henne?", "Have you talked to her?");

V(1, "A1", "äta", "äter", "åt", "ätit", "to eat",
  "Vi ska *äta* middag.", "We are going to eat dinner.",
  "Jag *äter* frukost klockan sju.", "I eat breakfast at seven.",
  "Hon *åt* en smörgås.", "She ate a sandwich.",
  "Jag har inte *ätit* något.", "I haven't eaten anything.");

V(1, "A1", "dricka", "dricker", "drack", "druckit", "to drink",
  "Vill du *dricka* något?", "Do you want to drink something?",
  "Han *dricker* te.", "He drinks tea.",
  "Vi *drack* vin igår.", "We drank wine yesterday.",
  "Jag har *druckit* för mycket kaffe.", "I have drunk too much coffee.");

V(1, "A1", "sova", "sover", "sov", "sovit", "to sleep",
  "Jag vill *sova* länge.", "I want to sleep in.",
  "Barnet *sover*.", "The child is sleeping.",
  "Jag *sov* dåligt i natt.", "I slept badly last night.",
  "Har du *sovit* gott?", "Have you slept well?");

V(1, "A1", "köpa", "köper", "köpte", "köpt", "to buy",
  "Jag ska *köpa* bröd.", "I am going to buy bread.",
  "Hon *köper* en ny jacka.", "She is buying a new jacket.",
  "Vi *köpte* en bil förra året.", "We bought a car last year.",
  "Har du *köpt* biljetter?", "Have you bought tickets?");

V(1, "A1", "hitta", "hittar", "hittade", "hittat", "to find",
  "Jag kan inte *hitta* mina nycklar.", "I can't find my keys.",
  "Han *hittar* alltid rätt.", "He always finds the right way.",
  "Jag *hittade* din telefon.", "I found your phone.",
  "Har du *hittat* ett jobb?", "Have you found a job?");

V(1, "A1", "vänta", "väntar", "väntade", "väntat", "to wait",
  "Jag kan *vänta* här.", "I can wait here.",
  "Hon *väntar* på bussen.", "She is waiting for the bus.",
  "Vi *väntade* i en timme.", "We waited for an hour.",
  "Har du *väntat* länge?", "Have you been waiting long?");

V(1, "A2", "använda", "använder", "använde", "använt", "to use",
  "Du kan *använda* min dator.", "You can use my computer.",
  "Jag *använder* cykel varje dag.", "I use a bike every day.",
  "Hon *använde* en penna.", "She used a pen.",
  "Jag har aldrig *använt* den.", "I have never used it.");

V(1, "A1", "fråga", "frågar", "frågade", "frågat", "to ask",
  "Jag vill *fråga* dig något.", "I want to ask you something.",
  "Han *frågar* om vägen.", "He is asking about the way.",
  "Hon *frågade* vad klockan var.", "She asked what time it was.",
  "Har du *frågat* läraren?", "Have you asked the teacher?");

V(1, "A1", "svara", "svarar", "svarade", "svarat", "to answer",
  "Kan du *svara* på frågan?", "Can you answer the question?",
  "Hon *svarar* i telefon.", "She is answering the phone.",
  "Jag *svarade* inte.", "I didn't answer.",
  "Har du *svarat* på mejlet?", "Have you replied to the email?");

V(1, "A1", "förstå", "förstår", "förstod", "förstått", "to understand",
  "Jag kan inte *förstå* varför.", "I can't understand why.",
  "Jag *förstår* inte.", "I don't understand.",
  "Han *förstod* direkt.", "He understood immediately.",
  "Jag har inte *förstått* frågan.", "I haven't understood the question.");

V(1, "A1", "börja", "börjar", "började", "börjat", "to begin, to start",
  "Jag ska *börja* jobba imorgon.", "I am going to start work tomorrow.",
  "Lektionen *börjar* klockan nio.", "The lesson starts at nine o'clock.",
  "Filmen *började* för en timme sedan.", "The film started an hour ago.",
  "Det har *börjat* regna.", "It has started to rain.");

V(1, "A2", "sluta", "slutar", "slutade", "slutat", "to stop, to end",
  "Jag vill *sluta* röka.", "I want to stop smoking.",
  "Affären *slutar* klockan sex.", "The shop closes at six.",
  "Han *slutade* på skolan.", "He quit the school.",
  "Det har *slutat* regna.", "It has stopped raining.");

V(1, "A1", "hjälpa", "hjälper", "hjälpte", "hjälpt", "to help",
  "Kan du *hjälpa* mig?", "Can you help me?",
  "Hon *hjälper* sin mamma.", "She helps her mother.",
  "Han *hjälpte* mig med läxan.", "He helped me with the homework.",
  "Du har *hjälpt* mig mycket.", "You have helped me a lot.");

V(1, "A1", "träffa", "träffar", "träffade", "träffat", "to meet, to hit",
  "Jag ska *träffa* en vän.", "I am going to meet a friend.",
  "Jag *träffar* henne på fredag.", "I am meeting her on Friday.",
  "Jag *träffade* honom på bussen.", "I met him on the bus.",
  "Har du *träffat* hennes bror?", "Have you met her brother?");

V(1, "A1", "titta", "tittar", "tittade", "tittat", "to look, to watch",
  "Vill du *titta* på en film?", "Do you want to watch a film?",
  "Han *tittar* på tv.", "He is watching TV.",
  "Vi *tittade* på stjärnorna.", "We looked at the stars.",
  "Har du *tittat* på klockan?", "Have you looked at the clock?");

V(1, "A1", "höra", "hör", "hörde", "hört", "to hear",
  "Jag kan inte *höra* dig.", "I can't hear you.",
  "Jag *hör* musik.", "I hear music.",
  "Hon *hörde* ett ljud.", "She heard a sound.",
  "Har du *hört* nyheten?", "Have you heard the news?");

V(1, "A1", "åka", "åker", "åkte", "åkt", "to go (by vehicle), to ride",
  "Vi ska *åka* till Spanien.", "We are going to Spain.",
  "Han *åker* tåg till jobbet.", "He takes the train to work.",
  "Vi *åkte* till stranden.", "We went to the beach.",
  "Jag har aldrig *åkt* skidor.", "I have never skied.");

V(1, "A2", "lägga", "lägger", "lade", "lagt", "to lay, to put (flat)",
  "Jag ska *lägga* boken på bordet.", "I am going to put the book on the table.",
  "Hon *lägger* barnet i sängen.", "She puts the child to bed.",
  "Han *lade* nycklarna på hyllan.", "He put the keys on the shelf.",
  "Har du *lagt* pengarna i väskan?", "Have you put the money in the bag?");
