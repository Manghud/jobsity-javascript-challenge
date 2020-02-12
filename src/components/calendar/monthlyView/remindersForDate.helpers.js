
export const getWeatherDataForDate = ({ weatherState, calendarState, date }) => {
  const dateKey = `${calendarState.year}-${calendarState.month}-${date}`;
  const weatherData = {};
  Object.keys(weatherState).forEach(weatherKey => {
    const segments = weatherKey.split('-');
    if(!segments.length || segments.slice(1).join('-') !== dateKey) {
      return;
    }
    weatherData[segments[0]] = weatherState[weatherKey];
  });
  return weatherData;
};