import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { WiDaySunny } from "react-icons/wi";
import { WiNightClear } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { WiNightCloudy } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiFog } from "react-icons/wi";
import { WiDayShowers } from "react-icons/wi";
import { WiNightShowers } from "react-icons/wi";
import { WiDaySleet } from "react-icons/wi";
import { WiNightSleet } from "react-icons/wi";
import { WiSnow } from "react-icons/wi";
import { WiSleet } from "react-icons/wi";
import { WiRain } from "react-icons/wi";
import { WiDayRain } from "react-icons/wi";
import { WiNightRain } from "react-icons/wi";
import { WiDayRainMix } from "react-icons/wi";
import { WiNightRainMix } from "react-icons/wi";
import { WiThunderstorm } from "react-icons/wi";
import { WiSnowflakeCold } from "react-icons/wi";

function App() {
  const [dailyArr, addDailyInfo] = useState([]);
  const [hourlyArr, addHourlyInfo] = useState([]);
  const [city, changeCity] = useState("Budapest");
  const [status, changeStatus] = useState(false);

  const fetchCoordinates = async () => {
    let cityData = JSON.parse(localStorage.getItem("cities"));
    let selectedCity = cityData.find((item) => item.name === city);

    if (selectedCity === undefined) {
      const options = {
        method: "GET",
        headers: {
          "X-API-Key": "msBvAUb0L1qKEvpvo00jhw==TQ4M43ZJnJN8b1yj",
        },
      };
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${city}`,
        options
      );
      const data = await res.json();
      const dataObj = data[0];
      const latitude = Math.round(+dataObj.latitude * 100) / 100;
      const longitude = Math.round(+dataObj.longitude * 100) / 100;
      selectedCity = new City(city, latitude, longitude);
      cityData.push(selectedCity);
      localStorage.setItem("cities", JSON.stringify(cityData));
    }

    return selectedCity;
  };

  const fetchMeteo = async () => {
    const coordData = await fetchCoordinates();
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordData.lat}&longitude=${coordData.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,sunrise,sunset&timezone=Europe%2FLondon`
    );
    const dataObj = await res.json();
    return dataObj;
  };

  const dailyWeather = async () => {
    let now = new Date();
    let monthToday = now.getMonth();
    let dayToday = now.getDate();
    let hrToday = now.getHours();
    let minuteToday = now.getMinutes();
    console.log(dayToday, hrToday, minuteToday);
    let hourNow;
    if (String(hrToday).length === 1) {
      hourNow = `0${hrToday}:00`;
    } else {
      hourNow = `${hrToday}:00`;
    }

    let dailyResult = [];
    let hourlyResult = [];
    const data = await fetchMeteo();

    const dailyData = data.daily;
    const sunriseData = dailyData.sunrise;
    const sunrises = sunriseData.map((element) => element.slice(11));
    const sunrise = sunrises.map(
      (element) => `0${+element.slice(0, 2) + 1}:00`
    );
    const sunsetData = dailyData.sunset;
    const sunsets = sunsetData.map((element) => element.slice(11));
    const sunset = sunsets.map((element) => `${+element.slice(0, 2) + 1}:00`);
    const date = dailyData.time;
    const dailyTemperature = dailyData.temperature_2m_max;
    const dailyCode = dailyData.weathercode;

    for (let i = 0; i < 7; i++) {
      let newDailyCode;
      if (dailyCode[i] === 0) {
        newDailyCode = <WiDaySunny size={"50px"} />;
      } else if (dailyCode[i] === 1 || dailyCode[i] === 2) {
        newDailyCode = <WiDayCloudy size={"50px"} />;
      } else if (dailyCode[i] === 3) {
        newDailyCode = <WiCloudy size={"50px"} />;
      } else if (dailyCode[i] === 45 || dailyCode[i] === 48) {
        newDailyCode = <WiFog size={"50px"} />;
      } else if (
        dailyCode[i] === 51 ||
        dailyCode[i] === 53 ||
        dailyCode[i] === 55
      ) {
        newDailyCode = <WiDayShowers size={"50px"} />;
      } else if (dailyCode[i] === 56 || dailyCode[i] === 57) {
        newDailyCode = <WiDaySleet size={"50px"} />;
      } else if (
        dailyCode[i] === 61 ||
        dailyCode[i] === 63 ||
        dailyCode[i] === 65
      ) {
        newDailyCode = <WiRain size={"50px"} />;
      } else if (dailyCode[i] === 66 || dailyCode[i] === 67) {
        newDailyCode = <WiSleet size={"50px"} />;
      } else if (
        dailyCode[i] === 71 ||
        dailyCode[i] === 73 ||
        dailyCode[i] === 75
      ) {
        newDailyCode = <WiSnow size={"50px"} />;
      } else if (dailyCode[i] === 77) {
        newDailyCode = <WiSnowflakeCold size={"50px"} />;
      } else if (
        dailyCode[i] === 80 ||
        dailyCode[i] === 81 ||
        dailyCode[i] === 82
      ) {
        newDailyCode = <WiDayRain size={"50px"} />;
      } else if (dailyCode[i] === 85 || dailyCode[i] === 86) {
        newDailyCode = <WiDayRainMix size={"50px"} />;
      } else if (
        dailyCode[i] === 95 ||
        dailyCode[i] === 96 ||
        dailyCode[i] === 99
      ) {
        newDailyCode = <WiThunderstorm size={"50px"} />;
      }

      const element = new DailyUnit(
        date[i],
        Math.round(dailyTemperature[i]),
        newDailyCode
      );
      dailyResult.push(element);
    }
    addDailyInfo(dailyResult.slice());

    const hourlyData = data.hourly;
    const time = hourlyData.time;
    const timeCut = time.map((element) => element.slice(11));
    const startIndex = timeCut.findIndex((element) => element === hourNow);
    const hourlyTemperature = hourlyData.temperature_2m;
    const cloud = hourlyData.cloudcover;
    const pressure = hourlyData.surface_pressure;
    const humidity = hourlyData.relativehumidity_2m;
    const wind = hourlyData.windspeed_10m;
    const hourlyCode = hourlyData.weathercode;

    let day;
    if (
      +timeCut[startIndex].slice(0, 2) > +sunrise[0].slice(0, 2) &&
      +timeCut[startIndex].slice(0, 2) < +sunset[0].slice(0, 2)
    ) {
      day = true;
    } else {
      day = false;
    }

    let changingTime;
    let secChangingTime;
    if (day) {
      changingTime = sunset[0];
      secChangingTime = sunrise[1];
    } else {
      changingTime = sunrise[1];
      secChangingTime = sunset[1];
    }

    for (let i = startIndex; i < startIndex + 24; i++) {
      let newHourlyCode;

      if (timeCut[i] === changingTime) {
        day = !day;
      }

      if (timeCut[i] === secChangingTime) {
        day = !day;
      }

      if (hourlyCode[i] === 0) {
        if (day) {
          newHourlyCode = <WiDaySunny size={"40px"} />;
        } else {
          newHourlyCode = <WiNightClear size={"40px"} />;
        }
      } else if (hourlyCode[i] === 1 || hourlyCode[i] === 2) {
        if (day) {
          newHourlyCode = <WiDayCloudy size={"40px"} />;
        } else {
          newHourlyCode = <WiNightCloudy size={"40px"} />;
        }
      } else if (hourlyCode[i] === 3) {
        newHourlyCode = <WiCloudy size={"40px"} />;
      } else if (hourlyCode[i] === 45 || hourlyCode[i] === 48) {
        newHourlyCode = <WiFog size={"40px"} />;
      } else if (
        hourlyCode[i] === 51 ||
        hourlyCode[i] === 53 ||
        hourlyCode[i] === 55
      ) {
        if (day) {
          newHourlyCode = <WiDayShowers size={"40px"} />;
        } else {
          newHourlyCode = <WiNightShowers size={"40px"} />;
        }
      } else if (hourlyCode[i] === 56 || hourlyCode[i] === 57) {
        if (day) {
          newHourlyCode = <WiDaySleet size={"40px"} />;
        } else {
          newHourlyCode = <WiNightSleet size={"40px"} />;
        }
      } else if (
        hourlyCode[i] === 61 ||
        hourlyCode[i] === 63 ||
        hourlyCode[i] === 65
      ) {
        newHourlyCode = <WiRain size={"40px"} />;
      } else if (hourlyCode[i] === 66 || hourlyCode[i] === 67) {
        newHourlyCode = <WiSleet size={"40px"} />;
      } else if (
        hourlyCode[i] === 71 ||
        hourlyCode[i] === 73 ||
        hourlyCode[i] === 75
      ) {
        newHourlyCode = <WiSnow size={"40px"} />;
      } else if (hourlyCode[i] === 77) {
        newHourlyCode = <WiSnowflakeCold size={"40px"} />;
      } else if (
        hourlyCode[i] === 80 ||
        hourlyCode[i] === 81 ||
        hourlyCode[i] === 82
      ) {
        if (day) {
          newHourlyCode = <WiDayRain size={"40px"} />;
        } else {
          newHourlyCode = <WiNightRain size={"40px"} />;
        }
      } else if (hourlyCode[i] === 85 || hourlyCode[i] === 86) {
        if (day) {
          newHourlyCode = <WiDayRainMix size={"40px"} />;
        } else {
          newHourlyCode = <WiNightRainMix size={"40px"} />;
        }
      } else if (
        hourlyCode[i] === 95 ||
        hourlyCode[i] === 96 ||
        hourlyCode[i] === 99
      ) {
        newHourlyCode = <WiThunderstorm size={"40px"} />;
      }

      const element = new HourlyUnit(
        timeCut[i],
        Math.round(hourlyTemperature[i]),
        cloud[i],
        Math.round(pressure[i]),
        humidity[i],
        Math.round(wind[i]),
        newHourlyCode
      );
      hourlyResult.push(element);
    }
    addHourlyInfo(hourlyResult.slice());
  };

  class HourlyUnit {
    constructor(time, temperature, cloud, pressure, humidity, wind, code) {
      this.time = time;
      this.temperature = temperature;
      this.cloud = cloud;
      this.pressure = pressure;
      this.humidity = humidity;
      this.wind = wind;
      this.code = code;
    }
  }

  useEffect(() => {
    const loader = () => {
      if (!status) {
        fetchCoordinates();
        fetchMeteo();
        dailyWeather();
        changeStatus(true);
      }
    };
    loader();
  });

  class City {
    constructor(name, lat, lon) {
      this.name = name;
      this.lat = lat;
      this.lon = lon;
    }
  }

  class DailyUnit {
    constructor(date, temperature, code) {
      this.date = date;
      this.temperature = temperature;
      this.code = code;
    }
  }

  function chooseCity(event) {
    changeCity(event.target.value);
    changeStatus(false);
  }

  return (
    <div className="App">
      <Header city={city} changeCity={chooseCity} />
      <Main data={dailyArr} data2={hourlyArr} />
      <Footer />
    </div>
  );
}

export default App;
