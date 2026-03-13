import { useState, useEffect, useCallback, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { RotateCcw, Search, Plus, Package, LayoutDashboard, Tag, TrendingUp, Trash2, Check, Download, Info, ChevronDown, ChevronRight, ArrowLeft, ExternalLink, PlusCircle, Pencil, X } from "lucide-react";
import { BRANDS, CATEGORIE, FONTI, TAGLIE, CONDIZIONI, GENERI, calcScore } from "./data";

/* ─── STORAGE ─── */
const KEYS = { articles: "rh-articles", archive: "rh-archive", brands: "rh-brands", checks: "rh-checks", goal: "rh-goal" };
const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const loadVal = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmt = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "€";
const getMargin = (a) => (a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo) - a.costo;
const monthLabel = (s) => new Date(s).toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
const ttStyle = { background: "#1e1e23", border: "1px solid #3a3a44", borderRadius: 6, fontSize: 12, fontFamily: "'DM Mono', monospace" };

/* ─── CHECKLIST LOGIC ─── */
const COND_MULT = { "Nuovo con etichette": 1, "Nuovo senza etichette": 0.92, "Ottime condizioni": 0.82, "Buone condizioni": 0.7, "Discrete condizioni": 0.55 };
const VEL_ORDER = { "1-3 giorni": 1, "3-7 giorni": 2, "1-2 settimane": 3, "2-4 settimane": 4 };

function evaluateItem(brand, categoria, taglia, condizione, costoAcquisto) {
  if (!brand || !costoAcquisto || costoAcquisto <= 0) return null;

  const condMult = COND_MULT[condizione] || 0.75;
  const prezzoStimato = Math.round(costoAcquisto * (1 + (brand.margine / 100)) * condMult * 100) / 100;
  const margine = prezzoStimato - costoAcquisto;
  const marginePct = ((margine / costoAcquisto) * 100).toFixed(0);

  // Size check
  const taglieOk = brand.taglieTop || [];
  const tagliaRichiesta = taglieOk.length === 0 || taglieOk.some(t => t.toLowerCase().includes(taglia.toLowerCase()) || taglia.toLowerCase().includes(t.toLowerCase()));

  // Build reasons
  const pro = [];
  const contro = [];

  if (brand.domanda >= 4) pro.push("Brand molto richiesto");
  else if (brand.domanda >= 3) pro.push("Domanda discreta");
  else contro.push("Domanda bassa");

  if (VEL_ORDER[brand.velocita] <= 2) pro.push("Si vende veloce (" + brand.velocita + ")");
  else contro.push("Vendita lenta (" + brand.velocita + ")");

  if (marginePct >= 60) pro.push("Margine alto (" + marginePct + "%)");
  else if (marginePct >= 30) pro.push("Margine ok (" + marginePct + "%)");
  else contro.push("Margine basso (" + marginePct + "%)");

  if (tagliaRichiesta) pro.push("Taglia richiesta");
  else contro.push("Taglia poco cercata per " + brand.name);

  if (condizione === "Nuovo con etichette") pro.push("Nuovo con etichette = prezzo massimo");
  else if (condizione === "Discrete condizioni") contro.push("Condizioni discrete abbassano il valore");

  if (brand.rischioFalsi === "alto") contro.push("⚠️ Rischio falsi alto — verifica autenticità!");

  // Verdict
  let verdict, verdictColor, verdictLabel;
  const score = (parseInt(marginePct) >= 40 ? 2 : parseInt(marginePct) >= 20 ? 1 : 0)
    + (brand.domanda >= 4 ? 2 : brand.domanda >= 3 ? 1 : 0)
    + (VEL_ORDER[brand.velocita] <= 2 ? 1 : 0)
    + (tagliaRichiesta ? 1 : 0);

  if (score >= 5) { verdict = "green"; verdictColor = "#4ade80"; verdictLabel = "COMPRALO"; }
  else if (score >= 3) { verdict = "yellow"; verdictColor = "#fbbf24"; verdictLabel = "RISCHIO"; }
  else { verdict = "red"; verdictColor = "#f87171"; verdictLabel = "LASCIA STARE"; }

  return { prezzoStimato, margine, marginePct, verdict, verdictColor, verdictLabel, pro, contro, tagliaRichiesta };
}

/* ─── DEMAND DOTS ─── */
function Dots({ n }) {
  return <span style={{ display: "inline-flex", gap: 3 }}>{[1,2,3,4,5].map(i => (
    <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= n ? (n >= 4 ? "#4ade80" : n >= 3 ? "#fbbf24" : "#f87171") : "#26262d", border: i <= n ? "none" : "1px solid #2e2e38" }} />
  ))}</span>;
}

/* ─── TOOLTIP ─── */
function Tip({ text }) {
  const [o, setO] = useState(false);
  return <span style={{ position: "relative", display: "inline-flex", marginLeft: 4 }}>
    <span onClick={e => { e.stopPropagation(); setO(!o); }} style={{ cursor: "pointer", color: "#6a6a72" }}><Info size={12} /></span>
    {o && <><div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setO(false)} />
      <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#26262d", border: "1px solid #2e2e38", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#c8c5be", lineHeight: 1.4, width: 200, zIndex: 51, boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>{text}</div>
    </>}
  </span>;
}

/* ─── SORT SELECT ─── */
function Sort({ value, onChange, options }) {
  return <div style={{ position: "relative" }}>
    <select value={value} onChange={e => onChange(e.target.value)} style={{ background: "#1e1e23", border: "1px solid #2e2e38", color: "#9a9a9a", fontSize: 10, padding: "5px 22px 5px 8px", borderRadius: 6, appearance: "none", fontFamily: "'DM Mono', monospace", cursor: "pointer", outline: "none" }}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
    <ChevronDown size={10} style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6a6a72" }} />
  </div>;
}

/* ─── MAIN APP ─── */
export default function App() {
  const [tab, setTab] = useState("dash");
  const [articles, setArticles] = useState(() => load(KEYS.articles));
  const [archive, setArchive] = useState(() => load(KEYS.archive));
  const [customBrands, setCustomBrands] = useState(() => load(KEYS.brands));
  const [checkHistory, setCheckHistory] = useState(() => load(KEYS.checks));
  const [monthlyGoal, setMonthlyGoal] = useState(() => loadVal(KEYS.goal, 200));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("tutti");
  const [invSort, setInvSort] = useState("recente");
  const [brandSearch, setBrandSearch] = useState("");
  const [brandSort, setBrandSort] = useState("score");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandTab, setBrandTab] = useState("comprare");
  const [showReset, setShowReset] = useState(false);
  const [sellModal, setSellModal] = useState(null);
  const [sellPrice, setSellPrice] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandForm, setBrandForm] = useState({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" });
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [toast, setToast] = useState(null);
  const saveTimer = useRef(null);

  // Checklist state
  const [ckStep, setCkStep] = useState(0);
  const [ckBrand, setCkBrand] = useState(null);
  const [ckBrandText, setCkBrandText] = useState("");
  const [ckCat, setCkCat] = useState("Abbigliamento");
  const [ckTaglia, setCkTaglia] = useState("M");
  const [ckCond, setCkCond] = useState("Ottime condizioni");
  const [ckCosto, setCkCosto] = useState("");
  const [ckResult, setCkResult] = useState(null);

  // Manual add form
  const [mf, setMf] = useState({ nome: "", brand: "", categoria: "Abbigliamento", costo: "", prezzo: "", fonte: "Primark", taglia: "M", condizione: "Nuovo con etichette", genere: "Unisex", note: "" });

  // Auto-save
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      save(KEYS.articles, articles); save(KEYS.archive, archive);
      save(KEYS.brands, customBrands); save(KEYS.checks, checkHistory);
      save(KEYS.goal, monthlyGoal);
    }, 300);
    return () => clearTimeout(saveTimer.current);
  }, [articles, archive, customBrands, checkHistory, monthlyGoal]);

  const showToast = useCallback((m, t = "ok") => { setToast({ m, t }); setTimeout(() => setToast(null), 2500); }, []);

  // All brands
  const allBrands = [...BRANDS, ...customBrands];

  /* ─── CHECKLIST ACTIONS ─── */
  function resetChecklist() { setCkStep(0); setCkBrand(null); setCkBrandText(""); setCkCat("Abbigliamento"); setCkTaglia("M"); setCkCond("Ottime condizioni"); setCkCosto(""); setCkResult(null); }

  function runEvaluation() {
    const cost = parseFloat(ckCosto) || 0;
    if (!ckBrand || cost <= 0) return;
    const result = evaluateItem(ckBrand, ckCat, ckTaglia, ckCond, cost);
    setCkResult(result);
    setCkStep(5);
  }

  function ckBuy() {
    const cost = parseFloat(ckCosto) || 0;
    const art = {
      id: genId(), nome: `${ckBrand.name} ${ckCat} ${ckTaglia}`, brand: ckBrand.name,
      categoria: ckCat, costo: cost, prezzo: ckResult.prezzoStimato, prezzoVendita: null,
      fonte: "", taglia: ckTaglia, condizione: ckCond, genere: "Unisex", note: "",
      venduto: false, dataAcquisto: new Date().toISOString(), dataVendita: null,
    };
    setArticles(p => [art, ...p]);
    setCheckHistory(p => [{ id: genId(), brand: ckBrand.name, cat: ckCat, taglia: ckTaglia, cond: ckCond, costo: cost, verdict: ckResult.verdictLabel, bought: true, date: new Date().toISOString() }, ...p]);
    showToast("Aggiunto all'inventario!");
    resetChecklist();
    setTab("inv");
  }

  function ckSkip() {
    setCheckHistory(p => [{ id: genId(), brand: ckBrand.name, cat: ckCat, taglia: ckTaglia, cond: ckCond, costo: parseFloat(ckCosto) || 0, verdict: ckResult.verdictLabel, bought: false, date: new Date().toISOString() }, ...p]);
    showToast("Salvato nello storico");
    resetChecklist();
  }

  /* ─── INVENTORY ACTIONS ─── */
  function addManual() {
    if (!mf.nome.trim()) { showToast("Inserisci il nome!", "err"); return; }
    setArticles(p => [{ id: genId(), ...mf, costo: parseFloat(mf.costo) || 0, prezzo: parseFloat(mf.prezzo) || 0, prezzoVendita: null, venduto: false, dataAcquisto: new Date().toISOString(), dataVendita: null }, ...p]);
    setMf({ nome: "", brand: "", categoria: "Abbigliamento", costo: "", prezzo: "", fonte: "Primark", taglia: "M", condizione: "Nuovo con etichette", genere: "Unisex", note: "" });
    setShowManualAdd(false); showToast("Aggiunto!");
  }

  function confirmSell() {
    const fp = parseFloat(sellPrice) || 0;
    setArticles(p => p.map(a => a.id === sellModal.id ? { ...a, venduto: true, prezzoVendita: fp, dataVendita: new Date().toISOString() } : a));
    setSellModal(null); setSellPrice(""); showToast("Venduto! 🎉");
  }

  function deleteArticle(id) {
    const item = articles.find(a => a.id === id);
    if (item?.venduto) setArchive(p => [...p, item]);
    setArticles(p => p.filter(a => a.id !== id));
    showToast(item?.venduto ? "Archiviato" : "Eliminato", item?.venduto ? "ok" : "err");
  }

  function handleReset() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    setArticles([]); setArchive([]); setCustomBrands([]); setCheckHistory([]);
    setShowReset(false); showToast("Tutto azzerato");
  }

  function exportCSV() {
    const all = [...articles, ...archive];
    if (!all.length) { showToast("Nessun dato", "err"); return; }
    const h = ["Nome","Brand","Categoria","Taglia","Condizione","Costo","Prezzo","Venduto a","Margine","Fonte","Stato","Data Acquisto","Data Vendita"];
    const rows = all.map(a => { const sp = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo; return [a.nome,a.brand,a.categoria,a.taglia,a.condizione||"",a.costo?.toFixed(2),a.prezzo?.toFixed(2),a.venduto?sp.toFixed(2):"",((sp-a.costo)).toFixed(2),a.fonte,a.venduto?"Venduto":"In vendita",a.dataAcquisto?new Date(a.dataAcquisto).toLocaleDateString("it-IT"):"",a.dataVendita?new Date(a.dataVendita).toLocaleDateString("it-IT"):""].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(","); });
    const blob = new Blob(["\uFEFF"+[h.join(","),...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const u = URL.createObjectURL(blob); const el = document.createElement("a"); el.href = u;
    el.download = `resell-hub-${new Date().toISOString().slice(0,10)}.csv`; el.click(); URL.revokeObjectURL(u); showToast("CSV scaricato!");
  }

  function saveCustomBrand() {
    if (!brandForm.name.trim()) { showToast("Inserisci il nome!", "err"); return; }
    const b = { ...brandForm, name: brandForm.name.trim(), custom: true, id: editingBrand?.id || genId(), margine: parseInt(brandForm.margine)||70, domanda: parseInt(brandForm.domanda)||3, difficoltaNum: parseInt(brandForm.difficoltaNum)||2, cosaMeglio: [], cosaEvitare: [], taglieTop: [], stagione: "", difficolta: "", rischioFalsi: "basso", controlloFalsi: [] };
    if (editingBrand) { setCustomBrands(p => p.map(x => x.id === editingBrand.id ? b : x)); if (selectedBrand?.id === editingBrand.id) setSelectedBrand(b); }
    else setCustomBrands(p => [...p, b]);
    setShowAddBrand(false); setEditingBrand(null);
    setBrandForm({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" });
    showToast(editingBrand ? "Aggiornato!" : "Aggiunto!");
  }

  /* ─── COMPUTED ─── */
  const venduti = articles.filter(a => a.venduto);
  const inVendita = articles.filter(a => !a.venduto);
  const allSold = [...venduti, ...archive];
  const totGuadagno = allSold.reduce((s, a) => s + getMargin(a), 0);
  const totInvestito = allSold.reduce((s, a) => s + a.costo, 0);
  const roi = totInvestito > 0 ? ((totGuadagno / totInvestito) * 100).toFixed(0) : 0;

  // Monthly goal progress
  const now = new Date();
  const thisMonthSold = allSold.filter(a => { const d = new Date(a.dataVendita || a.dataAcquisto); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
  const thisMonthProfit = thisMonthSold.reduce((s, a) => s + getMargin(a), 0);
  const goalPct = monthlyGoal > 0 ? Math.min(100, (thisMonthProfit / monthlyGoal) * 100) : 0;

  const monthlyData = (() => { const m = {}; allSold.forEach(a => { const k = monthLabel(a.dataVendita || a.dataAcquisto); if (!m[k]) m[k] = { mese: k, p: 0 }; m[k].p += getMargin(a); }); return Object.values(m).slice(-6); })();

  const filtered = articles.filter(a => {
    const q = search.toLowerCase();
    return (!search || a.nome.toLowerCase().includes(q) || a.brand.toLowerCase().includes(q)) && (filter === "tutti" || (filter === "venduto" && a.venduto) || (filter === "attivo" && !a.venduto));
  }).sort((a, b) => {
    if (invSort === "recente") return new Date(b.dataAcquisto) - new Date(a.dataAcquisto);
    if (invSort === "margine") return getMargin(b) - getMargin(a);
    if (invSort === "prezzo") return b.prezzo - a.prezzo;
    return a.nome.localeCompare(b.nome);
  });

  const sortedBrands = [...allBrands].filter(b => !brandSearch || b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .sort((a, b) => {
      if (brandSort === "score") return calcScore(b) - calcScore(a);
      if (brandSort === "margine") return b.margine - a.margine;
      if (brandSort === "domanda") return b.domanda - a.domanda;
      if (brandSort === "velocita") return (VEL_ORDER[a.velocita]||5) - (VEL_ORDER[b.velocita]||5);
      return a.name.localeCompare(b.name);
    });

  // Insight data
  const brandPerf = (() => { const m = {}; allSold.forEach(a => { const b = a.brand || "Altro"; if (!m[b]) m[b] = { brand: b, profit: 0, count: 0 }; m[b].profit += getMargin(a); m[b].count++; }); return Object.values(m).sort((a,b) => b.profit - a.profit); })();
  const sourcePerf = (() => { const m = {}; allSold.forEach(a => { const s = a.fonte || "Altro"; if (!m[s]) m[s] = { fonte: s, profit: 0, count: 0 }; m[s].profit += getMargin(a); m[s].count++; }); return Object.values(m).sort((a,b) => b.profit - a.profit); })();
  const checksThisMonth = checkHistory.filter(c => { const d = new Date(c.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
  const checksBought = checksThisMonth.filter(c => c.bought).length;
  const checksSkipped = checksThisMonth.filter(c => !c.bought).length;

  // Brand search for checklist
  const ckBrandResults = ckBrandText.length >= 1 ? allBrands.filter(b => b.name.toLowerCase().includes(ckBrandText.toLowerCase())).slice(0, 5) : [];

  /* ─── RENDER ─── */
  return (
    <div style={S.app}>
      {/* HEADER */}
      <header style={S.header}>
        <div><h1 style={S.logo}>Resell Hub</h1><span style={S.sub}>v3.0</span></div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={exportCSV} style={S.hBtn} title="CSV"><Download size={14} /></button>
          <button onClick={() => setShowReset(true)} style={S.hBtn} title="Reset"><RotateCcw size={14} /></button>
        </div>
      </header>

      <main style={S.main}>

        {/* ═══ DASHBOARD ═══ */}
        {tab === "dash" && <div style={S.fade}>
          {/* Stats */}
          <div style={S.row}>
            {[{ l: "Profitto", v: fmt(totGuadagno), c: totGuadagno >= 0 ? "#4ade80" : "#f87171" },
              { l: "Venduti", v: allSold.length, c: "#4ade80" },
              { l: "In vendita", v: inVendita.length, c: "#fbbf24" },
              { l: "ROI", v: roi + "%", c: "#60a5fa" }
            ].map((s, i) => <div key={i} style={S.stat}><div style={{ fontSize: 18, fontWeight: 500, color: s.c, fontFamily: "'Playfair Display', serif" }}>{s.v}</div><div style={S.statL}>{s.l}</div></div>)}
          </div>

          {/* Monthly goal */}
          <div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase" }}>Obiettivo mensile</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input type="number" value={monthlyGoal} onChange={e => setMonthlyGoal(parseInt(e.target.value) || 0)}
                  style={{ width: 60, background: "#26262d", border: "1px solid #2e2e38", color: "#f0ede8", fontSize: 12, padding: "3px 6px", borderRadius: 4, textAlign: "right", outline: "none", fontFamily: "'DM Mono', monospace" }} />
                <span style={{ fontSize: 11, color: "#6a6a72" }}>€</span>
              </div>
            </div>
            <div style={{ height: 6, background: "#26262d", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", borderRadius: 3, width: `${goalPct}%`, background: goalPct >= 100 ? "#4ade80" : "#d4f55e", transition: "width 0.3s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span style={{ color: thisMonthProfit >= 0 ? "#4ade80" : "#f87171", fontWeight: 500 }}>{thisMonthProfit.toFixed(2)}€</span>
              <span style={{ color: "#6a6a72" }}>
                {goalPct >= 100 ? "🎉 Obiettivo raggiunto!" : `Manca ${(monthlyGoal - thisMonthProfit).toFixed(2)}€`}
              </span>
            </div>
          </div>

          {/* Chart */}
          {monthlyData.length > 0 && <div style={S.card}>
            <div style={S.secTitle}>Profitto mensile</div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <XAxis dataKey="mese" tick={{ fill: "#9a9a9a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9a9a9a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={ttStyle} formatter={v => [v.toFixed(2) + "€"]} />
                <Bar dataKey="p" radius={[3,3,0,0]}>{monthlyData.map((e,i) => <Cell key={i} fill={e.p >= 0 ? "#4ade80" : "#f87171"} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>}

          {articles.length === 0 && <div style={S.empty}><div style={{ fontSize: 32, marginBottom: 8 }}>📦</div><div style={{ fontSize: 12, color: "#6a6a72" }}>Nessun articolo — usa la Checklist per iniziare</div></div>}
        </div>}

        {/* ═══ CHECKLIST ═══ */}
        {tab === "check" && <div style={S.fade}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
            {[0,1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= ckStep ? "#d4f55e" : "#26262d", transition: "background 0.2s" }} />)}
          </div>

          {/* STEP 0: Brand */}
          {ckStep === 0 && <div>
            <div style={S.ckTitle}>Che brand è?</div>
            <input value={ckBrandText} onChange={e => { setCkBrandText(e.target.value); setCkBrand(null); }} placeholder="Scrivi il nome del brand..." style={S.input} autoFocus />
            {ckBrandResults.length > 0 && <div style={{ marginTop: 6 }}>
              {ckBrandResults.map(b => <button key={b.custom ? b.id : b.name} onClick={() => { setCkBrand(b); setCkBrandText(b.name); setCkStep(1); }}
                style={{ ...S.ckOption, borderColor: ckBrand?.name === b.name ? "#d4f55e" : "#2e2e38" }}>
                <span style={{ fontWeight: 500 }}>{b.name}</span>
                <span style={{ fontSize: 10, color: "#6a6a72" }}>Margine {b.margine}% · <Dots n={b.domanda} /></span>
              </button>)}
            </div>}
            {ckBrandText.length >= 2 && ckBrandResults.length === 0 && <div style={{ marginTop: 8, fontSize: 12, color: "#6a6a72" }}>Brand non nel database. Puoi aggiungerlo dalla sezione Brand.</div>}
          </div>}

          {/* STEP 1: Categoria + Taglia */}
          {ckStep === 1 && <div>
            <div style={S.ckTitle}>Che articolo è?</div>
            <div style={S.ckLabel}>Categoria</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {CATEGORIE.map(c => <button key={c} onClick={() => setCkCat(c)} style={{ ...S.chip, ...(ckCat === c ? S.chipActive : {}) }}>{c}</button>)}
            </div>
            <div style={S.ckLabel}>Taglia</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {TAGLIE.slice(0, 10).map(t => <button key={t} onClick={() => setCkTaglia(t)} style={{ ...S.chip, ...(ckTaglia === t ? S.chipActive : {}) }}>{t}</button>)}
            </div>
            <button onClick={() => setCkStep(2)} style={S.ckNext}>Avanti →</button>
          </div>}

          {/* STEP 2: Condizione */}
          {ckStep === 2 && <div>
            <div style={S.ckTitle}>In che condizioni è?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {CONDIZIONI.map(c => <button key={c} onClick={() => { setCkCond(c); setCkStep(3); }} style={{ ...S.ckOption, borderColor: ckCond === c ? "#d4f55e" : "#2e2e38" }}>{c}</button>)}
            </div>
          </div>}

          {/* STEP 3: Prezzo */}
          {ckStep === 3 && <div>
            <div style={S.ckTitle}>Quanto te lo vendono?</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <input type="number" value={ckCosto} onChange={e => setCkCosto(e.target.value)} placeholder="0.00" step="0.01" min="0" style={{ ...S.input, fontSize: 24, textAlign: "center", padding: 14 }} autoFocus />
              <span style={{ fontSize: 18, color: "#6a6a72" }}>€</span>
            </div>
            <button onClick={() => { if (parseFloat(ckCosto) > 0) runEvaluation(); else showToast("Inserisci il prezzo!", "err"); }} style={S.ckNext}>Valuta →</button>
          </div>}

          {/* STEP 4: Skip (not used, runEvaluation goes to 5) */}

          {/* STEP 5: Result */}
          {ckStep === 5 && ckResult && <div>
            {/* Verdict */}
            <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: ckResult.verdictColor, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>{ckResult.verdictLabel}</div>
              <div style={{ fontSize: 12, color: "#9a9a9a" }}>{ckBrand.name} · {ckCat} · Tg. {ckTaglia} · {ckCond}</div>
            </div>

            {/* Numbers */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ ...S.card, flex: 1, textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 9, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Compri a</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: "#f87171" }}>{parseFloat(ckCosto).toFixed(2)}€</div>
              </div>
              <div style={{ ...S.card, flex: 1, textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 9, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Rivendi a ~</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: "#4ade80" }}>{ckResult.prezzoStimato.toFixed(2)}€</div>
              </div>
              <div style={{ ...S.card, flex: 1, textAlign: "center", marginBottom: 0 }}>
                <div style={{ fontSize: 9, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Margine</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: ckResult.margine >= 0 ? "#4ade80" : "#f87171" }}>{ckResult.marginePct}%</div>
              </div>
            </div>

            {/* Pro/Contro */}
            {ckResult.pro.length > 0 && <div style={{ ...S.card, marginBottom: 8 }}>
              {ckResult.pro.map((p, i) => <div key={i} style={{ fontSize: 12, color: "#4ade80", marginBottom: 4 }}>✓ {p}</div>)}
            </div>}
            {ckResult.contro.length > 0 && <div style={{ ...S.card, marginBottom: 8 }}>
              {ckResult.contro.map((c, i) => <div key={i} style={{ fontSize: 12, color: "#f87171", marginBottom: 4 }}>✗ {c}</div>)}
            </div>}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={ckSkip} style={{ ...S.btn, flex: 1, background: "#26262d", color: "#9a9a9a", border: "1px solid #2e2e38" }}>Lo salto</button>
              <button onClick={ckBuy} style={{ ...S.btn, flex: 1, background: "#4ade80", color: "#000" }}>Lo compro ✓</button>
            </div>
            <button onClick={resetChecklist} style={{ ...S.btn, width: "100%", marginTop: 8, background: "transparent", color: "#6a6a72", border: "1px solid #2e2e38" }}>Nuova valutazione</button>
          </div>}

          {/* Back button */}
          {ckStep > 0 && ckStep < 5 && <button onClick={() => setCkStep(ckStep - 1)} style={{ ...S.btn, marginTop: 12, background: "transparent", color: "#6a6a72", border: "1px solid #2e2e38", width: "100%" }}>← Indietro</button>}
        </div>}

        {/* ═══ INVENTARIO ═══ */}
        {tab === "inv" && <div style={S.fade}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#6a6a72" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca..." style={{ ...S.input, paddingLeft: 30 }} />
            </div>
            <Sort value={invSort} onChange={setInvSort} options={[{ v: "recente", l: "Recenti" }, { v: "margine", l: "Margine ↑" }, { v: "prezzo", l: "Prezzo ↑" }, { v: "nome", l: "A-Z" }]} />
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {[{ k: "tutti", l: "Tutti", c: articles.length }, { k: "attivo", l: "In vendita", c: inVendita.length }, { k: "venduto", l: "Venduti", c: venduti.length }].map(f =>
              <button key={f.k} onClick={() => setFilter(f.k)} style={{ ...S.chip, ...(filter === f.k ? S.chipActive : {}) }}>{f.l} ({f.c})</button>
            )}
            <button onClick={() => setShowManualAdd(true)} style={{ ...S.chip, color: "#d4f55e", borderColor: "#d4f55e44" }}>+ Manuale</button>
          </div>

          {filtered.length === 0 ? <div style={S.empty}><div style={{ fontSize: 12, color: "#6a6a72" }}>Nessun articolo</div></div> :
            filtered.map((a, i) => {
              const m = getMargin(a); const base = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
              return <div key={a.id} style={S.artCard}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#f0ede8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.nome}</span>
                    <span style={{ fontSize: 8, padding: "1px 6px", borderRadius: 3, letterSpacing: 1, textTransform: "uppercase", ...(a.venduto ? { background: "#0d3320", color: "#4ade80" } : { background: "#33300d", color: "#fbbf24" }) }}>{a.venduto ? "Venduto" : "Attivo"}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#6a6a72" }}>{a.brand} · {a.categoria} · {a.taglia}{a.fonte ? ` · ${a.fonte}` : ""}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: m >= 0 ? "#4ade80" : "#f87171" }}>{fmt(m)}</div>
                  <div style={{ fontSize: 9, color: "#6a6a72" }}>{a.costo.toFixed(2)}→{base.toFixed(2)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
                  {!a.venduto && <button onClick={() => { setSellModal({ id: a.id, prezzoOriginale: a.prezzo }); setSellPrice(String(a.prezzo)); }} style={S.actG}><Check size={13} /></button>}
                  <button onClick={() => deleteArticle(a.id)} style={S.actD}><Trash2 size={11} /></button>
                </div>
              </div>;
            })
          }
        </div>}

        {/* ═══ BRAND GUIDE (list) ═══ */}
        {tab === "brand" && !selectedBrand && <div style={S.fade}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#6a6a72" }} />
              <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Cerca brand..." style={{ ...S.input, paddingLeft: 30 }} />
            </div>
            <Sort value={brandSort} onChange={setBrandSort} options={[{ v: "score", l: "Score ↑" }, { v: "margine", l: "Margine ↑" }, { v: "domanda", l: "Domanda ↑" }, { v: "velocita", l: "Veloci" }, { v: "nome", l: "A-Z" }]} />
          </div>
          {sortedBrands.map(b => <div key={b.custom ? b.id : b.name} onClick={() => { setSelectedBrand(b); setBrandTab("comprare"); }} style={{ ...S.bRow, cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#f0ede8" }}>{b.name}</span>
                {b.custom && <span style={{ fontSize: 7, padding: "1px 5px", borderRadius: 3, background: "rgba(212,245,94,0.12)", color: "#d4f55e", letterSpacing: 1 }}>TUO</span>}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Dots n={b.domanda} /> <span style={{ fontSize: 10, color: b.velocita === "1-3 giorni" ? "#4ade80" : b.velocita === "3-7 giorni" ? "#fbbf24" : "#f87171" }}>{b.velocita}</span></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 500, color: "#d4f55e", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{calcScore(b)}</div><div style={{ fontSize: 7, color: "#6a6a72", letterSpacing: 1 }}>/ 10</div></div>
              <ChevronRight size={14} style={{ color: "#6a6a72" }} />
            </div>
          </div>)}
          <button onClick={() => { setShowAddBrand(true); setEditingBrand(null); setBrandForm({ name: "", domanda: 3, velocita: "3-7 giorni", margine: 70, difficoltaNum: 2, note: "", source: "", prezzo: "", prezzoVendita: "", consiglio: "" }); }} style={{ ...S.bRow, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#d4f55e", border: "1px dashed #2e2e38" }}>
            <PlusCircle size={14} /> <span style={{ fontSize: 11 }}>Aggiungi brand</span>
          </button>
        </div>}

        {/* ═══ BRAND DETAIL ═══ */}
        {tab === "brand" && selectedBrand && (() => {
          const b = selectedBrand; const bn = b.name.toLowerCase();
          const myItems = articles.filter(a => a.brand.toLowerCase() === bn);
          const mySold = [...myItems.filter(a => a.venduto), ...archive.filter(a => a.brand.toLowerCase() === bn)];
          const myProfit = mySold.reduce((s, a) => s + getMargin(a), 0);
          const fc = b.rischioFalsi === "alto" ? "#f87171" : b.rischioFalsi === "medio" ? "#fbbf24" : "#4ade80";
          return <div style={S.fade}>
            <button onClick={() => setSelectedBrand(null)} style={S.back}><ArrowLeft size={14} /> Tutti i brand</button>
            <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", color: "#f0ede8", marginBottom: 2 }}>{b.name}</h2>
            {b.note && <div style={{ fontSize: 11, color: "#9a9a9a", marginBottom: 8 }}>{b.note}</div>}
            <a href={`https://www.vinted.it/catalog?search_text=${encodeURIComponent(b.name)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#d4f55e", textDecoration: "none", marginBottom: 16 }}><ExternalLink size={12} /> Cerca su Vinted</a>

            {/* BLOCK 1 */}
            <div style={S.secTitle}>Vale la pena?</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div style={{ ...S.card, flex: "0 0 80px", textAlign: "center", marginBottom: 0, background: "rgba(212,245,94,0.05)", borderColor: "rgba(212,245,94,0.12)" }}>
                <div style={{ fontSize: 8, color: "#d4f55e", letterSpacing: 1, marginBottom: 2 }}>SCORE</div>
                <div style={{ fontSize: 28, fontWeight: 500, color: "#d4f55e", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{calcScore(b)}</div>
                <div style={{ fontSize: 8, color: "#6a6a72" }}>/ 10</div>
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={S.miniStat}><div style={S.miniL}>Margine</div><div style={{ fontSize: 16, fontWeight: 500, color: "#d4f55e" }}>{b.margine}%</div></div>
                <div style={S.miniStat}><div style={S.miniL}>Vendita</div><div style={{ fontSize: 12, fontWeight: 500, color: b.velocita === "1-3 giorni" ? "#4ade80" : b.velocita === "3-7 giorni" ? "#fbbf24" : "#f87171" }}>{b.velocita}</div></div>
                <div style={S.miniStat}><div style={S.miniL}>Domanda</div><Dots n={b.domanda} /></div>
                <div style={S.miniStat}><div style={S.miniL}>Difficoltà</div><div style={{ fontSize: 10, color: "#c8c5be" }}>{b.difficolta || `${b.difficoltaNum}/4`}</div></div>
              </div>
            </div>
            {(b.prezzo || b.prezzoVendita) && <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {b.prezzo && <div style={{ ...S.miniStat, flex: 1, textAlign: "center" }}><div style={S.miniL}>Compri a</div><div style={{ fontSize: 14, fontWeight: 500, color: "#f87171" }}>{b.prezzo}</div></div>}
              {b.prezzoVendita && <div style={{ ...S.miniStat, flex: 1, textAlign: "center" }}><div style={S.miniL}>Rivendi a</div><div style={{ fontSize: 14, fontWeight: 500, color: "#4ade80" }}>{b.prezzoVendita}</div></div>}
            </div>}

            {/* BLOCK 2 */}
            <div style={S.secTitle}>Come farlo bene</div>
            <div style={{ display: "flex", gap: 3, marginBottom: 10, background: "#1e1e23", padding: 3, borderRadius: 6, border: "1px solid #2e2e38" }}>
              {[{ id: "comprare", l: "✅ Comprare" }, { id: "evitare", l: "⛔ Evitare" }, { id: "consigli", l: "💡 Consigli" }].map(t =>
                <button key={t.id} onClick={() => setBrandTab(t.id)} style={{ flex: 1, padding: "7px 4px", fontSize: 10, border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "'DM Mono', monospace", background: brandTab === t.id ? "#d4f55e" : "transparent", color: brandTab === t.id ? "#000" : "#9a9a9a", fontWeight: brandTab === t.id ? 500 : 400 }}>{t.l}</button>
              )}
            </div>
            <div style={{ ...S.card, minHeight: 80 }}>
              {brandTab === "comprare" && <div>
                {b.cosaMeglio?.length > 0 ? b.cosaMeglio.map((x, i) => <div key={i} style={{ fontSize: 12, color: "#c8c5be", marginBottom: 5, lineHeight: 1.5 }}>• {x}</div>) : <div style={{ fontSize: 11, color: "#6a6a72", fontStyle: "italic" }}>Nessuna info</div>}
                {(b.taglieTop?.length > 0 || b.source || b.stagione) && <div style={{ borderTop: "1px solid #2e2e38", marginTop: 10, paddingTop: 8, fontSize: 11 }}>
                  {b.taglieTop?.length > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: "#6a6a72" }}>Taglie top</span><span style={{ color: "#c8c5be" }}>{b.taglieTop.join(", ")}</span></div>}
                  {b.source && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: "#6a6a72" }}>Dove</span><span style={{ color: "#c8c5be" }}>{b.source}</span></div>}
                  {b.stagione && <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#6a6a72" }}>Stagione</span><span style={{ color: "#c8c5be" }}>{b.stagione}</span></div>}
                </div>}
              </div>}
              {brandTab === "evitare" && <div>{b.cosaEvitare?.length > 0 ? b.cosaEvitare.map((x, i) => <div key={i} style={{ fontSize: 12, color: "#c8c5be", marginBottom: 5, lineHeight: 1.5 }}>• {x}</div>) : <div style={{ fontSize: 11, color: "#6a6a72", fontStyle: "italic" }}>Nessuna info</div>}</div>}
              {brandTab === "consigli" && <div>{b.consiglio ? <div style={{ fontSize: 12, color: "#c8c5be", lineHeight: 1.6 }}>{b.consiglio}</div> : <div style={{ fontSize: 11, color: "#6a6a72", fontStyle: "italic" }}>Nessun consiglio</div>}</div>}
            </div>

            {/* BLOCK 3 */}
            <div style={S.secTitle}>Attenzione & dati</div>
            {b.rischioFalsi && <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "#9a9a9a", letterSpacing: 1, textTransform: "uppercase" }}>⚠️ Rischio falsi</span>
                <span style={{ fontSize: 10, fontWeight: 500, color: fc, padding: "1px 6px", borderRadius: 3, background: b.rischioFalsi === "alto" ? "#301818" : b.rischioFalsi === "medio" ? "#302a18" : "#183018" }}>{b.rischioFalsi.toUpperCase()}</span>
              </div>
              {b.controlloFalsi?.map((x, i) => <div key={i} style={{ fontSize: 11, color: "#c8c5be", marginBottom: 4, lineHeight: 1.5 }}>• {x}</div>)}
            </div>}
            <div style={S.card}>
              <div style={{ fontSize: 10, color: "#9a9a9a", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>📊 I tuoi numeri</div>
              {mySold.length === 0 && myItems.length === 0 ? <div style={{ fontSize: 11, color: "#6a6a72", fontStyle: "italic", textAlign: "center" }}>Nessun dato su {b.name}</div> :
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ ...S.miniStat, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 500, color: "#f0ede8" }}>{myItems.filter(a => !a.venduto).length}</div><div style={S.miniL}>In vendita</div></div>
                  <div style={{ ...S.miniStat, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 500, color: "#4ade80" }}>{mySold.length}</div><div style={S.miniL}>Venduti</div></div>
                  <div style={{ ...S.miniStat, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 500, color: myProfit >= 0 ? "#4ade80" : "#f87171" }}>{fmt(myProfit)}</div><div style={S.miniL}>Guadagno</div></div>
                  <div style={{ ...S.miniStat, textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 500, color: "#c8c5be" }}>{mySold.length > 0 ? (myProfit / mySold.length).toFixed(2) + "€" : "—"}</div><div style={S.miniL}>Media</div></div>
                </div>}
            </div>
            {b.custom && <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => { setBrandForm({ name: b.name, domanda: b.domanda, velocita: b.velocita, margine: b.margine, difficoltaNum: b.difficoltaNum, note: b.note||"", source: b.source||"", prezzo: b.prezzo||"", prezzoVendita: b.prezzoVendita||"", consiglio: b.consiglio||"" }); setEditingBrand(b); setShowAddBrand(true); }} style={{ ...S.btn, flex: 1, background: "#1e1e23", color: "#d4f55e", border: "1px solid #2e2e38" }}>Modifica</button>
              <button onClick={() => { setCustomBrands(p => p.filter(x => x.id !== b.id)); setSelectedBrand(null); showToast("Eliminato", "err"); }} style={{ ...S.btn, flex: 1, background: "#301818", color: "#f87171", border: "1px solid #f8717133" }}>Elimina</button>
            </div>}
          </div>;
        })()}

        {/* ═══ INSIGHT ═══ */}
        {tab === "insight" && <div style={S.fade}>
          <div style={S.secTitle}>Questo mese</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={{ ...S.stat, flex: 1 }}><div style={{ fontSize: 18, fontWeight: 500, color: "#4ade80" }}>{checksBought}</div><div style={S.statL}>Comprati</div></div>
            <div style={{ ...S.stat, flex: 1 }}><div style={{ fontSize: 18, fontWeight: 500, color: "#f87171" }}>{checksSkipped}</div><div style={S.statL}>Saltati</div></div>
            <div style={{ ...S.stat, flex: 1 }}><div style={{ fontSize: 18, fontWeight: 500, color: "#d4f55e" }}>{thisMonthSold.length}</div><div style={S.statL}>Venduti</div></div>
          </div>

          {brandPerf.length > 0 && <div style={S.card}>
            <div style={S.secTitle}>Brand migliori</div>
            {brandPerf.slice(0, 5).map((b, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < Math.min(brandPerf.length, 5) - 1 ? "1px solid #2e2e38" : "none" }}>
              <span style={{ fontSize: 12, color: "#c8c5be" }}>{b.brand} ({b.count})</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#4ade80" }}>{fmt(b.profit)}</span>
            </div>)}
          </div>}

          {sourcePerf.length > 0 && <div style={S.card}>
            <div style={S.secTitle}>Fonti migliori</div>
            {sourcePerf.slice(0, 5).map((s, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < Math.min(sourcePerf.length, 5) - 1 ? "1px solid #2e2e38" : "none" }}>
              <span style={{ fontSize: 12, color: "#c8c5be" }}>{s.fonte} ({s.count})</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#4ade80" }}>{fmt(s.profit)}</span>
            </div>)}
          </div>}

          {checkHistory.length > 0 && <div style={S.card}>
            <div style={S.secTitle}>Storico checklist</div>
            {checkHistory.slice(0, 15).map((c, i) => <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < Math.min(checkHistory.length, 15) - 1 ? "1px solid #2e2e38" : "none" }}>
              <div>
                <div style={{ fontSize: 12, color: "#c8c5be" }}>{c.brand} · {c.cat} · {c.taglia}</div>
                <div style={{ fontSize: 9, color: "#6a6a72" }}>{new Date(c.date).toLocaleDateString("it-IT")}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 500, color: c.verdict === "COMPRALO" ? "#4ade80" : c.verdict === "RISCHIO" ? "#fbbf24" : "#f87171", background: c.verdict === "COMPRALO" ? "#0d3320" : c.verdict === "RISCHIO" ? "#302a18" : "#301818" }}>{c.verdict}</span>
                <div style={{ fontSize: 10, color: c.bought ? "#4ade80" : "#6a6a72", marginTop: 2 }}>{c.bought ? "Comprato" : "Saltato"}</div>
              </div>
            </div>)}
          </div>}

          {checkHistory.length === 0 && brandPerf.length === 0 && <div style={S.empty}><div style={{ fontSize: 12, color: "#6a6a72" }}>Usa la Checklist e vendi articoli per vedere i tuoi insight</div></div>}
        </div>}
      </main>

      {/* BOTTOM NAV */}
      <nav style={S.nav}>
        {[{ id: "dash", icon: LayoutDashboard, l: "Home" }, { id: "inv", icon: Package, l: "Inventario" }, { id: "check", icon: Check, l: "Checklist", accent: true }, { id: "brand", icon: Tag, l: "Brand" }, { id: "insight", icon: TrendingUp, l: "Insight" }].map(t => {
          const I = t.icon; const a = tab === t.id;
          return <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "check" && ckStep === 0) resetChecklist(); }} style={{ ...S.navI, color: a ? "#d4f55e" : t.accent ? "#d4f55e" : "#6a6a72", background: a ? "rgba(212,245,94,0.07)" : "transparent" }}><I size={t.accent ? 20 : 17} strokeWidth={a ? 2.5 : 1.5} /><span style={{ fontSize: 8, letterSpacing: 0.5 }}>{t.l}</span></button>;
        })}
      </nav>

      {/* ─── MODALS ─── */}
      {sellModal && <div style={S.ov} onClick={() => { setSellModal(null); setSellPrice(""); }}><div style={S.mod} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#f0ede8", marginBottom: 4 }}>A quanto l'hai venduto?</div>
        <div style={{ fontSize: 11, color: "#9a9a9a", marginBottom: 12 }}>Listino: {sellModal.prezzoOriginale.toFixed(2)}€</div>
        <input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} style={{ ...S.input, textAlign: "center", fontSize: 20, padding: 12, marginBottom: 12 }} autoFocus />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setSellModal(null); setSellPrice(""); }} style={{ ...S.btn, flex: 1, background: "#26262d", color: "#9a9a9a", border: "1px solid #2e2e38" }}>Annulla</button>
          <button onClick={confirmSell} style={{ ...S.btn, flex: 1, background: "#4ade80", color: "#000" }}>Conferma</button>
        </div>
      </div></div>}

      {showReset && <div style={S.ov} onClick={() => setShowReset(false)}><div style={S.mod} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#f0ede8", marginBottom: 6 }}>Azzerare tutto?</div>
        <div style={{ fontSize: 11, color: "#9a9a9a", marginBottom: 16 }}>Tutti i dati verranno eliminati permanentemente.</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowReset(false)} style={{ ...S.btn, flex: 1, background: "#26262d", color: "#9a9a9a", border: "1px solid #2e2e38" }}>Annulla</button>
          <button onClick={handleReset} style={{ ...S.btn, flex: 1, background: "#f87171", color: "#000" }}>Azzera</button>
        </div>
      </div></div>}

      {showAddBrand && <div style={S.ov} onClick={() => { setShowAddBrand(false); setEditingBrand(null); }}><div style={{ ...S.mod, textAlign: "left", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#f0ede8", marginBottom: 12 }}>{editingBrand ? "Modifica brand" : "Nuovo brand"}</div>
        <Fld l="Nome"><input value={brandForm.name} onChange={e => setBrandForm(p => ({...p, name: e.target.value}))} style={S.input} /></Fld>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Domanda (1-5)"><input type="number" min="1" max="5" value={brandForm.domanda} onChange={e => setBrandForm(p => ({...p, domanda: e.target.value}))} style={S.input} /></Fld><Fld l="Margine %"><input type="number" value={brandForm.margine} onChange={e => setBrandForm(p => ({...p, margine: e.target.value}))} style={S.input} /></Fld></div>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Velocità"><select value={brandForm.velocita} onChange={e => setBrandForm(p => ({...p, velocita: e.target.value}))} style={S.input}>{["1-3 giorni","3-7 giorni","1-2 settimane","2-4 settimane"].map(v => <option key={v}>{v}</option>)}</select></Fld><Fld l="Difficoltà (1-4)"><input type="number" min="1" max="4" value={brandForm.difficoltaNum} onChange={e => setBrandForm(p => ({...p, difficoltaNum: e.target.value}))} style={S.input} /></Fld></div>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Prezzo acquisto"><input value={brandForm.prezzo} onChange={e => setBrandForm(p => ({...p, prezzo: e.target.value}))} style={S.input} /></Fld><Fld l="Prezzo vendita"><input value={brandForm.prezzoVendita} onChange={e => setBrandForm(p => ({...p, prezzoVendita: e.target.value}))} style={S.input} /></Fld></div>
        <Fld l="Dove trovarlo"><input value={brandForm.source} onChange={e => setBrandForm(p => ({...p, source: e.target.value}))} style={S.input} /></Fld>
        <Fld l="Note"><textarea value={brandForm.note} onChange={e => setBrandForm(p => ({...p, note: e.target.value}))} rows={2} style={{ ...S.input, resize: "vertical" }} /></Fld>
        <Fld l="Consiglio"><textarea value={brandForm.consiglio} onChange={e => setBrandForm(p => ({...p, consiglio: e.target.value}))} rows={2} style={{ ...S.input, resize: "vertical" }} /></Fld>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setShowAddBrand(false); setEditingBrand(null); }} style={{ ...S.btn, flex: 1, background: "#26262d", color: "#9a9a9a", border: "1px solid #2e2e38" }}>Annulla</button>
          <button onClick={saveCustomBrand} style={{ ...S.btn, flex: 1, background: "#4ade80", color: "#000" }}>{editingBrand ? "Salva" : "Aggiungi"}</button>
        </div>
      </div></div>}

      {showManualAdd && <div style={S.ov} onClick={() => setShowManualAdd(false)}><div style={{ ...S.mod, textAlign: "left", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#f0ede8", marginBottom: 12 }}>Aggiungi manualmente</div>
        <Fld l="Nome *"><input value={mf.nome} onChange={e => setMf(p => ({...p, nome: e.target.value}))} style={S.input} /></Fld>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Brand"><input value={mf.brand} onChange={e => setMf(p => ({...p, brand: e.target.value}))} style={S.input} /></Fld><Fld l="Taglia"><select value={mf.taglia} onChange={e => setMf(p => ({...p, taglia: e.target.value}))} style={S.input}>{TAGLIE.map(t => <option key={t}>{t}</option>)}</select></Fld></div>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Costo €"><input type="number" value={mf.costo} onChange={e => setMf(p => ({...p, costo: e.target.value}))} style={S.input} /></Fld><Fld l="Prezzo €"><input type="number" value={mf.prezzo} onChange={e => setMf(p => ({...p, prezzo: e.target.value}))} style={S.input} /></Fld></div>
        <div style={{ display: "flex", gap: 8 }}><Fld l="Categoria"><select value={mf.categoria} onChange={e => setMf(p => ({...p, categoria: e.target.value}))} style={S.input}>{CATEGORIE.map(c => <option key={c}>{c}</option>)}</select></Fld><Fld l="Fonte"><select value={mf.fonte} onChange={e => setMf(p => ({...p, fonte: e.target.value}))} style={S.input}>{FONTI.map(f => <option key={f}>{f}</option>)}</select></Fld></div>
        <Fld l="Condizione"><select value={mf.condizione} onChange={e => setMf(p => ({...p, condizione: e.target.value}))} style={S.input}>{CONDIZIONI.map(c => <option key={c}>{c}</option>)}</select></Fld>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowManualAdd(false)} style={{ ...S.btn, flex: 1, background: "#26262d", color: "#9a9a9a", border: "1px solid #2e2e38" }}>Annulla</button>
          <button onClick={addManual} style={{ ...S.btn, flex: 1, background: "#4ade80", color: "#000" }}>Aggiungi</button>
        </div>
      </div></div>}

      {toast && <div style={{ ...S.toast, background: toast.t === "err" ? "#301818" : "#183018", borderColor: toast.t === "err" ? "#f8717133" : "#4ade8033" }}>{toast.m}</div>}
    </div>
  );
}

function Fld({ l, children }) { return <div style={{ marginBottom: 10, flex: 1 }}><label style={{ display: "block", fontSize: 9, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{l}</label>{children}</div>; }

/* ─── STYLES ─── */
const S = {
  app: { background: "#151518", color: "#f0ede8", fontFamily: "'DM Mono', monospace", minHeight: "100vh", display: "flex", flexDirection: "column", maxWidth: 600, margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 12px", borderBottom: "1px solid #2e2e38" },
  logo: { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 24, color: "#d4f55e", letterSpacing: -1, lineHeight: 1 },
  sub: { fontSize: 8, color: "#6a6a72", letterSpacing: 2, textTransform: "uppercase" },
  hBtn: { width: 32, height: 32, borderRadius: "50%", border: "1px solid #2e2e38", background: "#1e1e23", color: "#9a9a9a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  main: { flex: 1, padding: "16px 14px", paddingBottom: 80, overflowY: "auto" },
  fade: { animation: "fadeIn 0.25s ease" },
  row: { display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" },
  stat: { flex: "1 1 0", minWidth: 70, background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 8, padding: "12px 8px", textAlign: "center" },
  statL: { fontSize: 8, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 },
  card: { background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 8, padding: 14, marginBottom: 10 },
  secTitle: { fontSize: 9, color: "#6a6a72", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 },
  input: { width: "100%", background: "#26262d", border: "1px solid #2e2e38", color: "#f0ede8", fontFamily: "'DM Mono', monospace", fontSize: 12, padding: "9px 10px", borderRadius: 6, outline: "none" },
  chip: { padding: "5px 10px", fontSize: 10, border: "1px solid #2e2e38", background: "#1e1e23", color: "#9a9a9a", borderRadius: 16, cursor: "pointer", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" },
  chipActive: { background: "#d4f55e", color: "#000", borderColor: "#d4f55e", fontWeight: 500 },
  btn: { padding: "11px 16px", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Mono', monospace", textAlign: "center" },
  ckTitle: { fontSize: 18, fontWeight: 500, color: "#f0ede8", fontFamily: "'Playfair Display', serif", marginBottom: 14 },
  ckLabel: { fontSize: 10, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
  ckOption: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 8, color: "#f0ede8", fontSize: 13, cursor: "pointer", fontFamily: "'DM Mono', monospace", marginBottom: 4, textAlign: "left" },
  ckNext: { width: "100%", padding: 13, background: "#d4f55e", color: "#000", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Mono', monospace" },
  artCard: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 8, marginBottom: 5 },
  actG: { width: 26, height: 26, borderRadius: 6, border: "none", background: "#4ade80", color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  actD: { width: 26, height: 26, borderRadius: 6, border: "1px solid #2e2e38", background: "#26262d", color: "#6a6a72", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  bRow: { background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 8, padding: "12px 14px", marginBottom: 6, display: "flex", alignItems: "center" },
  miniStat: { background: "#26262d", borderRadius: 6, padding: "8px 6px" },
  miniL: { fontSize: 8, color: "#6a6a72", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  back: { display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#9a9a9a", fontSize: 11, cursor: "pointer", padding: "0 0 12px", fontFamily: "'DM Mono', monospace" },
  nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 600, display: "flex", background: "rgba(21,21,24,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid #2e2e38", padding: "5px 6px 8px", zIndex: 100 },
  navI: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1, padding: "5px 2px", border: "none", background: "transparent", cursor: "pointer", borderRadius: 8, fontFamily: "'DM Mono', monospace" },
  ov: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16 },
  mod: { background: "#1e1e23", border: "1px solid #2e2e38", borderRadius: 12, padding: 22, textAlign: "center", maxWidth: 360, width: "100%" },
  toast: { position: "fixed", bottom: 72, left: "50%", transform: "translateX(-50%)", padding: "8px 18px", borderRadius: 8, fontSize: 12, border: "1px solid", zIndex: 300, animation: "toastIn 0.3s ease", color: "#f0ede8", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" },
  empty: { textAlign: "center", padding: 32, border: "1px dashed #2e2e38", borderRadius: 8, marginTop: 16 },
};
