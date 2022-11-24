const DailyElement = ({ date, temperature, code }) => {
  return (
    <div className="daily__element">
      <p className="daily__icon"> {code} </p>
      <h3 className="daily__date"> {date} </h3>{" "}
      <p className="daily__temperature"> Temperature: {temperature} </p>{" "}
    </div>
  );
};

export default DailyElement;
