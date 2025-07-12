import React, { useState } from 'react';
import Units from './Units';
import Days from './Days';
import Highlights from './Highlights';

const MainContainer = ({ current, current2 }) => {
  const [unit, setUnit] = useState('metric');

  return (
    <div className="bg-[#100e1d] text-white rounded-lg lg:rounded-r-lg p-4 lg:px-32 lg:w-2/3 overflow-auto">
      <Units unit={unit} setUnit={setUnit} />
      <Days current2={current2} unit={unit} />
      <Highlights current={current} unit={unit} />
      <div className="text-center text-xs mt-6">Created by Aesaltos2 - devChallenges.io</div>
    </div>
  );
}

export default MainContainer;
