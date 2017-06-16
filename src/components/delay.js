// @flow
/* eslint-disable no-restricted-syntax */
import React, { PropTypes, Component } from 'react';
import Tuna from 'tunajs';
import Knob from 'react-canvas-knob';

import Slider, { Range } from 'rc-slider';
import '../../public/rc-slider.css';


type Props = {
  bypass?: number;
  children?: any;
  cutoff?: number;
  delayTime?: number;
  dryLevel?: number;
  feedback?: number;
  wetLevel?: number;
};

type Context = {
  audioContext: Object;
  connectNode: Object;
};

export default class Delay extends Component {
  connectNode: Object;
  context: Context;
  props: Props;
  static propTypes = {
    bypass: PropTypes.number,
    children: PropTypes.node,
    cutoff: PropTypes.number,
    delayTime: PropTypes.number,
    dryLevel: PropTypes.number,
    feedback: PropTypes.number,
    wetLevel: PropTypes.number,
  };
  static defaultProps = {
    bypass: 0,
    cutoff: 2000,
    delayTime: 150,
    dryLevel: 1,
    feedback: 0.45,
    wetLevel: 0.25,
  };
  static contextTypes = {
    audioContext: PropTypes.object,
    connectNode: PropTypes.object,
  };
  static childContextTypes = {
    audioContext: PropTypes.object,
    connectNode: PropTypes.object,
  };
  constructor(props: Props, context: Context) {
    super(props);
    this.state = {value: 50};

    const tuna = new Tuna(context.audioContext);

    this.connectNode = new tuna.Delay({
      feedback: props.feedback,
      delayTime: props.delayTime,
      wetLevel: props.wetLevel,
      dryLevel: props.dryLevel,
      cutoff: props.cutoff,
      bypass: props.bypass,
    });

    this.connectNode.connect(context.connectNode);
  }
  getChildContext(): Object {
    return {
      ...this.context,
      connectNode: this.connectNode,
    };
  }
  handleVal(e){
      console.log("click");
      console.log(e.target.value);
      var time;
      var value = e.target.value;
      if (value = 2) {
          time = 1000
      }else if (value = 1){
          time = 500
      }else if (value = 0.5){
          time = 250
      }else {
          time = 125;
      }


      this.connectNode.delayTime  = time
  }
  componentWillReceiveProps(nextProps: Props) {
    for (const prop in nextProps) {
      if (this.connectNode[prop]) {
        this.connectNode[prop] = nextProps[prop];
      }
    }
  }
  componentWillUnmount() {
    this.connectNode.disconnect();
  }
  handleChange = (newValue) => {
        this.connectNode.feedback = newValue / 100;
        this.setState({value: newValue});
  };
  render() {
      const wrapperStyle = { width: 400, margin: 50 };
    return (
        <div>
        <h1>DELAY</h1>
        <Slider />
        <Range />
        <Knob
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          onChangeEnd={this.handleChange.bind(this)}
        />
        <input type="button" value="2" onClick={this.handleVal.bind(this)}/>
        <input type="button" value="1" onClick={this.handleVal.bind(this)}/>
        <input type="button" value="0.5" onClick={this.handleVal.bind(this)}/>
        <input type="button" value="0.25" onClick={this.handleVal.bind(this)}/>
        <span>{this.props.children}</span>;
        </div>
    );
  }
}
