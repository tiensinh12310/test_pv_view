import React, {useState, useEffect} from "react";
import {Drawer, IconButton, List} from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
  Group as AccountMultiIcon
} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  closeSidebar,
  openSidebar
} from "../../context/LayoutContext";
import Logo from "./components/Logo/Logo";


function Sidebar({location}) {
  var classes = useStyles();

  // global
  var {isSidebarOpened} = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  return (
    <Drawer
      className={classNames(classes.drawer)}
      onBackdropClick={() => closeSidebar(layoutDispatch)}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar}>
        <Logo/>
      </div>
    </Drawer>
  );
}

export default withRouter(Sidebar);
