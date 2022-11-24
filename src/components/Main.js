import SectionDaily from "./SectionDaily";
import SectionHourly from "./SectionHourly";

const Main = ({ data, data2 }) => {
  return (
    <main className="main">
      <SectionDaily data={data} />
      <SectionHourly data={data2} />
    </main>
  );
};

export default Main;
