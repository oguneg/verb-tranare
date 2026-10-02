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
P("ihop", 2, "passa ihop", "to match, to go together", "De passar ihop.", "They go well together.", "passar ihop, passade ihop, passat ihop");
P("övriga", 2, "se efter", "to look after", "Kan du se efter hunden?", "Can you look after the dog?", "ser efter, såg efter, sett efter");

// ---- Extended pool: more verbs per stem so groups (hålla, sätta, komma, ta, gå, ge ...) are complete ----
// hålla
P("ut", 2, "hålla ut", "to hold out, to endure", "Håll ut, det blir bättre snart.", "Hang in there, it will get better soon.", "håller ut, höll ut, hållit ut");
P("övriga", 2, "hålla fast", "to hold on", "Håll fast i räcket.", "Hold on to the railing.", "håller fast, höll fast, hållit fast");
P("övriga", 2, "hålla sig till", "to stick to", "Vi håller oss till planen.", "We stick to the plan.", "håller sig till, höll sig till, hållit sig till");
P("av", 3, "hålla av", "to be fond of", "Jag håller av min moster.", "I am fond of my aunt.", "håller av, höll av, hållit av");
P("upp", 3, "hålla upp", "to let up, to stop", "Regnet har hållit upp.", "The rain has let up.", "håller upp, höll upp, hållit upp");
// sätta
P("upp", 2, "sätta upp", "to put up", "Vi sätter upp en affisch.", "We are putting up a poster.", "sätter upp, satte upp, satt upp");
P("in", 2, "sätta in", "to insert, to put in", "Sätt in kortet i automaten.", "Insert the card in the machine.", "sätter in, satte in, satt in");
P("övriga", 2, "sätta igång", "to get started", "Nu sätter vi igång!", "Time to get started now!", "sätter igång, satte igång, satt igång");
P("ihop", 2, "sätta ihop", "to put together, to assemble", "Jag sätter ihop hyllan.", "I am putting the shelf together.", "sätter ihop, satte ihop, satt ihop");
P("av", 3, "sätta av", "to drop off", "Kan du sätta av mig vid stationen?", "Can you drop me off at the station?", "sätter av, satte av, satt av");
// komma
P("tillbaka", 1, "komma tillbaka", "to come back", "Jag kommer tillbaka imorgon.", "I will come back tomorrow.", "kommer tillbaka, kom tillbaka, kommit tillbaka");
P("övriga", 2, "komma förbi", "to drop by", "Kom förbi på fredag!", "Drop by on Friday!", "kommer förbi, kom förbi, kommit förbi");
P("upp", 2, "komma upp", "to come up, to arise", "Det kom upp ett problem.", "A problem came up.", "kommer upp, kom upp, kommit upp");
P("med", 2, "komma med", "to come up with, to bring", "Hon kommer med ett förslag.", "She comes up with a suggestion.", "kommer med, kom med, kommit med");
P("övriga", 3, "komma ifrån", "to get away from", "Jag kommer inte ifrån tanken.", "I can't get away from the thought.", "kommer ifrån, kom ifrån, kommit ifrån");
// ta
P("övriga", 1, "ta emot", "to receive, to accept", "Vi tar emot gäster i helgen.", "We are receiving guests this weekend.", "tar emot, tog emot, tagit emot");
P("övriga", 1, "ta slut", "to run out", "Kaffet har tagit slut.", "The coffee has run out.", "tar slut, tog slut, tagit slut");
P("övriga", 2, "ta sig till", "to get to (a place)", "Hur tar jag mig till stationen?", "How do I get to the station?", "tar sig till, tog sig till, tagit sig till");
P("ner", 2, "ta ner", "to take down", "Ta ner skylten.", "Take down the sign.", "tar ner, tog ner, tagit ner");
// gå
P("in", 1, "gå in", "to go in", "Hon gick in i rummet.", "She went into the room.", "går in, gick in, gått in");
P("upp", 1, "gå upp", "to go up, to rise", "Solen går upp klockan fem.", "The sun rises at five.", "går upp, gick upp, gått upp");
P("övriga", 2, "gå förbi", "to walk past", "Jag går förbi banken varje dag.", "I walk past the bank every day.", "går förbi, gick förbi, gått förbi");
P("med", 2, "gå med", "to join", "Hon går med i klubben.", "She is joining the club.", "går med, gick med, gått med");
P("övriga", 1, "gå sönder", "to break (stop working)", "Telefonen gick sönder.", "The phone broke.", "går sönder, gick sönder, gått sönder");
P("övriga", 2, "gå vidare", "to move on", "Nu går vi vidare.", "Now we move on.", "går vidare, gick vidare, gått vidare");
// ge
P("ut", 2, "ge ut", "to publish, to release", "Förlaget ger ut boken i höst.", "The publisher is releasing the book this autumn.", "ger ut, gav ut, gett ut");
P("tillbaka", 1, "ge tillbaka", "to give back", "Kan du ge tillbaka boken?", "Can you give the book back?", "ger tillbaka, gav tillbaka, gett tillbaka");
P("av", 2, "ge sig av", "to set off", "Vi ger oss av klockan sju.", "We set off at seven.", "ger sig av, gav sig av, gett sig av");
P("övriga", 3, "ge efter", "to give in", "Till slut gav han efter.", "In the end he gave in.", "ger efter, gav efter, gett efter");
P("övriga", 2, "ge sig", "to give in, to relent", "Jag ger mig aldrig!", "I never give in!", "ger sig, gav sig, gett sig");
// lägga
P("övriga", 1, "lägga sig", "to lie down, to go to bed", "Jag lägger mig klockan elva.", "I go to bed at eleven.", "lägger sig, la sig, lagt sig");
P("upp", 2, "lägga upp", "to post, to upload", "Hon la upp en bild på nätet.", "She posted a picture online.", "lägger upp, la upp, lagt upp");
P("ihop", 2, "lägga ihop", "to add up", "Lägg ihop siffrorna.", "Add up the numbers.", "lägger ihop, la ihop, lagt ihop");
P("till", 2, "lägga märke till", "to notice", "Jag la märke till hans skor.", "I noticed his shoes.", "lägger märke till, la märke till, lagt märke till");
// stå
P("upp", 1, "stå upp", "to stand up", "Alla står upp när hon kommer in.", "Everyone stands up when she comes in.", "står upp, stod upp, stått upp");
P("ut", 2, "stå ut med", "to put up with", "Jag står inte ut med bullret.", "I can't stand the noise.", "står ut med, stod ut med, stått ut med");
P("övriga", 2, "stå för", "to stand for", "Vad står förkortningen för?", "What does the abbreviation stand for?", "står för, stod för, stått för");
// se
P("upp", 1, "se upp", "to watch out", "Se upp för bilen!", "Watch out for the car!", "ser upp, såg upp, sett upp");
P("till", 2, "se till", "to make sure", "Se till att du kommer i tid.", "Make sure you arrive on time.", "ser till, såg till, sett till");
P("över", 2, "se över", "to review, to check over", "Vi ser över planen.", "We are reviewing the plan.", "ser över, såg över, sett över");
// göra
P("övriga", 2, "göra slut", "to break up", "Hon gjorde slut med honom.", "She broke up with him.", "gör slut, gjorde slut, gjort slut");
P("övriga", 2, "göra klart", "to finish, to get done", "Jag gör klart läxan.", "I finish my homework.", "gör klart, gjorde klart, gjort klart");
// slå
P("på", 1, "slå på", "to switch on", "Slå på datorn.", "Turn on the computer.", "slår på, slog på, slagit på");
P("av", 1, "slå av", "to switch off", "Slå av musiken.", "Turn off the music.", "slår av, slog av, slagit av");
P("upp", 2, "slå upp", "to look up", "Jag slår upp ordet i ordboken.", "I look the word up in the dictionary.", "slår upp, slog upp, slagit upp");
// dra
P("ut", 3, "dra ut", "to pull out", "Dra ut sladden.", "Pull out the cord.", "drar ut, drog ut, dragit ut");
P("ner", 3, "dra ner", "to cut down, to reduce", "Vi måste dra ner på kostnaderna.", "We have to cut down on costs.", "drar ner, drog ner, dragit ner");
// other stems
P("tillbaka", 1, "ringa tillbaka", "to call back", "Jag ringer tillbaka senare.", "I will call back later.", "ringer tillbaka, ringde tillbaka, ringt tillbaka");
P("på", 1, "titta på", "to look at, to watch", "Titta på mig!", "Look at me!", "tittar på, tittade på, tittat på");
P("övriga", 2, "tänka efter", "to think carefully", "Tänk efter innan du svarar.", "Think before you answer.", "tänker efter, tänkte efter, tänkt efter");
P("på", 1, "tänka på", "to think about", "Jag tänker på dig.", "I am thinking of you.", "tänker på, tänkte på, tänkt på");
P("om", 2, "börja om", "to start over", "Jag måste börja om från början.", "I have to start over from the beginning.", "börjar om, började om, börjat om");
P("ut", 2, "byta ut", "to replace", "Vi byter ut lampan.", "We are replacing the lamp.", "byter ut, bytte ut, bytt ut");
P("övriga", 3, "bo kvar", "to stay (living somewhere)", "Jag bor kvar i Malmö.", "I still live in Malmö.", "bor kvar, bodde kvar, bott kvar");
P("med", 1, "hänga med", "to keep up, to hang out", "Hänger du med?", "Are you following?", "hänger med, hängde med, hängt med");
P("på", 2, "passa på", "to take the opportunity", "Passa på att åka nu!", "Take the chance to go now!", "passar på, passade på, passat på");
P("upp", 3, "läsa upp", "to read aloud", "Kan du läsa upp texten?", "Can you read the text aloud?", "läser upp, läste upp, läst upp");
P("in", 1, "fylla i", "to fill in", "Fyll i formuläret.", "Fill in the form.", "fyller i, fyllde i, fyllt i");
P("på", 2, "fylla på", "to top up, to refill", "Jag fyller på vatten.", "I am topping up the water.", "fyller på, fyllde på, fyllt på");
P("upp", 2, "packa upp", "to unpack", "Jag packar upp väskan.", "I am unpacking the bag.", "packar upp, packade upp, packat upp");
P("om", 2, "tala om", "to tell, to mention", "Tala om vad du vill ha.", "Tell me what you want.", "talar om, talade om, talat om");
P("över", 2, "sova över", "to sleep over", "Du kan sova över hos oss.", "You can sleep over at our place.", "sover över, sov över, sovit över");
P("upp", 1, "äta upp", "to eat up", "Ät upp maten!", "Eat up your food!", "äter upp, åt upp, ätit upp");
P("till", 1, "hjälpa till", "to help out", "Kan du hjälpa till i köket?", "Can you help out in the kitchen?", "hjälper till, hjälpte till, hjälpt till");
P("upp", 3, "säga upp", "to cancel, to terminate", "Jag har sagt upp mitt abonnemang.", "I have cancelled my subscription.", "säger upp, sa upp, sagt upp");
P("till", 2, "säga till", "to tell, to let know", "Säg till när du är klar.", "Let me know when you are done.", "säger till, sa till, sagt till");
P("upp", 2, "ladda upp", "to upload", "Jag laddar upp bilderna.", "I am uploading the pictures.", "laddar upp, laddade upp, laddat upp");
P("av", 2, "koppla av", "to relax, to unwind", "Jag kopplar av med en bok.", "I relax with a book.", "kopplar av, kopplade av, kopplat av");
P("av", 2, "slappna av", "to relax", "Slappna av, det ordnar sig.", "Relax, it will work out.", "slappnar av, slappnade av, slappnat av");
P("övriga", 2, "vänja sig vid", "to get used to", "Jag har vant mig vid kylan.", "I have got used to the cold.", "vänjer sig vid, vande sig vid, vänt sig vid");

// ---- Third batch: fuller stem families so a learner can pick "hålla", "ta", "komma" ... and learn them all ----
// hålla
P("om", 2, "hålla om", "to hold, to hug", "Han höll om henne.", "He held her.", "håller om, höll om, hållit om");
P("övriga", 2, "hålla reda på", "to keep track of", "Jag håller reda på tiden.", "I keep track of the time.", "håller reda på, höll reda på, hållit reda på");
P("ihop", 2, "hålla ihop", "to stick together", "Familjen håller ihop.", "The family sticks together.", "håller ihop, höll ihop, hållit ihop");
P("övriga", 3, "hålla fast vid", "to stick to, to hold on to", "Han håller fast vid sin plan.", "He sticks to his plan.", "håller fast vid, höll fast vid, hållit fast vid");
P("bort", 3, "hålla sig borta", "to stay away", "Håll dig borta från elden.", "Stay away from the fire.", "håller sig borta, höll sig borta, hållit sig borta");
P("övriga", 2, "hålla tyst", "to keep quiet", "Kan ni hålla tyst, tack?", "Can you keep quiet, please?", "håller tyst, höll tyst, hållit tyst");
P("övriga", 3, "hålla kvar", "to keep, to hold back", "De höll kvar honom på sjukhuset.", "They kept him at the hospital.", "håller kvar, höll kvar, hållit kvar");
// sätta
P("ner", 2, "sätta ner", "to put down", "Sätt ner väskan här.", "Put the bag down here.", "sätter ner, satte ner, satt ner");
P("ut", 2, "sätta ut", "to put out, to plant out", "Jag sätter ut blommorna.", "I am putting out the flowers.", "sätter ut, satte ut, satt ut");
P("övriga", 2, "sätta fast", "to fasten", "Sätt fast lappen på dörren.", "Fasten the note to the door.", "sätter fast, satte fast, satt fast");
P("övriga", 3, "sätta sig in i", "to get to grips with", "Jag sätter mig in i ämnet.", "I am getting to grips with the subject.", "sätter sig in i, satte sig in i, satt sig in i");
// komma
P("övriga", 2, "komma åt", "to reach, to get access to", "Jag kommer inte åt knappen.", "I can't reach the button.", "kommer åt, kom åt, kommit åt");
P("övriga", 2, "komma igång", "to get going", "Det tar tid att komma igång.", "It takes time to get going.", "kommer igång, kom igång, kommit igång");
P("övriga", 2, "komma undan", "to get away", "Tjuven kom undan.", "The thief got away.", "kommer undan, kom undan, kommit undan");
P("övriga", 3, "komma loss", "to come loose", "Bilen kom loss från leran.", "The car came free from the mud.", "kommer loss, kom loss, kommit loss");
P("bort", 2, "komma bort", "to get lost", "Jag kom bort i staden.", "I got lost in the city.", "kommer bort, kom bort, kommit bort");
P("ner", 2, "komma ner", "to come down", "Kom ner hit!", "Come down here!", "kommer ner, kom ner, kommit ner");
P("övriga", 1, "komma hem", "to come home", "Jag kommer hem klockan sex.", "I get home at six.", "kommer hem, kom hem, kommit hem");
P("övriga", 3, "komma ur", "to get out of", "Det är svårt att komma ur vanan.", "It is hard to get out of the habit.", "kommer ur, kom ur, kommit ur");
// ta
P("in", 2, "ta in", "to take in", "Jag tar in tvätten.", "I am bringing in the laundry.", "tar in, tog in, tagit in");
P("övriga", 2, "ta itu med", "to deal with", "Vi måste ta itu med problemet.", "We have to deal with the problem.", "tar itu med, tog itu med, tagit itu med");
P("övriga", 3, "ta hänsyn till", "to take into account", "Du måste ta hänsyn till andra.", "You have to take others into account.", "tar hänsyn till, tog hänsyn till, tagit hänsyn till");
P("övriga", 3, "ta ifrån", "to take away from", "Någon tog ifrån mig väskan.", "Someone took my bag from me.", "tar ifrån, tog ifrån, tagit ifrån");
P("övriga", 2, "ta plats", "to take a seat", "Varsågod och ta plats.", "Please take a seat.", "tar plats, tog plats, tagit plats");
P("övriga", 3, "ta tag i", "to take hold of, to tackle", "Jag ska ta tag i det här.", "I am going to tackle this.", "tar tag i, tog tag i, tagit tag i");
P("övriga", 3, "ta sig an", "to take on", "Hon tar sig an projektet.", "She takes on the project.", "tar sig an, tog sig an, tagit sig an");
P("övriga", 2, "ta ledigt", "to take time off", "Jag tar ledigt på fredag.", "I am taking Friday off.", "tar ledigt, tog ledigt, tagit ledigt");
P("övriga", 2, "ta det lugnt", "to take it easy", "Ta det lugnt!", "Take it easy!", "tar det lugnt, tog det lugnt, tagit det lugnt");
// gå
P("tillbaka", 1, "gå tillbaka", "to go back", "Vi går tillbaka till hotellet.", "We are going back to the hotel.", "går tillbaka, gick tillbaka, gått tillbaka");
P("övriga", 2, "gå ifrån", "to leave, to walk away", "Hon gick ifrån bordet.", "She left the table.", "går ifrån, gick ifrån, gått ifrån");
P("på", 2, "gå på", "to go on, to attend", "Vi går på bio ikväll.", "We are going to the cinema tonight.", "går på, gick på, gått på");
P("övriga", 2, "gå åt", "to be used up", "Mycket tid går åt till städning.", "A lot of time goes on cleaning.", "går åt, gick åt, gått åt");
P("övriga", 2, "gå runt", "to walk around", "Vi går runt i parken.", "We are walking around the park.", "går runt, gick runt, gått runt");
P("ihop", 3, "gå ihop", "to add up, to fit", "Räkningen går inte ihop.", "The bill doesn't add up.", "går ihop, gick ihop, gått ihop");
P("övriga", 2, "gå fel", "to go wrong", "Allt gick fel.", "Everything went wrong.", "går fel, gick fel, gått fel");
P("övriga", 3, "gå under", "to sink, to go under", "Skeppet gick under.", "The ship went down.", "går under, gick under, gått under");
P("övriga", 1, "gå hem", "to go home", "Jag går hem nu.", "I am going home now.", "går hem, gick hem, gått hem");
// ge
P("bort", 2, "ge bort", "to give away", "Jag ger bort mina gamla kläder.", "I am giving away my old clothes.", "ger bort, gav bort, gett bort");
P("övriga", 3, "ge igen", "to pay back", "Jag ska ge honom igen.", "I am going to pay him back.", "ger igen, gav igen, gett igen");
P("övriga", 2, "ge sig iväg", "to set off", "Vi ger oss iväg tidigt.", "We set off early.", "ger sig iväg, gav sig iväg, gett sig iväg");
P("på", 3, "ge sig på", "to attack, to go for", "Hunden gav sig på katten.", "The dog went for the cat.", "ger sig på, gav sig på, gett sig på");
P("övriga", 3, "ge ifrån sig", "to give off, to emit", "Lampan ger ifrån sig värme.", "The lamp gives off heat.", "ger ifrån sig, gav ifrån sig, gett ifrån sig");
// lägga
P("av", 2, "lägga av", "to quit, to stop", "Han lade av att röka.", "He quit smoking.", "lägger av, lade av, lagt av");
P("in", 2, "lägga in", "to put in, to admit", "De lade in honom på sjukhus.", "They admitted him to hospital.", "lägger in, lade in, lagt in");
P("fram", 2, "lägga fram", "to present, to put forward", "Hon lade fram ett förslag.", "She put forward a proposal.", "lägger fram, lade fram, lagt fram");
P("på", 2, "lägga på", "to hang up, to put on", "Han lade på luren.", "He hung up the phone.", "lägger på, lade på, lagt på");
P("övriga", 2, "lägga undan", "to put aside", "Jag lägger undan lite pengar.", "I am putting a bit of money aside.", "lägger undan, lade undan, lagt undan");
P("ut", 2, "lägga ut", "to post, to spread out", "Jag lägger ut bilderna på nätet.", "I am posting the pictures online.", "lägger ut, lade ut, lagt ut");
P("övriga", 3, "lägga sig i", "to interfere", "Lägg dig inte i!", "Don't interfere!", "lägger sig i, lade sig i, lagt sig i");
// stå
P("övriga", 2, "stå kvar", "to remain standing", "Han stod kvar vid dörren.", "He remained standing by the door.", "står kvar, stod kvar, stått kvar");
P("övriga", 3, "stå emot", "to resist", "Jag kan inte stå emot choklad.", "I can't resist chocolate.", "står emot, stod emot, stått emot");
P("på", 3, "stå på sig", "to stand one's ground", "Hon stod på sig.", "She stood her ground.", "står på sig, stod på sig, stått på sig");
P("upp", 3, "stå upp för", "to stand up for", "Man ska stå upp för sina vänner.", "You should stand up for your friends.", "står upp för, stod upp för, stått upp för");
P("övriga", 2, "stå still", "to stand still", "Stå still!", "Stand still!", "står still, stod still, stått still");
// se
P("på", 1, "se på", "to watch, to look at", "Vi ser på tv.", "We are watching TV.", "ser på, såg på, sett på");
P("övriga", 2, "se sig om", "to look around", "Hon såg sig om i rummet.", "She looked around the room.", "ser sig om, såg sig om, sett sig om");
P("övriga", 3, "se igenom", "to look through", "Jag ser igenom dokumenten.", "I am looking through the documents.", "ser igenom, såg igenom, sett igenom");
P("bort", 2, "se bort", "to look away", "Han såg bort.", "He looked away.", "ser bort, såg bort, sett bort");
P("tillbaka", 2, "se tillbaka", "to look back", "Jag ser tillbaka på året.", "I am looking back on the year.", "ser tillbaka, såg tillbaka, sett tillbaka");
P("ner", 3, "se ner på", "to look down on", "Man ska inte se ner på andra.", "You shouldn't look down on others.", "ser ner på, såg ner på, sett ner på");
// göra
P("upp", 2, "göra upp", "to settle, to make up", "De gjorde upp om saken.", "They settled the matter.", "gör upp, gjorde upp, gjort upp");
P("övriga", 2, "göra bort sig", "to embarrass oneself", "Jag gjorde bort mig helt.", "I totally embarrassed myself.", "gör bort sig, gjorde bort sig, gjort bort sig");
P("av", 3, "göra sig av med", "to get rid of", "Jag vill göra mig av med soffan.", "I want to get rid of the sofa.", "gör sig av med, gjorde sig av med, gjort sig av med");
P("övriga", 2, "göra rent", "to clean", "Vi gör rent i köket.", "We are cleaning the kitchen.", "gör rent, gjorde rent, gjort rent");
P("övriga", 3, "göra sig redo", "to get ready", "Hon gör sig redo för resan.", "She is getting ready for the trip.", "gör sig redo, gjorde sig redo, gjort sig redo");
// slå
P("ner", 2, "slå ner", "to knock down, to strike", "Blixten slog ner i trädet.", "Lightning struck the tree.", "slår ner, slog ner, slagit ner");
P("ihop", 3, "slå ihop", "to merge, to fold", "De slår ihop företagen.", "They are merging the companies.", "slår ihop, slog ihop, slagit ihop");
P("ner", 2, "slå sig ner", "to sit down, to settle", "Slå dig ner!", "Sit down!", "slår sig ner, slog sig ner, slagit sig ner");
P("ut", 3, "slå ut", "to knock out, to bloom", "Rosorna slår ut i juni.", "The roses bloom in June.", "slår ut, slog ut, slagit ut");
P("övriga", 2, "slå sönder", "to smash", "Han slog sönder rutan.", "He smashed the window.", "slår sönder, slog sönder, slagit sönder");
P("övriga", 3, "slå igenom", "to break through", "Bandet slog igenom 2010.", "The band broke through in 2010.", "slår igenom, slog igenom, slagit igenom");
// dra
P("upp", 2, "dra upp", "to pull up", "Dra upp blixtlåset.", "Zip it up.", "drar upp, drog upp, dragit upp");
P("av", 3, "dra av", "to deduct, to pull off", "De drar av skatten.", "They deduct the tax.", "drar av, drog av, dragit av");
P("tillbaka", 2, "dra sig tillbaka", "to withdraw", "Hon drog sig tillbaka.", "She withdrew.", "drar sig tillbaka, drog sig tillbaka, dragit sig tillbaka");
P("till", 3, "dra till sig", "to attract", "Staden drar till sig turister.", "The city attracts tourists.", "drar till sig, drog till sig, dragit till sig");
P("ihop", 3, "dra ihop", "to pull together", "Vi drar ihop gardinerna.", "We are drawing the curtains.", "drar ihop, drog ihop, dragit ihop");
P("övriga", 2, "dra igång", "to get going", "Vi drar igång mötet.", "We are kicking off the meeting.", "drar igång, drog igång, dragit igång");
// få
P("med", 2, "få med sig", "to manage to bring along", "Jag fick med mig allt.", "I managed to bring everything.", "får med sig, fick med sig, fått med sig");
P("övriga", 2, "få tag i", "to get hold of", "Jag får inte tag i honom.", "I can't get hold of him.", "får tag i, fick tag i, fått tag i");
P("övriga", 3, "få syn på", "to catch sight of", "Jag fick syn på henne.", "I caught sight of her.", "får syn på, fick syn på, fått syn på");
P("övriga", 2, "få reda på", "to find out", "Vi fick reda på sanningen.", "We found out the truth.", "får reda på, fick reda på, fått reda på");
P("ut", 3, "få ut", "to get out", "Jag får inte ut proppen.", "I can't get the plug out.", "får ut, fick ut, fått ut");
P("övriga", 2, "få igång", "to get started", "Jag får inte igång bilen.", "I can't get the car started.", "får igång, fick igång, fått igång");
P("ihop", 3, "få ihop", "to scrape together", "Vi fick ihop pengarna.", "We managed to scrape the money together.", "får ihop, fick ihop, fått ihop");
// skriva
P("ut", 1, "skriva ut", "to print", "Jag skriver ut biljetten.", "I am printing the ticket.", "skriver ut, skrev ut, skrivit ut");
P("in", 2, "skriva in", "to enter, to type in", "Skriv in ditt namn.", "Enter your name.", "skriver in, skrev in, skrivit in");
P("på", 2, "skriva på", "to sign", "Du måste skriva på här.", "You have to sign here.", "skriver på, skrev på, skrivit på");
P("om", 2, "skriva om", "to rewrite", "Jag skriver om uppsatsen.", "I am rewriting the essay.", "skriver om, skrev om, skrivit om");
P("upp", 2, "skriva upp", "to write down", "Skriv upp numret.", "Write down the number.", "skriver upp, skrev upp, skrivit upp");
// läsa
P("övriga", 2, "läsa igenom", "to read through", "Jag läser igenom kontraktet.", "I am reading through the contract.", "läser igenom, läste igenom, läst igenom");
P("på", 3, "läsa på", "to read up", "Jag läser på om ämnet.", "I am reading up on the subject.", "läser på, läste på, läst på");
P("om", 2, "läsa om", "to reread", "Jag läser om boken.", "I am rereading the book.", "läser om, läste om, läst om");
P("ut", 3, "läsa ut", "to finish reading", "Jag läste ut boken igår.", "I finished the book yesterday.", "läser ut, läste ut, läst ut");
// ringa, titta, tänka, prata, vänta, tycka, visa, hitta
P("på", 2, "ringa på", "to ring the doorbell", "Jag ringde på dörren.", "I rang the doorbell.", "ringer på, ringde på, ringt på");
P("in", 2, "titta in", "to look in, to drop by", "Titta in när du har tid.", "Drop in when you have time.", "tittar in, tittade in, tittat in");
P("efter", 2, "titta efter", "to look after, to check", "Kan du titta efter barnen?", "Can you keep an eye on the kids?", "tittar efter, tittade efter, tittat efter");
P("upp", 2, "titta upp", "to look up", "Titta upp mot himlen.", "Look up at the sky.", "tittar upp, tittade upp, tittat upp");
P("om", 3, "tänka om", "to think again", "Du får tänka om.", "You'll have to think again.", "tänker om, tänkte om, tänkt om");
P("ut", 3, "tänka ut", "to think up", "Vi måste tänka ut en plan.", "We have to think up a plan.", "tänker ut, tänkte ut, tänkt ut");
P("övriga", 2, "tänka sig", "to imagine", "Kan du tänka dig det?", "Can you imagine that?", "tänker sig, tänkte sig, tänkt sig");
P("ut", 3, "prata ut", "to talk things through", "Vi måste prata ut.", "We need to talk it out.", "pratar ut, pratade ut, pratat ut");
P("på", 1, "vänta på", "to wait for", "Jag väntar på bussen.", "I am waiting for the bus.", "väntar på, väntade på, väntat på");
P("övriga", 2, "vänta sig", "to expect", "Jag väntade mig mer.", "I expected more.", "väntar sig, väntade sig, väntat sig");
P("övriga", 2, "tycka synd om", "to feel sorry for", "Jag tycker synd om honom.", "I feel sorry for him.", "tycker synd om, tyckte synd om, tyckt synd om");
P("till", 3, "tycka till", "to speak one's mind", "Alla får tycka till.", "Everyone can have their say.", "tycker till, tyckte till, tyckt till");
P("upp", 2, "visa upp", "to show, to present", "Visa upp din biljett.", "Show your ticket.", "visar upp, visade upp, visat upp");
P("övriga", 2, "visa sig", "to appear, to turn out", "Det visade sig vara sant.", "It turned out to be true.", "visar sig, visade sig, visat sig");
P("fram", 2, "hitta fram", "to find one's way", "Jag hittar fram själv.", "I can find my own way.", "hittar fram, hittade fram, hittat fram");
P("tillbaka", 2, "hitta tillbaka", "to find the way back", "Vi hittade tillbaka.", "We found our way back.", "hittar tillbaka, hittade tillbaka, hittat tillbaka");
P("ut", 2, "hitta ut", "to find the way out", "Jag hittar ut.", "I'll find my way out.", "hittar ut, hittade ut, hittat ut");
// börja, sluta, stänga, öppna
P("på", 2, "börja på", "to start (a school, a job)", "Hon börjar på ett nytt jobb.", "She is starting a new job.", "börjar på, började på, börjat på");
P("med", 2, "börja med", "to start with", "Vi börjar med lite vatten.", "We start with a little water.", "börjar med, började med, börjat med");
P("med", 2, "sluta med", "to stop doing", "Jag har slutat med kaffe.", "I have stopped drinking coffee.", "slutar med, slutade med, slutat med");
P("på", 3, "sluta på", "to quit (a place)", "Han slutade på banken.", "He quit the bank.", "slutar på, slutade på, slutat på");
P("in", 3, "stänga in", "to shut in", "Hon stängde in katten.", "She shut the cat in.", "stänger in, stängde in, stängt in");
P("övriga", 2, "stänga igen", "to shut", "Stäng igen dörren.", "Shut the door.", "stänger igen, stängde igen, stängt igen");
P("ner", 2, "stänga ner", "to shut down", "Jag stänger ner datorn.", "I am shutting down the computer.", "stänger ner, stängde ner, stängt ner");
P("upp", 2, "öppna upp", "to open up", "Öppna upp dörren.", "Open up the door.", "öppnar upp, öppnade upp, öppnat upp");
// vara, bli
P("övriga", 2, "vara borta", "to be away", "Jag är borta i en vecka.", "I am away for a week.", "är borta, var borta, varit borta");
P("upp", 2, "vara uppe", "to be up (awake)", "Hon är uppe sent.", "She stays up late.", "är uppe, var uppe, varit uppe");
P("över", 2, "vara över", "to be over", "Festen är över.", "The party is over.", "är över, var över, varit över");
P("av", 1, "bli av med", "to get rid of, to lose", "Jag blev av med nyckeln.", "I lost the key.", "blir av med, blev av med, blivit av med");
P("övriga", 1, "bli kvar", "to stay behind", "Jag blir kvar här.", "I am staying here.", "blir kvar, blev kvar, blivit kvar");
P("övriga", 2, "bli klar", "to finish, to be done", "Jag blir klar snart.", "I will be done soon.", "blir klar, blev klar, blivit klar");
P("över", 3, "bli över", "to be left over", "Det blev mat över.", "There was food left over.", "blir över, blev över, blivit över");
// ligga, sitta, sova, äta, dricka
P("övriga", 2, "ligga kvar", "to stay lying", "Han ligger kvar i sängen.", "He stays in bed.", "ligger kvar, låg kvar, legat kvar");
P("efter", 3, "ligga efter", "to be behind", "Vi ligger efter schemat.", "We are behind schedule.", "ligger efter, låg efter, legat efter");
P("övriga", 3, "ligga bakom", "to be behind (a cause)", "Vem ligger bakom detta?", "Who is behind this?", "ligger bakom, låg bakom, legat bakom");
P("övriga", 1, "sitta kvar", "to remain seated", "Du kan sitta kvar.", "You can stay seated.", "sitter kvar, satt kvar, suttit kvar");
P("ner", 1, "sitta ner", "to sit down", "Vill du sitta ner?", "Would you like to sit down?", "sitter ner, satt ner, suttit ner");
P("övriga", 2, "sitta fast", "to be stuck", "Nyckeln sitter fast.", "The key is stuck.", "sitter fast, satt fast, suttit fast");
P("övriga", 2, "sitta uppe", "to stay up", "Jag satt uppe hela natten.", "I stayed up all night.", "sitter uppe, satt uppe, suttit uppe");
P("ut", 2, "sova ut", "to sleep in", "Jag vill sova ut i helgen.", "I want to sleep in this weekend.", "sover ut, sov ut, sovit ut");
P("övriga", 1, "äta ute", "to eat out", "Vi äter ute ikväll.", "We are eating out tonight.", "äter ute, åt ute, ätit ute");
P("upp", 2, "dricka upp", "to drink up", "Drick upp mjölken.", "Drink up your milk.", "dricker upp, drack upp, druckit upp");
// köra, springa, åka
P("över", 2, "köra över", "to run over", "Bilen körde över en katt.", "The car ran over a cat.", "kör över, körde över, kört över");
P("övriga", 2, "köra fast", "to get stuck", "Bilen körde fast i snön.", "The car got stuck in the snow.", "kör fast, körde fast, kört fast");
P("övriga", 2, "köra förbi", "to drive past", "Jag kör förbi butiken.", "I am driving past the shop.", "kör förbi, körde förbi, kört förbi");
P("övriga", 2, "köra hem", "to drive home", "Jag kör hem dig.", "I will drive you home.", "kör hem, körde hem, kört hem");
P("efter", 2, "springa efter", "to run after", "Hunden sprang efter bollen.", "The dog ran after the ball.", "springer efter, sprang efter, sprungit efter");
P("övriga", 2, "springa iväg", "to run off", "Barnet sprang iväg.", "The child ran off.", "springer iväg, sprang iväg, sprungit iväg");
P("på", 3, "springa på", "to run into", "Jag sprang på honom i stan.", "I ran into him in town.", "springer på, sprang på, sprungit på");
P("övriga", 1, "åka hem", "to go home", "Vi åker hem imorgon.", "We are going home tomorrow.", "åker hem, åkte hem, åkt hem");
P("övriga", 2, "åka iväg", "to go away", "De åkte iväg igår.", "They went away yesterday.", "åker iväg, åkte iväg, åkt iväg");
P("övriga", 3, "åka fast", "to get caught", "Han åkte fast för stöld.", "He got caught for theft.", "åker fast, åkte fast, åkt fast");
P("med", 1, "åka med", "to go along", "Vill du åka med?", "Do you want to come along?", "åker med, åkte med, åkt med");
// flytta, betala, köpa, sälja, räkna, skicka, lämna
P("ut", 2, "flytta ut", "to move out", "Hon flyttar ut i juni.", "She moves out in June.", "flyttar ut, flyttade ut, flyttat ut");
P("ihop", 2, "flytta ihop", "to move in together", "De flyttar ihop.", "They are moving in together.", "flyttar ihop, flyttade ihop, flyttat ihop");
P("på", 3, "flytta på", "to move aside", "Kan du flytta på dig?", "Can you move over?", "flyttar på, flyttade på, flyttat på");
P("tillbaka", 2, "betala tillbaka", "to pay back", "Jag betalar tillbaka pengarna.", "I am paying the money back.", "betalar tillbaka, betalade tillbaka, betalat tillbaka");
P("av", 3, "betala av", "to pay off", "Vi betalar av lånet.", "We are paying off the loan.", "betalar av, betalade av, betalat av");
P("ut", 3, "betala ut", "to pay out", "Banken betalar ut lönen.", "The bank pays out the salary.", "betalar ut, betalade ut, betalat ut");
P("in", 2, "köpa in", "to buy in (supplies)", "Jag köper in mat till helgen.", "I am buying food for the weekend.", "köper in, köpte in, köpt in");
P("ut", 3, "sälja ut", "to sell off", "Butiken säljer ut alla varor.", "The shop is selling off all its goods.", "säljer ut, sålde ut, sålt ut");
P("med", 2, "räkna med", "to count on, to expect", "Jag räknar med dig.", "I am counting on you.", "räknar med, räknade med, räknat med");
P("upp", 3, "räkna upp", "to list", "Kan du räkna upp dem?", "Can you list them?", "räknar upp, räknade upp, räknat upp");
P("in", 2, "skicka in", "to send in", "Jag skickar in ansökan.", "I am sending in the application.", "skickar in, skickade in, skickat in");
P("övriga", 2, "skicka iväg", "to send off", "Hon skickade iväg brevet.", "She sent off the letter.", "skickar iväg, skickade iväg, skickat iväg");
P("tillbaka", 2, "skicka tillbaka", "to send back", "Vi skickar tillbaka paketet.", "We are sending the package back.", "skickar tillbaka, skickade tillbaka, skickat tillbaka");
P("övriga", 2, "skicka vidare", "to forward", "Kan du skicka vidare mejlet?", "Can you forward the email?", "skickar vidare, skickade vidare, skickat vidare");
P("ut", 3, "lämna ut", "to hand out, to release", "Skolan lämnar ut böckerna.", "The school hands out the books.", "lämnar ut, lämnade ut, lämnat ut");
P("över", 3, "lämna över", "to hand over", "Han lämnade över nyckeln.", "He handed over the key.", "lämnar över, lämnade över, lämnat över");
P("övriga", 2, "lämna kvar", "to leave behind", "Jag lämnade kvar jackan.", "I left my jacket behind.", "lämnar kvar, lämnade kvar, lämnat kvar");
// plocka, städa, tvätta, klä
P("fram", 2, "plocka fram", "to take out", "Jag plockar fram glasen.", "I am getting out the glasses.", "plockar fram, plockade fram, plockat fram");
P("övriga", 2, "plocka undan", "to tidy away", "Plocka undan leksakerna.", "Tidy away the toys.", "plockar undan, plockade undan, plockat undan");
P("bort", 2, "plocka bort", "to clear away", "Hon plockar bort disken.", "She clears away the dishes.", "plockar bort, plockade bort, plockat bort");
P("ihop", 3, "plocka ihop", "to gather up", "Vi plockar ihop våra saker.", "We are gathering our things.", "plockar ihop, plockade ihop, plockat ihop");
P("upp", 2, "städa upp", "to tidy up", "Vi städar upp efter festen.", "We are tidying up after the party.", "städar upp, städade upp, städat upp");
P("bort", 3, "städa bort", "to tidy away", "Jag städar bort sakerna.", "I am tidying the things away.", "städar bort, städade bort, städat bort");
P("av", 2, "tvätta av", "to wash off", "Tvätta av händerna.", "Wash your hands.", "tvättar av, tvättade av, tvättat av");
P("på", 1, "klä på sig", "to get dressed", "Jag klär på mig.", "I am getting dressed.", "klär på sig, klädde på sig, klätt på sig");
P("av", 1, "klä av sig", "to get undressed", "Hon klär av sig.", "She gets undressed.", "klär av sig, klädde av sig, klätt av sig");
// stiga, vakna, somna, tro, be, lyssna, bjuda, träffa, möta
P("på", 2, "stiga på", "to get on", "Jag stiger på bussen här.", "I get on the bus here.", "stiger på, steg på, stigit på");
P("ner", 3, "stiga ner", "to step down", "Han steg ner från scenen.", "He stepped down from the stage.", "stiger ner, steg ner, stigit ner");
P("till", 3, "vakna till", "to wake up, to come to", "Jag vaknade till av ett ljud.", "I woke up to a sound.", "vaknar till, vaknade till, vaknat till");
P("om", 2, "somna om", "to fall asleep again", "Jag somnade om direkt.", "I fell asleep again straight away.", "somnar om, somnade om, somnat om");
P("in", 2, "somna in", "to fall asleep", "Barnet somnade in snabbt.", "The child fell asleep quickly.", "somnar in, somnade in, somnat in");
P("på", 1, "tro på", "to believe in", "Jag tror på dig.", "I believe in you.", "tror på, trodde på, trott på");
P("om", 1, "be om", "to ask for", "Jag ber om hjälp.", "I am asking for help.", "ber om, bad om, bett om");
P("övriga", 1, "be om ursäkt", "to apologise", "Jag vill be om ursäkt.", "I want to apologise.", "ber om ursäkt, bad om ursäkt, bett om ursäkt");
P("på", 1, "lyssna på", "to listen to", "Jag lyssnar på musik.", "I am listening to music.", "lyssnar på, lyssnade på, lyssnat på");
P("på", 2, "bjuda på", "to treat to", "Jag bjuder på middag.", "Dinner is on me.", "bjuder på, bjöd på, bjudit på");
P("ut", 3, "bjuda ut", "to ask out", "Han bjöd ut henne.", "He asked her out.", "bjuder ut, bjöd ut, bjudit ut");
P("på", 3, "träffa på", "to run into", "Jag träffade på en gammal vän.", "I ran into an old friend.", "träffar på, träffade på, träffat på");
P("upp", 2, "möta upp", "to meet up", "Vi möter upp er vid stationen.", "We will meet you at the station.", "möter upp, mötte upp, mött upp");
// bryta, slita, falla, hoppa, kasta, skjuta, fylla, räcka, hälla
P("ihop", 2, "bryta ihop", "to break down", "Hon bröt ihop och grät.", "She broke down and cried.", "bryter ihop, bröt ihop, brutit ihop");
P("upp", 2, "bryta upp", "to break up, to leave", "Vi bryter upp klockan fem.", "We break camp at five.", "bryter upp, bröt upp, brutit upp");
P("in", 3, "bryta sig in", "to break in", "Någon bröt sig in i huset.", "Someone broke into the house.", "bryter sig in, bröt sig in, brutit sig in");
P("övriga", 3, "bryta mot", "to break (a rule)", "Du bryter mot reglerna.", "You are breaking the rules.", "bryter mot, bröt mot, brutit mot");
P("ut", 3, "bryta ut", "to break out", "Branden bröt ut i natt.", "The fire broke out last night.", "bryter ut, bröt ut, brutit ut");
P("ut", 3, "slita ut", "to wear out", "Jag har slitit ut mina skor.", "I have worn out my shoes.", "sliter ut, slet ut, slitit ut");
P("ihop", 3, "falla ihop", "to collapse", "Huset föll ihop.", "The house collapsed.", "faller ihop, föll ihop, fallit ihop");
P("ner", 2, "falla ner", "to fall down", "Boken föll ner på golvet.", "The book fell down on the floor.", "faller ner, föll ner, fallit ner");
P("bort", 3, "falla bort", "to drop out", "Ordet föll bort.", "The word dropped out.", "faller bort, föll bort, fallit bort");
P("övriga", 3, "falla sönder", "to fall apart", "Stolen föll sönder.", "The chair fell apart.", "faller sönder, föll sönder, fallit sönder");
P("övriga", 3, "falla för", "to fall for", "Hon föll för honom direkt.", "She fell for him right away.", "faller för, föll för, fallit för");
P("av", 2, "hoppa av", "to drop out, to jump off", "Han hoppade av skolan.", "He dropped out of school.", "hoppar av, hoppade av, hoppat av");
P("över", 2, "hoppa över", "to skip", "Jag hoppar över frukosten.", "I skip breakfast.", "hoppar över, hoppade över, hoppat över");
P("in", 3, "hoppa in", "to step in", "Hon hoppade in som vikarie.", "She stepped in as a substitute.", "hoppar in, hoppade in, hoppat in");
P("upp", 2, "hoppa upp", "to jump up", "Barnet hoppade upp ur sängen.", "The child jumped out of bed.", "hoppar upp, hoppade upp, hoppat upp");
P("ut", 2, "kasta ut", "to throw out", "Jag kastar ut gamla kläder.", "I am throwing out old clothes.", "kastar ut, kastade ut, kastat ut");
P("upp", 3, "kasta upp", "to throw up", "Barnet kastade upp.", "The child threw up.", "kastar upp, kastade upp, kastat upp");
P("upp", 2, "skjuta upp", "to postpone", "Vi måste skjuta upp mötet.", "We have to postpone the meeting.", "skjuter upp, sköt upp, skjutit upp");
P("till", 3, "skjuta till", "to chip in", "Alla skjuter till lite pengar.", "Everyone chips in a bit of money.", "skjuter till, sköt till, skjutit till");
P("övriga", 3, "fylla år", "to have a birthday", "Jag fyller år i maj.", "My birthday is in May.", "fyller år, fyllde år, fyllt år");
P("upp", 3, "fylla upp", "to fill up", "Vi fyller upp tanken.", "We are filling up the tank.", "fyller upp, fyllde upp, fyllt upp");
P("ut", 2, "fylla ut", "to fill out", "Fyll ut blanketten.", "Fill out the form.", "fyller ut, fyllde ut, fyllt ut");
P("till", 2, "räcka till", "to be enough", "Maten räcker till alla.", "The food is enough for everyone.", "räcker till, räckte till, räckt till");
P("fram", 3, "räcka fram", "to hold out", "Hon räckte fram handen.", "She held out her hand.", "räcker fram, räckte fram, räckt fram");
P("upp", 2, "hälla upp", "to pour (a drink)", "Jag häller upp kaffe.", "I am pouring coffee.", "häller upp, hällde upp, hällt upp");
P("ut", 2, "hälla ut", "to pour out", "Hon hällde ut vattnet.", "She poured out the water.", "häller ut, hällde ut, hällt ut");
// bära, lyfta, dela, samla, leda, föra
P("in", 2, "bära in", "to carry in", "Kan du bära in lådan?", "Can you carry the box in?", "bär in, bar in, burit in");
P("ut", 2, "bära ut", "to carry out", "Vi bär ut stolarna.", "We are carrying out the chairs.", "bär ut, bar ut, burit ut");
P("med", 2, "bära med sig", "to carry with one", "Jag bär alltid med mig en bok.", "I always carry a book with me.", "bär med sig, bar med sig, burit med sig");
P("fram", 3, "bära fram", "to bring out, to serve", "Servitören bär fram maten.", "The waiter brings out the food.", "bär fram, bar fram, burit fram");
P("upp", 2, "lyfta upp", "to lift up", "Hon lyfter upp barnet.", "She lifts the child up.", "lyfter upp, lyfte upp, lyft upp");
P("fram", 3, "lyfta fram", "to highlight", "Vi vill lyfta fram problemet.", "We want to highlight the problem.", "lyfter fram, lyfte fram, lyft fram");
P("av", 3, "lyfta av", "to take off (a plane)", "Planet lyfter av.", "The plane takes off.", "lyfter av, lyfte av, lyft av");
P("ut", 2, "dela ut", "to hand out", "Läraren delar ut papper.", "The teacher hands out papers.", "delar ut, delade ut, delat ut");
P("upp", 2, "dela upp", "to divide up", "Vi delar upp arbetet.", "We divide up the work.", "delar upp, delade upp, delat upp");
P("med", 2, "dela med sig", "to share", "Hon delar med sig av maten.", "She shares her food.", "delar med sig, delade med sig, delat med sig");
P("in", 3, "dela in", "to divide into", "Vi delar in klassen i grupper.", "We divide the class into groups.", "delar in, delade in, delat in");
P("ihop", 2, "samla ihop", "to gather together", "Samla ihop era saker.", "Gather your things.", "samlar ihop, samlade ihop, samlat ihop");
P("in", 3, "samla in", "to collect", "Vi samlar in pengar.", "We are collecting money.", "samlar in, samlade in, samlat in");
P("upp", 3, "samla upp", "to gather up", "Han samlar upp bladen.", "He gathers up the leaves.", "samlar upp, samlade upp, samlat upp");
P("till", 2, "leda till", "to lead to", "Det kan leda till problem.", "It can lead to problems.", "leder till, ledde till, lett till");
P("in", 3, "leda in", "to lead in", "Hon ledde in gästerna.", "She led the guests in.", "leder in, ledde in, lett in");
P("med", 3, "föra med sig", "to bring about", "Det för med sig problem.", "It brings problems with it.", "för med sig, förde med sig, fört med sig");
P("in", 3, "föra in", "to enter (data)", "Jag för in siffrorna.", "I am entering the figures.", "för in, förde in, fört in");
P("fram", 3, "föra fram", "to put forward", "Hon förde fram sin åsikt.", "She put forward her opinion.", "för fram, förde fram, fört fram");
// misc
P("upp", 3, "lösa upp", "to dissolve", "Lös upp tabletten i vatten.", "Dissolve the tablet in water.", "löser upp, löste upp, löst upp");
P("upp", 3, "rensa upp", "to clear up", "Vi rensar upp i garderoben.", "We are sorting out the wardrobe.", "rensar upp, rensade upp, rensat upp");
P("ut", 3, "rensa ut", "to clear out", "Jag rensar ut gamla papper.", "I am clearing out old papers.", "rensar ut, rensade ut, rensat ut");
P("ihop", 2, "vika ihop", "to fold up", "Jag viker ihop tvätten.", "I am folding up the laundry.", "viker ihop, vek ihop, vikit ihop");
P("upp", 3, "vika upp", "to roll up", "Hon vek upp ärmarna.", "She rolled up her sleeves.", "viker upp, vek upp, vikit upp");
P("upp", 3, "bygga upp", "to build up", "De bygger upp ett företag.", "They are building up a company.", "bygger upp, byggde upp, byggt upp");
P("ut", 3, "bygga ut", "to extend", "Vi bygger ut huset.", "We are extending the house.", "bygger ut, byggde ut, byggt ut");
P("efter", 2, "följa efter", "to follow", "Hunden följde efter oss.", "The dog followed us.", "följer efter, följde efter, följt efter");
P("upp", 3, "följa upp", "to follow up", "Jag följer upp mejlet.", "I am following up the email.", "följer upp, följde upp, följt upp");
P("övriga", 2, "bestämma sig", "to make up one's mind", "Jag har bestämt mig.", "I have made up my mind.", "bestämmer sig, bestämde sig, bestämt sig");
P("övriga", 2, "glömma kvar", "to leave behind (by mistake)", "Jag glömde kvar paraplyet.", "I left my umbrella behind.", "glömmer kvar, glömde kvar, glömt kvar");
P("övriga", 1, "känna igen", "to recognise", "Jag känner igen dig.", "I recognise you.", "känner igen, kände igen, känt igen");
P("övriga", 2, "känna till", "to know of", "Känner du till stället?", "Do you know the place?", "känner till, kände till, känt till");
P("på", 2, "höra på", "to listen to", "Hör på mig!", "Listen to me!", "hör på, hörde på, hört på");
P("på", 2, "prova på", "to try out", "Jag vill prova på att surfa.", "I want to try surfing.", "provar på, provade på, provat på");
P("in", 2, "ställa in", "to cancel, to set", "Mötet ställdes in.", "The meeting was cancelled.", "ställer in, ställde in, ställt in");
P("ner", 2, "ställa ner", "to put down", "Ställ ner väskan.", "Put the bag down.", "ställer ner, ställde ner, ställt ner");
P("fram", 2, "ställa fram", "to put out", "Jag ställer fram glasen.", "I am putting out the glasses.", "ställer fram, ställde fram, ställt fram");
P("ut", 3, "ställa ut", "to exhibit", "Hon ställer ut sina tavlor.", "She exhibits her paintings.", "ställer ut, ställde ut, ställt ut");
P("om", 2, "byta om", "to change clothes", "Jag byter om till träningskläder.", "I am changing into gym clothes.", "byter om, bytte om, bytt om");
P("bort", 2, "slänga bort", "to throw away", "Släng inte bort det!", "Don't throw it away!", "slänger bort, slängde bort, slängt bort");
