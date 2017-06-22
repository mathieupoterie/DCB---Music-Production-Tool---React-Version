import React, { Component } from 'react';

import {
    Analyser,
    Song,
    Sequencer,
    Sampler,
    Synth,
    Filter,
    Delay,
    Gain,
    Reverb,
    Monosynth,
} from '../src';

import Melody from './Melody/Melody'
import Chords from './Chords/Chords'
import Drums from './Drums/Drums'
import Bass from './Bass/Bass'
import Knob from 'react-canvas-knob';

import Polysynth from './polysynth';
import Visualization from './visualization';



export default class Instruments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterFrequency: 1000,
            knobFilterFrequency: 50,
            filterType: 'lowpass',
            playing: false,
            bpm : 90,
            rootnote : 'A',
            scale : 'minor',
            notes : {root : "a", second : "b", third : "c", fourth : "d", fifth :'e', sixth : "f", seventh : "g", sensible : "g#"}
        };
        this.selectGroudNote = this.selectGroudNote.bind(this);
        this.selectScale = this.selectScale.bind(this);
        this.setNotes = this.setNotes.bind(this);
        this.handleAudioProcess = this.handleAudioProcess.bind(this);
        this.handlePlayToggle = this.handlePlayToggle.bind(this);
        this.handleBpmChange = this.handleBpmChange.bind(this);
        this.handleBpmSubmit = this.handleBpmSubmit.bind(this);
        this.showOrHideContainer = this.showOrHideContainer.bind(this);
        this.selectFilterType = this.selectFilterType.bind(this);
        this.showOrHideVisualizer = this.showOrHideVisualizer.bind(this);
    }


    handleBpmChange(e){
        this.setState({
            newBpm : e.target.value
        })
    }

    handleBpmSubmit(){
        var bpm = Number(this.state.newBpm);
        if (bpm > 240) {
            bpm = 240
        }else if(bpm < 20){
            bpm = 20
        }
        this.setState({
            bpm : bpm
        })
    }

    selectGroudNote(e){
        this.setNotes(e.target.value, this.state.scale)
        this.setState({rootnote : e.target.value})
    }

    selectScale(e){
        this.setNotes(this.state.rootnote, e.target.value)
        this.setState({ scale : e.target.value})
    }

    setNotes(root, scale){
        if (root + scale == "Amajor") {
            var notes = {root : "a", second : "b", third : "c#", fourth : "d", fifth :'e', sixth : "f#", seventh : "g#", sensible : "g#"};
            this.setState({notes: notes});
        }else if(root + scale  == "Aminor"){
            var notes = {root : "a", second : "b", third : "c", fourth : "d", fifth :'e', sixth : "f", seventh : "g", sensible : "g#"};
            this.setState({notes: notes});
        }else if(root + scale == "Bbmajor"){
            var notes = {root : "bb", second : "c", third : "d", fourth : "eb", fifth :'f', sixth : "g", seventh : "a", sensible : "a"};
            this.setState({notes: notes});
        }else if(root + scale  == "Bbminor"){
            var notes = {root : "bb", second : "c", third : "db", fourth : "eb", fifth :'f', sixth : "gb", seventh : "ab", sensible : "a"};
            this.setState({notes: notes});
        }else if(root + scale == "Bmajor"){
            var notes = {root : "b", second : "c#", third : "d#", fourth : "e", fifth :'f#', sixth : "g#", seventh : "a#", sensible : "a#"};
            this.setState({notes: notes});
        }else if(root + scale  == "Bminor"){
            var notes = {root : "b", second : "c#", third : "d", fourth : "e", fifth :'f#', sixth : "g", seventh : "a", sensible : "a#"};
            this.setState({notes: notes});
        }else if(root + scale == "Cmajor"){
            var notes = {root : "c", second : "d", third : "e", fourth : "f", fifth :'g', sixth : "a", seventh : "b", sensible : "b"};
            this.setState({notes: notes});
        }else if(root + scale  == "Cminor"){
            var notes = {root : "c", second : "d", third : "eb", fourth : "f", fifth :'g', sixth : "ab", seventh : "bb", sensible : "b"};
            this.setState({notes: notes});
        }else if(root + scale == "C#major"){
            var notes = {root : "c#", second : "d#", third : "e#", fourth : "f#", fifth :'g#', sixth : "a#", seventh : "b#", sensible : "b#"};
            this.setState({notes: notes});
        }else if(root + scale  == "C#minor"){
            var notes = {root : "c#", second : "d#", third : "e", fourth : "f#", fifth :'g#', sixth : "a", seventh : "b", sensible : "b#"};
            this.setState({notes: notes});
        }else if(root + scale == "Dmajor"){
            var notes = {root : "d", second : "e", third : "f#", fourth : "g", fifth :'a', sixth : "b", seventh : "c#", sensible : "c#"};
            this.setState({notes: notes});
        }else if(root + scale  == "Dminor"){
            var notes = {root : "d", second : "e", third : "f", fourth : "g", fifth :'a', sixth : "bb", seventh : "c", sensible : "c#"};
            this.setState({notes: notes});
        }else if(root + scale == "Ebmajor"){
            var notes = {root : "eb", second : "f", third : "g", fourth : "ab", fifth :'bb', sixth : "c", seventh : "d", sensible : "d"};
            this.setState({notes: notes});
        }else if(root + scale  == "Ebminor"){
            var notes = {root : "eb", second : "f", third : "gb", fourth : "ab", fifth :'bb', sixth : "cb", seventh : "db", sensible : "d"};
            this.setState({notes: notes});
        }else if(root + scale == "Emajor"){
            var notes = {root : "e", second : "f#", third : "g#", fourth : "a", fifth :'b', sixth : "c#", seventh : "d#", sensible : "d#"};
            this.setState({notes: notes});
        }else if(root + scale  == "Eminor"){
            var notes = {root : "e", second : "f#", third : "g", fourth : "a", fifth :'b', sixth : "c", seventh : "d", sensible : "d#"};
            this.setState({notes: notes});
        }else if(root + scale == "Fmajor"){
            var notes = {root : "f", second : "g", third : "a", fourth : "bb", fifth :'c', sixth : "d", seventh : "e", sensible : "e"};
            this.setState({notes: notes});
        }else if(root + scale == "Fminor"){
            var notes = {root : "f", second : "g", third : "ab", fourth : "bb", fifth :'c', sixth : "db", seventh : "eb", sensible : "e"};
            this.setState({notes: notes});
        }else if(root + scale == "F#major"){
            var notes = {root : "f#", second : "g#", third : "a#", fourth : "b", fifth :'c#', sixth : "d#", seventh : "e#", sensible : "e#"};
            this.setState({notes: notes});
        }else if(root + scale == "F#minor"){
            var notes = {root : "f#", second : "g#", third : "a", fourth : "b", fifth :'c#', sixth : "d", seventh : "e", sensible : "e#"};
            this.setState({notes: notes});
        }else if(root + scale == "Gmajor"){
            var notes = {root : "g", second : "a", third : "b", fourth : "c", fifth :'d', sixth : "e", seventh : "f#", sensible : "f#"};
            this.setState({notes: notes});
        }else if(root + scale == "Gminor"){
            var notes = {root : "g", second : "a", third : "bb", fourth : "c", fifth :'d', sixth : "eb", seventh : "f", sensible : "f#"};
            this.setState({notes: notes});
        }else if(root + scale == "Abmajor"){
            var notes = {root : "ab", second : "bb", third : "c", fourth : "db", fifth :'eb', sixth : "f", seventh : "g", sensible : "g"};
            this.setState({notes: notes});
        }else if(root + scale == "Abminor"){
            var notes = {root : "ab", second : "bb", third : "cb", fourth : "db", fifth :'eb', sixth : "fb", seventh : "gb", sensible : "g"};
            this.setState({notes: notes});
        }
    }

    handleAudioProcess(analyser) {
        this.visualization.audioProcess(analyser);
    }
    handlePlayToggle() {
        this.setState({
            playing: !this.state.playing,
        });
    }
    _onIncrement10BPM(){
        var newBPM = this.state.bpm + 10;
        if (newBPM > 240) {
            newBPM = 240
        }else if(newBPM < 20){
            newBPM = 20
        }
        this.setState({
             bpm : newBPM
        })

    }

    _onDecrement10BPM() {
        var newBPM = this.state.bpm - 10;
        if (newBPM > 240) {
            newBPM = 240
        }else if(newBPM < 20){
            newBPM = 20
        }
        this.setState({
             bpm : newBPM
        })
    }
    _onIncrementBPM(){
        var newBPM = this.state.bpm + 1;
        if (newBPM > 240) {
            newBPM = 240
        }else if(newBPM < 20){
            newBPM = 20
        }
        this.setState({
             bpm : newBPM
        })

    }

    _onDecrementBPM() {
        var newBPM = this.state.bpm - 1;
        if (newBPM > 240) {
            newBPM = 240
        }else if(newBPM < 20){
            newBPM = 20
        }
        this.setState({
             bpm : newBPM
        })
    }

    selectFilterType(e){
        console.log(e.target);
        this.setState({filterType : e.target.value})
    }

    handleFilterFrequency(e){
        this.setState({filterFrequency : e*14 , knobFilterFrequency : e })
    }

    showOrHideContainer(){
        if(this.state.showContainer){
            this.setState({showContainer : null})
        }else {
            this.setState({showContainer : true})
        }
    }

    showOrHideVisualizer(){
        if(this.state.showVisualizer){
            this.setState({showVisualizer : null})
        }else {
            this.setState({showVisualizer : true})
        }
    }


    render() {

        let activeStyleVisualizer =  {color : 'black'}

        var visualizerStyle = {position : 'absolute', top : '-1000px'};
        if (this.state.showVisualizer) {
            visualizerStyle = {position : 'relative', top : '0px'};
            activeStyleVisualizer =  {color : 'gold'}
        }
        var genericContainer = "";
        let activeStyle = {color : 'black'}
        if(this.state.showContainer){
            activeStyle = {color : 'gold'}
            genericContainer = <div id="generic-setup">



            <div className='bpm control left'>
            <div>{this.state.bpm} bpm</div>

            <div className='actions'>
            <p>Select your BPM (between 20 and 240)</p>
            <input type="text" onChange={this.handleBpmChange}/>
            <button onClick={this.handleBpmSubmit}>Submit BPM</button>
            <button onClick={this._onDecrement10BPM.bind(this)}>-10</button>
            <button onClick={this._onDecrementBPM.bind(this)}>-1</button>
            <button onClick={this._onIncrementBPM.bind(this)}>+1</button>
            <button onClick={this._onIncrement10BPM.bind(this)}>+10</button>
            </div>
            </div>


            <p>Root note</p>
            <select onChange={this.selectGroudNote} value={this.state.rootnote}>
            <option value="A">A</option>
            <option value="Bb">Bb</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="D">D</option>
            <option value="Eb">Eb</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="G">G</option>
            <option value="Ab">Ab</option>
            </select>

            <p>Scale</p>
            <select onChange={this.selectScale} value={this.state.scale}>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            </select>

            <div>
            <p>Frequency</p>
            <Knob
              value={this.state.knobFilterFrequency}
              onChange={this.handleFilterFrequency.bind(this)}
              onChangeEnd={this.handleFilterFrequency.bind(this)}
              fgColor={'gold'}
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


            <h3 id="for-closing" onClick={this.showOrHideContainer}>Done with the Settings ?</h3>

            </div>

        }

        var isPlaying = "./play.svg"
        if(this.state.playing){
            isPlaying = "./pause.svg"
        }



        return (

            <div>

            <img src={isPlaying} onClick={this.handlePlayToggle} id="playing-button1"/>

            <div id="page-title-container">
            <h1 id="page-title"><span id="title1">D</span><span id="title1">C</span><span id="title1">B</span></h1>
            <h1 id="page-subtitle">decibel, an intuitive music production tool on your browser</h1>
            <p id="generic-info">You are composing a song in <span>{this.state.rootnote} {this.state.scale}</span>, with a tempo of <span>{this.state.bpm} bpm </span>!</p>
            </div>


            <div className="title-image-container">
            <img id="settings" src="./settings1.svg"/>
            <h2 onClick={this.showOrHideContainer}  style={activeStyle} className="title">GENERIC SETTINGS</h2>
            </div>

            <div className="section">{genericContainer}</div>




            <Song
            playing={this.state.playing}
            tempo={this.state.bpm}
            >
            <Analyser onAudioProcess={this.handleAudioProcess}>
            <Gain>
            <Filter frequency={this.state.filterFrequency} type={this.state.filterType}>
            <Reverb>
            <Delay>
            <Drums />
            <Melody rootnote={this.state.rootnote} scale={this.state.scale} notes={this.state.notes} />

            <Bass rootnote={this.state.rootnote} scale={this.state.scale} notes={this.state.notes}/>

            </Delay>
            </Reverb>
            </Filter>
            </Gain>
            </Analyser>
            </Song>

            <div className="title-image-container">
            <img id="settings" src="./visualizer.svg"/>
            <h2 onClick={this.showOrHideVisualizer}  style={activeStyleVisualizer} className="title">VISUALIZER</h2>
            </div>

            <div className="section" style={visualizerStyle}>
            <Visualization ref={(c) => { this.visualization = c; }} />
            </div>


            <img src={isPlaying} onClick={this.handlePlayToggle} id="playing-button2"/>
            </div>
        );
    }
}

// REVERB
// highCut: props.highCut,
// lowCut: props.lowCut,
// dryLevel: props.dryLevel,
// wetLevel: props.wetLevel,
// level: props.level,
// impulse: props.impulse,
// bypass: props.bypass,
// bypass: 0,
// dryLevel: 0.5,
// highCut: 22050,
// impulse: 'reverb/room.wav',
// level: 1,
// lowCut: 20,
// wetLevel: 1,


// Delay
// this.connectNode = new tuna.Delay({
//       feedback: props.feedback,
//       delayTime: props.delayTime,
//       wetLevel: props.wetLevel,
//       dryLevel: props.dryLevel,
//       cutoff: props.cutoff,
//       bypass: props.bypass,
//     });
//
//     bypass: 0,
//     cutoff: 2000,
//     delayTime: 150,
//     dryLevel: 1,
//     feedback: 0.45,
//     wetLevel: 0.25,


// Gain
// value ou amount
