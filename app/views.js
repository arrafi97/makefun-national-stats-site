// Perender tampilan NusaData: satu fungsi per halaman.
// Semua tampilan menerima tahun aktif dan mengembalikan HTML; interaksi
// (urutkan tabel, cari provinsi, pilih provinsi) ditangani main.js.
import { SERIES, FACTS_2024, LABOR_2024, ISLANDS, TOP_PROVINCES, DENSITY, SOURCES, RELEASES, YEARS } from './data.js';
import { barChart, lineChart, hbarChart, shareBars, esc } from './charts.js';

function id(n) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function idInt(n) {
  return n.toLocaleString('id-ID');
}

function seriesValues(key) {
  return YEARS.map((y) => SERIES[key][y]);
}

function kpi(label, value, sub, source) {
  return `<article class="kpi"><p class="kpi-label">${esc(label)}</p><p class="kpi-value">${esc(value)}</p><p class="kpi-sub">${esc(sub)}</p><p class="kpi-src">Sumber: ${esc(source)}</p></article>`;
}

function card(title, source, inner, extra = '') {
  return `<section class="card ${extra}"><h2>${esc(title)}</h2><div class="card-body">${inner}</div><p class="src">Sumber: ${esc(source)}</p></section>`;
}

function yearNote(year) {
  return `<p class="year-note">Menampilkan angka tahun <strong>${year}</strong>. Ubah tahun di bilah atas untuk melihat tahun lain (2020–2024).</p>`;
}

export function viewHome(year) {
  const cards = [
    kpi('Penduduk', `${id(SERIES.population[year])} jt`, `Tumbuh ${year === 2024 ? '1,04' : '—'}% dari tahun sebelumnya`, 'BPS, Proyeksi Penduduk Interim'),
    kpi('Pertumbuhan PDB', `${id(SERIES.gdpGrowth[year])}%`, `PDB Rp${idInt(SERIES.gdpNominal[year])} triliun`, 'BPS, 5 Feb 2025'),
    kpi('Inflasi (Des, y-on-y)', `${id(SERIES.inflation[year])}%`, 'Harga konsumen, Desember', 'BPS'),
    kpi('Tingkat kemiskinan', `${id(SERIES.povertyRate[year])}%`, `${id(SERIES.povertyPeople[year])} juta orang (Maret)`, 'BPS, 1 Jul 2024'),
    kpi('Pengangguran (TPT)', `${id(SERIES.unemployment[year])}%`, 'Angkatan kerja, Agustus', 'BPS, Sakernas'),
    kpi('Indeks Pembangunan Manusia', id(SERIES.hdi[year]), 'Skala 0–100', 'BPS, 15 Nov 2024'),
  ].join('');
  const releases = RELEASES.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><span class="rel-title">${esc(r.title)}</span><span class="rel-src">${esc(r.source)}</span></li>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">Portal Statistik Nasional Indonesia</p>
    <h1>Angka resmi Indonesia,<br>dalam satu tempat.</h1>
    <p class="lede">NusaData menyajikan ulang angka resmi Indonesia 2020–2024 — penduduk, ekonomi, kemiskinan, ketenagakerjaan, dan wilayah — lengkap dengan sumber dan tahunnya, agar siapa pun bisa memeriksa dan memakainya.</p>
    <p class="hero-facts"><span><strong>281,6 jt</strong> penduduk (2024)</span><span><strong>38</strong> provinsi</span><span><strong>17.380</strong> pulau</span><span><strong>5,03%</strong> pertumbuhan ekonomi</span></p>
  </section>
  ${yearNote(year)}
  <div class="kpi-grid">${cards}</div>
  <div class="duo">
    ${card('Pertumbuhan ekonomi 2020–2024 (% per tahun)', 'BPS, Berita Resmi Statistik 5 Feb 2025', barChart({ years: YEARS, values: seriesValues('gdpGrowth'), unit: 'pertumbuhan PDB persen' }))}
    ${card('Jumlah penduduk 2020–2024 (juta jiwa)', 'BPS, Proyeksi Penduduk Interim', lineChart({ years: YEARS, values: seriesValues('population'), unit: 'jumlah penduduk juta jiwa' }))}
  </div>
  <div class="duo">
    ${card('Penduduk menurut pulau, Semester I 2024', 'Ditjen Dukcapil Kemendagri, Data Kependudukan Bersih', shareBars(ISLANDS))}
    ${card('Rilis terbaru yang dirujuk', 'Badan Pusat Statistik', `<ul class="releases">${releases}</ul>`)}
  </div>
  <p class="disclaimer">NusaData adalah situs independen yang menyajikan ulang data resmi. Bukan situs resmi Badan Pusat Statistik. Angka ditampilkan apa adanya dari sumbernya; lihat halaman <a href="#/tentang">Tentang &amp; Metodologi</a> untuk daftar sumber lengkap.</p>`;
}

export function viewEconomy(year) {
  const tradeRows = YEARS.map((y) => {
    const surplus = (SERIES.exports[y] - SERIES.imports[y]).toFixed(2);
    return `<tr><td>${y}</td><td>${id(SERIES.exports[y])}</td><td>${id(SERIES.imports[y])}</td><td>${id(Number(surplus))}</td></tr>`;
  }).join('');
  return `
  <h1 class="page-title">Ekonomi</h1>
  <p class="page-lede">Produk domestik bruto, inflasi, dan perdagangan luar negeri Indonesia 2020–2024.</p>
  ${yearNote(year)}
  <div class="kpi-grid">
    ${kpi('PDB (harga berlaku)', `Rp${idInt(SERIES.gdpNominal[year])} T`, `Tumbuh ${id(SERIES.gdpGrowth[year])}% dari tahun sebelumnya`, 'BPS')}
    ${kpi('PDB per kapita (2024)', FACTS_2024.gdpPerCapitaRp, FACTS_2024.gdpPerCapitaUsd, 'BPS, 5 Feb 2025')}
    ${kpi('Inflasi', `${id(SERIES.inflation[year])}%`, 'Desember, y-on-y', 'BPS')}
    ${kpi('Ekspor', `US$${id(SERIES.exports[year])} M`, `Impor US$${id(SERIES.imports[year])} M`, 'BPS, Jan 2025')}
  </div>
  <div class="duo">
    ${card('Pertumbuhan PDB 2020–2024 (% per tahun)', 'BPS', barChart({ years: YEARS, values: seriesValues('gdpGrowth'), unit: 'pertumbuhan PDB persen' }))}
    ${card('Inflasi Desember 2020–2024 (% y-on-y)', 'BPS', lineChart({ years: YEARS, values: seriesValues('inflation'), unit: 'inflasi persen' }))}
  </div>
  <div class="duo">
    ${card('Ekspor dan impor 2020–2024 (miliar US$)', 'BPS', barChart({ years: YEARS, values: seriesValues('exports'), unit: 'ekspor miliar dolar' }))}
    ${card('Apa yang menggerakkan ekonomi 2024', 'BPS, 5 Feb 2025', `<dl class="facts">
      <dt>Triwulan IV-2024</dt><dd>Tumbuh ${FACTS_2024.gdpQ4Growth}</dd>
      <dt>Konsumsi rumah tangga</dt><dd>Tumbuh ${FACTS_2024.householdConsumptionGrowth} sepanjang 2024</dd>
      <dt>Investasi (PMTB)</dt><dd>Tumbuh ${FACTS_2024.investmentGrowth} sepanjang 2024</dd>
      <dt>Lapangan usaha tercepat</dt><dd>${FACTS_2024.topSectorGrowth}</dd>
      <dt>Surplus perdagangan 2024</dt><dd>${FACTS_2024.tradeSurplus}</dd>
    </dl>`)}
  </div>
  ${card('Neraca perdagangan 2020–2024 (miliar US$)', 'BPS', `<table class="data-table"><thead><tr><th>Tahun</th><th>Ekspor</th><th>Impor</th><th>Surplus</th></tr></thead><tbody>${tradeRows}</tbody></table>`)}`;
}

export function viewDemography(year) {
  const rows = TOP_PROVINCES.map((p, i) => `<tr data-prov="${esc(p.name)}"><td>${i + 1}</td><td>${esc(p.name)}</td><td>${id(p.pop)}</td><td>${id(p.share)}%</td></tr>`).join('');
  const densityRows = DENSITY.slice(0, 12).map((d) => ({ label: d.name, value: d.value, valueText: idInt(d.value) }));
  return `
  <h1 class="page-title">Demografi</h1>
  <p class="page-lede">Berapa banyak penduduk Indonesia, di mana mereka tinggal, dan seberapa padat setiap provinsi.</p>
  ${yearNote(year)}
  <div class="kpi-grid">
    ${kpi('Penduduk', `${id(SERIES.population[year])} jt`, 'Pertengahan tahun', 'BPS, Proyeksi Penduduk Interim')}
    ${kpi('Luas wilayah', FACTS_2024.landArea, 'Daratan Indonesia', 'BPS')}
    ${kpi('Kepadatan nasional', FACTS_2024.density, 'Jiwa per km², 2024', 'BPS')}
    ${kpi('Pulau & bahasa', FACTS_2024.islands, FACTS_2024.languages, 'BPS / BIG 2024')}
  </div>
  <div class="duo">
    ${card('Jumlah penduduk 2020–2024 (juta jiwa)', 'BPS, Proyeksi Penduduk Interim', lineChart({ years: YEARS, values: seriesValues('population'), unit: 'jumlah penduduk juta jiwa' }))}
    ${card('Penduduk menurut pulau, Semester I 2024', 'Ditjen Dukcapil Kemendagri', shareBars(ISLANDS))}
  </div>
  <div class="duo">
    ${card('12 provinsi dengan penduduk terbanyak, 2024', 'BPS, Proyeksi Penduduk Interim — klik baris untuk melihat kepadatannya', `<div class="table-tools"><input id="prov-search" type="search" placeholder="Cari provinsi…" aria-label="Cari provinsi"><span class="hint">Klik kepala kolom untuk mengurutkan.</span></div><table class="data-table sortable" id="prov-table"><thead><tr><th data-sort="0">#</th><th data-sort="1">Provinsi</th><th data-sort="2">Penduduk (ribu jiwa)</th><th data-sort="3">Pangsa (%)</th></tr></thead><tbody>${rows}</tbody></table>`)}
    ${card('Provinsi terpadat 2024 (jiwa/km²)', 'BPS, Proyeksi Penduduk Interim', hbarChart({ rows: densityRows, unit: 'kepadatan jiwa per km persegi' }))}
  </div>
  <div id="prov-detail" class="detail" hidden></div>
  <p class="disclaimer">Kepadatan DKI Jakarta (16.165 jiwa/km²) lebih dari 100 kali rata-rata nasional (149 jiwa/km²), sementara Papua Selatan hanya 5 jiwa/km² — ketimpangan persebaran inilah yang membuat angka provinsi penting dibaca bersama angka nasional.</p>`;
}

export function viewSocial(year) {
  return `
  <h1 class="page-title">Sosial</h1>
  <p class="page-lede">Kemiskinan, ketimpangan, dan pembangunan manusia — apakah kehidupan membaik, dan bagi siapa.</p>
  ${yearNote(year)}
  <div class="kpi-grid">
    ${kpi('Tingkat kemiskinan', `${id(SERIES.povertyRate[year])}%`, `${id(SERIES.povertyPeople[year])} juta orang (Maret)`, 'BPS, 1 Jul 2024')}
    ${kpi('Rasio Gini', id(SERIES.gini[year]), 'Ketimpangan pengeluaran (Maret)', 'BPS')}
    ${kpi('IPM', id(SERIES.hdi[year]), 'Skala 0–100', 'BPS, 15 Nov 2024')}
    ${kpi('Garis kemiskinan (2024)', FACTS_2024.povertyLine, 'Maret 2024', 'BPS')}
  </div>
  <div class="duo">
    ${card('Tingkat kemiskinan 2020–2024 (% penduduk, Maret)', 'BPS', barChart({ years: YEARS, values: seriesValues('povertyRate'), unit: 'tingkat kemiskinan persen' }))}
    ${card('Indeks Pembangunan Manusia 2020–2024', 'BPS', lineChart({ years: YEARS, values: seriesValues('hdi'), unit: 'IPM' }))}
  </div>
  <div class="duo">
    ${card('Rasio Gini 2020–2024 (Maret)', 'BPS', lineChart({ years: YEARS, values: seriesValues('gini'), unit: 'rasio gini' }))}
    ${card('Kemiskinan kota dan desa, Maret 2024', 'BPS, 1 Jul 2024', `<dl class="facts">
      <dt>Perkotaan</dt><dd>${FACTS_2024.povertyUrban} penduduk miskin</dd>
      <dt>Perdesaan</dt><dd>${FACTS_2024.povertyRural} penduduk miskin</dd>
      <dt>Penurunan 2024</dt><dd>0,68 juta orang keluar dari kemiskinan dibanding Maret 2023 — terendah dalam satu dekade</dd>
      <dt>Garis kemiskinan rumah tangga</dt><dd>Rp2.786.415 per rumah tangga per bulan</dd>
    </dl>`)}
  </div>
  <p class="disclaimer">Kemiskinan turun dari 9,78% (2020) menjadi 9,03% (2024) dan IPM naik dari 71,94 menjadi 75,02 — tetapi kesenjangan kota–desa tetap lebar: kemiskinan perdesaan 11,79% berbanding 7,09% di perkotaan.</p>`;
}

export function viewLabor(year) {
  const l = LABOR_2024;
  return `
  <h1 class="page-title">Ketenagakerjaan</h1>
  <p class="page-lede">Siapa yang bekerja, di mana, dan berapa penghasilannya — Survei Angkatan Kerja Nasional (Sakernas) Agustus 2024.</p>
  ${yearNote(year)}
  <div class="kpi-grid">
    ${kpi('Angkatan kerja', `${id(l.laborForce)} jt`, `dari ${id(l.workingAge)} jt penduduk usia kerja`, 'BPS, Sakernas Agu 2024')}
    ${kpi('Tingkat pengangguran', `${id(SERIES.unemployment[year])}%`, `${id(l.unemployed)} juta orang menganggur`, 'BPS, Sakernas')}
    ${kpi('TPAK', `${id(l.lfpr)}%`, 'Penduduk usia kerja yang aktif bekerja', 'BPS, Sakernas')}
    ${kpi('Upah rata-rata', l.avgWage, 'Buruh/karyawan/pegawai, bersih sebulan', 'BPS, Sakernas')}
  </div>
  <div class="duo">
    ${card('Tingkat pengangguran terbuka 2020–2024 (% angkatan kerja, Agustus)', 'BPS, Sakernas', lineChart({ years: YEARS, values: seriesValues('unemployment'), unit: 'TPT persen' }))}
    ${card('Dari penduduk usia kerja ke pekerjaan, Agustus 2024', 'BPS, Sakernas Agustus 2024', `<dl class="facts">
      <dt>Penduduk usia kerja (15+)</dt><dd>${id(l.workingAge)} juta orang</dd>
      <dt>Angkatan kerja</dt><dd>${id(l.laborForce)} juta — ${id(l.lfpr)}% dari penduduk usia kerja</dd>
      <dt>Bukan angkatan kerja</dt><dd>${id(l.notLaborForce)} juta orang</dd>
      <dt>Bekerja</dt><dd>${id(l.employed)} juta orang</dd>
      <dt>Menganggur</dt><dd>${id(l.unemployed)} juta orang</dd>
      <dt>Pekerja penuh (&gt;35 jam/minggu)</dt><dd>${id(l.fullTime)} juta orang</dd>
      <dt>Pekerja paruh waktu</dt><dd>${id(l.partTime)} juta orang</dd>
      <dt>Setengah pengangguran</dt><dd>${id(l.underemployed)} juta orang</dd>
    </dl>`)}
  </div>
  ${card('Di mana orang Indonesia bekerja', 'BPS, Sakernas Agustus 2024', `<dl class="facts">
    <dt>Pertanian</dt><dd>${id(l.agricultureShare)}% dari 144,64 juta penduduk bekerja — sektor penyerap terbesar</dd>
    <dt>Informal</dt><dd>${id(l.informalShare)}% penduduk bekerja (${id(l.informalPeople)} juta orang) bekerja di kegiatan informal</dd>
    <dt>Pengangguran menurut pendidikan</dt><dd>Tertinggi pada lulusan SMA (umum dan kejuruan): 7,80%</dd>
    <dt>Komposisi pendidikan angkatan kerja</dt><dd>51,40% berpendidikan dasar</dd>
  </dl>`)}`;
}

export function viewRegions() {
  const rows = DENSITY.map((d, i) => {
    const pop = TOP_PROVINCES.find((p) => p.name === d.name);
    return `<tr data-prov="${esc(d.name)}"><td>${i + 1}</td><td>${esc(d.name)}</td><td>${pop ? id(pop.pop) : '—'}</td><td>${idInt(d.value)}</td></tr>`;
  }).join('');
  const densityRows = DENSITY.slice(0, 12).map((d) => ({ label: d.name, value: d.value, valueText: idInt(d.value) }));
  return `
  <h1 class="page-title">Wilayah</h1>
  <p class="page-lede">Jelajahi 38 provinsi: cari, urutkan, dan bandingkan kepadatan penduduknya. Angka penduduk 2024 ditampilkan untuk 12 provinsi terpadat yang datanya terverifikasi dari BPS.</p>
  <div class="duo">
    ${card('Kepadatan penduduk menurut provinsi, 2024', 'BPS, Proyeksi Penduduk Interim — klik baris tabel untuk menyorot provinsi', `<div class="table-tools"><input id="prov-search" type="search" placeholder="Cari provinsi…" aria-label="Cari provinsi"><span class="hint">Klik kepala kolom untuk mengurutkan. Tanda — berarti angka penduduk provinsi itu tidak ditampilkan karena belum terverifikasi.</span></div><table class="data-table sortable" id="prov-table"><thead><tr><th data-sort="0">#</th><th data-sort="1">Provinsi</th><th data-sort="2">Penduduk 2024 (ribu jiwa)</th><th data-sort="3">Kepadatan (jiwa/km²)</th></tr></thead><tbody>${rows}</tbody></table>`)}
    ${card('12 provinsi terpadat 2024 (jiwa/km²)', 'BPS, Proyeksi Penduduk Interim', hbarChart({ rows: densityRows, unit: 'kepadatan jiwa per km persegi' }))}
  </div>
  <div id="prov-detail" class="detail" hidden></div>
  <p class="disclaimer">DKI Jakarta menampung 10,68 juta jiwa di wilayah yang kepadatannya 16.165 jiwa/km² — lebih dari 3.000 kali lipat Papua Selatan (5 jiwa/km²). Perbedaan ini menentukan kebutuhan layanan publik di tiap daerah.</p>`;
}

export function viewAbout() {
  const src = SOURCES.map((s) => `<li><strong>${esc(s.label)}</strong> — ${esc(s.detail)}</li>`).join('');
  return `
  <h1 class="page-title">Tentang &amp; Metodologi</h1>
  <p class="page-lede">Bagaimana NusaData dibuat, dari mana angkanya, dan apa batasannya.</p>
  <section class="card"><h2>Apa itu NusaData</h2><div class="card-body">
  <p>NusaData adalah situs statistik nasional Indonesia yang dibuat untuk lomba make.fun — dirancang dan ditulis dari nol, tanpa menyalin tampilan, teks, atau gambar situs lain. Situs ini berjalan sepenuhnya dari berkas statisnya sendiri: tidak ada permintaan jaringan, tidak ada pelacak, dan tidak ada data yang dikirim ke mana pun.</p>
  <p>Angka yang ditampilkan adalah angka resmi yang diterbitkan Badan Pusat Statistik (BPS), Kementerian Keuangan, Bank Indonesia, dan Ditjen Dukcapil Kemendagri. NusaData menyajikan ulang angka-angka itu dengan sumber dan tahun yang tertulis di sampingnya, agar pembaca bisa memeriksa sendiri.</p>
  </div></section>
  <section class="card"><h2>Metodologi</h2><div class="card-body">
  <ul class="methods">
    <li><strong>Tahun tampilan.</strong> Pemilih tahun di bilah atas mengubah seluruh kartu dan grafik ke tahun 2020–2024. Angka yang sifatnya bulanan diberi label bulannya (misalnya kemiskinan Maret, pengangguran Agustus, inflasi Desember).</li>
    <li><strong>Satuan Indonesia.</strong> Desimal memakai koma dan ribuan memakai titik, mengikuti kaidah penulisan angka Indonesia.</li>
    <li><strong>Tidak ada tebakan.</strong> Bila suatu rincian tidak terverifikasi dari sumber resmi, situs menampilkannya sebagai tidak tersedia (tanda —), bukan sebagai perkiraan.</li>
    <li><strong>Grafik digambar di tempat.</strong> Semua grafik adalah SVG yang dihitung dari data di berkas situs ini — tanpa pustaka grafik dan tanpa gambar dari luar.</li>
  </ul>
  </div></section>
  <section class="card"><h2>Sumber data</h2><div class="card-body"><ol class="sources">${src}</ol></div>
  <p class="src">Terakhir diperbarui: 26 November 2026. NusaData bukan situs resmi BPS; untuk data mentah dan publikasi lengkap, lihat publikasi BPS yang dirujuk di atas.</p></section>`;
}

export const VIEWS = {
  home: viewHome,
  ekonomi: viewEconomy,
  demografi: viewDemography,
  sosial: viewSocial,
  kerja: viewLabor,
  wilayah: viewRegions,
  tentang: viewAbout,
};

export const NAV = [
  ['home', 'Beranda', '#/'],
  ['ekonomi', 'Ekonomi', '#/ekonomi'],
  ['demografi', 'Demografi', '#/demografi'],
  ['sosial', 'Sosial', '#/sosial'],
  ['kerja', 'Ketenagakerjaan', '#/kerja'],
  ['wilayah', 'Wilayah', '#/wilayah'],
  ['tentang', 'Tentang', '#/tentang'],
];
