import React from "react";
import ReactDOM from 'react-dom';

// components
import withClass from "../hoc/withClass";

import CustomAlert from "../components/Alert";
import Toast from "../components/Toast";
import CustomModal from "../components/Modal/";

export default {
  error: function(message){
    return new Promise(function(resolve, reject){
      var element = ReactDOM.render(
        <Toast
          message={message}
          type="error"
          callback={resolve}>
        </Toast>, document.getElementById('toast')
      )
      element.show()
    })
  },
  success: function(message){
    return new Promise(function(resolve, reject){
      var element = ReactDOM.render(
        <Toast
          message={message}
          type="success"
          callback={resolve}>
        </Toast>, document.getElementById('toast')
      )
      element.show()
    })
  },
  info: function(message){
    return new Promise(function(resolve, reject){
      var element = ReactDOM.render(
        <Toast
          message={message}
          type="info"
          callback={resolve}>
        </Toast>, document.getElementById('toast')
      )
      element.show()
    })
  },
  warning: function(message){
    return new Promise(function(resolve, reject){
      var element = ReactDOM.render(
        <Toast
          message={message}
          type="warning"
          callback={resolve}>
        </Toast>, document.getElementById('toast')
      )
      element.show()
    })
  },
  alert: function(title = '', content, config = {}) {
    return new Promise(function(resolve, reject){
      var element = ReactDOM.render(
        <CustomAlert
          title={title}
          content={content}
          config={config}
          callback={resolve}>
        </CustomAlert>, document.getElementById('alert')
      )
      element.show()
    })
  },
  modal: function(title = '', Component, props = {}, config = {}, configStyles = {}) {
    try{
      return new Promise(function(resolve, reject){
        Component = withClass(Component)
        var element = ReactDOM.render(
            <CustomModal
                title={title}
                Component={Component}
                props={props}
                config={config}
                configStyles={configStyles}
                callback={resolve}>
            </CustomModal>, document.getElementById('modal')
        )
        element.show()
      })
    }catch(e){
      console.log(e)
    }
  },
}
