import React, { useState, useEffect } from 'react';
import './Hero.scss'
import '../reset/reset.scss'
import { Container } from '../Container/Container';
import searchIcon from '../../img/search.svg'

export const Hero = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const API_KEY = 'de23728e3ff5679e965e8d6066a30a47';

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(timerId);
    }, []);

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    };

    const monthYear = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const dayNumber = currentDate.getDate();
    const daySuffix = getOrdinalSuffix(dayNumber);

    useEffect(() => {
        const fetchCities = async () => {
            if (city.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
                const res = await fetch(url);
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error(error);
            }
        };

        const timerId = setTimeout(() => {
            if (city) fetchCities();
        }, 500);

        return () => clearTimeout(timerId);
    }, [city]);

    const handleSearchClick = () => {
        if (city.trim()) {
            onSearch(city);
            setCity('');
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        const locationString = suggestion.name;
        setCity(locationString);
        onSearch(locationString);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

    return (
        <section className="hero">
            <Container>
                <h1 className="hero__title">Weather dashboard</h1>
                <div className="hero__content">
                    <p className='hero__context'>Create your personal list of favorite cities and always be aware of the weather.</p>
                    <div className="hero__divider"></div>
                    <div className="hero__date">
                        <p className='hero__date-one'>{monthYear}</p>
                        <p className='hero__date-two'>
                            {dayName}, {dayNumber}<sup>{daySuffix}</sup>
                        </p>
                    </div>
                </div>
                
                <div className="hero__search-wrapper">
                    <div className="hero__search-container">
                        <input 
                            className="hero__search-input"  
                            type="text" 
                            placeholder="Search location.."  
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => city.length >= 3 && setShowSuggestions(true)}
                            onBlur={handleBlur}
                        />
                        <button className="hero__search-button" onClick={handleSearchClick}>
                            <svg className="hero__search-icon">
                                <use href={searchIcon}></use>
                            </svg>
                        </button>
                    </div>

                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="hero__suggestions">
                            {suggestions.map((item, index) => (
                                <li 
                                    key={`${item.lat}-${item.lon}-${index}`} 
                                    className="hero__suggestion-item"
                                    onClick={() => handleSuggestionClick(item)}
                                >
                                    <span className="hero__suggestion-city">{item.name}</span>
                                    <span className="hero__suggestion-country">
                                        {item.state ? `${item.state}, ` : ''}{item.country}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Container>
        </section>
    )
}