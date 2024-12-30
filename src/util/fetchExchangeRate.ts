export const fetchExchangeRate = async (from: string, to: string) => {
  const url = `/api/v2/calc/fx`;
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({ ccy1: from, ccy2: to });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
