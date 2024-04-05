import React, { useEffect, useState } from 'react';
import './Burger.scss';
import { Link } from 'react-router-dom';
const BurgerMenu = ({ onLog, onReg }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <button className="burger-menu-btn" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`full-page-burger-menu ${isOpen ? 'open' : ''}`}>
        <div className="burger-menu-content">
          <ul className="burger-menu-list">
            <li className="burger-menu-item">
              <Link to={`/`} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li className="burger-menu-item">
              <Link to={`/teachers`} onClick={toggleMenu}>
                Teachers
              </Link>
            </li>
            <li className="burger-menu-item">
              <button type="button" onClick={onLog}>
                Login
              </button>
            </li>
            <li className="burger-menu-item">
              <button type="button" onClick={onReg}>
                Registration
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
