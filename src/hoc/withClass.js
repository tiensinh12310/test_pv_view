import React from 'react';

export default function(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
      return <WrappedComponent {...this.props}/>
    }
  }
}
