import HeaderOption from "./HeaderOption";
const cities = [
  "Budapest",
  "Bucharest",
  "Vienna",
  "Brussels",
  "Sofia",
  "Sarajevo",
  "Zagreb",
  "Prague",
  "Copenhagen",
  "Tallinn",
  "Helsinki",
  "Paris",
  "Berlin",
  "Athens",
  "Dublin",
  "Rome",
  "Riga",
  "Vilnius",
  "Monaco",
  "Podgorica",
  "Amsterdam",
  "Oslo",
  "Warsaw",
  "Lisbon",
  "Belgrade",
  "Ljubljana",
  "Madrid",
  "Stockholm",
  "Bern",
  "Kyiv",
  "London",
  "Bratislava",
];

const Header = ({ city, changeCity }) => {
  return (
    <header className="header">
      <div className="header__element city">
        <p className="city__pointer"> Current city </p>{" "}
        <h2 className="city__name"> {city} </h2>{" "}
      </div>{" "}
      <form className="header__element form">
        <label className="label">
          <h3 className="label__title"> Please select city </h3>{" "}
          <select onChange={changeCity} className="select">
            {" "}
            {cities.map((element) => (
              <HeaderOption city={element} />
            ))}{" "}
          </select>{" "}
        </label>{" "}
      </form>{" "}
    </header>
  );
};

export default Header;
