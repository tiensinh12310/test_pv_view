import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'

// components

// providers
import { ThemeProvider } from "@material-ui/core";
import Themes from '../../themes'

// class Component
class CustomModal extends React.Component {
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
    if(this.ref && this.ref.current){
      const component = this.ref.current;

      return Promise.resolve()
        .then( () => {
          if(typeof component.submit == 'function'){
            return component.submit();
          }
        })
        .then( (data) => {
          this.setState({open: false})
          this.props.callback(data)
        })
        .catch( (e) => {
          console.log(e)
        })
    }

    this.setState({open: false})
    return Promise.resolve(true)
  }
  handleCancel = (data) => {
    this.setState({
      open: false
    }, () => {
      this.props.callback(data)
    })
  }
  render(){
    const {props, Component, title , config, configStyles} = this.props;

    const styles = {};

    if(configStyles.noPadding){
      styles.padding = 0;
    }

    return (
      <Dialog open={this.state.open}
              onClose={() => this.handleCancel()}
              aria-labelledby="form-dialog-title"
              BackdropProps={{
                classes: {
                  root: 'backdropModal'
                }
              }}
              {...config}
      >
        {title && <DialogTitle id="form-dialog-title">{title}</DialogTitle>}
        <DialogContent  style={styles}>
          <ThemeProvider theme={Themes.default}>
            <Component ref={this.ref} {...props} callback={data => this.handleCancel(data)}/>
          </ThemeProvider>
        </DialogContent>
      </Dialog>
    )
  }
}

///////////////////////////////
function isFunctionComponent(component) {
  return typeof component === 'function' // can be various things
    && !(
      // native arrows don't have prototypes
      component.prototype  &&
      // special property
      component.prototype.isReactComponent
    )
}


export default CustomModal
