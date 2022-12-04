import DailyElement from "./DailyElement";
import ReactElasticCarousel from "react-elastic-carousel";

const SectionDaily = ({ data }) => {
  const breakPoints = [
    { width: 300, itemsToShow: 2, itemsToScroll: 1 },
    { width: 480, itemsToShow: 3, itemsToScroll: 1 },
    { width: 680, itemsToShow: 4, itemsToScroll: 1 },
    { width: 900, itemsToShow: 5, itemsToScroll: 1 },
  ];

  return (
    <section className="main__section section">
      <h2 className="section__title"> Weather per week </h2>{" "}
      <ReactElasticCarousel
        pagination={false}
        disableArrowsOnEnd={false}
        className={"daily"}
        breakPoints={breakPoints}
      >
        {data.map((element) => (
          <DailyElement
            date={element.date}
            temperature={element.temperature}
            mintemperature={element.minTemperature}
            code={element.code}
            info={element.shortInfo}
          />
        ))}
      </ReactElasticCarousel>
    </section>
  );
};

export default SectionDaily;
