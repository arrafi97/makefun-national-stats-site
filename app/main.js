// Pengendali NusaData: perute hash, pemilih tahun, pengurutan dan pencarian
// tabel, panel rincian provinsi, dan mode tangkapan layar deterministik
// (?shot=beranda|ekonomi|demografi|ponsel) untuk screenshots/ entri ini.
import { VIEWS, NAV } from './views.js';
import { YEARS, LATEST_YEAR, TOP_PROVINCES, DENSITY } from './data.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const yearSelect = document.getElementById('year-select');
let year = LATEST_YEAR;
let sortState = { column: -1, asc: true };

function routeFromHash() {
  const hash = location.hash.replace(/^#\/?/, '');
  const key = hash.split('/')[0] || 'home';
  return VIEWS[key] ? key : 'home';
}

function renderNav(active) {
  nav.innerHTML = NAV.map(([key, label, href]) =>
    `<a href="${href}" class="${key === active ? 'active' : ''}" ${key === active ? 'aria-current="page"' : ''}>${label}</a>`).join('');
}

function render() {
  const key = routeFromHash();
  renderNav(key);
  app.innerHTML = VIEWS[key](year);
  wireTable();
  document.title = `NusaData — ${NAV.find(([k]) => k === key)[1]} | Statistik Nasional Indonesia`;
  window.scrollTo(0, 0);
}

// Mengurutkan tabel: membaca angka Indonesia (titik ribuan, koma desimal)
// dan mengurutkan sebagai angka bila mungkin, sebagai teks bila tidak.
function cellValue(cell) {
  const text = cell.textContent.trim().replace(/\s/g, '');
  const num = Number(text.replace(/\./g, '').replace(',', '.').replace('%', ''));
  return Number.isNaN(num) ? text : num;
}

function sortTable(table, column, asc) {
  const body = table.querySelector('tbody');
  const rows = [...body.querySelectorAll('tr')];
  rows.sort((a, b) => {
    const va = cellValue(a.children[column]);
    const vb = cellValue(b.children[column]);
    if (typeof va === 'number' && typeof vb === 'number') return asc ? va - vb : vb - va;
    return asc ? String(va).localeCompare(String(vb), 'id') : String(vb).localeCompare(String(va), 'id');
  });
  body.replaceChildren(...rows);
  table.querySelectorAll('th').forEach((th) => th.removeAttribute('aria-sort'));
  const th = table.querySelectorAll('th')[column];
  if (th) th.setAttribute('aria-sort', asc ? 'ascending' : 'descending');
}

function showProvinceDetail(name) {
  const panel = document.getElementById('prov-detail');
  if (!panel) return;
  const pop = TOP_PROVINCES.find((p) => p.name === name);
  const den = DENSITY.find((d) => d.name === name);
  const rankPop = pop ? TOP_PROVINCES.findIndex((p) => p.name === name) + 1 : null;
  const rankDen = den ? DENSITY.findIndex((d) => d.name === name) + 1 : null;
  panel.hidden = false;
  panel.innerHTML = `<h2>${name}</h2><p>${pop
    ? `Penduduk 2024: <strong>${pop.pop.toLocaleString('id-ID')} ribu jiwa</strong> — peringkat ${rankPop} nasional, ${pop.share.toLocaleString('id-ID')}% dari penduduk Indonesia.`
    : 'Angka penduduk 2024 provinsi ini tidak ditampilkan karena belum terverifikasi dari BPS.'} Kepadatan 2024: <strong>${den.value.toLocaleString('id-ID')} jiwa/km²</strong> — peringkat ${rankDen} dari 38 provinsi.</p><p class="src">Sumber: BPS, Proyeksi Penduduk Interim 2020–2023 (pertengahan tahun 2024).</p>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function wireTable() {
  const table = document.getElementById('prov-table');
  if (table) {
    table.querySelectorAll('th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const col = Number(th.dataset.sort);
        sortState = { column: col, asc: sortState.column === col ? !sortState.asc : true };
        sortTable(table, col, sortState.asc);
      });
    });
    table.querySelectorAll('tbody tr').forEach((tr) => {
      tr.addEventListener('click', () => showProvinceDetail(tr.dataset.prov));
    });
  }
  const search = document.getElementById('prov-search');
  if (search && table) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      table.querySelectorAll('tbody tr').forEach((tr) => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
}

yearSelect.addEventListener('change', () => {
  const chosen = Number(yearSelect.value);
  if (YEARS.includes(chosen)) {
    year = chosen;
    render();
  }
});

window.addEventListener('hashchange', render);

// Mode tangkapan layar: ?shot=beranda|ekonomi|demografi|ponsel menampilkan
// satu tampilan yang sudah ditentukan, lalu menandai siap untuk difoto.
// Tidak ada keacakan: tampilan yang sama selalu menghasilkan piksel yang sama.
const params = new URLSearchParams(location.search);
const shot = params.get('shot');
if (shot) {
  const map = { beranda: '#/', ekonomi: '#/ekonomi', demografi: '#/demografi', ponsel: '#/' };
  // Gulir agar grafik ikut terlihat dalam tangkapan 720px: sampul
  // menampilkan kartu indikator dan grafik, halaman lain menampilkan
  // kartu grafiknya secara penuh.
  const scrollY = { beranda: 380, ekonomi: 560, demografi: 560, ponsel: 0 }[shot] ?? 0;
  if (map[shot]) location.hash = map[shot];
  render();
  requestAnimationFrame(() => {
    setTimeout(() => {
      window.scrollTo(0, scrollY);
      window.__nusaShotDone = true;
    }, 300);
  });
} else {
  render();
}
