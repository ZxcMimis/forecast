import React, { useState, useEffect } from 'react';
import { Container } from '../Container/Container';
import './Prediction.scss';

export const Prediction = ({ data }) => {
    const [dailyForecast, setDailyForecast] = useState([]);
    const API_KEY = 'de23728e3ff5679e965e8d6066a30a47';

    useEffect(() => {
        if (!data || !data.coord) return;

        const { lat, lon } = data.coord;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then((res) => res.json())
            .then((result) => {
                
                const dailyData = {};

                result.list.forEach((reading) => {
                    const date = reading.dt_txt.split(' ')[0];

                    if (!dailyData[date]) {
                        dailyData[date] = {
                            dt: reading.dt,
                            min: reading.main.temp_min,
                            max: reading.main.temp_max,
                            icon: reading.weather[0].icon,
                            desc: reading.weather[0].description,
                        };
                    } else {
                        dailyData[date].min = Math.min(dailyData[date].min, reading.main.temp_min);
                        dailyData[date].max = Math.max(dailyData[date].max, reading.main.temp_max);
                        
                        if (reading.dt_txt.includes("12:00:00")) {
                            dailyData[date].icon = reading.weather[0].icon;
                            dailyData[date].desc = reading.weather[0].description;
                        }
                    }
                });

                const formattedForecast = Object.values(dailyData).slice(0, 5);
                setDailyForecast(formattedForecast);
            })
            .catch((err) => console.error(err));
    }, [data]);

    if (!data || dailyForecast.length === 0) return null;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <section className="prediction">
            <Container>
                <ul className="prediction__list">
                    {dailyForecast.map((day) => (
                        <li key={day.dt} className='prediction__item'>
                            <p className="prediction__date">{formatDate(day.dt)}</p>

                            <div className='prediction__weather-group'>
                                <img 
                                    className='prediction__img' 
                                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                                    alt={day.desc} 
                                />
                                <p className='prediction__temp'>
                                    {Math.round(day.max)}/{Math.round(day.min)}℃
                                </p>
                            </div>

                            <p className='prediction__desc'>{day.desc}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};