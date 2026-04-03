// ===== ДАННЫЕ =====
const data = {
  "Алматы": ["Алмалинский","Бостандыкский","Медеуский"],
  "Астана": ["Алматы","Есиль","Сарыарка"],
  "Шымкент": ["Абайский","Аль-Фарабийский"]
};

// ===== ЭЛЕМЕНТЫ =====
const citySelect = document.getElementById("city-select");
const districtSelect = document.getElementById("district-select");
const analyzeBtn = document.getElementById("analyze-btn");

// ===== ГОРОДА =====
Object.keys(data).forEach(city => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  citySelect.appendChild(option);
});

// ===== ВЫБОР ГОРОДА =====
citySelect.addEventListener("change", () => {
  districtSelect.innerHTML = `<option value="">Ауданды таңда</option>`;

  if (citySelect.value) {
    districtSelect.disabled = false;

    data[citySelect.value].forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      districtSelect.appendChild(opt);
    });
  } else {
    districtSelect.disabled = true;
  }

  check();
});

// ===== ВЫБОР РАЙОНА =====
districtSelect.addEventListener("change", check);

function check() {
  analyzeBtn.disabled = !(citySelect.value && districtSelect.value);
}

// ===== АНАЛИЗ =====
analyzeBtn.addEventListener("click", () => {
  document.getElementById("result-panel").style.display = "block";
  document.getElementById("result-address").textContent =
    citySelect.value + ", " + districtSelect.value;

  const score = Math.floor(Math.random()*100);
  document.getElementById("score-number").textContent = score;
});

// ===== КАРТА =====
const map = L.map('map').setView([48, 66], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const cities = [
  {name:"Алматы", coords:[43.23,76.88], score:65},
  {name:"Астана", coords:[51.16,71.43], score:55},
  {name:"Шымкент", coords:[42.34,69.59], score:45}
];

function getColor(s){
  if(s>=70) return "green";
  if(s>=40) return "orange";
  return "red";
}

cities.forEach(c=>{
  const marker = L.circleMarker(c.coords,{
    radius:10,
    color:getColor(c.score),
    fillColor:getColor(c.score),
    fillOpacity:0.8
  }).addTo(map);

  marker.bindPopup(`${c.name}: ${c.score}`);
});
