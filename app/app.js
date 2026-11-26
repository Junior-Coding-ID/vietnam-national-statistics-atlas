/* VIETPULSE app — shared behaviour for all five pages. No network: every
   figure comes from data.js, every download is a local Blob. */
(function () {
  "use strict";
  var D = window.VIETPULSE, CH = window.VIETPULSE_CHARTS;
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function num(n) { return n.toLocaleString("en-US"); }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  /* ---------- tooltip: one shared bubble, mouse + keyboard ---------- */
  var tip = null;
  function showTip(text, x, y) {
    if (!tip) { tip = document.createElement("div"); tip.id = "tooltip"; tip.setAttribute("role", "tooltip"); document.body.appendChild(tip); }
    tip.textContent = text; tip.style.display = "block";
    var w = tip.offsetWidth, h = tip.offsetHeight;
    tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, x + 14)) + "px";
    tip.style.top = Math.max(8, y - h - 10) + "px";
  }
  function hideTip() { if (tip) tip.style.display = "none"; }
  document.addEventListener("mouseover", function (e) {
    var t = e.target.closest ? e.target.closest("[data-tip]") : null;
    if (t) showTip(t.getAttribute("data-tip"), e.clientX, e.clientY);
  });
  document.addEventListener("mousemove", function (e) {
    if (tip && tip.style.display === "block") showTip(tip.textContent, e.clientX, e.clientY);
  });
  document.addEventListener("mouseout", function (e) {
    var t = e.target.closest ? e.target.closest("[data-tip]") : null;
    if (t) hideTip();
  });
  document.addEventListener("focusin", function (e) {
    var t = e.target.closest ? e.target.closest("[data-tip]") : null;
    if (t) { var r = t.getBoundingClientRect(); showTip(t.getAttribute("data-tip"), r.left + r.width / 2, r.top); }
  });
  document.addEventListener("focusout", hideTip);

  /* ---------- source toggle (NSO / World Bank) ---------- */
  var source = "nso";
  function renderKpis() {
    var grid = $("kpi-grid"); if (!grid) return;
    var u = D.kpi.unemployment;
    var html = D.kpi[source].map(function (k) {
      return '<article class="kpi"><p class="kpi-label">' + esc(k.label) + '</p>' +
        '<p class="kpi-value">' + esc(k.fmt) + '</p>' +
        '<p class="kpi-note">' + esc(k.note) + ' · ' + esc(k.src) + " · 2025</p></article>";
    }).join("");
    grid.innerHTML = html;
    var strip = $("unemp-strip");
    if (strip) {
      strip.innerHTML = '<strong>Unemployment, working-age (NSO): ' + u.nso.toFixed(2) + '%</strong>' +
        " — urban " + u.nsoUrban.toFixed(2) + "%, rural " + u.nsoRural.toFixed(2) + "% · " +
        "ILO modelled estimate: " + u.ilo.toFixed(2) + "% (different definition — see <a href=\"people.html\">People</a>).";
    }
    var btns = document.querySelectorAll("[data-source]");
    btns.forEach(function (b) {
      var on = b.getAttribute("data-source") === source;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("active", on);
    });
    var lab = $("source-label");
    if (lab) lab.textContent = source === "nso" ? "NSO Official (National Statistics Office of Viet Nam)" : "World Bank WDI";
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-source]") : null;
    if (b) { source = b.getAttribute("data-source"); renderKpis(); }
  });

  /* ---------- downloads: CSV / JSON via Blob, works from file:// ---------- */
  function download(name, text, type) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  }
  function toCsv(rows) {
    return rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(","); }).join("\n");
  }
  function nationalRows() {
    var rows = [["Year", "Real GDP growth % (NSO)", "CPI inflation % (NSO/WDI)", "GDP nominal $bn (WB WDI)", "GDP per capita $ (WB/UN)", "Population m (UN WPP)", "TFR (UN WPP)"]];
    D.growthCpi.forEach(function (g) {
      var gd = D.gdp.find(function (x) { return x.y === g.y; });
      var dm = D.demography.find(function (x) { return x.y === g.y; });
      rows.push([g.y, g.g, g.c, gd ? gd.gdp : "", gd ? gd.pc : "", dm ? dm.pop : "", dm ? dm.tfr : ""]);
    });
    return rows;
  }
  function provinceRows() {
    var rows = [["Province/City", "Type", "Region", "Area km2", "Population (Res. 202)", "Status 2025", "Formed from"]];
    D.provinces.slice().sort(function (a, b) { return b.pop - a.pop; }).forEach(function (p) {
      rows.push([p.name, p.type, p.region, p.area, p.pop, p.status, p.from.join("; ") || "—"]);
    });
    return rows;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-export]") : null;
    if (!b) return;
    var kind = b.getAttribute("data-export");
    if (kind === "national-csv") download("vietpulse-national-2015-2025.csv", toCsv(nationalRows()), "text/csv");
    if (kind === "national-json") download("vietpulse-national-2015-2025.json", JSON.stringify({ source: "VIETPULSE 2025", national: nationalRows() }, null, 2), "application/json");
    if (kind === "provinces-csv") download("vietpulse-provinces-2025.csv", toCsv(provinceRows()), "text/csv");
    if (kind === "provinces-json") download("vietpulse-provinces-2025.json", JSON.stringify({ source: "Resolution 202/2025/QH15", reconciliation: D.reconciliation, provinces: D.provinces }, null, 2), "application/json");
    if (kind === "all-json") download("vietpulse-all-data.json", JSON.stringify(D, null, 2), "application/json");
  });

  /* ---------- province table: search, filter, sort ---------- */
  var provSort = "pop-desc";
  function renderProvinces() {
    var body = $("province-rows"); if (!body) return;
    var q = ($("prov-search") ? $("prov-search").value : "").toLowerCase();
    var st = $("prov-status") ? $("prov-status").value : "all";
    var rg = $("prov-region") ? $("prov-region").value : "all";
    var list = D.provinces.filter(function (p) {
      if (q && p.name.toLowerCase().indexOf(q) === -1 && p.vi.toLowerCase().indexOf(q) === -1) return false;
      if (st !== "all" && p.status !== st) return false;
      if (rg !== "all" && p.region !== rg) return false;
      return true;
    });
    var sorts = {
      "pop-desc": function (a, b) { return b.pop - a.pop; },
      "pop-asc": function (a, b) { return a.pop - b.pop; },
      "area-desc": function (a, b) { return b.area - a.area; },
      "density-desc": function (a, b) { return b.pop / b.area - a.pop / a.area; },
      "name-asc": function (a, b) { return a.name.localeCompare(b.name); }
    };
    list.sort(sorts[provSort] || sorts["pop-desc"]);
    body.innerHTML = list.map(function (p, i) {
      var dens = Math.round(p.pop / p.area);
      return '<tr id="row-' + slug(p.name) + '"><td class="r">' + (i + 1) + "</td>" +
        '<td><strong>' + esc(p.name) + '</strong> <span class="vi">' + esc(p.vi) + "</span>" + (p.type === "City" ? ' <span class="tag city">City</span>' : "") + "</td>" +
        "<td>" + esc(p.region) + "</td>" +
        '<td class="r">' + num(p.area) + '</td><td class="r">' + num(p.pop) + '</td><td class="r">' + num(dens) + "</td>" +
        '<td><span class="tag ' + p.status + '">' + (p.status === "merged" ? "Merged" : "Unchanged") + "</span></td>" +
        "<td>" + (p.from.length ? esc(p.from.join(" + ")) : "—") + "</td></tr>";
    }).join("");
    var count = $("prov-count");
    if (count) count.textContent = list.length + " of 34 provinces & cities";
  }
  ["prov-search", "prov-status", "prov-region", "prov-sort"].forEach(function (id) {
    var el = $(id); if (!el) return;
    el.addEventListener("input", function () { if (id === "prov-sort") provSort = el.value; renderProvinces(); });
    el.addEventListener("change", function () { if (id === "prov-sort") provSort = el.value; renderProvinces(); });
  });

  /* map tile click / Enter -> jump to the table row */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest(".map-tile") : null;
    if (!t) return;
    var row = $("row-" + slug(t.getAttribute("data-province")));
    if (row) { row.scrollIntoView({ behavior: "smooth", block: "center" }); row.classList.add("flash"); setTimeout(function () { row.classList.remove("flash"); }, 2400); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var t = e.target.closest ? e.target.closest(".map-tile") : null;
    if (t) { t.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
  });

  /* ---------- page mounts ---------- */
  var page = document.body.getAttribute("data-page");
  renderKpis();

  if (page === "index") {
    var v1 = $("chart-v1"); if (v1) v1.innerHTML = CH.comboGrowthCpi(D.growthCpi);
    var v5 = $("chart-v5"); if (v5) v5.innerHTML = CH.gdpTrajectory(D.gdp);
    var rec = $("recon-note");
    if (rec) rec.innerHTML = "<strong>Read this first:</strong> " + esc(D.reconciliation.text);
  }
  if (page === "economy") {
    var v2 = $("chart-v2");
    if (v2) {
      var t = D.trade;
      v2.innerHTML = CH.hbars([
        { label: "Merchandise exports (F.O.B.)", value: t.exports, shown: "$475.04bn", tip: "Merchandise exports 2025: $" + t.exports.toFixed(2) + "bn (NSO, preliminary)", color: "#167D70", sub: "Goods sold abroad, free on board" },
        { label: "Merchandise imports (C.I.F.)", value: t.imports, shown: "$455.01bn", tip: "Merchandise imports 2025: $" + t.imports.toFixed(2) + "bn (NSO, preliminary)", color: "#9A6B16", sub: "Goods bought abroad, cost + insurance + freight" },
        { label: "Realised FDI", value: t.fdiRealised, shown: "$27.62bn", tip: "Realised FDI 2025: $" + t.fdiRealised.toFixed(2) + "bn, +" + t.fdiGrowth.toFixed(1) + "% YoY — highest in five years", color: "#2E9B8C", sub: "Foreign direct investment actually disbursed, +9.0% YoY" },
        { label: "Goods trade surplus", value: t.goodsBalance, shown: "+$20.03bn", tip: "Goods surplus 2025: $" + t.goodsBalance.toFixed(2) + "bn; services ran a deficit of $10.23bn", color: "#B85440", sub: "Exports minus imports; services deficit −$10.23bn" }
      ], { aria: "Merchandise trade and FDI, 2025", labelW: 250, rowH: 56 });
    }
    var v6 = $("chart-v6");
    if (v6) {
      v6.innerHTML = CH.hbars(D.sectors.filter(function (s) { return s.v != null; }).map(function (s) {
        return { label: s.name, value: s.v, shown: "+" + s.v.toFixed(2) + "%", tip: "value added growth " + s.v.toFixed(2) + "% in 2025 (NSO)", color: "#167D70" };
      }), { aria: "Fastest-growing industries 2025", labelW: 260, rowH: 48 });
    }
    var nb = $("national-rows");
    if (nb) {
      nb.innerHTML = nationalRows().slice(1).map(function (r) {
        return "<tr>" + r.map(function (c, i) { return '<td class="' + (i === 0 ? "r strong" : "r") + '">' + esc(c) + "</td>"; }).join("") + "</tr>";
      }).join("");
    }
  }
  if (page === "regions") {
    var map = $("map-holder");
    if (map && window.VIETPULSE_MAP) map.innerHTML = window.VIETPULSE_MAP.buildMap(D.provinces);
    var v4 = $("chart-v4");
    if (v4) {
      var top10 = D.provinces.slice().sort(function (a, b) { return b.pop - a.pop; }).slice(0, 10);
      v4.innerHTML = CH.hbars(top10.map(function (p) {
        return { label: p.name, value: p.pop / 1e6, shown: (p.pop / 1e6).toFixed(2) + " m", tip: p.name + ": " + num(p.pop) + " people, " + num(p.area) + " km², " + (p.status === "merged" ? "merged in 2025" : "unchanged"), color: p.status === "merged" ? "#C96A4E" : "#167D70", sub: p.status === "merged" ? "Merged 2025 · " + p.from.join(" + ") : "Unchanged" };
      }), { aria: "Top 10 provinces by population", labelW: 190, rowH: 56 });
    }
    var rec2 = $("recon-banner");
    if (rec2) rec2.innerHTML = "<strong>Reconciliation — read before using this table:</strong> " + esc(D.reconciliation.text);
    renderProvinces();
  }
  if (page === "people") {
    var v7 = $("chart-v7"); if (v7) v7.innerHTML = CH.populationTfr(D.demography, D.tfrNso2025);
    var v8 = $("chart-v8");
    if (v8) {
      var u = D.kpi.unemployment;
      v8.innerHTML = CH.groupedBars([
        { label: "Total", a: u.nso, b: u.ilo, tipA: "NSO working-age unemployment " + u.nso.toFixed(2) + "%", tipB: "ILO modelled " + u.ilo.toFixed(2) + "%", showA: "2.22%", showB: "1.52%" },
        { label: "Urban", a: u.nsoUrban, b: u.ilo, tipA: "NSO urban " + u.nsoUrban.toFixed(2) + "%", tipB: "ILO modelled (national) " + u.ilo.toFixed(2) + "%", showA: "2.51%", showB: "1.52%" },
        { label: "Rural", a: u.nsoRural, b: u.ilo, tipA: "NSO rural " + u.nsoRural.toFixed(2) + "%", tipB: "ILO modelled (national) " + u.ilo.toFixed(2) + "%", showA: "2.02%", showB: "1.52%" },
        { label: "Youth (15–24)", a: u.youthIlo, b: u.ilo, tipA: "ILO modelled youth unemployment " + u.youthIlo.toFixed(1) + "%", tipB: "ILO modelled total " + u.ilo.toFixed(2) + "%", showA: "6.2%", showB: "1.52%" }
      ], { nameA: "NSO (working-age survey)", nameB: "ILO modelled", colorA: "#167D70", colorB: "#9A6B16", unit: "%", aria: "Unemployment by definition, 2025" });
    }
    var tiles = $("people-tiles");
    if (tiles) {
      tiles.innerHTML = D.peopleTiles.map(function (t) {
        return '<article class="kpi"><p class="kpi-label">' + esc(t.label) + '</p><p class="kpi-value">' + esc(t.value) + '</p><p class="kpi-note">' + esc(t.note) + "</p></article>";
      }).join("");
    }
    var pb = $("pop-rows");
    if (pb) {
      pb.innerHTML = D.demography.map(function (r) {
        return "<tr><td class=\"r strong\">" + r.y + "</td><td class=\"r\">" + r.pop.toFixed(2) + "</td><td class=\"r\">" + r.tfr.toFixed(2) + "</td><td class=\"r\">" + r.age.toFixed(1) + "</td><td class=\"r\">" + r.urban.toFixed(1) + "%</td></tr>";
      }).join("");
    }
  }
  if (page === "sources") {
    var sl = $("source-list");
    if (sl) {
      sl.innerHTML = D.sources.map(function (s) {
        return '<article class="source-card"><h3>' + esc(s.name) + '</h3><p><strong>Used for:</strong> ' + esc(s.what) + '</p><p><strong>Where:</strong> ' + esc(s.url) + '</p><p class="src-note">' + esc(s.note) + "</p></article>";
      }).join("");
    }
    var rec3 = $("recon-full");
    if (rec3) rec3.textContent = D.reconciliation.text;
  }
})();
