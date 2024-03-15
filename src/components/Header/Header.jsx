import Logo from "../../assets/logo/InStock-Logo_1x.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/warehouses");

  const handleNavigation = (path) => {
    navigate(path);
    setActiveLink(path);
  };
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
              activeLink === "/warehouses" ? "active" : ""
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
              activeLink === "/inventory" ? "active" : ""
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
