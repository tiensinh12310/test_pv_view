import React from "react";
import {Button} from "@material-ui/core";

// styles
import useStyles from "./styles";

// images
import logo from '../../../../images/logo.png';

// components

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.pageLogo}>
      <img src={logo}/>
      <h1>Lode66</h1>
    </div>
  )
}
