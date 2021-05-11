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

  return (
    <div className={classes.logo}>
      <img src={logo} className={classes.img}/>
      {layoutState.isSidebarOpened && <h2 className={classes.siteName}>Lode66</h2>}
    </div>
  )
}
