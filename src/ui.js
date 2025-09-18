// DOM-only (no API calls)
const els = {
  continent: document.getElementById("continent"),
  country: document.getElementById("country"),
  city: document.getElementById("city"),
  method: document.getElementById("method"),
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

export const ui = {
  els,
  setOptions,
  setMethods,
  setMessage,
  setDisabled,
  onContinentChange,
  onCountryChange,
  onCityChange,
  onMethodChange,
};
