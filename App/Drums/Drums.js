import React, { Component } from 'react';
import Knob from 'react-canvas-knob';

import {
  Sequencer,
  Sampler,
  Filter,
  Bitcrusher,
  Gain,
} from '../../src';



export default class Drums extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showOrHideBit : 'Enable',
        bit : 8,
        knobMainGain: 100,
        mainGain: 1,
        showContainer : null,
        resolution : 16,
        bars : 1,
        kickSeq : [],
        snareSeq : [],
        hihatSeq : [],
        CowBellSeq : [],
        kickChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
        snareChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
        hihatChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
        cowBellChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },

    };
    this.selectResolution = this.selectResolution.bind(this);
    this.selectBars = this.selectBars.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeStepFromSteps = this.removeStepFromSteps.bind(this);
    this.showOrHideContainer = this.showOrHideContainer.bind(this)
  }

  handleChangeMainGain(e){
      this.setState({knobMainGain: e, mainGain: (e/100)})
  }

  selectResolution(e){

      var resolution = Number(e.target.value);
      if (this.state.bars == 4 && resolution > 8) {
          this.setState({resolution : 8, warning : true})
      }else if (this.state.bars == 2 && resolution > 16){
          this.setState({
              resolution : 4,
              warning : true
          })
      }else{
          this.setState({resolution : resolution, warning : null})
      }
  }
  selectBars(e){

      var bars = Number(e.target.value)
      if (this.state.resolution ==32  && bars != 1 ) {
          this.setState({bars : 1, warning : true})
      }else if(this.state.resolution ==16  && bars > 2 ){
          this.setState({bars : 2, warning : true})
      }else{
          this.setState({bars : bars, warning : null})
      }
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


  handleChange(e){
      var idArray = e.target.id.split(",");
      var colId = Number(idArray[0]);
      var instrument = idArray[1];
      if (instrument == "hihat") {
          var checks =  this.state.hihatChecked;
          var steps = this.state.hihatSeq;
          steps.push(colId -1);
          if(!checks[colId]){
              checks[colId] = "checked"
              this.setState({hihatChecked : checks,hihatSeq : steps})
          }else if (checks[colId] == "checked"){
              checks[colId] = null;
              this.removeStepFromSteps("hihatChecked", checks, "hihatSeq", steps, (colId-1));
          }

      }else if(instrument == "kick"){
          var checks =  this.state.kickChecked;
          var steps = this.state.kickSeq;
          steps.push(colId-1);
          if(!checks[colId]){
              checks[colId] = "checked"
              this.setState({kickChecked : checks, kickSeq : steps })
          }else if (checks[colId] == "checked"){
              checks[colId] = null;
              this.removeStepFromSteps("kickChecked", checks, "kickSeq", steps, (colId-1));
          }


      }else if (instrument == "snare"){
          var checks =  this.state.snareChecked;
          var steps = this.state.snareSeq;
          steps.push(colId-1);
          if(!checks[colId]){
              checks[colId] = "checked"
              this.setState({snareChecked : checks, snareSeq : steps })
          }else if (checks[colId] == "checked"){
              checks[colId] = null;
              this.removeStepFromSteps("snareChecked",checks, "snareSeq", steps, (colId-1));
          }


      }else if(instrument == "cowBell"){
          var checks =  this.state.cowBellChecked;
          var steps = this.state.CowBellSeq;
          if(!checks[colId]){
              steps.push(colId -1);
              checks[colId] = "checked"
              this.setState({cowBellChecked : checks, CowBellSeq : steps })
          }else if (checks[colId] == "checked"){
              checks[colId] = null;
              this.removeStepFromSteps("cowBellChecked",checks , "CowBellSeq", steps, (colId-1));
          }

      }



  }

  removeStepFromSteps(checksKey, checksProp, stepsName, steps,  step){
      function removeA(arr) {
          var what, a = arguments, L = a.length, ax;
          while (L > 1 && arr.length) {
              what = a[--L];
              while ((ax= arr.indexOf(what)) !== -1) {
                  arr.splice(ax, 1);
              }
          }
          return arr;
      }
      var  stepsProp = removeA(steps, step);
      this.setState({
          checksKey : checksProp,
          steps : stepsProp })
  }

  handleClearSequence(){
      this.setState({
          showOrHideBit : 'Enable',
          bit : 8,
          knobMainGain: 100,
          mainGain: 1,
          kickSeq : [],
          snareSeq : [],
          hihatSeq : [],
          CowBellSeq : [],
          kickChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
          snareChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
          hihatChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },
          cowBellChecked : { '1' : null, '2' : null, '3' : null, '4' : null, '5' : null, '6' : null, '7' : null, '8' : null, '9' : null, '10' : null, '11' : null, '12' : null, '13' : null, '14' : null, '15' : null,'16' : null,'17' : null,'18' : null,'19' : null,'20' : null,'21' : null,'22' : null,'23' : null,'24' : null,'25' : null,'26' : null,'27' : null,'28' : null,'29' : null,'30' : null,'31' : null,'32' : null },

      });
  }

  showOrHideContainer(){
      if(this.state.showContainer){
          this.setState({showContainer : null})
      }else {
          this.setState({showContainer : true})
      }
  }

  showOrHideSettings(){
      if(this.state.showSettings){
          this.setState({showSettings : null})
      }else {
          this.setState({showSettings : true})
      }
  }

  showOrHideBitcrusher(){
      if(this.state.showBitcrusher){
          this.setState({showBitcrusher : null})
      }else {
          this.setState({showBitcrusher : true})
      }
  }

  render() {

      var that = this;
      var columnNumber  = this.state.resolution * this.state.bars;
      var drumsSequencerStep = "";
      var hihatSequencerStep = "";
      var kickSequencerStep = "";
      var snareSequencerStep = "";
      var cowbellSequencerStep = "";
      var drumsColumns = [];
      var hihatColumns = [];
      var kickColumns = [];
      var snareColumns = [];
      var cowbellColumns = [];


      for (var i = 1; i <= columnNumber; i++) {
          drumsColumns.push({id : i});
          hihatColumns.push({id : i});
          kickColumns.push({id : i});
          snareColumns.push({id : i});
          cowbellColumns.push({id : i});

      }

      drumsSequencerStep = drumsColumns.map(function(col){
          return (
              <td id={col.id}>{col.id}</td>
          )
      })

    hihatSequencerStep = hihatColumns.map((col) => {
        return (
            <td><div id={col.id +',hihat'} className={`drum-step ${this.state.hihatChecked[col.id]}`} onClick={that.handleChange}></div></td>
        )
    })

    kickSequencerStep = kickColumns.map((col) => {
        return (
            <td><div id={col.id +',kick'} className={`drum-step ${this.state.kickChecked[col.id]}`} onClick={that.handleChange}></div></td>
        )
    })

    snareSequencerStep = snareColumns.map((col) => {
        return (
            <td><div id={col.id +',snare'} className={`drum-step  ${this.state.snareChecked[col.id]}`} onClick={that.handleChange}></div></td>
        )
    })

    cowbellSequencerStep = cowbellColumns.map((col) => {
        return (
            <td><div id={col.id +',cowBell'} className={`drum-step  ${this.state.cowBellChecked[col.id]}`} onClick={that.handleChange}></div></td>
        )
    })

    var pointerSettings = "+";
    var showSettingsContainer= {position: "absolute", top : "-10000000px"}

    if (this.state.showSettings) {
        showSettingsContainer = {background : 'none'};
        pointerSettings = '-'
    }

    var pointerBitcrusher = "+";
    var showBitcrusherContainer= {position: "absolute", top : "-10000000px"}

    if (this.state.showBitcrusher) {
        showBitcrusherContainer = {background : 'none'};
        pointerBitcrusher = '-'
    }


      var drums =

      <div id="show-container" className="section">

        <div className="gain-container">
            <p className="container-title" id="drums-settings" onClick={this.showOrHideSettings.bind(this)}>Settings {pointerSettings}</p>
            <div className='fx-container drums-color' id="drums-container" style={showSettingsContainer}>
              <div>
                 <p className="container-title">Volume</p>
                  <Knob
                  value={this.state.knobMainGain}
                  onChange={this.handleChangeMainGain.bind(this)}
                  onChangeEnd={this.handleChangeMainGain.bind(this)}
                  fgColor={'cornflowerblue'}
                  width={100}
                  height={100}
                  font={'"Bubbler One"'}
                  />
                  </div>

              <div>
                  <p>Resolution</p>
                  <div className="fx-select">
                      <select onChange={this.selectResolution} value={this.state.resolution}>
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="16">16</option>
                          <option value="32">32</option>
                      </select>
                  </div>
              </div>

              <div>
                  <p>Bars</p>
                  <div className="fx-select">
                      <select onChange={this.selectBars} value={this.state.bars}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="4">4</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>

      <div className="bit-container">
      <p className="container-title" id="drums-bitcrusher" onClick={this.showOrHideBitcrusher.bind(this)}>Bitcrusher {pointerBitcrusher}</p>
      <div className="fx-container drums-color" id="bitcrusher" style={showBitcrusherContainer}>
          <button onClick={this.showOrHideBit.bind(this)} className="btn button-primary bitcrusher-button" id="bitcrusher-button-drums">{this.state.showOrHideBit}</button>
          <select onChange={this.selectBit.bind(this)} value={this.state.bit}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
          </select>
      </div>
      </div>

      <div className="sequencer-container">
          <p className="container-title" id="drums-sequencer">Sequencer</p>
          <div id="drum-sequencer">
              <table>
                  <thead>
                    <tr className='steps-row'><td>Step</td>{drumsSequencerStep}</tr>
                  </thead>
                  <tbody>
                      <tr><td>Cowbell</td>{cowbellSequencerStep}</tr>
                      <tr><td>Hi Hat</td>{hihatSequencerStep}</tr>
                      <tr><td>Snare</td>{snareSequencerStep}</tr>
                      <tr><td>Kick</td>{kickSequencerStep}</tr>
                  </tbody>
              </table>
          </div>
      </div>

      <button onClick={this.handleClearSequence.bind(this)} className="btn button-primary" id="drums-clear-button">Clear the Sequence</button>



      <Sequencer
      resolution={this.state.resolution}
      bars={this.state.bars}
      >
      <Sampler
      sample="samples/kick.wav"
      steps={this.state.kickSeq}
      />
      <Sampler
      sample="samples/snare.wav"
      steps={this.state.snareSeq}
      />
      <Sampler
      sample="samples/cowbell.wav"
      steps={this.state.CowBellSeq}
      />
      <Sampler
      sample="samples/hihat.wav"
      steps={this.state.hihatSeq}
      />

      </Sequencer>

      </div>

      const hiddenDiv = {
          display: 'none'
      };

      let activeStyle = {
          color : 'black'
      };

      var DrumContainer = <div style={hiddenDiv}>{drums}</div>;
      if(this.state.showContainer){
          DrumContainer = <div>{drums}</div>
          activeStyle = {
              color : 'cornflowerblue'
          };

      }


      var bitCrushOnOff =
      <div>
      <Gain amount={this.state.mainGain}>
          {DrumContainer}
          </Gain>
        </div>

        if(this.state.showOrHideBit == "Disable"){
            bitCrushOnOff = <div>
            <Gain amount={this.state.mainGain}>
            <Bitcrusher bits={this.state.bit}>
                {DrumContainer}
                </Bitcrusher>
                </Gain>
              </div>
        }

    return (

        <div id="drum-container">
        <div className="title-image-container">
        <img id="drums" src="./drum3.svg"/>
        <h2 onClick={this.showOrHideContainer} style={activeStyle} className="title">DRUMS</h2>
        </div>
        <div>
        {bitCrushOnOff}
        </div>
        </div>


    );
  }
}
