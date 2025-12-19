import React, { useState, useEffect } from 'react';
import './Weather.scss';
import { Container } from '../Container/Container';
import delet from '../../img/delete.svg';
import refresh from '../../img/refresh.svg';

export const Weather = ({ onToggle, activeId, newCity, isUserRegistered, onOpenAuthModal }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [refreshingId, setRefreshingId] = useState(null);
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
                    if (res.ok) return { ...data, liked: false };
                    return null;
                });
                const results = await Promise.all(promises);
                setWeatherData(results.filter(item => item !== null));
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllWeather();
    }, []);

    useEffect(() => {
        if (newCity) {
            setWeatherData(prevData => {
                const isExist = prevData.some(item => item.id === newCity.id);
                if (!isExist) return [newCity, ...prevData];
                return prevData;
            });
        }
    }, [newCity]);

    const handleRefresh = async (e, id, lat, lon) => {
        e.stopPropagation();
        setRefreshingId(id);
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            const res = await fetch(url);
            const newData = await res.json();
            if (res.ok) {
                setWeatherData(prevData => prevData.map(item => 
                    item.id === id ? { ...newData, liked: item.liked } : item
                ));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshingId(null);
        }
    };

    const handleLike = (e, id) => {
        e.stopPropagation();
        setWeatherData(prevData => prevData.map(item => 
            item.id === id ? { ...item, liked: !item.liked } : item
        ));
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (activeId === id) onToggle({ id: null });
        setWeatherData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleSeeMoreClick = (data) => {
        if (!isUserRegistered) {
            onOpenAuthModal();
        } else {
            onToggle(data);
        }
    };

    if (weatherData.length === 0) {
        return (
            <section className="weather">
                <Container>
                    <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Loading...</div>
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
                            <div className="weather__temp">
                                {refreshingId === data.id ? '...' : `${Math.round(data.main.temp)}°C`}
                            </div>
                            <div className="weather__footer">
                                <div className="weather__footer-actions">
                                    <button className="weather__icon-btn" onClick={(e) => handleRefresh(e, data.id, data.coord.lat, data.coord.lon)}>
                                        <svg className={`weather__footer-icon weather__icon-refresh ${refreshingId === data.id ? 'spinning' : ''}`}>
                                            <use href={refresh}></use>
                                        </svg>
                                    </button>
                                    <button className="weather__icon-btn" onClick={(e) => handleLike(e, data.id)}>
                                        <svg
                                            className="weather__footer-icon weather__icon-like"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            style={{
                                                fill: data.liked ? '#ff4b4b' : 'transparent',
                                                stroke: data.liked ? '#ff4b4b' : '#333333',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <button className="weather__btn" onClick={() => handleSeeMoreClick(data)} style={{ opacity: isUserRegistered ? 1 : 0.8, cursor: 'pointer' }}>
                                    {activeId === data.id ? 'Hide info' : 'See more'}
                                </button>
                                <button className="weather__icon-btn" onClick={(e) => handleDelete(e, data.id)}>
                                    <svg className="weather__footer-icon weather__icon-trash">
                                        <use href={delet}></use>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};