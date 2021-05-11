import React, {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Container
} from "@material-ui/core";


import {
  Menu as MenuIcon,
} from "@material-ui/icons";


import classNames from "classnames";
import clsx from 'clsx';

// styles
import useStyles from "./styles";
import {useTheme} from "@material-ui/styles";

// components
import Logo from "./components/Logo/Logo";
import _Menu from "./components/Menu/Menu";
import Notifications from "./components/Notifications/Notifications";
import FormLoginInline from "./components/FormLogin/FormLogin";

// context
import {
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutDispatch = useLayoutDispatch();

  // local
  var theme = useTheme();
  var [isPermanent, setPermanent] = useState(true);

  const location = useLocation();

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <AppBar position="fixed" className={clsx(classes.appBar, {
      [classes.appBarNoTransparent]: !props.transparent
    })} elevation={0}>
      <Container>
        <Toolbar className={clsx(classes.toolbar, {
          [classes.toolbarLarge]: location.pathname == "/app/home",
        })}>
          {!isPermanent && <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          </IconButton>}

          <div className={classes.grow}>
            <Logo/>
          </div>

          <Notifications/>
          <FormLoginInline/>
          <_Menu/>
        </Toolbar>
      </Container>
    </AppBar>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md + 400;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}
