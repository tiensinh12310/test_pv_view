import React, {
  useEffect,
  useState
} from "react";

import {
  Collapse,
  IconButton,
} from "@material-ui/core";

import {
  Close as CloseIcon,
} from '@material-ui/icons';

import {
  Alert
} from '@material-ui/lab'


// class Component
function AlertCard({severity, message, duration}) {
  const [open, setOpen] = React.useState(true);

  // auto close
  useEffect(() => {
    let mounted = true;
    let timeOutId = null;
    if(duration){
      timeOutId = setTimeout(() => {
        setOpen(false);
      }, duration)
    }
    return function () {
      mounted = false;
      if(timeOutId){
        clearTimeout(timeOutId)
      }
    }
  }, [])

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  )
}

export default AlertCard
