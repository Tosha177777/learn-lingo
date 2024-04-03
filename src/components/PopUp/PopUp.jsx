import React from 'react';
import { ReactComponent as Logout } from '../../icons/login.svg';
import './Popup.scss';
import { useDispatch } from 'react-redux';
import { LogoutThunk } from '../../redux/operations';
import { authFB } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from 'icons/star.svg';

const PopUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogout = async () => {
    await dispatch(LogoutThunk(authFB));
    nav('/');
  };

  return (
    <div className="styledPopover">
      <Link to={`/favourites`} className="fav">
        <Star />
        <span className="styledText fav">Favourites</span>
      </Link>
      <button className="styledBtn" onClick={handleLogout}>
        <Logout />
        <span className="styledText">Log out</span>
      </button>
    </div>
  );
};

export default PopUp;
