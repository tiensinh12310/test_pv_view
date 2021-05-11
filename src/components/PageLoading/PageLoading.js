import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// styles
import useStyles from "./styles";

// components
import {Typography} from "../Wrappers";
import Logo from './components/Logo/Logo'

export default function PageLoading(props) {
  var classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <Logo/>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  );
}
