import React, { Component } from 'react';
import Knob from 'react-canvas-knob';

import { Sequencer, Synth, Filter, Gain, Monosynth, Bitcrusher, } from '../../src';



export default class Bass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showOrHideBit : 'Enable',
            bit : 8,
            knobMainGain: 100,
            mainGain: 1,
            type : "sine",
            transpose : 0,
            steps : [],
            knobAttack : 20,
            knobDecay : 20,
            attack : 0.2,
            decay : 1,
            knobGlide : 10,
            glide : 0.1,
            storedSteps : [],
            resolution : 16,
            bars : 1,
            octaveModified : 3,
            length : { '1' : 1, '2' : 1, '3' : 1, '4' : 1, '5' : 1, '6' : 1, '7' : 1, '8' : 1, '9' : 1, '10' : 1, '11' : 1, '12' : 1, '13' : 1, '14' : 1, '15' : 1, '16' : 1, '17' : 1, '18' : 1, '19' : 1, '20' : 1, '21' : 1, '22' : 1, '23' : 1, '24' : 1, '25' : 1, '26' : 1, '27' : 1, '28' : 1, '29' : 1, '30' : 1, '31' : 1, '32' : 1 },
            octave : { '1' : 2, '2' : 2, '3' : 2, '4' : 2, '5' : 2, '6' : 2, '7' : 2, '8' : 2, '9' : 2, '10' : 2, '11' : 2, '12' : 2, '13' : 2, '14' : 2, '15' : 2, '16' : 2, '17' : 2, '18' : 2, '19' : 2, '20' : 2, '21' : 2, '22' : 2, '23' : 2, '24' : 2, '25' : 2, '26' : 2, '27' : 2, '28' : 2, '29' : 2, '30' : 2, '31' : 2, '32' : 2 },
            stepSelected : { '1' : 'None', '2' : 'None', '3' : 'None', '4' : 'None', '5' : 'None', '6' : 'None', '7' : 'None', '8' : 'None', '9' : 'None', '10' : 'None', '11' : 'None', '12' : 'None', '13' : 'None', '14' : 'None', '15' : 'None','16' : 'None','17' : 'None','18' : 'None','19' : 'None','20' : 'None','21' : 'None','22' : 'None','23' : 'None','24' : 'None','25' : 'None','26' : 'None','27' : 'None','28' : 'None','29' : 'None','30' : 'None','31' : 'None','32' : 'None' }
        };

        this.selectResolution = this.selectResolution.bind(this);
        this.selectBars = this.selectBars.bind(this);
        this.selectSaw = this.selectSaw.bind(this);
        this.selectLength = this.selectLength.bind(this);
        this.selectOctave = this.selectOctave.bind(this);
        this.constructStep = this.constructStep.bind(this);
        this.handleSeqChange = this.handleSeqChange.bind(this);
        this.handleClearSequence = this.handleClearSequence.bind(this);
        this.handleChangeGlide = this.handleChangeGlide.bind(this);
        this.handleChangeAttack = this.handleChangeAttack.bind(this);
        this.handleChangeDecay = this.handleChangeDecay.bind(this);
        this.showOrHideContainer = this.showOrHideContainer.bind(this);
        this.translateStepsIntoNotes = this.translateStepsIntoNotes.bind(this);
        this.increaseOctave = this.increaseOctave.bind(this);
        this.decreaseOctave = this.decreaseOctave.bind(this);

    }


    componentWillReceiveProps(nextProps){
        if (nextProps.rootnote != this.props.rootnote || nextProps.scale != this.props.scale) {
            this.props = nextProps;
            var storedStepsClone = this.state.storedSteps.slice();
            this.translateStepsIntoNotes(storedStepsClone, this.state.octaveModified)
        }
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

    selectSaw(e){

        var sawType = e.target.value;
        this.setState({ type : sawType})
    }


    selectLength(e){

        var allLength = this.state.length
        var colId = e.target.id;
        var length = Number(e.target.value);
        var note = this.state.stepSelected[colId]
        var octave = this.state.octave[colId];

        allLength[colId] = length;
        this.setState({length : allLength, octaveModified : octave })
        if (note != "None") {
            var chordLength = this.state.length[colId];
            this.constructStep(colId, chordLength, note,octave)
        }
    }

    selectOctave(e){
        var allOctaves = this.state.octave;
        var colId = e.target.id;
        var octave = Number(e.target.value);
        var note = this.state.stepSelected[colId]
        var chordLength = this.state.length[colId]
        allOctaves[colId] = octave;
        this.setState({octave : allOctaves, octaveModified :  octave})
        if (note != "None") {
            this.constructStep(colId, chordLength, note,octave)
        }
    }

    increaseOctave(){
        this.setState({transpose : this.state.transpose +1})

    }
    decreaseOctave(){
        this.setState({transpose : this.state.transpose -1})

    }

    handleChangeGlide(e){

        this.setState({knobGlide: e, glide: (e/150)})
    }

    handleChangeDecay(e){
        if (e==0) {
            return this.setState({knobDecay: e, decay: 0.05})
        }

        this.setState({knobDecay: e, decay: (e/20)})
    }

    handleChangeAttack(e){
        if (e==0) {
            return this.setState({knobAttack: e, attack: 0.01})
        }

        this.setState({knobAttack: e, attack: (e/100)})
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



    handleSeqChange(e){
        var colId = e.target.id;
        var note = e.target.value;


        var allSelected = this.state.stepSelected
        var chordLength = this.state.length[colId]
        var octave  = this.state.octave[colId];
        allSelected[colId] = note;
        this.setState({stepSelected : allSelected , octaveModified : octave})
        this.constructStep(colId, chordLength, note, octave)
    }



    constructStep(col, length, note, octave){;
        var storedNewStep = [];

        var numberedCol = Number(col) - 1;
        storedNewStep[0]= numberedCol;
        storedNewStep[1]= length;
        storedNewStep[2]= note;
        storedNewStep[3]= octave;

        var previousSteps = this.state.storedSteps.slice();

        if (previousSteps[0]) {
            var clone = this.state.storedSteps.slice();
            if (note == "None") {


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
                previousSteps = removeA(clone, clone[numberedCol]);
                this.translateStepsIntoNotes(previousSteps, octave)
                return this.setState({ storedSteps : previousSteps});
            }else{
                var newStep = storedNewStep
                var updated = false
                previousSteps.forEach((step, i) =>{
                    if (step[0] === numberedCol) {
                        previousSteps[i]=newStep;
                        updated = true;
                        this.setState({ storedSteps : previousSteps});
                        return this.translateStepsIntoNotes(previousSteps, octave)
                    }
                })
                if(!updated){
                    previousSteps.push(storedNewStep);
                    this.setState({ storedSteps : previousSteps})
                    return this.translateStepsIntoNotes(previousSteps, octave)
                }
            }

        }else {
            var stepsToStore =  [storedNewStep.slice()];
            this.setState({ storedSteps : stepsToStore});
            return this.translateStepsIntoNotes([storedNewStep], octave)

        }

    }

    translateStepsIntoNotes(stepsToTranslate, octave){

        var newSteps = stepsToTranslate.slice();
        if (newSteps[0]) {
            newSteps = newSteps.map((step, i) => {
                step = step.slice();
                step[2] = this.props.notes[step[2]] + step[3];
                step.pop();
                return step
            })
        }

        this.setState({ steps:  newSteps})
    }


    handleClearSequence(){
        this.setState({
            showOrHideBit : 'Enable',
            bit : 8,
            steps : [],
            transpose : 0,
            storedSteps : [],
            stepSelected : { '1' : 'None', '2' : 'None', '3' : 'None', '4' : 'None', '5' : 'None', '6' : 'None', '7' : 'None', '8' : 'None', '9' : 'None', '10' : 'None', '11' : 'None', '12' : 'None', '13' : 'None', '14' : 'None', '15' : 'None','16' : 'None','17' : 'None','18' : 'None','19' : 'None','20' : 'None','21' : 'None','22' : 'None','23' : 'None','24' : 'None','25' : 'None','26' : 'None','27' : 'None','28' : 'None','29' : 'None','30' : 'None','31' : 'None','32' : 'None' },
            length : { '1' : 1, '2' : 1, '3' : 1, '4' : 1, '5' : 1, '6' : 1, '7' : 1, '8' : 1, '9' : 1, '10' : 1, '11' : 1, '12' : 1, '13' : 1, '14' : 1, '15' : 1, '16' : 1, '17' : 1, '18' : 1, '19' : 1, '20' : 1, '21' : 1, '22' : 1, '23' : 1, '24' : 1, '25' : 1, '26' : 1, '27' : 1, '28' : 1, '29' : 1, '30' : 1, '31' : 1, '32' : 1 },
            octave : { '1' : 3, '2' : 3, '3' : 3, '4' : 3, '5' : 3, '6' : 3, '7' : 3, '8' : 3, '9' : 3, '10' : 3, '11' : 3, '12' : 3, '13' : 3, '14' : 3, '15' : 3, '16' : 3, '17' : 3, '18' : 3, '19' : 3, '20' : 3, '21' : 3, '22' : 3, '23' : 3, '24' : 3, '25' : 3, '26' : 3, '27' : 3, '28' : 3, '29' : 3, '30' : 3, '31' : 3, '32' : 3 }

        })
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

    showOrHideBassSound(){
        if(this.state.showBassSound){
            this.setState({showBassSound : null})
        }else {
            this.setState({showBassSound : true})
        }
    }





    render() {

        var that = this;
        let warning = "";
        if(this.state.warning){

            warning = "<p>The total can't exceed 32 columns ! Pick another bars and resolution number!</p>"
        }
        var bassIdLength = [], bassColumns = [], selectNote = [], inputChoices = [], octaveChoices = [], bassSequencerStep = "", bassSequencerAll = "",  melodyCheck = "", bassLength = "", bassLengthChoices = "", bassOctave = "";

        var columnNumber  = this.state.resolution * this.state.bars;

        for (var i = 1; i <= columnNumber; i++) {
            selectNote.push({id : i});
            bassColumns.push({id : i});
            bassIdLength.push({id: i});
            inputChoices.push({id: i});
            octaveChoices.push({id:i});
        }

        bassLengthChoices = inputChoices.map((col) => {
            return (
                <option value={col.id}>{col.id}</option>
            )
        })
        bassOctave = octaveChoices.map((col) =>{
            return(
                <td>
                    <select id={col.id} onChange={this.selectOctave} value={this.state.octave[col.id]}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </td>
            )
        })

        bassLength = bassIdLength.map((col) =>{
            return (
                <td>
                    <select id={col.id} onChange={this.selectLength} value={this.state.length[col.id]}>
                        {bassLengthChoices}
                    </select>
                </td>
            )
        })

        bassSequencerStep = bassColumns.map((col) => {
            return (
                <td>{col.id}</td>
            )
        })


        bassSequencerAll = selectNote.map((col) => {
            return (
                <td>
                    <select id={col.id} onChange={this.handleSeqChange} value={this.state.stepSelected[col.id]}>
                        <option value="None">None</option>
                        <option value="sensible">{this.props.notes.sensible}</option>
                        <option value="seventh">{this.props.notes.seventh}</option>
                        <option value="sixth">{this.props.notes.sixth}</option>
                        <option value="fifth">{this.props.notes.fifth}</option>
                        <option value="fourth">{this.props.notes.fourth}</option>
                        <option value="third">{this.props.notes.third}</option>
                        <option value="second">{this.props.notes.second}</option>
                        <option value="root">{this.props.notes.root}</option>
                    </select>
                </td>
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

        var pointerBassSound = "+";
        var showBassSoundContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showBassSound) {
            showBassSoundContainer = {background : 'none'};
            pointerBassSound = '-'
        }


        var bass =
            <div id="show-container" className="section">
            {warning}
                <div id="bass-container">
                    <p className="container-title bass-titles" onClick={this.showOrHideSettings.bind(this)}>Settings {pointerSettings}</p>
                    <div className='fx-container bass-color' id="bass-container" style={showSettingsContainer}>
                        <div>
                        <p>Volume</p>
                        <Knob
                        value={this.state.knobMainGain}
                        onChange={this.handleChangeMainGain.bind(this)}
                        onChangeEnd={this.handleChangeMainGain.bind(this)}
                        fgColor={'lightsalmon'}
                        width={100}
                        height={100}
                        font={'"Bubbler One"'}
                        />
                    </div>

                    <div>
                    <p>Resolution</p>
                    <select className="select-items" onChange={this.selectResolution} value={this.state.resolution}>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                        <option value="32">32</option>
                    </select>
                    </div>

                    <div>
                    <p>Bars</p>
                    <select className="select-items" onChange={this.selectBars} value={this.state.bars}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    </select>
                    </div>

                    <div id="octave-bass-settings">
                    <p>Octave</p>
                    <button className="btn button-primary" onClick={this.increaseOctave}>+ Octave</button>
                    <p>Octave : {this.state.transpose}</p>
                    <button className="btn button-primary" onClick={this.decreaseOctave}>- Octave</button>
                    </div>

                    </div>
                </div>

                <div id="bass-sound-container">
                    <p className="container-title bass-titles" onClick={this.showOrHideBassSound.bind(this)}>Bass Sound {pointerBassSound}</p>
                    <div className='fx-container bass-color' id="bass-container" style={showBassSoundContainer}>
                        <div>
                            <p>Saw</p>
                            <select className="select-items" onChange={this.selectSaw} value={this.state.type}>
                                <option value="sine">sine</option>
                                <option value="square">square</option>
                                <option value="triangle">triangle</option>
                                <option value="sawtooth">sawtooth</option>
                            </select>
                        </div>

                        <div>
                            <p>Attack</p>
                            <Knob value={this.state.knobAttack} onChange={this.handleChangeAttack} onChangeEnd={this.handleChangeAttack} fgColor={'lightsalmon'} width={100} height={100} font={'"Bubbler One"'}/>
                        </div>


                        <div>
                            <p>Decay</p>
                            <Knob value={this.state.knobDecay} onChange={this.handleChangeDecay} onChangeEnd={this.handleChangeDecay} fgColor={'lightsalmon'} width={100} height={100} font={'"Bubbler One"'}/>
                        </div>

                        <div>
                            <p>Glide</p>
                            <Knob value={this.state.knobGlide} onChange={this.handleChangeGlide} onChangeEnd={this.handleChangeGlide} fgColor={'lightsalmon'} width={100} height={100} font={'"Bubbler One"'}/>
                        </div>
                    </div>
                </div>



                <div className="bit-container">
                    <p className="container-title bass-titles" onClick={this.showOrHideBitcrusher.bind(this)}>Bitcrusher {pointerBitcrusher}</p>
                    <div className="fx-container bass-color" id="bitcrusher" style={showBitcrusherContainer}>
                        <button className="btn button-primary bitcrusher-button" id="bitcrusher-button-bass" onClick={this.showOrHideBit.bind(this)}>{this.state.showOrHideBit}</button>
                        <select onChange={this.selectBit.bind(this)} value={this.state.bit}>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                        </select>
                    </div>
                </div>

                <div className='bass-container sequencer-container'>

                <p className="bass-titles" id="bass-filter">Sequencer {this.state.disableFx}</p>
                <div id="bass-sequencer">
                    <table>
                    <thead>
                    <tr className='steps-row'><td>Step</td>{bassSequencerStep}</tr>
                    </thead>
                    <tbody>
                    <tr><td>Note</td>{bassSequencerAll}</tr>
                    <tr><td>Length</td>{bassLength}</tr>
                    <tr><td>Octave</td>{bassOctave}</tr>
                    </tbody>
                    </table>
                </div>
                </div>

                <button className="btn button-primary" id="bass-clear-button" onClick={this.handleClearSequence}>Clear the Sequence</button>

                <Sequencer resolution={this.state.resolution} bars={this.state.bars}>
                <Monosynth
                glide={this.state.glide}
                transpose={this.state.transpose}

                envelope={{
                    attack: this.state.attack,
                    sustain: 0,
                    decay: this.state.decay,
                    release: 0
                }}

                type={this.state.type}
                steps={this.state.steps}
                />
                </Sequencer>
            </div>



        const hiddenDiv = {
            display: 'none'
        };

        let activeStyle = {
            color : 'black'
        };


        var bassContainer = <div style={hiddenDiv}>{bass}</div>;
        if(this.state.showContainer){
            bassContainer = <div>{bass}</div>
            activeStyle = {color : 'lightsalmon'}

        }

        var bitCrushOnOff =
            <div>
             <Gain amount={this.state.mainGain}>
            {bassContainer}
             </Gain>
          </div>

          if(this.state.showOrHideBit == "Disable"){
              bitCrushOnOff =
              <div>
               <Gain amount={this.state.mainGain}>
                <Bitcrusher bits={this.state.bit}>
                {bassContainer}
                </Bitcrusher>
                </Gain>
            </div>
          }


        return (

            <div id="bass-container">
            <div className="title-image-container">
            <img id="bass" src="./bass2.svg"/>
            <h2 onClick={this.showOrHideContainer} style={activeStyle} className="title">BASS</h2>
            </div>
            <div>
            {bitCrushOnOff}
            </div>
            </div>
        );
    }
}
