const categoryStyles = {
  Beef: {
    card: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-400",
    icon: "bg-gradient-to-br from-red-400 to-rose-500",
    iconClass: "fa-solid fa-drumstick-bite",
  },
  Chicken: {
    card: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
    icon: "bg-gradient-to-br from-amber-400 to-orange-500",
    iconClass: "fa-solid fa-drumstick-bite",
  },
  Dessert: {
    card: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
    icon: "bg-gradient-to-br from-pink-400 to-rose-500",
    iconClass: "fa-solid fa-cake-candles",
  },
  Lamb: {
    card: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    icon: "bg-gradient-to-br from-orange-400 to-amber-500",
    iconClass: "fa-solid fa-drumstick-bite",
  },
  Miscellaneous: {
    card: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
    icon: "bg-gradient-to-br from-slate-400 to-gray-500",
    iconClass: "fa-solid fa-bowl-rice",
  },
  Pasta: {
    card: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
    icon: "bg-gradient-to-br from-yellow-400 to-amber-500",
    iconClass: "fa-solid fa-bowl-food",
  },
  Pork: {
    card: "bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    icon: "bg-gradient-to-br from-rose-400 to-red-500",
    iconClass: "fa-solid fa-bacon",
  },
  Seafood: {
    card: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
    icon: "bg-gradient-to-br from-cyan-400 to-blue-500",
    iconClass: "fa-solid fa-fish",
  },
  Side: {
    card: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
    icon: "bg-gradient-to-br from-green-400 to-emerald-500",
    iconClass: "fa-solid fa-plate-wheat",
  },
  Starter: {
    card: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
    icon: "bg-gradient-to-br from-teal-400 to-cyan-500",
    iconClass: "fa-solid fa-utensils",
  },
  Vegan: {
    card: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    icon: "bg-gradient-to-br from-emerald-400 to-green-500",
    iconClass: "fa-solid fa-leaf",
  },
  Vegetarian: {
    card: "bg-gradient-to-br from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
    icon: "bg-gradient-to-br from-lime-400 to-green-500",
    iconClass: "fa-solid fa-seedling",
  },
};

// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/

function categoryCard(category) {
  const style = categoryStyles[category.name];

  return `
    <div
      class="category category-card ${style.card} rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
      data-category="${category.name}"
    >
      <div class="flex items-center gap-2.5">
        <div class="text-white w-9 h-9 ${style.icon} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
          <i class="${style.iconClass}"></i>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
        </div>
      </div>
    </div>
  `;
}

export function renderCategories(categories) {
  let categoriesCards = "";
  categories.forEach((category) => {
    categoriesCards += categoryCard(category);
  });
  const categoriesGrid = document.querySelector("#categories-grid");
  categoriesGrid.innerHTML = categoriesCards;
}

function mealCard(meal) {
  let card = `
    <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meal.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
    `;
  return card;
}

export function renderRecipes(recipes) {
  let recipesCards = "";
  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      recipesCards += mealCard(recipe);
    });
  } else recipesCards = emptyState();
  const recipesGrid = document.querySelector("#recipes-grid");
  recipesGrid.innerHTML = recipesCards;
}

function regionTag(region) {
  let tag = `
    <button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-region="${region.name}"
            >
              ${region.name}
            </button>
    `;
  return tag;
}
export function renderRegions(regions) {
  let regionTags = "";
  if (regions) {
    regions.forEach((reg) => {
      regionTags += regionTag(reg);
    });
  }
  document.querySelector("#regions").innerHTML += regionTags;
}
function emptyState() {
  const html = `
    <div class="flex flex-col items-center justify-center py-12 text-center col-span-4">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
    </div>
    `;
  return html ;
}
