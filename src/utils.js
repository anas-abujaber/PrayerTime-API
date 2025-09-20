import { PRAYER_MAPPING, PRAYER_ORDER } from "./config.js";

export async function fetchFromApi(url, options = {}) {
  const config = {
    ...options,
  };

  if (config.body && config.method !== "GET") {
    config.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Body: ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error Fetching from API :", error);
    throw error;
  }
}

export function getFormattedDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getCurrentTimeInMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
}

export function formatCountdown(totalMinutes) {
  if (totalMinutes <= 0) return "00:00:00";

  const h = Math.floor(totalMinutes / 60);
  const m = Math.floor(totalMinutes % 60);
  const s = Math.round((totalMinutes % 1) * 60);

  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function getNextPrayer(prayerTimes) {
  const currentTime = getCurrentTimeInMinutes();

  const prayers = PRAYER_ORDER.map((prayer) => ({
    name: prayer,
    arabicName: PRAYER_MAPPING[prayer],
    time: prayerTimes[prayer],
    minutes: timeToMinutes(prayerTimes[prayer]),
  }));

  for (const prayer of prayers) {
    if (prayer.minutes > currentTime) {
      return {
        name: prayer.arabicName,
        time: prayer.time,
        minutes: prayer.minutes,
        isToday: true,
      };
    }
  }

  const firstPrayer = prayers[0];
  return {
    name: firstPrayer.arabicName,
    time: firstPrayer.time,
    minutes: firstPrayer.minutes + 24 * 60,
    isToday: false,
  };
}
