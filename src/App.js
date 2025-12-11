import React, { useState } from 'react';
import './App.css';
import './Components/reset/reset.scss';
import { Header } from './Components/Header/Header.jsx';
import { Hero } from './Components/Hero/Hero';
import { Weather } from './Components/Weather/Weather';
import { SeeMore } from './Components/Weather/SeeMore.jsx';
import { Forecast } from './Components/Weather/Forecast.jsx';
import { Prediction } from './Components/Weather/Prediction.jsx';
import { Articles } from './Components/Articles/Articles';
import { Gallery } from './Components/Gallery/Gallery';
import { Footer } from './Components/Footer/Footer';

const App = () => {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [newCity, setNewCity] = useState(null);
  const API_KEY = 'de23728e3ff5679e965e8d6066a30a47';

  const handleSearch = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            setNewCity({ ...data, liked: false });
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error(error);
    }
  };

  const handleToggleDetails = (data) => {
    if (selectedWeather && selectedWeather.id === data.id) {
      setSelectedWeather(null);
    } else {
      setSelectedWeather(data);
      setTimeout(() => {
        const seeMoreSection = document.querySelector('.see');
        if (seeMoreSection) {
            seeMoreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="App">
      <Header />
      <Hero onSearch={handleSearch} />
      
      <Weather 
        onToggle={handleToggleDetails} 
        activeId={selectedWeather ? selectedWeather.id : null} 
        newCity={newCity}
      />

      {selectedWeather && (
        <>
          <SeeMore data={selectedWeather} />
          <Forecast data={selectedWeather} />
          <Prediction data={selectedWeather} />
        </>
      )}

      <Articles />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;