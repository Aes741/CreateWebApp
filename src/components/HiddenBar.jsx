import React from 'react';
import { Close, Search } from '@mui/icons-material';

export default function HiddenBar({ isHiddenBarOpen, handleCloseHiddenBar, handleSearchSubmit, searchTerm, handleSearchChange }) {
  return (
    isHiddenBarOpen && (
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
    )
  );
}
