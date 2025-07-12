import React from 'react';
import iconMap from './iconMap';

const Days = ({ current2, unit }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8 mb-10 justify-items-center">
    {Array.isArray(current2) && current2.slice(1, 6).map((dato, index) => (
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
);

export default Days;
