import React, { Component } from 'react';

import {
  Sequencer,
  Sampler,
  Filter,
} from '../../src';



export default class Drums extends Component {
  constructor(props) {
    super(props);

    this.state = {
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


  handleChange(e){
      var colId = Number(e.target.id);
      var instrument = e.target.name;
      var instrumentSeq = e.target.name + "SEQ";
      if (instrument == "hihat") {
          var checks =  this.state.hihatChecked;
          var steps = this.state.hihatSeq;
          steps.push(colId -1);
          if(!checks[colId]){
              checks[colId] = "yes"
              this.setState({hihatChecked : checks,hihatSeq : steps})
          }else if (checks[colId] == "yes"){
              checks[colId] = null;
              this.removeStepFromSteps("hihatChecked", checks, "hihatSeq", steps, (colId-1));
          }

      }else if(instrument == "kick"){
          var checks =  this.state.kickChecked;
          var steps = this.state.kickSeq;
          steps.push(colId-1);
          if(!checks[colId]){
              checks[colId] = "yes"
              this.setState({kickChecked : checks, kickSeq : steps })
          }else if (checks[colId] == "yes"){
              checks[colId] = null;
              this.removeStepFromSteps("kickChecked", checks, "kickSeq", steps, (colId-1));
          }


      }else if (instrument == "snare"){
          var checks =  this.state.snareChecked;
          var steps = this.state.snareSeq;
          steps.push(colId-1);
          if(!checks[colId]){
              checks[colId] = "yes"
              this.setState({snareChecked : checks, snareSeq : steps })
          }else if (checks[colId] == "yes"){
              checks[colId] = null;
              this.removeStepFromSteps("snareChecked",checks, "snareSeq", steps, (colId-1));
          }


      }else if(instrument == "cowBell"){
          var checks =  this.state.cowBellChecked;
          var steps = this.state.CowBellSeq;
          if(!checks[colId]){
              steps.push(colId -1);
              checks[colId] = "yes"
              this.setState({cowBellChecked : checks, CowBellSeq : steps })
          }else if (checks[colId] == "yes"){
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

      hihatSequencerStep = hihatColumns.map(function(col){
          return (
              <td><input name="hihat" id={col.id} type="checkbox" onChange={that.handleChange} checked={that.state.hihatChecked[col.id]}></input></td>
          )
      })

      kickSequencerStep = kickColumns.map(function(col){
          return (
              <td><input name="kick" id={col.id} type="checkbox" onChange={that.handleChange} checked={that.state.kickChecked[col.id]}></input></td>
          )
      })

      snareSequencerStep = snareColumns.map(function(col){
          return (
              <td><input name="snare" id={col.id} type="checkbox" onChange={that.handleChange} checked={that.state.snareChecked[col.id]}></input></td>
          )
      })

      cowbellSequencerStep = cowbellColumns.map(function(col){
          return (
              <td><input name="cowBell" id={col.id} type="checkbox" onChange={that.handleChange} checked={that.state.cowBellChecked[col.id]}></input></td>
          )
      })

      var drums =

      <div id="show-container" className="section">

      <p>Resolution</p>
      <select onChange={this.selectResolution} value={this.state.resolution}>
      <option value="4">4</option>
      <option value="8">8</option>
      <option value="16">16</option>
      <option value="32">32</option>
      </select>

      <p>Bars</p>
      <select onChange={this.selectBars} value={this.state.bars}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="4">4</option>
      </select>

      <button onClick={this.handleClearSequence.bind(this)}>Clear the Sequence</button>

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




    return (

        <div id="drum-container">
        <div className="title-image-container">
        <img id="drums" src="./drum3.svg"/>
        <h2 onClick={this.showOrHideContainer} style={activeStyle} className="title">DRUMS</h2>
        </div>
        <div>
        {DrumContainer}
        </div>
        </div>


    );
  }
}
