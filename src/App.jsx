import { useState, useEffect, useCallback, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { RotateCcw, Search, Plus, Package, LayoutDashboard, Tag, BookOpen, Trash2, Check, Download, Info, ChevronDown, ChevronRight, ArrowLeft, Smartphone, ExternalLink, PlusCircle, Pencil, Lock, ChevronUp } from "lucide-react";
import {
  BRANDS, GUIDA, CATEGORIE, FONTI, TAGLIE, CONDIZIONI, GENERI, PIE_COLORS, calcScore
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
            <SectionTitle>Nuovo articolo</SectionTitle>
            <div style={S.card}>
              <Field label="Nome articolo" required>
                <input value={form.nome} onChange={(e) => setForm((p) => ({...p, nome: e.target.value}))} placeholder="es. Felpa Nike L" style={S.input} />
              </Field>
              <div style={S.formRow}>
                <Field label="Brand"><input value={form.brand} onChange={(e) => setForm((p) => ({...p, brand: e.target.value}))} placeholder="Nike" style={S.input} /></Field>
                <Field label="Taglia"><select value={form.taglia} onChange={(e) => setForm((p) => ({...p, taglia: e.target.value}))} style={S.input}>{TAGLIE.map((t) => <option key={t}>{t}</option>)}</select></Field>
              </div>
              <div style={S.formRow}>
                <Field label="Condizione"><select value={form.condizione} onChange={(e) => setForm((p) => ({...p, condizione: e.target.value}))} style={S.input}>{CONDIZIONI.map((c) => <option key={c}>{c}</option>)}</select></Field>
                <Field label="Genere"><select value={form.genere} onChange={(e) => setForm((p) => ({...p, genere: e.target.value}))} style={S.input}>{GENERI.map((g) => <option key={g}>{g}</option>)}</select></Field>
              </div>
              <div style={S.formRow}>
                <Field label="Categoria"><select value={form.categoria} onChange={(e) => setForm((p) => ({...p, categoria: e.target.value}))} style={S.input}>{CATEGORIE.map((c) => <option key={c}>{c}</option>)}</select></Field>
                <Field label="Fonte acquisto"><select value={form.fonte} onChange={(e) => setForm((p) => ({...p, fonte: e.target.value}))} style={S.input}>{FONTI.map((f) => <option key={f}>{f}</option>)}</select></Field>
              </div>
              <div style={S.formRow}>
                <Field label="Costo acquisto (€)"><input type="number" value={form.costo} onChange={(e) => setForm((p) => ({...p, costo: e.target.value}))} placeholder="0.00" step="0.01" min="0" style={S.input} /></Field>
                <Field label="Prezzo vendita (€)"><input type="number" value={form.prezzo} onChange={(e) => setForm((p) => ({...p, prezzo: e.target.value}))} placeholder="0.00" step="0.01" min="0" style={S.input} /></Field>
              </div>
              {(form.costo || form.prezzo) && (
                <div style={S.marginPreview}>
                  <span style={{ color: "var(--muted)" }}>Margine previsto:</span>
                  <span style={{ fontWeight: 500, color: previewMargin >= 0 ? "var(--green)" : "var(--red)" }}>
                    {formatEur(previewMargin)}{previewPct !== null && ` (${previewPct}%)`}
                  </span>
                </div>
              )}
              <Field label="Note (opzionale)">
                <textarea value={form.note} onChange={(e) => setForm((p) => ({...p, note: e.target.value}))} placeholder="es. Etichetta presente, piccolo difetto..." rows={2} style={{ ...S.input, resize: "vertical", minHeight: 48 }} />
              </Field>
              <button onClick={addArticle} style={S.addBtn}>+ Aggiungi articolo</button>
            </div>
          </div>
        )}

        {/* ═══ BRAND GUIDE ═══ */}
        {tab === "brands" && !selectedBrand && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
                <input value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="Cerca brand..." style={{ ...S.input, paddingLeft: 34 }} />
              </div>
              <SortSelect value={brandSort} onChange={setBrandSort} options={[
                { value: "score", label: "Punteggio ↑" }, { value: "margine", label: "Margine ↑" }, { value: "domanda", label: "Domanda ↑" },
                { value: "velocita", label: "Più veloci" }, { value: "nome", label: "Nome A-Z" },
              ]} />
            </div>

            {sortedBrands.map((b, i) => (
              <div key={b.custom ? b.id : b.name} onClick={() => setSelectedBrand(b)} style={{ ...S.brandRow, cursor: "pointer", animation: `slideUp 0.25s ease ${i * 0.03}s forwards`, opacity: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{b.name}</span>
                      {b.custom && <span style={{ fontSize: 8, padding: "1px 6px", borderRadius: 3, background: "rgba(212,245,94,0.15)", color: "var(--accent)", border: "1px solid rgba(212,245,94,0.2)", letterSpacing: 1, textTransform: "uppercase" }}>Tuo</span>}
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <DemandDots level={b.domanda} />
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: b.velocita === "1-3 giorni" ? "var(--green)" : b.velocita === "3-7 giorni" ? "var(--yellow)" : "var(--red)" }}>{b.velocita}</span>
                      <span style={{ fontSize: 10, color: "var(--dim)" }}>{b.prezzo}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 500, color: "var(--accent)", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{calcScore(b)}</div>
                      <div style={{ fontSize: 8, color: "var(--dim)", letterSpacing: 1, textTransform: "uppercase" }}>/ 10</div>
                    </div>
                    <ChevronRight size={16} style={{ color: "var(--dim)" }} />
                  </div>
                </div>
              </div>
            ))}

            {/* Add custom brand button */}
            <button onClick={() => { setShowAddBrand(true); setEditingBrand(null); setBrandForm({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" }); }} style={{ ...S.brandRow, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--accent)", border: "1px dashed var(--border)", opacity: 1 }}>
              <PlusCircle size={16} /> <span style={{ fontSize: 12 }}>Aggiungi un tuo brand</span>
            </button>
          </div>
        )}

        {/* ═══ BRAND DETAIL PAGE ═══ */}
        {tab === "brands" && selectedBrand && (() => {
          const b = selectedBrand;
          const score = calcScore(b);
          const brandName = b.name.toLowerCase();
          const myItems = articles.filter((a) => a.brand.toLowerCase() === brandName);
          const mySold = [...myItems.filter((a) => a.venduto), ...archive.filter((a) => a.brand.toLowerCase() === brandName)];
          const myProfit = mySold.reduce((s, a) => s + getMargin(a), 0);
          const myAvgMargin = mySold.length > 0 ? (myProfit / mySold.length).toFixed(2) : null;
          const falsiColor = b.rischioFalsi === "alto" ? "var(--red)" : b.rischioFalsi === "medio" ? "var(--yellow)" : "var(--green)";

          return (
          <div style={{ animation: "fadeIn 0.2s ease" }}>
            <button onClick={() => { setSelectedBrand(null); setBrandTab("comprare"); }} style={S.backBtn}>
              <ArrowLeft size={16} /> Tutti i brand
            </button>

            {/* ─── NAME + BADGE ─── */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: 26, fontWeight: 500, color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>{b.name}</h2>
                {b.custom && <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, background: "rgba(212,245,94,0.15)", color: "var(--accent)", letterSpacing: 1, textTransform: "uppercase" }}>Tuo</span>}
              </div>
              {b.note && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{b.note}</div>}
            </div>

            {/* Vinted link */}
            <a href={`https://www.vinted.it/catalog?search_text=${encodeURIComponent(b.name)}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--accent)", fontSize: 11, textDecoration: "none", marginBottom: 18, fontFamily: "'DM Mono', monospace" }}>
              <ExternalLink size={13} /> Cerca su Vinted
            </a>

            {/* ━━━━━━ BLOCCO 1 — VALE LA PENA? ━━━━━━ */}
            <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Vale la pena?</div>

            {/* Score prominent */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div style={{ ...S.detailMetric, flex: "0 0 auto", minWidth: 90, background: "rgba(212,245,94,0.06)", borderColor: "rgba(212,245,94,0.15)", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: "var(--accent)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Score</div>
                <div style={{ fontSize: 36, fontWeight: 500, color: "var(--accent)", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{score}</div>
                <div style={{ fontSize: 9, color: "var(--dim)" }}>/ 10</div>
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={S.detailMetric}>
                  <div style={S.detailMetricLabel}>Margine</div>
                  <div style={{ fontSize: 20, fontWeight: 500, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>{b.margine}%</div>
                </div>
                <div style={S.detailMetric}>
                  <div style={S.detailMetricLabel}>Vendita</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2, color: b.velocita === "1-3 giorni" ? "var(--green)" : b.velocita === "3-7 giorni" ? "var(--yellow)" : "var(--red)" }}>{b.velocita}</div>
                </div>
                <div style={S.detailMetric}>
                  <div style={S.detailMetricLabel}>Domanda</div>
                  <div style={{ marginTop: 4 }}><DemandDots level={b.domanda} /></div>
                </div>
                <div style={S.detailMetric}>
                  <div style={S.detailMetricLabel}>Difficoltà</div>
                  <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{b.difficolta || `${b.difficoltaNum}/4`}</div>
                </div>
              </div>
            </div>

            {/* Prices side by side */}
            {(b.prezzo || b.prezzoVendita) && (
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {b.prezzo && <div style={{ ...S.detailMetric, flex: 1, textAlign: "center" }}>
                  <div style={S.detailMetricLabel}>💰 Compri a</div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "var(--red)" }}>{b.prezzo}</div>
                </div>}
                {b.prezzoVendita && <div style={{ ...S.detailMetric, flex: 1, textAlign: "center" }}>
                  <div style={S.detailMetricLabel}>💸 Rivendi a</div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "var(--green)" }}>{b.prezzoVendita}</div>
                </div>}
              </div>
            )}

            {/* ━━━━━━ BLOCCO 2 — COME FARLO BENE ━━━━━━ */}
            <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Come farlo bene</div>

            {/* Internal tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 12, background: "var(--surface)", padding: 3, borderRadius: 6, border: "1px solid var(--border)" }}>
              {[
                { id: "comprare", label: "✅ Comprare" },
                { id: "evitare", label: "⛔ Evitare" },
                { id: "consigli", label: "💡 Consigli" },
              ].map((t) => (
                <button key={t.id} onClick={() => setBrandTab(t.id)} style={{
                  flex: 1, padding: "8px 4px", fontSize: 10, border: "none", borderRadius: 4, cursor: "pointer",
                  fontFamily: "'DM Mono', monospace", transition: "all 0.15s", letterSpacing: 0.5,
                  background: brandTab === t.id ? "var(--accent)" : "transparent",
                  color: brandTab === t.id ? "#000" : "var(--muted)",
                  fontWeight: brandTab === t.id ? 500 : 400,
                }}>{t.label}</button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ ...S.card, marginBottom: 20, minHeight: 120 }}>
              {brandTab === "comprare" && (
                <div style={{ animation: "fadeIn 0.2s ease" }}>
                  {b.cosaMeglio?.length > 0 ? b.cosaMeglio.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ color: "var(--green)", fontSize: 14, lineHeight: 1.2, flexShrink: 0 }}>•</span>
                      <span style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  )) : <div style={{ fontSize: 12, color: "var(--dim)", fontStyle: "italic" }}>Nessuna info — {b.custom ? "modifica il brand per aggiungere" : "info non disponibile"}</div>}

                  {/* Taglie + Stagione + Dove trovarlo inline */}
                  {(b.taglieTop?.length > 0 || b.stagione || b.source) && (
                    <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 10 }}>
                      {b.taglieTop?.length > 0 && <DetailRow label="Taglie top" value={b.taglieTop.join(", ")} />}
                      {b.source && <DetailRow label="Dove trovarlo" value={b.source} />}
                      {b.stagione && <DetailRow label="Stagione" value={b.stagione} />}
                    </div>
                  )}
                </div>
              )}

              {brandTab === "evitare" && (
                <div style={{ animation: "fadeIn 0.2s ease" }}>
                  {b.cosaEvitare?.length > 0 ? b.cosaEvitare.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ color: "var(--red)", fontSize: 14, lineHeight: 1.2, flexShrink: 0 }}>•</span>
                      <span style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  )) : <div style={{ fontSize: 12, color: "var(--dim)", fontStyle: "italic" }}>Nessuna info</div>}
                </div>
              )}

              {brandTab === "consigli" && (
                <div style={{ animation: "fadeIn 0.2s ease" }}>
                  {b.consiglio ? (
                    <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>{b.consiglio}</div>
                  ) : (
                    <div style={{ fontSize: 12, color: "var(--dim)", fontStyle: "italic" }}>Nessun consiglio — {b.custom ? "modifica il brand per aggiungere" : "info non disponibile"}</div>
                  )}
                </div>
              )}
            </div>

            {/* ━━━━━━ BLOCCO 3 — ATTENZIONE + I TUOI DATI ━━━━━━ */}
            <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Attenzione & dati</div>

            {/* Rischio falsi */}
            {b.rischioFalsi && (
              <div style={{ ...S.card, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)" }}>⚠️ Rischio falsi</div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: falsiColor, padding: "2px 8px", borderRadius: 4, background: b.rischioFalsi === "alto" ? "#301818" : b.rischioFalsi === "medio" ? "#302a18" : "#183018", border: `1px solid ${falsiColor}33` }}>
                    {b.rischioFalsi.charAt(0).toUpperCase() + b.rischioFalsi.slice(1)}
                  </span>
                </div>
                {b.controlloFalsi?.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{ color: falsiColor, fontSize: 12, marginTop: 1, flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Storico personale */}
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>📊 I tuoi numeri su {b.name}</div>
              {mySold.length === 0 && myItems.length === 0 ? (
                <div style={{ fontSize: 11, color: "var(--dim)", fontStyle: "italic", textAlign: "center", padding: "10px 0" }}>
                  Nessun dato — aggiungi articoli {b.name} nel tracker per vedere le tue stats
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: "var(--surface2)", borderRadius: 6, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>{myItems.filter((a) => !a.venduto).length}</div>
                    <div style={{ fontSize: 8, color: "var(--dim)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>In vendita</div>
                  </div>
                  <div style={{ background: "var(--surface2)", borderRadius: 6, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: "var(--green)", fontFamily: "'Playfair Display', serif" }}>{mySold.length}</div>
                    <div style={{ fontSize: 8, color: "var(--dim)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Venduti</div>
                  </div>
                  <div style={{ background: "var(--surface2)", borderRadius: 6, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: myProfit >= 0 ? "var(--green)" : "var(--red)", fontFamily: "'Playfair Display', serif" }}>{formatEur(myProfit)}</div>
                    <div style={{ fontSize: 8, color: "var(--dim)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Guadagno</div>
                  </div>
                  <div style={{ background: "var(--surface2)", borderRadius: 6, padding: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: "var(--text2)", fontFamily: "'Playfair Display', serif" }}>{myAvgMargin ? myAvgMargin + "€" : "—"}</div>
                    <div style={{ fontSize: 8, color: "var(--dim)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Margine medio</div>
                  </div>
                </div>
              )}
            </div>

            {/* Edit/Delete for custom brands */}
            {b.custom && (
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button onClick={() => startEditBrand(b)} style={{ ...S.addBtn, background: "var(--surface)", color: "var(--accent)", border: "1px solid var(--border)", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Pencil size={14} /> Modifica
                </button>
                <button onClick={() => deleteCustomBrand(b.id)} style={{ ...S.addBtn, background: "#301818", color: "var(--red)", border: "1px solid #f8717133", flex: 1 }}>
                  Elimina
                </button>
              </div>
            )}
          </div>
          );
        })()}

        {/* ═══ ADD/EDIT BRAND MODAL ═══ */}
        {showAddBrand && (
          <div style={S.overlay} onClick={() => { setShowAddBrand(false); setEditingBrand(null); }}>
            <div style={{ ...S.modal, textAlign: "left", maxWidth: 420, maxHeight: "85vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 14 }}>{editingBrand ? "Modifica brand" : "Aggiungi brand"}</div>
              <Field label="Nome brand" required>
                <input value={brandForm.name} onChange={(e) => setBrandForm((p) => ({...p, name: e.target.value}))} placeholder="es. Stüssy" style={S.input} />
              </Field>
              <div style={S.formRow}>
                <Field label="Domanda (1-5)"><input type="number" min="1" max="5" value={brandForm.domanda} onChange={(e) => setBrandForm((p) => ({...p, domanda: e.target.value}))} style={S.input} /></Field>
                <Field label="Margine %"><input type="number" min="0" max="100" value={brandForm.margine} onChange={(e) => setBrandForm((p) => ({...p, margine: e.target.value}))} style={S.input} /></Field>
              </div>
              <div style={S.formRow}>
                <Field label="Velocità vendita">
                  <select value={brandForm.velocita} onChange={(e) => setBrandForm((p) => ({...p, velocita: e.target.value}))} style={S.input}>
                    {["1-3 giorni", "3-7 giorni", "1-2 settimane", "2-4 settimane"].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </Field>
                <Field label="Difficoltà (1-4)"><input type="number" min="1" max="4" value={brandForm.difficoltaNum} onChange={(e) => setBrandForm((p) => ({...p, difficoltaNum: e.target.value}))} style={S.input} /></Field>
              </div>
              <div style={S.formRow}>
                <Field label="Prezzo acquisto"><input value={brandForm.prezzo} onChange={(e) => setBrandForm((p) => ({...p, prezzo: e.target.value}))} placeholder="10-30€" style={S.input} /></Field>
                <Field label="Prezzo vendita"><input value={brandForm.prezzoVendita} onChange={(e) => setBrandForm((p) => ({...p, prezzoVendita: e.target.value}))} placeholder="25-60€" style={S.input} /></Field>
              </div>
              <Field label="Dove trovarlo"><input value={brandForm.source} onChange={(e) => setBrandForm((p) => ({...p, source: e.target.value}))} placeholder="Mercatini, Outlet..." style={S.input} /></Field>
              <Field label="Note"><textarea value={brandForm.note} onChange={(e) => setBrandForm((p) => ({...p, note: e.target.value}))} placeholder="Info generali..." rows={2} style={{ ...S.input, resize: "vertical" }} /></Field>
              <Field label="Consiglio"><textarea value={brandForm.consiglio} onChange={(e) => setBrandForm((p) => ({...p, consiglio: e.target.value}))} placeholder="Il tuo consiglio principale..." rows={2} style={{ ...S.input, resize: "vertical" }} /></Field>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => { setShowAddBrand(false); setEditingBrand(null); }} style={S.modalCancel}>Annulla</button>
                <button onClick={saveCustomBrand} style={S.modalConfirm}>{editingBrand ? "Salva" : "Aggiungi"}</button>
              </div>
            </div>
          </div>
        )}

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
          { id: "brands", icon: Tag, label: "Brand" },
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
