const HourlyElement = ({
  time,
  temperature,
  cloud,
  code,
  humidity,
  pressure,
  wind,
}) => {
  return (
    <div className="hourly__element">
      <p className="hourly__icon"> {code} </p>
      <h4 className="hourly__time">{time}</h4>
      <h4 className="hourly__temperature">Temperature: {temperature}</h4>
      <p className="hourly__wind">Wind speed {wind} km/hour</p>
      <p className="hourly__cloud">Cloud coverage {cloud}%</p>
      <p className="hourly__pressure">Pressure: {pressure} hPa</p>
      <p className="hourly__humidity">Humidity: {humidity}%</p>
    </div>
  );
};

export default HourlyElement;
