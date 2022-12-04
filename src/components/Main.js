import SectionDaily from "./SectionDaily";
import SectionHourly from "./SectionHourly";

const Main = ({ data, data2, quantity, show, icon, close }) => {
  return (
    <main className="main">
      <div className="wrapper"> </div>{" "}
      <div className="container">
        <SectionDaily data={data} />{" "}
        <SectionHourly
          data={data2}
          quantity={quantity}
          show={show}
          icon={icon}
          close={close}
        />{" "}
      </div>{" "}
    </main>
  );
};

export default Main;
