import './App.css';
import { Articles } from './Components/Articles/Articles';
import { Footer } from './Components/Footer/Footer';
import { Gallery } from './Components/Gallery/Gallery';
import { Header } from './Components/Header/Header.jsx';
import { Hero } from './Components/Hero/Hero';
import { Weather } from './Components/Weather/Weather';
import { SeeMore } from './Components/Weather/SeeMore.jsx'
import { Forecast } from './Components/Weather/Forecast.jsx';
import './Components/reset/reset.scss'
import {useState} from 'react';


const App = () => {

  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const handleToggleDetails = (index) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <Weather onToggle={handleToggleDetails} activeIndex={activeCardIndex} />

      {activeCardIndex !== null && (
        <>
          <SeeMore />
          <Forecast />
        </>
      )}

      <Articles />
      <Gallery />
      <Footer />

    </div>
  );
}

export default App;
