import React from 'react';
import { NavigationRounded } from '@mui/icons-material';

const Highlights = ({ current, unit }) => (
  <div>
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
  </div>
);

export default Highlights;
