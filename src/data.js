/* ─── BRAND DATABASE ─── */
export const BRANDS = [
  { name: "Nike", type: "Sportswear", tags: ["hot","fast","sport"], margin: 85, note: "Felpe e tute spariscono in 1-3 giorni. Punta su taglie M/L.", source: "Primark, Mercatini, FB Marketplace", prezzo: "15-45€" },
  { name: "Adidas", type: "Sportswear", tags: ["hot","fast","sport"], margin: 80, note: "Trefoil e 3 stripes sempre richiesti. Ottimo su mercatini.", source: "Mercatini, Outlet", prezzo: "12-35€" },
  { name: "Zara", type: "Fast Fashion", tags: ["hot","fast"], margin: 70, note: "Ottimo rapporto costo/velocità di vendita. Cercare sconti -70%.", source: "Zara Outlet, Saldi", prezzo: "8-25€" },
  { name: "Ralph Lauren", type: "Preppy", tags: ["hot","vintage"], margin: 90, note: "Polo e felpe con logo reggono benissimo il prezzo anche usati.", source: "Mercatini, Thrift shops", prezzo: "20-60€" },
  { name: "Tommy Hilfiger", type: "Preppy", tags: ["hot","fast"], margin: 75, note: "Brand molto cercato, buona domanda su taglie M-XL uomo.", source: "Outlet, FB Marketplace", prezzo: "15-40€" },
  { name: "The North Face", type: "Outdoor", tags: ["hot","fast"], margin: 88, note: "Giacche e gilet a prezzi alti. Stagionalità importante.", source: "Mercatini, Vinted stessa", prezzo: "25-80€" },
  { name: "Levi's", type: "Denim", tags: ["hot","vintage"], margin: 78, note: "Jeans originali 501 e vintage anni 80/90 valgono molto.", source: "Thrift shops, Mercatini", prezzo: "10-35€" },
  { name: "Carhartt", type: "Workwear", tags: ["fast","vintage"], margin: 85, note: "Nicchia workwear in forte crescita. Difficile trovarlo a poco.", source: "Mercatini, Import USA", prezzo: "20-50€" },
  { name: "Mango", type: "Fast Fashion", tags: ["fast"], margin: 60, note: "Buona rotazione per donna. Meno margine ma veloce.", source: "Outlet, Saldi", prezzo: "5-18€" },
  { name: "H&M", type: "Fast Fashion", tags: ["fast"], margin: 50, note: "Serve prezzo di acquisto bassissimo. Lotti da 3+ pezzi.", source: "Saldi, Stock", prezzo: "3-10€" },
  { name: "Fendi", type: "Lusso", tags: ["luxury"], margin: 95, note: "Borse e accessori: margini alti ma capitali necessari.", source: "Privati, Aste", prezzo: "50-300€" },
  { name: "Gucci", type: "Lusso", tags: ["luxury"], margin: 95, note: "Brand più venduto in Italia su Vinted nel segmento luxury.", source: "Privati, Vintage shops", prezzo: "60-400€" },
  { name: "Dickies", type: "Workwear", tags: ["vintage","fast"], margin: 72, note: "Pantaloni cargo e giacche: domanda alta, reperibili a poco.", source: "Outlet, Mercatini", prezzo: "8-25€" },
  { name: "Stone Island", type: "Streetwear", tags: ["hot","luxury"], margin: 92, note: "Patch originale = vendita garantita. Attenzione ai falsi.", source: "Privati, Vinted", prezzo: "40-150€" },
  { name: "Burberry", type: "Lusso", tags: ["luxury","vintage"], margin: 90, note: "Sciarpe e trench iconici. Il vintage nova check è ricercatissimo.", source: "Thrift shops, Privati", prezzo: "30-200€" },
  { name: "New Balance", type: "Sportswear", tags: ["hot","fast","sport"], margin: 78, note: "Modelli 550 e 530 molto richiesti. Rivendi subito.", source: "Outlet, Saldi online", prezzo: "40-90€" },
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

export const TAG_CONFIG = {
  hot: { label: "🔥 Hot", bg: "#3d2e08", color: "#fbbf24", border: "#fbbf24" },
  fast: { label: "⚡ Veloce", bg: "#0d3320", color: "#4ade80", border: "#4ade80" },
  sport: { label: "🏃 Sport", bg: "#0d1f3c", color: "#60a5fa", border: "#60a5fa" },
  luxury: { label: "💎 Luxury", bg: "#1f0d3c", color: "#c084fc", border: "#c084fc" },
  vintage: { label: "🕰 Vintage", bg: "#3c200d", color: "#fb923c", border: "#fb923c" },
};

export const PIE_COLORS = ["#d4f55e", "#60a5fa", "#c084fc", "#fb923c", "#f87171"];
