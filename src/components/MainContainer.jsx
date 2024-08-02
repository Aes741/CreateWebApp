import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherHighlights from './WeatherHighlights';

export default function MainContainer({ current2, unit, setUnit }) {
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
        {Array.isArray(current2) && current2.slice(1, 6).map((dato, index) => (
          <WeatherCard key={index} dato={dato} unit={unit} />
        ))}
      </div>

      {/* Highlights */}
      <WeatherHighlights current={current2[0]} unit={unit} />
      <div className="text-center text-xs mt-6">Created by Aesaltos2 - devChallenges.io</div>
    </div>
  );
}
