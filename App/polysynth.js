import React, { PropTypes, Component } from 'react';
import Knob from 'react-canvas-knob';


import {
  MoogFilter,
  Reverb,
  Synth,
  Filter,
} from '../src';


export default class Polysynth extends Component {
  constructor(props) {
    super(props);

    this.state = {knobGain1: 15, knobGain2: 15, gain1: 0.15, gain2 : 0.15, filterFrequency: 1000, knobFilterFrequency: 50, filterGain: 0, filterType: 'lowpass', knobColor : 'blue'};
    this.selectFilterType = this.selectFilterType.bind(this);

  }
  handleChangeGain1(e){
      this.setState({knobGain1: e, gain1: (e/100)})

  }
  handleChangeGain2(e){

      this.setState({knobGain2: e, gain2: (e/100)})

  }

  selectFilterType(e){
      console.log(e.target);
      this.setState({filterType : e.target.value})
  }

  handleFilterFrequency(e){
      this.setState({filterFrequency : e*10 , knobFilterFrequency : e })
  }




  render() {

    return (
        <div>
        <div id="polysynth-fx-container">
            <div>
                <p>GAIN</p>
                <Knob
                  value={this.state.knobGain1}
                  onChange={this.handleChangeGain1.bind(this)}
                  onChangeEnd={this.handleChangeGain1.bind(this)}
                  fgColor={'mediumaquamarine'}
                  width={100}
                  height={100}
                  font={'"Bubbler One"'}
                />
                <Knob
                  value={this.state.knobGain2}
                  onChange={this.handleChangeGain2.bind(this)}
                  onChangeEnd={this.handleChangeGain2.bind(this)}
                  fgColor={'mediumaquamarine'}
                  width={100}
                  height={100}
                  font={'"Bubbler One"'}

                />
                </div>
                <div>
                <p>Frequency</p>
                <Knob
                  value={this.state.knobFilterFrequency}
                  onChange={this.handleFilterFrequency.bind(this)}
                  onChangeEnd={this.handleFilterFrequency.bind(this)}
                  fgColor={'mediumaquamarine'}
                  width={100}
                  height={100}
                  font={'"Bubbler One"'}
                />
                <p>FilterType</p>
                <select onChange={this.selectFilterType} value={this.state.filterType}>
                    <option value="lowpass">lowpass</option>
                    <option value="highpass">highpass</option>
                    <option value="bandpass">bandpass</option>
                    <option value="lowshelf">lowshelf</option>
                    <option value="highshelf">highshelf</option>
                    <option value="peaking">peaking</option>
                    <option value="notch">notch</option>
                    <option value="allpass">allpass</option>
                </select>
                </div>
        </div>
            <Reverb>
                    <Filter frequency={this.state.filterFrequency} type={this.state.filterType} gain={this.state.filterGain}>
                        <Synth
                            type={this.props.saw1}
                            gain={this.state.gain1}
                            steps={this.props.steps}
                        />
                        <Synth
                            type={this.props.saw2}
                            gain={this.state.gain2}
                            transpose={1}
                            steps={this.props.steps}
                        />
                    </Filter>

            </Reverb>
        </div>

    );
  }
}

Polysynth.propTypes = {
  steps: PropTypes.array,
};
