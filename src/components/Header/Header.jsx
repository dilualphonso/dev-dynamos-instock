import Logo from "../../assets/Logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  <header className="header">
    <Link to="/">
      <div className="header__logo">
        <img src={Logo} alt="Warehouse Logo" />
      </div>
    </Link>
  </header>;
};

export default Header;
