import React from 'react';
import Knob from 'react-canvas-knob';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 50};
  }

  handleChange = (newValue) => {
    this.setState({value: newValue});
  };
  render() {
    return (
      <Knob
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        onChangeEnd={this.handleChange.bind(this)}
    );
  }
}
