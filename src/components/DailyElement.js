const DailyElement = ({ date, temperature, mintemperature, code, info }) => {
  return (
    <div className="daily__element">
      <p className="daily__icon"> {code} </p>{" "}
      <h3 className="daily__date"> {date} </h3>{" "}
      <p className="daily__temperature">
        {" "}
        {temperature}° C / {mintemperature}° C{" "}
      </p>{" "}
      <p className="daily__info"> {info} </p>{" "}
    </div>
  );
};

export default DailyElement;
