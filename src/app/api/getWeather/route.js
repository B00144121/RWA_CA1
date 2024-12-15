export async function GET(req, res) {
  console.log("Fetching weather data...");

  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=10dafa65cbeb4287a4491953242410&q=Dublin&aqi=no"
    );
    const data = await response.json();

    console.log("Weather data fetched:", data.current.temp_c);

    return Response.json({ temp: data.current.temp_c });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return Response.json(
      { error: "Failed to fetch weather data." },
      { status: 500 }
    );
  }
}
