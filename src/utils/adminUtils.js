export function exportToCSV(filename, rows) {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => {
        const val = row[h] ?? '';
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const ALLOWED_EXTENSIONS = ['pdf', 'step', 'stp', 'iges', 'dwg', 'dxf', 'png', 'jpg', 'jpeg', 'zip'];
export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function validateFile(file) {
  if (!file) return { valid: false, error: 'No file provided.' };
  if (file.size > MAX_FILE_SIZE) return { valid: false, error: `File exceeds 25 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).` };
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) return { valid: false, error: `File type .${ext} not allowed. Accepted: ${ALLOWED_EXTENSIONS.join(', ')}` };
  return { valid: true };
}