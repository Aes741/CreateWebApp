import React from 'react';
import { LocationOn, LocationSearching } from '@mui/icons-material';
import iconMap from './iconMap';

export default function Sidebar({ current, unit, onOpenHiddenBar, onGetCurrentLocation}) {
  const iconSrc = iconMap[current.icon] || '/img/Default.png';

  return (
    <div className="bg-[#1e213a] text-center rounded-lg lg:rounded-l-lg p-6 lg:p-10 flex flex-col lg:w-1/3 mb-0 lg:mb-0">
      <div className="flex items-center justify-between mb-5">
        <div
          className="w-[161px] h-[40px] bg-[#6e707a] text-[#e7e7eb] px-4 py-2 shadow-md cursor-pointer hover:bg-[#444242] transition duration-400 ease-in-out flex items-center justify-center sm:ml-4 lg:ml-0"
          onClick={onOpenHiddenBar}
        >
          Search for places
        </div>
        <div
          className="text-[#e7e7eb] text-2xl h-9 w-9 flex items-center justify-center rounded-full bg-white bg-opacity-20 shadow-md cursor-pointer hover:bg-[#444242] transition duration-400 ease-in-out ml-4"
          onClick={onGetCurrentLocation} 
        >
          <LocationSearching />
        </div>
      </div>

      <div className="relative w-full mb-6">
        <img className="w-[150px] h-auto mx-auto mb-6" src={iconSrc} alt="Weather" />
        <img className="absolute top-0 left-0 w-full h-full object-cover opacity-5" src="/img/Cloud-background.png" alt="Cloud-background" />
      </div>
      <div className="text-[#e7e7eb] text-6xl font-medium mb-20">
        <span className="text-[144px]">
          {current.temperature ? Math.round(Number(current.temperature)) : '--'}
        </span>
        <span className="text-[#a09fb1] text-3xl"> {unit === 'imperial' ? '°F' : '°C'}</span>
      </div>

      <div className="text-[#a09fb1] text-[36px] font-semibold mb-6 capitalize">
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
  );
}
