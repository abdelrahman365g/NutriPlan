/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
import {
  filterMeals,
  getCategories,
  getMeal,
  getMeals,
  getProductsBarcode,
  getProductsName,
  getRegionMeals,
  getRegions,
  searchMeals,
} from "./api/mealdb.js";
import { renderFoodLog, todaysDate } from "./foolLog.js";
import { renderScannerProducts, scannerEmptyState } from "./scanner.js";
import {
  renderCategories,
  renderRecipes,
  renderRegions,
} from "./ui/components.js";
import Meal from "./ui/Meal.js";
const navigationButtons = document.querySelectorAll("nav ul a");
const sections = document.querySelectorAll("section");
const mealsSection = [
  "search-filters-section",
  "meal-categories-section",
  "all-recipes-section",
];
const searchInput = document.querySelector("#search-input");
const categoriesGrid = document.querySelector("#categories-grid");
const loadingScreen = document.querySelector("#app-loading-overlay");
const counter = document.querySelector("#recipes-count");
const regionButtonsRow = document.querySelector("#regions");
const recipesGrid = document.querySelector("#recipes-grid");
const mealDetailsSection = document.querySelector("#meal-details");
const backButton = document.querySelector("#back-to-meals-btn");
const logMealButton = document.querySelector("#log-meal-btn");
const logSectionButton = document.querySelector("#log");
const scannerSectionButton = document.querySelector("#scanner");
const quickLogMealBtn = document.querySelector("#quick-log-meal");
const quickScanProductBtn = document.querySelector("#quick-scan-product");
const searchProductInput = document.querySelector("#product-search-input");
const searchProductButton = document.querySelector("#search-product-btn");
const barcodeInput = document.querySelector("#barcode-input");
const barcodeButton = document.querySelector("#lookup-barcode-btn");
let currentMeal ;

async function loadAll() {
  loadingScreen.classList.remove("loading");
  loadRegions();
  loadCategories();
  loadMeals();
  scannerEmptyState();
  loadingScreen.classList.add("loading");
}

loadAll();
async function loadCategories() {
  const categories = await getCategories();
  renderCategories(categories.slice(0, 12));
}
async function loadMeals() {
  const meals = await getMeals();
  renderRecipes(meals);
  counter.textContent = `Showing ${meals.length} recipes`;
}

async function loadRegions() {
  const areas = await getRegions();
  renderRegions(areas.slice(0, 10));
}
async function search(searchTerm) {
  const meals = await searchMeals(searchTerm);
  renderRecipes(meals);
  counter.textContent = `Showing ${meals.length} recipes for ${searchTerm}`;
}
async function loadRegionMeals(region) {
  let meals = await getRegionMeals(region);
  renderRecipes(meals);
  counter.textContent = `Showing ${meals.length} ${region} recipes`;
}
async function showMealDetails(id) {
  let recipe = await getMeal(id);
  if(!recipe) return;
  currentMeal = new Meal(recipe);
  currentMeal.renderMeal();
   mealsSection.forEach((sec) => {
    document.getElementById(sec).classList.add("hidden");
  });
  mealDetailsSection.classList.remove("hidden");
}

function showActive(button) {
  navigationButtons.forEach((btn) => {
    btn.classList.remove("bg-emerald-50", "text-emerald-700", "font-semibold");
    btn.classList.add("text-gray-600");
  });
  button.classList.add("bg-emerald-50", "text-emerald-700", "font-semibold");
  button.classList.remove("text-gray-600");
}

function regionButtonActive(btn) {
  const regionButtons = document.querySelectorAll("#regions button");
  regionButtons.forEach((btn) => {
    btn.classList.remove("bg-emerald-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
  });

  btn.classList.add("bg-emerald-600", "text-white");
  btn.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
}

navigationButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const section = btn.dataset.section;
    history.pushState(null, "", section);
    sections.forEach((sec) => {
      sec.classList.add("hidden");
    });
    if (section == "meals") {
      mealsSection.forEach((sec) => {
        document.getElementById(sec).classList.remove("hidden");
      });
    } else {
      document.getElementById(section).classList.remove("hidden");
    }
    showActive(btn);
  });
});

searchInput.addEventListener("input", (e) => {
  let searchInputValue = searchInput.value.trim();
  if (searchInputValue) search(searchInputValue);
  else loadMeals();
});

categoriesGrid.addEventListener("click", async (e) => {
  const category = e.target.closest(".category");
  if (!category) return;
  const filterationCategory = category.dataset.category;
  const meals = await filterMeals(filterationCategory);
  renderRecipes(meals);
  counter.textContent = `Showing ${meals.length} ${filterationCategory} recipes`;
});

regionButtonsRow.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  let region = button.dataset.region;
  if (region) loadRegionMeals(region);
  else loadMeals();
  regionButtonActive(button);
});
recipesGrid.addEventListener("click", (e) => {
  let card = e.target.closest(".recipe-card");
  if (!card) return;
  let mealId = card.dataset.mealId;
  showMealDetails(mealId);
});
backButton.addEventListener("click", () => {
  mealDetailsSection.classList.add("hidden");
  mealsSection.forEach((sec) => {
    document.getElementById(sec).classList.remove("hidden");
  });
});

logMealButton.addEventListener("click",(e)=>{
  currentMeal.showModal();
})
logSectionButton.addEventListener("click", ()=>{
  renderFoodLog();
  todaysDate();
})
quickLogMealBtn.addEventListener("click", () => {
  sections.forEach((sec) => {
      sec.classList.add("hidden");
    });
    document.getElementById("meals").click();
});

quickScanProductBtn.addEventListener("click", () => {
  sections.forEach((sec) => {
      sec.classList.add("hidden");
    });
    document.getElementById("scanner").click();
});

searchProductButton.addEventListener("click", async()=>{
  const products = await getProductsName(searchProductInput.value.trim());
  renderScannerProducts(products);
})
barcodeButton.addEventListener("click",async()=>{
  const products = await getProductsBarcode(barcodeInput.value.trim());
  renderScannerProducts([products]);
})