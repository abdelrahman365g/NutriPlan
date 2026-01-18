export async function getCategories() {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/categories`,
  );
  const data = await response.json();
  return data.results;
}

export async function getMeals() {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`,
  );
  const data = await response.json();
  return data.results;
}
export async function searchMeals(term) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${term}&page=1&limit=25`,
  );
  const data = await response.json();
  return data.results;
}
export async function filterMeals(category) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`,
  );
  const data = await response.json();
  return data.results;
}
export async function getRegions() {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/areas`,
  );
  const data = await response.json();
  return data.results;
}
export async function getRegionMeals(term) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?area=${term}&page=1&limit=25
`,
  );
  const data = await response.json();
  return data.results;
}
export async function getMeal(id) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/${id}`,
  );
  const data = await response.json();
  return data.result;
}
export async function getProductsName(name) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${name}&page=1&limit=24`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.results ;
}
export async function getProductsBarcode(barcode) {
  const response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product by barcode");
  }

  const data = await response.json();
  return data.result ;
}

