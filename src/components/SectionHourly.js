import HourlyElement from "./HourlyElement";
import { HiOutlineX } from "react-icons/hi";

const SectionHourly = ({ data, quantity, show, icon, close }) => {
  return (
    <section className="main__section section">
      <h2 className="section__title"> Weather per hour </h2>{" "}
      <div className="hourly">
        {" "}
        {data.slice(0, quantity).map((element) => (
          <HourlyElement
            time={element.time}
            temperature={element.temperature}
            code={element.code}
            humidity={element.humidity}
            pressure={element.pressure}
            wind={element.wind}
            info={element.info}
          />
        ))}{" "}
      </div>{" "}
      <div className="btn-wrapper" onClick={show}>
        <div className="hourly__btn btn" type="button">
          <span className="btn__text"> Show more </span> {icon}{" "}
        </div>{" "}
      </div>{" "}
      <div className="popup">
        <div className="popup-wrapper">
          <h4 className="popup__title"> Sorry! </h4>{" "}
          <p className="popup__text">
            After 24 hours prediction is a subject to change!
          </p>{" "}
          <button onClick={close} className="popup__btn">
            OK{" "}
          </button>{" "}
          <button onClick={close} className="popup__close">
            <HiOutlineX className={"popup__svg"} />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

export default SectionHourly;
