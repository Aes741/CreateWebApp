import { useState, useEffect } from 'react';

const API_KEY = '3bc4c9f45cf04e7a74ac17d51146bf82'; 

export default function useWeatherData() {
  const [current, setCurrent] = useState({});
  const [current2, setCurrent2] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isHiddenBarOpen, setIsHiddenBarOpen] = useState(false);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCurrent(data);
      } catch (error) {
        setError(error);
      }
    }

    if (searchTerm) {
      fetchWeatherData();
    }
  }, [searchTerm, unit]);

  return { current, current2, unit, setUnit, searchTerm, setSearchTerm, error, isHiddenBarOpen, setIsHiddenBarOpen };
}
