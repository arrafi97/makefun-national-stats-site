// Data resmi Indonesia 2020-2024 untuk NusaData.
// Setiap angka di bawah ini berasal dari rilis resmi Badan Pusat Statistik (BPS),
// Kementerian Keuangan, Bank Indonesia, atau Ditjen Dukcapil Kemendagri —
// sumber dan tahunnya ditulis di samping angka pada setiap tampilan situs.
// Tidak ada angka yang dikarang: bila suatu rincian tidak terverifikasi,
// situs menampilkannya sebagai "tidak tersedia", bukan sebagai tebakan.
export const YEARS = [2020, 2021, 2022, 2023, 2024];
export const LATEST_YEAR = 2024;

// Seri tahunan nasional. Nilai memakai pembulatan yang sama seperti rilis sumber.
export const SERIES = {
  // Juta jiwa, pertengahan tahun. Sumber: BPS, Proyeksi Penduduk Interim
  // 2020-2023; 2020 dari Sensus Penduduk 2020 (270,20 juta).
  population: { 2020: 270.2, 2021: 272.7, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
  // Persen, c-to-c. Sumber: BPS, Berita Resmi Statistik 5 Februari 2025.
  gdpGrowth: { 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  // Rp triliun, atas dasar harga berlaku. Sumber: BPS.
  gdpNominal: { 2020: 15443.4, 2021: 16976.7, 2022: 19588.5, 2023: 20892.3, 2024: 22139.0 },
  // Persen, Desember y-on-y. Sumber: BPS.
  inflation: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  // Persen, Maret. Sumber: BPS, rilis 1 Juli 2024 (2024: 9,03%).
  povertyRate: { 2020: 9.78, 2021: 10.14, 2022: 9.54, 2023: 9.36, 2024: 9.03 },
  // Juta orang, Maret. Sumber: BPS.
  povertyPeople: { 2020: 26.42, 2021: 27.54, 2022: 26.16, 2023: 25.9, 2024: 25.22 },
  // Rasio Gini, Maret. Sumber: BPS.
  gini: { 2020: 0.381, 2021: 0.384, 2022: 0.384, 2023: 0.388, 2024: 0.379 },
  // Persen, Agustus (Sakernas). Sumber: BPS.
  unemployment: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  // Indeks Pembangunan Manusia. Sumber: BPS, rilis 15 November 2024.
  hdi: { 2020: 71.94, 2021: 72.29, 2022: 73.37, 2023: 74.39, 2024: 75.02 },
  // Miliar dolar AS. Sumber: BPS, rilis perdagangan Januari 2025.
  exports: { 2020: 163.19, 2021: 231.61, 2022: 291.9, 2023: 258.82, 2024: 264.7 },
  imports: { 2020: 141.57, 2021: 196.19, 2022: 237.51, 2023: 221.89, 2024: 233.66 },
};

// Fakta kunci 2024 yang tidak berbentuk seri tahunan.
export const FACTS_2024 = {
  gdpPerCapitaRp: 'Rp78,6 juta',
  gdpPerCapitaUsd: 'US$4.960,3',
  gdpQ4Growth: '5,02% (y-on-y, Triwulan IV-2024)',
  householdConsumptionGrowth: '4,94%',
  investmentGrowth: '4,61% (PMTB)',
  topSectorGrowth: 'Jasa Lainnya 9,80%',
  povertyLine: 'Rp582.932 per kapita per bulan',
  povertyUrban: '7,09%',
  povertyRural: '11,79%',
  tradeSurplus: 'US$31,04 miliar',
  landArea: '1.890.179,78 km²',
  islands: '17.380 pulau',
  languages: '718 bahasa daerah',
  density: '149 jiwa/km²',
};

// Ketenagakerjaan, Agustus 2024 (Sakernas, BPS). Juta orang, kecuali dinyatakan lain.
export const LABOR_2024 = {
  workingAge: 215.37,
  laborForce: 152.11,
  notLaborForce: 63.26,
  employed: 144.64,
  unemployed: 7.47,
  lfpr: 70.63,
  epr: 67.16,
  fullTime: 98.45,
  partTime: 34.63,
  underemployed: 11.56,
  informalShare: 57.95,
  informalPeople: 83.83,
  agricultureShare: 28.18,
  avgWage: 'Rp3,27 juta per bulan',
};

// Persebaran penduduk menurut pulau, Semester I 2024.
// Sumber: Ditjen Dukcapil Kemendagri, Data Kependudukan Bersih Semester I 2024.
// "Maluku & Papua" adalah sisa dari total nasional 282,48 juta jiwa.
export const ISLANDS = [
  { name: 'Jawa', people: 157.39, share: 55.93 },
  { name: 'Sumatra', people: 61.58, share: 21.81 },
  { name: 'Sulawesi', people: 20.78, share: 7.36 },
  { name: 'Kalimantan', people: 17.45, share: 6.18 },
  { name: 'Bali & Nusa Tenggara', people: 15.71, share: 5.56 },
  { name: 'Maluku & Papua', people: 9.55, share: 3.38 },
];

// 12 provinsi dengan penduduk terbanyak, 2024 (ribu jiwa).
// Sumber: BPS, Proyeksi Penduduk Interim 2020-2023 (pertengahan tahun).
export const TOP_PROVINCES = [
  { name: 'Jawa Barat', pop: 50345.2, share: 17.88 },
  { name: 'Jawa Timur', pop: 41814.5, share: 14.85 },
  { name: 'Jawa Tengah', pop: 37892.3, share: 13.46 },
  { name: 'Sumatera Utara', pop: 15588.5, share: 5.54 },
  { name: 'Banten', pop: 12431.4, share: 4.41 },
  { name: 'DKI Jakarta', pop: 10684.9, share: 3.79 },
  { name: 'Sulawesi Selatan', pop: 9463.4, share: 3.36 },
  { name: 'Lampung', pop: 9419.6, share: 3.34 },
  { name: 'Sumatera Selatan', pop: 8837.3, share: 3.14 },
  { name: 'Riau', pop: 6728.1, share: 2.39 },
  { name: 'Sumatera Barat', pop: 5836.2, share: 2.07 },
  { name: 'Kalimantan Barat', pop: 5695.5, share: 2.02 },
];

// Kepadatan penduduk menurut provinsi, 2024 (jiwa/km²).
// Sumber: BPS, Proyeksi Penduduk Interim 2020-2023 (pertengahan tahun).
export const DENSITY = [
  { name: 'DKI Jakarta', value: 16165 },
  { name: 'Jawa Barat', value: 1359 },
  { name: 'Banten', value: 1329 },
  { name: 'DI Yogyakarta', value: 1186 },
  { name: 'Jawa Tengah', value: 1104 },
  { name: 'Jawa Timur', value: 870 },
  { name: 'Bali', value: 793 },
  { name: 'Nusa Tenggara Barat', value: 287 },
  { name: 'Lampung', value: 281 },
  { name: 'Kepulauan Riau', value: 264 },
  { name: 'Sumatera Utara', value: 215 },
  { name: 'Sulawesi Selatan', value: 209 },
  { name: 'Sulawesi Utara', value: 186 },
  { name: 'Sumatera Barat', value: 139 },
  { name: 'Nusa Tenggara Timur', value: 122 },
  { name: 'Kalimantan Selatan', value: 115 },
  { name: 'Bengkulu', value: 105 },
  { name: 'Gorontalo', value: 102 },
  { name: 'Sumatera Selatan', value: 102 },
  { name: 'Aceh', value: 98 },
  { name: 'Kep. Bangka Belitung', value: 92 },
  { name: 'Sulawesi Barat', value: 91 },
  { name: 'Sulawesi Tenggara', value: 77 },
  { name: 'Jambi', value: 76 },
  { name: 'Riau', value: 75 },
  { name: 'Sulawesi Tengah', value: 51 },
  { name: 'Maluku', value: 42 },
  { name: 'Maluku Utara', value: 41 },
  { name: 'Kalimantan Barat', value: 39 },
  { name: 'Kalimantan Timur', value: 32 },
  { name: 'Papua Pegunungan', value: 29 },
  { name: 'Papua Tengah', value: 24 },
  { name: 'Kalimantan Tengah', value: 18 },
  { name: 'Papua Barat Daya', value: 16 },
  { name: 'Papua', value: 13 },
  { name: 'Kalimantan Utara', value: 11 },
  { name: 'Papua Barat', value: 10 },
  { name: 'Papua Selatan', value: 5 },
];

// Rilis dan publikasi yang dirujuk situs ini.
export const SOURCES = [
  { label: 'BPS — Berita Resmi Statistik: Pertumbuhan Ekonomi 2024', detail: '5 Februari 2025' },
  { label: 'BPS — Berita Resmi Statistik: Inflasi Desember 2024', detail: '2 Januari 2025' },
  { label: 'BPS — Berita Resmi Statistik: Kemiskinan Maret 2024', detail: '1 Juli 2024' },
  { label: 'BPS — Berita Resmi Statistik: Perdagangan 2024', detail: 'Januari 2025' },
  { label: 'BPS — Indeks Pembangunan Manusia 2024', detail: '15 November 2024' },
  { label: 'BPS — Keadaan Angkatan Kerja Agustus 2024 (Sakernas)', detail: 'November 2024' },
  { label: 'BPS — Proyeksi Penduduk Interim 2020–2023', detail: 'Pertengahan tahun 2024' },
  { label: 'BPS — Statistik Indonesia 2025', detail: '2025' },
  { label: 'Ditjen Dukcapil Kemendagri — Data Kependudukan Bersih Semester I 2024', detail: '2024' },
  { label: 'Kementerian Keuangan — Siaran Pers Kemiskinan & Ketimpangan', detail: '2 Juli 2024' },
];

export const RELEASES = [
  { date: '5 Feb 2025', title: 'Ekonomi Indonesia 2024 tumbuh 5,03 persen', source: 'BPS' },
  { date: '2 Jan 2025', title: 'Inflasi Desember 2024 sebesar 1,57 persen (y-on-y)', source: 'BPS' },
  { date: '15 Nov 2024', title: 'Indeks Pembangunan Manusia 2024 mencapai 75,02', source: 'BPS' },
  { date: '5 Nov 2024', title: 'Tingkat Pengangguran Terbuka Agustus 2024 sebesar 4,91 persen', source: 'BPS' },
  { date: '1 Jul 2024', title: 'Tingkat kemiskinan Maret 2024 turun menjadi 9,03 persen', source: 'BPS' },
  { date: '15 Jan 2025', title: 'Neraca perdagangan 2024 surplus US$31,04 miliar', source: 'BPS' },
];
