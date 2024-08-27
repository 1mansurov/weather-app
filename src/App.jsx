import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Tashkent');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${location}&days=7&aqi=yes&alerts=yes`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error("Error fetching weather data:", error));
  }, [location]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  if (!weatherData) {
    return <div>Loading...</div>; // Ma'lumotlar kelishini kutish
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Search any city..."
          value={location}
          onChange={handleLocationChange}
        />
        <button onClick={toggleDarkMode}>🌙</button>
      </header>

      <div className="weather-info">
        <div className="weather-card">
          <div className="temp">
            {Math.round(weatherData.current.temp_c)}°
          </div>
          <div className="location">
            {weatherData.location.name}, {weatherData.location.country}
          </div>
          <div className="time">
            {new Date(weatherData.location.localtime).toLocaleTimeString()} <br />
            {new Date(weatherData.location.localtime).toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
          <div className="condition">
            {weatherData.current.condition.text}
          </div>
          <div className="forecast">
            {weatherData.forecast.forecastday.map(day => (
              <div key={day.date} className="forecast-day">
                <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div>{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</div>
                <div>{day.day.condition.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="map">
          {/* Google Map yoki boshqa xizmatlarni qo'shish mumkin */}
        </div>
      </div>
    </div>
  );
}

export default App;
