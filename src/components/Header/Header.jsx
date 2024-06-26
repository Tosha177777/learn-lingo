import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderClass.scss';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import { ReactComponent as Login } from '../../icons/login.svg';
import LoginModal from 'components/Login/LoginModal';
import RegisterModal from 'components/Reg/RegisterModal';
import { useSelector } from 'react-redux';
import { selectAuthIsSignedIn } from '../../redux/selector';
import SignedUser from '../SignedUser/SignedUser';
import Burger from 'components/Burger/Burger';

const Header = () => {
  const [isOpenedLog, setIsOpenedLog] = useState(false);
  const [isOpenedReg, setIsOpenedReg] = useState(false);

  const auth = useSelector(selectAuthIsSignedIn);

  useEffect(() => {
    if (isOpenedReg || isOpenedLog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpenedReg, isOpenedLog]);

  const onRegToggleModal = () => {
    setIsOpenedReg(!isOpenedReg);
  };

  const onLoginToggleModal = () => {
    setIsOpenedLog(!isOpenedLog);
  };

  const currentPage = window.location.pathname;
  const menuItems = document.querySelectorAll('.navMains');

  menuItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.classList.add('active');
    }
  });

  return (
    <header className="headerCont">
      <div className="container ">
        <nav className="navigation">
          <NavLink to={`/`} className={'logo'}>
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
          {auth ? (
            <SignedUser />
          ) : (
            <span className="authBtns">
              <button className="loginBtn" onClick={onLoginToggleModal}>
                <Login /> Log In
              </button>
              <button className="registrBtn" onClick={onRegToggleModal}>
                Registration
              </button>
            </span>
          )}
          {!auth && (
            <Burger onLog={onLoginToggleModal} onReg={onRegToggleModal} />
          )}
        </nav>
      </div>
      {isOpenedLog && <LoginModal onClose={onLoginToggleModal} />}
      {isOpenedReg && <RegisterModal onClose={onRegToggleModal} />}
    </header>
  );
};

export default Header;
