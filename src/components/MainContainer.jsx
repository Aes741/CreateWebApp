import React from 'react';
import { NavigationRounded } from '@mui/icons-material';
import iconMap from './iconMap'; // Asumiendo que iconMap está en un archivo separado

export default function MainContainer({ forecast, unit, setUnit, current }) {
  return (
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
        {forecast.map((data, index) => (
          <div key={data.id} className="flex-1 w-[120px] h-[177px] bg-[#1e213a] text-center p-3 text-[16px] flex flex-col items-center overflow-hidden">
            <div className="text-[#e7e7eb] mb-3 truncate">
              {index === 0 ? 'Tomorrow' : data.date}
            </div>
            <img className="w-[55px] h-[63px] mb-6" src={iconMap[data.icon] || '/img/Default.png'} alt="Weather Icon" />
            <div className="text-[#e7e7eb] text-[30px] font-medium mb-3">
              {data.temperature}°{unit === 'imperial' ? 'F' : 'C'}
            </div>
            <div className="text-[#a09fb1]">
              <span className="font-semibold">{data.min}°</span>
              <span className="px-1">•</span>
              <span className="font-semibold">{data.max}°</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-end mb-4">
        <NavigationRounded className="text-[#e7e7eb] cursor-pointer hover:bg-[#444242] transition duration-400 ease-in-out" />
      </div>
    </div>
  );
}
