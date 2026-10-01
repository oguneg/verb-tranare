// Particle verbs (partikelverb), grouped by particle.
// Format: P(group, tier, particleVerb, english, swedishExample, englishExample, "presens, preteritum, supinum")
window.PARTICLES = [];
window.P = (g, tier, pv, en, sv, sven, forms) =>
  window.PARTICLES.push({ pv, en, sv, sven, g, tier, forms: forms.split(",").map(s => s.trim()) });

// med
P("med", 1, "hålla med", "to agree", "Jag håller med dig.", "I agree with you.", "håller med, höll med, hållit med");
P("med", 1, "följa med", "to come along", "Vill du följa med på bio?", "Do you want to come along to the cinema?", "följer med, följde med, följt med");
P("med", 1, "ta med", "to bring along", "Ta med dig paraplyet.", "Bring your umbrella.", "tar med, tog med, tagit med");
P("med", 2, "vara med", "to take part, to be included", "Jag vill vara med i laget.", "I want to be on the team.", "är med, var med, varit med");

// upp
P("upp", 1, "stiga upp", "to get up", "Jag stiger upp klockan sex.", "I get up at six.", "stiger upp, steg upp, stigit upp");
P("upp", 1, "ge upp", "to give up", "Jag ger aldrig upp.", "I never give up.", "ger upp, gav upp, gett upp");
P("upp", 1, "ringa upp", "to call (by phone)", "Jag ringer upp dig ikväll.", "I will call you tonight.", "ringer upp, ringde upp, ringt upp");
P("upp", 1, "växa upp", "to grow up", "Jag växte upp i Skåne.", "I grew up in Skåne.", "växer upp, växte upp, vuxit upp");
P("upp", 2, "ta upp", "to bring up, to take up", "Kan vi ta upp det på mötet?", "Can we bring it up at the meeting?", "tar upp, tog upp, tagit upp");
P("upp", 2, "plocka upp", "to pick up", "Jag plockar upp barnen klockan fem.", "I pick up the kids at five.", "plockar upp, plockade upp, plockat upp");
P("upp", 2, "ställa upp", "to help out, to show up for", "Tack för att du ställer upp.", "Thanks for helping out.", "ställer upp, ställde upp, ställt upp");

// ut
P("ut", 1, "gå ut", "to go out", "Vi går ut ikväll.", "We are going out tonight.", "går ut, gick ut, gått ut");
P("ut", 1, "se ut", "to look, to appear", "Du ser trött ut.", "You look tired.", "ser ut, såg ut, sett ut");
P("ut", 2, "ta ut", "to take out, to withdraw", "Jag tar ut pengar i automaten.", "I withdraw money at the ATM.", "tar ut, tog ut, tagit ut");
P("ut", 2, "räkna ut", "to calculate, to work out", "Kan du räkna ut priset?", "Can you work out the price?", "räknar ut, räknade ut, räknat ut");
P("ut", 2, "hyra ut", "to rent out", "Vi hyr ut vår lägenhet i sommar.", "We are renting out our apartment this summer.", "hyr ut, hyrde ut, hyrt ut");
P("ut", 2, "komma ut", "to come out, to be published", "Boken kommer ut i maj.", "The book comes out in May.", "kommer ut, kom ut, kommit ut");

// in
P("in", 1, "komma in", "to come in", "Kom in, dörren är öppen!", "Come in, the door is open!", "kommer in, kom in, kommit in");
P("in", 2, "lämna in", "to hand in", "Jag lämnar in uppsatsen imorgon.", "I am handing in the essay tomorrow.", "lämnar in, lämnade in, lämnat in");
P("in", 2, "flytta in", "to move in", "Vi flyttar in i mars.", "We are moving in in March.", "flyttar in, flyttade in, flyttat in");
P("in", 2, "bjuda in", "to invite", "De bjöd in oss på middag.", "They invited us to dinner.", "bjuder in, bjöd in, bjudit in");

// på
P("på", 1, "ta på sig", "to put on (clothes)", "Ta på dig jackan!", "Put on your jacket!", "tar på sig, tog på sig, tagit på sig");
P("på", 1, "sätta på", "to turn on", "Kan du sätta på lampan?", "Can you turn on the light?", "sätter på, satte på, satt på");
P("på", 1, "hålla på", "to be in the middle of doing", "Jag håller på att laga mat.", "I am in the middle of cooking.", "håller på, höll på, hållit på");
P("på", 1, "ha på sig", "to be wearing", "Hon har en röd jacka på sig.", "She is wearing a red jacket.", "har på sig, hade på sig, haft på sig");
P("på", 2, "hitta på", "to make up, to come up with", "Vi hittar på något roligt.", "We will come up with something fun.", "hittar på, hittade på, hittat på");
P("på", 2, "komma på", "to think of, to remember", "Jag kommer inte på hans namn.", "I can't think of his name.", "kommer på, kom på, kommit på");
P("på", 2, "lita på", "to trust, to rely on", "Du kan lita på mig.", "You can rely on me.", "litar på, litade på, litat på");

// av
P("av", 1, "ta av sig", "to take off (clothes)", "Ta av dig skorna.", "Take off your shoes.", "tar av sig, tog av sig, tagit av sig");
P("av", 1, "stänga av", "to turn off", "Stäng av tv:n, tack.", "Turn off the TV, please.", "stänger av, stängde av, stängt av");
P("av", 1, "höra av sig", "to get in touch", "Hör av dig när du kommer fram!", "Get in touch when you arrive!", "hör av sig, hörde av sig, hört av sig");
P("av", 2, "stiga av", "to get off", "Jag stiger av vid nästa hållplats.", "I get off at the next stop.", "stiger av, steg av, stigit av");

// till
P("till", 2, "lägga till", "to add", "Lägg till lite salt.", "Add a little salt.", "lägger till, la till, lagt till");
P("till", 2, "höra till", "to belong to", "Den här boken hör till mig.", "This book belongs to me.", "hör till, hörde till, hört till");

// ner
P("ner", 1, "skriva ner", "to write down", "Jag skriver ner numret.", "I am writing down the number.", "skriver ner, skrev ner, skrivit ner");
P("ner", 1, "ladda ner", "to download", "Jag laddar ner appen.", "I am downloading the app.", "laddar ner, laddade ner, laddat ner");
P("ner", 1, "sätta sig ner", "to sit down", "Sätt dig ner och vila.", "Sit down and rest.", "sätter sig ner, satte sig ner, satt sig ner");
P("ner", 2, "lägga ner", "to shut down, to stop", "Fabriken lägger ner i vår.", "The factory is shutting down in spring.", "lägger ner, la ner, lagt ner");
P("ner", 2, "gå ner", "to go down, to lose (weight)", "Jag har gått ner tre kilo.", "I have lost three kilos.", "går ner, gick ner, gått ner");

// över
P("över", 2, "ta över", "to take over", "Jag tar över här.", "I will take over here.", "tar över, tog över, tagit över");
P("över", 2, "gå över", "to cross, to pass", "Gå över gatan vid övergångsstället.", "Cross the street at the crossing.", "går över, gick över, gått över");
P("över", 2, "komma över", "to get over", "Han kommer inte över det.", "He can't get over it.", "kommer över, kom över, kommit över");
P("över", 2, "tänka över", "to think over", "Jag måste tänka över det.", "I have to think it over.", "tänker över, tänkte över, tänkt över");

// om
P("om", 1, "tycka om", "to like", "Jag tycker om dig.", "I like you.", "tycker om, tyckte om, tyckt om");
P("om", 1, "bry sig om", "to care about", "Jag bryr mig om dig.", "I care about you.", "bryr sig om, brydde sig om, brytt sig om");
P("om", 1, "ta hand om", "to take care of", "Jag tar hand om barnen.", "I am taking care of the children.", "tar hand om, tog hand om, tagit hand om");
P("om", 2, "göra om", "to redo", "Du måste göra om det.", "You have to do it over.", "gör om, gjorde om, gjort om");
P("om", 2, "klä om sig", "to change clothes", "Jag klär om mig före middagen.", "I change clothes before dinner.", "klär om sig, klädde om sig, klätt om sig");

// fram
P("fram", 1, "komma fram", "to arrive", "Vi kommer fram klockan åtta.", "We arrive at eight o'clock.", "kommer fram, kom fram, kommit fram");
P("fram", 1, "se fram emot", "to look forward to", "Jag ser fram emot sommaren.", "I am looking forward to summer.", "ser fram emot, såg fram emot, sett fram emot");
P("fram", 2, "ta fram", "to take out, to bring out", "Jag tar fram boken.", "I am taking out the book.", "tar fram, tog fram, tagit fram");

// bort
P("bort", 1, "ta bort", "to remove", "Jag tar bort fläcken.", "I am removing the stain.", "tar bort, tog bort, tagit bort");
P("bort", 1, "glömma bort", "to forget (completely)", "Jag glömde bort mötet.", "I completely forgot about the meeting.", "glömmer bort, glömde bort, glömt bort");
P("bort", 2, "kasta bort", "to throw away, to waste", "Du ska inte kasta bort pengar.", "You shouldn't waste money.", "kastar bort, kastade bort, kastat bort");

// övrigt (other particles and fixed phrases)
P("övriga", 1, "komma ihåg", "to remember", "Jag kommer ihåg dig.", "I remember you.", "kommer ihåg, kom ihåg, kommit ihåg");
P("övriga", 1, "leta efter", "to look for", "Jag letar efter mina nycklar.", "I am looking for my keys.", "letar efter, letade efter, letat efter");
P("övriga", 1, "ta reda på", "to find out", "Jag ska ta reda på tiden.", "I will find out the time.", "tar reda på, tog reda på, tagit reda på");
P("övriga", 2, "komma överens", "to agree, to get along", "Vi kommer bra överens.", "We get along well.", "kommer överens, kom överens, kommit överens");
P("övriga", 2, "passa ihop", "to match, to go together", "De passar ihop.", "They go well together.", "passar ihop, passade ihop, passat ihop");
P("övriga", 2, "se efter", "to look after", "Kan du se efter hunden?", "Can you look after the dog?", "ser efter, såg efter, sett efter");
