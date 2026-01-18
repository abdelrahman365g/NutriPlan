export function getFoodLog() {
  return JSON.parse(localStorage.getItem("foodLog")) || [];
}

export function saveFoodLog(log) {
  localStorage.setItem("foodLog", JSON.stringify(log));
}

export function addToFoodLog(entry) {
  const log = getFoodLog();
  log.push(entry);
  console.log(entry);
  saveFoodLog(log);
  Swal.fire({
  icon: "success",
  title: "Logged!",
  text: `${entry.name} added.`,
  timer: 1500,
  showConfirmButton: false,
  backdrop: true
});

}

export function clearFoodLog() {
  localStorage.removeItem("foodLog");
  renderFoodLog();
}

export function renderFoodLog() {
  const log = getFoodLog();

  if (log.length < 1) {
    showEmptyState();
    return;
  }

  const totals = calculateTotals(log);
  updateProgressCards(totals);
  renderLogItems(log);
  renderWeeklyOverview();
}
export function todaysDate() {
  const dateElement = document.querySelector("#foodlog-date");

  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = now.toLocaleDateString("en-US", { month: "short" });
  const dayNumber = now.getDate();

  dateElement.textContent = `${dayName}, ${monthName} ${dayNumber}`;
}

function calculateTotals(log) {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  log.forEach((item) => {
    totals.calories += item.calories;
    totals.protein += item.protein;
    totals.carbs += item.carbs;
    totals.fat += item.fat;
  });

  return totals;
}


function updateProgressCards(totals) {
  const goals = { calories: 2000, protein: 50, carbs: 250, fat: 65 };

  setProgress("calories", totals.calories, goals.calories);
  setProgress("protein", totals.protein, goals.protein);
  setProgress("carbs", totals.carbs, goals.carbs);
  setProgress("fat", totals.fat, goals.fat);
}

function setProgress(item, value, goal) {
  const percent = Math.min(100, Math.round((value / goal) * 100));

  document.querySelector(`#${item}-progress`).style.width = `${percent}%`;
  document.querySelector(`#${item}-percent`).textContent = `${percent}%`;
  document.querySelector(`#${item}-value`).textContent = `${value}`;
  document.querySelector(`#${item}-goal`).textContent = `${goal}`;
}

function renderLogItems(log) {
  const list = document.querySelector("#logged-items-list");
  document.querySelector("#foodlog-items-count").textContent = log.length;
  let html = "";

  log.forEach((item, index) => {
    html += `
      <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
        <div class="flex items-center gap-4">
          <img src="${item.thumbnail}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover">
          <div>
            <p class="font-semibold text-gray-900">${item.name}</p>
            <p class="text-sm text-gray-500">
              ${item.servings} serving
              <span class="mx-1">•</span>
              <span class="text-emerald-600">Recipe</span>
            </p>
            <p class="text-xs text-gray-400 mt-1">${item.time || ""}</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-lg font-bold text-emerald-600">${item.calories}</p>
            <p class="text-xs text-gray-500">kcal</p>
          </div>

          <div class="hidden md:flex gap-2 text-xs text-gray-500">
            <span class="px-2 py-1 bg-blue-50 rounded">${item.protein}g P</span>
            <span class="px-2 py-1 bg-amber-50 rounded">${item.carbs}g C</span>
            <span class="px-2 py-1 bg-purple-50 rounded">${item.fat}g F</span>
          </div>

          <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"
                  data-index="${index}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  });

  list.innerHTML = html;
  document.querySelectorAll(".remove-foodlog-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      log.splice(index, 1);
      saveFoodLog(log);
      renderFoodLog();
    });
  });
}

function showEmptyState() {
  renderWeeklyOverview();
  const list = document.querySelector("#logged-items-list");
  setProgress("calories", 0, 2000);
  setProgress("protein", 0, 50);
  setProgress("carbs", 0, 250);
  setProgress("fat", 0, 65);
  document.querySelector("#foodlog-items-count").textContent = 0;
  list.innerHTML = `
    <div id="empty-state" class="text-center py-8 text-gray-500">
      <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
      <p class="font-medium">No meals logged today</p>
      <p class="text-sm">
        Add meals from the Meals page or scan products
      </p>
    </div>
  `;
}

export function renderWeeklyOverview() {
  const log = getFoodLog();
  const weeklyData = calculateWeeklyData(log);

  const weekContainer = document.querySelector("#weekly-overview-grid");
  const todayIndex = new Date().getDay();

  const weekDays = ["Sun" ,"Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let html = "";

  weekDays.forEach((day) => {
    const data = weeklyData[day] || { calories: 0, items: 0, date: "" };

    const isToday = weekDays[todayIndex] === day;
    const cardClass = isToday ? "bg-indigo-100 rounded-xl" : "";

    const caloriesClass = isToday ? "text-emerald-600" : "text-gray-300";

    html += `
      <div class="text-center ${cardClass}">
        <p class="text-xs text-gray-500 mb-1">${day}</p>
        <p class="text-sm font-medium text-gray-900">${data.date || ""}</p>
        <div class="mt-2 ${caloriesClass}">
          <p class="text-lg font-bold">${data.calories}</p>
          <p class="text-xs">kcal</p>
        </div>
        ${data.items > 0 ? `<p class="text-xs text-gray-400 mt-1">${data.items} items</p>` : ""}
      </div>
    `;
  });

  weekContainer.innerHTML = html;
}


function calculateWeeklyData(log) {
  const week = {
    Mon: { calories: 0, items: 0, date: "" },
    Tue: { calories: 0, items: 0, date: "" },
    Wed: { calories: 0, items: 0, date: "" },
    Thu: { calories: 0, items: 0, date: "" },
    Fri: { calories: 0, items: 0, date: "" },
    Sat: { calories: 0, items: 0, date: "" },
    Sun: { calories: 0, items: 0, date: "" },
  };

  log.forEach((item) => {
    const date = new Date(item.date);
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];

    week[dayName].calories += item.calories || 0;
    week[dayName].items += 1;
    week[dayName].date = item.date;
  });

  return week;
}

