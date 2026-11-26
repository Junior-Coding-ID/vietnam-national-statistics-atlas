/* VIETPULSE charts — hand-built inline SVG, no libraries, no network.
   Every builder returns an SVG string; app.js drops it into the page and
   wires the tooltip. All text uses the page font stack. */
(function () {
  "use strict";
  var C = { jade: "#102D2B", green: "#167D70", greenSoft: "#2E9B8C", gold: "#9A6B16", terra: "#B85440", ink: "#22302E", mute: "#5A6B66", grid: "#DDD8C4", paper: "#F5F3E9", white: "#FFFFFF" };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fmt(n, d) { return Number(n).toLocaleString("en-US", { minimumFractionDigits: d == null ? 0 : d, maximumFractionDigits: d == null ? 0 : d }); }
  function niceMax(v) { var p = Math.pow(10, Math.floor(Math.log10(v))); var n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : n <= 6 ? 6 : 10) * p; }
  function axisLabels(el, x0, y0, w, h, max, unit, ticks) {
    var s = "";
    for (var i = 0; i <= ticks; i++) {
      var v = max * i / ticks, y = y0 + h - h * i / ticks;
      s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + (x0 + w) + '" y2="' + y + '" stroke="' + C.grid + '" stroke-width="1"/>';
      s += '<text x="' + (x0 - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="12" fill="' + C.mute + '">' + fmt(v) + unit + "</text>";
    }
    return s;
  }
  function tipAttrs(text) { return ' data-tip="' + esc(text) + '"'; }

  /* V1 — bars: real GDP growth (%), line: CPI inflation (%), 2015-2025. */
  function comboGrowthCpi(rows, opts) {
    opts = opts || {};
    var W = 760, H = 340, L = 46, R = 46, T = 26, B = 34;
    var iw = W - L - R, ih = H - T - B;
    var max = niceMax(9), n = rows.length, bw = iw / n * 0.58;
    var x = function (i) { return L + iw * (i + 0.5) / n; };
    var y = function (v) { return T + ih - ih * v / max; };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Real GDP growth bars and CPI inflation line, 2015 to 2025" class="chart-svg">';
    s += axisLabels(null, L, T, iw, ih, max, "%", 4);
    rows.forEach(function (r, i) {
      var bx = x(i) - bw / 2;
      s += '<rect x="' + bx.toFixed(1) + '" y="' + y(r.g).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (T + ih - y(r.g)).toFixed(1) + '" rx="3" fill="' + (r.y === 2025 ? C.terra : C.green) + '"' + tipAttrs(r.y + ": GDP growth " + r.g.toFixed(2) + "%, CPI " + r.c.toFixed(2) + "%") + "/>";
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (T + ih + 22) + '" text-anchor="middle" font-size="12" fill="' + C.mute + '">' + r.y + "</text>";
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (y(r.g) + 20).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">' + r.g.toFixed(2) + "</text>";
    });
    var pts = rows.map(function (r, i) { return x(i).toFixed(1) + "," + y(r.c).toFixed(1); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + C.gold + '" stroke-width="2.5" stroke-linejoin="round"/>';
    rows.forEach(function (r, i) {
      s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(r.c).toFixed(1) + '" r="4" fill="' + C.white + '" stroke="' + C.gold + '" stroke-width="2.5"' + tipAttrs(r.y + ": CPI inflation " + r.c.toFixed(2) + "%") + "/>";
    });
    s += '<g font-size="13" font-weight="700"><rect x="' + L + '" y="0" width="12" height="12" fill="' + C.green + '"/><text x="' + (L + 18) + '" y="11" fill="' + C.jade + '">Real GDP growth (bars, %)</text>';
    s += '<line x1="' + (L + 218) + '" y1="6" x2="' + (L + 244) + '" y2="6" stroke="' + C.gold + '" stroke-width="2.5"/><circle cx="' + (L + 231) + '" cy="6" r="4" fill="' + C.white + '" stroke="' + C.gold + '" stroke-width="2"/><text x="' + (L + 250) + '" y="11" fill="' + C.jade + '">CPI inflation (line, %)</text></g>';
    s += "</svg>";
    return s;
  }

  /* Dual-axis line chart: GDP ($bn, bars) + GDP per capita ($, line). */
  function gdpTrajectory(rows) {
    var W = 760, H = 340, L = 52, R = 58, T = 26, B = 34;
    var iw = W - L - R, ih = H - T - B, n = rows.length;
    var maxG = niceMax(520), maxP = niceMax(5100);
    var x = function (i) { return L + iw * (i + 0.5) / n; };
    var yG = function (v) { return T + ih - ih * v / maxG; };
    var yP = function (v) { return T + ih - ih * v / maxP; };
    var bw = iw / n * 0.5;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Nominal GDP bars and GDP per capita line, 2015 to 2025" class="chart-svg">';
    s += axisLabels(null, L, T, iw, ih, maxG, "", 4);
    /* Right axis: per-capita scale, three ticks only — per-point labels pile up. */
    [0, 2500, 5000].forEach(function (v) {
      s += '<text x="' + (W - R + 8) + '" y="' + (yP(v) + 4).toFixed(1) + '" font-size="11" fill="' + C.gold + '" font-weight="700">$' + fmt(v) + "</text>";
    });
    rows.forEach(function (r, i) {
      var bx = x(i) - bw / 2;
      s += '<rect x="' + bx.toFixed(1) + '" y="' + yG(r.gdp).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (T + ih - yG(r.gdp)).toFixed(1) + '" rx="3" fill="' + (r.y === 2025 ? C.terra : C.greenSoft) + '"' + tipAttrs(r.y + ": GDP $" + r.gdp.toFixed(1) + "bn, per capita $" + fmt(r.pc)) + "/>";
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (T + ih + 22) + '" text-anchor="middle" font-size="12" fill="' + C.mute + '">' + r.y + "</text>";
    });
    var pts = rows.map(function (r, i) { return x(i).toFixed(1) + "," + yP(r.pc).toFixed(1); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + C.gold + '" stroke-width="2.5" stroke-linejoin="round"/>';
    rows.forEach(function (r, i) {
      s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + yP(r.pc).toFixed(1) + '" r="4" fill="' + C.white + '" stroke="' + C.gold + '" stroke-width="2.5"' + tipAttrs(r.y + ": GDP per capita $" + fmt(r.pc)) + "/>";
    });
    s += '<line x1="' + L + '" y1="' + yP(5000).toFixed(1) + '" x2="' + (L + iw) + '" y2="' + yP(5000).toFixed(1) + '" stroke="' + C.terra + '" stroke-width="1.5" stroke-dasharray="6 4"/>';
    s += '<text x="' + (L + 4) + '" y="' + (yP(5000) - 6).toFixed(1) + '" font-size="12" font-weight="700" fill="' + C.terra + '" style="paint-order:stroke;stroke:#FFFFFF;stroke-width:4px">$5,000 per-capita line</text>';
    /* Endpoint labels only — the line's story is the crossing, tooltips carry the rest. */
    s += '<text x="' + x(0).toFixed(1) + '" y="' + (yP(rows[0].pc) - 10).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + C.gold + '" style="paint-order:stroke;stroke:#FFFFFF;stroke-width:4px">$' + fmt(rows[0].pc) + "</text>";
    s += '<text x="' + x(n - 1).toFixed(1) + '" y="' + (yP(rows[n - 1].pc) - 10).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + C.gold + '" style="paint-order:stroke;stroke:#FFFFFF;stroke-width:4px">$' + fmt(rows[n - 1].pc) + "</text>";
    s += '<g font-size="13" font-weight="700"><rect x="' + L + '" y="0" width="12" height="12" fill="' + C.greenSoft + '"/><text x="' + (L + 18) + '" y="11" fill="' + C.jade + '">GDP, $bn (bars)</text>';
    s += '<line x1="' + (L + 168) + '" y1="6" x2="' + (L + 194) + '" y2="6" stroke="' + C.gold + '" stroke-width="2.5"/><text x="' + (L + 200) + '" y="11" fill="' + C.jade + '">GDP per capita, $ (line, right)</text></g>';
    s += "</svg>";
    return s;
  }

  /* Horizontal bars, generic: [{label, value, note}] */
  function hbars(rows, opts) {
    opts = opts || {};
    var W = 760, rowH = opts.rowH || 44, L = opts.labelW || 210, R = 90, T = 8, B = 8;
    var H = T + B + rows.length * rowH;
    var max = niceMax(Math.max.apply(null, rows.map(function (r) { return r.value; })));
    var iw = W - L - R;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(opts.aria || "Bar chart") + '" class="chart-svg">';
    rows.forEach(function (r, i) {
      var y = T + i * rowH + 8, bh = 22;
      var w = iw * r.value / max;
      s += '<text x="' + (L - 10) + '" y="' + (y + 15) + '" text-anchor="end" font-size="13" font-weight="600" fill="' + C.jade + '">' + esc(r.label) + "</text>";
      s += '<rect x="' + L + '" y="' + y + '" width="' + w.toFixed(1) + '" height="' + bh + '" rx="3" fill="' + (r.color || C.green) + '"' + tipAttrs(r.label + ": " + r.tip) + "/>";
      s += '<text x="' + (L + w + 8).toFixed(1) + '" y="' + (y + 16) + '" font-size="13" font-weight="700" fill="' + C.jade + '">' + esc(r.shown) + "</text>";
      if (r.sub) s += '<text x="' + L + '" y="' + (y + 36) + '" font-size="11.5" fill="' + C.mute + '">' + esc(r.sub) + "</text>";
    });
    s += "</svg>";
    return s;
  }

  /* Grouped vertical bars, generic: series of {label, a, b} with legend. */
  function groupedBars(rows, opts) {
    opts = opts || {};
    var W = 760, H = 320, L = 56, R = 16, T = 30, B = 34;
    var iw = W - L - R, ih = H - T - B, n = rows.length;
    var max = niceMax(Math.max.apply(null, rows.map(function (r) { return Math.max(r.a, r.b); })));
    var gw = iw / n, bw = Math.min(52, gw * 0.32);
    var x = function (i) { return L + gw * (i + 0.5); };
    var y = function (v) { return T + ih - ih * v / max; };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(opts.aria || "Grouped bar chart") + '" class="chart-svg">';
    s += axisLabels(null, L, T, iw, ih, max, opts.unit || "", 4);
    rows.forEach(function (r, i) {
      var cx = x(i);
      s += '<rect x="' + (cx - bw - 3).toFixed(1) + '" y="' + y(r.a).toFixed(1) + '" width="' + bw + '" height="' + (T + ih - y(r.a)).toFixed(1) + '" rx="3" fill="' + opts.colorA + '"' + tipAttrs(r.label + " — " + opts.nameA + ": " + r.tipA) + "/>";
      s += '<rect x="' + (cx + 3).toFixed(1) + '" y="' + y(r.b).toFixed(1) + '" width="' + bw + '" height="' + (T + ih - y(r.b)).toFixed(1) + '" rx="3" fill="' + opts.colorB + '"' + tipAttrs(r.label + " — " + opts.nameB + ": " + r.tipB) + "/>";
      s += '<text x="' + cx.toFixed(1) + '" y="' + (T + ih + 22) + '" text-anchor="middle" font-size="12.5" font-weight="600" fill="' + C.jade + '">' + esc(r.label) + "</text>";
      s += '<text x="' + (cx - bw / 2 - 3).toFixed(1) + '" y="' + (y(r.a) - 6).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + C.jade + '">' + esc(r.showA) + "</text>";
      s += '<text x="' + (cx + bw / 2 + 3).toFixed(1) + '" y="' + (y(r.b) - 6).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + C.jade + '">' + esc(r.showB) + "</text>";
    });
    s += '<g font-size="13" font-weight="700"><rect x="' + L + '" y="0" width="12" height="12" fill="' + opts.colorA + '"/><text x="' + (L + 18) + '" y="11" fill="' + C.jade + '">' + esc(opts.nameA) + '</text><rect x="' + (L + 190) + '" y="0" width="12" height="12" fill="' + opts.colorB + '"/><text x="' + (L + 208) + '" y="11" fill="' + C.jade + '">' + esc(opts.nameB) + "</text></g>";
    s += "</svg>";
    return s;
  }

  /* V7 — population bars (millions) + TFR line, 2015-2025 (points with data). */
  function populationTfr(rows, tfrNso) {
    var W = 760, H = 340, L = 52, R = 52, T = 26, B = 34;
    var iw = W - L - R, ih = H - T - B, n = rows.length;
    var maxP = 110, maxT = 2.5;
    var x = function (i) { return L + iw * (i + 0.5) / n; };
    var yP = function (v) { return T + ih - ih * v / maxP; };
    var yT = function (v) { return T + ih - ih * v / maxT; };
    var bw = iw / n * 0.52;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Population bars and total fertility rate line" class="chart-svg">';
    s += axisLabels(null, L, T, iw, ih, maxP, "m", 4);
    rows.forEach(function (r, i) {
      var bx = x(i) - bw / 2;
      s += '<rect x="' + bx.toFixed(1) + '" y="' + yP(r.pop).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (T + ih - yP(r.pop)).toFixed(1) + '" rx="3" fill="' + (r.y === 2025 ? C.terra : C.greenSoft) + '"' + tipAttrs(r.y + ": population " + r.pop.toFixed(2) + " million, TFR " + r.tfr.toFixed(2)) + "/>";
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (T + ih + 22) + '" text-anchor="middle" font-size="12" fill="' + C.mute + '">' + r.y + "</text>";
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (yP(r.pop) - 6).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + C.jade + '">' + r.pop.toFixed(1) + "</text>";
    });
    var pts = rows.map(function (r, i) { return x(i).toFixed(1) + "," + yT(r.tfr).toFixed(1); }).join(" ");
    s += '<polyline points="' + pts + '" fill="none" stroke="' + C.gold + '" stroke-width="2.5" stroke-linejoin="round"/>';
    rows.forEach(function (r, i) {
      s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + yT(r.tfr).toFixed(1) + '" r="4" fill="' + C.white + '" stroke="' + C.gold + '" stroke-width="2.5"' + tipAttrs(r.y + ": TFR (UN) " + r.tfr.toFixed(2) + " births per woman") + "/>";
    });
    /* NSO 2025 point, 1.66 — a different count, shown as a diamond. */
    var lx = x(n - 1);
    s += '<rect x="' + (lx - 7).toFixed(1) + '" y="' + (yT(tfrNso) - 7).toFixed(1) + '" width="14" height="14" transform="rotate(45 ' + lx.toFixed(1) + " " + yT(tfrNso).toFixed(1) + ')" fill="' + C.terra + '"' + tipAttrs("2025 NSO civil registration TFR: " + tfrNso.toFixed(2)) + "/>";
    s += '<text x="' + (lx - 12).toFixed(1) + '" y="' + (yT(tfrNso) - 14).toFixed(1) + '" text-anchor="end" font-size="12" font-weight="700" fill="' + C.terra + '" style="paint-order:stroke;stroke:#FFFFFF;stroke-width:4px">NSO 1.66 ◆</text>';
    s += '<line x1="' + L + '" y1="' + yT(2.1).toFixed(1) + '" x2="' + (L + iw) + '" y2="' + yT(2.1).toFixed(1) + '" stroke="' + C.mute + '" stroke-width="1.5" stroke-dasharray="6 4"/>';
    s += '<text x="' + (L + iw - 4) + '" y="' + (yT(2.1) - 6).toFixed(1) + '" text-anchor="end" font-size="12" font-weight="700" fill="' + C.mute + '" style="paint-order:stroke;stroke:#FFFFFF;stroke-width:4px">Replacement level 2.1</text>';
    s += '<g font-size="13" font-weight="700"><rect x="' + L + '" y="0" width="12" height="12" fill="' + C.greenSoft + '"/><text x="' + (L + 18) + '" y="11" fill="' + C.jade + '">Population, millions (bars)</text>';
    s += '<line x1="' + (L + 216) + '" y1="6" x2="' + (L + 242) + '" y2="6" stroke="' + C.gold + '" stroke-width="2.5"/><text x="' + (L + 248) + '" y="11" fill="' + C.jade + '">TFR, births per woman (line, right)</text></g>';
    s += "</svg>";
    return s;
  }

  window.VIETPULSE_CHARTS = { comboGrowthCpi: comboGrowthCpi, gdpTrajectory: gdpTrajectory, hbars: hbars, groupedBars: groupedBars, populationTfr: populationTfr, colors: C, fmt: fmt };
})();
