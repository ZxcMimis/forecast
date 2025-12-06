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

const data = [
  { time: '11 pm', temp: 13.5 },
  { time: 'Oct 14', temp: 12.5 },
  { time: '1 am', temp: 11.8 },
  { time: '2 am', temp: 10.2 },
  { time: '3 am', temp: 10.0 },
  { time: '4 am', temp: 9.8 },
  { time: '5 am', temp: 10.2 },
  { time: '6 am', temp: 11.5 },
  { time: '7 am', temp: 12.1 },
  { time: '8 am', temp: 12.8 },
  { time: '9 am', temp: 13.8 },
  { time: '10 am', temp: 15.5 },
  { time: '11 am', temp: 17.5 },
  { time: '12 am', temp: 18.2 },
  { time: '1 pm', temp: 19.5 },
  { time: '2 pm', temp: 21.5 },
  { time: '3 pm', temp: 23.8 },
  { time: '4 pm', temp: 25.0 },
  { time: '5 pm', temp: 25.8 },
  { time: '6 pm', temp: 25.9 },
];

const formatYAxis = (tickItem) => {
  return `${tickItem}°C`;
};

export const Forecast = (  ) => {


    return (
        <section className="forecast">
            <Container>
        <div className="forecast">
      <h2 className="forecast__title">Hourly forecast</h2>
      
      <div className="forecast__chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
              ticks={[5, 10, 15, 20, 25]} 
              domain={[5, 26]} 
              tickFormatter={formatYAxis}
              tick={{ fontSize: 12, fill: '#333333' }}
              dx={-10}
            />
            
            <Line 
              type="basis" 
              dataKey="temp" 
              stroke="#FFAB76" 
              strokeWidth={3} 
              dot={false} 
              activeDot={false} 
              strokeOpacity={0.9} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
            </Container>

        </section>
    )
}