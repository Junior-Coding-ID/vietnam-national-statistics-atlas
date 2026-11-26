/* VIETPULSE data — Viet Nam National Statistics Atlas, 2025 Annual Edition.
   Every figure below comes from one named official source. Two series are
   carried side by side and never mixed: NSO = National Statistics Office of
   Viet Nam (nso.gov.vn, formerly GSO); WB = World Bank World Development
   Indicators; UN = UN World Population Prospects 2024 (medium variant);
   ILO = ILO modelled estimates via WDI. 2025 values marked (p) are
   preliminary estimates as published by the source. */
window.VIETPULSE = {
  meta: {
    edition: "2025 Annual Edition",
    country: "Viet Nam",
    updated: "26 November 2026",
    currency: "US dollars unless stated (VND where noted)"
  },

  /* ---- Headline KPIs, 2025. NSO is the headline series; WB the switch. ---- */
  kpi: {
    nso: [
      { id: "gdp", label: "GDP, nominal", value: 514.0, fmt: "$514.0 bn", note: "VND 12,847.6 trillion (p)", src: "NSO" },
      { id: "growth", label: "Real GDP growth", value: 8.02, fmt: "+8.02%", note: "year on year (p)", src: "NSO" },
      { id: "gdppc", label: "GDP per capita", value: 5026, fmt: "$5,026", note: "VND 125.5 million (p)", src: "NSO" },
      { id: "pop", label: "Population", value: 102.3, fmt: "102.3 m", note: "average 2025, +0.99% YoY", src: "NSO" },
      { id: "exports", label: "Merchandise exports (F.O.B.)", value: 475.04, fmt: "$475.04 bn", note: "preliminary", src: "NSO" },
      { id: "cpi", label: "CPI inflation (annual avg.)", value: 3.31, fmt: "3.31%", note: "Dec 2025 YoY 3.48%", src: "NSO" }
    ],
    wb: [
      { id: "gdp", label: "GDP, nominal", value: 514.7, fmt: "$514.7 bn", note: "NY.GDP.MKTP.CD", src: "World Bank WDI" },
      { id: "growth", label: "Real GDP growth", value: 8.02, fmt: "+8.02%", note: "NY.GDP.MKTP.KD.ZG, 8.0% rounded", src: "World Bank WDI" },
      { id: "gdppc", label: "GDP per capita", value: 5066, fmt: "$5,066", note: "NY.GDP.PCAP.CD", src: "World Bank WDI" },
      { id: "pop", label: "Population", value: 101.6, fmt: "101.6 m", note: "SP.POP.TOTL / UN WPP 2024", src: "World Bank / UN" },
      { id: "exports", label: "Merchandise exports", value: 475.04, fmt: "$475.04 bn", note: "NSO figure; WDI goods series aligns", src: "NSO / WDI" },
      { id: "cpi", label: "CPI inflation (annual avg.)", value: 3.31, fmt: "3.31%", note: "FP.CPI.TOTL.ZG", src: "World Bank WDI" }
    ],
    unemployment: { nso: 2.22, nsoUrban: 2.51, nsoRural: 2.02, ilo: 1.52, youthIlo: 6.2 }
  },

  /* ---- Growth (NSO headline) vs CPI (NSO/WDI annual average), 2015-2025 ---- */
  growthCpi: [
    { y: 2015, g: 6.68, c: 0.63 }, { y: 2016, g: 6.21, c: 2.67 },
    { y: 2017, g: 6.81, c: 3.52 }, { y: 2018, g: 7.08, c: 3.54 },
    { y: 2019, g: 7.02, c: 2.80 }, { y: 2020, g: 2.91, c: 3.22 },
    { y: 2021, g: 2.58, c: 1.83 }, { y: 2022, g: 8.12, c: 3.16 },
    { y: 2023, g: 5.05, c: 3.25 }, { y: 2024, g: 7.09, c: 3.62 },
    { y: 2025, g: 8.02, c: 3.31 }
  ],
  growthNote: "2022 first published as 8.02%, later revised to 8.12% by NSO. 2025 is a preliminary estimate.",

  /* ---- GDP nominal (WB WDI NY.GDP.MKTP.CD, $bn) and GDP per capita
         (GDP divided by UN WPP population, $), 2015-2025 ---- */
  gdp: [
    { y: 2015, gdp: 239.3, pc: 2578 }, { y: 2016, gdp: 257.1, pc: 2735 },
    { y: 2017, gdp: 281.4, pc: 2956 }, { y: 2018, gdp: 310.1, pc: 3222 },
    { y: 2019, gdp: 334.4, pc: 3441 }, { y: 2020, gdp: 346.6, pc: 3534 },
    { y: 2021, gdp: 366.5, pc: 3704 }, { y: 2022, gdp: 413.4, pc: 4147 },
    { y: 2023, gdp: 433.8, pc: 4323 }, { y: 2024, gdp: 476.3, pc: 4716 },
    { y: 2025, gdp: 514.7, pc: 5066 }
  ],

  /* ---- Trade & FDI, 2025 (NSO, preliminary) ---- */
  trade: {
    exports: 475.04, imports: 455.01, goodsBalance: 20.03,
    servicesBalance: -10.23, fdiRealised: 27.62, fdiGrowth: 9.0,
    note: "Merchandise trade F.O.B.; FDI realised is the highest in five years."
  },

  /* ---- Fastest-growing industries, 2025 value added (NSO) ---- */
  sectors: [
    { name: "Construction", v: 9.62 },
    { name: "Water supply, sewerage & waste", v: 7.82 },
    { name: "Electricity & gas supply", v: 6.39 },
    { name: "Manufacturing (for reference)", v: null, ref: "see note" }
  ],
  sectorNote: "Whole-economy real GDP growth was 8.02% in 2025. Only sub-sectors NSO published a 2025 growth rate for are charted; no figure is estimated.",

  /* ---- Population (UN WPP 2024, millions) and TFR (UN WPP; NSO point 2025) ---- */
  demography: [
    { y: 2015, pop: 92.82, tfr: 2.10, age: 29.2, urban: 32.4 },
    { y: 2020, pop: 98.08, tfr: 1.96, age: 31.0, urban: 35.6 },
    { y: 2021, pop: 98.94, tfr: 1.94, age: 31.5, urban: 36.7 },
    { y: 2022, pop: 99.68, tfr: 1.93, age: 31.9, urban: 37.5 },
    { y: 2023, pop: 100.35, tfr: 1.91, age: 32.4, urban: 38.1 },
    { y: 2024, pop: 100.99, tfr: 1.90, age: 32.9, urban: 38.5 },
    { y: 2025, pop: 101.60, tfr: 1.88, age: 33.4, urban: 38.8 }
  ],
  tfrNso2025: 1.66,
  demographyNote: "UN WPP 2024 puts the 2025 total fertility rate at 1.88. NSO civil registration (CRVS, 12 Nov 2026) records 1.66 — the two count different things, and both are shown.",

  peopleTiles: [
    { label: "Life expectancy at birth", value: "74.7 yrs", note: "2024, World Bank WDI" },
    { label: "Total fertility rate (NSO)", value: "1.66", note: "2025, NSO civil registration" },
    { label: "Sex ratio at birth", value: "110.1", note: "boys per 100 girls, 2025, NSO CRVS" },
    { label: "Upper-secondary graduation", value: "99.25%", note: "2025, NSO" },
    { label: "Median age", value: "33.4 yrs", note: "2025, UN WPP 2024" },
    { label: "Urban population share", value: "38.8%", note: "2025, UN WPP 2024" }
  ],

  /* ---- 34 provinces & cities after Resolution 202/2025/QH15 (effective 1 Jul 2025).
         Population & area: Resolution 202 figures as tabulated from the official
         resolution (Wikipedia tabulation of the resolution). Status: 11 unchanged,
         23 formed by merger. Total of the 34 = 113,572,156 — see reconciliation note. ---- */
  provinces: [
    { name: "Ho Chi Minh City", vi: "TP. Hồ Chí Minh", type: "City", region: "Southeast", area: 6773, pop: 14002598, status: "merged", from: ["Ho Chi Minh City", "Bình Dương", "Bà Rịa–Vũng Tàu"], capital: "Saigon", gx: 5, gy: 8 },
    { name: "Hanoi", vi: "Hà Nội", type: "City", region: "Red River Delta", area: 3360, pop: 8807523, status: "unchanged", from: [], capital: "Hoàn Kiếm", gx: 2, gy: 2 },
    { name: "An Giang", vi: "An Giang", type: "Province", region: "Mekong Delta", area: 9889, pop: 4952238, status: "merged", from: ["An Giang", "Kiên Giang"], capital: "Rạch Giá", gx: 3, gy: 9 },
    { name: "Haiphong", vi: "Hải Phòng", type: "City", region: "Red River Delta", area: 3195, pop: 4664124, status: "merged", from: ["Hải Phòng", "Hải Dương"], capital: "Thủy Nguyên", gx: 5, gy: 2 },
    { name: "Dong Nai", vi: "Đồng Nai", type: "Province", region: "Southeast", area: 12737, pop: 4491408, status: "merged", from: ["Đồng Nai", "Bình Phước"], capital: "Biên Hòa", gx: 4, gy: 8 },
    { name: "Ninh Binh", vi: "Ninh Bình", type: "Province", region: "Red River Delta", area: 3943, pop: 4412464, status: "merged", from: ["Ninh Bình", "Hà Nam", "Nam Định"], capital: "Hoa Lư", gx: 3, gy: 3 },
    { name: "Dong Thap", vi: "Đồng Tháp", type: "Province", region: "Mekong Delta", area: 5939, pop: 4370046, status: "merged", from: ["Đồng Tháp", "Tiền Giang"], capital: "Mỹ Tho", gx: 2, gy: 9 },
    { name: "Thanh Hoa", vi: "Thanh Hóa", type: "Province", region: "North Central", area: 11115, pop: 4324783, status: "unchanged", from: [], capital: "Thanh Hóa", gx: 3, gy: 4 },
    { name: "Vinh Long", vi: "Vĩnh Long", type: "Province", region: "Mekong Delta", area: 6296, pop: 4257581, status: "merged", from: ["Vĩnh Long", "Bến Tre", "Trà Vinh"], capital: "Vĩnh Long", gx: 4, gy: 9 },
    { name: "Can Tho", vi: "Cần Thơ", type: "City", region: "Mekong Delta", area: 6361, pop: 4199824, status: "merged", from: ["Cần Thơ", "Sóc Trăng", "Hậu Giang"], capital: "Ninh Kiều", gx: 5, gy: 9 },
    { name: "Phu Tho", vi: "Phú Thọ", type: "Province", region: "Northeast", area: 9361, pop: 4022638, status: "merged", from: ["Phú Thọ", "Vĩnh Phúc", "Hòa Bình"], capital: "Việt Trì", gx: 2, gy: 1 },
    { name: "Lam Dong", vi: "Lâm Đồng", type: "Province", region: "South Central Coast & Central Highlands", area: 24233, pop: 3872999, status: "merged", from: ["Lâm Đồng", "Đắk Nông", "Bình Thuận"], capital: "Đà Lạt", gx: 5, gy: 7 },
    { name: "Nghe An", vi: "Nghệ An", type: "Province", region: "North Central", area: 16486, pop: 3831694, status: "unchanged", from: [], capital: "Vinh", gx: 3, gy: 5 },
    { name: "Bac Ninh", vi: "Bắc Ninh", type: "Province", region: "Red River Delta", area: 4719, pop: 3619433, status: "merged", from: ["Bắc Ninh", "Bắc Giang"], capital: "Bắc Giang", gx: 3, gy: 2 },
    { name: "Gia Lai", vi: "Gia Lai", type: "Province", region: "South Central Coast & Central Highlands", area: 21577, pop: 3583693, status: "merged", from: ["Gia Lai", "Bình Định"], capital: "Quy Nhơn", gx: 4, gy: 7 },
    { name: "Hung Yen", vi: "Hưng Yên", type: "Province", region: "Red River Delta", area: 2515, pop: 3567943, status: "merged", from: ["Hưng Yên", "Thái Bình"], capital: "Hưng Yên", gx: 4, gy: 2 },
    { name: "Dak Lak", vi: "Đắk Lắk", type: "Province", region: "South Central Coast & Central Highlands", area: 18096, pop: 3346853, status: "merged", from: ["Đắk Lắk", "Phú Yên"], capital: "Buôn Ma Thuột", gx: 6, gy: 8 },
    { name: "Tay Ninh", vi: "Tây Ninh", type: "Province", region: "Southeast", area: 8537, pop: 3254170, status: "merged", from: ["Tây Ninh", "Long An"], capital: "Tây Ninh", gx: 3, gy: 8 },
    { name: "Da Nang", vi: "Đà Nẵng", type: "City", region: "South Central Coast & Central Highlands", area: 11833, pop: 3065628, status: "merged", from: ["Đà Nẵng", "Quảng Nam"], capital: "Hải Châu", gx: 5, gy: 6 },
    { name: "Khanh Hoa", vi: "Khánh Hòa", type: "Province", region: "South Central Coast & Central Highlands", area: 8556, pop: 2243554, status: "merged", from: ["Khánh Hòa", "Ninh Thuận"], capital: "Nha Trang", gx: 6, gy: 7 },
    { name: "Quang Ngai", vi: "Quảng Ngãi", type: "Province", region: "South Central Coast & Central Highlands", area: 14833, pop: 2161755, status: "merged", from: ["Quảng Ngãi", "Kon Tum"], capital: "Quảng Ngãi", gx: 6, gy: 6 },
    { name: "Ca Mau", vi: "Cà Mau", type: "Province", region: "Mekong Delta", area: 7942, pop: 2606672, status: "merged", from: ["Cà Mau", "Bạc Liêu"], capital: "Cà Mau", gx: 6, gy: 9 },
    { name: "Tuyen Quang", vi: "Tuyên Quang", type: "Province", region: "Northeast", area: 13796, pop: 1865270, status: "merged", from: ["Tuyên Quang", "Hà Giang"], capital: "Tuyên Quang", gx: 2, gy: 0 },
    { name: "Quang Tri", vi: "Quảng Trị", type: "Province", region: "North Central", area: 12700, pop: 1870845, status: "merged", from: ["Quảng Bình", "Quảng Trị"], capital: "Đồng Hới", gx: 4, gy: 6 },
    { name: "Thai Nguyen", vi: "Thái Nguyên", type: "Province", region: "Northeast", area: 8376, pop: 1799489, status: "merged", from: ["Thái Nguyên", "Bắc Kạn"], capital: "Thái Nguyên", gx: 3, gy: 1 },
    { name: "Lao Cai", vi: "Lào Cai", type: "Province", region: "Northwest", area: 13257, pop: 1778785, status: "merged", from: ["Lào Cai", "Yên Bái"], capital: "Yên Bái", gx: 1, gy: 0 },
    { name: "Ha Tinh", vi: "Hà Tĩnh", type: "Province", region: "North Central", area: 5994, pop: 1622901, status: "unchanged", from: [], capital: "Hà Tĩnh", gx: 4, gy: 5 },
    { name: "Quang Ninh", vi: "Quảng Ninh", type: "Province", region: "Northeast", area: 6208, pop: 1497477, status: "unchanged", from: [], capital: "Hạ Long", gx: 5, gy: 1 },
    { name: "Hue", vi: "Huế", type: "City", region: "North Central", area: 4947, pop: 1432986, status: "unchanged", from: [], capital: "Thuận Hóa", gx: 5, gy: 5 },
    { name: "Son La", vi: "Sơn La", type: "Province", region: "Northwest", area: 14110, pop: 1404587, status: "unchanged", from: [], capital: "Sơn La", gx: 1, gy: 1 },
    { name: "Dien Bien", vi: "Điện Biên", type: "Province", region: "Northwest", area: 9540, pop: 673091, status: "unchanged", from: [], capital: "Điện Biên Phủ", gx: 0, gy: 1 },
    { name: "Cao Bang", vi: "Cao Bằng", type: "Province", region: "Northeast", area: 6700, pop: 573119, status: "unchanged", from: [], capital: "Cao Bằng", gx: 3, gy: 0 },
    { name: "Lang Son", vi: "Lạng Sơn", type: "Province", region: "Northeast", area: 8310, pop: 881384, status: "unchanged", from: [], capital: "Lạng Sơn", gx: 4, gy: 1 },
    { name: "Lai Chau", vi: "Lai Châu", type: "Province", region: "Northwest", area: 9069, pop: 512601, status: "unchanged", from: [], capital: "Lai Châu", gx: 0, gy: 0 }
  ],

  reconciliation: {
    registeredTotal: 113572156,
    residentNso: 102300000,
    gap: 11272156,
    text: "The 34 province populations in Resolution 202/2025/QH15 add up to 113,572,156 — 11.27 million more than NSO's resident population of 102.3 million for 2025. The two count different things: the resolution figures are administrative registrations (hộ khẩu) used to draw the new boundaries, while NSO's 102.3 million is the resident population. They are not the same measure, so this atlas never adds the two together and flags the gap wherever the provincial table appears."
  },

  sources: [
    { name: "National Statistics Office of Viet Nam (NSO, formerly GSO)", what: "GDP growth, GDP in VND, CPI, population, unemployment, trade, FDI, TFR (CRVS), graduation rate", url: "nso.gov.vn", note: "Renamed from General Statistics Office on 1 March 2025." },
    { name: "World Bank — World Development Indicators", what: "GDP nominal (NY.GDP.MKTP.CD), GDP per capita (NY.GDP.PCAP.CD), CPI inflation (FP.CPI.TOTL.ZG), ILO-modelled unemployment (SL.UEM.TOTL.ZS), life expectancy", url: "data.worldbank.org", note: "CC BY 4.0. 2025 WDI values are the latest published vintage." },
    { name: "United Nations — World Population Prospects 2024", what: "Population, total fertility rate, median age, urban share (medium variant)", url: "population.un.org/wpp", note: "Estimates; NSO's own 2025 population (102.3 m) is shown as the headline instead." },
    { name: "National Assembly — Resolution 202/2025/QH15", what: "The 63-to-34 provincial reorganisation: new names, areas and registered populations, effective 1 July 2025", url: "quochoi.vn", note: "Figures are administrative registrations, not the resident population — see the reconciliation note." },
    { name: "ILO / ILOSTAT (via WDI)", what: "Modelled unemployment for international comparison", url: "ilostat.ilo.org", note: "Modelled estimates use a different definition from NSO's working-age survey — see People." }
  ]
};
