import React, {useState} from 'react';

import {
  Person as AccountIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

import {
  useHistory
} from 'react-router-dom';

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

import {Typography} from "../../../Wrappers";

// contexts
import {useUserDispatch, signOut, useUserState} from "../../../../context/UserContext";

import useStyles from '../../styles';

export default function _Menu(props) {
  const classes = useStyles();

  var userDispatch = useUserDispatch();
  var {user} = useUserState();

  // local
  var [profileMenu, setProfileMenu] = useState(null);

  const history = useHistory();

  const handleClose = () => {
    setProfileMenu(false);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <IconButton
        aria-haspopup="true"
        color="inherit"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"
        onClick={e => setProfileMenu(e.currentTarget)}
      >
        <AccountIcon classes={{root: classes.headerIcon}}/>
      </IconButton>

      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{paper: classes.profileMenu}}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
            {localStorage.accountName && localStorage.accountName.toUpperCase()}
          </Typography>
        </div>
        <Divider/>
        <MenuItem onClick={() => signOut(userDispatch, history)} className={classes.profileMenuIcon}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText primary="Đăng xuất"/>
        </MenuItem>
      </Menu>
    </>
  )
}
