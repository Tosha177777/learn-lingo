import { Button, Popover } from '@mui/material';
import PopUp from 'components/PopUp/PopUp';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/selector';

const SignedUser = () => {
  const user = useSelector(selectAuthUserData);
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {popupState => (
          <div>
            <Button
              color="inherit"
              variant="contained"
              style={{
                backgroundColor: 'inherit',
                border: 'none',
                boxShadow: 'none',
                paddingRight: 0,
              }}
              {...bindTrigger(popupState)}
            >
              <span>{user.email}</span>
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                style: {
                  width: '118px',
                  height: '88px',

                  marginTop: '2px',
                },
              }}
            >
              <PopUp />
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  );
};

export default SignedUser;
