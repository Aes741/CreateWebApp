import React from 'react';

const Units = ({ unit, setUnit }) => (
  <div className="hidden lg:flex justify-end text-center text-lg font-bold mb-12 space-x-4">
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${unit === 'metric' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
      onClick={() => setUnit('metric')}
    >°C</div>
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${unit === 'imperial' ? 'bg-[#e7e7eb] text-[#110e3c]' : 'bg-[#585676] text-[#e7e7eb]'}`}
      onClick={() => setUnit('imperial')}
    >°F</div>
  </div>
);

export default Units;