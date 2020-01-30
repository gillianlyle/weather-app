import React, {useState, useEffect} from 'react';
import axios from 'axios'

const width = { width:"10rem"}

// Build API call
const city = "Glasgow";
const units = "metric";
const APIKey = "8af65a10be9d776190168f7a5b85f7ca";

const Card = () => {
    const [dailyData, setDailyData] = useState([]);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&&appid=${APIKey}`);
            setDailyData(result.data.list.filter(weatherData => { return weatherData.dt_txt.includes("09:00:00")})); // only show 1 result per day
        };
        fetchData();
    }, []); 
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    return(
        <> 
            {city}
            <br/>
            {dailyData.map((item, index, day) => 
                <div className="card" style={width} key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{days[new Date(item.dt_txt).getDay()]}</h5>
                        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} className="card-img-top" alt=".." />
                        <p className="card-text">{item.weather[0].description} <br/ >{item.main.temp_min}° / {item.main.temp_max}°</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card;