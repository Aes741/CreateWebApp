import React, { useEffect, useState } from 'react';
import './App.css';
import { Close, LocationOn, LocationSearching, NavigationRounded, Search } from '@mui/icons-material';

const iconMap = {
  '01d': '/img/01d.png',
  '01n': '/img/01n.png',
  '02d': '/img/02d.png',
  '02n': '/img/02n.png',
  '03d': '/img/03d.png',
  '03n': '/img/03n.png',
  '04d': '/img/04d.png',
  '04n': '/img/04n.png',
  '09d': '/img/09d.png',
  '09n': '/img/09n.png',
  '10d': '/img/10d.png',
  '10n': '/img/10n.png',
  '11d': '/img/11d.png',
  '11n': '/img/11n.png',
  '13d': '/img/13d.png',
  '13n': '/img/13n.png',
  '50d': '/img/50d.png',
  '50n': '/img/50n.png',
};

export default function App() {
  const [current, setCurrent] = useState({});
  const [current2, setCurrent2] = useState({});
  const [isHiddenBarOpen, setHiddenBarOpen] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLocation, setCurrentLocation] = useState({ lat: -0.22985, lon: -78.52495 });
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

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unit}&appid=${apiKey}`;

    getCurrentData(weatherUrl);
    getForecastData(forecastUrl);
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
  const iconSrc = iconMap[current.icon] || '/img/Default.png';

  return (
    <>
      <div className="relative flex flex-col lg:flex-row bg-black text-white overflow-auto">
        {/* Sidebar */}
        <div className="bg-[#1e213a] text-center rounded-lg lg:rounded-l-lg p-6 lg:p-10 flex flex-col lg:w-1/3 mb-0 lg:mb-0">
          <div className="flex items-center justify-between mb-5">
            <div
              className="w-[161px] h-[40px] bg-[#6e707a] text-[#e7e7eb] px-4 py-2 shadow-md cursor-pointer hover:bg-[#444242] transition duration-400 ease-in-out flex items-center justify-center sm:ml-4 lg:ml-0"
              onClick={handleOpenHiddenBar}
            >
              Search for places
            </div>
            <div
              className="text-[#e7e7eb] text-2xl h-9 w-9 flex items-center justify-center rounded-full bg-white bg-opacity-20 shadow-md cursor-pointer hover:bg-[#444242] transition duration-400 ease-in-out ml-4"
              onClick={handleOpenHiddenBar}
            >
              <LocationSearching />
            </div>
          </div>

          <div className="relative w-full mb-6">
            <img className="w-[150px] h-auto mx-auto mb-6" src={iconSrc} alt="Weather" />
            <img className="absolute top-0 left-0 w-full h-full object-cover opacity-5" src="/img/Cloud-background.png" alt="Cloud-background" />
          </div>
          <div className="text-[#e7e7eb] text-6xl font-medium mb-20">
            <span className="text-[144px]"> {current.temperature ? Math.round(Number(current.temperature)) : '--'}</span>
            <span className="text-[#a09fb1] text-3xl"> {unit === 'imperial' ? '°F' : '°C'}</span>
          </div>

          <div className="text-[#a09fb1] text-[36px] font-semibold mb-6 capitalize" >
            {current.description}
          </div>

          <div className="text-[#88869d] text-[18px] font-medium mb-6">
            <span>Today</span>
            <span className="px-4">•</span>
            <span>{current.date ? current.date : '--'}</span>
          </div>

          <div className="text-[#88869d] text-xl font-semibold">
            <span className="material-icons pr-1">
              <LocationOn />
            </span>
            <span className='text-[18px]'>{current.city}</span>
          </div>
        </div>

        {/* Main Container */}
        <div className="bg-[#100e1d] text-white rounded-lg lg:rounded-r-lg p-4 lg:px-32 lg:w-2/3 overflow-auto">
          {/* Units */}
          <div className="hidden lg:flex justify-end text-center text-lg font-bold mb-12 space-x-4">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${unit === 'metric' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
              onClick={() => setUnit('metric')}
            >
              °C
            </div>
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${unit === 'imperial' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
              onClick={() => setUnit('imperial')}
            >
              °F
            </div>
          </div>

          {/* Days */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8 mb-10 justify-items-center">
            {Array.isArray(current2) && current2.slice(0, 6).map((dato, index) => (
              <div key={index} className="flex-1 w-[120px] h-[177px] bg-[#1e213a] text-center p-3 text-[16px] flex flex-col items-center overflow-hidden">
                <div className="text-[#e7e7eb] mb-3 truncate">
                  {index === 0 ? 'Tomorrow' : dato.date}
                </div>
                <img className="w-[55px] h-[63px] mb-6" src={iconMap[dato.icon] || '/img/Default.png'} alt="Weather" />
                <div className="text-[#e7e7eb] flex justify-center items-center">
                  <span className="mr-3">{Math.round(dato.max)} {unit === 'imperial' ? '°F' : '°C'}</span>
                  <span className="text-[#a09fb1]">{Math.round(dato.min)} {unit === 'imperial' ? '°F' : '°C'}</span>
                </div>
              </div>
            ))}
          </div>


          {/* Highlights */}
          <div className="text-white text-[24px] font-bold mb-6 text-left">Today's Highlights</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#1e213a] p-4" style={{ width: '328px', height: '204px' }}>
              <div className="text-center text-[16px] text-[#e7e7eb] mb-7">Wind status</div>
              <div className="text-center text-4xl font-bold">
                <span className="text-[64px]">{current.speed ? current.speed : '--'} </span>
                <span className="text-[36px] font-medium"> {unit === 'imperial' ? 'mph' : 'km/h'}</span>
              </div>
              <div className="flex items-center justify-center mt-6">
                <span className="material-icons text-sm bg-[#e7e7eb] bg-opacity-30 p-1 rounded-full" style={{ rotate: `${current.grd}deg` }}>
                  <NavigationRounded />
                </span>
                <span className="ml-2 text-[14px] text-[#e7e7eb]"> WSW</span>
              </div>
            </div>
            <div className="bg-[#1e213a] p-4 rounded-lg" style={{ width: '328px', height: '204px' }}>
              <div className="text-center mb-7">Humidity</div>
              <div className="text-center text-4xl font-bold">
                <span className="text-[64px]">{current.humidity ? current.humidity : '--'} </span>
                <span className="text-[36px] font-medium">%</span>
              </div>
              <div className="w-3/4 mx-auto mt-6">
                <div className="flex justify-between text-xs mb-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                <div className="relative h-2 bg-[#e7e7eb] rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-[#ffec65] rounded-full" style={{ width: `${current.humidity ? current.humidity : '--'}%` }}></div>
                </div>
                <div className="text-xs text-end">%</div>
              </div>
            </div>
            <div className="bg-[#1e213a] p-4 rounded-lg text-[#e7e7eb]" style={{ width: '328px', height: '159px' }}>
              <div className="text-center text-[16px]">Visibility</div>
              <div className="text-center font-bold ">
                <span className="text-[64px]">{current.visibility ? current.visibility : '--'} </span>
                <span className="text-[32px] font-medium">miles</span>
              </div>
            </div>
            <div className="bg-[#1e213a] p-4 rounded-lg" style={{ width: '328px', height: '159px' }}>
              <div className="text-center text-[16px]">Air Pressure</div>
              <div className="text-center font-bold">
                <span className="text-[64px]">{current.pressure ? current.pressure : '--'} </span>
                <span className="text-2xl font-medium">mb</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs mt-6">Created by Aesaltos2 - devChallenges.io</div>
        </div>

        {/* Hidden Bar */}
        {isHiddenBarOpen && (
          <div className="absolute bg-[#1e213a] sm:w-[459px] w-full h-full transform translate-x-0 transition-transform duration-600 ease-in-out rounded-lg flex flex-col p-6">
            <div className="text-[#e7e7eb] text-3xl font-light mb-4 text-right">
              <span className="material-icons cursor-pointer" onClick={handleCloseHiddenBar}>
                <Close />
              </span>
            </div>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative flex flex-col sm:flex-row w-full mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  name="search"
                  id="textsearch"
                  placeholder="Search location"
                  className="flex-1 border border-[#e7e7eb] bg-transparent text-white pl-10 py-2 text-lg placeholder-[#616475] bg-no-repeat bg-[left_8px_top_12px] mb-4 sm:mb-0 sm:mr-4"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-[#e7e7eb]" />
                </div>
                <input type="submit" className="bg-[#3c47e9] text-[#e7e7eb] text-lg text-center py-2 px-4 cursor-pointer" value="Search" />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
