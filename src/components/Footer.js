const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__part">
        Created by <span className="footer__author">Chokan Dmytrii</span>
      </div>
      <div className="footer__part">
        <p className="footer__link-info">
          Information about weather was taken from{" "}
          <a className="footer__link" href="https://open-meteo.com/en/docs#">
            this weather API
          </a>
        </p>
        <p className="footer__link-info">
          Information about city was taken from{" "}
          <a className="footer__link" href="https://api-ninjas.com/api/city">
            this city API
          </a>
        </p>
      </div>
      <div className="footer__part">Please contact me by email!</div>
    </footer>
  );
};

export default Footer;
