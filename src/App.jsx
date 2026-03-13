import { useState, useEffect, useCallback, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { RotateCcw, Search, Plus, Package, LayoutDashboard, Tag, Lightbulb, Trash2, Check, Download } from "lucide-react";
import {
  BRANDS, TIPS, CATEGORIE, FONTI, TAGLIE, CONDIZIONI, GENERI,
  TAG_CONFIG, PIE_COLORS
} from "./data";

/* ─── STORAGE ─── */
const STORAGE_KEY = "resell-hub-data";

function loadArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveArticles(articles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error("Save failed:", e);
  }
}

/* ─── UTILS ─── */
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatEur(n) {
  return (n >= 0 ? "+" : "") + n.toFixed(2) + "€";
}

function getMonthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", { month: "short", year: "2-digit" });
}

const tooltipStyle = {
  background: "#1e1e23",
  border: "1px solid #3a3a44",
  borderRadius: 6,
  fontSize: 12,
  fontFamily: "'DM Mono', monospace",
};

/* ─── MAIN APP ─── */
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [articles, setArticles] = useState(() => loadArticles());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("tutti");
  const [brandSearch, setBrandSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("tutti");
  const [showReset, setShowReset] = useState(false);
  const [sellModal, setSellModal] = useState(null); // { id, prezzoOriginale }
  const [sellPrice, setSellPrice] = useState("");
  const [toast, setToast] = useState(null);
  const saveTimer = useRef(null);

  // Form state
  const [form, setForm] = useState({
    nome: "", brand: "", categoria: "Abbigliamento",
    costo: "", prezzo: "", fonte: "Primark", taglia: "M",
    condizione: "Nuovo con etichette", genere: "Unisex", note: ""
  });

  // Auto-save with debounce
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveArticles(articles), 300);
    return () => clearTimeout(saveTimer.current);
  }, [articles]);

  const showToast = useCallback((msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  }, []);

  /* ─── ACTIONS ─── */
  function addArticle() {
    if (!form.nome.trim()) {
      showToast("Inserisci il nome!", "err");
      return;
    }
    const costo = parseFloat(form.costo) || 0;
    const prezzo = parseFloat(form.prezzo) || 0;
    const newArt = {
      id: genId(),
      nome: form.nome.trim(),
      brand: form.brand.trim(),
      categoria: form.categoria,
      costo,
      prezzo,
      prezzoVendita: null,
      fonte: form.fonte,
      taglia: form.taglia,
      condizione: form.condizione,
      genere: form.genere,
      note: form.note,
      venduto: false,
      dataAcquisto: new Date().toISOString(),
      dataVendita: null,
    };
    setArticles((prev) => [newArt, ...prev]);
    setForm({
      nome: "", brand: "", categoria: "Abbigliamento",
      costo: "", prezzo: "", fonte: "Primark", taglia: "M",
      condizione: "Nuovo con etichette", genere: "Unisex", note: ""
    });
    showToast("Articolo aggiunto!");
    setTab("inventario");
  }

  function openSellModal(article) {
    setSellModal({ id: article.id, prezzoOriginale: article.prezzo });
    setSellPrice(String(article.prezzo));
  }

  function confirmSell() {
    const finalPrice = parseFloat(sellPrice) || 0;
    setArticles((prev) =>
      prev.map((a) =>
        a.id === sellModal.id
          ? { ...a, venduto: true, prezzoVendita: finalPrice, dataVendita: new Date().toISOString() }
          : a
      )
    );
    setSellModal(null);
    setSellPrice("");
    showToast("Venduto! 🎉");
  }

  function deleteArticle(id) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast("Eliminato", "err");
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    setArticles([]);
    setShowReset(false);
    showToast("Tutto azzerato");
  }

  function exportCSV() {
    if (!articles.length) {
      showToast("Nessun dato da esportare", "err");
      return;
    }
    const headers = ["Nome", "Brand", "Categoria", "Taglia", "Condizione", "Genere", "Costo", "Prezzo Listino", "Prezzo Vendita", "Margine", "Margine%", "Fonte", "Stato", "Data Acquisto", "Data Vendita", "Note"];
    const rows = articles.map((a) => {
      const soldPrice = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
      const margin = soldPrice - a.costo;
      const pct = a.costo > 0 ? ((margin / a.costo) * 100).toFixed(1) : "0";
      return [
        a.nome, a.brand, a.categoria, a.taglia, a.condizione || "", a.genere || "",
        a.costo.toFixed(2), a.prezzo.toFixed(2),
        a.venduto ? soldPrice.toFixed(2) : "",
        margin.toFixed(2), pct + "%",
        a.fonte, a.venduto ? "Venduto" : "In vendita",
        a.dataAcquisto ? new Date(a.dataAcquisto).toLocaleDateString("it-IT") : "",
        a.dataVendita ? new Date(a.dataVendita).toLocaleDateString("it-IT") : "",
        a.note || ""
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resell-hub-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV scaricato!");
  }

  /* ─── COMPUTED ─── */
  const getMargin = (a) => {
    const soldPrice = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
    return soldPrice - a.costo;
  };

  const venduti = articles.filter((a) => a.venduto);
  const inVendita = articles.filter((a) => !a.venduto);
  const totGuadagno = venduti.reduce((s, a) => s + getMargin(a), 0);
  const totInvestito = venduti.reduce((s, a) => s + a.costo, 0);
  const totInvestitoTutto = articles.reduce((s, a) => s + a.costo, 0);
  const roi = totInvestito > 0 ? ((totGuadagno / totInvestito) * 100).toFixed(0) : 0;

  // Monthly profit
  const monthlyData = (() => {
    const months = {};
    venduti.forEach((a) => {
      const k = getMonthLabel(a.dataVendita || a.dataAcquisto);
      if (!months[k]) months[k] = { mese: k, profitto: 0, vendite: 0 };
      months[k].profitto += getMargin(a);
      months[k].vendite += 1;
    });
    return Object.values(months).slice(-6);
  })();

  // Category breakdown
  const catData = (() => {
    const cats = {};
    articles.forEach((a) => {
      if (!cats[a.categoria]) cats[a.categoria] = 0;
      cats[a.categoria]++;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  })();

  // Source performance
  const sourceData = (() => {
    const sources = {};
    venduti.forEach((a) => {
      if (!sources[a.fonte])
        sources[a.fonte] = { fonte: a.fonte, profitto: 0, count: 0 };
      sources[a.fonte].profitto += getMargin(a);
      sources[a.fonte].count += 1;
    });
    return Object.values(sources)
      .sort((a, b) => b.profitto - a.profitto)
      .slice(0, 5);
  })();

  // Filtered
  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      a.nome.toLowerCase().includes(q) ||
      a.brand.toLowerCase().includes(q) ||
      (a.condizione || "").toLowerCase().includes(q);
    const matchFilter =
      filter === "tutti" ||
      (filter === "venduto" && a.venduto) ||
      (filter === "in_vendita" && !a.venduto);
    return matchSearch && matchFilter;
  });

  const filteredBrands = BRANDS.filter((b) => {
    const matchSearch =
      !brandSearch ||
      b.name.toLowerCase().includes(brandSearch.toLowerCase());
    const matchFilter =
      brandFilter === "tutti" || b.tags.includes(brandFilter);
    return matchSearch && matchFilter;
  });

  /* ─── FORM MARGIN PREVIEW ─── */
  const costoNum = parseFloat(form.costo) || 0;
  const prezzoNum = parseFloat(form.prezzo) || 0;
  const previewMargin = prezzoNum - costoNum;
  const previewPct =
    costoNum > 0 ? ((previewMargin / costoNum) * 100).toFixed(0) : null;

  /* ─── RENDER ─── */
  return (
    <div style={S.app}>
      {/* ─── HEADER ─── */}
      <header style={S.header}>
        <div>
          <h1 style={S.logo}>Resell Hub</h1>
          <span style={S.version}>Vinted Tracker v2.1</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={exportCSV} style={S.headerBtn} title="Esporta CSV">
            <Download size={15} />
          </button>
          <button onClick={() => setShowReset(true)} style={S.headerBtn} title="Azzera tutto">
            <RotateCcw size={15} />
          </button>
        </div>
      </header>

      {/* ─── CONTENT ─── */}
      <main style={S.content}>
        {/* ═══ DASHBOARD ═══ */}
        {tab === "dashboard" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={S.statsRow}>
              <StatCard label="Articoli" value={articles.length} color="var(--accent)" />
              <StatCard label="Venduti" value={venduti.length} color="var(--green)" />
              <StatCard label="In vendita" value={inVendita.length} color="var(--yellow)" />
              <StatCard label="ROI" value={roi + "%"} color="#60a5fa" />
            </div>

            <div style={S.statsRow}>
              <BigStat
                label="Profitto netto"
                value={formatEur(totGuadagno)}
                color={totGuadagno >= 0 ? "var(--green)" : "var(--red)"}
              />
              <BigStat
                label="Investito totale"
                value={totInvestitoTutto.toFixed(2) + "€"}
                color="var(--accent)"
              />
            </div>

            {monthlyData.length > 0 && (
              <div style={S.card}>
                <SectionTitle>Profitto mensile</SectionTitle>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <XAxis dataKey="mese" tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "var(--muted)" }} formatter={(v) => [v.toFixed(2) + "€", "Profitto"]} />
                    <Bar dataKey="profitto" radius={[3, 3, 0, 0]}>
                      {monthlyData.map((entry, i) => (
                        <Cell key={i} fill={entry.profitto >= 0 ? "#4ade80" : "#f87171"} />
                      ))}
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
                    <PieChart>
                      <Pie data={catData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" stroke="none">
                        {catData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [v, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {catData.map((c, i) => (
                      <span key={i} style={{ fontSize: 10, color: PIE_COLORS[i % PIE_COLORS.length] }}>
                        ● {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {sourceData.length > 0 && (
                <div style={{ ...S.card, flex: "1 1 200px" }}>
                  <SectionTitle>Top fonti (profitto)</SectionTitle>
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
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cerca articolo o brand..."
                style={{ ...S.input, paddingLeft: 34 }}
              />
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { key: "tutti", label: "Tutti", count: articles.length },
                { key: "in_vendita", label: "In vendita", count: inVendita.length },
                { key: "venduto", label: "Venduti", count: venduti.length },
              ].map((f) => (
                <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
                  {f.label} ({f.count})
                </FilterChip>
              ))}
            </div>

            {filtered.length === 0 ? (
              <EmptyState icon="🔍" title="Nessun risultato" />
            ) : (
              filtered.map((a, i) => {
                const margin = getMargin(a);
                const base = a.venduto ? (a.prezzoVendita ?? a.prezzo) : a.prezzo;
                const marginPct = a.costo > 0 ? ((margin / a.costo) * 100).toFixed(0) : "∞";
                return (
                  <div key={a.id} style={{ ...S.articleCard, animation: `slideUp 0.3s ease ${i * 0.03}s forwards`, opacity: 0 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={S.articleName}>{a.nome}</span>
                        <StatusBadge venduto={a.venduto} />
                      </div>
                      <div style={S.articleMeta}>
                        {a.brand && <span>{a.brand}</span>}
                        <span>·</span>
                        <span>{a.categoria}</span>
                        {a.taglia && <><span>·</span><span>Tg. {a.taglia}</span></>}
                        {a.condizione && <><span>·</span><span>{a.condizione}</span></>}
                        {a.genere && a.genere !== "Unisex" && <><span>·</span><span>{a.genere}</span></>}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>
                        {a.fonte}
                        {a.venduto && a.prezzoVendita != null && a.prezzoVendita !== a.prezzo && (
                          <span style={{ color: "var(--yellow)", marginLeft: 6 }}>
                            (listino {a.prezzo.toFixed(2)}€ → venduto {a.prezzoVendita.toFixed(2)}€)
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: margin >= 0 ? "var(--green)" : "var(--red)" }}>
                        {formatEur(margin)}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--dim)" }}>
                        {a.costo.toFixed(2)}→{base.toFixed(2)} ({marginPct}%)
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                      {!a.venduto && (
                        <button onClick={() => openSellModal(a)} style={S.btnGreen} title="Segna come venduto">
                          <Check size={14} />
                        </button>
                      )}
                      <button onClick={() => deleteArticle(a.id)} style={S.btnDel} title="Elimina">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ═══ AGGIUNGI ═══ */}
        {tab === "aggiungi" && (
          <div style={{ animation: "fadeIn 0.3s ease", maxWidth: 500 }}>
            <SectionTitle>Nuovo articolo</SectionTitle>
            <div style={S.card}>
              <Field label="Nome articolo" required>
                <input
                  value={form.nome}
                  onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                  placeholder="es. Felpa Nike L"
                  style={S.input}
                />
              </Field>
              <div style={S.formRow}>
                <Field label="Brand">
                  <input
                    value={form.brand}
                    onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                    placeholder="Nike"
                    style={S.input}
                  />
                </Field>
                <Field label="Taglia">
                  <select
                    value={form.taglia}
                    onChange={(e) => setForm((p) => ({ ...p, taglia: e.target.value }))}
                    style={S.input}
                  >
                    {TAGLIE.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div style={S.formRow}>
                <Field label="Condizione">
                  <select
                    value={form.condizione}
                    onChange={(e) => setForm((p) => ({ ...p, condizione: e.target.value }))}
                    style={S.input}
                  >
                    {CONDIZIONI.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Genere">
                  <select
                    value={form.genere}
                    onChange={(e) => setForm((p) => ({ ...p, genere: e.target.value }))}
                    style={S.input}
                  >
                    {GENERI.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div style={S.formRow}>
                <Field label="Categoria">
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
                    style={S.input}
                  >
                    {CATEGORIE.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Fonte acquisto">
                  <select
                    value={form.fonte}
                    onChange={(e) => setForm((p) => ({ ...p, fonte: e.target.value }))}
                    style={S.input}
                  >
                    {FONTI.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div style={S.formRow}>
                <Field label="Costo acquisto (€)">
                  <input
                    type="number"
                    value={form.costo}
                    onChange={(e) => setForm((p) => ({ ...p, costo: e.target.value }))}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={S.input}
                  />
                </Field>
                <Field label="Prezzo vendita (€)">
                  <input
                    type="number"
                    value={form.prezzo}
                    onChange={(e) => setForm((p) => ({ ...p, prezzo: e.target.value }))}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={S.input}
                  />
                </Field>
              </div>

              {/* Margin preview */}
              {(form.costo || form.prezzo) && (
                <div style={S.marginPreview}>
                  <span style={{ color: "var(--muted)" }}>Margine previsto:</span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: previewMargin >= 0 ? "var(--green)" : "var(--red)",
                    }}
                  >
                    {formatEur(previewMargin)}
                    {previewPct !== null && ` (${previewPct}%)`}
                  </span>
                </div>
              )}

              <Field label="Note (opzionale)">
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  placeholder="es. Etichetta presente, piccolo difetto..."
                  rows={2}
                  style={{ ...S.input, resize: "vertical", minHeight: 48 }}
                />
              </Field>

              <button onClick={addArticle} style={S.addBtn}>
                + Aggiungi articolo
              </button>
            </div>
          </div>
        )}

        {/* ═══ BRAND GUIDE ═══ */}
        {tab === "brands" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--dim)" }} />
              <input
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Cerca brand..."
                style={{ ...S.input, paddingLeft: 34 }}
              />
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {["tutti", "hot", "fast", "sport", "luxury", "vintage"].map((f) => (
                <FilterChip key={f} active={brandFilter === f} onClick={() => setBrandFilter(f)}>
                  {f === "tutti" ? "Tutti" : TAG_CONFIG[f]?.label || f}
                </FilterChip>
              ))}
            </div>
            <div style={S.brandGrid}>
              {filteredBrands.map((b, i) => (
                <div key={b.name} style={{ ...S.brandCard, animation: `slideUp 0.3s ease ${i * 0.04}s forwards`, opacity: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>{b.name}</div>
                      <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase" }}>{b.type}</div>
                    </div>
                    <div style={S.marginBadge}>{b.margin}%</div>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                    {b.tags.map((t) => {
                      const cfg = TAG_CONFIG[t];
                      return (
                        <span key={t} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, letterSpacing: 1, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}44` }}>
                          {cfg.label}
                        </span>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginBottom: 8 }}>{b.note}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--dim)", borderTop: "1px solid var(--border)", paddingTop: 8 }}>
                    <span>📍 {b.source}</span>
                    <span>💰 {b.prezzo}</span>
                  </div>
                  <div style={{ height: 3, background: "var(--surface2)", borderRadius: 2, marginTop: 8 }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 2,
                        background: `linear-gradient(90deg, var(--accent), ${b.margin > 80 ? "var(--green)" : "var(--yellow)"})`,
                        width: `${b.margin}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STRATEGIE ═══ */}
        {tab === "tips" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={S.tipsGrid}>
              {TIPS.map((t, i) => (
                <div key={t.num} style={{ ...S.tipCard, animation: `slideUp 0.3s ease ${i * 0.05}s forwards`, opacity: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{t.icon}</span>
                    <div>
                      <div style={S.tipNum}>{t.num}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{t.title}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── BOTTOM NAV ─── */}
      <nav className="bottom-nav" style={S.bottomNav}>
        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Home" },
          { id: "inventario", icon: Package, label: "Inventario" },
          { id: "aggiungi", icon: Plus, label: "Aggiungi", accent: true },
          { id: "brands", icon: Tag, label: "Brand" },
          { id: "tips", icon: Lightbulb, label: "Tips" },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              ...S.navItem,
              color: isActive ? "var(--accent)" : t.accent ? "var(--accent)" : "var(--dim)",
              background: isActive ? "rgba(212,245,94,0.08)" : "transparent",
            }}>
              <Icon size={t.accent ? 22 : 18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span style={{ fontSize: 9, letterSpacing: 0.5 }}>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ─── SELL MODAL ─── */}
      {sellModal && (
        <div style={S.overlay} onClick={() => { setSellModal(null); setSellPrice(""); }}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>💰</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 6 }}>
              A quanto l'hai venduto?
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>
              Prezzo di listino: {sellModal.prezzoOriginale.toFixed(2)}€ — modifica se hai contrattato.
            </div>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="Prezzo effettivo"
              step="0.01"
              min="0"
              style={{ ...S.input, textAlign: "center", fontSize: 18, fontWeight: 500, padding: "12px", marginBottom: 16 }}
              autoFocus
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setSellModal(null); setSellPrice(""); }} style={S.modalCancel}>
                Annulla
              </button>
              <button onClick={confirmSell} style={S.modalConfirm}>
                Conferma vendita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── RESET MODAL ─── */}
      {showReset && (
        <div style={S.overlay} onClick={() => setShowReset(false)}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>
              Azzerare tutto?
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20, lineHeight: 1.5 }}>
              Tutti gli articoli e i dati verranno eliminati permanentemente. Non è possibile annullare.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowReset(false)} style={S.modalCancel}>
                Annulla
              </button>
              <button onClick={handleReset} style={S.modalDanger}>
                Sì, azzera tutto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOAST ─── */}
      {toast && (
        <div
          style={{
            ...S.toast,
            background: toast.type === "err" ? "#301818" : "#183018",
            borderColor: toast.type === "err" ? "#f8717144" : "#4ade8044",
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ─── SUB COMPONENTS ─── */
function StatCard({ label, value, color }) {
  return (
    <div style={S.statCard}>
      <div style={{ fontSize: 22, fontWeight: 500, color, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

function BigStat({ label, value, color }) {
  return (
    <div style={{ ...S.card, flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 500, color, fontFamily: "'Playfair Display', serif" }}>
        {value}
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 14, flex: 1 }}>
      <label style={S.label}>
        {label}
        {required && <span style={{ color: "var(--red)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 12px",
        fontSize: 10,
        border: "1px solid",
        borderColor: active ? "var(--accent)" : "var(--border)",
        background: active ? "var(--accent)" : "var(--surface)",
        color: active ? "#000" : "var(--muted)",
        fontWeight: active ? 500 : 400,
        borderRadius: 20,
        cursor: "pointer",
        letterSpacing: 0.5,
        transition: "all 0.15s",
        whiteSpace: "nowrap",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {children}
    </button>
  );
}

function StatusBadge({ venduto }) {
  return (
    <span
      style={{
        fontSize: 9,
        padding: "2px 7px",
        borderRadius: 3,
        letterSpacing: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...(venduto
          ? { background: "#0d3320", color: "var(--green)", border: "1px solid rgba(74,222,128,0.25)" }
          : { background: "#33300d", color: "var(--yellow)", border: "1px solid rgba(251,191,36,0.25)" }),
      }}
    >
      {venduto ? "✓ Venduto" : "In vendita"}
    </span>
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
  app: {
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'DM Mono', monospace",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
    margin: "0 auto",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 18px 14px",
    borderBottom: "1px solid var(--border)",
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontSize: 26,
    color: "var(--accent)",
    letterSpacing: -1,
    lineHeight: 1,
  },
  version: {
    fontSize: 9,
    color: "var(--dim)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--muted)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  content: {
    flex: 1,
    padding: "18px 16px",
    paddingBottom: 90,
    overflowY: "auto",
  },
  statsRow: {
    display: "flex",
    gap: 8,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  statCard: {
    flex: "1 1 0",
    minWidth: 80,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "14px 12px",
    textAlign: "center",
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    padding: "10px 12px",
    borderRadius: 6,
    outline: "none",
    transition: "border-color 0.15s",
  },
  label: {
    display: "block",
    fontSize: 10,
    letterSpacing: 1,
    color: "var(--dim)",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  formRow: {
    display: "flex",
    gap: 12,
  },
  marginPreview: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    padding: "10px 14px",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    marginBottom: 14,
  },
  addBtn: {
    width: "100%",
    padding: "14px",
    background: "var(--accent)",
    color: "#000",
    border: "none",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 2,
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: 8,
    marginTop: 4,
    transition: "opacity 0.15s",
  },
  articleCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    marginBottom: 6,
    transition: "border-color 0.15s",
  },
  articleName: {
    fontSize: 13,
    fontWeight: 500,
    color: "var(--text)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  articleMeta: {
    fontSize: 10,
    color: "var(--dim)",
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  },
  btnGreen: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "none",
    background: "var(--green)",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDel: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "var(--surface2)",
    color: "var(--dim)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 10,
  },
  brandCard: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: 14,
    transition: "border-color 0.15s",
  },
  marginBadge: {
    fontSize: 20,
    fontWeight: 500,
    color: "var(--accent)",
    fontFamily: "'Playfair Display', serif",
  },
  tipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 10,
  },
  tipCard: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: 16,
  },
  tipNum: {
    fontSize: 10,
    color: "var(--accent)",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 600,
    display: "flex",
    background: "rgba(21,21,24,0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: "1px solid var(--border)",
    padding: "6px 8px 10px",
    zIndex: 100,
  },
  navItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    padding: "6px 4px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    borderRadius: 8,
    transition: "all 0.15s",
    fontFamily: "'DM Mono', monospace",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    padding: 20,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: 28,
    textAlign: "center",
    maxWidth: 360,
    width: "100%",
    animation: "slideUp 0.3s ease",
  },
  modalCancel: {
    flex: 1,
    padding: "10px",
    border: "1px solid var(--border)",
    background: "var(--surface2)",
    color: "var(--muted)",
    fontSize: 12,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
  },
  modalDanger: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "var(--red)",
    color: "#000",
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
  },
  modalConfirm: {
    flex: 1,
    padding: "10px",
    border: "none",
    background: "var(--green)",
    color: "#000",
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
  },
  toast: {
    position: "fixed",
    bottom: 80,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    borderRadius: 10,
    fontSize: 12,
    border: "1px solid",
    zIndex: 300,
    animation: "toastIn 0.3s ease",
    backdropFilter: "blur(10px)",
    fontFamily: "'DM Mono', monospace",
    color: "var(--text)",
  },
  emptyState: {
    textAlign: "center",
    padding: 40,
    color: "var(--dim)",
    border: "1px dashed var(--border)",
    borderRadius: 10,
    marginTop: 20,
  },
};
