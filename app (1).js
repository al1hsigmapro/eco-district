// ===== ДАННЫЕ =====
const data = {
  "Алматы": [
    "Алмалинский",
    "Бостандыкский",
    "Медеуский",
    "Ауэзовский",
    "Наурызбайский",
    "Турксибский",
    "Жетысуский"
  ],
  "Астана": [
    "Алматы",
    "Есиль",
    "Сарыарка"
  ],
  "Шымкент": [
    "Абайский",
    "Аль-Фарабийский",
    "Енбекшинский"
  ]
};

// ===== ЭЛЕМЕНТЫ =====
const citySelect = document.getElementById("city-select");
const districtSelect = document.getElementById("district-select");
const analyzeBtn = document.getElementById("analyze-btn");

// ===== ЗАПОЛНЕНИЕ ГОРОДОВ =====
Object.keys(data).forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  citySelect.appendChild(option);
});

// ===== ПРИ ВЫБОРЕ ГОРОДА =====
citySelect.addEventListener("change", () => {
  const selectedCity = citySelect.value;

  // очистка районов
  districtSelect.innerHTML = `<option value="">— Ауданды таңдаңыз —</option>`;

  if (selectedCity) {
    districtSelect.disabled = false;

    data[selectedCity].forEach(district => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  } else {
    districtSelect.disabled = true;
  }

  checkEnableButton();
});

// ===== ПРИ ВЫБОРЕ РАЙОНА =====
districtSelect.addEventListener("change", checkEnableButton);

// ===== АКТИВАЦИЯ КНОПКИ =====
function checkEnableButton() {
  if (citySelect.value && districtSelect.value) {
    analyzeBtn.disabled = false;
  } else {
    analyzeBtn.disabled = true;
  }
}

// ===== КНОПКА АНАЛИЗА =====
analyzeBtn.addEventListener("click", () => {
  const city = citySelect.value;
  const district = districtSelect.value;

  // показать панель
  const panel = document.getElementById("result-panel");
  panel.style.display = "block";

  // адрес
  document.getElementById("result-address").textContent =
    `${city}, ${district}`;

  // случайный скор
  const score = Math.floor(Math.random() * 100);

  // обновление UI
  document.getElementById("score-number").textContent = score;

  const ring = document.getElementById("ring-fill");
  const offset = 314 - (314 * score) / 100;
  ring.style.strokeDashoffset = offset;

  const grade = document.getElementById("score-grade");

  if (score >= 70) {
    grade.textContent = "Жақсы";
    grade.className = "score-grade grade-excellent";
  } else if (score >= 40) {
    grade.textContent = "Орташа";
    grade.className = "score-grade grade-average";
  } else {
    grade.textContent = "Нашар";
    grade.className = "score-grade grade-poor";
  }

  // критерии
  updateBar("green", random());
  updateBar("noise", random());
  updateBar("exhaust", random());
  updateBar("factories", random());
  updateBar("waste", random());

  // скролл вниз
  panel.scrollIntoView({ behavior: "smooth" });
});

// ===== БАРЫ =====
function updateBar(name, value) {
  document.getElementById(`val-${name}`).textContent = value;
  document.getElementById(`bar-${name}`).style.width = value + "%";
}

function random() {
  return Math.floor(Math.random() * 100);
}

// ===== КАРТА =====
const map = L.map('map').setView([43.238949, 76.889709], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// маркер Алматы
L.marker([43.238949, 76.889709])
  .addTo(map)
  .bindPopup("Алматы — эко рейтинг демо")
  .openPopup();
