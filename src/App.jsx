import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';
import HiddenBar from './components/HiddenBar';

export default function App() {
  const [current, setCurrent] = useState({});
  const [current2, setCurrent2] = useState({});
  const [isHiddenBarOpen, setHiddenBarOpen] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lat: -12.0464, lon: -77.0428 });
  const apiKey = '3bc4c9f45cf04e7a74ac17d51146bf82';

  const getCurrentData = async (url) => {
    const rs = await fetch(url);
    const rsJson = await rs.json();

    const date = new Date(rsJson.dt * 1000);
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    setCurrent({
      id: rsJson.id,
      icon: rsJson.weather[0].icon,
      temperature: rsJson.main.temp,
      speed: rsJson.wind.speed,
      humidity: rsJson.main.humidity,
      pressure: rsJson.main.pressure,
      description: rsJson.weather[0].description,
      visibility: rsJson.visibility,
      city: rsJson.name,
      grd: rsJson.wind.deg,
      date: formattedDate,
    });
  };

  const getForecastData = async (url) => {
    const rs = await fetch(url);
    const rsJson = await rs.json();
    console.log(rsJson);

    const seenDates = new Set();
    const dailyData = [];

    rsJson.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const formattedDate = date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });

      if (!seenDates.has(formattedDate)) {
        seenDates.add(formattedDate);
        dailyData.push({
          id: item.dt,
          icon: item?.weather[0]?.icon,
          temperature: item?.main?.temp,
          min: item?.main?.temp_min,
          max: item?.main?.temp_max,
          date: formattedDate,
        });
      }
      setCurrent2(dailyData);
    });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unit}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unit}&appid=${apiKey}`;

      getCurrentData(weatherUrl);
      getForecastData(forecastUrl);
    }
  }, [unit, currentLocation]);

  const handleOpenHiddenBar = () => {
    setHiddenBarOpen(true);
  };

  const handleCloseHiddenBar = () => {
    setHiddenBarOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=${unit}&appid=${apiKey}`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    setCurrentLocation({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });

    await getCurrentData(weatherUrl);
    await getForecastData(forecastUrl);

    setSearchTerm('');
    handleCloseHiddenBar();
  };

  return (
    <>
      <div className="relative flex flex-col lg:flex-row bg-black text-white overflow-auto">
        <Sidebar
          current={current}
          unit={unit}
          onOpenHiddenBar={handleOpenHiddenBar}
          onGetCurrentLocation={getCurrentLocation} 
        />
        <MainContainer
          current={current}
          current2={current2}
        />
        <HiddenBar
          isHiddenBarOpen={isHiddenBarOpen}
          handleCloseHiddenBar={handleCloseHiddenBar}
          handleSearchSubmit={handleSearchSubmit}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </>
  );
}
