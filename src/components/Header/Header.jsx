import Logo from "../../assets/Logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div>
          <div className="header__logo">
            <img src={Logo} alt="Warehouse Logo" />
          </div>
          <div>
            <button className="button-header">Warehouses</button>
            <button className="button-header">Inventory</button>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
