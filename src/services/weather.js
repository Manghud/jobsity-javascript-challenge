const serviceURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const queryWithKey = `${serviceURL}?appid=${apiKey}&`;

export const getWeatherForecastForCity = async city => {
  const url = `${queryWithKey}q=${city}`;
  const response = await fetch(new Request(url), {
    method: 'GET'
  });
  return {
    ok: response.ok,
    data: await response.json()
  };
};
