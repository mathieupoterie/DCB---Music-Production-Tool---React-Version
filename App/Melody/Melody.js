import React, { Component } from 'react';

import {
  Sequencer,
  Synth,
  Filter,
  Monosynth,
} from '../../src';

import Polysynth from '../polysynth';


export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saw1 : "square",
            saw2 : "sine",
            steps : [],
            storedSteps : [],
            resolution : 16,
            bars : 1,
            octaveModified : 3,
            length : { '1' : 1, '2' : 1, '3' : 1, '4' : 1, '5' : 1, '6' : 1, '7' : 1, '8' : 1, '9' : 1, '10' : 1, '11' : 1, '12' : 1, '13' : 1, '14' : 1, '15' : 1, '16' : 1, '17' : 1, '18' : 1, '19' : 1, '20' : 1, '21' : 1, '22' : 1, '23' : 1, '24' : 1, '25' : 1, '26' : 1, '27' : 1, '28' : 1, '29' : 1, '30' : 1, '31' : 1, '32' : 1 },
            octave : { '1' : 3, '2' : 3, '3' : 3, '4' : 3, '5' : 3, '6' : 3, '7' : 3, '8' : 3, '9' : 3, '10' : 3, '11' : 3, '12' : 3, '13' : 3, '14' : 3, '15' : 3, '16' : 3, '17' : 3, '18' : 3, '19' : 3, '20' : 3, '21' : 3, '22' : 3, '23' : 3, '24' : 3, '25' : 3, '26' : 3, '27' : 3, '28' : 3, '29' : 3, '30' : 3, '31' : 3, '32' : 3 },
            stepSelected : { '1' : 'None', '2' : 'None', '3' : 'None', '4' : 'None', '5' : 'None', '6' : 'None', '7' : 'None', '8' : 'None', '9' : 'None', '10' : 'None', '11' : 'None', '12' : 'None', '13' : 'None', '14' : 'None', '15' : 'None','16' : 'None','17' : 'None','18' : 'None','19' : 'None','20' : 'None','21' : 'None','22' : 'None','23' : 'None','24' : 'None','25' : 'None','26' : 'None','27' : 'None','28' : 'None','29' : 'None','30' : 'None','31' : 'None','32' : 'None' }
        };

        this.selectResolution = this.selectResolution.bind(this);
        this.selectBars = this.selectBars.bind(this);
        this.selectSaw1 = this.selectSaw1.bind(this);
        this.selectSaw2 = this.selectSaw2.bind(this);
        this.selectLength = this.selectLength.bind(this);
        this.selectOctave = this.selectOctave.bind(this);
        this.constructStep = this.constructStep.bind(this);
        this.handleSeqChange = this.handleSeqChange.bind(this);
        this.handleClearSequence = this.handleClearSequence.bind(this);
        this.translateStepsIntoNotes = this.translateStepsIntoNotes.bind(this);
        this.showOrHideContainer = this.showOrHideContainer.bind(this);

    }


    componentWillReceiveProps(nextProps){
        if (nextProps.rootnote != this.props.rootnote || nextProps.scale != this.props.scale) {
            console.log(this.state.storedSteps, "this.state.storedSteps");
            this.props = nextProps;
            console.log(this.props);
            var storedStepsClone = this.state.storedSteps.slice();
            this.translateStepsIntoNotes(storedStepsClone, this.state.octaveModified)
        }
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

    selectSaw1(e){

        var sawType = e.target.value
        this.setState({ saw1 : sawType})
    }


    selectSaw2(e){

        var sawType = e.target.value
        this.setState({ saw2 : sawType})
    }

    selectLength(e){

        var allLength = this.state.length
        var colId = e.target.id;
        var length = Number(e.target.value);
        var degree = this.state.stepSelected[colId]
        var octave = this.state.octave[colId];

        allLength[colId] = length;
        this.setState({length : allLength, octaveModified : octave })
        if (degree != "None") {
            var chordLength = this.state.length[colId];
            this.constructStep(colId, chordLength, degree,octave)
        }
    }

    selectOctave(e){
        var allOctaves = this.state.octave;
        var colId = e.target.id;
        var octave = Number(e.target.value);
        var degree = this.state.stepSelected[colId]
        var chordLength = this.state.length[colId]
        allOctaves[e.target.id] = octave;
        this.setState({octave : allOctaves, octaveModified :  octave})
        if (degree != "None") {

            this.constructStep(colId, chordLength, degree,octave)
        }
    }


    handleSeqChange(e){

        var colId = e.target.id;
        var degree = e.target.value;

        var allSelected = this.state.stepSelected
        var chordLength = this.state.length[colId]
        var octave  = this.state.octave[colId];
        this.constructStep(colId, chordLength, degree, octave)
        allSelected[colId] = degree;
        this.setState({stepSelected : allSelected , octaveModified : octave})
    }



    constructStep(col, length, degree, octave){

        var storedNewStep = [];
        var that = this;

        var numberedCol = Number(col) - 1;
        storedNewStep[0]= numberedCol;
        storedNewStep[1]= length;
        storedNewStep[2]= degree;


        var previousSteps = this.state.storedSteps.slice();



        if (previousSteps[0]) {
            var clone = previousSteps.slice();
            if (degree == "None") {
                console.log("here we are!!!");

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
                var actualStep = removeA(clone, clone[numberedCol]);
                this.setState({ storedSteps : actualStep});
                return this.translateStepsIntoNotes(actualStep, octave)
            }else{
                var newStep = storedNewStep
                var that = this;
                var updated = false
                previousSteps.forEach(function(step, i){
                    if (step[0] === numberedCol) {
                        previousSteps[i]=newStep;
                        updated = true;
                        that.setState({ storedSteps : previousSteps});
                        return that.translateStepsIntoNotes(previousSteps, octave)
                    }
                })
                if(!updated){
                    var newStepsToStore = previousSteps.slice();
                    newStepsToStore.push(storedNewStep);
                    console.log("newStepsToStore", newStepsToStore);
                    var newStepsToTranslate = newStepsToStore.slice();
                    this.setState({ storedSteps : newStepsToStore});
                    console.log("1", JSON.stringify(newStepsToStore));
                    this.translateStepsIntoNotes(newStepsToTranslate, octave)
                    console.log("2", JSON.stringify(newStepsToStore));
                }

            }

        }else {
            var stepsToStore =  [storedNewStep.slice()];
            this.setState({ storedSteps : stepsToStore});
            this.translateStepsIntoNotes([storedNewStep], octave)

        }

    }

    translateStepsIntoNotes(stepsToTranslate, octave){

        var newSteps = stepsToTranslate.slice();

        var that = this;
        if (newSteps[0]) {
            newSteps = newSteps.map(function(step, i){
            step = step.slice();
            var degree = step[2];
            if (degree == "I") {
                step[2] = [(that.props.notes.root + octave), (that.props.notes.fifth+ octave), (that.props.notes.third+ (octave +1))];
                newSteps[i] = step ;
            }else if(degree == "II"){
                step[2] = [(that.props.notes.second + octave), (that.props.notes.sixth+ octave), (that.props.notes.fourth+ (octave +1))];
                newSteps[i] = step ;
            }else if(degree == "III"){
                step[2] = [(that.props.notes.third + octave), (that.props.notes.seventh+ octave), (that.props.notes.fifth+ (octave +1))];
                newSteps[i] = step ;
            }else if(degree == "IV"){
                step[2] = [(that.props.notes.fourth + octave), (that.props.notes.root+ (octave +1)), (that.props.notes.sixth+ (octave +1))];
                newSteps[i] = step ;
            }else if(degree == "V"){
                step[2] = [(that.props.notes.fifth + octave), (that.props.notes.second+ (octave +1)), (that.props.notes.sensible+ (octave +1))];
                newSteps[i] = step ;
            }else if(degree == "VI"){
                step[2] = [(that.props.notes.sixth + octave), (that.props.notes.third+ (octave +1)), (that.props.notes.root+ (octave +2))];
                newSteps[i] = step ;
            }else if(degree == "VII"){
                step[2] = [(that.props.notes.seventh + octave), (that.props.notes.fourth+ (octave +1)), (that.props.notes.second+ (octave +2))];
                newSteps[i] = step ;
            }
            return step
            })
        }


        this.setState({ steps:  newSteps})

    }

    handleClearSequence(){
        this.setState({
            steps : [],
            storedSteps : [],
            length : { '1' : 1, '2' : 1, '3' : 1, '4' : 1, '5' : 1, '6' : 1, '7' : 1, '8' : 1, '9' : 1, '10' : 1, '11' : 1, '12' : 1, '13' : 1, '14' : 1, '15' : 1, '16' : 1, '17' : 1, '18' : 1, '19' : 1, '20' : 1, '21' : 1, '22' : 1, '23' : 1, '24' : 1, '25' : 1, '26' : 1, '27' : 1, '28' : 1, '29' : 1, '30' : 1, '31' : 1, '32' : 1 },
            octave : { '1' : 3, '2' : 3, '3' : 3, '4' : 3, '5' : 3, '6' : 3, '7' : 3, '8' : 3, '9' : 3, '10' : 3, '11' : 3, '12' : 3, '13' : 3, '14' : 3, '15' : 3, '16' : 3, '17' : 3, '18' : 3, '19' : 3, '20' : 3, '21' : 3, '22' : 3, '23' : 3, '24' : 3, '25' : 3, '26' : 3, '27' : 3, '28' : 3, '29' : 3, '30' : 3, '31' : 3, '32' : 3 },
            stepSelected : { '1' : 'None', '2' : 'None', '3' : 'None', '4' : 'None', '5' : 'None', '6' : 'None', '7' : 'None', '8' : 'None', '9' : 'None', '10' : 'None', '11' : 'None', '12' : 'None', '13' : 'None', '14' : 'None', '15' : 'None','16' : 'None','17' : 'None','18' : 'None','19' : 'None','20' : 'None','21' : 'None','22' : 'None','23' : 'None','24' : 'None','25' : 'None','26' : 'None','27' : 'None','28' : 'None','29' : 'None','30' : 'None','31' : 'None','32' : 'None' }
        })
    }

    showOrHideContainer(){
        if(this.state.showContainer){
            this.setState({showContainer : null})
        }else {
            this.setState({showContainer : true})
        }
    }


    render() {
        console.log("STATE", this.state);
        var that = this;
        let warning = "";
        if(this.state.warning){
            warning = <p>The total can't exceed 32 columns ! Pick another bars and resolution number!</p>
        }
        var MelLength = [], melodyColumns = [], selectDegree = [], inputChoices = [], octaveChoices = [], melodySequencerStep = "", melodySequencerAll = "",  melodyCheck = "", melodyLength = "", melodyLengthChoices = "", melodyOctave = "";

        var columnNumber  = this.state.resolution * this.state.bars
        for (var i = 1; i <= columnNumber; i++) {
            selectDegree.push({id : i})
            melodyColumns.push({id : i})
            MelLength.push({id: i});
            inputChoices.push({id: i});
            octaveChoices.push({id:i});
        }

        melodyLengthChoices = inputChoices.map(function(col){
            return (
                <option value={col.id}>{col.id}</option>
            )
        })
        melodyOctave = octaveChoices.map(function(col){
            return(
                <td>
                    <select id={col.id} onChange={that.selectOctave} value={that.state.octave[col.id]}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </td>
            )
        })

        melodyLength = MelLength.map(function(col){
            return (
                <td>
                    <select id={col.id} onChange={that.selectLength} value={that.state.length[col.id]}>
                        {melodyLengthChoices}
                    </select>
                </td>
            )
        })

        melodySequencerStep = melodyColumns.map(function(col){
            return (
                <td>{col.id}</td>
            )
        })


        melodySequencerAll = selectDegree.map((col) => {
            return (
                <td>
                    <select id={col.id} onChange={that.handleSeqChange} value={that.state.stepSelected[col.id]}>
                        <option value="None">None</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                        <option value="VII">VII</option>
                    </select>
                </td>
            )
        })


        var chords =
                <div  className="section">
                {warning}

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


                <p>Saw 1</p>
                <select onChange={this.selectSaw1} value={this.state.saw1}>
                <option value="sine">sine</option>
                <option value="square">square</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">sawtooth</option>
                </select>

                <p>Saw 2</p>
                <select onChange={this.selectSaw2} value={this.state.saw2}>
                <option value="sine">sine</option>
                <option value="square">square</option>
                <option value="triangle">triangle</option>
                <option value="sawtooth">sawtooth</option>
                </select>

                <button onClick={this.handleClearSequence}>Clear the Sequence</button>

                <div id="melody-sequencer">
                <table>
                <thead>
                <tr className='steps-row'><td>Step</td>{melodySequencerStep}</tr>
                </thead>
                <tbody>
                <tr><td>Degree</td>{melodySequencerAll}</tr>
                <tr><td>Length</td>{melodyLength}</tr>
                <tr><td>Octave</td>{melodyOctave}</tr>
                </tbody>
                </table>
                </div>

                <Sequencer resolution={this.state.resolution} bars={this.state.bars}>

                <Polysynth
                steps={this.state.steps}
                saw1 ={this.state.saw1}
                saw2 ={this.state.saw2}
                />

                </Sequencer>
                </div>


        const hiddenDiv = {
            display: 'none'
        };
        let activeStyle = {
            color : 'black'
        };


        var chordContainer = <div style={hiddenDiv}>{chords}</div>;
        if(this.state.showContainer){
            chordContainer = <div>{chords}</div>
            activeStyle = {color : 'mediumaquamarine'}

        }


        return (

            <div id="melody-container">
            <div className="title-image-container">
            <img id="polyphonic" src="./polyphonic.svg"/>
            <h2 onClick={this.showOrHideContainer} style={activeStyle} className="title">CHORDS</h2>
            </div>
            <div>
            {chordContainer}
            </div>

            </div>
        );
    }
}
