import { addToFoodLog } from "./foolLog.js";
import { getProductsBarcode } from "./api/mealdb.js";
const resultsContainer = document.querySelector("#products-grid");

export async function renderScannerProducts(products) {
  if (!products || products.length === 0) {
    scannerEmptyState();
    return;
  }

  let html = "";

  products.forEach((p) => {
    html += `
      <div
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${p.barcode}"
      >
        <div
          class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
        >
          <img
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
          />

          <div
            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >
            ${p.nutritionGrade ? `Nutri-Score ${p.nutritionGrade}` : ""}
          </div>

          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            title="NOVA ${p.novaGroup}"
          >
            ${p.novaGroup || "?"}
          </div>
        </div>

        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
            ${p.brand || "Unknown Brand"}
          </p>

          <h3
            class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          >
            ${p.name}
          </h3>

          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-fire mr-1"></i>${p.nutrients.calories } cal</span>
          </div>

          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${p.nutrients.protein || "0"}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${p.nutrients.carbs || "0"}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${p.nutrients.fat || "0"}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${p.nutrients.sugar || "0"}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>

          <button
            class="log-food-btn mt-3 w-full bg-emerald-600 text-white px-4 py-2 rounded-xl"
            data-barcode="${p.barcode}"
          >
          <i class ="fa-solid fa-plus text-white "></i>

             Log This Food
          </button>
        </div>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;
  handleLogButtons();
}


export function scannerEmptyState() {
  resultsContainer.innerHTML = `
    <div id="products-empty" class="py-12">
      <div class="text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fa-solid fa-box-open text-gray-400 text-3xl"></i>
        </div>
        <p class="text-gray-500 text-lg mb-2">No products to display</p>
        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
      </div>
    </div>
  `;
}

function handleLogButtons(){
    const logButtons = document.querySelectorAll(".log-food-btn");
    logButtons.forEach((btn)=>{
        btn.addEventListener("click",async ()=>{
            const barcode = btn.dataset.barcode;
            const product = await getProductsBarcode(barcode);
            logFood(product);
        })
    })

}
function logFood(product, servings = 1) {
  if (!product || !product.nutrients) return;

  const logData = {
    id: product.barcode,
    name: product.name,
    thumbnail: product.image,
    servings,
    calories: product.nutrients.calories * servings,
    protein: product.nutrients.protein * servings,
    carbs: product.nutrients.carbs * servings,
    fat: product.nutrients.fat * servings,
    date: new Date().toISOString().split("T")[0],
  };

  addToFoodLog(logData);
}