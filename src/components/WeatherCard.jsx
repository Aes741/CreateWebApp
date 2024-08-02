import React from 'react';
import { NavigationRounded } from '@mui/icons-material';

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

export default function WeatherCard({ dato, unit }) {
  return (
    <div className="flex-1 w-[120px] h-[177px] bg-[#1e213a] text-center p-3 text-[16px] flex flex-col items-center overflow-hidden">
      <div className="text-[#e7e7eb] mb-3 truncate">
        {dato.id === 0 ? 'Tomorrow' : dato.date}
      </div>
      <img className="w-[55px] h-[63px] mb-6" src={iconMap[dato.icon] || '/img/Default.png'} alt="Weather" />
      <div className="text-[#e7e7eb] flex justify-center items-center">
        <span className="mr-3">{Math.round(dato.max)} {unit === 'imperial' ? '°F' : '°C'}</span>
        <span className="text-[#a09fb1]">{Math.round(dato.min)} {unit === 'imperial' ? '°F' : '°C'}</span>
      </div>
    </div>
  );
}
