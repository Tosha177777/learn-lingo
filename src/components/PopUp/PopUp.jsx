import React from 'react';
import { ReactComponent as Logout } from '../../icons/login.svg';
import './Popup.scss';

const PopUp = () => {
  return (
    <div className="styledPopover">
      <button className="styledBtn">
        <Logout />
        <span className="styledText">Log out</span>
      </button>
    </div>
  );
};

export default PopUp;
