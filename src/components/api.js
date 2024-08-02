export const fetchWeatherData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchForecastData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.list.slice(1, 6).map(item => ({
      id: item.dt,
      icon: item?.weather[0]?.icon,
      temperature: item?.main?.temp,
      min: item?.main?.temp_min,
      max: item?.main?.temp_max,
      date: new Date(item.dt * 1000).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      }),
    }));
  };
  