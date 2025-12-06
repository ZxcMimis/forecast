import React, { useState, useEffect } from 'react';
import { Container } from '../Container/Container';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import './Forecast.scss';

export const Forecast = ({ data }) => {
  const [forecastData, setForecastData] = useState([]);
  const API_KEY = 'de23728e3ff5679e965e8d6066a30a47';

  useEffect(() => {
    if (!data || !data.coord) return;

    const { lat, lon } = data.coord;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        const formattedData = result.list.slice(0, 9).map((item) => {
          const date = new Date(item.dt * 1000);
          const timeString = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase();
          
          return {
            time: timeString,
            temp: item.main.temp
          };
        });

        setForecastData(formattedData);
      })
      .catch((err) => console.error(err));
  }, [data]);

  const formatYAxis = (tickItem) => {
    return `${Math.round(tickItem)}°C`;
  };

  if (!data || forecastData.length === 0) return null;

  return (
    <section className="forecast">
      <Container>
        <div className="forecast__inner">
          <h2 className="forecast__title">Hourly forecast</h2>
          
          <div className="forecast__chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData}
                margin={{
                  top: 30,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="0" 
                  vertical={true} 
                  horizontal={true} 
                  stroke="#D1D1D1"
                />
                
                <XAxis 
                  dataKey="time" 
                  orientation="top" 
                  axisLine={false} 
                  tickLine={true} 
                  tick={{ fontSize: 12, fill: '#333333' }} 
                  dy={-10}
                />
                
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  domain={['auto', 'auto']} 
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 12, fill: '#333333' }}
                  dx={-10}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#FFAB76" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6 }} 
                  strokeOpacity={0.9} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </section>
  );
};