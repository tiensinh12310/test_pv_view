import React, {useState} from 'react';

import {
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";


import Notification from "../../../Notification";
import {Badge} from "../../../Wrappers";

import {
  NotificationsNone as NotificationsIcon
} from "@material-ui/icons";

import useStyles from '../../styles';
import {useUserState} from "../../../../context/UserContext";

const notifications = [
  {id: 0, color: "warning", message: "Check out this awesome ticket"},
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Notifications() {
  const classes = useStyles();

  var {user} = useUserState();

  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);

  if (!user) {
    return null;
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="mail-menu"
        onClick={e => {
          setNotificationsMenu(e.currentTarget);
          setIsNotificationsUnread(false);
        }}
        className={classes.headerMenuButton}
      >
        <Badge
          badgeContent={isNotificationsUnread ? notifications.length : null}
          color="warning"
        >
          <NotificationsIcon classes={{root: classes.headerIcon}}/>
        </Badge>
      </IconButton>

      <Menu
        id="notifications-menu"
        open={Boolean(notificationsMenu)}
        anchorEl={notificationsMenu}
        onClose={() => setNotificationsMenu(null)}
        className={classes.headerMenu}
        disableAutoFocusItem
      >
        {notifications.map(notification => (
          <MenuItem
            key={notification.id}
            onClick={() => setNotificationsMenu(null)}
            className={classes.headerMenuItem}
          >
            <Notification {...notification} typographyVariant="inherit"/>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
