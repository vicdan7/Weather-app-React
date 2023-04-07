import React, { useState } from 'react';

const WeatherCard = ({ weat, temperature }) => {

  const [isCelsius, setIsCelsius] = useState(true);
  
  const handleChangeTemp = () => setIsCelsius (!isCelsius)
  console.log(weat);
  
  return (
  <div className='weather-content'>
    <article className='content'>
      <h1>Weather App</h1>
      <h2>{weat?.name}, {weat?.sys.country}</h2>
      <section className='section-style'>
        <header>
            <img className='img-style' src={`https://openweathermap.org/img/wn/${weat?.weather[0].icon}@4x.png`} alt="" />
        </header>
        <div className='caracters-style'>
            <h3>"{weat?.weather[0].description}"</h3>
            <ul>
                <li>Wind Speed <span>{weat?.wind.speed}meter/sec  </span></li>
                <li>Clouds <span> {weat?.clouds.all}% </span></li>
                <li>Pressure<span> {weat?.main.pressure}hPa  </span></li>
            </ul>
        </div>
      </section>
      <footer>
        <h2>
          {
            isCelsius
             ? `${temperature?.celsius} °C`
             : `${temperature?.farenheit} °F`
          }
        </h2>
        <button className='btn2-style' onClick={handleChangeTemp}>Change to {isCelsius ? '°F' : '°C'}</button>
        <h5>Coded by Victor Ibarra</h5>
      </footer>
    </article>
  </div>
  );
}

export default WeatherCard;
