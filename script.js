const today = new Date().toISOString().split("T")[0];

// ---- Mood Logic ----
const moodButtons = document.querySelectorAll(".mood");
const moodStatus = document.getElementById("mood-status");

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    saveMood(mood);
    moodStatus.textContent = `Mood saved: ${mood}`;
    generateInsight();
  });
});

function saveMood(mood) {
  const moods = JSON.parse(localStorage.getItem("moods")) || {};
  moods[today] = mood;
  localStorage.setItem("moods", JSON.stringify(moods));
}

// ---- Habit Logic ----
const habits = ["water", "exercise", "sleep", "study"];
const habitStatus = document.getElementById("habit-status");

habits.forEach(habit => {
  const checkbox = document.getElementById(habit);
  checkbox.addEventListener("change", saveHabits);
});

function saveHabits() {
  const data = JSON.parse(localStorage.getItem("habits")) || {};
  data[today] = {};

  habits.forEach(habit => {
    data[today][habit] = document.getElementById(habit).checked;
  });

  localStorage.setItem("habits", JSON.stringify(data));
  habitStatus.textContent = "Habits updated ✔️";
  generateInsight();
}

// ---- Load Saved Data ----
function loadData() {
  const moods = JSON.parse(localStorage.getItem("moods")) || {};
  const habitsData = JSON.parse(localStorage.getItem("habits")) || {};

  if (moods[today]) {
    moodStatus.textContent = `Today's mood: ${moods[today]}`;
  }

  if (habitsData[today]) {
    habits.forEach(habit => {
      document.getElementById(habit).checked = habitsData[today][habit];
    });
  }

  generateInsight();
}

// ---- Insight Logic ----
function generateInsight() {
  const moods = JSON.parse(localStorage.getItem("moods")) || {};
  const habitsData = JSON.parse(localStorage.getItem("habits")) || {};
  const insightText = document.getElementById("insight-text");

  const todayMood = moods[today];
  const todayHabits = habitsData[today];

  if (!todayMood || !todayHabits) {
    insightText.textContent = "Log today's mood and habits for insights 🌟";
    return;
  }

  if (todayMood === "Happy" && todayHabits.exercise) {
    insightText.textContent = "You feel happier on days you exercise 🏃💛";
  } else if (todayMood === "Stressed" && !todayHabits.sleep) {
    insightText.textContent = "Poor sleep may be increasing stress 😴⚠️";
  } else {
    insightText.textContent = "Keep tracking! Patterns will appear soon 📊";
  }
}

loadData();
