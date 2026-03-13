/* ─── BRAND DATABASE ─── */
// domanda: 1-5 (quanto è cercato su Vinted)
// velocita: "1-3 giorni", "3-7 giorni", "1-2 settimane", "2-4 settimane"
// margine: % tipica di guadagno sul prezzo di acquisto
export const BRANDS = [
  { name: "Gucci", domanda: 5, velocita: "1-3 giorni", margine: 95, note: "Brand più venduto in Italia nel segmento lusso. Borse e cinture volano.", source: "Privati, Vintage shops", prezzo: "60-400€" },
  { name: "Fendi", domanda: 5, velocita: "3-7 giorni", margine: 95, note: "Borse e accessori: margini altissimi ma servono capitali.", source: "Privati, Aste", prezzo: "50-300€" },
  { name: "Stone Island", domanda: 5, velocita: "1-3 giorni", margine: 92, note: "Patch originale = vendita garantita. Attenzione ai falsi.", source: "Privati, Vinted", prezzo: "40-150€" },
  { name: "Ralph Lauren", domanda: 5, velocita: "1-3 giorni", margine: 90, note: "Polo e felpe con logo reggono il prezzo anche molto usati.", source: "Mercatini, Thrift shops", prezzo: "20-60€" },
  { name: "Burberry", domanda: 4, velocita: "3-7 giorni", margine: 90, note: "Sciarpe e trench iconici. Il vintage nova check è ricercatissimo.", source: "Thrift shops, Privati", prezzo: "30-200€" },
  { name: "The North Face", domanda: 5, velocita: "1-3 giorni", margine: 88, note: "Giacche e gilet a prezzi alti. D'inverno volano, d'estate rallentano.", source: "Mercatini, Vinted stessa", prezzo: "25-80€" },
  { name: "Nike", domanda: 5, velocita: "1-3 giorni", margine: 85, note: "Felpe e tute spariscono in 1-3 giorni. Punta su taglie M/L.", source: "Primark, Mercatini, FB Marketplace", prezzo: "15-45€" },
  { name: "Carhartt", domanda: 4, velocita: "3-7 giorni", margine: 85, note: "Nicchia workwear in forte crescita. Difficile trovarlo a poco.", source: "Mercatini, Import USA", prezzo: "20-50€" },
  { name: "Adidas", domanda: 5, velocita: "1-3 giorni", margine: 80, note: "Trefoil e 3 stripes sempre richiesti. Facile da trovare a poco.", source: "Mercatini, Outlet", prezzo: "12-35€" },
  { name: "New Balance", domanda: 4, velocita: "3-7 giorni", margine: 78, note: "Modelli 550 e 530 molto richiesti. Si rivende subito.", source: "Outlet, Saldi online", prezzo: "40-90€" },
  { name: "Levi's", domanda: 4, velocita: "3-7 giorni", margine: 78, note: "Jeans 501 e vintage anni 80/90 valgono molto.", source: "Thrift shops, Mercatini", prezzo: "10-35€" },
  { name: "Tommy Hilfiger", domanda: 4, velocita: "3-7 giorni", margine: 75, note: "Buona domanda costante, soprattutto taglie M-XL uomo.", source: "Outlet, FB Marketplace", prezzo: "15-40€" },
  { name: "Dickies", domanda: 3, velocita: "1-2 settimane", margine: 72, note: "Pantaloni cargo e giacche: domanda alta, reperibili a poco.", source: "Outlet, Mercatini", prezzo: "8-25€" },
  { name: "Zara", domanda: 3, velocita: "3-7 giorni", margine: 70, note: "Ottimo rapporto costo/velocità. Cercare sconti -70%.", source: "Zara Outlet, Saldi", prezzo: "8-25€" },
  { name: "Mango", domanda: 3, velocita: "1-2 settimane", margine: 60, note: "Buona rotazione per donna. Meno margine ma veloce.", source: "Outlet, Saldi", prezzo: "5-18€" },
  { name: "H&M", domanda: 2, velocita: "2-4 settimane", margine: 50, note: "Serve prezzo bassissimo. Conviene solo in lotti da 3+ pezzi.", source: "Saldi, Stock", prezzo: "3-10€" },
];

export const TIPS = [
  { num: "01", title: "Arbitraggio tra piattaforme", desc: "Compra su FB Marketplace da privati (prezzi bassi, zero commissioni) e rivendi su Vinted dove il pubblico è più ampio.", icon: "🔄" },
  { num: "02", title: "Foto che vendono", desc: "Sfondo bianco o neutro, luce naturale, mostra etichette. Gli annunci con 4+ foto si vendono il doppio più veloci.", icon: "📸" },
  { num: "03", title: "Il trucco delle misure", desc: "Misure esatte in cm nella descrizione. Riduce i resi e aumenta la fiducia dell'acquirente.", icon: "📏" },
  { num: "04", title: "Lotti strategici", desc: "Raggruppa articoli lenti: '3 maglie M', 'Kit running donna'. Si vendono insieme a prezzo conveniente.", icon: "📦" },
  { num: "05", title: "Stagionalità", desc: "Cappotti in ottobre, costumi a maggio, maglioni a settembre. Stagione giusta = vendita in pochi giorni.", icon: "🗓" },
  { num: "06", title: "Budget fisso e ROI", desc: "Fissa un budget mensile (es. 50€). Reinvesti solo i guadagni. Traccia ogni centesimo.", icon: "💰" },
  { num: "07", title: "Specializzati", desc: "Chi vende 'tutto' scompare. Chi vende solo sportswear vintage costruisce pubblico fedele e prezzi più alti.", icon: "🎯" },
  { num: "08", title: "Prezzo competitivo", desc: "Guarda 5 annunci simili già venduti. Mettiti 10-15% sotto per vendere subito. Velocità > margine.", icon: "⚡" },
  { num: "09", title: "Rilancia ogni 3 giorni", desc: "L'algoritmo di Vinted premia gli annunci aggiornati. Rilancia, modifica prezzo di 0.10€, aggiorna foto.", icon: "🔁" },
  { num: "10", title: "Spedizione veloce", desc: "Spedisci entro 24h. Le review positive sulla velocità attirano più acquirenti.", icon: "🚀" },
];

export const CATEGORIE = ["Abbigliamento", "Scarpe", "Accessori", "Borse", "Altro"];
export const FONTI = ["Primark", "Sinsay", "Zara", "H&M", "FB Marketplace", "Mercatino", "Thrift Shop", "Outlet", "Vinted", "Altro"];
export const TAGLIE = ["XS", "S", "M", "L", "XL", "XXL", "Unica", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
export const CONDIZIONI = ["Nuovo con etichette", "Nuovo senza etichette", "Ottime condizioni", "Buone condizioni", "Discrete condizioni"];
export const GENERI = ["Uomo", "Donna", "Unisex"];

export const PIE_COLORS = ["#d4f55e", "#60a5fa", "#c084fc", "#fb923c", "#f87171"];
