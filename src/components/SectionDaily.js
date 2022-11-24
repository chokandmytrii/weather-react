import DailyElement from "./DailyElement";

const SectionDaily = ({ data }) => {
  return (
    <section className="main__section section daily">
      {" "}
      {data.map((element) => (
        <DailyElement
          date={element.date}
          temperature={element.temperature}
          code={element.code}
        />
      ))}{" "}
    </section>
  );
};

export default SectionDaily;
