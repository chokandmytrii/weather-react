import HourlyElement from "./HourlyElement";

const SectionHourly = ({ data }) => {
  return (
    <section className="main__section section hourly">
      {data.map((element) => (
        <HourlyElement
          time={element.time}
          temperature={element.temperature}
          cloud={element.cloud}
          code={element.code}
          humidity={element.humidity}
          pressure={element.pressure}
          wind={element.wind}
        />
      ))}
    </section>
  );
};

export default SectionHourly;
