# 📦 Resell Hub — Vinted Tracker v2.0

Un tracker completo per gestire il reselling su Vinted. Dashboard con grafici, inventario con ricerca e filtri, guida brand e strategie.

![Resell Hub](https://img.shields.io/badge/Vite-React-c8f05a?style=flat-square) ![Version](https://img.shields.io/badge/v2.0-stable-4ade80?style=flat-square)

## 🚀 Quick Start

```bash
# Clona il repo
git clone https://github.com/TUO-USERNAME/resell-hub.git
cd resell-hub

# Installa dipendenze
npm install

# Avvia in locale
npm run dev
```

Apri `http://localhost:3000` nel browser.

## 📱 Funzionalità

- **Dashboard** — Profitto netto, ROI, grafici mensili, breakdown categorie, classifica fonti
- **Inventario** — Tutti gli articoli con ricerca, filtri (tutti/in vendita/venduti), margine per ogni pezzo
- **Aggiungi** — Form completo con preview margine in tempo reale
- **Brand Guide** — 16 brand analizzati con tag, margine atteso, dove trovarli, fascia prezzo
- **Strategie** — 10 tips pratiche per vendere meglio
- **Auto-save** — Salvataggio automatico in localStorage
- **Reset** — Un bottone per azzerare tutto

## 🌐 Deploy su Vercel (gratis)

1. Pusha il progetto su GitHub
2. Vai su [vercel.com](https://vercel.com) → "Import Project"
3. Seleziona il repo → Deploy automatico

Ogni push su `main` aggiorna il sito automaticamente.

## 📂 Struttura

```
resell-hub/
├── index.html          # Entry point HTML
├── package.json        # Dipendenze
├── vite.config.js      # Config Vite
└── src/
    ├── main.jsx        # Bootstrap React
    ├── index.css       # Stili globali
    ├── App.jsx         # Componente principale
    └── data.js         # Database brand, tips, costanti
```

## 🛠 Tech Stack

- **React 18** — UI components
- **Vite 5** — Build tool
- **Recharts** — Grafici
- **Lucide React** — Icone
- **localStorage** — Persistenza dati

## 🔮 Roadmap

- [ ] Supabase backend (auth + database cloud)
- [ ] PWA (installabile su telefono)
- [ ] Export CSV dei dati
- [ ] Notifiche prezzo (price alerts)
- [ ] Multi-piattaforma (Wallapop, Subito)

---

Made with ☕ for the Vinted reselling community.
