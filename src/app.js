import { getCities, getCountries, getMethods, getPrayerTimes } from "./api.js";
import { ui } from "./ui.js";


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

    console.log({ city, country, method });

    const res = await getPrayerTimes({ city, country, method });
    console.log("Prayer Times:", res.data.timings);
  } catch (err) {
    console.error("خطأ في جلب أوقات الصلاة:", err);
  }
}

//  events
ui.onContinentChange((val) => {
  if (!val) return;
  loadCountries(val);
});

ui.onCountryChange((val) => {
  if (!val) return;
  loadCities(val);
});

ui.onCityChange((val) => {
  if (!val) return;
  loadMethods();
});
ui.onMethodChange((val) => {
  if (!val) return;
  loadPrayerTimes();
});
