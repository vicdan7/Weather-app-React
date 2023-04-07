import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./assets/components/WeatherCard";
import Loading from "./assets/components/Loading";
import SearchIcon from "./assets/icons/search.png";

function App() {
  const apiK = "9b2acbf557f48100ded7cedaf898ba04";
  const [lalo, setLalo] = useState();
  const [weat, setWeat] = useState();
  const [temperature, setTemperature] = useState();
  const [location, setLocation] = useState("");

  useEffect(() => {
    const success = (position) => {
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setLalo(obj);
    };
    const error = (err) => {
      console.log(err);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (lalo) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lalo.lat}&lon=${lalo.lon}&appid=${apiK}`;
      axios
        .get(url)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);

          setTemperature({ celsius, farenheit });
          setWeat(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [lalo]);

  const getWeatherCity = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiK}`
      )
      .then((response) => {
        const celsius = (response.data.main.temp - 273.15).toFixed(1);
        const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);

        setTemperature({ celsius, farenheit });
        setWeat(response.data);
        setLocation("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(src/assets/image/${
          weat?.weather[0].icon || "02d"
        }.jpg)`,
      }}
    >
      <form className="search-style" onSubmit={getWeatherCity} action="">
        <img src={SearchIcon} alt="" />
        <input
          className="in-style"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="CIUDAD"
        />

        <button className="btn-style" type="submit">
          Search
        </button>
      </form>
      {weat ? (
        <WeatherCard weat={weat} temperature={temperature} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
