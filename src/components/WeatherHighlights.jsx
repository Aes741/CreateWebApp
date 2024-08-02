import React from 'react';
import { NavigationRounded } from '@mui/icons-material';

export default function WeatherHighlights({ current, unit }) {
  if (!current) return null; // Añade esta línea para evitar el error cuando current es undefined

  const windSpeed = current?.wind?.speed ?? '--';
  const windDirection = current?.wind?.deg ?? '--';
  const humidity = current?.main?.humidity ?? '--';
  const pressure = current?.main?.pressure ?? '--';
  const visibility = current?.visibility ? (current.visibility / 1000) : '--';

  return (
    <>
      <div className="text-white text-[24px] font-bold mb-6 text-left">Today's Highlights</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#1e213a] p-4" style={{ width: '328px', height: '204px' }}>
          <div className="text-center text-[16px] text-[#e7e7eb] mb-7">Wind status</div>
          <div className="text-center text-4xl font-bold">
            <span className="text-[64px]">{windSpeed}</span>
            <span className="text-[36px] font-medium"> {unit === 'imperial' ? 'mph' : 'km/h'}</span>
          </div>
          <div className="flex items-center justify-center mt-6">
            <span 
              className="material-icons text-sm bg-[#e7e7eb] bg-opacity-30 p-1 rounded-full" 
              style={{ transform: `rotate(${windDirection}deg)` }}
            >
              <NavigationRounded />
            </span>
            <div className="ml-3">
              <span className="text-[#a09fb1] text-xs">Direction</span>
              <div className="text-[#e7e7eb] text-xs font-semibold">{windDirection}°</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1e213a] p-4" style={{ width: '328px', height: '204px' }}>
          <div className="text-center text-[16px] text-[#e7e7eb] mb-7">Humidity</div>
          <div className="text-center text-4xl font-bold">
            <span className="text-[64px]">{humidity}</span>
            <span className="text-[36px] font-medium"> %</span>
          </div>
        </div>

        <div className="bg-[#1e213a] p-4" style={{ width: '328px', height: '204px' }}>
          <div className="text-center text-[16px] text-[#e7e7eb] mb-7">Pressure</div>
          <div className="text-center text-4xl font-bold">
            <span className="text-[64px]">{pressure}</span>
            <span className="text-[36px] font-medium"> hPa</span>
          </div>
        </div>

        <div className="bg-[#1e213a] p-4" style={{ width: '328px', height: '204px' }}>
          <div className="text-center text-[16px] text-[#e7e7eb] mb-7">Visibility</div>
          <div className="text-center text-4xl font-bold">
            <span className="text-[64px]">{visibility}</span>
            <span className="text-[36px] font-medium"> km</span>
          </div>
        </div>
      </div>
    </>
  );
}
