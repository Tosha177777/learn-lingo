import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './HeaderClass.scss';
import { ReactComponent as Logo } from '../../icons/logo.svg';
import { ReactComponent as Login } from '../../icons/login.svg';
import LoginModal from 'components/Login/LoginModal';
import RegisterModal from 'Reg/RegisterModal';
import { useSelector } from 'react-redux';
import { selectAuthIsSignedIn, selectAuthUserData } from '../../redux/selector';

const Header = () => {
  const [isOpenedLog, setIsOpenedLog] = useState(false);
  const [isOpenedReg, setIsOpenedReg] = useState(false);

  const auth = useSelector(selectAuthIsSignedIn);
  const user = useSelector(selectAuthUserData);

  const onRegToggleModal = () => {
    setIsOpenedReg(!isOpenedReg);
  };

  const onLoginToggleModal = () => {
    setIsOpenedLog(!isOpenedLog);
  };

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
            <span>{user.email}</span>
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
        </nav>
      </div>
      {isOpenedLog && <LoginModal onClose={onLoginToggleModal} />}
      {isOpenedReg && <RegisterModal onClose={onRegToggleModal} />}
    </header>
  );
};

export default Header;
