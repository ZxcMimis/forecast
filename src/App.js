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
      <Hero />
      
      <Weather 
        onToggle={handleToggleDetails} 
        activeId={selectedWeather ? selectedWeather.id : null} 
      />

      {selectedWeather && (
        <>
          <SeeMore data={selectedWeather} />
          <Forecast data={selectedWeather} />
          < Prediction />
        </>
      )}

      <Articles />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;