import React from 'react';
import { Close } from '@mui/icons-material';

export default function HiddenBar({ searchTerm, onSearchChange, onSearchSubmit, onClose }) {
  return (
    <div className="fixed top-0 right-0 w-full h-full bg-[#2e2e2e] z-50 p-4 lg:p-8 overflow-auto">
      <div className="relative flex flex-col items-center">
        <div className="absolute top-4 right-4 text-white text-xl cursor-pointer" onClick={onClose}>
          <Close />
        </div>
        <h2 className="text-white text-2xl font-semibold mb-6">Search for a location</h2>
        <form onSubmit={onSearchSubmit} className="w-full max-w-md flex">
          <input
            type="text"
            placeholder="Enter location"
            value={searchTerm}
            onChange={onSearchChange}
            className="flex-1 p-3 rounded-l-md border border-gray-300 text-black"
          />
          <button type="submit" className="bg-[#e7e7eb] text-[#110e3c] p-3 rounded-r-md">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
