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
