import React from "react";
import {Button} from "@material-ui/core";

// styles
import useStyles from "./styles";

// images
import logo from '../../../../images/logo.png';


import {useLayoutState} from "../../../../context/LayoutContext";

// components

export default function () {
  const classes = useStyles();
  const layoutState = useLayoutState();

  if (layoutState.isSidebarOpened) {
    return null;
  }

  return (
    <div className={classes.logo}>
      <img src={logo} className={classes.img}/>
      <h2 className={classes.siteName}>Interview</h2>
    </div>
  )
}
