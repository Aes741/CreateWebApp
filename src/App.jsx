import React from 'react';
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';
import HiddenBar from './components/HiddenBar';
import useWeatherData from './hooks/useWeatherData';

export default function App() {
  const { current, current2, unit, setUnit, searchTerm, setSearchTerm, error, isHiddenBarOpen, setIsHiddenBarOpen } = useWeatherData();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchTerm);
  };

  const handleOpenHiddenBar = () => {
    setIsHiddenBarOpen(true);
  };

  const handleCloseHiddenBar = () => {
    setIsHiddenBarOpen(false);
  };

  return (
    <div className="App bg-[#100e1d] min-h-screen flex flex-col lg:flex-row">
      <Sidebar
        current={current}
        handleOpenHiddenBar={handleOpenHiddenBar}
        unit={unit}
        setUnit={setUnit}
        isHiddenBarOpen={isHiddenBarOpen}
        handleCloseHiddenBar={handleCloseHiddenBar}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <MainContainer current2={current2} unit={unit} setUnit={setUnit} />
      {isHiddenBarOpen && <HiddenBar handleClose={handleCloseHiddenBar} />}
    </div>
  );
}
