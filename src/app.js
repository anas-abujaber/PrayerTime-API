import { getCities, getCountries, getMethods, getPrayerTimes } from "./api.js";
import { ui } from "./ui.js";
import Storage from "./storage.js";

const storage = new Storage();
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
  loadCountries(val);
  storage.save({
    continent: val,
    country: "",
    city: "",
    method: ""
  });
});

ui.onCountryChange((val) => {
  if (!val) return;
  loadCities(val);
  const saved = storage.load() || {};
  storage.save({
    ...saved,
    country: val,
    city: "",
    method: ""
  });
});

ui.onCityChange((val) => {
  if (!val) return;
  loadMethods();
   const saved = storage.load() || {};
  storage.save({
    ...saved,
    city: val
  });
});
ui.onMethodChange((val) => {
  if (!val) return;
  loadPrayerTimes();
   const saved = storage.load() || {};
  storage.save({
    ...saved,
    method: val
  });
});
async function restoreSelections() {
  const saved = storage.load();
  if (!saved) return;

  if (saved.continent) {
    ui.els.continent.value = saved.continent;
    await loadCountries(saved.continent);
    if (saved.country) {
      ui.els.country.value = saved.country;
      await loadCities(saved.country);
      if (saved.city) {
        ui.els.city.value = saved.city;
        await loadMethods();
        if (saved.method) {
          ui.els.method.value = saved.method;
          loadPrayerTimes();
        }
      }
    }
  }
}
restoreSelections();
