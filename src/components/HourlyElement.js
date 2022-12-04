const HourlyElement = ({
  time,
  temperature,
  code,
  humidity,
  pressure,
  wind,
  info,
}) => {
  return (
    <div className="hourly__element">
      <div className="hourly__flex hourly__code">
        <p className="hourly__icon"> {code} </p>{" "}
        <p className="hourly__description"> {info} </p>
      </div>{" "}
      <div className="hourly__flex hourly__info">
        <h4 className="hourly__time"> Time: {time} </h4>{" "}
        <h4 className="hourly__temperature"> Temperature: {temperature}° C </h4>{" "}
      </div>{" "}
      <div className="hourly__flex hourly__additional">
        <p className="hourly__wind">
          {" "}
          Wind {wind}
          km / hour{" "}
        </p>{" "}
        <p className="hourly__pressure">
          {" "}
          Pressure: {pressure}
          hPa{" "}
        </p>{" "}
        <p className="hourly__humidity"> Humidity: {humidity} % </p>{" "}
      </div>{" "}
    </div>
  );
};

export default HourlyElement;
