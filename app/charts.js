// Pembuat grafik SVG murni — tanpa pustaka, tanpa jaringan.
// Setiap fungsi menerima data dan mengembalikan string SVG yang deterministik:
// masukan yang sama selalu menghasilkan markup yang sama.
const NAVY = '#0f2e46';
const TEAL = '#0e7c7b';
const AMBER = '#e8a33d';
const LIGHT = '#dce8ec';
const INK = '#1a2a33';
const MUTED = '#5b6b76';

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function fmtId(value) {
  return `g${value}`;
}

// Grafik batang vertikal dengan label nilai di atas batang.
export function barChart({ years, values, unit, highlightLast = true, height = 220, width = 560 }) {
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const padL = 44;
  const padB = 28;
  const padT = 26;
  const plotW = width - padL - 8;
  const plotH = height - padT - padB;
  const range = max - min || 1;
  const slot = plotW / values.length;
  const barW = Math.min(46, slot * 0.58);
  const yFor = (v) => padT + ((max - v) / range) * plotH;
  const zeroY = yFor(0);
  let bars = '';
  let labels = '';
  values.forEach((v, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const y = v >= 0 ? yFor(v) : zeroY;
    const h = Math.max(1, Math.abs(yFor(v) - zeroY));
    const last = highlightLast && i === values.length - 1;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${last ? AMBER : TEAL}"/>`;
    labels += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(v)}</text>`;
    labels += `<text x="${(x + barW / 2).toFixed(1)}" y="${(height - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="${MUTED}">${years[i]}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const v = max - f * range;
    const y = yFor(v);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - 8}" y2="${y.toFixed(1)}" stroke="${LIGHT}" stroke-width="1"/><text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(v.toFixed(1))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang ${esc(unit)}" xmlns="http://www.w3.org/2000/svg">${grid}<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - 8}" y2="${zeroY.toFixed(1)}" stroke="${NAVY}" stroke-width="1.5"/>${bars}${labels}</svg>`;
}

// Grafik garis dengan titik dan label nilai.
export function lineChart({ years, values, unit, height = 220, width = 560 }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const padL = 48;
  const padB = 28;
  const padT = 26;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const range = max - min || 1;
  const xFor = (i) => padL + (i / (values.length - 1)) * plotW;
  const yFor = (v) => padT + ((max - v) / range) * plotH;
  const points = values.map((v, i) => `${xFor(i).toFixed(1)},${yFor(v).toFixed(1)}`).join(' ');
  const grid = [0, 0.5, 1].map((f) => {
    const v = max - f * range;
    const y = yFor(v);
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - 12}" y2="${y.toFixed(1)}" stroke="${LIGHT}" stroke-width="1"/><text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(v.toFixed(1))}</text>`;
  }).join('');
  const dots = values.map((v, i) => {
    const last = i === values.length - 1;
    const lx = Math.min(Math.max(xFor(i), 26), width - 26);
    const yx = Math.min(Math.max(xFor(i), 20), width - 20);
    return `<circle cx="${xFor(i).toFixed(1)}" cy="${yFor(v).toFixed(1)}" r="${last ? 6 : 4}" fill="${last ? AMBER : TEAL}" stroke="#fff" stroke-width="2"/><text x="${lx.toFixed(1)}" y="${(yFor(v) - 11).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(v)}</text><text x="${yx.toFixed(1)}" y="${(height - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="${MUTED}">${years[i]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik garis ${esc(unit)}" xmlns="http://www.w3.org/2000/svg">${grid}<polyline points="${points}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Grafik batang horizontal untuk perbandingan antarkelompok.
export function hbarChart({ rows, unit, height = 260, width = 560, maxBars = 12 }) {
  const shown = rows.slice(0, maxBars);
  const max = Math.max(...shown.map((r) => r.value));
  const padL = 150;
  const rowH = Math.max(24, (height - 16) / shown.length);
  const barH = Math.min(18, rowH * 0.62);
  let out = '';
  shown.forEach((r, i) => {
    const y = 8 + i * rowH;
    const w = Math.max(2, ((r.value / max) * (width - padL - 56)));
    const last = i === 0;
    out += `<text x="${padL - 8}" y="${(y + barH / 2 + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.label)}</text>`;
    out += `<rect x="${padL}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${barH}" rx="3" fill="${last ? AMBER : TEAL}"/>`;
    out += `<text x="${(padL + w + 6).toFixed(1)}" y="${(y + barH / 2 + 4).toFixed(1)}" font-size="12" font-weight="700" fill="${INK}">${esc(r.valueText ?? r.value)}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang ${esc(unit)}" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
}

// Bilah pangsa (100% stacked) untuk persebaran menurut kelompok.
export function shareBars(rows) {
  return rows.map((r) => {
    const pct = r.share.toFixed(2).replace('.', ',');
    return `<div class="share-row"><div class="share-label"><span>${esc(r.name)}</span><strong>${esc(r.people.toFixed(2).replace('.', ','))} jt · ${pct}%</strong></div><div class="share-track"><div class="share-fill" style="width:${r.share.toFixed(1)}%"></div></div></div>`;
  }).join('');
}

export { esc, fmtId };
