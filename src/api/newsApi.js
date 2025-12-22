/**
 * News/Blog API client
 * - Uses Vite env var `VITE_API_BASE_URL` (set this in your .env file)
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

/**
 * Get full image URL from image path
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE}${imagePath}`;
}

/**
 * Fetch news detail by ID
 * Returns: { title, category, content, image, image_url, blocks, ... }
 */
export async function fetchNewsDetail(id) {
  const url = `${API_BASE}/api/blogs/${id}`;

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

/**
 * Fetch all news/blogs with pagination
 * Returns: { data: array, current_page, last_page, per_page, total, ... }
 */
export async function fetchAllNews(page = 1) {
  const url = `${API_BASE}/api/blogs?page=${page}`;

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

export default { getImageUrl, fetchNewsDetail, fetchAllNews };

/* Usage example:
import { fetchNewsDetail, fetchAllNews } from '../api/newsApi';
const detail = await fetchNewsDetail(1);
const allNews = await fetchAllNews();
*/
