import './App.css';
import { Articles } from './Components/Articles/Articles';
import { Footer } from './Components/Footer/Footer';
import { Gallery } from './Components/Gallery/Gallery';
import { Header } from './Components/Header/Header.jsx';
import { Hero } from './Components/Hero/Hero';
import { Weather } from './Components/Weather/Weather';
import {SeeMore} from './Components/Weather/SeeMore.jsx'
import './Components/reset/reset.scss'


function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Weather />
      <SeeMore />
      <Articles />
      <Gallery />
      <Footer />

    </div>
  );
}

export default App;
