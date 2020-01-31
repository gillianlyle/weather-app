import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

const width = { width:"10rem"}

// Build API call
const units = "metric";
const APIKey = "8af65a10be9d776190168f7a5b85f7ca";

const App = () => {
    const [dailyData, setDailyData] = useState([]);
    const [city, setCity] = useState('Glasgow');

    const handleChange = event => { setCity(event.target.value) }

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&&appid=${APIKey}`);
            setDailyData(result.data.list.filter(weatherData => { return weatherData.dt_txt.includes("18:00:00")})); // only show 1 result per day
        };
        fetchData();
    }, [city]); 
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    return(
        <> 
            <h1 className="display-2">5 day forecast</h1>
            <label>Search for city: <input value={city} onChange={handleChange} /></label>

            <br/>

            {dailyData.map((item, index, day) => 
                <div className="card" style={width} key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{days[new Date(item.dt_txt).getDay()]}</h5>
                        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} className="card-img-top" alt=".." />
                        <p className="card-text">{item.weather[0].description} <br /> {item.main.temp_min}° / {item.main.temp_max}°</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default App;
