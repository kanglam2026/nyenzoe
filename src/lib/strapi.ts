// src/lib/strapi.ts
const STRAPI_URL = "http://localhost:1337"; // change later for Render deploy

// ✅ Generic fetch wrapper
async function fetchFromStrapi(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${endpoint} → ${res.status}`);
  }
  return res.json();
}

// ✅ Fetch apps
export async function getApps() {
  const data = await fetchFromStrapi("apps?populate=*");
  console.log("🔍 Strapi response:", JSON.stringify(data, null, 2)); // Debug log

  if (!data.data) return [];

  return data.data.map((app: any) => {
    if (!app || !app.attributes) {
      return { id: null, title: "Missing Data" };
    }

    const attr = app.attributes;
    return {
      id: app.id ?? null,
      title: attr.title ?? "Untitled",
      author: attr.author ?? "Unknown",
      icon: attr.icon?.data?.attributes?.url
        ? `${STRAPI_URL}${attr.icon.data.attributes.url}`
        : "/icons/default.png",
      rating: attr.rating ?? 0,
      downloads: attr.downloads ?? "0",
      category: attr.category ?? "General",
      price: attr.price ?? "Free",
      description: attr.description ?? "",
    };
  });
}

// ✅ Fetch categories
export async function getCategories() {
  const data = await fetchFromStrapi("categories?populate=*");
  if (!data.data) return [];

  return data.data.map((cat: any) => {
    const attr = cat.attributes || {};
    return {
      id: cat.id ?? null,
      name: attr.name ?? "Unnamed",
      icon: attr.icon?.data?.attributes?.url
        ? `${STRAPI_URL}${attr.icon.data.attributes.url}`
        : "/icons/default.png",
      color: attr.color ?? "#ccc",
    };
  });
}
