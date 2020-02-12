import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';

export const filterForecastForCity = ({ dates, forecastData }) => {
  const city = forecastData.city && forecastData.city.name.toLowerCase();
  if (!city) {
    return {};
  }
  const forecastList = forecastData.list || [];
  const forecastByDate = {};
  forecastList.forEach(forecast => {
    if (!forecast.weather || !forecast.weather.length) {
      return;
    }
    const forecastDate = new Date(forecast.dt * 1000);
    const date = getDate(forecastDate);
    if (!dates.some(reminderDate => date === reminderDate)) {
      return;
    }
    const formattedDateWithCity = `${city}-${getYear(forecastDate)}-${getMonth(forecastDate)}-${date}`;
    if (!forecastByDate[formattedDateWithCity]) {
      forecastByDate[formattedDateWithCity] = [];
    }
    forecastByDate[formattedDateWithCity].push({
      weather: forecast.weather[0].description,
      time: forecastDate.getHours()
    });
  });
  return forecastByDate;
};