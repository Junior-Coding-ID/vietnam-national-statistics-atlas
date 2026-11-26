/* VIETPULSE map — schematic tile cartogram of the 34 provinces & cities.
   Tiles sit on the grid coordinates (gx, gy) stored in data.js; positions
   approximate geography, north at the top. It is a cartogram, not a
   geographic map, and the page says so. Merged units (23) are terracotta,
   unchanged units (11) are jade green; cities carry a gold dot. */
(function () {
  "use strict";
  var C = window.VIETPULSE_CHARTS.colors;
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function shortName(name) {
    return name.replace("Ho Chi Minh City", "Ho Chi Minh City").replace(" City", "");
  }
  function buildMap(provinces) {
    var TW = 92, TH = 54, GAP = 8, COLS = 7, ROWS = 10;
    var W = COLS * (TW + GAP) + GAP, H = ROWS * (TH + GAP) + GAP;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Tile cartogram of Viet Nam, 34 provinces and cities after the 2025 reorganisation" class="map-svg">';
    provinces.forEach(function (p) {
      var x = GAP + p.gx * (TW + GAP), y = GAP + p.gy * (TH + GAP);
      var fill = p.status === "merged" ? "#C96A4E" : C.green;
      var tip = p.name + " (" + p.type + ") — population " + p.pop.toLocaleString("en-US") + ", area " + p.area.toLocaleString("en-US") + " km². " + (p.status === "merged" ? "Formed by merger of " + p.from.join(", ") + "." : "Unchanged by the 2025 reorganisation.");
      s += '<g class="map-tile" data-province="' + esc(p.name) + '" data-tip="' + esc(tip) + '" tabindex="0" role="button" aria-label="' + esc(p.name) + '">';
      s += '<rect x="' + x + '" y="' + y + '" width="' + TW + '" height="' + TH + '" rx="6" fill="' + fill + '"/>';
      s += '<text x="' + (x + TW / 2) + '" y="' + (y + 22) + '" text-anchor="middle" font-size="12.5" font-weight="700" fill="#FFFFFF">' + esc(shortName(p.name)) + "</text>";
      s += '<text x="' + (x + TW / 2) + '" y="' + (y + 40) + '" text-anchor="middle" font-size="11.5" fill="#FFFFFF" opacity="0.92">' + (p.pop / 1e6).toFixed(2) + " m</text>";
      if (p.type === "City") s += '<circle cx="' + (x + TW - 10) + '" cy="' + (y + 10) + '" r="4" fill="#F2C14E" stroke="#102D2B" stroke-width="1"/>';
      s += "</g>";
    });
    s += "</svg>";
    return s;
  }
  window.VIETPULSE_MAP = { buildMap: buildMap };
})();
