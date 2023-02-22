import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {

  const [weather, setWeather] = useState(null);
  const app_id = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${app_id}&units=metric`)
      .then((response) => response.data)
      .then(data => setWeather(data))
      .catch(err => console.log(err))
  }, [app_id, country.capital]);


  console.log(country.languages)


  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <b>languages:</b>
      <ul>
        {Object.entries(country.languages).map(([code, name], index) => (
          <li key={index}>{name} ({code})</li>
        ))}
      </ul>


      <img src={country.flags.png} alt="" />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather?.main.temp} Celsius</p>
      {<img src={weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ''} alt="" />}
      <p>wind {weather?.wind.speed} m/s</p>

    </>
  );
};

export default Country;
