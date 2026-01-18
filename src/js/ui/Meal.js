import { addToFoodLog } from "../foolLog.js";

export default class Meal {
  nutrition ;
  constructor(meal) {
    this.meal = meal;
  }
  renderMeal() {
    this.renderHero();
    this.renderIngredients();
    this.renderInstructions();
    this.renderVid();
    this.renderNutrition();
  }
  renderHero() {
    let html = `
        <div class="relative h-80 md:h-96">
              <img
                src="${this.meal.thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${this.meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${this.meal.area}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${this.meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
        `;
    document.querySelector("#meal-hero-section").innerHTML = html;
  }

  renderIngredients() {
    let ingredients = this.meal.ingredients;
    let ingredientsHTML = "";
    let count = 1;
    ingredients.forEach((ingredient) => {
      ingredientsHTML += `
         <div
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <input
              type="checkbox"
              class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
            />
            <span class="text-gray-700">
              <span class="font-medium text-gray-900">${ingredient.measure} </span>
              ${ingredient.ingredient}
            </span>
          </div>
        `;
    });
    document.querySelector("#ingredients").innerHTML = ingredientsHTML;
  }
  renderInstructions() {
    let instructions = this.meal.instructions;
    let instructionsHTML = "";
    let count = 1;
    instructions.forEach((instruction) => {
      instructionsHTML += `
              <div
                class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div
                  class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                >
                  ${count++}
                </div>
                <p class="text-gray-700 leading-relaxed pt-2">
                  ${instruction} .
                </p>
              </div>
            `;
    });
    document.querySelector("#instructions").innerHTML = instructionsHTML;
  }
  renderVid() {
    const video = document.querySelector("#video");
    if (!this.meal.youtube) return;
    const videoId = this.meal.youtube.split("v=")[1];
    video.src = `https://www.youtube.com/embed/${videoId}`;
  }
  async renderNutrition() {
    this.loadingNutrition();
    let nutritionFacts = await this.loadNutrition();
    this.nutrition = nutritionFacts ;
    let caloriesPerServing = nutritionFacts.data.perServing.calories;
    let html = `
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${nutritionFacts.data.perServing.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${nutritionFacts.data.totals.calories} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${((nutritionFacts.data.perServing.protein *4) / caloriesPerServing)*100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${((nutritionFacts.data.perServing.carbs *4) / caloriesPerServing)*100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${((nutritionFacts.data.perServing.fat *4) / caloriesPerServing)*100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${(nutritionFacts.data.perServing.fiber / caloriesPerServing)*100}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${(nutritionFacts.data.perServing.sugar / caloriesPerServing)*100}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                        </div>
                        <span class="font-bold text-gray-900">${nutritionFacts.data.perServing.saturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full" style="width: ${(nutritionFacts.data.perServing.saturatedFat / caloriesPerServing)*100}%"></div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                     Other
                    </h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${nutritionFacts.data.perServing.cholesterol}mg</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${nutritionFacts.data.perServing.sodium}mg</span>
                      </div>
                    </div>
                  </div>
    `;
    document.querySelector("#nutrition-facts-container").innerHTML=html;
    document.querySelector("#hero-servings").textContent = `${nutritionFacts.data.servings} servings`;
    document.querySelector("#hero-calories").textContent = `${nutritionFacts.data.perServing.calories} cal/serving`;
    document.querySelector("#log-meal-btn").innerHTML= `<i class="fa-solid fa-clipboard-list"></i>  <span>Log This Meal</span>`;

  }
  async loadNutrition() {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "CaJpCsJe6clKVVsT7TfgKQv8FIzbO77fLu4d22sJ",
        },
        body: JSON.stringify({
          title: this.meal.name,
          ingredients: this.formatIngredients(),
        }),
      },
    );

    if (!response.ok) {
      const err = await response.json();
      console.error(err);
    }

    return response.json();
  }
  formatIngredients() {
    let formattedIngredients = this.meal.ingredients.map(
      (ingredient) => `${ingredient.measure} ${ingredient.ingredient}`,
    );
    return formattedIngredients;
  }
showModal() {
  if (!this.nutrition) return;

  const perServing = this.nutrition.data.perServing;

  let html = `
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="log-meal-modal">
    <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
      
      <div class="flex items-center gap-4 mb-6">
        <img src="${this.meal.thumbnail}" class="w-16 h-16 rounded-xl object-cover">
        <div>
          <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
          <p class="text-gray-500 text-sm">${this.meal.name}</p>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Number of Servings
        </label>
        <div class="flex items-center gap-3">
          <button id="decrease-servings" class="w-10 h-10 bg-gray-100 rounded-lg">-</button>
          <input id="meal-servings" type="number" value="1" min="0.5" step="0.5"
            class="w-20 text-center text-xl font-bold border rounded-lg">
          <button id="increase-servings" class="w-10 h-10 bg-gray-100 rounded-lg">+</button>
        </div>
      </div>

      <div class="bg-emerald-50 rounded-xl p-4 mb-6">
        <p class="text-sm text-gray-600 mb-2">Estimated nutrition:</p>
        <div class="grid grid-cols-4 gap-2 text-center">
          <div>
            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${perServing.calories}</p>
            <p class="text-xs">Calories</p>
          </div>
          <div>
            <p class="text-lg font-bold text-blue-600" id="modal-protein">${perServing.protein}g</p>
            <p class="text-xs">Protein</p>
          </div>
          <div>
            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${perServing.carbs}g</p>
            <p class="text-xs">Carbs</p>
          </div>
          <div>
            <p class="text-lg font-bold text-purple-600" id="modal-fat">${perServing.fat}g</p>
            <p class="text-xs">Fat</p>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 rounded-xl">
          Cancel
        </button>
        <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl">
          Log Meal
        </button>
      </div>

    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", html);
  this.handleModalEvents();
}
handleModalEvents() {
  const modal = document.querySelector("#log-meal-modal");

  const servingsInput = modal.querySelector("#meal-servings");
  const increaseBtn = modal.querySelector("#increase-servings");
  const decreaseBtn = modal.querySelector("#decrease-servings");

  const caloriesNumber = modal.querySelector("#modal-calories");
  const proteinNumber = modal.querySelector("#modal-protein");
  const carbsNumber = modal.querySelector("#modal-carbs");
  const fatNumber = modal.querySelector("#modal-fat");

  const perServingStats = this.nutrition.data.perServing;

  const countNutrition = () => {
    const servings = parseFloat(servingsInput.value);

    caloriesNumber.textContent = Math.round(perServingStats.calories * servings);
    proteinNumber.textContent = `${Math.round(perServingStats.protein * servings)}g`;
    carbsNumber.textContent = `${Math.round(perServingStats.carbs * servings)}g`;
    fatNumber.textContent = `${Math.round(perServingStats.fat * servings)}g`;
  };

  increaseBtn.addEventListener("click", () => {
    servingsInput.value = (+servingsInput.value + 0.5).toFixed(1);
    countNutrition();
  });

  decreaseBtn.addEventListener("click", () => {
    servingsInput.value = Math.max(0.5, +servingsInput.value - 0.5).toFixed(1);
    countNutrition();
  });

  servingsInput.addEventListener("input", countNutrition);

  modal.querySelector("#cancel-log-meal").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#confirm-log-meal").addEventListener("click", () => {
    this.logMeal(parseFloat(servingsInput.value));
    modal.remove();
  });
}

logMeal(servings) {
  const perServing = this.nutrition.data.perServing;

  const logData = {
    id: this.meal.id,
    name: this.meal.name,
    thumbnail: this.meal.thumbnail,
    servings,
    calories: perServing.calories * servings,
    protein: perServing.protein * servings,
    carbs: perServing.carbs * servings,
    fat: perServing.fat * servings,
    date: new Date().toISOString().split("T")[0]
  };

  addToFoodLog(logData);
}
loadingNutrition() {
  document.querySelector("#log-meal-btn").innerHTML =
    `<div class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>`;

  document.querySelector("#hero-calories").textContent = `Calculating....`;

  document.querySelector("#nutrition-facts-container").innerHTML = `
    <div class="grid grid-cols-2 gap-4 animate-pulse">
      <div class="h-20 bg-gray-200 rounded"></div>
      <div class="h-20 bg-gray-200 rounded"></div>
      <div class="h-20 bg-gray-200 rounded"></div>
      <div class="h-20 bg-gray-200 rounded"></div>
    </div>
  `;
}

}
