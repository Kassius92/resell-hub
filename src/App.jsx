import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Search, Package, BookOpen, Trash2, Check, Download, ChevronDown, ChevronUp, ArrowLeft, ExternalLink, Smartphone, Zap, ShoppingBag, Calendar } from "lucide-react";
import {
  GUIDA, FONTI, TAGLIE, CONDIZIONI, GENERI, COLORI, LOGO_TYPES, BRAND_LIST, BRAND_INFO,
  evaluateItem, recordSale, parseQuery, getFullRecommendations
} from "./data";

const STORAGE_KEY = "resell-hub-data";
function loadData(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } }
function saveData(k, d) { try { localStorage.setItem(k, JSON.stringify(d)); } catch {} }
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmtEur = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "€";
const getMargin = (a) => (a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo) - a.costo;
const monthLabel = (s) => new Date(s).toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
const MONTHS = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

const S = {
  app: { minHeight: "100dvh", background: "#0a0a0f", color: "#e8e8ed", fontFamily: "'DM Mono', monospace", maxWidth: 480, margin: "0 auto", paddingBottom: 80, position: "relative" },
  header: { padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#d4f55e", margin: 0 },
  main: { padding: "0 16px 20px" },
  card: { background: "#13131a", border: "1px solid #1e1e28", borderRadius: 12, padding: 16, marginBottom: 10 },
  input: { width: "100%", background: "#15151d", border: "1px solid #2a2a35", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#e8e8ed", fontFamily: "'DM Mono', monospace", outline: "none", boxSizing: "border-box" },
  select: { width: "100%", background: "#15151d", border: "1px solid #2a2a35", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#e8e8ed", fontFamily: "'DM Mono', monospace", outline: "none", appearance: "none", boxSizing: "border-box" },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  label: { fontSize: 9, color: "#666", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4, display: "block" },
  btnP: { width: "100%", padding: "13px 16px", borderRadius: 10, border: "none", background: "#d4f55e", color: "#111", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  btnS: { width: "100%", padding: "11px 16px", borderRadius: 10, border: "1px solid #2a2a35", background: "transparent", color: "#999", fontSize: 12, cursor: "pointer", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#0d0d14", borderTop: "1px solid #1e1e28", display: "flex", justifyContent: "space-around", padding: "10px 0 env(safe-area-inset-bottom, 8px)", zIndex: 50 },
  navI: (a) => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", color: a ? "#d4f55e" : "#555", fontSize: 9, cursor: "pointer", fontFamily: "'DM Mono', monospace", padding: "4px 12px" }),
  tag: (c) => ({ display: "inline-block", fontSize: 9, padding: "2px 8px", borderRadius: 4, background: c + "18", color: c, fontFamily: "'DM Mono', monospace" }),
  back: { background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: 4, padding: "4px 0", marginBottom: 12 },
  searchInput: { width: "100%", background: "#15151d", border: "1px solid #2a2a35", borderRadius: 12, padding: "14px 16px 14px 44px", fontSize: 15, color: "#e8e8ed", fontFamily: "'DM Mono', monospace", outline: "none", boxSizing: "border-box" },
  dropdown: { position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, maxHeight: 280, overflowY: "auto", background: "#15151d", border: "1px solid #2a2a35", borderRadius: 10, marginTop: 4, boxShadow: "0 12px 32px rgba(0,0,0,0.6)" },
};
const ttStyle = { background: "#1e1e23", border: "1px solid #3a3a44", borderRadius: 6, fontSize: 12, fontFamily: "'DM Mono', monospace" };
function Field({ label, children }) { return <div style={{ marginBottom: 10 }}><label style={S.label}>{label}</label>{children}</div>; }

export default function App() {
  const [tab, setTab] = useState("scopri");
  const [articles, setArticles] = useState(() => loadData(STORAGE_KEY));
  const [toast, setToast] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [guidaStep, setGuidaStep] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const saveTimer = useRef(null);

  /* Scopri state */
  const [selMonth, setSelMonth] = useState(new Date().getMonth() + 1);
  const [selYear, setSelYear] = useState(new Date().getFullYear());
  const [expandedItem, setExpandedItem] = useState(null);

  /* Valuta state */
  const [query, setQuery] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({ genere: "Uomo", taglia: "M", condizione: "Ottime condizioni", colore: "Nero", logo: "Logo grande", fonte: "Mercatino", costoAcquisto: "", prezzoVendita: "", note: "" });
  const [liveResult, setLiveResult] = useState(null);
  const searchRef = useRef(null);
  const dropRef = useRef(null);

  /* Inventario state */
  const [invSearch, setInvSearch] = useState("");
  const [invFilter, setInvFilter] = useState("tutti");
  const [sellModal, setSellModal] = useState(null);
  const [sellPrice, setSellPrice] = useState("");

  useEffect(() => { if (saveTimer.current) clearTimeout(saveTimer.current); saveTimer.current = setTimeout(() => saveData(STORAGE_KEY, articles), 300); return () => clearTimeout(saveTimer.current); }, [articles]);
  useEffect(() => { const h = (e) => { e.preventDefault(); setInstallPrompt(e); setShowInstall(true); }; window.addEventListener("beforeinstallprompt", h); if (!window.matchMedia("(display-mode: standalone)").matches) { const t = setTimeout(() => setShowInstall(true), 2000); return () => { clearTimeout(t); window.removeEventListener("beforeinstallprompt", h); }; } return () => window.removeEventListener("beforeinstallprompt", h); }, []);
  async function handleInstall() { if (installPrompt) { installPrompt.prompt(); const { outcome } = await installPrompt.userChoice; if (outcome === "accepted") setShowInstall(false); setInstallPrompt(null); } else showToast("Menu browser → Aggiungi a schermata Home"); }
  const showToast = useCallback((msg, type = "ok") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); }, []);
  useEffect(() => { function h(e) { if (dropRef.current && !dropRef.current.contains(e.target) && searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false); } document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);

  /* Recommendations */
  const recs = useMemo(() => getFullRecommendations(selMonth), [selMonth]);

  /* Live eval */
  useEffect(() => {
    if (!selectedBrand || !selectedItem) { setLiveResult(null); return; }
    const isModel = selectedItem.type === "model";
    const r = evaluateItem({ brand: selectedBrand, tipo: isModel ? "_default" : selectedItem.label, dettagli: isModel ? selectedItem.label : "", genere: details.genere, taglia: details.taglia, condizione: details.condizione, costoAcquisto: details.costoAcquisto, colore: details.colore, logo: details.logo });
    const up = parseFloat(details.prezzoVendita);
    if (up > 0) { const c = parseFloat(details.costoAcquisto) || 0; r.userPrice = up; r.userMargin = Math.round((up - c) * 100) / 100; r.userMarginPct = c > 0 ? Math.round((r.userMargin / c) * 100) : null; }
    setLiveResult(r);
  }, [selectedBrand, selectedItem, details]);

  function handleSearch(val) { setQuery(val); setShowDrop(true); if (!val.trim()) { setSelectedBrand(null); setSelectedItem(null); setLiveResult(null); return; } const p = parseQuery(val); if (p.brand && !selectedBrand) setSelectedBrand(p.brand); if (p.match) { setSelectedBrand(p.brand); setSelectedItem(p.match); setShowDrop(false); } }
  function selectSuggestion(sug) { if (sug.type === "brand") { setSelectedBrand(sug.label); setQuery(sug.label + " "); setSelectedItem(null); setShowDrop(true); searchRef.current?.focus(); } else { setSelectedItem(sug); setQuery((selectedBrand || "") + " " + sug.label); setShowDrop(false); } }
  function clearSearch() { setQuery(""); setSelectedBrand(null); setSelectedItem(null); setLiveResult(null); setShowDrop(false); setShowDetails(false); setDetails(d => ({ ...d, costoAcquisto: "", prezzoVendita: "", note: "" })); }
  function addToInventory() { if (!liveResult) return; const nome = [selectedBrand, selectedItem?.label].filter(Boolean).join(" "); const up = parseFloat(details.prezzoVendita); setArticles(prev => [{ id: genId(), nome, brand: selectedBrand || "", categoria: "Abbigliamento", costo: parseFloat(details.costoAcquisto) || 0, prezzo: up > 0 ? up : Math.round((liveResult.priceMin + liveResult.priceMax) / 2), prezzoVendita: null, fonte: details.fonte, taglia: details.taglia, condizione: details.condizione, genere: details.genere, note: details.note, venduto: false, dataAcquisto: new Date().toISOString(), dataVendita: null }, ...prev]); showToast("Aggiunto!"); clearSearch(); }
  function confirmSell() { const fp = parseFloat(sellPrice) || 0; const item = articles.find(a => a.id === sellModal.id); if (item) recordSale({ brand: item.brand, tipo: item.categoria, genere: item.genere, taglia: item.taglia, condizione: item.condizione, soldPrice: fp }); setArticles(p => p.map(a => a.id === sellModal.id ? { ...a, venduto: true, prezzoVendita: fp, dataVendita: new Date().toISOString() } : a)); setSellModal(null); setSellPrice(""); showToast("Venduto! 🎉"); }

  const parsed = parseQuery(query);
  const venduti = articles.filter(a => a.venduto);
  const totProfit = venduti.reduce((s, a) => s + getMargin(a), 0);
  const filteredInv = articles.filter(a => { const q = invSearch.toLowerCase(); return (!invSearch || a.nome.toLowerCase().includes(q) || a.brand.toLowerCase().includes(q)) && (invFilter === "tutti" || (invFilter === "venduto" && a.venduto) || (invFilter === "attivo" && !a.venduto)); });

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div><h1 style={S.logo}>Resell Hub</h1><span style={{ fontSize: 9, color: "#555", letterSpacing: 1 }}>v5.0</span></div>
        <button onClick={() => { if (!articles.length) { showToast("Nessun dato", "err"); return; } const h = ["Nome","Brand","Costo","Prezzo","Venduto","Margine","Fonte","Taglia"]; const rows = articles.map(a => { const sp = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo; return [a.nome,a.brand,a.costo,sp,a.venduto?"Sì":"No",(sp-a.costo).toFixed(2),a.fonte,a.taglia].map(v=>`"${v}"`).join(","); }); const csv = "\uFEFF"+[h.join(","),...rows].join("\n"); const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"}); const url = URL.createObjectURL(blob); const el = document.createElement("a"); el.href=url; el.download=`resell-hub-${new Date().toISOString().slice(0,10)}.csv`; el.click(); URL.revokeObjectURL(url); showToast("CSV scaricato!"); }} style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}><Download size={15} /></button>
      </header>

      {showInstall && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "#13131a", borderBottom: "1px solid #1e1e28" }}>
          <Smartphone size={14} style={{ color: "#d4f55e" }} /><span style={{ fontSize: 10, color: "#999", flex: 1 }}>Installa come app</span>
          <button onClick={handleInstall} style={{ ...S.tag("#d4f55e"), cursor: "pointer", border: "none", fontWeight: 600 }}>Installa</button>
          <button onClick={() => setShowInstall(false)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}>✕</button>
        </div>
      )}

      <main style={S.main}>

        {/* ═══════════ SCOPRI ═══════════ */}
        {tab === "scopri" && (
          <div>
            {/* Month picker */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
              <Calendar size={16} style={{ color: "#d4f55e", flexShrink: 0 }} />
              <select value={selMonth} onChange={e => { setSelMonth(+e.target.value); setExpandedItem(null); }} style={{ ...S.select, flex: 1 }}>
                {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
              <select value={selYear} onChange={e => setSelYear(+e.target.value)} style={{ ...S.select, width: 90 }}>
                {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#d4f55e" }}>Cosa comprare a {recs.monthName}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{recs.items.length} articoli analizzati — ordinati per convenienza</div>
            </div>

            {/* Items */}
            {recs.items.map((item, idx) => {
              const isOpen = expandedItem === idx;
              const brandColor = BRAND_INFO[item.brand]?.color || "#d4f55e";
              return (
                <div key={item.brand + item.tipo + idx} style={{ ...S.card, padding: 0, overflow: "hidden", marginBottom: 8 }}>
                  {/* Collapsed row */}
                  <div onClick={() => setExpandedItem(isOpen ? null : idx)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#555" }}>#{idx + 1}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: brandColor }}>{item.brand}</span>
                        <span style={{ fontSize: 13, color: "#bbb" }}>{item.tipo}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={S.tag(item.seasonColor)}>{item.seasonTag}</span>
                        <span style={S.tag("#d4f55e")}>{item.score}/10</span>
                        <span style={{ fontSize: 10, color: "#555" }}>{item.sellMin}–{item.sellMax}€</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={16} style={{ color: "#555" }} /> : <ChevronDown size={16} style={{ color: "#555" }} />}
                  </div>

                  {/* Expanded details */}
                  {isOpen && (
                    <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1e1e28", animation: "fadeIn 0.2s ease" }}>

                      {/* Prices */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14, marginBottom: 14 }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Compra a</div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#fbbf24", fontFamily: "'Playfair Display', serif" }}>{item.priceMin}–{item.priceMax}€</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Rivendi a</div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#4ade80", fontFamily: "'Playfair Display', serif" }}>{item.sellMin}–{item.sellMax}€</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Margine</div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#4ade80", fontFamily: "'Playfair Display', serif" }}>+{item.marginMin}–{item.marginMax}€</div>
                        </div>
                      </div>

                      {/* Info grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                        {[
                          { l: "ROI", v: item.roiMin + "% – " + item.roiMax + "%", c: item.roiMin >= 50 ? "#4ade80" : "#fbbf24" },
                          { l: "Domanda", v: "●".repeat(item.demand) + "○".repeat(5 - item.demand) + " " + item.demand + "/5", c: item.demand >= 4 ? "#4ade80" : "#fbbf24" },
                          { l: "Velocità vendita", v: item.speed, c: "#60a5fa" },
                          { l: "Affidabilità", v: item.confidence + "%", c: item.confidence >= 70 ? "#4ade80" : "#fbbf24" },
                          { l: "Rischio falsi", v: item.fakeRisk, c: item.fakeRisk === "alto" ? "#f87171" : item.fakeRisk === "medio" ? "#fbbf24" : "#4ade80" },
                          { l: "Taglie migliori", v: item.bestSizes, c: "#c084fc" },
                          { l: "Budget", v: item.budget, c: item.budget === "basso" ? "#4ade80" : item.budget === "medio" ? "#fbbf24" : "#f87171" },
                          { l: "Tier", v: item.tier, c: "#60a5fa" },
                        ].map(info => (
                          <div key={info.l} style={{ padding: "8px 10px", background: "#0f0f17", borderRadius: 8 }}>
                            <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{info.l}</div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: info.c }}>{info.v}</div>
                          </div>
                        ))}
                      </div>

                      {/* Perché comprarlo */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Perché comprarlo</div>
                        {item.reasons.map((r, i) => (
                          <div key={i} style={{ fontSize: 11, color: "#999", lineHeight: 1.6, paddingLeft: 12, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: "#4ade80" }}>→</span>{r}
                          </div>
                        ))}
                      </div>

                      {/* Modelli consigliati */}
                      {item.topModels.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Modelli da cercare</div>
                          {item.topModels.map((m, i) => (
                            <div key={i} style={{ padding: "8px 10px", background: "#0f0f17", borderRadius: 8, marginBottom: 4 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 12, fontWeight: 500, color: "#e8e8ed" }}>{m.name}</span>
                                <span style={{ fontSize: 11, color: "#d4f55e" }}>{m.min}–{m.max}€</span>
                              </div>
                              {m.note && <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>{m.note.split(".")[0]}</div>}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Dove trovarlo */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Dove trovarlo</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {item.sources.map((s, i) => <span key={i} style={S.tag("#60a5fa")}>{s}</span>)}
                        </div>
                      </div>

                      {/* Consigli */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Consigli pratici</div>
                        {item.tips.map((t, i) => (
                          <div key={i} style={{ fontSize: 11, color: "#888", lineHeight: 1.6, paddingLeft: 12, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: "#fbbf24" }}>💡</span>{t}
                          </div>
                        ))}
                      </div>

                      {/* Vinted link */}
                      <a href={item.vintedUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "10px 14px", borderRadius: 8, background: "rgba(0,191,165,0.1)",
                        border: "1px solid rgba(0,191,165,0.2)", color: "#00bfa5", fontSize: 11,
                        textDecoration: "none", fontFamily: "'DM Mono', monospace",
                      }}>
                        <Search size={12} /> Cerca su Vinted <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════ VALUTA ═══════════ */}
        {tab === "valuta" && (
          <div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#555" }} />
              <input ref={searchRef} value={query} onChange={e => handleSearch(e.target.value)} onFocus={() => { if (query.trim()) setShowDrop(true); }} placeholder='es. "Nike Air Force 1"' style={{ ...S.searchInput, borderColor: selectedItem ? "#4ade80" : query ? "#d4f55e" : "#2a2a35" }} />
              {query && <button onClick={clearSearch} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>✕</button>}
              {showDrop && parsed.suggestions.length > 0 && !selectedItem && (
                <div ref={dropRef} style={S.dropdown}>
                  {parsed.suggestions.map((sug, i) => (
                    <div key={sug.label+i} onMouseDown={e => { e.preventDefault(); selectSuggestion(sug); }} style={{ padding: "11px 16px", cursor: "pointer", borderBottom: "1px solid #1a1a24" }} onMouseEnter={e => e.currentTarget.style.background="#1a1a24"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div><span style={{ fontSize: 13, color: "#e8e8ed" }}>{sug.label}</span><span style={{ ...S.tag(sug.type==="brand"?"#60a5fa":sug.type==="model"?"#4ade80":"#fb923c"), marginLeft: 8 }}>{sug.type==="brand"?"brand":sug.type==="model"?"modello":"tipo"}</span></div>
                        {sug.min && <span style={{ fontSize: 11, color: "#666" }}>{sug.min}–{sug.max}€</span>}
                      </div>
                      {sug.note && <div style={{ fontSize: 10, color: "#555", marginTop: 3 }}>{sug.note.split(".")[0]}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedBrand && !selectedItem && <div style={{ ...S.card, padding: "12px 16px", display: "flex", gap: 10 }}><span style={{ fontSize: 14, fontWeight: 600, color: BRAND_INFO[selectedBrand]?.color || "#d4f55e" }}>{selectedBrand}</span><span style={{ fontSize: 11, color: "#555" }}>→ scegli modello o tipo</span></div>}

            {liveResult && (
              <div style={{ animation: "fadeIn 0.2s ease" }}>
                <div style={{ ...S.card, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{liveResult.verdictIcon}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: liveResult.verdictColor, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>{liveResult.verdict}</div>
                  <div style={{ fontSize: 12, color: "#777", marginBottom: 12 }}>{selectedBrand} — {selectedItem?.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 600, color: "#d4f55e", fontFamily: "'Playfair Display', serif" }}>{liveResult.priceMin}€ — {liveResult.priceMax}€</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>stima rivendita Vinted</div>
                  {liveResult.marginPctMin !== null && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 14 }}>
                      <div><div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>Margine</div><div style={{ fontSize: 15, fontWeight: 500, color: liveResult.marginMin >= 0 ? "#4ade80" : "#f87171" }}>{fmtEur(liveResult.marginMin)} / {fmtEur(liveResult.marginMax)}</div></div>
                      <div><div style={{ fontSize: 9, color: "#555", textTransform: "uppercase" }}>ROI</div><div style={{ fontSize: 15, fontWeight: 500, color: liveResult.marginPctMin >= 50 ? "#4ade80" : "#fbbf24" }}>{liveResult.marginPctMin}%–{liveResult.marginPctMax}%</div></div>
                    </div>
                  )}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginBottom: 4 }}><span>Affidabilità</span><span style={{ color: liveResult.confidence >= 70 ? "#4ade80" : "#fbbf24", fontWeight: 600 }}>{liveResult.confidence}%</span></div>
                    <div style={{ height: 6, background: "#1e1e28", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${liveResult.confidence}%`, height: "100%", borderRadius: 3, background: liveResult.confidence >= 70 ? "#4ade80" : "#fbbf24", transition: "width 0.4s" }} /></div>
                  </div>
                </div>
                <button onClick={() => setShowDetails(!showDetails)} style={{ ...S.btnS, marginBottom: 10 }}>{showDetails ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}{showDetails ? "Nascondi" : "Più dettagli"}</button>
                {showDetails && (
                  <div style={{ ...S.card, animation: "fadeIn 0.2s ease" }}>
                    <div style={S.row2}><Field label="Genere"><select value={details.genere} onChange={e=>setDetails(d=>({...d,genere:e.target.value}))} style={S.select}>{GENERI.map(g=><option key={g}>{g}</option>)}</select></Field><Field label="Taglia"><select value={details.taglia} onChange={e=>setDetails(d=>({...d,taglia:e.target.value}))} style={S.select}>{TAGLIE.map(t=><option key={t}>{t}</option>)}</select></Field></div>
                    <div style={S.row2}><Field label="Colore"><select value={details.colore} onChange={e=>setDetails(d=>({...d,colore:e.target.value}))} style={S.select}>{COLORI.map(c=><option key={c}>{c}</option>)}</select></Field><Field label="Logo"><select value={details.logo} onChange={e=>setDetails(d=>({...d,logo:e.target.value}))} style={S.select}>{LOGO_TYPES.map(l=><option key={l}>{l}</option>)}</select></Field></div>
                    <div style={S.row2}><Field label="Condizione"><select value={details.condizione} onChange={e=>setDetails(d=>({...d,condizione:e.target.value}))} style={S.select}>{CONDIZIONI.map(c=><option key={c}>{c}</option>)}</select></Field><Field label="Fonte"><select value={details.fonte} onChange={e=>setDetails(d=>({...d,fonte:e.target.value}))} style={S.select}>{FONTI.map(f=><option key={f}>{f}</option>)}</select></Field></div>
                    <div style={S.row2}><Field label="Costo (€)"><input type="number" value={details.costoAcquisto} onChange={e=>setDetails(d=>({...d,costoAcquisto:e.target.value}))} placeholder="0.00" step="0.01" style={S.input}/></Field><Field label="Prezzo vendita (€)"><input type="number" value={details.prezzoVendita} onChange={e=>setDetails(d=>({...d,prezzoVendita:e.target.value}))} placeholder="Auto" step="0.01" style={S.input}/></Field></div>
                  </div>
                )}
                <a href={liveResult.vintedUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(0,191,165,0.1)", border: "1px solid rgba(0,191,165,0.25)", color: "#00bfa5", fontSize: 12, textDecoration: "none", marginBottom: 10 }}><Search size={14}/> Vinted <ExternalLink size={12}/></a>
                <div style={{ display: "flex", gap: 10 }}><button onClick={addToInventory} style={{ ...S.btnP, flex: 1 }}><Package size={14}/> Salva</button><button onClick={clearSearch} style={{ ...S.btnS, flex: 1 }}>Nuova</button></div>
              </div>
            )}

            {!query && !liveResult && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <div style={{ fontSize: 14, color: "#777", fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>Valuta un pezzo</div>
                <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>Scrivi brand + modello/tipo<br/>es. "Nike Tech Fleece", "Adidas Samba"</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 20 }}>
                  {["Nike Air Force 1","Adidas Samba","TNF Nuptse","Levi's 501","Carhartt Detroit"].map(ex => (
                    <button key={ex} onClick={() => handleSearch(ex)} style={{ ...S.tag("#d4f55e"), cursor: "pointer", border: "none", padding: "6px 12px", fontSize: 11 }}>{ex}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ INVENTARIO ═══════════ */}
        {tab === "inventario" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[{l:"Tot",v:articles.length,c:"#d4f55e"},{l:"Venduti",v:venduti.length,c:"#4ade80"},{l:"Profitto",v:fmtEur(totProfit),c:totProfit>=0?"#4ade80":"#f87171"}].map(s=>(
                <div key={s.l} style={{ ...S.card, flex: 1, textAlign: "center", padding: "12px 6px", marginBottom: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: s.c, fontFamily: "'Playfair Display', serif" }}>{s.v}</div>
                  <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1, position: "relative" }}><Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#555" }}/><input value={invSearch} onChange={e=>setInvSearch(e.target.value)} placeholder="Cerca..." style={{...S.input,paddingLeft:32}}/></div>
              <select value={invFilter} onChange={e=>setInvFilter(e.target.value)} style={{...S.select,width:"auto",minWidth:80}}><option value="tutti">Tutti</option><option value="attivo">In vendita</option><option value="venduto">Venduti</option></select>
            </div>
            {filteredInv.length===0 && <div style={{textAlign:"center",padding:"30px 0",color:"#444",fontSize:12}}>{articles.length===0?"Nessun articolo":"Nessun risultato"}</div>}
            {filteredInv.map(a => { const m=getMargin(a); return (
              <div key={a.id} style={{...S.card,padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:"#e8e8ed",marginBottom:3}}>{a.nome}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}><span style={S.tag(a.venduto?"#4ade80":"#fbbf24")}>{a.venduto?"Venduto":"In vendita"}</span><span style={{fontSize:10,color:"#555"}}>{a.taglia}·{a.fonte}</span></div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:600,color:m>=0?"#4ade80":"#f87171"}}>{fmtEur(m)}</div><div style={{fontSize:10,color:"#555"}}>{a.costo.toFixed(2)}€→{(a.venduto?a.prezzoVendita:a.prezzo).toFixed(2)}€</div></div>
                </div>
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  {!a.venduto && <button onClick={()=>{setSellModal({id:a.id});setSellPrice(String(a.prezzo));}} style={{...S.tag("#4ade80"),cursor:"pointer",border:"none",padding:"5px 12px"}}>✓ Venduto</button>}
                  <button onClick={()=>{setArticles(p=>p.filter(x=>x.id!==a.id));showToast("Eliminato","err");}} style={{...S.tag("#f87171"),cursor:"pointer",border:"none",padding:"5px 10px"}}>✕</button>
                </div>
              </div>
            );})}
          </div>
        )}

        {/* ═══════════ GUIDA ═══════════ */}
        {tab === "guida" && (
          <div>
            {guidaStep === null ? (
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#d4f55e", marginBottom: 14 }}>Guida al Resell</div>
                {GUIDA.map((step, i) => (
                  <div key={i} onClick={() => setGuidaStep(i)} style={{ ...S.card, padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between" }} onMouseEnter={e => e.currentTarget.style.borderColor="#d4f55e33"} onMouseLeave={e => e.currentTarget.style.borderColor="#1e1e28"}>
                    <div><div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Passo {i+1}</div><div style={{ fontSize: 13, color: "#e8e8ed", marginTop: 2 }}>{step.titolo}</div></div><span style={{ color: "#555" }}>→</span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setGuidaStep(null)} style={S.back}><ArrowLeft size={14}/> Indietro</button>
                <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Passo {guidaStep+1}/{GUIDA.length}</div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#d4f55e", marginBottom: 14 }}>{GUIDA[guidaStep].titolo}</div>
                {GUIDA[guidaStep].sezioni.map((sez, si) => (
                  <div key={si} style={{ marginBottom: 8 }}>
                    <div onClick={()=>setOpenSections(p=>({...p,[guidaStep+"-"+si]:!p[guidaStep+"-"+si]}))} style={{...S.card,padding:"12px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:0}}>
                      <span style={{fontSize:12,color:"#e8e8ed"}}>{sez.titolo}</span>{openSections[guidaStep+"-"+si]?<ChevronUp size={14} style={{color:"#555"}}/>:<ChevronDown size={14} style={{color:"#555"}}/>}
                    </div>
                    {openSections[guidaStep+"-"+si] && <div style={{background:"#0f0f17",border:"1px solid #1e1e28",borderTop:"none",borderRadius:"0 0 12px 12px",padding:"14px 16px"}}><div style={{fontSize:12,color:"#999",lineHeight:1.8,whiteSpace:"pre-line"}}>{sez.contenuto}</div></div>}
                  </div>
                ))}
                <div style={{display:"flex",gap:10,marginTop:16}}>
                  {guidaStep>0&&<button onClick={()=>{setGuidaStep(guidaStep-1);setOpenSections({});}} style={{...S.btnS,flex:1}}>← Prec</button>}
                  {guidaStep<GUIDA.length-1&&<button onClick={()=>{setGuidaStep(guidaStep+1);setOpenSections({});}} style={{...S.btnP,flex:1}}>Prossimo →</button>}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {sellModal && (<><div onClick={()=>setSellModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:200}}/><div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#13131a",border:"1px solid #1e1e28",borderRadius:"16px 16px 0 0",padding:24,zIndex:201}}><div style={{fontSize:14,fontWeight:600,color:"#e8e8ed",marginBottom:14}}>Prezzo vendita</div><input type="number" value={sellPrice} onChange={e=>setSellPrice(e.target.value)} autoFocus placeholder="0.00" style={{...S.input,fontSize:20,padding:"12px 14px",textAlign:"center",marginBottom:14}}/><div style={{display:"flex",gap:10}}><button onClick={confirmSell} style={{...S.btnP,flex:1}}><Check size={14}/> Conferma</button><button onClick={()=>setSellModal(null)} style={{...S.btnS,flex:1}}>Annulla</button></div></div></>)}
      {toast && <div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",padding:"10px 20px",borderRadius:8,fontSize:12,zIndex:300,background:toast.type==="err"?"#f87171":"#4ade80",color:"#111",fontFamily:"'DM Mono',monospace",fontWeight:500}}>{toast.msg}</div>}

      <nav style={S.nav}>
        <button onClick={()=>setTab("scopri")} style={S.navI(tab==="scopri")}><ShoppingBag size={18}/><span>Scopri</span></button>
        <button onClick={()=>setTab("valuta")} style={S.navI(tab==="valuta")}><Zap size={18}/><span>Valuta</span></button>
        <button onClick={()=>setTab("inventario")} style={S.navI(tab==="inventario")}><Package size={18}/><span>Inventario</span></button>
        <button onClick={()=>setTab("guida")} style={S.navI(tab==="guida")}><BookOpen size={18}/><span>Guida</span></button>
      </nav>

      <style>{`*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}body{background:#0a0a0f;margin:0;overflow-x:hidden}input,select,textarea,button{font-family:'DM Mono',monospace}input:focus,select:focus,textarea:focus{border-color:#d4f55e!important;outline:none}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2a35;border-radius:2px}@keyframes fadeIn{from{opacity:0}to{opacity:1}}select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px}`}</style>
    </div>
  );
}
