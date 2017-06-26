import React, { Component } from 'react';

import {
    Analyser,
    Chorus,
    MoogFilter,
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
            knobFilterQ : 0,
            filterQ : 0,
            knobMainGain: 100,
            mainGain: 1,
            filterFrequency: 0,
            rvbDry : 1,
            rvbWet :0,
            rvbDryWet : 0,
            rvbHighCut :22000,
            rvbLowCut : 100,
            knobRvbDryWet : 0,
            knobRvbHighCut :100,
            knobRvbLowCut : 0,
            knobFilterFrequency: 0,
            filterType: 'highpass',
            delayDry : 1,
            delayWet : 0,
            delayTime : 150,
            delayFeedback : 0.25,
            delayCutoff : 9000,
            knobDelayDry :100,
            knobDelayWet : 0,
            valueDelayTime :"1/16",
            knobDelayFeedback : 25,
            knobDelayCutoff :75,
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
        this.showOrHideContainer = this.showOrHideContainer.bind(this);
        this.selectFilterType = this.selectFilterType.bind(this);
        this.showOrHideVisualizer = this.showOrHideVisualizer.bind(this);
    }

    handleChangeMainGain(e){
        this.setState({knobMainGain: e, mainGain: (e/100)})
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

    handleRvbHighCut(e){
        this.setState({rvbHightCut : e*220, knobRvbHighCut : e})
    }
    handleRvbDryWet(e){
        this.setState({rvbDry : 1 - (e/100), rvbWet : e/100, rvbDryWet : e/100,  knobRvbDryWet : e})
    }

    handleRvbLowCut(e){
        this.setState({rvbLowCut : e*220, knobRvbLowCut : e})
    }

    selectFilterType(e){
        this.setState({filterType : e.target.value})
    }

    handleFilterFrequency(e){
        this.setState({filterFrequency : e*75 , knobFilterFrequency : e })
    }

    handleFilterQ(e){
        this.setState({filterQ : e/4 , knobFilterQ : e })
    }

    handleknobDelayCutoff(e){
        this.setState({delayCutoff : e*120, knobDelayCutoff : e})
    }

    handleknobDelayFeedback(e){
        this.setState({delayFeedback : e/100, knobDelayFeedback : e})
    }

    handleknobDelayDry(e){
        this.setState({delayDry : e/100 , knobDelayDry : e })
    }

    handleknobDelayWet(e){
        this.setState({delayWet : e/100, knobDelayWet : e})
    }

    selectDelayTime(e){
        var time = Number(e.target.value);
        this.setState({delayTime : time, valueDelayTime : e.target.value})
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

    showOrHideHarmony(){
        if(this.state.showHarmony){
            this.setState({showHarmony : null})
        }else {
            this.setState({showHarmony : true})
        }
    }

    showOrHideDelay(){
        if(this.state.showDelay){
            this.setState({showDelay : null})
        }else {
            this.setState({showDelay : true})
        }
    }

    showOrHideFilter(){
        if(this.state.showFilter){
            this.setState({showFilter : null})
        }else {
            this.setState({showFilter : true})
        }
    }

    showOrHideReverb(){
        if(this.state.showReverb){
            this.setState({showReverb : null})
        }else {
            this.setState({showReverb : true})
        }
    }


    render() {

        let activeStyleVisualizer =  {color : 'black'};
        let showHamonyContainer = {position: "absolute", top : "-10000000px"};

        var visualizerStyle = {position : 'absolute', top : '-10000000px'};
        if (this.state.showVisualizer) {
            visualizerStyle = {position : 'relative', top : '0px'};
            activeStyleVisualizer =  {color : 'gold'}
        }

        var pointerHarmony = "+";

        if (this.state.showHarmony) {
            showHamonyContainer = {background : 'none'};
            pointerHarmony = '-'
        }

        var pointerReverb = "+";
        var showReverbContainer = {position: "absolute", top : "-10000000px"};
        if (this.state.showReverb) {
            showReverbContainer = {background : 'none'};
            pointerReverb = '-'
        }

        var pointerFilter = "+";
        var showFilterContainer = {position: "absolute", top : "-10000000px"}
        if (this.state.showFilter) {
            showFilterContainer = {background : 'none'};
            pointerFilter = '-'
        }

        var pointerDelay = "+";
        var showDelayContainer= {position: "absolute", top : "-10000000px"}

        if (this.state.showDelay) {
            showDelayContainer = {background : 'none'};
            pointerDelay = '-'
        }
        var genericContainer = "";
        let activeStyle = {color : 'black'};


        if(this.state.showContainer){
            activeStyle = {color : 'gold'}
            genericContainer =
            <div id="generic-setup">
                <div className="harmony-container">
                    <h4 className="container-title" onClick={this.showOrHideHarmony.bind(this)} >Harmony and Tempo    {pointerHarmony}</h4>
                    <div className='fx-container generic-color' style={showHamonyContainer}>
                        <div>
                            <div>
                                <p>Volume</p>
                                <Knob
                                value={this.state.knobMainGain}
                                onChange={this.handleChangeMainGain.bind(this)}
                                onChangeEnd={this.handleChangeMainGain.bind(this)}
                                fgColor={'gold'}
                                width={100}
                                height={100}
                                font={'"Bubbler One"'}
                                />
                            </div>
                        </div>

                        <div className='bpm-control left'>

                            <div className='actions' id="bpm-control" >
                                <div id="info-bpm">{this.state.bpm} bpm</div>
                                <button  className="btn button-primary" onClick={this._onDecrement10BPM.bind(this)}>-10</button>
                                <button className="btn button-primary" onClick={this._onDecrementBPM.bind(this)}>-1</button>
                                <button className="btn button-primary" onClick={this._onIncrementBPM.bind(this)}>+1</button>
                                <button className="btn button-primary" onClick={this._onIncrement10BPM.bind(this)}>+10</button>
                            </div>
                        </div>

                        <div id="harmonic-info">
                            <div>
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
                            </div>

                            <div>
                                <p>Scale</p>
                                <select onChange={this.selectScale} value={this.state.scale}>
                                    <option value="major">Major</option>
                                    <option value="minor">Minor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reverb-container" >
                    <h4 className="container-title" onClick={this.showOrHideReverb.bind(this)}>Reverb {pointerReverb}</h4>
                    <div className="fx-container generic-color" style={showReverbContainer}>
                        <div>
                            <p>Dry/Wet</p>
                            <Knob
                              value={this.state.knobRvbDryWet}
                              onChange={this.handleRvbDryWet.bind(this)}
                              onChangeEnd={this.handleRvbDryWet.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Highcut</p>
                            <Knob
                              value={this.state.knobRvbHighCut}
                              onChange={this.handleRvbHighCut.bind(this)}
                              onChangeEnd={this.handleRvbHighCut.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Lowcut</p>
                            <Knob
                              value={this.state.knobRvbLowCut}
                              onChange={this.handleRvbLowCut.bind(this)}
                              onChangeEnd={this.handleRvbLowCut.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-container">
                    <h4 className="container-title" onClick={this.showOrHideFilter.bind(this)}>Filter {pointerFilter}</h4>
                    <div className="fx-container generic-color" style={showFilterContainer}>
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
                        </div>

                        <div>
                            <p>Q</p>
                            <Knob
                              value={this.state.knobFilterQ}
                              onChange={this.handleFilterQ.bind(this)}
                              onChangeEnd={this.handleFilterQ.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>FilterType</p>
                            <select className="fx-select" onChange={this.selectFilterType} value={this.state.filterType}>
                                <option value="lowpass">lowpass</option>
                                <option value="highpass">highpass</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="delay-container" >
                    <h4 className="container-title" onClick={this.showOrHideDelay.bind(this)}>Delay {pointerDelay}</h4>
                    <div className="fx-container generic-color" style={showDelayContainer}>
                        <div>
                            <p>Cutoff</p>
                            <Knob
                              value={this.state.knobDelayCutoff}
                              onChange={this.handleknobDelayCutoff.bind(this)}
                              onChangeEnd={this.handleknobDelayCutoff.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Feedback</p>
                            <Knob
                              value={this.state.knobDelayFeedback}
                              onChange={this.handleknobDelayFeedback.bind(this)}
                              onChangeEnd={this.handleknobDelayFeedback.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Dry</p>
                            <Knob
                              value={this.state.knobDelayDry}
                              onChange={this.handleknobDelayDry.bind(this)}
                              onChangeEnd={this.handleknobDelayDry.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Wet</p>
                            <Knob
                              value={this.state.knobDelayWet}
                              onChange={this.handleknobDelayWet.bind(this)}
                              onChangeEnd={this.handleknobDelayWet.bind(this)}
                              fgColor={'gold'}
                              width={100}
                              height={100}
                              font={'"Bubbler One"'}
                            />
                        </div>

                        <div>
                            <p>Time</p>
                            <select className="fx-select" onChange={this.selectDelayTime.bind(this)} value={this.state.valueDelayTime}>
                                <option value="75">1/32</option>
                                <option value="100">1/24</option>
                                <option value="150">1/16</option>
                                <option value="200">1/12</option>
                                <option value="300">1/8</option>
                                <option value="450">1/6</option>
                                <option value="600">1/4</option>
                            </select>
                        </div>
                    </div>
                </div>


            </div>

        }

        var isPlaying = "./play.svg"
        if(this.state.playing){
            isPlaying = "./pause.svg"
        }

        var isPlayingTop = "./play2.svg"
        if(this.state.playing){
            isPlayingTop = "./pause2.svg"
        }



        return (

            <div>

            <img src={isPlayingTop} onClick={this.handlePlayToggle} id="playing-button1"/>

            <div id="page-title-container">
            <h1 id="page-title"><span id="title1">D</span><span id="title1">C</span><span id="title1">B</span></h1>
            <h1 id="page-subtitle">decibel, an intuitive music production tool on your browser</h1>
            <p id="generic-info">You are composing a song in <span>{this.state.rootnote} {this.state.scale}</span>, at a tempo of <span>{this.state.bpm} bpm </span>!</p>
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
            <Gain amount={this.state.mainGain}>
            <Filter frequency={this.state.filterFrequency} type={this.state.filterType} Q={this.state.filterQ}>
            <Reverb
            dryLevel={this.state.rvbDry}
            highCut={this.state.rvbHightCut}
            lowCut={this.state.rvbLowCut}
            wetLevel={this.state.rvbWet}>
            <Delay
                cutoff={this.state.delayCutoff}
                delayTime={this.state.delayTime}
                dryLevel={this.state.delayDry}
                feedback={this.state.delayFeedback}
                wetLevel={this.state.delayWet}>
            <Drums />
            <Chords rootnote={this.state.rootnote} scale={this.state.scale} notes={this.state.notes} />

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
