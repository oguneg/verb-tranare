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
