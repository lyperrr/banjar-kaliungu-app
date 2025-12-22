/**
 * Penduduk API client
 * - Uses Vite env var `VITE_API_BASE_URL` (set this in your .env file)
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

/**
 * Fetch population statistics from backend
 * Returns: { jumlah_penduduk, jumlah_laki, jumlah_perempuan }
 */
export async function fetchStatistik() {
  const url = `${API_BASE}/api/penduduk/statistik`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch error ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (!json.success) throw new Error("API returned success=false");

  return json.data;
}

export default { fetchStatistik };

/* Usage example:
import { fetchStatistik } from '../api/pendudukApi';
const data = await fetchStatistik();
console.log(data.jumlah_penduduk);
*/
