import { useState, useEffect } from "react";
import Header from "./components/Header";
import Night from "./video/Night.mp4";
import Sun from "./video/Sunny.mp4";
import Clouds from "./video/Clouds.mp4";
import Rain from "./video/Rain.mp4";
import Snow from "./video/Snow.mp4";
import Fog from "./video/Fog.mp4";
import Thunderstorm from "./video/Thunderstorm.mp4";
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
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

function App() {
  const [dailyArr, addDailyInfo] = useState([]);
  const [hourlyArr, addHourlyInfo] = useState([]);
  const [city, changeCity] = useState("Budapest");
  const [status, changeStatus] = useState(false);
  const [background, changeBackground] = useState(Night);
  const [quantity, setQuantity] = useState(12);
  const [countingIcon, changeIcon] = useState(
    <HiOutlineChevronDoubleDown className={"btn__svg"} />
  );

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
      `https://api.open-meteo.com/v1/forecast?latitude=${coordData.lat}&longitude=${coordData.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon`
    );
    const dataObj = await res.json();
    return dataObj;
  };

  const dailyWeather = async () => {
    let now = new Date();
    let hrToday = now.getHours();

    console.log(hrToday);
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
    const dailyMinTemperature = dailyData.temperature_2m_min;
    const dailyCode = dailyData.weathercode;

    for (let i = 0; i < 7; i++) {
      let newDailyCode;
      let info;
      if (dailyCode[i] === 0) {
        newDailyCode = <WiDaySunny className={"daily__svg"} />;
        info = "Sunny";
      } else if (dailyCode[i] === 1 || dailyCode[i] === 2) {
        newDailyCode = <WiDayCloudy className={"daily__svg"} />;
        info = "Cloudy";
      } else if (dailyCode[i] === 3) {
        newDailyCode = <WiCloudy className={"daily__svg"} />;
        info = "Overcast";
      } else if (dailyCode[i] === 45 || dailyCode[i] === 48) {
        newDailyCode = <WiFog className={"daily__svg"} />;
        info = "Fog";
      } else if (
        dailyCode[i] === 51 ||
        dailyCode[i] === 53 ||
        dailyCode[i] === 55
      ) {
        newDailyCode = <WiDayShowers className={"daily__svg"} />;
        info = "Drizzle";
      } else if (dailyCode[i] === 56 || dailyCode[i] === 57) {
        newDailyCode = <WiDaySleet className={"daily__svg"} />;
        info = "Freezing Drizzle";
      } else if (
        dailyCode[i] === 61 ||
        dailyCode[i] === 63 ||
        dailyCode[i] === 65
      ) {
        newDailyCode = <WiRain className={"daily__svg"} />;
        info = "Rain";
      } else if (dailyCode[i] === 66 || dailyCode[i] === 67) {
        newDailyCode = <WiSleet className={"daily__svg"} />;
        info = "Freezing Rain";
      } else if (
        dailyCode[i] === 71 ||
        dailyCode[i] === 73 ||
        dailyCode[i] === 75
      ) {
        newDailyCode = <WiSnow className={"daily__svg"} />;
        info = "Snow Fall";
      } else if (dailyCode[i] === 77) {
        newDailyCode = <WiSnowflakeCold className={"daily__svg"} />;
        info = "Snow Grains";
      } else if (
        dailyCode[i] === 80 ||
        dailyCode[i] === 81 ||
        dailyCode[i] === 82
      ) {
        newDailyCode = <WiDayRain className={"daily__svg"} />;
        info = "Rain Showers";
      } else if (dailyCode[i] === 85 || dailyCode[i] === 86) {
        newDailyCode = <WiDayRainMix className={"daily__svg"} />;
        info = "Snow Showers";
      } else if (
        dailyCode[i] === 95 ||
        dailyCode[i] === 96 ||
        dailyCode[i] === 99
      ) {
        newDailyCode = <WiThunderstorm className={"daily__svg"} />;
        info = "Thunderstorm";
      }

      const element = new DailyUnit(
        date[i],
        Math.round(dailyTemperature[i]),
        Math.round(dailyMinTemperature[i]),
        newDailyCode,
        info
      );
      dailyResult.push(element);
    }
    addDailyInfo(dailyResult.slice());

    const hourlyData = data.hourly;
    const time = hourlyData.time;
    const timeCut = time.map((element) => element.slice(11));
    const startIndex = timeCut.findIndex((element) => element === hourNow);
    timeCut[startIndex] = "Now";
    const hourlyTemperature = hourlyData.temperature_2m;
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

    const headerBlock = document.querySelector(".header");
    const wrapperBlock = document.querySelector(".wrapper");
    const mainBlock = document.querySelector(".main");
    const appBlock = document.querySelector(".App");
    if (day !== true) {
      clearClasses(wrapperBlock);
      clearClasses(headerBlock);
      addClass(appBlock, "night");
      addClass(mainBlock, "night-light");
    } else {
      clearClasses(wrapperBlock);
      clearClasses(headerBlock);
      clearClasses(mainBlock);
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
      let info;

      if (timeCut[i] === changingTime) {
        day = !day;
      }

      if (timeCut[i] === secChangingTime) {
        day = !day;
      }

      if (hourlyCode[i] === 0) {
        if (day) {
          newHourlyCode = <WiDaySunny className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightClear className={"hourly__svg"} />;
        }
        info = "Clear Sky";
      } else if (hourlyCode[i] === 1 || hourlyCode[i] === 2) {
        if (day) {
          newHourlyCode = <WiDayCloudy className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightCloudy className={"hourly__svg"} />;
        }
        info = "Cloudy";
      } else if (hourlyCode[i] === 3) {
        newHourlyCode = <WiCloudy className={"hourly__svg"} />;
        info = "Overcast";
      } else if (hourlyCode[i] === 45 || hourlyCode[i] === 48) {
        newHourlyCode = <WiFog className={"hourly__svg"} />;
        info = "Fog";
      } else if (
        hourlyCode[i] === 51 ||
        hourlyCode[i] === 53 ||
        hourlyCode[i] === 55
      ) {
        if (day) {
          newHourlyCode = <WiDayShowers className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightShowers className={"hourly__svg"} />;
        }
        info = "Drizzle";
      } else if (hourlyCode[i] === 56 || hourlyCode[i] === 57) {
        if (day) {
          newHourlyCode = <WiDaySleet className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightSleet className={"hourly__svg"} />;
        }
        info = "Freezing Drizzle";
      } else if (
        hourlyCode[i] === 61 ||
        hourlyCode[i] === 63 ||
        hourlyCode[i] === 65
      ) {
        newHourlyCode = <WiRain className={"hourly__svg"} />;
        info = "Rain";
      } else if (hourlyCode[i] === 66 || hourlyCode[i] === 67) {
        newHourlyCode = <WiSleet className={"hourly__svg"} />;
        info = "Freezing Rain";
      } else if (
        hourlyCode[i] === 71 ||
        hourlyCode[i] === 73 ||
        hourlyCode[i] === 75
      ) {
        newHourlyCode = <WiSnow className={"hourly__svg"} />;
        info = "Snow";
      } else if (hourlyCode[i] === 77) {
        newHourlyCode = <WiSnowflakeCold className={"hourly__svg"} />;
        info = "Snow Flakes";
      } else if (
        hourlyCode[i] === 80 ||
        hourlyCode[i] === 81 ||
        hourlyCode[i] === 82
      ) {
        if (day) {
          newHourlyCode = <WiDayRain className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightRain className={"hourly__svg"} />;
        }
        info = "Rain Showers";
      } else if (hourlyCode[i] === 85 || hourlyCode[i] === 86) {
        if (day) {
          newHourlyCode = <WiDayRainMix className={"hourly__svg"} />;
        } else {
          newHourlyCode = <WiNightRainMix className={"hourly__svg"} />;
        }
        info = "Snow Showers";
      } else if (
        hourlyCode[i] === 95 ||
        hourlyCode[i] === 96 ||
        hourlyCode[i] === 99
      ) {
        newHourlyCode = <WiThunderstorm className={"hourly__svg"} />;
        info = "Thunderstorm";
      }

      const element = new HourlyUnit(
        timeCut[i],
        Math.round(hourlyTemperature[i]),
        Math.round(pressure[i]),
        humidity[i],
        Math.round(wind[i]),
        newHourlyCode,
        info
      );
      hourlyResult.push(element);
    }
    if (
      hourlyResult[0].info === "Clear Sky" ||
      hourlyResult[0].info === "Cloudy"
    ) {
      if (day) {
        changeBackground(Sun);
        clearClasses(wrapperBlock);
      } else {
        changeBackground(Night);
        clearClasses(wrapperBlock);
      }
    } else if (hourlyResult[0].info === "Overcast") {
      changeBackground(Clouds);
      addClass(headerBlock, "night-light");
      clearClasses(wrapperBlock);
      addClass(wrapperBlock, "cloud");
    } else if (hourlyResult[0].info === "Fog") {
      changeBackground(Fog);
      addClass(headerBlock, "night-light");
      clearClasses(wrapperBlock);
      addClass(wrapperBlock, "cloud");
    } else if (
      hourlyResult[0].info === "Drizzle" ||
      hourlyResult[0].info === "Freezing Drizzle" ||
      hourlyResult[0].info === "Rain" ||
      hourlyResult[0].info === "Freezing Rain" ||
      hourlyResult[0].info === "Rain Showers"
    ) {
      changeBackground(Rain);
      clearClasses(wrapperBlock);
    } else if (
      hourlyResult[0].info === "Snow Showers" ||
      hourlyResult[0].info === "Snow" ||
      hourlyResult[0].info === "Snow Flakes"
    ) {
      changeBackground(Snow);
      clearClasses(wrapperBlock);
      addClass(wrapperBlock, "snow");
    } else if (hourlyResult[0].info === "Thunderstorm") {
      changeBackground(Thunderstorm);
      clearClasses(wrapperBlock);
    }
    addHourlyInfo(hourlyResult.slice());

    return day;
  };

  const showMoreInfo = () => {
    const popup = document.querySelector(".popup");
    if (quantity === 24) {
      changeIcon(<HiOutlineX className={"btn__svg"} />);
      popup.classList.add("popup-active");
    } else {
      setQuantity((prevValue) => prevValue + 6);
    }
  };

  const closePopup = (event) => {
    const popup = document.querySelector(".popup");
    if (
      event.target.classList.contains("popup__btn") ||
      event.target.classList.contains("popup__svg") ||
      event.target.hasAttribute("d") ||
      event.target.classList.contains("popup__close")
    ) {
      popup.classList.remove("popup-active");
    }
  };

  class HourlyUnit {
    constructor(time, temperature, pressure, humidity, wind, code, info) {
      this.time = time;
      this.temperature = temperature;
      this.pressure = pressure;
      this.humidity = humidity;
      this.wind = wind;
      this.code = code;
      this.info = info;
    }
  }

  useEffect(() => {
    const loader = async () => {
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
    constructor(date, temperature, minTemperature, code, shortInfo) {
      this.date = date;
      this.temperature = temperature;
      this.minTemperature = minTemperature;
      this.code = code;
      this.shortInfo = shortInfo;
    }
  }

  function addClass(block, classValue) {
    block.classList.add(classValue);
  }

  function clearClasses(block) {
    if (block.classList.length > 1) {
      block.classList.remove(block.classList[1]);
    }
  }

  function chooseCity(event) {
    changeCity(event.target.value);
    changeStatus(false);
    setQuantity(12);
    changeIcon(<HiOutlineChevronDoubleDown className={"btn__svg"} />);
  }

  return (
    <div className="App">
      <Header city={city} changeCity={chooseCity} background={background} />
      <Main
        data={dailyArr}
        data2={hourlyArr}
        quantity={quantity}
        show={showMoreInfo}
        icon={countingIcon}
        close={closePopup}
      />
      <Footer />
    </div>
  );
}

export default App;
