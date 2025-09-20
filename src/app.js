import { getCities, getCountries, getMethods, getPrayerTimes } from "./api.js";
import { ui } from "./ui.js";
import Storage from "./storage.js";
const storage = new Storage();

function saveSelection(type, value) {
  const data = storage.load() || {};
  data[type] = value;
  storage.save(data);
}

async function loadCountries(continent) {
  try {
    ui.setDisabled(ui.els.country, true);
    ui.setMessage(ui.els.country, "جارِ التحميل...");
    ui.setMessage(ui.els.city, "—");

    const countries = await getCountries(continent);
    const names = countries.map((c) => c.name.common);

    ui.setOptions(ui.els.country, names, "اختر...");
  } catch (err) {
    console.error("خطأ في جلب الدول:", err);
    ui.setMessage(ui.els.country, "تعذّر تحميل الدول");
    ui.setDisabled(ui.els.country, true);
  }
}

async function loadCities(country) {
  try {
    ui.setDisabled(ui.els.city, true);
    ui.setMessage(ui.els.city, "جارِ التحميل...");

    const res = await getCities(country);
    const cities = res?.data ?? [];

    ui.setOptions(ui.els.city, cities, "اختر...");
  } catch (err) {
    console.error("خطأ في جلب المدن:", err);
    ui.setMessage(ui.els.city, "تعذّر تحميل المدن");
    ui.setDisabled(ui.els.city, true);
  }
}
async function loadMethods() {
  try {
    ui.setMessage(ui.els.method, "جارِ التحميل...");

    const res = await getMethods();
    const methods = res?.data ?? [];

    ui.setMethods(ui.els.method, methods, "اختر...");
  } catch (err) {
    console.error("خطأ في جلب طريقة الحساب:", err);
  }
}

async function loadPrayerTimes() {
  try {
    const city = ui.els.city.value;
    const country = ui.els.country.value;
    const method = ui.els.method.value;

    const res = await getPrayerTimes({ city, country, method });
    const times = res?.data?.timings;
    if (!times) throw new Error("No prayer times found");

    ui.setTime(times.Fajr, times.Dhuhr, times.Asr, times.Maghrib, times.Isha);

    console.log("Prayer Times:", res.data.timings);
  } catch (err) {
    console.error("خطأ في جلب أوقات الصلاة:", err);
  }
}

//  events
ui.onContinentChange((val) => {
  if (!val) return;
  saveSelection("continent", val);
  loadCountries(val);
});

ui.onCountryChange((val) => {
  if (!val) return;
  saveSelection("country", val);
  loadCities(val);
});

ui.onCityChange((val) => {
  if (!val) return;
  saveSelection("city", val);
  loadMethods();
});

ui.onMethodChange((val) => {
  if (!val) return;
  saveSelection("method", val);
  loadPrayerTimes();
});
ui.onReset(() => {
  storage.clear();
  ui.resetAll();
});
window.addEventListener("DOMContentLoaded", async () => {
  const data = storage.load();
  if (!data) return;

  if (data.continent) {
    ui.els.continent.value = data.continent;
    await loadCountries(data.continent);
  }

  if (data.country) {
    ui.els.country.value = data.country;
    await loadCities(data.country);
  }

  if (data.city) {
    ui.els.city.value = data.city;
    await loadMethods();
  }

  if (data.method) {
    ui.els.method.value = data.method;
    await loadPrayerTimes();
  }
});
