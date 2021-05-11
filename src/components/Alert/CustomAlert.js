import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core'
// components

// class Component
class CustomAlert extends React.Component {
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
    const {title, content , config} = this.props;

    return (
      <Dialog open={this.state.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title" {...config}>
        {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
        <DialogContent>
          {React.isValidElement(content) ? content : <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default CustomAlert
