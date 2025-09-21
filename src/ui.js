// DOM-only (no API calls)
const els = {
  continent: document.getElementById("continent"),
  country: document.getElementById("country"),
  city: document.getElementById("city"),
  method: document.getElementById("method"),
  resetBtn: document.querySelector(".reset-btn"),
  prayer: {
    fajr: document.getElementById("time-fajr"),
    dhuhr: document.getElementById("time-dhuhr"),
    asr: document.getElementById("time-asr"),
    maghrib: document.getElementById("time-maghrib"),
    isha: document.getElementById("time-isha"),
  },
  nextPrayer: {
    name: document.getElementById("name-prayer"),
    time: document.getElementById("time-prayer"),
    countdown: document.querySelector("#countdown span"),
  },
};

function setOptions(selectEl, items, placeholder = "اختر...") {
  selectEl.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.selected = true;
  ph.textContent = placeholder;
  selectEl.appendChild(ph);
  items.forEach((val) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    selectEl.appendChild(opt);
  });
}

function setMethods(selectEl, methods, placeholder = "اختر...") {
  selectEl.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.selected = true;
  ph.textContent = placeholder;
  selectEl.appendChild(ph);
  for (const [key, value] of Object.entries(methods)) {
    const opt = document.createElement("option");
    opt.value = value.id;
    opt.textContent = value.name;
    selectEl.appendChild(opt);
  }
}

function setMessage(selectEl, text) {
  selectEl.innerHTML = `<option value="" selected>${text}</option>`;
}

function setDisabled(selectEl, disabled) {
  selectEl.disabled = !disabled;
}

function setTime(fajr, dhuhr, asr, maghrib, isha) {
  els.prayer.fajr.textContent = fajr ?? "--";
  els.prayer.dhuhr.textContent = dhuhr ?? "--";
  els.prayer.asr.textContent = asr ?? "--";
  els.prayer.maghrib.textContent = maghrib ?? "--";
  els.prayer.isha.textContent = isha ?? "--";
}

function setNextPrayer(name, time, countdown) {
  els.nextPrayer.name.textContent = name ?? "—";
  els.nextPrayer.time.textContent = time ?? "—";
  els.nextPrayer.countdown.textContent = countdown ?? "—";
}

// event
function onContinentChange(handler) {
  els.continent.addEventListener("change", (e) => handler(e.target.value));
}
function onCountryChange(handler) {
  els.country.addEventListener("change", (e) => handler(e.target.value));
}
function onCityChange(handler) {
  els.city.addEventListener("change", (e) => handler(e.target.value));
}
function onMethodChange(handler) {
  els.method.addEventListener("change", (e) => handler(e.target.value));
}
function onReset(handler) {
  els.resetBtn.addEventListener("click", handler);
}
function resetAll() {
  els.continent.value = "";
  setOptions(els.country, [], "اختر...");
  setDisabled(els.country, true);
  els.country.className = "";

  setOptions(els.city, [], "اختر...");
  setDisabled(els.city, true);
  els.city.className = "";

  setMethods(els.method, {}, "اختر...");
  els.method.value = "";
  els.method.className = "";

  setTime("-", "-", "-", "-", "-");
  setNextPrayer("—", "—", "—");
}

export const ui = {
  els,
  setOptions,
  setMethods,
  setMessage,
  setDisabled,
  setTime,
  setNextPrayer,
  onContinentChange,
  onCountryChange,
  onCityChange,
  onMethodChange,
  onReset,
  resetAll,
};
