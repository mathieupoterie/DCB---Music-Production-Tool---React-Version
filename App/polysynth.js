import React, { PropTypes, Component } from 'react';
import Knob from 'react-canvas-knob';


import {
    Gain,
    MoogFilter,
    Bitcrusher,
    Reverb,
    Chorus,
    Synth,
    LFO,
    Filter,
} from '../src';


export default class Polysynth extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showOrHideBit : 'Enable',
        knobGainSaw1: 15,
        knobGainSaw2: 15,
        gain1: 0.15,
        gain2 : 0.15,
        filterFrequency: 0,
        knobFilterFrequency: 0,
        filterGain: 0,
        filterType: 'highpass',
        filterQ : 0,
        knobFilterQ : 0,
        saw1 : "sine",
        saw2 : "sine",
        chorusRate : 1.5,
        knobChorusRate : 15,
        fgColor : 'mediumaquamarine',
        bit : 8,
        disableFx : "Enable"
    };
    this.selectFilterType = this.selectFilterType.bind(this);
  }
  handleChangeGainSaw1(e){
      this.setState({knobGainSaw1: e, gain1: (e/100)})

  }
  handleChangeGainSaw2(e){

      this.setState({knobGainSaw2: e, gain2: (e/100)})

  }

  selectFilterType(e){
      if (e.target.value == "lowpass") {
          this.setState({filterType : e.target.value, knobFilterFrequency : 100 - this.state.knobFilterFrequency, filterFrequency : 7500 - this.state.filterFrequency})
      }else {
          this.setState({filterType : e.target.value, knobFilterFrequency : 100 - this.state.knobFilterFrequency, filterFrequency : 7500 - this.state.filterFrequency})
      }
  }

  handleFilterFrequency(e){
      this.setState({filterFrequency : e*75 , knobFilterFrequency : e })
  }

  handleFilterQ(e){
      this.setState({filterQ : e/4 , knobFilterQ : e })
  }

  selectSaw1(e){

      var sawType = e.target.value;
      this.setState({ saw1 : sawType})
  }


  selectSaw2(e){

      var sawType = e.target.value;
      this.setState({ saw2 : sawType})
  }

  selectBit(e){
      this.setState({bit : Number(e.target.value)})
  }

  showOrHideBit(){
      if (this.state.showOrHideBit == "Disable") {
          this.setState({showOrHideBit : "Enable"})
      }else {
          this.setState({showOrHideBit : "Disable"})
      }
  }



  handleChorusRate(e){
      if (e == 0) {
          this.setState({chorusRate : 1 , knobChorusRate : e , disableFx: "Disable" , disableChorus :  true, fgColor : 'grey'})
      }else {
         this.setState({chorusRate : e/10 , knobChorusRate : e , disableFx : "Enable",disableChorus : false, fgColor : 'mediumaquamarine'})
      }

  }

  showOrHideSaw(){
      if(this.state.showSaw){
          this.setState({showSaw : null})
      }else {
          this.setState({showSaw : true})
      }
  }

  showOrHideBitcrusher(){
      if(this.state.showBitcrusher){
          this.setState({showBitcrusher : null})
      }else {
          this.setState({showBitcrusher : true})
      }
  }

  showOrHideFilter(){
      if(this.state.showFilter){
          this.setState({showFilter : null})
      }else {
          this.setState({showFilter : true})
      }
  }

  showOrHideChorus(){
      if(this.state.showChorus){
          this.setState({showChorus : null})
      }else {
          this.setState({showChorus : true})
      }
  }






  render() {

      var SynthChorus = <div><Chorus
         delay= {0.0045}
         feedback= {0.2}
         rate= {this.state.chorusRate}>
          <Filter frequency={this.state.filterFrequency} type={this.state.filterType} gain={this.state.filterGain} Q={this.state.filterQ}>
              <Synth
                  type={this.state.saw1}
                  gain={this.state.gain1}
                  steps={this.props.steps}
              />
              <Synth
                  type={this.state.saw2}
                  gain={this.state.gain2}
                  transpose={1}
                  steps={this.props.steps}
              />
          </Filter>
      </Chorus>
      </div>

      if (this.state.disableChorus) {
            SynthChorus = <div>
                <Filter frequency={this.state.filterFrequency} type={this.state.filterType} gain={this.state.filterGain} Q={this.state.filterQ}>
                    <Synth
                        type={this.state.saw1}
                        gain={this.state.gain1}
                        steps={this.props.steps}
                    />
                    <Synth
                        type={this.state.saw2}
                        gain={this.state.gain2}
                        transpose={1}
                        steps={this.props.steps}
                    />
                </Filter>
            </div>
      }

      var bitCrushOnOff =
        <div>
            <Reverb>
                {SynthChorus}
            </Reverb>
        </div>

        if(this.state.showOrHideBit == "Disable"){
            bitCrushOnOff = <div>
            <Bitcrusher bits={this.state.bit}>
                    <Reverb>
                        {SynthChorus}
                    </Reverb>
                </Bitcrusher>
              </div>
        }

        var pointerSaw = "+";
        var showSawContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showSaw) {
            showSawContainer = {background : 'none'};
            pointerSaw = '-'
        }

        var pointerBitcrusher = "+";
        var showBitcrusherContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showBitcrusher) {
            showBitcrusherContainer = {background : 'none'};
            pointerBitcrusher = '-'
        }

        var pointerFilter = "+";
        var showFilterContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showFilter) {
            showFilterContainer = {background : 'none'};
            pointerFilter = '-'
        }

        var pointerChorus = "+";
        var showChorusContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showChorus) {
            showChorusContainer = {background : 'none'};
            pointerChorus = '-'
        }
    return (
        <div>
            <div id="polysynth-fx-container" id="chords-container">
            <h4 className="container-title chords-titles" onClick={this.showOrHideSaw.bind(this)}>Saw  {pointerSaw}</h4>
                <div id="saw-container" className='fx-container chords-color' style={showSawContainer}>
                    <div>
                        <p>Saw 1</p>
                        <select onChange={this.selectSaw1.bind(this)} value={this.state.saw1}>
                            <option value="sine">sine</option>
                            <option value="square">square</option>
                            <option value="triangle">triangle</option>
                            <option value="sawtooth">sawtooth</option>
                        </select>

                        <p>Gain</p>
                        <Knob
                        value={this.state.knobGainSaw1}
                        onChange={this.handleChangeGainSaw1.bind(this)}
                        onChangeEnd={this.handleChangeGainSaw1.bind(this)}
                        fgColor={'mediumaquamarine'}
                        width={100}
                        height={100}
                        font={'"Bubbler One"'}
                        />

                    </div>

                    <div>

                        <p>Saw 2</p>
                        <select onChange={this.selectSaw2.bind(this)} value={this.state.saw2}>
                            <option value="sine">sine</option>
                            <option value="square">square</option>
                            <option value="triangle">triangle</option>
                            <option value="sawtooth">sawtooth</option>
                        </select>
                        <p>Gain</p>
                        <Knob
                          value={this.state.knobGainSaw2}
                          onChange={this.handleChangeGainSaw2.bind(this)}
                          onChangeEnd={this.handleChangeGainSaw2.bind(this)}
                          fgColor={'mediumaquamarine'}
                          width={100}
                          height={100}
                          font={'"Bubbler One"'}/>

                    </div>


                </div>

                <div className="bit-container">
                    <h4 className="container-title chords-titles" onClick={this.showOrHideBitcrusher.bind(this)}>Bitcrusher {pointerBitcrusher}</h4>
                    <div className="fx-container chords-color" id="bitcrusher" style={showBitcrusherContainer}>
                        <button onClick={this.showOrHideBit.bind(this)} className="btn button-primary bitcrusher-button" id="bitcrusher-button-chords">{this.state.showOrHideBit}</button>
                        <select id="select-items" onChange={this.selectBit.bind(this)} value={this.state.bit}>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                        </select>
                    </div>
                </div>

                    <div className="filter-chords-container">
                    <h4 className="container-title chords-titles" onClick={this.showOrHideFilter.bind(this)}>Filter {pointerFilter}</h4>
                    <div className="fx-container chords-color" style={showFilterContainer}>
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
                        </div>
                        <div>
                            <p>Q</p>
                            <Knob
                              value={this.state.knobFilterQ}
                              onChange={this.handleFilterQ.bind(this)}
                              onChangeEnd={this.handleFilterQ.bind(this)}
                              fgColor={'mediumaquamarine'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>
                        <div>
                            <p>FilterType</p>
                            <select className="select-items" onChange={this.selectFilterType} value={this.state.filterType}>
                                <option value="lowpass">lowpass</option>
                                <option value="highpass">highpass</option>
                            </select>
                        </div>
                    </div>
                </div>

                    <div className="chorus-container">
                        <h4 className="container-title chords-titles" id="chords-filter" onClick={this.showOrHideChorus.bind(this)}>Chorus {this.state.disableFx} {pointerChorus}</h4>
                        <div className="fx-select fx-container chords-color" style={showChorusContainer}>
                            <div>
                                <p>Rate</p>
                                <Knob
                                  value={this.state.knobChorusRate}
                                  onChange={this.handleChorusRate.bind(this)}
                                  onChangeEnd={this.handleChorusRate.bind(this)}
                                  fgColor={this.state.fgColor}
                                  width={100}
                                  height={100}
                                  font={'"Bubbler One"'}

                                />
                            </div>
                        </div>
                    </div>

                </div>
                {bitCrushOnOff}
        </div>

    );
  }
}

Polysynth.propTypes = {
  steps: PropTypes.array,
};
