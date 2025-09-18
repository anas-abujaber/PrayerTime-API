export const REGIONS = [
  { value: "africa", label: "أفريقيا" },
  { value: "americas", label: "الأمريكيتان" }, // (الشمالية والجنوبية)
  { value: "asia", label: "آسيا" },
  { value: "europe", label: "أوروبا" },
  { value: "oceania", label: "أوقيانوسيا" },
];

export const MAIN_PRAYERS = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];

export const ENDPOINTS = {
  countries: "https://restcountries.com/v3.1/region/",

  cities: "https://countriesnow.space/api/v0.1/countries/cities",

  methods: "https://api.aladhan.com/v1/methods",

  prayerTimes: "https://api.aladhan.com/v1/timingsByCity",
};
