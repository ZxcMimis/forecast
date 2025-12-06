import React, { useState, useEffect } from 'react';
import './Weather.scss';
import { Container } from '../Container/Container';
import delet from '../../img/delete.svg';
import heart from '../../img/heart.svg';
import refresh from '../../img/refresh.svg';


export const Weather = ({ onToggle, activeId }) => {
    const [weatherData, setWeatherData] = useState([]);
    const API_KEY = 'de23728e3ff5679e965e8d6066a30a47';

    const locations = [
        { lat: 50.0755, lon: 14.4378 }, 
        { lat: 50.4501, lon: 30.5234 }, 
        { lat: 51.5074, lon: -0.1278 } 
    ];

    const getCurrentDate = () => {
        const date = new Date();
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', weekday: 'long' }).replace(',', ' |');
    };

    useEffect(() => {
        const fetchAllWeather = async () => {
            try {
                const promises = locations.map(async loc => {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${API_KEY}&units=metric`;
                    const res = await fetch(url);
                    const data = await res.json();
                    return res.ok ? data : null;
                });

                const results = await Promise.all(promises);
                setWeatherData(results.filter(item => item !== null));
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllWeather();
    }, []);

    if (weatherData.length === 0) {
        return (
            <section className="weather">
                <Container>
                    <div style={{color: 'white', textAlign: 'center', padding: '20px'}}>Loading...</div>
                </Container>
            </section>
        );
    }

    return (
        <section className="weather">
            <Container>
                <ul className="weather__list">
                    {weatherData.map((data) => (
                        <li key={data.id} className="weather__card">
                            <div className="weather__header">
                                <span className="weather__city">{data.name}</span>
                                <span className="weather__country">{data.sys?.country}</span>
                            </div>
                            
                            <div className="weather__time">{new Date().getHours()}:00</div>
                            
                            <div className="weather__buttons">
                                <button className="weather__btn__one">Hourly forecast</button>
                                <button className="weather__btn__one">Weekly forecast</button>
                            </div>
                            
                            <div className="weather__date">{getCurrentDate()}</div>
                            
                            <div className="weather__icon-wrap">
                                <img 
                                    className='weather__icon' 
                                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} 
                                    alt={data.weather[0].description} 
                                />
                            </div>
                            
                            <div className="weather__temp">{Math.round(data.main.temp)}°C</div>
                            
                            <div className="weather__footer">
                                <div className="weather__footer-actions">
                                    <svg className="weather__footer-icon weather__icon-refresh">
                                        <use href={refresh}></use>
                                    </svg>
                                    <svg className="weather__footer-icon weather__icon-like">
                                       <use href={heart}></use>
                                    </svg>
                                </div>

                                <button 
                                    className="weather__btn" 
                                   
                                    onClick={() => onToggle(data)}
                                >

                                    {activeId === data.id ? 'Hide info' : 'See more'}
                                </button>

                                <svg className="weather__footer-icon weather__icon-trash">
                                    <use href={delet}></use>
                                </svg>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};