import React, { Component } from 'react';

import {
  Sequencer,
  Synth,
  Filter,
  Monosynth,
} from '../../src';

import Polysynth from '../polysynth';


export default class Chords extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.selectGroudNote = this.selectGroudNote.bind(this);
    this.selectScale = this.selectScale.bind(this)
  }

  selectGroudNote(e){
      console.log(e.target.value);
  }

  selectScale(e){
      console.log(e.target.value);
  }

  selectstartingPoint(e){
      console.log(e.target.value)
  }

  selectLength(e){
      console.log(e.target.value);
  }

  render() {
    return (


        <div id="chord-container">
        <p id="chord-title">CHORD Instrument</p>
        <div id="chord-instrument">

        <p>Starts at</p>
        <select onChange={this.selectstartingPoint.bind(this)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>

        </select>

        <p>Length</p>
        <select onChange={this.selectLength.bind(this)}>
        <option value="1">1</option>
        <option value="2">2</option>
        </select>

        <p>Chord</p>
        <select onChange={this.selectLength.bind(this)}>
        <option value="I">I</option>
        <option value="II">II</option>
        </select>

        <p>Octave</p>
        <select onChange={this.selectLength.bind(this)}>
        <option value="1">1</option>
        <option value="2">2</option>
        </select>
        </div>

            <Sequencer
              resolution={16}
              bars={2}
            >


            <Filter>
              <Polysynth
                steps={[
                  [0, 16, ['c5', 'd#5', 'g5' ]],
                  [2, 1, ['c6']],

                  [8, 1, ['c5', 'd#4', 'g4']],
                  [10, 1, ['c6']],
                  [12, 1, ['c3', 'd#3', 'g3']],
                  [14, 1, ['d#6']],
                  [16, 1, ['f5', 'g#5', 'c6']],
                  [18, 1, ['f5', 'g#5', 'c6']],
                  [24, 1, ['f5', 'g#5', 'c6']],
                  [26, 1, ['f5', 'g#5', 'c6']],
                  [28, 1, ['f5', 'g#5', 'c6']],
                  [30, 1, ['f5', 'g#5', 'c6']],
                ]}
              />
              </Filter>

            </Sequencer>
            </div>

    );
  }
}

// var clone = this.state.steps.slice();
// clone[colId] = ;
// this.setState({ steps = clone})
