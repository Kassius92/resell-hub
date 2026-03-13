/* ─── BRAND DATABASE ─── */
// difficoltaNum: 1=bassissima, 2=bassa, 3=media, 4=alta (used for score calc)
// rischioFalsi: "basso" | "medio" | "alto"
// controlloFalsi: array of checks
export const BRANDS = [
  {
    name: "Gucci", domanda: 5, velocita: "1-3 giorni", margine: 95, difficoltaNum: 4,
    note: "Brand più venduto in Italia nel segmento lusso.",
    source: "Privati, Vintage shops", prezzo: "60-400€",
    cosaMeglio: ["Cinture con logo GG", "Borse Dionysus e Marmont", "Sciarpe e foulard", "T-shirt con stampa logo vintage"],
    cosaEvitare: ["Falsi (controlla cuciture, serial number, polvere bag)", "Articoli troppo consumati", "Accessori senza box/dustbag perdono valore"],
    prezzoVendita: "100-600€",
    taglieTop: ["Unica (accessori)", "S-M (abbigliamento)"],
    stagione: "Tutto l'anno, picco a Natale e San Valentino",
    consiglio: "Investi su accessori: cinture e borse hanno margini altissimi e si vendono in 24h. Sempre chiedere foto del serial number prima di comprare.",
    difficolta: "Alta — servono capitali e occhio per i falsi",
    rischioFalsi: "alto",
    controlloFalsi: ["Controlla il serial number all'interno (6 cifre + 4 cifre)", "Cuciture dritte e regolari, filo di qualità", "Dustbag e box originali (aumentano il valore)", "La stampa GG deve essere simmetrica e nitida", "Confronta con foto ufficiali dal sito Gucci"],
  },
  {
    name: "Fendi", domanda: 5, velocita: "3-7 giorni", margine: 95, difficoltaNum: 4,
    note: "Margini altissimi su borse e accessori.",
    source: "Privati, Aste", prezzo: "50-300€",
    cosaMeglio: ["Borse Baguette e Peekaboo", "Portafogli e cinture", "Foulard con logo FF"],
    cosaEvitare: ["Abbigliamento basic senza logo riconoscibile", "Pezzi troppo datati anni 2000"],
    prezzoVendita: "120-500€",
    taglieTop: ["Unica (accessori)"],
    stagione: "Tutto l'anno",
    consiglio: "La Baguette è tornata di moda grazie a Sex and the City. I modelli vintage anni 90-2000 valgono tantissimo. Cerca nelle aste online.",
    difficolta: "Alta — capitali importanti necessari",
    rischioFalsi: "alto",
    controlloFalsi: ["Controlla il serial number nella tasca interna", "Il pattern FF deve essere perfettamente allineato alle cuciture", "Hardware metallico pesante e inciso (non stampato)", "Etichetta 'Made in Italy' con font specifico", "Zip YKK o Lampo (mai zip generiche)"],
  },
  {
    name: "Stone Island", domanda: 5, velocita: "1-3 giorni", margine: 92, difficoltaNum: 3,
    note: "Patch originale = vendita garantita.",
    source: "Privati, Vinted", prezzo: "40-150€",
    cosaMeglio: ["Felpe con patch sul braccio", "Giubbotti leggeri", "Pantaloni cargo", "Maglie a maniche lunghe"],
    cosaEvitare: ["FALSI — il mercato è pieno", "Pezzi senza patch (valgono molto meno)"],
    prezzoVendita: "80-300€",
    taglieTop: ["M", "L", "XL"],
    stagione: "Autunno-Inverno per giubbotti, tutto l'anno per felpe",
    consiglio: "Il brand più sicuro per il resell in Italia. Se la patch è originale, vendi sempre. Compra da privati che non sanno il valore. Foto della patch = must nell'annuncio.",
    difficolta: "Media — i falsi sono il rischio principale",
    rischioFalsi: "alto",
    controlloFalsi: ["Cerchigramma sulla patch: deve cambiare colore sotto luce diversa", "QR code sulla patch scannerizzabile", "Etichetta interna con art. number verificabile su StoneIsland.com", "Bottoni con incisione 'Stone Island'", "Cuciture regolari e rifinite, mai fili sciolti"],
  },
  {
    name: "Ralph Lauren", domanda: 5, velocita: "1-3 giorni", margine: 90, difficoltaNum: 2,
    note: "Polo e felpe reggono il prezzo anche molto usati.",
    source: "Mercatini, Thrift shops", prezzo: "20-60€",
    cosaMeglio: ["Polo con logo grande (Big Pony)", "Felpe con zip e logo", "Camicie Oxford button-down", "Maglioni in cotone/lana con logo"],
    cosaEvitare: ["Polo con logo piccolo (margine basso)", "Taglie troppo grandi (XXL+) meno richieste"],
    prezzoVendita: "35-100€",
    taglieTop: ["M", "L"],
    stagione: "Tutto l'anno, polo in primavera-estate",
    consiglio: "Cerca nei mercatini dell'usato — si trova a 5-10€. Le polo Big Pony si vendono a 30-40€. I maglioni invernali con logo cavallo a 25-50€. Facile da trovare, facile da vendere.",
    difficolta: "Bassa — perfetto per iniziare",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio basso — i falsi sono rari e facili da riconoscere", "Controlla che il cavallino sia ricamato bene (non stampato)", "Etichetta interna con paese di produzione"],
  },
  {
    name: "Burberry", domanda: 4, velocita: "3-7 giorni", margine: 90, difficoltaNum: 3,
    note: "Sciarpe e trench iconici. Il vintage nova check è ricercatissimo.",
    source: "Thrift shops, Privati", prezzo: "30-200€",
    cosaMeglio: ["Sciarpe in cashmere con pattern nova check", "Trench classico beige", "Camicie con pattern check", "Borse vintage"],
    cosaEvitare: ["Falsi — Burberry è molto contraffatto", "Pezzi senza etichetta o con etichette sospette"],
    prezzoVendita: "60-400€",
    taglieTop: ["Unica (sciarpe)", "M-L (trench)"],
    stagione: "Autunno-Inverno per sciarpe e trench",
    consiglio: "Le sciarpe in cashmere sono oro puro: le compri a 20-40€ nei mercatini e le rivendi a 60-100€. Il trench Burberry vintage è un pezzo iconico che vale 150-300€.",
    difficolta: "Media — occhio ai falsi",
    rischioFalsi: "alto",
    controlloFalsi: ["Etichetta: 'Burberry' (nuovi) o 'Burberrys' (vintage pre-1999) — mai entrambi", "Sciarpe: cashmere vero è morbidissimo, le frange sono cucite non incollate", "Pattern nova check: le linee devono essere simmetriche e allineate alle cuciture", "Trench: controlla i bottoni con incisione 'Burberry' e la fodera interna"],
  },
  {
    name: "The North Face", domanda: 5, velocita: "1-3 giorni", margine: 88, difficoltaNum: 2,
    note: "Giacche e gilet a prezzi alti. Stagionalità importante.",
    source: "Mercatini, Vinted stessa", prezzo: "25-80€",
    cosaMeglio: ["Piumini Nuptse (il re del resell)", "Gilet imbottiti", "Giacche in Gore-Tex", "Felpe con logo"],
    cosaEvitare: ["T-shirt basic (margine troppo basso)", "Modelli molto vecchi e rovinati"],
    prezzoVendita: "50-180€",
    taglieTop: ["S", "M", "L"],
    stagione: "Settembre-Febbraio — pubblica prima che faccia freddo",
    consiglio: "Il Nuptse è il prodotto più rivenduto su Vinted Italia. Compralo d'estate quando costa meno e vendilo a ottobre. Le taglie S e M donna vanno fortissimo.",
    difficolta: "Bassa — facile trovare e vendere",
    rischioFalsi: "medio",
    controlloFalsi: ["Controlla la zip YKK (deve avere incisione 'YKK')", "Etichetta olografica sul collo (modelli recenti)", "Il logo ricamato deve essere pulito, senza fili fuori posto", "Verifica il codice stile sull'etichetta interna"],
  },
  {
    name: "Nike", domanda: 5, velocita: "1-3 giorni", margine: 85, difficoltaNum: 1,
    note: "Felpe e tute spariscono in 1-3 giorni.",
    source: "Primark, Mercatini, FB Marketplace", prezzo: "15-45€",
    cosaMeglio: ["Felpe con swoosh centrale", "Tute Tech Fleece", "Giacche a vento vintage", "Air Force 1 e Dunk"],
    cosaEvitare: ["T-shirt basic bianche/nere (troppa concorrenza)", "Scarpe usate molto consumate"],
    prezzoVendita: "30-90€",
    taglieTop: ["M", "L"],
    stagione: "Tutto l'anno, felpe e tute in autunno-inverno",
    consiglio: "Nike è il brand più facile per iniziare. Le felpe vintage con swoosh grande si trovano a 10-15€ e si vendono a 30-40€. Le Tech Fleece sono richiestissime. Foto su sfondo neutro fanno la differenza.",
    difficolta: "Bassissima — il miglior brand per principianti",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio basso per abbigliamento (più alto per scarpe)", "Scarpe: controlla codice stile sulla linguetta e sulla scatola (devono corrispondere)", "Etichetta interna con codice a barre e taglie multiple"],
  },
  {
    name: "Carhartt", domanda: 4, velocita: "3-7 giorni", margine: 85, difficoltaNum: 3,
    note: "Nicchia workwear in forte crescita.",
    source: "Mercatini, Import USA", prezzo: "20-50€",
    cosaMeglio: ["Giacche Detroit", "Felpe con logo", "Beanie (cappellini invernali)", "T-shirt con tasca"],
    cosaEvitare: ["Carhartt WIP e Carhartt originale sono diversi — il WIP vale di più nel resell", "Pezzi troppo rovinati dal lavoro"],
    prezzoVendita: "40-120€",
    taglieTop: ["M", "L", "XL"],
    stagione: "Autunno-Inverno per giacche, tutto l'anno per beanie",
    consiglio: "Carhartt WIP è la linea fashion che vale di più. La giacca Detroit vintage è un pezzo cult. Cerca nei mercatini americani online — i prezzi sono più bassi che in Italia.",
    difficolta: "Media — difficile da trovare a poco",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio basso — pochi falsi in circolazione", "Distingui Carhartt (workwear) da Carhartt WIP (fashion) — etichette diverse", "WIP ha etichetta quadrata con logo, Carhartt originale ha etichetta rettangolare"],
  },
  {
    name: "Adidas", domanda: 5, velocita: "1-3 giorni", margine: 80, difficoltaNum: 1,
    note: "Trefoil e 3 stripes sempre richiesti.",
    source: "Mercatini, Outlet", prezzo: "12-35€",
    cosaMeglio: ["Felpe con logo Trefoil vintage", "Tute con 3 stripes", "Giacche Firebird", "Samba e Gazelle (scarpe)"],
    cosaEvitare: ["Articoli senza logo visibile", "Scarpe molto usate (suola consumata)"],
    prezzoVendita: "25-70€",
    taglieTop: ["S", "M", "L"],
    stagione: "Tutto l'anno",
    consiglio: "Il vintage Adidas anni 80-90 vale molto di più del nuovo. Le Samba sono le scarpe più cercate del momento. Le tute con zip e 3 stripes laterali si vendono sempre.",
    difficolta: "Bassa — facile da trovare ovunque",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio basso per abbigliamento", "Scarpe: controlla il codice articolo sulla linguetta interna", "Il logo Trefoil deve essere ricamato in modo pulito"],
  },
  {
    name: "New Balance", domanda: 4, velocita: "3-7 giorni", margine: 78, difficoltaNum: 3,
    note: "Modelli 550 e 530 molto richiesti.",
    source: "Outlet, Saldi online", prezzo: "40-90€",
    cosaMeglio: ["550 (bianche/verdi/blu)", "530 (silver)", "990 Made in USA (fascia alta)", "2002R"],
    cosaEvitare: ["Modelli running vecchi (nessuna domanda)", "Colori troppo particolari"],
    prezzoVendita: "70-150€",
    taglieTop: ["40-44 (uomo)", "36-39 (donna)"],
    stagione: "Tutto l'anno",
    consiglio: "Le 550 sono diventate mainstream grazie a Aimé Leon Dore. Comprale in outlet quando sono in saldo e rivendi al prezzo pieno. I colori neutri (bianco, grigio, verde) si vendono più veloci.",
    difficolta: "Media — margine più basso sulle taglie comuni",
    rischioFalsi: "medio",
    controlloFalsi: ["Controlla il codice modello sulla linguetta e sulla scatola", "La N laterale deve essere cucita, non incollata", "Modelli Made in USA/UK: verifica il paese sulla linguetta"],
  },
  {
    name: "Levi's", domanda: 4, velocita: "3-7 giorni", margine: 78, difficoltaNum: 2,
    note: "Jeans 501 e vintage anni 80/90 valgono molto.",
    source: "Thrift shops, Mercatini", prezzo: "10-35€",
    cosaMeglio: ["501 vintage (etichetta rossa piccola)", "Giacche trucker in denim", "Jeans 505 e 550 relaxed", "Modelli Made in USA"],
    cosaEvitare: ["Jeans skinny (fuori moda)", "Modelli recenti da negozio (margine basso)"],
    prezzoVendita: "30-80€",
    taglieTop: ["W28-W32 (più richieste)", "Unica (giacche)"],
    stagione: "Tutto l'anno",
    consiglio: "I 501 vintage con etichetta piccola rossa si trovano nei mercatini a 8-15€ e si vendono a 35-60€. Le giacche trucker oversize vanno fortissimo. Metti sempre le misure esatte in cm.",
    difficolta: "Bassa — si trovano facilmente",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio bassissimo — i falsi Levi's sono rari", "Per il vintage: l'etichetta rossa piccola (con la 'E' minuscola) indica pezzi post-1971", "Controlla le cuciture arancioni a doppio filo (caratteristica Levi's)"],
  },
  {
    name: "Tommy Hilfiger", domanda: 4, velocita: "3-7 giorni", margine: 75, difficoltaNum: 2,
    note: "Buona domanda costante, soprattutto uomo.",
    source: "Outlet, FB Marketplace", prezzo: "15-40€",
    cosaMeglio: ["Felpe con logo grande anni 90", "Polo con bandierina", "Giacche leggere", "Maglioni con logo"],
    cosaEvitare: ["T-shirt basic senza logo (troppa concorrenza)", "Taglie molto grandi"],
    prezzoVendita: "30-70€",
    taglieTop: ["M", "L", "XL"],
    stagione: "Tutto l'anno, maglioni in inverno",
    consiglio: "Il vintage Tommy anni 90 con logo grande è molto più richiesto del nuovo. Cerca su FB Marketplace — molti privati vendono lotti interi a prezzi bassi.",
    difficolta: "Bassa — domanda costante",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio basso — pochi falsi", "Controlla che la bandierina sia ricamata (non stampata)", "Le etichette interne devono avere codice RN e CA"],
  },
  {
    name: "Dickies", domanda: 3, velocita: "1-2 settimane", margine: 72, difficoltaNum: 2,
    note: "Pantaloni cargo e giacche: domanda alta, reperibili a poco.",
    source: "Outlet, Mercatini", prezzo: "8-25€",
    cosaMeglio: ["Pantaloni 874 Original Fit", "Cargo pants", "Giacche da lavoro", "Camicie a maniche corte"],
    cosaEvitare: ["Taglie troppo grandi o troppo piccole", "Colori insoliti (attieniti a nero, beige, verde)"],
    prezzoVendita: "20-50€",
    taglieTop: ["30-34 (pantaloni)", "M-L (giacche)"],
    stagione: "Tutto l'anno",
    consiglio: "I 874 sono un classico dello streetwear. Si trovano nuovi a 15-20€ in outlet e si vendono a 30-40€ su Vinted. Il nero e il beige sono i colori più richiesti.",
    difficolta: "Bassa — facile e sicuro",
    rischioFalsi: "basso",
    controlloFalsi: ["Rischio bassissimo — nessuno fa falsi di Dickies", "Controlla solo che l'etichetta sia quella ufficiale"],
  },
  {
    name: "Zara", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 1,
    note: "Ottimo rapporto costo/velocità.",
    source: "Zara Outlet, Saldi", prezzo: "8-25€",
    cosaMeglio: ["Cappotti strutturati", "Blazer oversize", "Borse (imitano il lusso)", "Pezzi della collezione limitata"],
    cosaEvitare: ["Basic (t-shirt, canotte)", "Pezzi molto comuni che tutti hanno già"],
    prezzoVendita: "18-50€",
    taglieTop: ["S", "M"],
    stagione: "Segui le collezioni — vendi subito dopo l'uscita",
    consiglio: "Il trucco con Zara è comprare durante i saldi al -70% e rivendere come 'nuovo con etichette'. I cappotti invernali comprati a 20€ in saldo si rivendono a 40-50€. Velocità è tutto.",
    difficolta: "Bassissima — perfetto per volume",
    rischioFalsi: "basso",
    controlloFalsi: ["Nessun rischio — nessuno contraffà Zara"],
  },
  {
    name: "Mango", domanda: 3, velocita: "1-2 settimane", margine: 60, difficoltaNum: 1,
    note: "Buona rotazione per donna. Meno margine ma veloce.",
    source: "Outlet, Saldi", prezzo: "5-18€",
    cosaMeglio: ["Cappotti e giacche", "Borse in ecopelle", "Vestiti eleganti", "Blazer"],
    cosaEvitare: ["T-shirt e basic (margine zero)", "Pezzi troppo di tendenza che scadono in fretta"],
    prezzoVendita: "15-40€",
    taglieTop: ["S", "M"],
    stagione: "Autunno-Inverno per cappotti, Primavera per vestiti",
    consiglio: "Mango funziona bene per l'abbigliamento donna. Il margine è più basso ma la rotazione è veloce. Compra in saldo, rivendi come 'nuovo'. Abbinalo a Zara per fare volume.",
    difficolta: "Bassissima",
    rischioFalsi: "basso",
    controlloFalsi: ["Nessun rischio — nessuno contraffà Mango"],
  },
  {
    name: "H&M", domanda: 2, velocita: "2-4 settimane", margine: 50, difficoltaNum: 1,
    note: "Conviene solo con prezzi bassissimi e lotti.",
    source: "Saldi, Stock", prezzo: "3-10€",
    cosaMeglio: ["Collezioni premium/Studio", "Collaborazioni designer (H&M x Mugler, ecc.)", "Cappotti invernali", "Pezzi con etichetta ancora attaccata"],
    cosaEvitare: ["Basic e fast fashion comune (nessuno lo vuole)", "Pezzi usati di H&M (valore percepito zero)"],
    prezzoVendita: "10-25€",
    taglieTop: ["S", "M"],
    stagione: "Solo saldi e collaborazioni",
    consiglio: "H&M funziona SOLO se compri a 2-5€ durante i mega saldi e rivendi con etichetta come nuovo. Le collaborazioni con designer (H&M x Versace, ecc.) hanno margini alti. Per il resto, evita.",
    difficolta: "Bassa ma margine minimo",
    rischioFalsi: "basso",
    controlloFalsi: ["Nessun rischio — nessuno contraffà H&M"],
  },
];

/* ─── Score calculation ─── */
// 40% margine (0-100 → 0-10) + 30% domanda (1-5 → 2-10) + 20% velocità + 10% facilità
export function calcScore(b) {
  const margineScore = (b.margine / 100) * 10;
  const domandaScore = b.domanda * 2;
  const velMap = { "1-3 giorni": 10, "3-7 giorni": 7, "1-2 settimane": 4, "2-4 settimane": 2 };
  const velScore = velMap[b.velocita] || 5;
  const diffNum = b.difficoltaNum || 2;
  const facilitaScore = ((5 - diffNum) / 4) * 10;
  const raw = margineScore * 0.4 + domandaScore * 0.3 + velScore * 0.2 + facilitaScore * 0.1;
  return Math.min(10, Math.round(raw * 10) / 10);
}

/* ─── GUIDA RESELLER — Percorso completo step-by-step ─── */
export const GUIDA = [
  {
    step: 1,
    title: "Scegli la tua nicchia",
    icon: "🎯",
    desc: "Il primo passo per non perdersi: capire cosa vendere, a chi, e perché specializzarsi fa la differenza. Con dati reali dal mercato Vinted Italia.",
    locked: false,
    sections: [
      {
        id: "mercato-vinted",
        title: "Il mercato Vinted Italia — numeri reali",
        content: [
          "Prima di scegliere una nicchia, devi capire dove ti stai muovendo. Vinted in Italia ha circa 5,8 milioni di visite mensili e oltre 4 milioni di utenti registrati. Tra il 2023 e il 2024 le vendite sulla piattaforma sono cresciute del 61%. Non è un mercatino amatoriale: è un ecosistema enorme con concorrenza reale.",
          "La distribuzione degli annunci è squilibrata: quasi il 50% dei prodotti su Vinted sono nella categoria Donna, circa il 33% nella categoria Bambino, e solo il 10% è Uomo. Questo significa che la categoria donna è la più affollata (alta concorrenza) ma anche quella con più acquirenti. La categoria uomo è meno competitiva ma con un bacino più piccolo.",
          "L'Italia è tradizionalmente un Paese di venditori: ci sono più persone che vendono rispetto a quelle che comprano (al contrario della Francia, che è un hub di acquisti). Questo vuol dire che la concorrenza tra venditori italiani è alta. Non basta mettere un annuncio e aspettare — serve una strategia.",
          "Il guadagno medio di chi rivende in Italia è circa 850€ all'anno secondo l'Osservatorio Second Hand Economy (Bva Doxa/Subito.it). Chi fa numeri più alti è chi si specializza, ha fonti di approvvigionamento costanti e tratta il resell come un'attività vera.",
        ],
      },
      {
        id: "perche-nicchia",
        title: "Perché devi scegliere una nicchia",
        content: [
          "Su Vinted ci sono milioni di annunci. Se vendi \"un po' di tutto\" — una maglia Zara, un paio di Nike, una borsa random — il tuo profilo non ha identità. Nessuno ti segue, nessuno si fida, nessuno ti cerca.",
          "Specializzarsi significa diventare riconoscibile. Se vendi solo giacche outdoor vintage, chi cerca quel tipo di prodotto inizia a seguirti, a tornare, a comprare più volte. Costruisci un pubblico.",
          "In termini pratici, la specializzazione ti dà 3 vantaggi concreti:",
          "1. IMPARI A RICONOSCERE IL VALORE — Dopo 50 giacche The North Face sai in 5 secondi se un pezzo vale o no. Non perdi tempo su prodotti che non conosci. Questo è il tuo vero vantaggio competitivo: la conoscenza di nicchia batte qualsiasi trucco di marketing.",
          "2. COMPRI MEGLIO — Sai esattamente cosa cercare ai mercatini, nelle aste, su FB Marketplace. Non giri a vuoto. Mentre gli altri sfogliano tutto il banco, tu vai dritto sui pezzi giusti.",
          "3. VENDI PIÙ VELOCEMENTE — Un profilo coerente e specializzato attira follower interessati. Più follower = più visibilità nell'algoritmo = vendite più rapide. I profili \"tuttologi\" non costruiscono mai un seguito.",
        ],
      },
      {
        id: "nicchie-vinted",
        title: "Le nicchie che funzionano su Vinted Italia",
        content: [
          "Non tutte le nicchie rendono allo stesso modo. Ecco le principali analizzate con dati reali, pro e contro concreti:",
          "━━━ VINTAGE & SECOND-HAND DI MARCA ━━━\nBrand: Ralph Lauren, Burberry, Lacoste, Tommy Hilfiger, Levi's.\nÈ la nicchia più accessibile e più ampia. I capi di questi brand sono tra i più cercati su Vinted in tutta Europa. Le polo Ralph Lauren e Lacoste, le felpe Tommy Hilfiger, i jeans Levi's 501 sono best-seller costanti.\nBudget iniziale: 20-80€\nMargini: 50-150%\nVelocità: media (1-3 settimane)\nDove trovarli: mercatini, thrift shop, FB Marketplace, Humana\nProblema: serve occhio per separare i pezzi buoni (modelli ricercati, condizioni ottime) da quelli che nessuno vuole. Non tutto il vintage ha valore.",
          "━━━ STREETWEAR ━━━\nBrand: Nike, Adidas, Jordan, Carhartt, The North Face, Stüssy, Champion, Dickies.\nPubblico giovane, altissimo volume di ricerca. Le felpe Nike con logo vintage, le giacche Carhartt, i puffer The North Face si vendono velocemente. Le magliette da calcio vintage sono un trend forte nel 2025-2026. Tag come \"Y2K\", \"retro\", \"vintage aesthetic\" e \"90s streetwear\" attirano la Gen Z che cerca ispirazione da TikTok.\nBudget iniziale: 50-200€\nMargini: 30-100%\nVelocità: alta (3-14 giorni)\nDove trovarli: mercatini, stock all'ingrosso (Vundle, TAGZ, Rivintagekilo), aste online\nProblema: i falsi sono ovunque, soprattutto su Jordan e Nike Dunk. Devi imparare ad autenticare. La concorrenza è alta.",
          "━━━ LUXURY ━━━\nBrand: Louis Vuitton, Gucci, Fendi, Prada, Chanel, Dior, Hermès.\nSecondo il Luxury Trend Report di Vinted, Louis Vuitton è il brand luxury più venduto e anche il più veloce da piazzare. In Italia, Fendi e Gucci dominano. Gli articoli più richiesti: la Louis Vuitton Neverfull MM, la giacca Moncler Maya, borse Gucci Dionysus.\nBudget iniziale: 200-500€ (minimo)\nMargini: 100-400%\nVelocità: variabile (1 giorno - 2 mesi)\nDove trovarli: privati, vintage shop specializzati, aste, Vestiaire Collective (per arbitraggio)\nProblema serio: il rischio falsi è enorme. Se compri un falso e lo rivendi, Vinted ti banna l'account PERMANENTEMENTE. Serve esperienza vera nell'autenticazione. Non è una nicchia da principianti.",
          "━━━ SPORTSWEAR TECNICO & OUTDOOR ━━━\nBrand: Patagonia, Arc'teryx, Salomon, Gore-Tex, pile vintage.\nNicchia meno affollata ma con un pubblico disposto a spendere bene. Le giacche Gore-Tex vintage e i pile Patagonia hanno un seguito fedele. È un settore in crescita grazie al trend \"gorpcore\" (moda outdoor).\nBudget iniziale: 30-150€\nMargini: 60-150%\nVelocità: media-bassa (2-4 settimane)\nDove trovarli: mercatini, Humana, privati che svuotano la cantina\nProblema: mercato più piccolo, vendite meno frequenti, ma quando vendi il margine è alto.",
          "━━━ ABBIGLIAMENTO BAMBINO ━━━\nCategoria bambino = circa 33% di tutti gli annunci su Vinted.\nAltissima rotazione: i genitori comprano e rivendono continuamente perché i bimbi crescono. Giocattoli, vestiti, scarpe per fascia 3-5 anni vanno fortissimo.\nBudget iniziale: 10-50€\nMargini: 20-50%\nVelocità: alta (pochi giorni)\nDove trovarli: ovunque — le famiglie svendono a pochissimo\nProblema: prezzi bassi, serve alto volume per guadagnare cifre interessanti. È più un'attività da cash flow continuo che da margini alti.",
          "━━━ ACCESSORI ━━━\nCinture, sciarpe, borse, portafogli, cappelli, foulard di marca.\nOttimi margini, facili da spedire (piccoli e leggeri), e spesso sottovalutati da chi vende. Gli accessori luxury (cinture Gucci, foulard Hermès, portafogli Prada) hanno margini enormi e un mercato costante.\nBudget iniziale: 30-200€\nMargini: 80-200%\nVelocità: media (1-3 settimane)\nDove trovarli: mercatini, privati, thrift shop\nProblema: per il luxury serve autenticazione. Per il non-luxury, serve volume.",
          "━━━ COSMETICI & BEAUTY (NICCHIA EMERGENTE) ━━━\nProfumi sigillati, creme, trucchi nuovi mai aperti di marchi noti.\nNicchia in crescita su Vinted, ma con regole precise: solo prodotti nuovi e sigillati, mai aperti o usati. La data di scadenza deve essere visibile.\nBudget iniziale: 20-100€\nMargini: 30-80%\nVelocità: media\nDove trovarli: outlet, stock, regali mai usati\nProblema: regole Vinted rigide sulla categoria, rischio sospensione se vendi prodotti aperti.",
        ],
      },
      {
        id: "come-scegliere",
        title: "Come scegliere la TUA nicchia — 5 fattori",
        content: [
          "Non esiste la nicchia perfetta in assoluto. Esiste quella giusta per te. Rispondi onestamente a queste 5 domande:",
          "1. COSA CONOSCI GIÀ? — Se sei appassionato di sneaker, parti da lì. Se conosci il vintage perché ci sei cresciuto, quello è il tuo vantaggio. La conoscenza del prodotto è il fattore numero uno: ti fa comprare meglio, vendere meglio, e non prendere fregature. Chi vende senza conoscere il prodotto fa errori costosi.",
          "2. QUANTO PUOI INVESTIRE? — Con 20-50€ puoi iniziare con vintage generico o abbigliamento bambino. Per lo streetwear servono 50-200€. Per il luxury servono almeno 200-500€ solo per partire. Non forzare una nicchia che non puoi permetterti: il capitale bloccato in merce invenduta è il killer numero uno dei reseller principianti.",
          "3. DOVE PUOI TROVARE LA MERCE? — Vivi vicino a mercatini dell'usato? Ci sono thrift shop o Humana nella tua zona? Hai accesso a gruppi FB locali di vendita? La nicchia migliore è quella in cui riesci a trovare merce regolarmente a buon prezzo. Se non hai fonti costanti, non hai un business sostenibile.",
          "4. QUANTO TEMPO HAI? — Vendere luxury richiede più tempo per pezzo (autenticazione, foto dettagliate, trattative lunghe). Il vintage/streetwear generico è più veloce per pezzo ma serve volume. Sii realistico: quante ore a settimana puoi dedicare tra ricerca, foto, spedizioni e messaggi?",
          "5. UOMO, DONNA O BAMBINO? — La categoria donna ha il pubblico più ampio ma la concorrenza più alta. Uomo è meno affollato. Bambino ha rotazione velocissima ma margini bassi. Scegli in base a cosa conosci e cosa trovi più facilmente nella tua zona.",
        ],
      },
      {
        id: "test-nicchia",
        title: "Come testare una nicchia prima di investire",
        content: [
          "Prima di buttare soldi, testa. Ecco il metodo in 3 step da fare in 3 settimane:",
          "STEP A — RICERCA (2-3 ore)\nVai su Vinted, cerca il tipo di prodotto che vuoi vendere. Usa il filtro 'articoli venduti' e analizza: a che prezzo si vendono? In quanto tempo? Ci sono tanti annunci attivi simili o pochi? Se ci sono migliaia di annunci dello stesso prodotto e pochi venduti, quella nicchia è satura. Se ci sono pochi annunci ma venduti velocemente, c'è spazio. Guarda anche i profili dei venditori migliori: cosa fanno bene? Come sono le loro foto? Come scrivono le descrizioni?",
          "STEP B — TEST CON SOLDI VERI (budget: 30-50€ max)\nCompra 3-5 pezzi che secondo la tua ricerca hanno margine. Mettili in vendita con foto curate e descrizioni complete. Non risparmiare sulla presentazione anche se è solo un test — stai testando la nicchia, non quanto puoi tagliare gli angoli.",
          "STEP C — ANALISI (dopo 2-3 settimane)\nRispondi a queste domande: Quanti pezzi hai venduto su 5? Qual è il margine netto (vendita - acquisto - spedizione)? Quanto tempo hai speso in totale (ore)? Dividi il guadagno per le ore: è un ritorno decente? Se su 5 pezzi ne hai venduti 3+ con margine positivo, la nicchia funziona. Se dopo 3 settimane non hai venduto nulla nonostante foto e prezzi competitivi, la nicchia non fa per te.",
          "Regola d'oro: non innamorarti di una nicchia prima di averla testata con soldi veri. Il mercato decide, non il tuo entusiasmo. I dati battono le sensazioni.",
        ],
      },
      {
        id: "stagionalita",
        title: "La stagionalità — quando vendere cosa",
        content: [
          "Su Vinted la stagionalità conta tantissimo. Vendere cappotti a luglio è come vendere gelati a gennaio. Ecco il calendario reale:",
          "GENNAIO-FEBBRAIO — Saldi invernali. La gente compra meno second-hand perché trova sconti nei negozi. Buon momento per fare scorta di merce invernale a prezzi bassissimi (mercatini, privati che svuotano). Vendi: strati intermedi, felpe, maglieria.",
          "MARZO-APRILE — Cambio stagione. Si svuotano gli armadi invernali, si cerca il guardaroba primaverile. Vendi: giacche leggere, camicie, jeans, sneaker. Compra: giacche pesanti e cappotti (la gente li svende).",
          "MAGGIO-GIUGNO — Pre-estate. Altissima domanda per costumi, shorts, t-shirt, sandali, vestiti leggeri, occhiali da sole. È uno dei periodi migliori per vendere. I costumi nuovi con etichetta si vendono in ore.",
          "LUGLIO-AGOSTO — Rallentamento. La gente è in vacanza, le vendite calano. Buon momento per accumulare stock per l'autunno. Compra: pezzi autunnali e invernali in anticipo.",
          "SETTEMBRE-OTTOBRE — Ripartenza fortissima. Tutti cercano giacche, maglioni, cappotti, stivali. È il secondo picco dell'anno. Chi ha fatto scorta in estate vende tutto velocemente.",
          "NOVEMBRE-DICEMBRE — Black Friday e Natale. Domanda alta su regali (accessori luxury, capi di marca nuovi con etichette). I pezzi luxury e gli accessori hanno il picco qui. Attenzione: dopo Natale le vendite crollano per 2-3 settimane.",
          "Consiglio pratico: pubblica i tuoi annunci 4-6 settimane PRIMA della stagione di picco. Se vuoi vendere cappotti in ottobre, mettili online a fine agosto/inizio settembre. L'algoritmo di Vinted premia gli annunci che hanno già views e like quando arriva la domanda.",
        ],
      },
      {
        id: "attenzione-fisco",
        title: "⚠️ Attenzione: il Fisco e la DAC7",
        content: [
          "Questo è un argomento che molti reseller ignorano, e non dovresti. Dal 1° gennaio 2023 è in vigore la direttiva europea DAC7 (recepita in Italia con D.Lgs. n. 32/2023). Le piattaforme come Vinted sono obbligate a segnalare al Fisco i venditori che superano certe soglie.",
          "LE SOGLIE DAC7: Se in un anno superi 30 vendite OPPURE 2.000€ di incasso totale (basta uno dei due), Vinted ti chiede di compilare il formulario DAC7 con: nome, cognome, data di nascita, residenza, codice fiscale. Questi dati vengono trasmessi all'Agenzia delle Entrate. Se non compili il formulario, Vinted ti nasconde gli annunci, blocca il saldo e impedisce i trasferimenti.",
          "LA SEGNALAZIONE NON È UNA TASSA. Superare le soglie DAC7 non significa automaticamente dover pagare tasse. Significa che il Fisco verrà a conoscenza delle tue vendite e potrà verificare se la tua attività è occasionale (nessun obbligo fiscale) o abituale (obbligo di partita IVA).",
          "QUANDO SERVE LA PARTITA IVA? Secondo la Corte di Cassazione (sentenza n. 7552 del 21 marzo 2025), chi fa vendite online con regolarità e continuità può essere considerato imprenditore a fini fiscali, anche senza una struttura organizzata. I criteri chiave sono: frequenza delle vendite, acquisto di merce appositamente per rivendere, promozione attiva, e durata nel tempo.",
          "QUANDO NON SERVE? Se vendi oggetti personali usati, occasionalmente, senza organizzazione e senza scopo di lucro continuativo. In pratica: svuotare l'armadio è ok. Comprare stock per rivenderli regolarmente è attività commerciale.",
          "Vinted ha introdotto la categoria 'Seller Pro' anche in Italia: venditori con partita IVA che devono seguire regole diverse su resi, rimborsi e diritto di recesso (14 giorni). Vinted stessa può chiederti di diventare Pro se rileva segnali di attività professionale (es. molti capi nuovi con cartellino).",
          "CONSIGLIO PRATICO: se il resell diventa un'attività regolare e superi le soglie, consulta un commercialista. Non è un costo, è una protezione. Il regime forfettario in Italia permette di gestire l'attività con costi fiscali contenuti. Non ignorare questo aspetto: le multe per evasione fiscale sono molto più costose della partita IVA.",
        ],
      },
      {
        id: "errori-nicchia",
        title: "I 5 errori letali da non fare",
        content: [
          "ERRORE 1: VENDERE DI TUTTO — Il tuo profilo sembra un mercatino delle pulci digitale. Nessuno ti segue, nessuno si fida, l'algoritmo non sa come categorizzarti. Risultato: visibilità zero.",
          "ERRORE 2: PARTIRE DAL LUXURY SENZA ESPERIENZA — Se non sai autenticare, rischi: comprare falsi → rivenderli → ban permanente da Vinted → perdere tutto il capitale e l'account con le recensioni. Il luxury si affronta dopo mesi su nicchie più sicure. Punto.",
          "ERRORE 3: COPIARE I TIKTOKER — Vedi qualcuno che fa 1000€/mese con le Jordan? Probabilmente ha fonti che tu non hai, mesi di esperienza nell'autenticazione, un profilo con centinaia di recensioni, e un budget iniziale più alto del tuo. Non puoi replicare il suo risultato dal giorno uno. Costruisci il tuo percorso.",
          "ERRORE 4: IGNORARE I NUMERI — \"Mi sembra che vada bene\" non è una strategia. Devi sapere esattamente: quanto hai speso, quanto hai guadagnato, il margine per pezzo, il tempo medio di vendita, il costo delle spedizioni. Senza numeri precisi stai giocando d'azzardo. (Per questo esiste la sezione Inventario di questa app.)",
          "ERRORE 5: CAMBIARE NICCHIA OGNI SETTIMANA — Dai almeno 4-6 settimane e 10-15 pezzi venduti prima di decidere che una nicchia non funziona. Servono tempo, annunci attivi e feedback per capire se c'è potenziale reale. L'impazienza uccide più business della concorrenza.",
        ],
      },
    ],
  },
  {
    step: 2,
    title: "Dove trovare la merce",
    icon: "🔍",
    desc: "Ogni canale d'acquisto analizzato: mercatini, thrift shop, online, stock all'ingrosso. Pro, contro e prezzi reali.",
    locked: false,
    sections: [
      {
        id: "fonti-panoramica",
        title: "Le fonti — panoramica generale",
        content: [
          "La merce è il cuore del resell. Puoi essere bravo con le foto, le descrizioni e i prezzi, ma se compri i pezzi sbagliati o li paghi troppo, non guadagni. Le fonti di approvvigionamento sono il tuo vantaggio competitivo: chi ha fonti migliori guadagna di più.",
          "Esistono due macro-categorie di fonti: quelle FISICHE (mercatini, thrift shop, negozi dell'usato, Humana, svuota-cantine) e quelle ONLINE (FB Marketplace, Vinted stesso, gruppi Telegram, stock all'ingrosso). I reseller più efficaci usano un mix di entrambe.",
          "Regola fondamentale: la fonte migliore è quella che trovi nella TUA zona, a cui puoi accedere regolarmente, e dove trovi merce nella TUA nicchia a prezzi bassi. Non esiste la fonte perfetta in assoluto.",
        ],
      },
      {
        id: "mercatini-fisici",
        title: "Mercatini dell'usato e delle pulci",
        content: [
          "I mercatini fisici sono la fonte più classica per il reseller. Ogni città ha i suoi, spesso settimanali o mensili. Porta Portese a Roma (ogni domenica), Fiera di Sinigaglia a Milano (sabato sul Naviglio Grande), il Balon a Torino, la Montagnola a Bologna — sono tutti ottimi punti di partenza.",
          "PRO: Puoi toccare e ispezionare la merce prima di comprare. I prezzi sono spesso trattabili (soprattutto a fine giornata). Trovi pezzi unici che online non esistono. Il costo al pezzo è generalmente molto basso (1-10€ per capi di marca).",
          "CONTRO: Servono tempo e spostamenti fisici. La qualità è variabile — devi saper selezionare velocemente tra centinaia di pezzi. La concorrenza di altri reseller è in crescita, soprattutto nei mercatini più famosi.",
          "CONSIGLIO PRATICO: Arriva presto (i pezzi migliori vanno subito). Torna anche a fine giornata quando i venditori svendono. Fatti conoscere dai bancarellisti — se sanno cosa cerchi, ti mettono da parte i pezzi. Porta contanti piccoli per trattare.",
        ],
      },
      {
        id: "thrift-shop",
        title: "Thrift shop e Humana",
        content: [
          "I thrift shop (negozi dell'usato) e le catene come Humana People to People sono una miniera per i reseller. Humana è presente in molte città italiane e vende capi usati a prezzi bassissimi, con il ricavato che finanzia progetti umanitari.",
          "PRO: Prezzi fissi e bassi (spesso 3-15€ anche per capi di marca). Rotazione costante della merce — ogni settimana ci sono pezzi nuovi. Ambiente organizzato, più facile da esplorare dei mercatini. Alcuni fanno giornate a prezzo al chilo (1-5€/kg).",
          "CONTRO: La selezione è già fatta dal negozio, quindi i pezzi più pregiati potrebbero essere già stati tolti o prezzati più alti. Non puoi trattare sul prezzo. In alcune zone i thrift shop sono pochi o inesistenti.",
          "CONSIGLIO PRATICO: Chiedi quando arriva merce nuova e presentati quel giorno. I negozi Humana spesso hanno giorni specifici di rifornimento. Controlla sempre le etichette — tra i capi anonimi si nascondono brand di valore che il negozio non ha riconosciuto.",
        ],
      },
      {
        id: "fb-marketplace",
        title: "Facebook Marketplace e gruppi locali",
        content: [
          "FB Marketplace è una delle fonti più sottovalutate. Le persone vendono roba a prezzi ridicoli perché vogliono solo liberare spazio. Non sono reseller, non conoscono il valore reale degli oggetti.",
          "PRO: Prezzi spesso bassissimi (la gente vuole svuotare l'armadio, non fare profitto). Puoi filtrare per zona e ritirare di persona (zero spese di spedizione). Hai accesso a lotti interi ('svuoto armadio' — tutto a 20-30€). Puoi contattare direttamente il venditore e trattare.",
          "CONTRO: Serve tempo per scorrere gli annunci e separare i buoni dai cattivi. Alcuni venditori sono inaffidabili o non rispondono. Il rischio di falsi è più alto perché non c'è nessun controllo.",
          "CONSIGLIO PRATICO: Imposta le notifiche per le keyword della tua nicchia. I migliori affari vanno via in ore. Quando trovi un venditore affidabile che svuota regolarmente l'armadio, tienilo come contatto. I gruppi Facebook locali tipo 'Svuoto armadio [città]' sono spesso migliori del Marketplace generico.",
        ],
      },
      {
        id: "vinted-come-fonte",
        title: "Vinted stesso come fonte (arbitraggio)",
        content: [
          "Sì, puoi comprare su Vinted per rivendere su Vinted. Si chiama arbitraggio: trovi annunci mal fotografati, mal descritti o mal prezzati, compri il pezzo, lo presenti meglio e lo rivendi a prezzo corretto.",
          "PRO: Comodissimo, tutto da casa. Puoi cercare esattamente nella tua nicchia. Alcuni venditori non conoscono il valore di quello che vendono e prezzano troppo basso.",
          "CONTRO: I margini sono più stretti rispetto alle fonti fisiche (il venditore ha già messo un prezzo). Devi calcolare le spese di spedizione nell'acquisto E nella rivendita. Il rischio è comprare qualcosa che poi non riesci a rivendere con margine.",
          "CONSIGLIO PRATICO: Cerca annunci con foto brutte, senza brand nel titolo, descrizioni vuote. Sono quelli dove il venditore non si è impegnato e il pezzo è sottovalutato. Usa la funzione 'ricerca per immagine' (disponibile da fine 2025) per trovare pezzi simili e confrontare i prezzi.",
        ],
      },
      {
        id: "stock-ingrosso",
        title: "Stock all'ingrosso (per chi vuole scalare)",
        content: [
          "Quando vuoi passare dal resell occasionale a qualcosa di più strutturato, puoi comprare stock all'ingrosso da fornitori specializzati. Esistono aziende europee che vendono lotti di vestiti vintage e di marca selezionati apposta per i reseller.",
          "I principali fornitori nel mercato europeo sono: TAGZ (Francia, brand vintage streetwear), Vundle (Francia, box 'Reseller Vinted'), Rivintagekilo (Italia, lotti al chilo), Vinokilo (Germania, vintage al chilo). Offrono box tematiche (streetwear, polo, felpe) con pezzi già selezionati per qualità e brand.",
          "PRO: Volume costante, non devi cercare pezzo per pezzo. I pezzi sono già selezionati e in condizioni buone. Puoi specializzarti facilmente (box solo felpe Nike, solo polo Ralph Lauren, ecc.). Prezzo al pezzo più basso se compri in quantità.",
          "CONTRO: Budget iniziale più alto (le box partono da 30-50€ per 2-5 pezzi, fino a 200-500€ per lotti grandi). Non scegli i pezzi specifici — ricevi quello che c'è nel lotto. Qualità variabile tra fornitori — fai sempre un primo ordine piccolo di test.",
          "CONSIGLIO PRATICO: Inizia con una box piccola di test (sotto i 50€) per valutare la qualità del fornitore. Calcola sempre il prezzo al pezzo e confrontalo con il prezzo di vendita medio su Vinted per quei brand. Se il margine è sotto il 50%, non conviene.",
        ],
      },
      {
        id: "altre-fonti",
        title: "Altre fonti: outlet, aste, privati",
        content: [
          "OUTLET E SALDI — Comprare capi nuovi in outlet/saldi per rivenderli su Vinted come 'nuovo con etichette'. Funziona con brand specifici (Nike, Adidas, The North Face). I margini sono più stretti ma i pezzi nuovi si vendono velocissimi. Attenzione: Vinted può chiederti di passare a Seller Pro se vendi molti capi nuovi con cartellino.",
          "ASTE ONLINE — Su siti come Catawiki puoi trovare lotti di abbigliamento luxury autenticato. Prezzi variabili, ma occasionalmente ci sono affari. Servono conoscenza e budget.",
          "PRIVATI E PASSAPAROLA — Fai sapere a parenti, amici e conoscenti che compri vestiti usati di marca. Molte persone hanno l'armadio pieno e preferiscono vendere tutto a te per 50€ piuttosto che fare 20 annunci su Vinted. È una delle fonti migliori in assoluto perché la concorrenza è zero.",
          "SVUOTA-CANTINE E TRASLOCHI — Segui gli annunci locali di chi trasloca o svuota casa. Spesso vendono tutto insieme a prezzi ridicoli. Ci vuole tempo per selezionare, ma i margini possono essere enormi.",
        ],
      },
      {
        id: "errori-fonti",
        title: "Errori da evitare sulle fonti",
        content: [
          "COMPRARE TROPPO SUBITO — Al primo mercatino è facile farsi prendere dall'entusiasmo e comprare 30 pezzi. Poi ti ritrovi con stock invenduto e soldi bloccati. Inizia con 5-10 pezzi, vedi come vanno, poi scala.",
          "PAGARE TROPPO — Se paghi un capo 15€ e lo rivendi a 20€, dopo spedizione e tempo speso sei in perdita. La regola minima: il prezzo di vendita deve essere almeno il DOPPIO del prezzo d'acquisto. Meglio se 3x.",
          "AFFIDARSI A UNA SOLA FONTE — Se il tuo unico mercatino chiude o il tuo fornitore all'ingrosso alza i prezzi, sei fermo. Diversifica sempre: almeno 2-3 fonti attive.",
          "NON CALCOLARE I COSTI NASCOSTI — Benzina per andare al mercatino, spedizione per stock online, tempo speso a cercare. Tutto va calcolato nel costo reale del pezzo.",
        ],
      },
    ],
  },
  {
    step: 3,
    title: "Valutare un pezzo",
    icon: "🧠",
    desc: "Come capire in 60 secondi se un articolo vale la pena di essere comprato. Il metodo pratico.",
    locked: false,
    sections: [
      {
        id: "metodo-valutazione",
        title: "Il metodo dei 60 secondi",
        content: [
          "Quando sei al mercatino o stai scorrendo annunci online, devi decidere in fretta se un pezzo vale o no. Non hai tempo per ricerche approfondite su ogni singolo capo. Ti serve un metodo rapido e ripetibile.",
          "Il metodo è in 5 check, in quest'ordine: 1) BRAND — È un brand che si vende? 2) CONDIZIONE — In che stato è? 3) MODELLO — È un modello ricercato o generico? 4) TAGLIA — È una taglia che gira? 5) PREZZO — A quanto lo compro vs quanto posso rivenderlo?",
          "Se anche solo uno di questi check è rosso (brand sconosciuto, condizione pessima, taglia estrema, margine nullo), lascia perdere. Non comprare mai 'per scommessa'. Compra solo se tutti i check sono almeno gialli.",
        ],
      },
      {
        id: "check-brand",
        title: "Check 1 — Il brand",
        content: [
          "Non tutti i brand si rivendono. Ecco le fasce pratiche per Vinted Italia:",
          "BRAND CHE VOLANO (vendita veloce, buoni margini): Nike, Adidas, The North Face, Carhartt, Ralph Lauren, Tommy Hilfiger, Levi's, Lacoste, Champion, Dickies, Patagonia. Questi si vendono quasi sempre, a patto che il pezzo sia in buone condizioni.",
          "BRAND LUXURY (margini altissimi ma serve esperienza): Louis Vuitton, Gucci, Fendi, Prada, Moncler, Burberry, Dior, Chanel. In Italia Fendi e Gucci sono tra i luxury più venduti su Vinted. Ma il rischio falsi è altissimo — non toccarli se non sai autenticare.",
          "BRAND CHE SI VENDONO MA LENTAMENTE: Zara, H&M, Mango, Pull&Bear, ASOS. Si vendono solo a prezzi molto bassi (3-8€). I margini sono minimi, serve volume enorme. Convengono solo in lotti o bundle.",
          "BRAND DA EVITARE: Marchi sconosciuti, fast fashion cinese senza brand riconoscibile, capi senza etichetta. Se devi cercare su Google cos'è quel brand, probabilmente non si vende.",
        ],
      },
      {
        id: "check-condizione",
        title: "Check 2 — La condizione",
        content: [
          "Su Vinted le condizioni fanno una differenza enorme sul prezzo e sulla velocità di vendita. Ecco come valutare velocemente:",
          "NUOVO CON ETICHETTE — Il pezzo migliore in assoluto. Cartellino ancora attaccato, mai indossato. Si vende velocissimo e al prezzo più alto (85-95% del prezzo retail secondo le stime dei venditori esperti).",
          "OTTIME CONDIZIONI — Indossato pochissimo, nessun difetto visibile, colori vividi, nessun segno di usura. Si vende bene (70-85% del prezzo retail).",
          "BUONE CONDIZIONI — Indossato regolarmente ma ben tenuto. Piccoli segni di usura normali. Si vende (60-70%) ma devi essere onesto nella descrizione.",
          "DA EVITARE per il resell: macchie persistenti, buchi, cerniere rotte, colori sbiaditi, odore di muffa o fumo. Il costo di riparazione/pulizia spesso supera il margine. Fanno eccezione i pezzi luxury o molto rari dove anche in condizioni medie mantengono valore.",
          "TEST RAPIDO al mercatino: controlla collo, ascelle e polsini (primi punti di usura). Annusa il capo (muffa e fumo sono quasi impossibili da togliere). Controlla cuciture e cerniere. Guarda il colore: se è sbiadito in modo irregolare, lascia stare.",
        ],
      },
      {
        id: "check-modello",
        title: "Check 3 — Il modello",
        content: [
          "Non tutti i capi dello stesso brand hanno lo stesso valore. Una felpa Nike basica vale 10-15€. Una felpa Nike vintage con logo grande anni '90 vale 30-50€. Stessa marca, valore completamente diverso.",
          "MODELLI CHE SI VENDONO BENE: pezzi con logo visibile e riconoscibile, modelli iconici (Levi's 501, Nike Air Force 1, TNF Nuptse), pezzi vintage (anni 80-90-2000), edizioni limitate o collaborazioni, capi con design distintivo.",
          "MODELLI CHE FATICANO: capi basici senza elementi riconoscibili, t-shirt o polo generiche anche se di marca, capi troppo classici/formali (giacche da ufficio, camicie da cerimonia), taglie o colori impopolari.",
          "TREND ATTUALE (2025-2026): il vintage sportswear anni 90 e Y2K è fortissimo. Felpe con logo grande, giacche a vento, pile, puffer. Le magliette da calcio vintage stanno avendo un boom. Il 'gorpcore' (moda outdoor) spinge Gore-Tex, Salomon, Arc'teryx vintage. Il trend 'archival' sta riportando in auge pezzi anni 80 e stile pin-up/pois.",
        ],
      },
      {
        id: "check-taglia",
        title: "Check 4 — La taglia",
        content: [
          "Le taglie più vendute su Vinted Italia sono S, M e L per l'abbigliamento, 38-43 per le scarpe. Le taglie estreme (XXS, XXL+) hanno un mercato molto più piccolo, ma anche meno concorrenza.",
          "Per la categoria DONNA: le taglie S e M sono le più richieste. La taglia L si vende bene. XS e XL+ si vendono più lentamente ma con meno concorrenza.",
          "Per la categoria UOMO: M e L dominano. La taglia S uomo è più difficile da piazzare. XL si vende bene per capi oversize/streetwear.",
          "Per ACCESSORI: la taglia 'Unica' è perfetta — cinture, sciarpe, borse, cappelli non hanno il problema taglia. È uno dei motivi per cui gli accessori sono una nicchia così attraente.",
          "ATTENZIONE al vintage: le taglie vintage spesso vestono diversamente da quelle moderne. Una L vintage può vestire come una M moderna. Indica sempre le misure in centimetri nella descrizione — questo riduce i resi e aumenta la fiducia.",
        ],
      },
      {
        id: "check-prezzo",
        title: "Check 5 — Il calcolo del margine",
        content: [
          "Il check finale e più importante: quanto ci guadagno?",
          "La formula è semplice: MARGINE = Prezzo di vendita stimato - Costo d'acquisto - Spese di spedizione (se le hai sostenute per comprare). Il margine deve essere almeno il 100% del costo d'acquisto (cioè rivendi al doppio). Idealmente 150-200%+.",
          "Per stimare il prezzo di vendita: vai su Vinted, cerca lo stesso articolo (o molto simile), filtra per 'venduto', guarda i prezzi degli ultimi venduti. Quella è la realtà del mercato, non quello che vorresti guadagnare.",
          "ESEMPIO PRATICO: Trovi una felpa The North Face al mercatino a 5€. Su Vinted le felpe TNF simili vendute di recente vanno a 25-35€. Margine: 25€ - 5€ = 20€. ROI: 400%. Questo è un buon affare.",
          "ESEMPIO DI TRAPPOLA: Trovi una giacca Zara 'carina' a 8€. Su Vinted le giacche Zara simili si vendono a 10-12€. Margine: 3€ massimo. Non ne vale la pena per il tempo che ci metterai a fotografare, pubblicare e spedire.",
          "Regola d'oro: se non riesci a stimare il prezzo di vendita in meno di 1 minuto (una ricerca veloce su Vinted), probabilmente quel pezzo non è nella tua nicchia e non dovresti comprarlo.",
        ],
      },
      {
        id: "autenticazione-base",
        title: "Autenticazione — le basi",
        content: [
          "Se lavori con brand di valore (Nike, Adidas, e soprattutto luxury), devi saper riconoscere i falsi. Su Vinted vendere falsi porta al BAN PERMANENTE dell'account.",
          "CONTROLLI UNIVERSALI (valgono per tutti i brand): 1) Qualità delle cuciture — devono essere dritte, regolari, senza fili sporgenti. 2) Etichette — font preciso, nessun errore ortografico, lavaggio ben stampato. 3) Materiale — i falsi usano tessuti più sottili e scadenti, si sente al tatto. 4) Simmetria — loghi, stampe e pattern devono essere allineati perfettamente.",
          "PER IL LUXURY: controlla serial number (Gucci ha 6+4 cifre), dustbag e box originali (aumentano il valore), cartellini di autenticità. In caso di dubbio, non comprare. Un pezzo falso luxury comprato a 100€ è una perdita totale più il rischio ban.",
          "RISORSE UTILI: i video YouTube di autenticazione specifici per brand sono la miglior risorsa gratuita. Cerca '[brand] real vs fake' o '[brand] authentication guide'. Per il luxury, esistono servizi di autenticazione a pagamento (Legit Check, Entrupy) — un investimento che può salvarti centinaia di euro.",
          "REGOLA D'ORO: se il prezzo è troppo bello per essere vero, probabilmente è un falso. Una borsa Gucci 'originale' a 30€ non esiste. Mai.",
        ],
      },
    ],
  },
  {
    step: 4,
    title: "Preparare il prodotto",
    icon: "✨",
    desc: "Come trasformare un capo comprato a 5€ in un prodotto che sembra valerne 30. Pulizia, presentazione, cura.",
    locked: false,
    sections: [
      {
        id: "perche-preparare",
        title: "Perché la preparazione fa la differenza",
        content: [
          "Un capo comprato al mercatino per 5€, sporco, spiegazzato e con odore di cantina vale 5€ anche nella mente dell'acquirente. Lo stesso capo, lavato, stirato, profumato e ben presentato vale 25-35€. La preparazione è dove si crea il valore percepito.",
          "Il tempo che investi nella preparazione è il tempo meglio speso nel resell. 15 minuti di lavoro su ogni pezzo possono significare 10-20€ in più di margine. Nessun'altra attività nel resell ha un ritorno così alto per minuto investito.",
        ],
      },
      {
        id: "lavaggio",
        title: "Il lavaggio corretto",
        content: [
          "PRIMA DI TUTTO: leggi SEMPRE l'etichetta di lavaggio. Non rovinare un capo da 30€ con un lavaggio sbagliato.",
          "REGOLA GENERALE: lava a 30°C con detersivo delicato. Usa un sacchetto a rete per capi delicati (si trovano a 1-2€). Evita l'asciugatrice per capi di valore — asciuga all'aria.",
          "ODORI PERSISTENTI: per muffa o fumo, aggiungi mezza tazza di aceto bianco nel lavaggio o usa bicarbonato in ammollo (1 ora in acqua tiepida con 2 cucchiai di bicarbonato). Se dopo 2 lavaggi l'odore resta, il capo non è vendibile — non provare a mascherarlo con profumo.",
          "MACCHIE: prova con sapone di Marsiglia direttamente sulla macchia prima del lavaggio. Per macchie ostinate, valuta se il costo della pulizia professionale (lavanderia) è giustificato dal margine. Se una macchia non viene via, devi fotografarla e dichiararla nell'annuncio.",
          "PILLING (palline di tessuto): usa un levapelucchi elettrico (5-10€, investimento essenziale). Trasforma un maglione che sembra vecchio in uno che sembra quasi nuovo. È lo strumento con il miglior ROI nel kit del reseller.",
        ],
      },
      {
        id: "stiratura",
        title: "Stiratura e presentazione",
        content: [
          "Un capo stirato si vende di più e a un prezzo più alto. Punto. Non ci sono scorciatoie su questo.",
          "Per CAMICIE E PANTALONI: stira classico, con attenzione a collo e polsini. Per FELPE E T-SHIRT: un ferro a vapore o un vaporizzatore verticale è più veloce e sicuro (non rischi di bruciare le stampe). Per GIACCHE E CAPPOTTI: appendili in bagno durante una doccia calda — il vapore toglie le grinze senza ferro.",
          "NON stirare MAI direttamente su stampe, loghi o applicazioni — usa un panno in mezzo o stira al rovescio.",
          "Dopo la stiratura, piega il capo con cura o appendilo su una gruccia imbottita. Conservalo in un luogo asciutto e pulito fino al momento delle foto. Un capo ben conservato mantiene la sua presentazione.",
        ],
      },
      {
        id: "riparazioni",
        title: "Piccole riparazioni che aumentano il valore",
        content: [
          "Alcune riparazioni semplici possono trasformare un pezzo invendibile in un pezzo vendibile:",
          "BOTTONI MANCANTI — Riattaccarli costa 2 minuti e un filo. Se il bottone è perso, cerca un bottone simile (i negozi di merceria vendono bottoni a pochi centesimi). Un bottone mancante fa scendere il valore percepito in modo sproporzionato.",
          "CUCITURE SCUCITE — Un punto di cucitura a mano su una cucitura aperta richiede 5 minuti. Se non sai cucire, impara le basi con un video YouTube — è un'abilità che ti farà risparmiare decine di euro.",
          "CERNIERE CHE SI INCEPPANO — Spesso basta una candela di cera o un po' di sapone sui denti della cerniera per farla scorrere di nuovo. Se la cerniera è rotta, valuta il costo della sostituzione in sartoria (5-15€) vs il margine del pezzo.",
          "Regola: se la riparazione costa più del 20% del prezzo di vendita previsto, non conviene. Rivendi il pezzo a prezzo più basso dichiarando il difetto, oppure non comprarlo affatto.",
        ],
      },
      {
        id: "kit-reseller",
        title: "Il kit essenziale del reseller",
        content: [
          "Investimento iniziale di circa 20-40€ che si ripaga in pochi pezzi venduti:",
          "LEVAPELUCCHI ELETTRICO (5-10€) — Indispensabile. Rimuove il pilling e rinfresca maglioni e felpe. Un maglione 'depillato' sembra quasi nuovo.",
          "RULLO ADESIVO LEVAPELUCCHI (2€) — Per peli, capelli e polvere prima delle foto. Veloce e efficace.",
          "SACCHETTI A RETE PER LAVAGGIO (3-5€) — Proteggono i capi delicati in lavatrice.",
          "FERRO DA STIRO O VAPORIZZATORE (se non ce l'hai già) — Un vaporizzatore verticale (15-25€) è più veloce del ferro tradizionale per il volume di capi che tratti.",
          "GRUCCE DECENTI (5-10€ per un set) — Per appendere i capi dopo la preparazione e per le foto. Grucce in legno o velluto, non quelle sottili di metallo della lavanderia.",
          "METRO DA SARTA (1-2€) — Per misurare i capi e indicare le misure in cm nell'annuncio. Riduce i resi.",
        ],
      },
    ],
  },
  {
    step: 5,
    title: "Fotografare per vendere",
    icon: "📸",
    desc: "Le foto vendono più della descrizione. Setup, luce, angolazioni, errori da evitare — con lo smartphone che hai già.",
    locked: false,
    sections: [
      {
        id: "perche-foto",
        title: "Perché le foto sono tutto",
        content: [
          "Su Vinted l'acquirente scorre centinaia di annunci. La decisione di cliccare sul tuo avviene in meno di 2 secondi, basata quasi esclusivamente sulla prima foto. Se la prima foto non cattura l'attenzione, il resto dell'annuncio non esiste.",
          "Vinted permette di caricare fino a 20 foto per annuncio. Gli annunci con 4 o più foto si vendono significativamente più velocemente di quelli con 1-2 foto. Più foto = più fiducia = vendita più rapida.",
          "Non serve una fotocamera professionale. Uno smartphone moderno con una buona fotocamera è più che sufficiente. Quello che serve è sapere COME fotografare, non CON COSA.",
        ],
      },
      {
        id: "setup-luce",
        title: "Setup e luce — il minimo indispensabile",
        content: [
          "LUCE NATURALE: è la tua migliore amica e costa zero. Scatta vicino a una grande finestra durante il giorno, mai con luce diretta del sole (crea ombre dure). Il momento migliore è la mattina o il tardo pomeriggio con luce diffusa. Se la luce è troppo forte, metti un lenzuolo bianco alla finestra come diffusore.",
          "SFONDO: bianco, beige o grigio chiaro. Nient'altro. Lo sfondo deve far risaltare il capo, non distrarre. Un lenzuolo bianco steso sul muro o un angolo di parete pulito funzionano perfettamente. Evita sfondi colorati, pattern, o ambienti disordinati.",
          "NIENTE FILTRI: Vinted stesso consiglia di evitare filtri e editing pesante. I colori devono essere reali — un acquirente che riceve un capo di colore diverso da quello in foto fa reso e ti lascia una recensione negativa. Al massimo, alza leggermente la luminosità se la foto è venuta scura.",
          "PULISCI L'OBIETTIVO: sembra banale ma il 50% delle foto sfocate su Vinted sono causate da un obiettivo dello smartphone sporco. Puliscilo con un panno morbido prima di ogni sessione di foto.",
        ],
      },
      {
        id: "cosa-fotografare",
        title: "Le foto obbligatorie per ogni annuncio",
        content: [
          "FOTO 1 — VISTA COMPLETA (la più importante): Il capo intero, possibilmente indossato o su gruccia. Questa è la foto che appare nei risultati di ricerca. Deve mostrare il taglio, il colore e lo stile in modo chiaro e immediato. Niente collage, niente inquadrature strane. Semplice e chiaro.",
          "FOTO 2 — RETRO: Il capo girato. Mostra la schiena, eventuali dettagli posteriori.",
          "FOTO 3-4 — DETTAGLI BRAND: Etichetta con brand e taglia. Logo o stampa ravvicinata. Questi dettagli danno sicurezza sull'autenticità e permettono all'acquirente di verificare marca e taglia senza chiederti.",
          "FOTO 5-6 — DETTAGLI MATERIALE: Texture del tessuto da vicino. Cuciture. Cerniere. Bottoni. Mostrano la qualità del capo.",
          "FOTO 7+ — DIFETTI (se presenti): Se c'è una macchia, un segno di usura, un bottone allentato — fotografalo chiaramente. Nascondere i difetti porta a resi, dispute e recensioni negative. Essere trasparenti costruisce fiducia e a lungo termine vendi di più.",
          "FOTO BONUS — INDOSSATO: Se puoi, fai una foto del capo indossato (anche solo su un manichino o su di te tagliando la testa). Aiuta l'acquirente a capire come veste nella realtà. I capi fotografati indossati si vendono meglio.",
        ],
      },
      {
        id: "errori-foto",
        title: "Gli errori fotografici che uccidono le vendite",
        content: [
          "FOTO SCURE — Se si fa fatica a distinguere il colore e i dettagli, l'acquirente scrolla via. Scatta sempre con abbondante luce naturale.",
          "SFONDO DISORDINATO — Letto disfatto, pile di vestiti, gatti sullo sfondo. Distraggono e danno un'impressione poco professionale. Sfondo neutro e pulito, sempre.",
          "CAPO SPIEGAZZATO — Se il capo non è stirato, in foto sembra usato e maltrattato, anche se è in ottime condizioni. Stira PRIMA di fotografare.",
          "PRIMA FOTO = ETICHETTA — L'errore più comune. Mettere l'etichetta come prima foto è inutile: nella griglia di risultati non si capisce cos'è il prodotto. La prima foto deve mostrare il capo intero.",
          "COLLAGE — Vinted sconsiglia i collage. Ogni foto deve mostrare una cosa sola, chiara. I collage rimpiccioliscono tutto e non si vede niente.",
          "FOTO ALLO SPECCHIO — Evitale. Il riflesso, l'ambiente intorno e la posa rendono la foto poco professionale. Usa il timer della fotocamera o chiedi a qualcuno di scattare.",
        ],
      },
      {
        id: "trucchi-foto",
        title: "Trucchi da reseller esperto",
        content: [
          "COERENZA VISIVA: Usa sempre lo stesso setup (stessa parete, stessa luce, stesso stile). Il tuo profilo Vinted avrà un aspetto professionale e coerente, come un vero negozio. Questo fa salire la fiducia e i follower.",
          "SESSIONI DI FOTO: Non fotografare un pezzo alla volta. Prepara 5-10 capi, monta il setup, e fotografa tutto in una sessione. Risparmi tempo enormemente.",
          "FLAT LAY PER ACCESSORI: Cinture, portafogli, sciarpe, occhiali — distendili su una superficie piana bianca e fotografa dall'alto. Per accessori piccoli funziona meglio dell'appendiabiti.",
          "ORARIO DI SCATTO: La luce migliore in Italia è tra le 10:00-11:00 e le 15:00-16:00 (varia per stagione). Evita le ore centrali con luce diretta troppo forte e la sera con luce artificiale gialla.",
        ],
      },
    ],
  },
  {
    step: 6,
    title: "Creare l'annuncio perfetto",
    icon: "📝",
    desc: "Titolo, descrizione, prezzo, categorie, hashtag. Come funziona l'algoritmo di Vinted e come sfruttarlo.",
    locked: false,
    sections: [
      {
        id: "algoritmo-vinted",
        title: "Come funziona l'algoritmo di Vinted",
        content: [
          "Vinted non svela il suo algoritmo, ma dalle osservazioni dei venditori esperti sappiamo che usa due sistemi: un algoritmo di RACCOMANDAZIONE (sceglie quali annunci mostrare a ogni utente in base ai suoi interessi) e uno di POSIZIONAMENTO (ordina gli annunci per rilevanza nei risultati di ricerca).",
          "L'algoritmo osserva come ogni utente interagisce: cosa visualizza, cosa mette nei preferiti, cosa compra, quali brand segue. In base a questo, personalizza il feed di ogni acquirente.",
          "Fattori che l'algoritmo PREMIA: attività costante del profilo (caricamenti regolari, risposte rapide, accessi frequenti), qualità dell'annuncio (foto nitide, titoli completi, descrizioni accurate), prezzi realistici (articoli fuori mercato vengono mostrati meno), velocità di spedizione e buone recensioni.",
          "Fattori che PENALIZZANO: profili inattivi, annunci con foto scure o sfocate, tasso alto di annullamento vendite, recensioni negative, prezzi irrealistici.",
          "Un dato importante: Vinted dà visibilità anche a chi ha pochi follower (a differenza di Depop che favorisce i profili grossi). Questo significa che anche un principiante con annunci ben fatti può vendere subito.",
        ],
      },
      {
        id: "titolo-annuncio",
        title: "Il titolo — come farsi trovare",
        content: [
          "Il titolo è il campo più importante per la ricerca. Gli acquirenti cercano per parole chiave, e il titolo è il primo posto dove Vinted cerca corrispondenze.",
          "FORMULA DEL TITOLO PERFETTO: [Brand] + [Tipo di capo] + [Dettaglio chiave] + [Taglia]. Esempio: 'The North Face Puffer Jacket 700 Nuptse Taglia L' oppure 'Levi's 501 Jeans Vintage W32 L34' oppure 'Ralph Lauren Polo Logo Uomo M'.",
          "Includi SEMPRE: il nome del brand (scritto correttamente), il tipo di capo (felpa, giacca, jeans, polo), la taglia. Se lo spazio lo permette, aggiungi colore, materiale o modello specifico.",
          "NON mettere nel titolo: frasi tipo 'Bellissimo!!!', 'Affare!!!', 'Guarda!!!' — non sono keyword di ricerca e sprecano spazio. Non mettere il prezzo nel titolo. Non scrivere tutto in maiuscolo.",
          "Vinted traduce automaticamente i titoli per gli acquirenti esteri. Scrivi in modo chiaro e preciso in italiano — sarà comprensibile anche dopo la traduzione.",
        ],
      },
      {
        id: "descrizione-annuncio",
        title: "La descrizione — vendere con le parole",
        content: [
          "La descrizione ha due obiettivi: dare all'acquirente tutte le informazioni per decidere SENZA chiederti nulla in chat, e contenere keyword aggiuntive per la ricerca.",
          "STRUTTURA CONSIGLIATA: 1) Cosa è (brand, modello, tipo). 2) Condizioni reali (eventuali difetti dichiarati chiaramente). 3) Taglia + misure in centimetri (petto, lunghezza, spalle — misurate col metro da sarta). 4) Materiale (se indicato in etichetta). 5) Note aggiuntive (vestibilità, styling, occasione d'uso).",
          "Le MISURE IN CM sono fondamentali: le taglie variano tra brand e tra epoche (un M vintage può vestire come un S moderno). Indicando le misure reali riduci drasticamente i resi e aumenti la fiducia. Misura almeno: larghezza petto, lunghezza totale. Per pantaloni: vita e cavallo.",
          "Sii ONESTO sui difetti. Se c'è una macchia, scrivilo. Se il colore è sbiadito, dillo. L'onestà ti protegge da dispute e costruisce una reputazione solida. I venditori con descrizioni oneste e complete ricevono meno messaggi, meno resi e più acquisti diretti.",
          "KEYWORD nella descrizione: aggiungi termini di ricerca naturali che l'acquirente potrebbe usare. 'Stile vintage', 'Y2K', 'streetwear', 'oversize fit', 'gore-tex' — ma solo se pertinenti al capo. Non fare keyword stuffing con brand che non c'entrano.",
        ],
      },
      {
        id: "prezzo-strategia",
        title: "La strategia del prezzo",
        content: [
          "Il prezzo è il fattore decisivo. Un annuncio perfetto con un prezzo sbagliato non vende. Ecco il metodo:",
          "STEP 1 — RICERCA: Cerca su Vinted articoli identici o molto simili. Filtra per 'venduto'. Guarda gli ultimi 5-10 venduti: quello è il prezzo reale di mercato, non quello che i venditori chiedono. Il prezzo che vedi sugli annunci attivi è il prezzo CHE NON HA FUNZIONATO (altrimenti sarebbero già venduti).",
          "STEP 2 — POSIZIONAMENTO: Mettiti nella fascia media-bassa dei venduti. Se articoli simili si sono venduti tra 20€ e 35€, parti da 25-28€. Un prezzo competitivo vende veloce. La velocità è più importante del margine extra — i soldi fermi in merce invenduta non sono guadagno.",
          "STEP 3 — MARGINE DI TRATTATIVA: Aggiungi un 10-15% al prezzo che vuoi ottenere. Su Vinted la trattativa è la norma — quasi tutti fanno offerte più basse. Se vuoi ottenere 25€, metti 28-29€. Così quando l'acquirente offre 25€, accetti contento.",
          "REGOLA DEI 3 LIVELLI per orientarti: Stato 'nuovo con cartellino' = 85-95% del prezzo retail. Stato 'molto buono' = 70-85%. Stato 'buone condizioni' = 60-70%.",
          "ERRORE CRITICO: non confrontarti con il prezzo retail del capo. Un maglione che costava 80€ nuovo in negozio NON vale 80€ su Vinted. Vale quello che gli acquirenti di Vinted sono disposti a pagare. Il mercato decide, non il cartellino originale.",
        ],
      },
      {
        id: "quando-pubblicare",
        title: "Quando pubblicare l'annuncio",
        content: [
          "L'orario di pubblicazione conta. Quando pubblichi, l'annuncio è 'nuovo' e riceve un piccolo boost di visibilità dall'algoritmo. Vuoi che quel boost arrivi quando ci sono più utenti online.",
          "ORARI MIGLIORI: la fascia serale tra le 20:00 e le 22:00 è quella con più utenti attivi su Vinted. La domenica mattina e il lunedì sera sono giorni forti. Il martedì, giovedì e sabato mostrano picchi costanti.",
          "ORARI DA EVITARE: le prime ore del mattino (6-9), l'ora di pranzo dei giorni lavorativi, e la tarda notte. Poche persone navigano su Vinted in quei momenti.",
          "CONSIGLIO PRATICO: prepara gli annunci (foto, titolo, descrizione) durante il giorno ma NON pubblicarli subito. Salvali come bozza e pubblicali la sera. Così sfrutti il boost iniziale nel momento di massima visibilità.",
          "STAGIONALITÀ DI PUBBLICAZIONE: pubblica gli annunci 4-6 settimane prima della stagione di picco. Cappotti e giacche ad agosto/settembre. Costumi e capi estivi a marzo/aprile. L'algoritmo premia gli annunci che hanno già views e preferiti quando arriva la domanda.",
        ],
      },
      {
        id: "hashtag-categorie",
        title: "Hashtag e categorie",
        content: [
          "Gli hashtag su Vinted non funzionano come su Instagram — non hanno una pagina dedicata. Ma possono migliorare la visibilità nelle ricerche perché aggiungono keyword indicizzabili.",
          "Usa 3-5 hashtag pertinenti alla fine della descrizione. Esempi: #vintage #streetwear #nike #y2k #oversize. Non esagerare con 20 hashtag — è spam e non aggiunge valore.",
          "Un trucco usato dai reseller esperti: creare un hashtag personale con il tuo username (es. #tuonome_shop) così che chi clicca trovi tutti i tuoi articoli raggruppati. Utile per chi vuole fare bundle.",
          "CATEGORIE: scegli la categoria e sottocategoria corretta su Vinted. Un articolo nella categoria sbagliata non appare nelle ricerche filtrate. Se vendi una felpa con cappuccio, mettila in 'Felpe con cappuccio', non in 'Maglieria' generica.",
          "BRAND: seleziona sempre il brand corretto dal menu Vinted. Se il brand non è nel database, scrivilo manualmente. Un annuncio senza brand selezionato perde una grossa fetta di visibilità perché molti acquirenti filtrano per brand.",
        ],
      },
      {
        id: "errori-annuncio",
        title: "Errori che ammazzano l'annuncio",
        content: [
          "DESCRIZIONE VUOTA O MINIMA — 'Felpa nike taglia M' e basta. Zero misure, zero dettagli, zero condizioni. L'acquirente non ha le informazioni per comprare e scrolla via (o ti scrive in chat, e molti non hanno voglia).",
          "PREZZO FUORI MERCATO — Un capo Zara usato a 25€ non lo compra nessuno. Fai la ricerca di mercato prima di mettere il prezzo.",
          "CATEGORIA SBAGLIATA — Un paio di scarpe messo in 'Accessori'. Un cappotto messo in 'Altro'. L'annuncio diventa invisibile per chi usa i filtri.",
          "NON RISPONDERE AI MESSAGGI — L'algoritmo premia chi risponde velocemente. Se un acquirente ti scrive e non rispondi per giorni, perdi la vendita e il profilo perde visibilità. Rispondi entro poche ore, idealmente entro l'ora.",
          "ANNUNCI DUPLICATI — Caricare lo stesso articolo più volte sperando in più visibilità. Vinted lo rileva e può penalizzarti. Un annuncio per articolo, ben fatto.",
        ],
      },
    ],
  },
  {
    step: 7,
    title: "Gestire gli annunci",
    icon: "🔄",
    desc: "Rilanciare, modificare il prezzo, boost a pagamento, quando togliere un annuncio. Come tenere vivo il tuo armadio.",
    locked: false,
    sections: [
      {
        id: "annunci-attivi",
        title: "Tenere gli annunci vivi",
        content: [
          "Un annuncio pubblicato e dimenticato muore. L'algoritmo di Vinted premia gli annunci aggiornati e i profili attivi. Se non tocchi un annuncio per settimane, finisce in fondo ai risultati di ricerca.",
          "REGOLA BASE: accedi a Vinted almeno una volta al giorno. Rispondi ai messaggi velocemente. Carica nuovi articoli regolarmente (anche 1-2 a settimana). L'algoritmo interpreta l'attività costante come un segnale di affidabilità e ti premia con più visibilità.",
          "Un armadio pieno di annunci attivi riceve più visite di uno con 3 pezzi. Più annunci hai, più probabilità che qualcuno entri nel tuo profilo, veda più cose e compri (magari un bundle). Punta ad avere almeno 15-20 annunci attivi contemporaneamente.",
        ],
      },
      {
        id: "rilanciare",
        title: "Quando e come rilanciare un annuncio",
        content: [
          "Se un annuncio è online da più di 2-3 settimane senza vendere, ha bisogno di un rilancio. Ecco le tecniche, dalla più leggera alla più aggressiva:",
          "LIVELLO 1 — AGGIORNA: Cambia la foto di copertina (mettine una diversa come prima foto). Modifica leggermente il titolo (aggiungi un dettaglio: colore, materiale). Ritocca la descrizione. Anche piccole modifiche segnalano all'algoritmo che l'annuncio è 'fresco'.",
          "LIVELLO 2 — RIBASSA IL PREZZO: Abbassa di 1-2€. Vinted invia una notifica automatica a tutti quelli che hanno messo l'annuncio nei preferiti. È il modo più diretto per stimolare un acquisto. Funziona molto bene su annunci con molti preferiti ma nessun acquisto.",
          "LIVELLO 3 — RIPUBBLICA: Se dopo 4-6 settimane l'annuncio non si muove nonostante aggiornamenti e ribassi, eliminalo e ricrealo da zero con foto nuove, titolo diverso e prezzo rivisto. Un annuncio nuovo riceve il boost iniziale dell'algoritmo.",
          "ATTENZIONE: non ripubblicare lo stesso annuncio ogni 3 giorni — Vinted lo rileva come spam e può penalizzarti. Usa il livello 3 solo quando il livello 1 e 2 non hanno funzionato.",
        ],
      },
      {
        id: "boost-vetrina",
        title: "Boost e Vetrina — vale la pena pagare?",
        content: [
          "Vinted offre due servizi a pagamento: il BOOST (promuove un singolo annuncio nei risultati di ricerca) e la VETRINA (promuove il tuo intero profilo a utenti mirati).",
          "BOOST: costa circa 1,15€ per 3 giorni (locale) o 1,75€ per 7 giorni. L'annuncio appare più in alto nei risultati. Vale la pena SOLO su articoli con buon margine (almeno 15-20€ di profitto previsto) e con foto/descrizione già ottimizzate. Boostare un annuncio con foto brutte è buttare soldi.",
          "VETRINA: mostra i tuoi annunci a utenti che hanno più probabilità di comprare. Ha senso solo se hai un profilo coerente e un armadio ben fornito (almeno 20+ annunci attivi con foto professionali). Per un principiante con 5 annunci, non vale la pena.",
          "REGOLA PRATICA: il boost singolo su 7 giorni dà risultati migliori di quello su 3 giorni, soprattutto per articoli stagionali con alta ricerca. Non boostare articoli sotto i 10€ di prezzo — il costo del boost mangia il margine.",
        ],
      },
      {
        id: "stock-morto",
        title: "Gestire lo stock morto",
        content: [
          "Lo stock morto è la merce che non si vende da più di 30-60 giorni. È il nemico del reseller perché blocca il capitale: quei soldi potevano essere investiti in merce che gira.",
          "COME IDENTIFICARLO: Se un articolo ha poche views e zero preferiti dopo 3-4 settimane, il problema è la visibilità (foto, titolo, prezzo). Se ha molte views e preferiti ma nessun acquisto, il problema è il prezzo (troppo alto per quello che offri).",
          "SOLUZIONI: 1) Ribassa aggressivamente — meglio vendere a margine ridotto che tenere il pezzo fermo. 2) Crea un BUNDLE — raggruppa 2-3 pezzi lenti in un lotto a prezzo conveniente ('3 felpe M a 25€'). I bundle sbloccano merce che da sola non si muove. 3) Cambia piattaforma — se su Vinted non si muove, prova Wallapop, Subito o FB Marketplace. 4) Ultima spiaggia: dona o regala. Non tenere stock morto per mesi sperando che si venda 'prima o poi'.",
          "PREVENZIONE: il miglior modo per evitare stock morto è comprare bene (Passo 3). Se applichi il metodo dei 60 secondi prima di ogni acquisto, il tuo tasso di invenduto sarà molto più basso.",
        ],
      },
      {
        id: "sconti-automatici",
        title: "Sconti automatici e offerte",
        content: [
          "Vinted permette di impostare sconti automatici su acquisti multipli. Attivali SEMPRE. Uno sconto del 5-10% su 2+ articoli incentiva i bundle e aumenta lo scontrino medio. Scrivi nella descrizione di ogni annuncio che hai lo sconto attivo su più pezzi.",
          "Puoi anche inviare OFFERTE PERSONALIZZATE agli utenti che hanno messo nei preferiti i tuoi articoli. Aspetta 2-3 giorni dopo che hanno messo il cuore, poi invia un'offerta con uno sconto del 10-15%. Funziona molto bene — il cuore dice 'mi interessa', l'offerta dice 'ora o mai più'.",
          "Le offerte funzionano meglio il venerdì sera e nel weekend, quando le persone hanno tempo per navigare e comprare.",
        ],
      },
    ],
  },
  {
    step: 8,
    title: "Gestire i compratori",
    icon: "💬",
    desc: "Messaggi, trattative, offerte basse, come rispondere per chiudere la vendita e costruire reputazione.",
    locked: false,
    sections: [
      {
        id: "risposte-veloci",
        title: "Rispondi veloce — sempre",
        content: [
          "La velocità di risposta è uno dei fattori più importanti su Vinted. Un acquirente interessato che ti scrive e non riceve risposta per ore, nel frattempo compra da qualcun altro. Su Vinted la concorrenza è a un click di distanza.",
          "Obiettivo: rispondi entro 1 ora ai messaggi, idealmente in minuti. Attiva le notifiche push dell'app. Se non puoi rispondere subito nel dettaglio, manda almeno un messaggio rapido ('Ciao, ti rispondo nel dettaglio tra poco!') per far capire che sei presente.",
          "L'algoritmo di Vinted premia i venditori che rispondono velocemente — profili con tempi di risposta brevi ricevono più visibilità. Vinted mostra anche il tuo tempo medio di risposta sul profilo: un 'risponde entro poche ore' è molto meglio di 'risponde entro giorni'.",
        ],
      },
      {
        id: "trattative",
        title: "Come gestire le trattative",
        content: [
          "Su Vinted la trattativa è la norma. Quasi tutti fanno offerte più basse del prezzo di listino. Non prenderla sul personale — è parte del gioco.",
          "OFFERTE RAGIONEVOLI (10-20% sotto il prezzo): Accetta o fai una controfferta a metà strada. Se hai impostato il prezzo con il margine di trattativa del 10-15% (come suggerito nel Passo 6), queste offerte rientrano nel tuo obiettivo. Chiudi la vendita senza tirare troppo la corda.",
          "OFFERTE BASSE (30-50% sotto il prezzo): Rispondi con cortesia ma fermezza. 'Grazie per l'interesse! Il prezzo minimo a cui posso scendere è [X]€. Fammi sapere!' Non ignorare — una risposta educata a un'offerta bassa può trasformarsi in una vendita a prezzo giusto.",
          "OFFERTE RIDICOLE (70-80% sotto il prezzo): Un breve 'Ciao, il prezzo indicato è già competitivo, non posso scendere così tanto. Grazie!' è sufficiente. Non sprecare energia su chi non vuole pagare il valore reale.",
          "TRUCCO: quando fai una controfferta, aggiungi un piccolo incentivo — 'Posso scendere a 22€ e spedisco entro domani!' La velocità di spedizione è un valore aggiunto che può far decidere l'acquirente.",
        ],
      },
      {
        id: "domande-frequenti",
        title: "Le domande che riceverai (e come rispondere)",
        content: [
          "'COME VESTE?' — Se hai messo le misure in cm nella descrizione (come suggerito nel Passo 6), rimanda alle misure. Se non le hai messe, misura il capo e rispondi con i cm esatti. Aggiungi le misure anche nell'annuncio per i futuri acquirenti.",
          "'È ORIGINALE?' — Rispondi con sicurezza se lo è, e offri prove: 'Sì, originale al 100%. Ho fotografato l'etichetta interna, il serial number e i dettagli delle cuciture nelle foto dell'annuncio.' Se hai la ricevuta d'acquisto originale, menzionalo.",
          "'PUOI FARE UNO SCONTO?' — Tratta come descritto sopra. Non cedere subito al primo messaggio — dai l'impressione che il prezzo fosse gonfiato. Fai una controfferta ragionata.",
          "'FAI SCAMBIO?' — Gli scambi su Vinted sono rischiosi (nessuna protezione acquisti) e complicati. Come reseller, il tuo obiettivo è guadagnare, non accumulare altra merce. Rispondi: 'Al momento preferisco la vendita, grazie!'",
          "'PERCHÉ VENDI?' — Domanda comune soprattutto su capi nuovi o di marca. Rispondi in modo onesto e naturale: 'Taglia sbagliata', 'Regalo non gradito', 'Non lo uso più'. Una risposta convincente toglie il dubbio sulla qualità.",
        ],
      },
      {
        id: "costruire-reputazione",
        title: "Costruire una reputazione solida",
        content: [
          "Su Vinted la reputazione è tutto. Un profilo con 50 recensioni a 5 stelle vende il doppio di un profilo con 3 recensioni. Ogni vendita è un'opportunità per costruire fiducia.",
          "COME OTTENERE RECENSIONI POSITIVE: 1) Spedisci velocemente (entro 24h se possibile). 2) Imballa bene (nessuno vuole ricevere un capo spiegazzato in una busta di plastica). 3) Sii onesto nella descrizione — nessuna sorpresa negativa. 4) Rispondi ai messaggi con cortesia. 5) Un piccolo tocco personale: un bigliettino di ringraziamento scritto a mano costa nulla e fa la differenza.",
          "GESTIRE LE RECENSIONI NEGATIVE: se succede, rispondi con calma e professionalità. Non attaccare l'acquirente. Offri una soluzione. Una risposta educata a una recensione negativa mostra maturità a tutti i futuri acquirenti che leggono il tuo profilo.",
          "PROFILO CURATO: foto profilo reale (non un logo), bio breve che spiega cosa vendi e quanto spesso spedisci ('Spedisco entro 24h! Specializzato in streetwear vintage.'). Un profilo curato dà fiducia.",
        ],
      },
    ],
  },
  {
    step: 9,
    title: "Spedire",
    icon: "📦",
    desc: "Imballaggio, etichette, corrieri, tempi. Come spedire veloce, bene e senza perdere soldi.",
    locked: false,
    sections: [
      {
        id: "come-funziona-spedizione",
        title: "Come funziona la spedizione su Vinted",
        content: [
          "Su Vinted le spese di spedizione sono SEMPRE a carico dell'acquirente. Tu come venditore non paghi nulla per la spedizione (salvo casi particolari di spedizione personalizzata). L'acquirente sceglie il corriere e paga al momento dell'acquisto.",
          "Quando qualcuno compra, ricevi una notifica con l'etichetta prepagata da scaricare. La stampi, la attacchi al pacco e lo consegni al punto di ritiro del corriere scelto. Hai 5 giorni lavorativi per spedire — ma più spedisci veloce, migliore è la tua reputazione.",
          "I corrieri partner di Vinted in Italia sono: Poste Italiane, UPS Access Point, InPost e BRT Fermopoint. Ognuno ha punti di consegna e locker distribuiti sul territorio. Puoi trovare i punti più vicini a te direttamente nell'app.",
          "I pacchi su Vinted si dividono in 3 fasce: PICCOLO (fino a 500g — accessori, vestiti leggeri), MEDIO (fino a 1kg — pantaloni, giacche leggere, scarpe), GRANDE (fino a 2kg — cappotti, scarpe pesanti). Se il tuo articolo supera i 2kg, potresti dover usare la spedizione personalizzata.",
        ],
      },
      {
        id: "imballaggio",
        title: "Imballare bene — il kit e il metodo",
        content: [
          "L'imballaggio è l'ultima impressione prima che l'acquirente apra il pacco. Un capo arrivato spiegazzato in una busta di plastica sottile lascia un'impressione pessima, anche se il capo in sé è perfetto.",
          "KIT IMBALLAGGIO ECONOMICO: buste postali imbottite (per capi leggeri, circa 0,30-0,50€ l'una su Amazon in stock), scatole di cartone riciclate (dalle consegne che ricevi — costo zero), carta velina (1-2€ per un rotolo grande), nastro adesivo largo e resistente.",
          "METODO: 1) Piega il capo con cura. 2) Avvolgilo in carta velina (protegge e dà un aspetto curato). 3) Mettilo nella busta o scatola. 4) Riempi gli spazi vuoti con carta o pluriball per evitare che si muova. 5) Chiudi bene con nastro adesivo. 6) Attacca l'etichetta prepagata in modo che il codice a barre sia ben visibile e non piegato.",
          "CONSIGLIO PRO: fai una foto del pacco chiuso con l'etichetta prima di spedire. Se l'acquirente apre una disputa dicendo che il pacco era vuoto o danneggiato, la foto è la tua protezione. Alcuni reseller fotografano anche il momento in cui consegnano il pacco al punto di ritiro.",
        ],
      },
      {
        id: "velocita-spedizione",
        title: "La velocità fa la differenza",
        content: [
          "Spedisci entro 24 ore se possibile. Al massimo entro 48 ore. Mai aspettare il quinto giorno — l'acquirente inizia a preoccuparsi e la tua reputazione ne risente.",
          "TRUCCO ORGANIZZATIVO: tieni sempre a portata di mano buste/scatole pronte, nastro adesivo e forbici. Quando arriva una vendita, il pacco deve essere pronto in 10 minuti. Non perdere tempo a cercare materiali.",
          "Se sai che non potrai spedire per qualche giorno (vacanza, impegni), metti in pausa gli annunci o avvisa nel profilo. Un acquirente che aspetta 5 giorni senza comunicazione lascia una recensione negativa, anche se il capo è perfetto.",
          "Dopo la spedizione, l'acquirente ha 15 giorni per ritirare il pacco. Se non lo ritira, il pacco torna a te senza rimborso. Se passano 5 giorni senza ritiro, manda un promemoria educato tramite la chat di Vinted.",
        ],
      },
      {
        id: "spedizioni-estero",
        title: "Vendere e spedire all'estero",
        content: [
          "Vinted permette di vendere in tutta Europa: Francia, Germania, Spagna, Belgio, Paesi Bassi, Austria, Portogallo, Lussemburgo e altri. Le spedizioni internazionali funzionano con gli stessi corrieri partner — l'etichetta prepagata copre anche l'estero.",
          "PERCHÉ VENDERE ALL'ESTERO: il tuo mercato si moltiplica. Un pezzo che in Italia ha poca domanda potrebbe essere ricercatissimo in Francia o Germania. I brand italiani (Fendi, Gucci, Prada) sono molto ricercati dagli acquirenti esteri. In alcuni Paesi i prezzi medi sono più alti che in Italia.",
          "COME ATTIVARE: nelle impostazioni del tuo profilo, abilita la spedizione internazionale. Scrivi le descrizioni in modo chiaro e semplice — Vinted le traduce automaticamente ma frasi complesse si traducono male. Indica le misure in cm (universali, non legate alle taglie di un Paese).",
          "ATTENZIONE: le spese di spedizione internazionali sono più alte per l'acquirente, il che può scoraggiare l'acquisto su pezzi a basso prezzo. Per articoli sotto i 15€ l'estero raramente conviene all'acquirente. Per articoli sopra i 25-30€ diventa interessante.",
        ],
      },
    ],
  },
  {
    step: 10,
    title: "Dopo la vendita",
    icon: "⭐",
    desc: "Cosa succede dopo l'acquisto: pagamento, conferma, recensioni, resi, dispute e protezione account.",
    locked: false,
    sections: [
      {
        id: "flusso-pagamento",
        title: "Come funziona il pagamento",
        content: [
          "Quando qualcuno compra il tuo articolo, il denaro NON arriva subito sul tuo conto. Vinted trattiene i soldi in un deposito di garanzia fino a quando l'acquirente conferma che è tutto ok.",
          "Il flusso è: 1) L'acquirente paga → 2) Tu spedisci → 3) L'acquirente riceve e ha 2 giorni per confermare o aprire una disputa → 4) Se conferma (o non fa nulla entro 2 giorni), il denaro viene rilasciato sul tuo saldo Vinted → 5) Dal saldo puoi trasferire sul tuo conto bancario.",
          "Il trasferimento dal saldo Vinted al tuo conto bancario richiede 1-5 giorni lavorativi. Ricorda: Vinted non trattiene commissioni sul venditore (la protezione acquisti è pagata dall'acquirente).",
        ],
      },
      {
        id: "resi-dispute",
        title: "Resi e dispute — come proteggerti",
        content: [
          "Le dispute possono succedere. L'acquirente dice che il capo non corrisponde alla descrizione, che è difettoso, o che è un falso. Ecco come proteggerti:",
          "PREVENZIONE (la migliore difesa): 1) Descrizioni oneste e complete (difetti dichiarati). 2) Foto chiare di ogni dettaglio e difetto. 3) Misure in cm. 4) Foto del pacco prima della spedizione. Se hai documentato tutto, sei coperto.",
          "SE ARRIVA UNA DISPUTA: Vinted fa da mediatore. Presenta le tue prove (foto dell'annuncio, foto del pacco, messaggi con l'acquirente). Se la tua descrizione era accurata e l'acquirente cambia idea ('non mi piace il colore'), Vinted tendenzialmente dà ragione al venditore.",
          "CASI TRUFFALDINI: Alcuni acquirenti disonesti affermano che l'articolo è falso o danneggiato per ottenere il rimborso e tenersi il capo. La foto del pacco alla consegna e le foto dettagliate dell'annuncio sono la tua protezione. Se sospetti una truffa, segnala a Vinted con tutte le prove.",
          "REGOLA: non accettare mai di gestire resi o rimborsi fuori da Vinted (via PayPal, bonifico, ecc.). Passa sempre attraverso la piattaforma — è l'unico modo per essere protetto.",
        ],
      },
      {
        id: "recensioni",
        title: "Le recensioni — il tuo capitale",
        content: [
          "Ogni vendita completata genera una recensione. Le recensioni positive sono il tuo asset più importante dopo la merce. Un profilo con decine di 5 stelle vende più velocemente e a prezzi più alti di un profilo nuovo senza recensioni.",
          "COME OTTENERE 5 STELLE costantemente: spedisci entro 24h, imballa con cura, sii onesto nella descrizione, rispondi velocemente ai messaggi. Non c'è trucco: fai bene il lavoro e le recensioni arrivano.",
          "DOPO OGNI VENDITA: lascia tu per primo una recensione positiva all'acquirente. Nella maggior parte dei casi, l'acquirente ricambierà. È una convenzione sociale di Vinted.",
          "SE RICEVI UNA RECENSIONE INGIUSTA: puoi rispondere pubblicamente in modo educato e fattuale. Non litigare — chiunque legga il tuo profilo vedrà la tua risposta composta come un segno di professionalità.",
        ],
      },
      {
        id: "protezione-account",
        title: "Proteggere il tuo account",
        content: [
          "Il tuo account Vinted con le sue recensioni e follower ha un valore reale. Perderlo significa ricominciare da zero. Ecco come proteggerlo:",
          "MOTIVI DI BAN: vendere articoli contraffatti (ban permanente), non spedire ripetutamente, avere troppe dispute, comportamento scorretto in chat, vendere articoli vietati (alimenti, farmaci, prodotti pericolosi), evasione delle regole DAC7.",
          "REGOLE ESSENZIALI: 1) MAI vendere falsi, neanche 'per sbaglio'. Se non sei sicuro dell'autenticità, non vendere il pezzo. 2) Spedisci sempre entro i tempi. 3) Non usare linguaggio offensivo in chat. 4) Non cercare di portare le transazioni fuori da Vinted. 5) Se Vinted ti chiede la DAC7, compilala subito — il ritardo porta alla sospensione.",
          "BACKUP: tieni un registro esterno di tutti i tuoi articoli, vendite e profitti (è esattamente quello che fa la sezione Inventario di questa app). Se perdi l'account, almeno i tuoi dati sono salvi e sai da dove ripartire.",
        ],
      },
    ],
  },
  {
    step: 11,
    title: "Crescere e scalare",
    icon: "📈",
    desc: "Da hobby a semi-attività: budget, reinvestimento, obiettivi, multi-piattaforma, e quando il fisco diventa un tema.",
    locked: false,
    sections: [
      {
        id: "mentalita-crescita",
        title: "La mentalità giusta per crescere",
        content: [
          "I primi mesi di resell servono per imparare: capire la tua nicchia, le tue fonti, il tuo ritmo. Non concentrarti sui numeri — concentrati sul processo. Una volta che il processo è solido (compri bene → prepari bene → fotografi bene → descrivi bene → spedisci veloce), i numeri vengono da soli.",
          "La differenza tra chi guadagna 50€/mese e chi guadagna 500€/mese non è il talento o la fortuna. È la costanza, l'organizzazione e il reinvestimento. Trattalo come un'attività vera, non come un hobby casuale, e i risultati cambiano.",
        ],
      },
      {
        id: "budget-reinvestimento",
        title: "Gestire il budget e reinvestire",
        content: [
          "REGOLA DEL REINVESTIMENTO: nei primi 3-6 mesi, reinvesti TUTTO il profitto in nuova merce. Non spendere i guadagni. Ogni euro reinvestito genera 2-3€ di ritorno se compri bene. Il compound effect è potente: 50€ iniziali possono diventare 200€ di inventario in 2-3 mesi.",
          "BUDGET FISSO: stabilisci un budget mensile per l'acquisto di merce e non sforarlo. Se il budget è 100€/mese, quando li hai spesi aspetti le vendite prima di comprare altro. Questo evita il problema più comune: avere troppi soldi bloccati in merce invenduta.",
          "TRACCIA TUTTO: ogni acquisto, ogni vendita, ogni spesa (spedizioni, materiali, boost). Senza numeri precisi non sai se stai guadagnando o perdendo. La sezione Inventario di questa app esiste esattamente per questo.",
          "OBIETTIVI REALISTICI per un principiante: Mese 1-2: impara, vendi 5-10 pezzi, capisci la nicchia. Mese 3-4: trova le tue fonti stabili, vendi 10-20 pezzi al mese. Mese 6+: 20-40 pezzi al mese con margine costante. Non confrontarti con chi fa numeri enormi — sono partiti da dove sei tu.",
        ],
      },
      {
        id: "multi-piattaforma",
        title: "Espandersi su più piattaforme",
        content: [
          "Vinted è un ottimo punto di partenza, ma non è l'unico canale. Diversificare le piattaforme aumenta la visibilità e le vendite.",
          "WALLAPOP — Forte in Italia per vendite locali. Ottimo per pezzi pesanti dove la spedizione costa troppo (cappotti, scarpe, lotti). L'acquirente ritira di persona e paghi zero spedizione.",
          "DEPOP — Pubblico più giovane e fashion-forward. Migliore per pezzi vintage unici, Y2K, designer. I prezzi medi sono più alti che su Vinted ma ci sono commissioni di vendita. Funziona molto bene se hai uno stile visivo forte e coerente.",
          "SUBITO.IT — Grande traffico in Italia. Buono per lotti, stock e articoli di valore medio. Meno specializzato nella moda ma molto usato.",
          "INSTAGRAM — Non è un marketplace ma è un canale potente per il branding. Pubblica le foto dei tuoi pezzi, usa hashtag di nicchia, costruisci un seguito. Alcuni reseller vendono su Instagram a prezzi 20-30% più alti che su Vinted perché il 'brand personale' aggiunge valore percepito.",
          "ATTENZIONE: gestire più piattaforme richiede tempo. Se un pezzo è in vendita su Vinted E su Wallapop, quando lo vendi su una devi toglierlo dall'altra immediatamente. Evita la doppia vendita — porta a recensioni negative e perdita di tempo.",
        ],
      },
      {
        id: "quando-fisco",
        title: "Quando il fisco diventa un tema",
        content: [
          "Come spiegato nel Passo 1, le soglie DAC7 scattano a 30 vendite/anno o 2.000€ di incasso. Quando ti avvicini a queste soglie, devi iniziare a ragionare sulla parte fiscale.",
          "SOTTO LE SOGLIE: sei un venditore occasionale. Nessun obbligo fiscale se stai vendendo oggetti personali usati senza organizzazione professionale. Compila la DAC7 se Vinted te la chiede, ma non devi aprire partita IVA.",
          "SOPRA LE SOGLIE CON ATTIVITÀ ORGANIZZATA: se compri merce appositamente per rivenderla, con regolarità e con intento di lucro, l'Agenzia delle Entrate può considerarti un'impresa. A quel punto serve la partita IVA.",
          "IL REGIME FORFETTARIO: è la scelta più comune per i reseller che si strutturano. Permette un'aliquota agevolata (5% per i primi 5 anni, poi 15%) fino a 85.000€ di fatturato annuo. I costi di gestione sono contenuti (commercialista: 500-1.000€/anno). Il codice ATECO per il commercio online è 47.91.10.",
          "REGIME DEL MARGINE: per chi vende beni usati acquistati da privati, esiste il 'regime del margine' che permette di pagare l'IVA solo sulla differenza tra prezzo di acquisto e prezzo di vendita, non sull'intero importo. Chiedi al tuo commercialista — può far risparmiare molto.",
          "CONSIGLIO FINALE: non aspettare di avere un problema col fisco per informarti. Se il resell sta funzionando e stai crescendo, prenota una consulenza con un commercialista. La prima consulenza (spesso 50-100€) ti chiarisce la situazione e ti fa dormire tranquillo. È un investimento, non un costo.",
        ],
      },
      {
        id: "errori-crescita",
        title: "Gli errori che bloccano la crescita",
        content: [
          "CRESCERE TROPPO IN FRETTA — Comprare 100 pezzi al secondo mese senza aver ancora capito cosa si vende e cosa no. Risultato: stock morto enorme e capitale bloccato. Cresci gradualmente, validando ogni step.",
          "NON TRACCIARE I NUMERI — 'Mi sembra di guadagnare' non è un business plan. Se non sai il tuo margine medio, il tempo medio di vendita e il ROI mensile, stai navigando alla cieca. Usa la sezione Inventario.",
          "FARE TUTTO DA SOLI PER SEMPRE — A un certo punto, il collo di bottiglia sei tu. Fotografare, descrivere, imballare, spedire, cercare merce — tutto da solo. Se vuoi scalare oltre un certo punto, devi semplificare i processi (sessioni batch di foto, template di descrizione, kit imballaggio pre-preparati).",
          "IGNORARE IL FISCO — 'Tanto non mi beccano' è una strategia perdente. Con la DAC7 e la sentenza Cassazione 7552/2025, le piattaforme segnalano e il fisco controlla. Mettiti in regola prima che diventi un problema.",
          "NON EVOLVERSI — Il mercato cambia. I trend cambiano. Le fonti cambiano. Quello che funzionava 6 mesi fa potrebbe non funzionare oggi. Resta aggiornato, sperimenta, adattati. Il resell è un'attività dinamica, non una formula statica.",
        ],
      },
    ],
  },
];

export const CATEGORIE = ["Abbigliamento", "Scarpe", "Accessori", "Borse", "Altro"];
export const FONTI = ["FB Marketplace", "Mercatino", "Thrift Shop", "Humana", "Outlet", "Vinted", "Wallapop", "Subito", "Privato", "Stock ingrosso", "Altro"];
export const TAGLIE = ["XS", "S", "M", "L", "XL", "XXL", "Unica", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
export const CONDIZIONI = ["Nuovo con etichette", "Nuovo senza etichette", "Ottime condizioni", "Buone condizioni", "Discrete condizioni"];
export const GENERI = ["Uomo", "Donna", "Unisex"];
export const PIE_COLORS = ["#d4f55e", "#60a5fa", "#c084fc", "#fb923c", "#f87171"];

/* ═══════════════════════════════════════════════════════════════
   MOTORE DI VALUTAZIONE — Stima prezzo rivendita
   ═══════════════════════════════════════════════════════════════ */

export const TIPI_CAPO = [
  "Felpa", "Felpa con cappuccio", "T-shirt", "Canotta/Top", "Polo", "Camicia", "Blazer",
  "Giacca", "Giacca puffer", "Giacca a vento", "Gilet/Smanicato", "Cappotto", "Pile/Fleece",
  "Maglione", "Cardigan",
  "Jeans", "Pantaloni", "Shorts", "Leggings",
  "Gonna", "Vestito", "Body", "Tuta/Tracksuit",
  "Costume da bagno",
  "Sneakers", "Scarpe", "Stivali", "Sandali", "Ciabatte/Slides",
  "Borsa", "Zaino", "Cintura", "Portafoglio", "Sciarpa/Foulard",
  "Cappello/Berretto", "Occhiali da sole", "Orologio", "Gioielli/Bijoux",
];

export const BRAND_LIST = [
  "Nike", "Adidas", "The North Face", "Carhartt", "Ralph Lauren", "Tommy Hilfiger",
  "Lacoste", "Levi's", "Champion", "Dickies", "Stüssy", "Patagonia", "Moncler",
  "Gucci", "Louis Vuitton", "Fendi", "Prada", "Burberry", "Dior", "Versace",
  "Puma", "New Balance", "Converse", "Vans", "Jordan", "Hugo Boss", "Calvin Klein",
  "Napapijri", "Arc'teryx", "Salomon", "Stone Island", "Supreme",
  "Zara", "H&M", "Mango", "Primark", "Sinsay",
  "Hermès", "Chanel", "Reebok", "Umbro", "Fila", "Kappa",
  "Timberland", "Dr. Martens", "Columbia", "Helly Hansen",
];

/* ─── PRICE DATABASE ───
   Ogni brand ha prezzi base per tipo di capo.
   _default = fallback se il tipo non è nel database.
   min/max = range in € per condizione "ottime condizioni" e taglia media.
   conf = confidenza base (0-100) — quanto è affidabile la stima per quel brand+tipo.
*/
const PRICE_DB = {
  "Nike": {
    _tier: "streetwear", _demand: 5, _fakeRisk: "medio", _conf: 80,
    "T-shirt": { min: 8, max: 15 }, "Polo": { min: 10, max: 18 },
    "Felpa": { min: 18, max: 35 }, "Felpa con cappuccio": { min: 20, max: 40 },
    "Giacca": { min: 25, max: 50 }, "Giacca puffer": { min: 35, max: 70 },
    "Giacca a vento": { min: 20, max: 45 }, "Pantaloni": { min: 12, max: 25 },
    "Tuta/Tracksuit": { min: 25, max: 50 }, "Shorts": { min: 8, max: 16 },
    "Sneakers": { min: 25, max: 65 }, "Zaino": { min: 15, max: 35 },
    "Cappello/Berretto": { min: 8, max: 18 },
    _default: { min: 10, max: 25 },
  },
  "Adidas": {
    _tier: "streetwear", _demand: 5, _fakeRisk: "medio", _conf: 80,
    "T-shirt": { min: 8, max: 15 }, "Polo": { min: 10, max: 18 },
    "Felpa": { min: 15, max: 30 }, "Felpa con cappuccio": { min: 18, max: 38 },
    "Giacca": { min: 20, max: 45 }, "Giacca puffer": { min: 30, max: 60 },
    "Giacca a vento": { min: 18, max: 40 }, "Pantaloni": { min: 12, max: 25 },
    "Tuta/Tracksuit": { min: 25, max: 55 }, "Shorts": { min: 8, max: 15 },
    "Sneakers": { min: 20, max: 55 }, "Zaino": { min: 12, max: 30 },
    _default: { min: 10, max: 22 },
  },
  "The North Face": {
    _tier: "outdoor", _demand: 5, _fakeRisk: "medio", _conf: 78,
    "Giacca puffer": { min: 40, max: 90 }, "Giacca": { min: 35, max: 75 },
    "Giacca a vento": { min: 25, max: 55 }, "Pile/Fleece": { min: 25, max: 55 },
    "Felpa": { min: 20, max: 40 }, "Felpa con cappuccio": { min: 22, max: 45 },
    "T-shirt": { min: 10, max: 20 }, "Zaino": { min: 20, max: 45 },
    "Cappello/Berretto": { min: 10, max: 22 },
    _default: { min: 15, max: 35 },
  },
  "Carhartt": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "basso", _conf: 80,
    "Giacca": { min: 30, max: 65 }, "Felpa": { min: 20, max: 40 },
    "Felpa con cappuccio": { min: 22, max: 45 }, "T-shirt": { min: 10, max: 20 },
    "Pantaloni": { min: 18, max: 35 }, "Cappello/Berretto": { min: 12, max: 25 },
    _default: { min: 15, max: 30 },
  },
  "Ralph Lauren": {
    _tier: "classic", _demand: 4, _fakeRisk: "medio", _conf: 82,
    "Polo": { min: 12, max: 28 }, "Camicia": { min: 12, max: 25 },
    "Felpa": { min: 18, max: 35 }, "Maglione": { min: 15, max: 30 },
    "Giacca": { min: 25, max: 55 }, "Cappotto": { min: 30, max: 65 },
    "Pantaloni": { min: 12, max: 22 }, "Cappello/Berretto": { min: 10, max: 22 },
    "Cintura": { min: 10, max: 25 }, "Sciarpa/Foulard": { min: 12, max: 28 },
    _default: { min: 10, max: 25 },
  },
  "Tommy Hilfiger": {
    _tier: "classic", _demand: 4, _fakeRisk: "basso", _conf: 82,
    "Polo": { min: 10, max: 22 }, "Camicia": { min: 10, max: 22 },
    "Felpa": { min: 15, max: 30 }, "Felpa con cappuccio": { min: 18, max: 35 },
    "Giacca": { min: 22, max: 50 }, "Giacca puffer": { min: 28, max: 55 },
    "Maglione": { min: 12, max: 25 }, "T-shirt": { min: 8, max: 15 },
    _default: { min: 10, max: 22 },
  },
  "Lacoste": {
    _tier: "classic", _demand: 4, _fakeRisk: "basso", _conf: 82,
    "Polo": { min: 12, max: 28 }, "Felpa": { min: 15, max: 30 },
    "Maglione": { min: 14, max: 28 }, "Giacca": { min: 20, max: 45 },
    "T-shirt": { min: 8, max: 16 }, "Cappello/Berretto": { min: 10, max: 20 },
    _default: { min: 10, max: 22 },
  },
  "Levi's": {
    _tier: "classic", _demand: 4, _fakeRisk: "basso", _conf: 85,
    "Jeans": { min: 15, max: 35 }, "Giacca": { min: 25, max: 55 },
    "T-shirt": { min: 8, max: 15 }, "Camicia": { min: 12, max: 25 },
    "Shorts": { min: 10, max: 20 },
    _default: { min: 10, max: 22 },
  },
  "Champion": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "basso", _conf: 82,
    "Felpa": { min: 15, max: 30 }, "Felpa con cappuccio": { min: 18, max: 35 },
    "T-shirt": { min: 8, max: 15 }, "Tuta/Tracksuit": { min: 20, max: 40 },
    _default: { min: 8, max: 20 },
  },
  "Dickies": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 82,
    "Pantaloni": { min: 15, max: 30 }, "Giacca": { min: 20, max: 40 },
    "Camicia": { min: 12, max: 22 }, "Shorts": { min: 10, max: 18 },
    _default: { min: 10, max: 22 },
  },
  "Stüssy": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "medio", _conf: 72,
    "Felpa": { min: 25, max: 50 }, "Felpa con cappuccio": { min: 30, max: 60 },
    "T-shirt": { min: 15, max: 30 }, "Giacca": { min: 30, max: 65 },
    "Cappello/Berretto": { min: 15, max: 30 },
    _default: { min: 15, max: 35 },
  },
  "Patagonia": {
    _tier: "outdoor", _demand: 4, _fakeRisk: "basso", _conf: 78,
    "Pile/Fleece": { min: 30, max: 65 }, "Giacca": { min: 35, max: 75 },
    "Giacca puffer": { min: 40, max: 80 }, "Felpa": { min: 20, max: 40 },
    "T-shirt": { min: 10, max: 22 },
    _default: { min: 18, max: 40 },
  },
  "Moncler": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 55,
    "Giacca puffer": { min: 150, max: 450 }, "Giacca": { min: 120, max: 350 },
    "Polo": { min: 30, max: 65 }, "Felpa": { min: 50, max: 120 },
    "Cappello/Berretto": { min: 30, max: 70 }, "Sciarpa/Foulard": { min: 40, max: 90 },
    _default: { min: 40, max: 150 },
  },
  "Gucci": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 45,
    "Cintura": { min: 80, max: 220 }, "Borsa": { min: 120, max: 500 },
    "Portafoglio": { min: 50, max: 150 }, "Sciarpa/Foulard": { min: 50, max: 140 },
    "T-shirt": { min: 40, max: 100 }, "Felpa": { min: 60, max: 160 },
    "Sneakers": { min: 80, max: 250 }, "Occhiali da sole": { min: 40, max: 120 },
    "Cappello/Berretto": { min: 40, max: 100 },
    _default: { min: 50, max: 200 },
  },
  "Louis Vuitton": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 45,
    "Borsa": { min: 200, max: 800 }, "Portafoglio": { min: 80, max: 250 },
    "Cintura": { min: 100, max: 280 }, "Sciarpa/Foulard": { min: 80, max: 200 },
    "Sneakers": { min: 120, max: 350 }, "Zaino": { min: 200, max: 600 },
    _default: { min: 80, max: 350 },
  },
  "Fendi": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 48,
    "Borsa": { min: 120, max: 500 }, "Portafoglio": { min: 50, max: 150 },
    "Cintura": { min: 60, max: 180 }, "Sciarpa/Foulard": { min: 50, max: 130 },
    "T-shirt": { min: 35, max: 90 },
    _default: { min: 50, max: 180 },
  },
  "Prada": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 48,
    "Borsa": { min: 150, max: 550 }, "Zaino": { min: 150, max: 450 },
    "Portafoglio": { min: 50, max: 150 }, "Sneakers": { min: 80, max: 250 },
    "Cintura": { min: 60, max: 160 }, "Occhiali da sole": { min: 40, max: 110 },
    _default: { min: 60, max: 200 },
  },
  "Burberry": {
    _tier: "luxury", _demand: 4, _fakeRisk: "alto", _conf: 52,
    "Sciarpa/Foulard": { min: 50, max: 150 }, "Giacca": { min: 60, max: 180 },
    "Cappotto": { min: 80, max: 250 }, "Camicia": { min: 30, max: 70 },
    "Borsa": { min: 80, max: 300 }, "Cintura": { min: 40, max: 100 },
    _default: { min: 40, max: 130 },
  },
  "Dior": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 45,
    "Borsa": { min: 200, max: 700 }, "Sneakers": { min: 120, max: 350 },
    "Sciarpa/Foulard": { min: 60, max: 160 }, "Cintura": { min: 70, max: 200 },
    _default: { min: 70, max: 250 },
  },
  "Versace": {
    _tier: "luxury", _demand: 3, _fakeRisk: "alto", _conf: 50,
    "T-shirt": { min: 30, max: 70 }, "Cintura": { min: 50, max: 140 },
    "Borsa": { min: 80, max: 300 }, "Occhiali da sole": { min: 35, max: 90 },
    _default: { min: 35, max: 120 },
  },
  "Puma": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 80,
    "Sneakers": { min: 15, max: 35 }, "Felpa": { min: 12, max: 25 },
    "T-shirt": { min: 6, max: 12 }, "Giacca": { min: 18, max: 35 },
    "Tuta/Tracksuit": { min: 18, max: 35 },
    _default: { min: 8, max: 20 },
  },
  "New Balance": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "basso", _conf: 78,
    "Sneakers": { min: 25, max: 60 }, "Felpa": { min: 15, max: 28 },
    "Giacca a vento": { min: 18, max: 35 }, "T-shirt": { min: 8, max: 15 },
    _default: { min: 10, max: 25 },
  },
  "Converse": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "basso", _conf: 85,
    "Sneakers": { min: 15, max: 40 },
    _default: { min: 10, max: 20 },
  },
  "Vans": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 85,
    "Sneakers": { min: 12, max: 30 }, "T-shirt": { min: 6, max: 12 },
    "Felpa": { min: 12, max: 22 },
    _default: { min: 8, max: 18 },
  },
  "Jordan": {
    _tier: "streetwear", _demand: 5, _fakeRisk: "alto", _conf: 55,
    "Sneakers": { min: 40, max: 150 }, "Felpa": { min: 20, max: 40 },
    "T-shirt": { min: 12, max: 25 }, "Giacca": { min: 30, max: 60 },
    _default: { min: 15, max: 40 },
  },
  "Hugo Boss": {
    _tier: "classic", _demand: 3, _fakeRisk: "basso", _conf: 78,
    "Camicia": { min: 12, max: 28 }, "Polo": { min: 12, max: 25 },
    "Giacca": { min: 25, max: 55 }, "Cappotto": { min: 35, max: 75 },
    "Maglione": { min: 15, max: 30 }, "Cintura": { min: 12, max: 28 },
    _default: { min: 12, max: 28 },
  },
  "Calvin Klein": {
    _tier: "classic", _demand: 3, _fakeRisk: "basso", _conf: 80,
    "Felpa": { min: 12, max: 25 }, "T-shirt": { min: 7, max: 14 },
    "Jeans": { min: 12, max: 25 }, "Giacca": { min: 20, max: 40 },
    "Cintura": { min: 10, max: 22 },
    _default: { min: 8, max: 20 },
  },
  "Napapijri": {
    _tier: "outdoor", _demand: 4, _fakeRisk: "basso", _conf: 78,
    "Giacca puffer": { min: 30, max: 70 }, "Giacca": { min: 25, max: 55 },
    "Giacca a vento": { min: 22, max: 45 }, "Felpa": { min: 18, max: 35 },
    "Felpa con cappuccio": { min: 20, max: 38 }, "T-shirt": { min: 8, max: 16 },
    _default: { min: 12, max: 28 },
  },
  "Arc'teryx": {
    _tier: "outdoor", _demand: 4, _fakeRisk: "medio", _conf: 65,
    "Giacca": { min: 50, max: 150 }, "Pile/Fleece": { min: 35, max: 80 },
    "Giacca a vento": { min: 40, max: 100 },
    _default: { min: 30, max: 80 },
  },
  "Salomon": {
    _tier: "outdoor", _demand: 4, _fakeRisk: "basso", _conf: 75,
    "Sneakers": { min: 25, max: 60 }, "Scarpe": { min: 20, max: 50 },
    "Giacca": { min: 25, max: 55 },
    _default: { min: 18, max: 40 },
  },
  "Stone Island": {
    _tier: "streetwear", _demand: 5, _fakeRisk: "alto", _conf: 58,
    "Felpa": { min: 40, max: 90 }, "Giacca": { min: 60, max: 150 },
    "Cappello/Berretto": { min: 20, max: 45 }, "Polo": { min: 25, max: 50 },
    "T-shirt": { min: 20, max: 40 }, "Pantaloni": { min: 30, max: 60 },
    _default: { min: 30, max: 70 },
  },
  "Supreme": {
    _tier: "streetwear", _demand: 4, _fakeRisk: "alto", _conf: 50,
    "Felpa con cappuccio": { min: 50, max: 150 }, "T-shirt": { min: 25, max: 70 },
    "Cappello/Berretto": { min: 20, max: 55 }, "Giacca": { min: 50, max: 160 },
    "Zaino": { min: 40, max: 100 },
    _default: { min: 25, max: 80 },
  },
  "Zara": {
    _tier: "fast-fashion", _demand: 2, _fakeRisk: "basso", _conf: 88,
    "Giacca": { min: 8, max: 18 }, "Vestito": { min: 6, max: 14 },
    "Camicia": { min: 5, max: 12 }, "Pantaloni": { min: 5, max: 12 },
    "Cappotto": { min: 12, max: 25 },
    _default: { min: 4, max: 10 },
  },
  "H&M": {
    _tier: "fast-fashion", _demand: 2, _fakeRisk: "basso", _conf: 88,
    "Giacca": { min: 6, max: 14 }, "Vestito": { min: 5, max: 12 },
    "Felpa": { min: 5, max: 10 },
    _default: { min: 3, max: 8 },
  },
  "Mango": {
    _tier: "fast-fashion", _demand: 2, _fakeRisk: "basso", _conf: 85,
    "Vestito": { min: 6, max: 15 }, "Giacca": { min: 8, max: 18 },
    "Cappotto": { min: 12, max: 28 },
    _default: { min: 4, max: 10 },
  },
  "Primark": {
    _tier: "fast-fashion", _demand: 1, _fakeRisk: "basso", _conf: 90,
    "Giacca": { min: 4, max: 10 }, "Felpa": { min: 3, max: 7 },
    "Vestito": { min: 3, max: 8 }, "Jeans": { min: 4, max: 9 },
    "T-shirt": { min: 2, max: 5 }, "Sneakers": { min: 4, max: 10 },
    _default: { min: 2, max: 6 },
  },
  "Sinsay": {
    _tier: "fast-fashion", _demand: 1, _fakeRisk: "basso", _conf: 90,
    "Vestito": { min: 3, max: 8 }, "Felpa": { min: 3, max: 7 },
    "T-shirt": { min: 2, max: 5 }, "Giacca": { min: 4, max: 10 },
    _default: { min: 2, max: 6 },
  },
  "Hermès": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 40,
    "Sciarpa/Foulard": { min: 100, max: 300 }, "Cintura": { min: 120, max: 350 },
    "Borsa": { min: 500, max: 3000 }, "Portafoglio": { min: 100, max: 300 },
    _default: { min: 100, max: 500 },
  },
  "Chanel": {
    _tier: "luxury", _demand: 5, _fakeRisk: "alto", _conf: 40,
    "Borsa": { min: 400, max: 2500 }, "Occhiali da sole": { min: 50, max: 150 },
    "Sciarpa/Foulard": { min: 60, max: 180 },
    _default: { min: 80, max: 400 },
  },
  "Reebok": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 82,
    "Sneakers": { min: 15, max: 35 }, "Felpa": { min: 12, max: 25 },
    "T-shirt": { min: 6, max: 12 }, "Giacca a vento": { min: 15, max: 30 },
    _default: { min: 8, max: 18 },
  },
  "Umbro": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 82,
    "T-shirt": { min: 8, max: 18 }, "Felpa": { min: 12, max: 25 },
    "Giacca a vento": { min: 15, max: 30 }, "Shorts": { min: 6, max: 14 },
    _default: { min: 6, max: 16 },
  },
  "Fila": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 82,
    "Felpa": { min: 12, max: 25 }, "T-shirt": { min: 6, max: 14 },
    "Sneakers": { min: 15, max: 30 }, "Giacca a vento": { min: 15, max: 28 },
    _default: { min: 8, max: 18 },
  },
  "Kappa": {
    _tier: "streetwear", _demand: 3, _fakeRisk: "basso", _conf: 82,
    "Tuta/Tracksuit": { min: 15, max: 30 }, "Felpa": { min: 10, max: 20 },
    "T-shirt": { min: 5, max: 12 }, "Giacca": { min: 15, max: 28 },
    _default: { min: 6, max: 16 },
  },
  "Timberland": {
    _tier: "classic", _demand: 3, _fakeRisk: "basso", _conf: 80,
    "Stivali": { min: 25, max: 55 }, "Scarpe": { min: 20, max: 45 },
    "Giacca": { min: 22, max: 45 }, "Felpa": { min: 12, max: 25 },
    _default: { min: 12, max: 28 },
  },
  "Dr. Martens": {
    _tier: "classic", _demand: 4, _fakeRisk: "basso", _conf: 80,
    "Stivali": { min: 30, max: 70 }, "Scarpe": { min: 25, max: 55 },
    _default: { min: 20, max: 45 },
  },
  "Columbia": {
    _tier: "outdoor", _demand: 3, _fakeRisk: "basso", _conf: 80,
    "Giacca": { min: 18, max: 40 }, "Pile/Fleece": { min: 15, max: 30 },
    "Giacca a vento": { min: 15, max: 32 },
    _default: { min: 10, max: 25 },
  },
  "Helly Hansen": {
    _tier: "outdoor", _demand: 3, _fakeRisk: "basso", _conf: 78,
    "Giacca": { min: 20, max: 50 }, "Pile/Fleece": { min: 15, max: 30 },
    "Giacca a vento": { min: 18, max: 38 },
    _default: { min: 12, max: 28 },
  },
};

/* Fallback generico per brand non nel database */
const UNKNOWN_BRAND = {
  _tier: "unknown", _demand: 2, _fakeRisk: "basso", _conf: 40,
  _default: { min: 5, max: 15 },
};

/* ─── MOLTIPLICATORI ─── */
const CONDITION_MULT = {
  "Nuovo con etichette": { mult: 1.25, label: "Nuovo con etichette — prezzo massimo", color: "green" },
  "Nuovo senza etichette": { mult: 1.12, label: "Nuovo senza etichette — prezzo alto", color: "green" },
  "Ottime condizioni": { mult: 1.0, label: "Ottime condizioni — prezzo pieno", color: "green" },
  "Buone condizioni": { mult: 0.82, label: "Buone condizioni — prezzo ridotto", color: "yellow" },
  "Discrete condizioni": { mult: 0.65, label: "Discrete condizioni — prezzo basso", color: "red" },
};

const SIZE_POP = {
  uomo: { "S": 0.85, "M": 1.0, "L": 1.0, "XL": 0.92, "XS": 0.7, "XXL": 0.7 },
  donna: { "XS": 0.85, "S": 1.0, "M": 1.0, "L": 0.92, "XL": 0.8, "XXL": 0.7 },
  unisex: { "S": 0.9, "M": 1.0, "L": 1.0, "XL": 0.88, "XS": 0.75, "XXL": 0.7 },
  scarpe: { "36": 0.8, "37": 0.85, "38": 0.92, "39": 0.95, "40": 1.0, "41": 1.0, "42": 1.0, "43": 0.95, "44": 0.88, "45": 0.8 },
};

/* Mesi favorevoli per tipo di capo (1=gen ... 12=dic). Lista dei mesi "hot" */
const SEASON_HOT = {
  "Giacca puffer": [9,10,11,12,1,2], "Giacca": [9,10,11,12,1,2,3], "Cappotto": [9,10,11,12,1,2],
  "Giacca a vento": [3,4,5,9,10], "Pile/Fleece": [9,10,11,12,1,2],
  "Gilet/Smanicato": [9,10,11,3,4],
  "Felpa": [9,10,11,12,1,2,3], "Felpa con cappuccio": [9,10,11,12,1,2,3],
  "Maglione": [9,10,11,12,1,2], "Cardigan": [9,10,11,1,2,3],
  "T-shirt": [4,5,6,7,8], "Canotta/Top": [5,6,7,8], "Polo": [4,5,6,7,8],
  "Shorts": [4,5,6,7,8], "Costume da bagno": [4,5,6,7],
  "Gonna": [4,5,6,7,8], "Vestito": [4,5,6,7,8,9],
  "Stivali": [9,10,11,12,1,2], "Sandali": [4,5,6,7,8], "Ciabatte/Slides": [4,5,6,7,8,9],
  "Leggings": [9,10,11,12,1,2,3],
};
/* Tipi "tutto l'anno" (non in SEASON_HOT) non subiscono penalty stagionale */

/* ─── FUNZIONE DI VALUTAZIONE ─── */
export function evaluateItem({ brand, tipo, genere, taglia, condizione, costoAcquisto, dettagli }) {
  const brandKey = Object.keys(PRICE_DB).find(k => k.toLowerCase() === (brand || "").toLowerCase());
  const db = brandKey ? PRICE_DB[brandKey] : null;
  const brandData = db || UNKNOWN_BRAND;
  const brandName = brandKey || brand || "Sconosciuto";

  /* 1. Prezzo base */
  const priceRange = (db && db[tipo]) || (db && db._default) || UNKNOWN_BRAND._default;
  let { min, max } = priceRange;

  /* 2. Moltiplicatore condizione */
  const cond = CONDITION_MULT[condizione] || CONDITION_MULT["Ottime condizioni"];
  min = Math.round(min * cond.mult);
  max = Math.round(max * cond.mult);

  /* 3. Moltiplicatore taglia */
  const genLower = (genere || "unisex").toLowerCase();
  const isShoe = ["Sneakers","Scarpe","Stivali","Sandali","Ciabatte/Slides"].includes(tipo);
  const sizeMap = isShoe ? SIZE_POP.scarpe : (SIZE_POP[genLower] || SIZE_POP.unisex);
  const sizeMult = sizeMap[taglia] || (taglia === "Unica" ? 1.0 : 0.85);
  min = Math.round(min * sizeMult);
  max = Math.round(max * sizeMult);

  /* 4. Stagionalità */
  const currentMonth = new Date().getMonth() + 1;
  const hotMonths = SEASON_HOT[tipo];
  let seasonMult = 1.0;
  let seasonLabel = "Tutto l'anno — nessun impatto stagionale";
  let seasonColor = "green";
  if (hotMonths) {
    if (hotMonths.includes(currentMonth)) {
      seasonMult = 1.08;
      seasonLabel = "Stagione perfetta — domanda alta adesso";
      seasonColor = "green";
    } else {
      /* Quanto è lontano dal mese hot più vicino? */
      const dists = hotMonths.map(m => Math.min(Math.abs(currentMonth - m), 12 - Math.abs(currentMonth - m)));
      const minDist = Math.min(...dists);
      if (minDist <= 2) {
        seasonMult = 0.92;
        seasonLabel = "Quasi in stagione — domanda in arrivo";
        seasonColor = "yellow";
      } else {
        seasonMult = 0.75;
        seasonLabel = "Fuori stagione — vendita lenta";
        seasonColor = "red";
      }
    }
  }
  min = Math.round(min * seasonMult);
  max = Math.round(max * seasonMult);

  /* Assicura min <= max e min >= 1 */
  if (min < 1) min = 1;
  if (max < min) max = min;

  /* 5. Confidenza */
  let confidence = brandData._conf || 40;
  /* Bonus/malus confidenza */
  if (!db) confidence = Math.min(confidence, 35); /* brand sconosciuto */
  if (db && !db[tipo]) confidence -= 8; /* tipo non specifico nel db */
  if (brandData._tier === "luxury") confidence -= 5; /* luxury = modello conta tanto */
  if (["M","L","40","41","42"].includes(taglia)) confidence += 3; /* taglia comune = più dati */
  if (taglia === "Unica") confidence += 5; /* accessori = prezzo più stabile */
  if (dettagli && dettagli.trim().length > 3) confidence += 5; /* ha specificato il modello */
  confidence = Math.max(20, Math.min(95, confidence));

  /* 6. Margine */
  const costo = parseFloat(costoAcquisto) || 0;
  const marginMin = Math.round((min - costo) * 100) / 100;
  const marginMax = Math.round((max - costo) * 100) / 100;
  const marginPctMin = costo > 0 ? Math.round((marginMin / costo) * 100) : null;
  const marginPctMax = costo > 0 ? Math.round((marginMax / costo) * 100) : null;

  /* 7. Verdetto */
  let verdict, verdictColor, verdictIcon;
  const avgMarginPct = marginPctMin !== null ? (marginPctMin + marginPctMax) / 2 : null;
  if (avgMarginPct === null) {
    verdict = "Inserisci il prezzo d'acquisto per il verdetto";
    verdictColor = "var(--muted)"; verdictIcon = "🔍";
  } else if (avgMarginPct >= 100) {
    verdict = "Ottimo affare"; verdictColor = "var(--green)"; verdictIcon = "🟢";
  } else if (avgMarginPct >= 50) {
    verdict = "Buon acquisto"; verdictColor = "var(--green)"; verdictIcon = "🟢";
  } else if (avgMarginPct >= 20) {
    verdict = "Margine ok ma sottile"; verdictColor = "var(--yellow)"; verdictIcon = "🟡";
  } else if (avgMarginPct >= 0) {
    verdict = "Margine troppo basso"; verdictColor = "var(--red)"; verdictIcon = "🔴";
  } else {
    verdict = "Ci perdi soldi"; verdictColor = "var(--red)"; verdictIcon = "🔴";
  }

  /* 8. Indicatori individuali */
  const indicators = [];

  /* Brand */
  const demandLabels = { 5: "Domanda altissima", 4: "Domanda alta", 3: "Domanda media", 2: "Domanda bassa", 1: "Domanda molto bassa" };
  const demandColors = { 5: "green", 4: "green", 3: "yellow", 2: "red", 1: "red" };
  indicators.push({
    label: `${brandName} — ${demandLabels[brandData._demand] || "Domanda sconosciuta"}`,
    color: demandColors[brandData._demand] || "yellow",
  });

  /* Rischio falsi */
  if (brandData._fakeRisk === "alto") {
    indicators.push({ label: "⚠️ Rischio falsi ALTO — verifica autenticità", color: "red" });
  } else if (brandData._fakeRisk === "medio") {
    indicators.push({ label: "Rischio falsi medio — controlla etichette", color: "yellow" });
  }

  /* Condizione */
  indicators.push({ label: cond.label, color: cond.color });

  /* Taglia */
  if (sizeMult >= 0.95) {
    indicators.push({ label: `Taglia ${taglia} — tra le più richieste`, color: "green" });
  } else if (sizeMult >= 0.82) {
    indicators.push({ label: `Taglia ${taglia} — vendibile ma meno cercata`, color: "yellow" });
  } else {
    indicators.push({ label: `Taglia ${taglia} — mercato piccolo, vendita lenta`, color: "red" });
  }

  /* Stagionalità */
  indicators.push({ label: seasonLabel, color: seasonColor });

  /* Fast fashion warning */
  if (brandData._tier === "fast-fashion") {
    indicators.push({ label: "Fast fashion — margini molto bassi, serve volume", color: "red" });
  }

  /* 9. Keyword per ricerca Vinted */
  const genderKeyword = genere === "Uomo" ? "uomo" : genere === "Donna" ? "donna" : "";
  const searchParts = [brand, tipo, dettagli, genderKeyword, taglia !== "Unica" ? taglia : ""].filter(Boolean).map(s => s.trim()).filter(s => s.length > 0);
  const vintedQuery = searchParts.join(" ");
  const vintedUrl = `https://www.vinted.it/catalog?search_text=${encodeURIComponent(vintedQuery)}&order=relevance`;

  /* 10. Learning — adjust based on user's actual sales history */
  const learnData = getLearnData();
  const similar = learnData.filter(d =>
    d.brand.toLowerCase() === brandName.toLowerCase() &&
    (d.tipo === tipo || !d.tipo)
  );
  let learnedMin = min, learnedMax = max, learnNote = null;
  if (similar.length >= 2) {
    const prices = similar.map(d => d.soldPrice).sort((a, b) => a - b);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const lowPrice = prices[Math.floor(prices.length * 0.25)] || prices[0];
    const highPrice = prices[Math.floor(prices.length * 0.75)] || prices[prices.length - 1];
    learnedMin = Math.round((min * 0.3 + lowPrice * 0.7));
    learnedMax = Math.round((max * 0.3 + highPrice * 0.7));
    if (learnedMin > learnedMax) learnedMax = learnedMin;
    confidence = Math.min(95, confidence + Math.min(similar.length * 3, 15));
    learnNote = `Stima aggiustata con ${similar.length} tue vendite reali di ${brandName}`;
    indicators.push({ label: `📊 ${learnNote}`, color: "green" });
    /* recalc margins with learned prices */
    const lMarginMin = Math.round((learnedMin - costo) * 100) / 100;
    const lMarginMax = Math.round((learnedMax - costo) * 100) / 100;
    const lMarginPctMin = costo > 0 ? Math.round((lMarginMin / costo) * 100) : null;
    const lMarginPctMax = costo > 0 ? Math.round((lMarginMax / costo) * 100) : null;
    /* re-evaluate verdict */
    const lAvg = lMarginPctMin !== null ? (lMarginPctMin + lMarginPctMax) / 2 : avgMarginPct;
    if (lAvg !== null) {
      if (lAvg >= 100) { verdict = "Ottimo affare"; verdictColor = "var(--green)"; verdictIcon = "🟢"; }
      else if (lAvg >= 50) { verdict = "Buon acquisto"; verdictColor = "var(--green)"; verdictIcon = "🟢"; }
      else if (lAvg >= 20) { verdict = "Margine ok ma sottile"; verdictColor = "var(--yellow)"; verdictIcon = "🟡"; }
      else if (lAvg >= 0) { verdict = "Margine troppo basso"; verdictColor = "var(--red)"; verdictIcon = "🔴"; }
      else { verdict = "Ci perdi soldi"; verdictColor = "var(--red)"; verdictIcon = "🔴"; }
    }
    return {
      brand: brandName, tipo, priceMin: learnedMin, priceMax: learnedMax,
      confidence, marginMin: lMarginMin, marginMax: lMarginMax,
      marginPctMin: lMarginPctMin, marginPctMax: lMarginPctMax,
      verdict, verdictColor, verdictIcon,
      indicators, vintedUrl, vintedQuery,
      tier: brandData._tier, learnNote,
    };
  }

  return {
    brand: brandName, tipo, priceMin: min, priceMax: max,
    confidence, marginMin, marginMax, marginPctMin, marginPctMax,
    verdict, verdictColor, verdictIcon,
    indicators, vintedUrl, vintedQuery,
    tier: brandData._tier, learnNote,
  };
}

/* ─── LEARNING SYSTEM ─── */
const LEARN_KEY = "resell-hub-learn";

function getLearnData() {
  try { return JSON.parse(localStorage.getItem(LEARN_KEY)) || []; } catch { return []; }
}

export function recordSale({ brand, tipo, genere, taglia, condizione, soldPrice }) {
  const data = getLearnData();
  data.push({
    brand: (brand || "").trim(),
    tipo: tipo || "",
    genere: genere || "",
    taglia: taglia || "",
    condizione: condizione || "",
    soldPrice: parseFloat(soldPrice) || 0,
    date: new Date().toISOString().slice(0, 10),
  });
  /* keep last 500 records max */
  const trimmed = data.slice(-500);
  try { localStorage.setItem(LEARN_KEY, JSON.stringify(trimmed)); } catch {}
}

export function getLearnStats() {
  const data = getLearnData();
  const byBrand = {};
  data.forEach(d => {
    const key = d.brand.toLowerCase();
    if (!byBrand[key]) byBrand[key] = { count: 0, total: 0, brand: d.brand };
    byBrand[key].count++;
    byBrand[key].total += d.soldPrice;
  });
  return { total: data.length, byBrand };
}

/* ═══════════════════════════════════════════════════════════════
   MOTORE RACCOMANDAZIONI — "Cosa comprare adesso"
   ═══════════════════════════════════════════════════════════════ */

const MONTH_NAMES_IT = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

export function getRecommendations() {
  const month = new Date().getMonth() + 1; // 1-12
  const monthName = MONTH_NAMES_IT[month - 1];

  /* 1. Tipi di capo in stagione adesso */
  const hotTypes = [];
  const nearTypes = [];
  const offTypes = [];
  for (const [tipo, months] of Object.entries(SEASON_HOT)) {
    if (months.includes(month)) {
      hotTypes.push(tipo);
    } else {
      const dists = months.map(m => Math.min(Math.abs(month - m), 12 - Math.abs(month - m)));
      const minDist = Math.min(...dists);
      if (minDist <= 2) nearTypes.push({ tipo, inMonths: minDist });
      else offTypes.push(tipo);
    }
  }
  /* Tipi tutto-anno (non in SEASON_HOT) */
  const allYearTypes = TIPI_CAPO.filter(t => !SEASON_HOT[t]);

  /* 2. Build recommendations: brand + tipo combos scored */
  const recs = [];

  for (const [brandName, db] of Object.entries(PRICE_DB)) {
    if (!db || brandName.startsWith("_")) continue;
    const demand = db._demand || 2;
    const tier = db._tier || "unknown";
    const fakeRisk = db._fakeRisk || "basso";

    /* Get all tipo entries for this brand */
    const tipos = Object.keys(db).filter(k => !k.startsWith("_"));

    for (const tipo of tipos) {
      const price = db[tipo];
      if (!price || !price.min) continue;

      const isHot = hotTypes.includes(tipo);
      const isNear = nearTypes.some(n => n.tipo === tipo);
      const isAllYear = allYearTypes.includes(tipo);

      /* Score: demand(0-5) + season(0-3) + margin potential(0-3) - risk(0-2) */
      let score = demand;
      if (isHot) score += 3;
      else if (isNear) score += 1.5;
      else if (isAllYear) score += 1;
      else score -= 1; /* off season */

      /* Margin potential based on price range width */
      const marginPotential = (price.max - price.min) / Math.max(price.min, 1);
      if (marginPotential > 1) score += 2;
      else if (marginPotential > 0.5) score += 1;

      /* Risk penalty */
      if (fakeRisk === "alto") score -= 1.5;
      else if (fakeRisk === "medio") score -= 0.5;

      /* Budget category */
      let budget;
      if (price.min <= 15) budget = "basso";
      else if (price.min <= 40) budget = "medio";
      else budget = "alto";

      /* Build reason */
      const reasons = [];
      if (isHot) reasons.push(`In piena stagione a ${monthName}`);
      else if (isNear) reasons.push(`Quasi in stagione — pubblica ora per il picco`);
      else if (isAllYear) reasons.push("Si vende tutto l'anno");

      if (demand >= 5) reasons.push("Domanda altissima su Vinted");
      else if (demand >= 4) reasons.push("Domanda alta su Vinted");

      if (marginPotential > 1) reasons.push(`Margini potenziali molto alti`);
      else if (marginPotential > 0.5) reasons.push("Buoni margini");

      if (fakeRisk === "alto") reasons.push("⚠️ Attenzione ai falsi");
      if (tier === "fast-fashion") reasons.push("Margini stretti — serve volume");

      recs.push({
        brand: brandName, tipo, score: Math.round(score * 10) / 10,
        priceMin: price.min, priceMax: price.max,
        demand, tier, fakeRisk, budget, reasons,
        isHot, isNear, isAllYear,
      });
    }
  }

  /* Sort by score desc */
  recs.sort((a, b) => b.score - a.score);

  /* 3. Build sections */

  /* Top picks: best overall score, limit 8 */
  const topPicks = recs.slice(0, 8);

  /* Hot right now: only in-season items, sorted by score */
  const hotNow = recs.filter(r => r.isHot).slice(0, 10);

  /* Prepara per il prossimo mese: near-season items */
  const prepareNext = recs.filter(r => r.isNear).slice(0, 6);

  /* Budget picks: best score under 15€ min price */
  const budgetPicks = recs.filter(r => r.budget === "basso").slice(0, 6);

  /* High margin: highest price range */
  const highMargin = [...recs].sort((a, b) => (b.priceMax - b.priceMin) - (a.priceMax - a.priceMin)).slice(0, 6);

  /* Off-season deals: buy cheap now, sell later */
  const offSeason = recs.filter(r => !r.isHot && !r.isNear && !r.isAllYear && r.demand >= 4)
    .sort((a, b) => b.demand - a.demand).slice(0, 6)
    .map(r => ({
      ...r,
      reasons: [`Fuori stagione ora — compralo a poco ai mercatini`, `Domanda alta quando torna in stagione`, ...r.reasons.filter(x => !x.includes("stagione"))],
    }));

  return {
    month, monthName, topPicks, hotNow, prepareNext, budgetPicks, highMargin, offSeason,
  };
}
