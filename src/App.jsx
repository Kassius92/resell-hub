import { useState, useEffect, useCallback, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { RotateCcw, Search, Plus, Package, LayoutDashboard, Tag, BookOpen, Trash2, Check, Download, Info, ChevronDown, ChevronRight, ArrowLeft, Smartphone, ExternalLink, PlusCircle, Pencil, Lock, ChevronUp, ShoppingBag, TrendingUp, Zap, DollarSign, Clock } from "lucide-react";
import {
  BRANDS, GUIDA, CATEGORIE, FONTI, TAGLIE, CONDIZIONI, GENERI, PIE_COLORS, calcScore,
  TIPI_CAPO, BRAND_LIST, BRAND_INFO, COLORI, LOGO_TYPES, evaluateItem, recordSale, getRecommendations, getModelsForBrand
} from "./data";

/* ─── STORAGE ─── */
const STORAGE_KEY = "resell-hub-data";
const ARCHIVE_KEY = "resell-hub-archive";
const CUSTOM_BRANDS_KEY = "resell-hub-custom-brands";

function loadData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}
function saveData(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

/* ─── UTILS ─── */
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const formatEur = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "€";
const getMonthLabel = (s) => new Date(s).toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
const getMargin = (a) => (a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo) - a.costo;

const tooltipStyle = { background: "#1e1e23", border: "1px solid #3a3a44", borderRadius: 6, fontSize: 12, fontFamily: "'DM Mono', monospace" };

/* ─── TOOLTIP COMPONENT ─── */
function InfoTip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 4 }}>
      <span onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{ cursor: "pointer", color: "var(--dim)", display: "inline-flex" }}>
        <Info size={13} />
      </span>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
            background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8,
            padding: "10px 12px", fontSize: 11, color: "var(--text2)", lineHeight: 1.5,
            width: 220, zIndex: 51, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}>
            <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "var(--surface2)", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} />
            {text}
          </div>
        </>
      )}
    </span>
  );
}

/* ─── SORT SELECT ─── */
function SortSelect({ value, onChange, options }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)",
        fontSize: 10, padding: "5px 24px 5px 8px", borderRadius: 6, appearance: "none",
        fontFamily: "'DM Mono', monospace", cursor: "pointer", outline: "none",
      }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={12} style={{ position: "absolute", right: 6, pointerEvents: "none", color: "var(--dim)" }} />
    </div>
  );
}

/* ─── DEMAND DOTS ─── */
function DemandDots({ level }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {[1,2,3,4,5].map((i) => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i <= level ? (level >= 4 ? "var(--green)" : level >= 3 ? "var(--yellow)" : "var(--red)") : "var(--surface2)",
          border: `1px solid ${i <= level ? "transparent" : "var(--border)"}`,
        }} />
      ))}
    </span>
  );
}

/* ─── AUTOCOMPLETE INPUT ─── */
function AutocompleteInput({ value, onChange, options, placeholder, style }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const filtered = value.trim().length > 0
    ? options.filter(o => o.toLowerCase().includes(value.toLowerCase()))
    : options;
  const exactMatch = options.some(o => o.toLowerCase() === value.toLowerCase());

  useEffect(() => {
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { setFocused(true); setOpen(true); }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          ...style,
          borderColor: value.trim().length > 0 && !exactMatch ? "var(--red)" : focused ? "var(--accent)" : undefined,
        }}
      />
      {value.trim().length > 0 && !exactMatch && (
        <div style={{ fontSize: 9, color: "var(--red)", marginTop: 2 }}>Seleziona dalla lista</div>
      )}
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100,
          maxHeight: 180, overflowY: "auto",
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8,
          marginTop: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {filtered.map(o => (
            <div key={o}
              onMouseDown={(e) => { e.preventDefault(); onChange(o); setOpen(false); }}
              style={{
                padding: "8px 12px", fontSize: 12, cursor: "pointer",
                color: o.toLowerCase() === value.toLowerCase() ? "var(--accent)" : "var(--text)",
                background: o.toLowerCase() === value.toLowerCase() ? "rgba(212,245,94,0.1)" : "transparent",
              }}
              onMouseEnter={(e) => e.target.style.background = "var(--surface2)"}
              onMouseLeave={(e) => e.target.style.background = o.toLowerCase() === value.toLowerCase() ? "rgba(212,245,94,0.1)" : "transparent"}
            >{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [articles, setArticles] = useState(() => loadData(STORAGE_KEY));
  const [archive, setArchive] = useState(() => loadData(ARCHIVE_KEY));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("tutti");
  const [invSort, setInvSort] = useState("recente");
  const [brandSearch, setBrandSearch] = useState("");
  const [brandSort, setBrandSort] = useState("score");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandTab, setBrandTab] = useState("comprare");
  const [customBrands, setCustomBrands] = useState(() => loadData(CUSTOM_BRANDS_KEY));
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandForm, setBrandForm] = useState({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" });
  const [showReset, setShowReset] = useState(false);
  const [sellModal, setSellModal] = useState(null);
  const [sellPrice, setSellPrice] = useState("");
  const [toast, setToast] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [guidaStep, setGuidaStep] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const saveTimer = useRef(null);

  const [form, setForm] = useState({
    nome: "", brand: "", categoria: "Abbigliamento",
    costo: "", prezzo: "", fonte: "Primark", taglia: "M",
    condizione: "Nuovo con etichette", genere: "Unisex", note: ""
  });

  const [valutaForm, setValutaForm] = useState({
    brand: "", tipo: "", genere: "Uomo", taglia: "M",
    condizione: "Ottime condizioni", costoAcquisto: "", prezzoVendita: "", dettagli: "",
    fonte: "Mercatino", note: "", colore: "Nero", logo: "Logo grande"
  });
  const [valutaResult, setValutaResult] = useState(null);
  const [selectedRec, setSelectedRec] = useState(null);
  const [openAcquistaSections, setOpenAcquistaSections] = useState({"top": true});
  const [selectedAddBrand, setSelectedAddBrand] = useState(null);

  function runValutazione() {
    if (!valutaForm.brand.trim()) { showToast("Inserisci il brand!", "err"); return; }
    if (!BRAND_LIST.some(b => b.toLowerCase() === valutaForm.brand.toLowerCase())) { showToast("Brand non nel database! Seleziona dalla lista.", "err"); return; }
    if (!valutaForm.tipo.trim()) { showToast("Inserisci il tipo di capo!", "err"); return; }
    if (!TIPI_CAPO.some(t => t.toLowerCase() === valutaForm.tipo.toLowerCase())) { showToast("Tipo di capo non valido! Seleziona dalla lista.", "err"); return; }
    const result = evaluateItem(valutaForm);
    /* Se l'utente ha inserito il suo prezzo vendita, ricalcola margini con quello */
    const userPrice = parseFloat(valutaForm.prezzoVendita);
    if (userPrice > 0) {
      const costo = parseFloat(valutaForm.costoAcquisto) || 0;
      result.userPrice = userPrice;
      result.userMargin = Math.round((userPrice - costo) * 100) / 100;
      result.userMarginPct = costo > 0 ? Math.round((result.userMargin / costo) * 100) : null;
    }
    setValutaResult(result);
  }

  function addFromValuta() {
    if (!valutaResult) return;
    const nome = [valutaForm.brand, valutaForm.tipo, valutaForm.dettagli].filter(Boolean).join(" ").trim();
    const userPrice = parseFloat(valutaForm.prezzoVendita);
    const newArticle = {
      id: genId(), nome, brand: valutaForm.brand.trim(),
      categoria: ["Sneakers","Scarpe","Stivali","Sandali","Ciabatte/Slides"].includes(valutaForm.tipo) ? "Scarpe" :
                 ["Borsa","Zaino"].includes(valutaForm.tipo) ? "Borse" :
                 ["Cintura","Portafoglio","Sciarpa/Foulard","Cappello/Berretto","Occhiali da sole","Orologio","Gioielli/Bijoux"].includes(valutaForm.tipo) ? "Accessori" : "Abbigliamento",
      costo: parseFloat(valutaForm.costoAcquisto) || 0,
      prezzo: userPrice > 0 ? userPrice : Math.round((valutaResult.priceMin + valutaResult.priceMax) / 2),
      prezzoVendita: null, fonte: valutaForm.fonte, taglia: valutaForm.taglia,
      condizione: valutaForm.condizione, genere: valutaForm.genere,
      note: valutaForm.note || valutaForm.dettagli, venduto: false,
      data: new Date().toISOString().slice(0, 10),
    };
    setArticles(prev => [newArticle, ...prev]);
    showToast("Aggiunto all'inventario!");
  }

  // Auto-save
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveData(STORAGE_KEY, articles);
      saveData(ARCHIVE_KEY, archive);
      saveData(CUSTOM_BRANDS_KEY, customBrands);
    }, 300);
    return () => clearTimeout(saveTimer.current);
  }, [articles, archive, customBrands]);

  // PWA install prompt capture
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallBanner(false);
    } else {
      // Show manual banner after 2s even if event doesn't fire (for iOS)
      const t = setTimeout(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
        if (!isStandalone) setShowInstallBanner(true);
      }, 2000);
      return () => { clearTimeout(t); window.removeEventListener("beforeinstallprompt", handler); };
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === "accepted") setShowInstallBanner(false);
      setInstallPrompt(null);
    } else {
      // iOS fallback
      showToast("Tocca il menu del browser → 'Aggiungi a schermata Home'");
    }
  }

  const showToast = useCallback((msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  /* ─── ACTIONS ─── */
  function addArticle() {
    if (!form.nome.trim()) { showToast("Inserisci il nome!", "err"); return; }
    const newArt = {
      id: genId(), nome: form.nome.trim(), brand: form.brand.trim(),
      categoria: form.categoria, costo: parseFloat(form.costo) || 0,
      prezzo: parseFloat(form.prezzo) || 0, prezzoVendita: null,
      fonte: form.fonte, taglia: form.taglia, condizione: form.condizione,
      genere: form.genere, note: form.note, venduto: false,
      dataAcquisto: new Date().toISOString(), dataVendita: null,
    };
    setArticles((p) => [newArt, ...p]);
    setForm({ nome: "", brand: "", categoria: "Abbigliamento", costo: "", prezzo: "", fonte: "Primark", taglia: "M", condizione: "Nuovo con etichette", genere: "Unisex", note: "" });
    showToast("Articolo aggiunto!"); setTab("inventario");
  }

  function openSellModal(a) { setSellModal({ id: a.id, prezzoOriginale: a.prezzo }); setSellPrice(String(a.prezzo)); }

  function confirmSell() {
    const fp = parseFloat(sellPrice) || 0;
    const soldItem = articles.find(a => a.id === sellModal.id);
    if (soldItem) {
      recordSale({
        brand: soldItem.brand, tipo: soldItem.categoria,
        genere: soldItem.genere, taglia: soldItem.taglia,
        condizione: soldItem.condizione, soldPrice: fp,
      });
    }
    setArticles((p) => p.map((a) => a.id === sellModal.id ? { ...a, venduto: true, prezzoVendita: fp, dataVendita: new Date().toISOString() } : a));
    setSellModal(null); setSellPrice(""); showToast("Venduto! 🎉");
  }

  function deleteArticle(id) {
    const item = articles.find((a) => a.id === id);
    if (item?.venduto) setArchive((p) => [...p, item]);
    setArticles((p) => p.filter((a) => a.id !== id));
    showToast(item?.venduto ? "Archiviato (stats mantenute)" : "Eliminato", item?.venduto ? "ok" : "err");
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(ARCHIVE_KEY); localStorage.removeItem(CUSTOM_BRANDS_KEY);
    setArticles([]); setArchive([]); setCustomBrands([]); setShowReset(false); showToast("Tutto azzerato");
  }

  function saveCustomBrand() {
    if (!brandForm.name.trim()) { showToast("Inserisci il nome del brand!", "err"); return; }
    const b = {
      ...brandForm, name: brandForm.name.trim(), custom: true,
      id: editingBrand?.id || genId(),
      margine: parseInt(brandForm.margine) || 70,
      domanda: parseInt(brandForm.domanda) || 3,
      difficoltaNum: parseInt(brandForm.difficoltaNum) || 2,
      cosaMeglio: [], cosaEvitare: [],
      taglieTop: [], stagione: "", difficolta: "",
      rischioFalsi: "basso", controlloFalsi: ["Nessuna info — aggiungi le tue note"],
    };
    if (editingBrand) {
      setCustomBrands((p) => p.map((x) => x.id === editingBrand.id ? b : x));
      if (selectedBrand?.id === editingBrand.id) setSelectedBrand(b);
    } else {
      setCustomBrands((p) => [...p, b]);
    }
    setShowAddBrand(false); setEditingBrand(null);
    setBrandForm({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" });
    showToast(editingBrand ? "Brand aggiornato!" : "Brand aggiunto!");
  }

  function deleteCustomBrand(id) {
    setCustomBrands((p) => p.filter((b) => b.id !== id));
    setSelectedBrand(null);
    showToast("Brand eliminato", "err");
  }

  function startEditBrand(b) {
    setBrandForm({ name: b.name, domanda: b.domanda, velocita: b.velocita, margine: b.margine, difficoltaNum: b.difficoltaNum, note: b.note || "", source: b.source || "", prezzo: b.prezzo || "", prezzoVendita: b.prezzoVendita || "", consiglio: b.consiglio || "" });
    setEditingBrand(b); setShowAddBrand(true);
  }

  function exportCSV() {
    const all = [...articles, ...archive];
    if (!all.length) { showToast("Nessun dato", "err"); return; }
    const h = ["Nome","Brand","Categoria","Taglia","Condizione","Genere","Costo","Prezzo Listino","Prezzo Vendita","Margine","Margine%","Fonte","Stato","Data Acquisto","Data Vendita","Note"];
    const rows = all.map((a) => {
      const sp = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
      const m = sp - a.costo; const pct = a.costo > 0 ? ((m / a.costo) * 100).toFixed(1) : "0";
      return [a.nome,a.brand,a.categoria,a.taglia,a.condizione||"",a.genere||"",a.costo.toFixed(2),a.prezzo.toFixed(2),a.venduto?sp.toFixed(2):"",m.toFixed(2),pct+"%",a.fonte,a.venduto?"Venduto":"In vendita",a.dataAcquisto?new Date(a.dataAcquisto).toLocaleDateString("it-IT"):"",a.dataVendita?new Date(a.dataVendita).toLocaleDateString("it-IT"):"",a.note||""].map((v)=>`"${String(v).replace(/"/g,'""')}"`).join(",");
    });
    const csv = "\uFEFF" + [h.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const el = document.createElement("a"); el.href = url;
    el.download = `resell-hub-${new Date().toISOString().slice(0,10)}.csv`;
    el.click(); URL.revokeObjectURL(url); showToast("CSV scaricato!");
  }

  /* ─── COMPUTED ─── */
  const venduti = articles.filter((a) => a.venduto);
  const inVendita = articles.filter((a) => !a.venduto);
  const allSold = [...venduti, ...archive];
  const totGuadagno = allSold.reduce((s, a) => s + getMargin(a), 0);
  const totInvestito = allSold.reduce((s, a) => s + a.costo, 0);
  const totInvestitoTutto = articles.reduce((s, a) => s + a.costo, 0) + archive.reduce((s, a) => s + a.costo, 0);
  const roi = totInvestito > 0 ? ((totGuadagno / totInvestito) * 100).toFixed(0) : 0;

  const monthlyData = (() => {
    const m = {};
    allSold.forEach((a) => { const k = getMonthLabel(a.dataVendita || a.dataAcquisto); if (!m[k]) m[k] = { mese: k, profitto: 0 }; m[k].profitto += getMargin(a); });
    return Object.values(m).slice(-6);
  })();

  const catData = (() => {
    const c = {}; articles.forEach((a) => { c[a.categoria] = (c[a.categoria] || 0) + 1; });
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  })();

  const sourceData = (() => {
    const s = {};
    allSold.forEach((a) => { if (!s[a.fonte]) s[a.fonte] = { fonte: a.fonte, profitto: 0 }; s[a.fonte].profitto += getMargin(a); });
    return Object.values(s).sort((a, b) => b.profitto - a.profitto).slice(0, 5);
  })();

  // Filtered & sorted articles
  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    const ms = !search || a.nome.toLowerCase().includes(q) || a.brand.toLowerCase().includes(q);
    const mf = filter === "tutti" || (filter === "venduto" && a.venduto) || (filter === "in_vendita" && !a.venduto);
    return ms && mf;
  }).sort((a, b) => {
    if (invSort === "recente") return new Date(b.dataAcquisto) - new Date(a.dataAcquisto);
    if (invSort === "margine_alto") return getMargin(b) - getMargin(a);
    if (invSort === "margine_basso") return getMargin(a) - getMargin(b);
    if (invSort === "prezzo_alto") return b.prezzo - a.prezzo;
    if (invSort === "prezzo_basso") return a.prezzo - b.prezzo;
    if (invSort === "nome") return a.nome.localeCompare(b.nome);
    return 0;
  });

  // Sorted brands
  // All brands (built-in + custom)
  const allBrands = [...BRANDS, ...customBrands];

  const sortedBrands = [...allBrands].filter((b) => !brandSearch || b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .sort((a, b) => {
      if (brandSort === "score") return calcScore(b) - calcScore(a);
      if (brandSort === "margine") return b.margine - a.margine;
      if (brandSort === "domanda") return b.domanda - a.domanda;
      if (brandSort === "velocita") {
        const order = { "1-3 giorni": 1, "3-7 giorni": 2, "1-2 settimane": 3, "2-4 settimane": 4 };
        return (order[a.velocita] || 5) - (order[b.velocita] || 5);
      }
      return a.name.localeCompare(b.name);
    });

  const costoNum = parseFloat(form.costo) || 0;
  const prezzoNum = parseFloat(form.prezzo) || 0;
  const previewMargin = prezzoNum - costoNum;
  const previewPct = costoNum > 0 ? ((previewMargin / costoNum) * 100).toFixed(0) : null;

  /* ─── RENDER ─── */
  return (
    <div style={S.app}>
      {/* HEADER */}
      <header style={S.header}>
        <div>
          <h1 style={S.logo}>Resell Hub</h1>
          <span style={S.version}>Vinted Tracker v2.3</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={exportCSV} style={S.headerBtn} title="Esporta CSV"><Download size={15} /></button>
          <button onClick={() => setShowReset(true)} style={S.headerBtn} title="Azzera tutto"><RotateCcw size={15} /></button>
        </div>
      </header>

      {/* INSTALL BANNER */}
      {showInstallBanner && (
        <div style={S.installBanner}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <Smartphone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--text2)" }}>Installa Resell Hub come app</span>
          </div>
          <button onClick={handleInstall} style={S.installBtn}>Installa</button>
          <button onClick={() => setShowInstallBanner(false)} style={{ background: "none", border: "none", color: "var(--dim)", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>✕</button>
        </div>
      )}

      <main style={S.content}>
        {/* ═══ DASHBOARD ═══ */}
        {tab === "dashboard" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={S.statsRow}>
              <StatCard label="Articoli" value={articles.length} color="var(--accent)" />
              <StatCard label="Venduti" value={allSold.length} color="var(--green)" tip="Totale venduti (inclusi archiviati)" />
              <StatCard label="In vendita" value={inVendita.length} color="var(--yellow)" />
              <StatCard label="ROI" value={roi + "%"} color="#60a5fa" tip="Return on Investment: quanto guadagni per ogni euro investito" />
            </div>
            <div style={S.statsRow}>
              <BigStat label="Profitto netto" value={formatEur(totGuadagno)} color={totGuadagno >= 0 ? "var(--green)" : "var(--red)"} tip="Totale guadagni meno totale costi su tutti gli articoli venduti" />
              <BigStat label="Investito totale" value={totInvestitoTutto.toFixed(2) + "€"} color="var(--accent)" tip="Somma di tutti i costi di acquisto" />
            </div>
            {monthlyData.length > 0 && (
              <div style={S.card}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SectionTitle>Profitto mensile</SectionTitle>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <XAxis dataKey="mese" tick={{ fill: "#999", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#999", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#999" }} formatter={(v) => [v.toFixed(2) + "€", "Profitto"]} />
                    <Bar dataKey="profitto" radius={[3, 3, 0, 0]}>
                      {monthlyData.map((e, i) => <Cell key={i} fill={e.profitto >= 0 ? "#4ade80" : "#f87171"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {catData.length > 0 && (
                <div style={{ ...S.card, flex: "1 1 200px" }}>
                  <SectionTitle>Per categoria</SectionTitle>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart><Pie data={catData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" stroke="none">
                      {catData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie><Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [v, n]} /></PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {catData.map((c, i) => <span key={i} style={{ fontSize: 10, color: PIE_COLORS[i % PIE_COLORS.length] }}>● {c.name}</span>)}
                  </div>
                </div>
              )}
              {sourceData.length > 0 && (
                <div style={{ ...S.card, flex: "1 1 200px" }}>
                  <SectionTitle>Top fonti</SectionTitle>
                  {sourceData.map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < sourceData.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <span style={{ fontSize: 12, color: "var(--text2)" }}>{s.fonte}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--green)" }}>{formatEur(s.profitto)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {articles.length === 0 && <EmptyState icon="📦" title="Nessun articolo ancora" sub='Vai su "+" per aggiungere il tuo primo articolo' />}
          </div>
        )}

        {/* ═══ INVENTARIO ═══ */}
        {tab === "inventario" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca..." style={{ ...S.input, paddingLeft: 34 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[{ key: "tutti", label: "Tutti", c: articles.length }, { key: "in_vendita", label: "In vendita", c: inVendita.length }, { key: "venduto", label: "Venduti", c: venduti.length }].map((f) => (
                  <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>{f.label} ({f.c})</FilterChip>
                ))}
              </div>
              <SortSelect value={invSort} onChange={setInvSort} options={[
                { value: "recente", label: "Più recenti" }, { value: "margine_alto", label: "Margine ↑" },
                { value: "margine_basso", label: "Margine ↓" }, { value: "prezzo_alto", label: "Prezzo ↑" },
                { value: "prezzo_basso", label: "Prezzo ↓" }, { value: "nome", label: "Nome A-Z" },
              ]} />
            </div>
            {filtered.length === 0 ? <EmptyState icon="🔍" title="Nessun risultato" /> : filtered.map((a, i) => {
              const margin = getMargin(a);
              const base = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
              const pct = a.costo > 0 ? ((margin / a.costo) * 100).toFixed(0) : "∞";
              return (
                <div key={a.id} style={{ ...S.articleCard, animation: `slideUp 0.3s ease ${i * 0.02}s forwards`, opacity: 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={S.articleName}>{a.nome}</span>
                      <StatusBadge venduto={a.venduto} />
                    </div>
                    <div style={S.articleMeta}>
                      {a.brand && <span>{a.brand}</span>}
                      <span>·</span><span>{a.categoria}</span>
                      {a.taglia && <><span>·</span><span>{a.taglia}</span></>}
                      {a.condizione && <><span>·</span><span>{a.condizione}</span></>}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>
                      {a.fonte}
                      {a.venduto && a.prezzoVendita != null && a.prezzoVendita !== a.prezzo && (
                        <span style={{ color: "var(--yellow)", marginLeft: 6 }}>(listino {a.prezzo.toFixed(2)}€ → venduto {a.prezzoVendita.toFixed(2)}€)</span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: margin >= 0 ? "var(--green)" : "var(--red)" }}>{formatEur(margin)}</div>
                    <div style={{ fontSize: 10, color: "var(--dim)" }}>{a.costo.toFixed(2)}→{base.toFixed(2)} ({pct}%)</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                    {!a.venduto && <button onClick={() => openSellModal(a)} style={S.btnGreen} title="Vendi"><Check size={14} /></button>}
                    <button onClick={() => deleteArticle(a.id)} style={S.btnDel} title="Elimina"><Trash2 size={12} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ AGGIUNGI ═══ */}
        {tab === "aggiungi" && (
          <div style={{ animation: "fadeIn 0.3s ease", maxWidth: 500 }}>

            {/* ── STEP 1: BRAND ── */}
            {!selectedAddBrand && !valutaResult && (
              <div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Passo 1</div>
                  <div style={{ fontSize: 16, color: "var(--text)", fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>Che brand è?</div>
                </div>
                {BRAND_LIST.map((b, i) => {
                  const info = BRAND_INFO[b] || {};
                  return (
                    <div key={b} onClick={() => { setSelectedAddBrand(b); setValutaForm(p => ({ ...p, brand: b, tipo: "", dettagli: "" })); }}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 16px", background: "var(--surface)", border: "1px solid var(--border)",
                        borderRadius: 10, marginBottom: 8, cursor: "pointer", transition: "border-color 0.15s",
                        animation: `slideUp 0.2s ease ${i * 0.03}s forwards`, opacity: 0,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = info.color || "var(--accent)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: info.color || "var(--text)" }}>{b}</div>
                        <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>{info.desc || ""}</div>
                      </div>
                      <ChevronRight size={16} style={{ color: "var(--dim)", flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── STEP 2: MODELLO ── */}
            {selectedAddBrand && !valutaForm.tipo && !valutaForm.dettagli && !valutaResult && (() => {
              const { types, models } = getModelsForBrand(selectedAddBrand);
              const info = BRAND_INFO[selectedAddBrand] || {};

              /* Categorize models */
              const shoeWords = ["force","af1","dunk","air max","vapormax","cortez","blazer","huarache","react","waffle","pegasus","shox","monarch","jordan","samba","gazelle","superstar","stan smith","campus","forum","ultraboost","nmd","yeezy","spezial","handball","sl 72","country","ozweego","zx","continental"];
              const shoeModels = models.filter(m => shoeWords.some(w => m.id.includes(w)));
              const apparelModels = models.filter(m => !shoeWords.some(w => m.id.includes(w)));

              return (
                <div>
                  <button onClick={() => { setSelectedAddBrand(null); setValutaForm(p => ({ ...p, tipo: "", dettagli: "" })); }} style={S.backBtn}><ArrowLeft size={14} /> Tutti i brand</button>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Passo 2</div>
                    <div style={{ fontSize: 16, color: info.color || "var(--text)", fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>Cosa stai valutando di {selectedAddBrand}?</div>
                  </div>

                  {/* Sneakers models */}
                  {shoeModels.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>👟 Sneakers / Scarpe</div>
                      {shoeModels.map((m, i) => (
                        <div key={m.id} onClick={() => setValutaForm(p => ({ ...p, brand: selectedAddBrand, dettagli: m.name, tipo: "Sneakers" }))}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)",
                            borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "border-color 0.15s",
                            animation: `slideUp 0.15s ease ${i * 0.02}s forwards`, opacity: 0,
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = info.color || "var(--accent)"}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{m.name}</div>
                            {m.note && <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2, maxWidth: 240 }}>{m.note.split(".")[0]}</div>}
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{m.min}–{m.max}€</div>
                            {m.conf >= 85 && <div style={{ fontSize: 8, color: "var(--green)" }}>● Preciso</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Apparel models */}
                  {apparelModels.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>👕 Abbigliamento / Modelli</div>
                      {apparelModels.map((m, i) => (
                        <div key={m.id} onClick={() => {
                          /* Auto-detect tipo */
                          let autoTipo = types.length > 0 ? types[0].name : "Felpa";
                          const lk = m.id.toLowerCase();
                          if (lk.includes("fleece") || lk.includes("felpa") || lk.includes("hoodie") || lk.includes("weave") || lk.includes("windrunner")) autoTipo = "Felpa con cappuccio";
                          else if (lk.includes("jacket") || lk.includes("coat") || lk.includes("firebird") || lk.includes("beckenbauer") || lk.includes("sailing") || lk.includes("windbreaker")) autoTipo = "Giacca";
                          else if (lk.includes("jean") || lk.includes("501") || lk.includes("505") || lk.includes("511") || lk.includes("512") || lk.includes("517") || lk.includes("550") || lk.includes("ribcage") || lk.includes("double knee") || lk.includes("carpenter")) autoTipo = "Jeans";
                          else if (lk.includes("polo") || lk.includes("l.12")) autoTipo = "Polo";
                          else if (lk.includes("beanie") || lk.includes("cappell")) autoTipo = "Cappello/Berretto";
                          else if (lk.includes("vintage") || lk.includes("swoosh") || lk.includes("trefoil") || lk.includes("logo") || lk.includes("script")) autoTipo = "Felpa";
                          else if (lk.includes("bear") || lk.includes("oxford") || lk.includes("cable")) autoTipo = "Maglione";
                          else if (lk.includes("trucker") || lk.includes("sherpa") || lk.includes("harrington") || lk.includes("detroit") || lk.includes("chore") || lk.includes("active") || lk.includes("michigan")) autoTipo = "Giacca";
                          setValutaForm(p => ({ ...p, brand: selectedAddBrand, dettagli: m.name, tipo: autoTipo }));
                        }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)",
                            borderRadius: 8, marginBottom: 6, cursor: "pointer", transition: "border-color 0.15s",
                            animation: `slideUp 0.15s ease ${i * 0.02}s forwards`, opacity: 0,
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = info.color || "var(--accent)"}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                        >
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{m.name}</div>
                            {m.note && <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2, maxWidth: 240 }}>{m.note.split(".")[0]}</div>}
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{m.min}–{m.max}€</div>
                            {m.conf >= 85 && <div style={{ fontSize: 8, color: "var(--green)" }}>● Preciso</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generic types */}
                  <div>
                    <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>📦 Non trovo il modello — scegli per tipo</div>
                    {types.map((t, i) => (
                      <div key={t.id} onClick={() => setValutaForm(p => ({ ...p, brand: selectedAddBrand, tipo: t.name, dettagli: "" }))}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "9px 14px", background: "var(--surface)", border: "1px solid var(--border)",
                          borderRadius: 8, marginBottom: 5, cursor: "pointer",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                      >
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>{t.name}</span>
                        <span style={{ fontSize: 10, color: "var(--dim)", fontFamily: "'DM Mono', monospace" }}>{t.min}–{t.max}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── STEP 3: FORM ── */}
            {selectedAddBrand && (valutaForm.tipo || valutaForm.dettagli) && !valutaResult && (
              <div>
                <button onClick={() => setValutaForm(p => ({ ...p, tipo: "", dettagli: "" }))} style={S.backBtn}><ArrowLeft size={14} /> Scegli modello</button>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Passo 3</div>
                  <div style={{ fontSize: 16, color: "var(--text)", fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>Dettagli del pezzo</div>
                  <div style={{ fontSize: 12, color: "var(--accent)", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
                    {selectedAddBrand} → {valutaForm.dettagli || valutaForm.tipo}
                  </div>
                </div>
                <div style={S.card}>
                  {valutaForm.dettagli && (
                    <Field label="Tipo di capo">
                      <select value={valutaForm.tipo} onChange={(e) => setValutaForm(p => ({...p, tipo: e.target.value}))} style={S.input}>
                        {TIPI_CAPO.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  )}
                  <div style={S.formRow}>
                    <Field label="Genere"><select value={valutaForm.genere} onChange={(e) => setValutaForm(p => ({...p, genere: e.target.value}))} style={S.input}>{GENERI.map(g => <option key={g}>{g}</option>)}</select></Field>
                    <Field label="Taglia"><select value={valutaForm.taglia} onChange={(e) => setValutaForm(p => ({...p, taglia: e.target.value}))} style={S.input}>{TAGLIE.map(t => <option key={t}>{t}</option>)}</select></Field>
                  </div>
                  <div style={S.formRow}>
                    <Field label="Colore"><select value={valutaForm.colore} onChange={(e) => setValutaForm(p => ({...p, colore: e.target.value}))} style={S.input}>{COLORI.map(c => <option key={c}>{c}</option>)}</select></Field>
                    <Field label="Logo"><select value={valutaForm.logo} onChange={(e) => setValutaForm(p => ({...p, logo: e.target.value}))} style={S.input}>{LOGO_TYPES.map(l => <option key={l}>{l}</option>)}</select></Field>
                  </div>
                  <div style={S.formRow}>
                    <Field label="Condizione"><select value={valutaForm.condizione} onChange={(e) => setValutaForm(p => ({...p, condizione: e.target.value}))} style={S.input}>{CONDIZIONI.map(c => <option key={c}>{c}</option>)}</select></Field>
                    <Field label="Fonte"><select value={valutaForm.fonte} onChange={(e) => setValutaForm(p => ({...p, fonte: e.target.value}))} style={S.input}>{FONTI.map(f => <option key={f}>{f}</option>)}</select></Field>
                  </div>
                  <div style={S.formRow}>
                    <Field label="Prezzo acquisto (€)"><input type="number" value={valutaForm.costoAcquisto} onChange={(e) => setValutaForm(p => ({...p, costoAcquisto: e.target.value}))} placeholder="0.00" step="0.01" min="0" style={S.input} /></Field>
                    <Field label="Prezzo vendita (€)"><input type="number" value={valutaForm.prezzoVendita} onChange={(e) => setValutaForm(p => ({...p, prezzoVendita: e.target.value}))} placeholder="Stima auto" step="0.01" min="0" style={S.input} /></Field>
                  </div>
                  <Field label="Note (opzionale)">
                    <textarea value={valutaForm.note} onChange={(e) => setValutaForm(p => ({...p, note: e.target.value}))} placeholder="Difetti, dettagli extra..." rows={2} style={{ ...S.input, resize: "vertical", minHeight: 42 }} />
                  </Field>
                  <button onClick={runValutazione} style={{ ...S.addBtn, background: "var(--accent)", color: "#111" }}>🧠 Valuta</button>
                </div>
              </div>
            )}

            {/* ── STEP 4: RISULTATO ── */}
            {valutaResult && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <button onClick={() => { setValutaResult(null); setValutaForm(p => ({ ...p, tipo: "", dettagli: "", costoAcquisto: "", prezzoVendita: "", note: "" })); }} style={S.backBtn}>
                  <ArrowLeft size={14} /> {selectedAddBrand || "Indietro"}
                </button>

                <div style={{
                  background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
                  padding: 24, textAlign: "center", marginBottom: 14,
                }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{valutaResult.verdictIcon}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: valutaResult.verdictColor, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>{valutaResult.verdict}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{valutaResult.brand}{valutaForm.dettagli ? ` — ${valutaForm.dettagli}` : ` — ${valutaResult.tipo}`}</div>
                  <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{valutaForm.genere} · {valutaForm.taglia} · {valutaForm.colore} · {valutaForm.condizione}</div>
                </div>

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Stima rivendita</div>
                  <div style={{ fontSize: 32, fontWeight: 600, color: "var(--accent)", fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>{valutaResult.priceMin}€ — {valutaResult.priceMax}€</div>

                  {valutaResult.marginPctMin !== null && (
                    <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                      <div>
                        <div style={{ fontSize: 9, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Margine</div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: valutaResult.marginMin >= 0 ? "var(--green)" : "var(--red)" }}>
                          {valutaResult.marginMin >= 0 ? "+" : ""}{valutaResult.marginMin.toFixed(2)}€ / {valutaResult.marginMax >= 0 ? "+" : ""}{valutaResult.marginMax.toFixed(2)}€
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 9, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>ROI</div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: valutaResult.marginPctMin >= 50 ? "var(--green)" : valutaResult.marginPctMin >= 0 ? "var(--yellow)" : "var(--red)" }}>
                          {valutaResult.marginPctMin}% — {valutaResult.marginPctMax}%
                        </div>
                      </div>
                    </div>
                  )}

                  {valutaResult.userPrice > 0 && (
                    <div style={{ padding: "12px 0", borderTop: "1px solid var(--border)", marginBottom: 6 }}>
                      <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Il tuo prezzo</div>
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <span style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>{valutaResult.userPrice}€</span>
                        <div style={{ fontSize: 15, fontWeight: 600, color: valutaResult.userMargin >= 0 ? "var(--green)" : "var(--red)" }}>
                          {valutaResult.userMargin >= 0 ? "+" : ""}{valutaResult.userMargin.toFixed(2)}€
                          {valutaResult.userMarginPct !== null && ` (${valutaResult.userMarginPct}%)`}
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: "var(--dim)" }}>Affidabilità</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: valutaResult.confidence >= 70 ? "var(--green)" : valutaResult.confidence >= 50 ? "var(--yellow)" : "var(--red)" }}>{valutaResult.confidence}%</span>
                    </div>
                    <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${valutaResult.confidence}%`, height: "100%", borderRadius: 4, background: valutaResult.confidence >= 70 ? "var(--green)" : valutaResult.confidence >= 50 ? "var(--yellow)" : "var(--red)", transition: "width 0.5s" }} />
                    </div>
                  </div>
                </div>

                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Analisi</div>
                  {valutaResult.indicators.map((ind, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, marginTop: 4, background: ind.color === "green" ? "var(--green)" : ind.color === "red" ? "var(--red)" : "var(--yellow)" }} />
                      <span style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.5 }}>{ind.label}</span>
                    </div>
                  ))}
                </div>

                <a href={valutaResult.vintedUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 16px", borderRadius: 10, background: "rgba(0,191,165,0.12)",
                  border: "1px solid rgba(0,191,165,0.3)", color: "#00bfa5", fontSize: 13,
                  fontWeight: 500, textDecoration: "none", fontFamily: "'DM Mono', monospace", marginBottom: 14,
                }}>
                  <Search size={15} /> Verifica su Vinted <ExternalLink size={12} />
                </a>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={addFromValuta} style={{ ...S.addBtn, flex: 1, background: "var(--accent)", color: "#111", fontSize: 13 }}>
                    <Package size={14} /> Inventario
                  </button>
                  <button onClick={() => { setValutaResult(null); setValutaForm(p => ({ ...p, tipo: "", dettagli: "", costoAcquisto: "", prezzoVendita: "", note: "" })); }} style={{
                    ...S.addBtn, flex: 1, background: "transparent", border: "1px solid var(--border)", color: "var(--muted)", fontSize: 13,
                  }}>Valuta un altro</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ COSA COMPRARE ═══ */}
        {tab === "acquista" && (() => {
          const rec = getRecommendations();
          const sections = [
            { key: "top", title: `Top acquisti — ${rec.monthName}`, icon: "🏆", desc: "I pezzi migliori da comprare adesso.", items: rec.topPicks },
            { key: "hot", title: "In stagione adesso", icon: "🔥", desc: "Si vendono velocemente in questo periodo.", items: rec.hotNow },
            { key: "prepare", title: "Prepara il prossimo mese", icon: "📅", desc: "Compra ora a poco — la domanda sta per salire.", items: rec.prepareNext },
            { key: "budget", title: "Budget basso", icon: "💰", desc: "Pezzi sotto 15€ con buon margine.", items: rec.budgetPicks },
            { key: "margin", title: "Margini più alti", icon: "📈", desc: "Potenziale massimo.", items: rec.highMargin },
            { key: "offseason", title: "Fuori stagione — fai scorta", icon: "🧊", desc: "Comprali a poco ora, vendili quando torna la domanda.", items: rec.offSeason },
          ].filter(s => s.items.length > 0);

          /* Detail view for selected recommendation */
          if (selectedRec) {
            const r = selectedRec;
            const tierLabels = { "streetwear": "Streetwear", "classic": "Classico", "luxury": "Luxury", "outdoor": "Outdoor/Sportivo", "fast-fashion": "Fast Fashion", "unknown": "Altro" };
            return (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <button onClick={() => setSelectedRec(null)} style={S.backBtn}><ArrowLeft size={14} /> Tutte le raccomandazioni</button>

                {/* Header */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>{r.brand}</div>
                      <div style={{ fontSize: 13, color: "var(--accent)", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{r.tipo}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 24, fontWeight: 600, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>{r.priceMin}€ — {r.priceMax}€</div>
                      <div style={{ fontSize: 9, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1 }}>prezzo rivendita</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(212,245,94,0.12)", color: "var(--accent)" }}>{tierLabels[r.tier] || r.tier}</span>
                    {r.isHot && <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(74,222,128,0.12)", color: "var(--green)" }}>● In stagione</span>}
                    {r.isNear && <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(251,191,36,0.12)", color: "var(--yellow)" }}>● Quasi in stagione</span>}
                    {r.fakeRisk === "alto" && <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(248,113,113,0.12)", color: "var(--red)" }}>⚠️ Rischio falsi alto</span>}
                    <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "var(--surface2)", color: "var(--muted)" }}>Budget {r.budget}</span>
                  </div>
                </div>

                {/* Perché comprarlo */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Perché comprarlo</div>
                  {r.reasons.map((reason, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <span style={{ color: "var(--accent)", fontSize: 12, marginTop: 1 }}>→</span>
                      <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{reason}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 10, color: "var(--dim)" }}>Domanda:</span>
                    <span style={{ display: "inline-flex", gap: 3 }}>
                      {[1,2,3,4,5].map(d => (<span key={d} style={{ width: 8, height: 8, borderRadius: "50%", background: d <= r.demand ? (r.demand >= 4 ? "var(--green)" : r.demand >= 3 ? "var(--yellow)" : "var(--red)") : "var(--surface2)" }} />))}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 4 }}>{r.demand >= 5 ? "Altissima" : r.demand >= 4 ? "Alta" : r.demand >= 3 ? "Media" : "Bassa"}</span>
                  </div>
                </div>

                {/* Dove comprare */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Dove comprare</div>
                  {r.sources.map((src, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text)" }}>{src}</span>
                    </div>
                  ))}
                </div>

                {/* Consigli pratici */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Consigli pratici</div>
                  {r.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: "var(--accent)", marginTop: 1 }}>💡</span>
                      <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{tip}</span>
                    </div>
                  ))}
                </div>

                {/* Azioni */}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => {
                    setValutaForm(p => ({ ...p, brand: r.brand, tipo: r.tipo }));
                    setValutaResult(null); setSelectedRec(null); setTab("aggiungi");
                  }} style={{ ...S.addBtn, flex: 1, background: "var(--accent)", color: "#111", fontSize: 13 }}>
                    🧠 Valuta questo pezzo
                  </button>
                  <a href={`https://www.vinted.it/catalog?search_text=${encodeURIComponent(r.brand + " " + r.tipo)}&order=relevance`} target="_blank" rel="noopener noreferrer" style={{
                    ...S.addBtn, flex: 1, background: "rgba(0,191,165,0.12)", border: "1px solid rgba(0,191,165,0.3)",
                    color: "#00bfa5", fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <Search size={14} /> Cerca su Vinted
                  </a>
                </div>
              </div>
            );
          }

          /* List view with accordions */
          return (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Cosa comprare</div>
                <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>Raccomandazioni per {rec.monthName}</div>
              </div>

              {sections.map((sec) => {
                const isOpen = openAcquistaSections[sec.key] || false;
                return (
                  <div key={sec.key} style={{ marginBottom: 10 }}>
                    <button onClick={() => setOpenAcquistaSections(p => ({ ...p, [sec.key]: !isOpen }))} style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: isOpen ? "10px 10px 0 0" : 10, cursor: "pointer",
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{sec.icon}</span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{sec.title}</div>
                          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>{sec.desc} ({sec.items.length})</div>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp size={16} style={{ color: "var(--dim)" }} /> : <ChevronDown size={16} style={{ color: "var(--dim)" }} />}
                    </button>

                    {isOpen && (
                      <div style={{ border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                        {sec.items.map((item, i) => (
                          <div key={`${item.brand}-${item.tipo}-${i}`}
                            onClick={() => setSelectedRec(item)}
                            style={{
                              padding: "12px 14px", cursor: "pointer",
                              borderBottom: i < sec.items.length - 1 ? "1px solid var(--border)" : "none",
                              background: "var(--surface)",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface2)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "var(--surface)"}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{item.brand}</span>
                                  <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{item.tipo}</span>
                                </div>
                                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 10, color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>{item.priceMin}€–{item.priceMax}€</span>
                                  <span style={{ display: "inline-flex", gap: 2 }}>
                                    {[1,2,3,4,5].map(d => (<span key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: d <= item.demand ? (item.demand >= 4 ? "var(--green)" : "var(--yellow)") : "var(--surface2)" }} />))}
                                  </span>
                                  {item.fakeRisk === "alto" && <span style={{ fontSize: 9, color: "var(--red)" }}>⚠️</span>}
                                  {item.isHot && <span style={{ fontSize: 9, color: "var(--green)" }}>●</span>}
                                </div>
                              </div>
                              <ChevronRight size={14} style={{ color: "var(--dim)", flexShrink: 0 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* ═══ STRATEGIE ═══ */}
        {tab === "tips" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {guidaStep === null ? (
              /* ── STEP LIST ── */
              <div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>Percorso Reseller</div>
                  <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>11 passi — dal primo acquisto alla crescita</div>
                </div>
                {GUIDA.map((g, i) => (
                  <div key={g.step}
                    onClick={() => !g.locked && setGuidaStep(g.step)}
                    style={{
                      ...S.brandRow,
                      display: "flex", alignItems: "center", gap: 14,
                      cursor: g.locked ? "default" : "pointer",
                      animation: `slideUp 0.3s ease ${i * 0.04}s forwards`, opacity: 0,
                      ...(g.locked && { opacity: 0.45, animation: "none" }),
                    }}>
                    <span style={{ fontSize: 28, filter: g.locked ? "grayscale(1)" : "none" }}>{g.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>PASSO {String(g.step).padStart(2, "0")}</span>
                        {g.locked && <Lock size={11} style={{ color: "var(--dim)" }} />}
                        {!g.locked && g.sections.length > 0 && <span style={{ fontSize: 9, background: "rgba(212,245,94,0.15)", color: "var(--accent)", padding: "2px 6px", borderRadius: 4 }}>DISPONIBILE</span>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: g.locked ? "var(--dim)" : "var(--text)" }}>{g.title}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>{g.desc}</div>
                    </div>
                    {!g.locked && <ChevronRight size={16} style={{ color: "var(--dim)", flexShrink: 0 }} />}
                  </div>
                ))}
                <div style={{ textAlign: "center", padding: "20px 0 10px", fontSize: 11, color: "var(--dim)", lineHeight: 1.5 }}>
                  🔒 I passi bloccati saranno sbloccati nei prossimi aggiornamenti.
                </div>
              </div>
            ) : (
              /* ── STEP DETAIL ── */
              (() => {
                const step = GUIDA.find((g) => g.step === guidaStep);
                if (!step) return null;
                return (
                  <div>
                    <button onClick={() => { setGuidaStep(null); setOpenSections({}); }} style={S.backBtn}>
                      <ArrowLeft size={14} /> Tutti i passi
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <span style={{ fontSize: 36 }}>{step.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, color: "var(--accent)", fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>PASSO {String(step.step).padStart(2, "0")}</div>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>{step.title}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                      {step.desc}
                    </div>

                    {step.sections.map((sec, si) => {
                      const isOpen = openSections[sec.id] !== undefined ? openSections[sec.id] : si === 0;
                      return (
                        <div key={sec.id} style={{
                          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
                          marginBottom: 10, overflow: "hidden",
                          animation: `slideUp 0.3s ease ${si * 0.06}s forwards`, opacity: 0,
                        }}>
                          <button
                            onClick={() => setOpenSections((prev) => ({ ...prev, [sec.id]: !isOpen }))}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "14px 16px", background: "none", border: "none", cursor: "pointer",
                              fontFamily: "'DM Mono', monospace",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{
                                width: 24, height: 24, borderRadius: "50%",
                                background: isOpen ? "var(--accent)" : "var(--surface2)",
                                color: isOpen ? "#000" : "var(--dim)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 11, fontWeight: 600, flexShrink: 0,
                                transition: "all 0.2s",
                              }}>{si + 1}</span>
                              <span style={{ fontSize: 13, fontWeight: 500, color: isOpen ? "var(--text)" : "var(--muted)", textAlign: "left" }}>
                                {sec.title}
                              </span>
                            </div>
                            {isOpen ? <ChevronUp size={14} style={{ color: "var(--dim)", flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: "var(--dim)", flexShrink: 0 }} />}
                          </button>
                          {isOpen && (
                            <div style={{ padding: "0 16px 16px", animation: "fadeIn 0.2s ease" }}>
                              {sec.content.map((para, pi) => (
                                <p key={pi} style={{
                                  fontSize: 12, color: "var(--muted)", lineHeight: 1.7, margin: 0,
                                  marginBottom: pi < sec.content.length - 1 ? 12 : 0,
                                  ...(para.match(/^[A-Z\d][\w\s&—]+\s—\s/) ? {
                                    background: "var(--surface2)", padding: "10px 12px", borderRadius: 8, borderLeft: "3px solid var(--accent)",
                                  } : {}),
                                  ...(para.match(/^(STEP [A-C]|[1-4])\.\s|^[1-4]\.\s/) ? {
                                    paddingLeft: 8,
                                  } : {}),
                                }}>
                                  {para}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Navigation between steps */}
                    <div style={{ display: "flex", gap: 10, marginTop: 20, paddingBottom: 10 }}>
                      {step.step > 1 && (
                        <button onClick={() => { setGuidaStep(step.step - 1); setOpenSections({}); window.scrollTo(0,0); }}
                          style={{ flex: 1, padding: "12px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)", fontSize: 11, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>
                          ← Passo {step.step - 1}
                        </button>
                      )}
                      {step.step < GUIDA.length && !GUIDA[step.step]?.locked && (
                        <button onClick={() => { setGuidaStep(step.step + 1); setOpenSections({}); window.scrollTo(0,0); }}
                          style={{ flex: 1, padding: "12px", background: "var(--accent)", border: "none", color: "#000", fontSize: 11, fontWeight: 600, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>
                          Passo {step.step + 1} →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
      </main>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav" style={S.bottomNav}>
        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Home" },
          { id: "inventario", icon: Package, label: "Inventario" },
          { id: "aggiungi", icon: Plus, label: "Aggiungi", accent: true },
          { id: "acquista", icon: ShoppingBag, label: "Acquista" },
          { id: "tips", icon: BookOpen, label: "Guida" },
        ].map((t) => {
          const Icon = t.icon; const isActive = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              ...S.navItem, color: isActive ? "var(--accent)" : t.accent ? "var(--accent)" : "var(--dim)",
              background: isActive ? "rgba(212,245,94,0.08)" : "transparent",
            }}>
              <Icon size={t.accent ? 22 : 18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span style={{ fontSize: 9, letterSpacing: 0.5 }}>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* SELL MODAL */}
      {sellModal && (
        <div style={S.overlay} onClick={() => { setSellModal(null); setSellPrice(""); }}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💰</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>A quanto l'hai venduto?</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>Listino: {sellModal.prezzoOriginale.toFixed(2)}€ — cambia se hai contrattato.</div>
            <input type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="Prezzo effettivo" step="0.01" min="0" style={{ ...S.input, textAlign: "center", fontSize: 18, fontWeight: 500, padding: 12, marginBottom: 16 }} autoFocus />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setSellModal(null); setSellPrice(""); }} style={S.modalCancel}>Annulla</button>
              <button onClick={confirmSell} style={S.modalConfirm}>Conferma vendita</button>
            </div>
          </div>
        </div>
      )}

      {/* RESET MODAL */}
      {showReset && (
        <div style={S.overlay} onClick={() => setShowReset(false)}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>Azzerare tutto?</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20, lineHeight: 1.5 }}>Tutti gli articoli, archivio e statistiche verranno eliminati. Non è possibile annullare.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowReset(false)} style={S.modalCancel}>Annulla</button>
              <button onClick={handleReset} style={S.modalDanger}>Sì, azzera tutto</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ ...S.toast, background: toast.type === "err" ? "#301818" : "#183018", borderColor: toast.type === "err" ? "#f8717144" : "#4ade8044" }}>{toast.msg}</div>
      )}
    </div>
  );
}

/* ─── SUB COMPONENTS ─── */
function StatCard({ label, value, color, tip }) {
  return (
    <div style={S.statCard}>
      <div style={{ fontSize: 22, fontWeight: 500, color, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {label}{tip && <InfoTip text={tip} />}
      </div>
    </div>
  );
}

function BigStat({ label, value, color, tip }) {
  return (
    <div style={{ ...S.card, flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {label}{tip && <InfoTip text={tip} />}
      </div>
      <div style={{ fontSize: 32, fontWeight: 500, color, fontFamily: "'Playfair Display', serif" }}>{value}</div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{children}</div>;
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 14, flex: 1 }}>
      <label style={S.label}>{label}{required && <span style={{ color: "var(--red)" }}> *</span>}</label>
      {children}
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px", fontSize: 10, border: "1px solid",
      borderColor: active ? "var(--accent)" : "var(--border)",
      background: active ? "var(--accent)" : "var(--surface)",
      color: active ? "#000" : "var(--muted)", fontWeight: active ? 500 : 400,
      borderRadius: 20, cursor: "pointer", letterSpacing: 0.5, transition: "all 0.15s",
      whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace",
    }}>{children}</button>
  );
}

function StatusBadge({ venduto }) {
  return (
    <span style={{
      fontSize: 9, padding: "2px 7px", borderRadius: 3, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap",
      ...(venduto
        ? { background: "#0d3320", color: "var(--green)", border: "1px solid rgba(74,222,128,0.25)" }
        : { background: "#33300d", color: "var(--yellow)", border: "1px solid rgba(251,191,36,0.25)" }),
    }}>{venduto ? "✓ Venduto" : "In vendita"}</span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
      <span style={{ fontSize: 11, color: "var(--dim)", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 11, color: "var(--text2)", textAlign: "right", marginLeft: 12 }}>{value}</span>
    </div>
  );
}

function EmptyState({ icon, title, sub }) {
  return (
    <div style={S.emptyState}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--dim)" }}>{sub}</div>}
    </div>
  );
}

/* ─── STYLES ─── */
const S = {
  app: { background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Mono', monospace", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 600, margin: "0 auto", position: "relative" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 18px 14px", borderBottom: "1px solid var(--border)" },
  logo: { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, color: "var(--accent)", letterSpacing: -1, lineHeight: 1 },
  version: { fontSize: 9, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase" },
  headerBtn: { width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" },
  installBanner: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "var(--surface)", borderBottom: "1px solid var(--border)" },
  installBtn: { padding: "6px 14px", fontSize: 11, fontWeight: 500, background: "var(--accent)", color: "#000", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" },
  content: { flex: 1, padding: "18px 16px", paddingBottom: 90, overflowY: "auto" },
  statsRow: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  statCard: { flex: "1 1 0", minWidth: 80, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "14px 12px", textAlign: "center" },
  card: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 16, marginBottom: 12 },
  input: { width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", fontFamily: "'DM Mono', monospace", fontSize: 12, padding: "10px 12px", borderRadius: 6, outline: "none", transition: "border-color 0.15s" },
  label: { display: "block", fontSize: 10, letterSpacing: 1, color: "var(--dim)", textTransform: "uppercase", marginBottom: 5 },
  formRow: { display: "flex", gap: 12 },
  marginPreview: { display: "flex", justifyContent: "space-between", fontSize: 12, padding: "10px 14px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 6, marginBottom: 14 },
  addBtn: { width: "100%", padding: "14px", background: "var(--accent)", color: "#000", border: "none", fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", borderRadius: 8, marginTop: 4 },
  articleCard: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 6 },
  articleName: { fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  articleMeta: { fontSize: 10, color: "var(--dim)", display: "flex", gap: 5, flexWrap: "wrap" },
  btnGreen: { width: 28, height: 28, borderRadius: 6, border: "none", background: "var(--green)", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  btnDel: { width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--dim)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  brandRow: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 14, marginBottom: 8, transition: "border-color 0.15s" },
  backBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--muted)", fontSize: 12, cursor: "pointer", padding: "4px 0", marginBottom: 16, fontFamily: "'DM Mono', monospace" },
  detailMetric: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 14 },
  detailMetricLabel: { fontSize: 9, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  metricBox: { flex: "1 1 0", minWidth: 90 },
  metricLabel: { fontSize: 9, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "flex", alignItems: "center" },
  tipsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 },
  tipCard: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: 16 },
  tipNum: { fontSize: 10, color: "var(--accent)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" },
  bottomNav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 600, display: "flex", background: "rgba(21,21,24,0.95)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", padding: "6px 8px 10px", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 4px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 8, transition: "all 0.15s", fontFamily: "'DM Mono', monospace" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20, animation: "fadeIn 0.2s ease" },
  modal: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 28, textAlign: "center", maxWidth: 360, width: "100%", animation: "slideUp 0.3s ease" },
  modalCancel: { flex: 1, padding: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--muted)", fontSize: 12, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace" },
  modalDanger: { flex: 1, padding: 10, border: "none", background: "var(--red)", color: "#000", fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace" },
  modalConfirm: { flex: 1, padding: 10, border: "none", background: "var(--green)", color: "#000", fontSize: 12, fontWeight: 500, borderRadius: 8, cursor: "pointer", fontFamily: "'DM Mono', monospace" },
  toast: { position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", padding: "10px 20px", borderRadius: 10, fontSize: 12, border: "1px solid", zIndex: 300, animation: "toastIn 0.3s ease", backdropFilter: "blur(10px)", fontFamily: "'DM Mono', monospace", color: "var(--text)", whiteSpace: "nowrap" },
  emptyState: { textAlign: "center", padding: 40, color: "var(--dim)", border: "1px dashed var(--border)", borderRadius: 10, marginTop: 20 },
};
