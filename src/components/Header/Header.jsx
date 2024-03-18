import Logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/warehouses");
  const location = useLocation();
  const params = useParams();

  const handleNavigation = (path) => {
    navigate(path);
    setActiveLink(path);
  };
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  console.log(params);
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo-container">
          <Link to="/" className="header__logo-link">
            <img
              src={Logo}
              alt="Warehouse Logo"
              className="header__logo-image"
            />
          </Link>
        </div>
        <ul className="header__button-container">
          <li
            className={`header__link-button ${
              activeLink === "/warehouses" ||
              activeLink === "/warehouses/add" ||
              activeLink === `/warehouses/`
                ? "active"
                : ""
            }`}
          >
            <Link
              to="/warehouses"
              className="header__link"
              onClick={() => handleNavigation("/warehouses")}
            >
              Warehouses
            </Link>
          </li>
          <li
            className={`header__link-button ${
              activeLink === "/inventory" || activeLink === "/inventory/add"
                ? "active"
                : ""
            }`}
          >
            <Link
              to="/inventory"
              className="header__link"
              onClick={() => handleNavigation("/inventory")}
            >
              Inventory
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
