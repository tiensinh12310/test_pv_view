import React from "react";

import {
  Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

// components
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// class Component
class Toast extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      err: ''
    }
    this.ref = React.createRef();
  }
  show = () => {
    this.setState({
      open: true
    })
  }
  handleSubmit = () => {
    this.setState({
      open: false
    }, () => this.props.callback(true))
  }
  handleCancel = (data) => {
    this.setState({
      open: false
    }, () => this.props.callback(false))
  }
  render(){
    const {type, message} = this.props;

    return (
      <Snackbar
        open={this.state.open}
        autoHideDuration={5000}
        onClose={_ => this.handleCancel()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={_ => this.handleCancel()} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    )
  }
}

export default Toast
