import React from "react";
import { NavLink } from "react-router-dom";

import "./HeaderClass.scss";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as Login } from "../../icons/login.svg";

const Header = () => {
  return (
    <header className="headerCont">
      <div className="container ">
        <nav className="navigation">
          <NavLink to={`/`} className={"logo"}>
            <Logo className="logoIcon" />
            LearnLingo
          </NavLink>
          <span className="mainLinks">
            <NavLink to={`/`} className={`navMains`}>
              Home
            </NavLink>
            <NavLink to={`/teachers`} className={`navMains`}>
              Teachers
            </NavLink>
          </span>
          <span className="authBtns">
            <button className="loginBtn">
              <Login /> Log In
            </button>

            <button className="registrBtn">Registration</button>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
