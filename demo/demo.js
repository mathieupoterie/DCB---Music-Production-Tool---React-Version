import React, { Component } from 'react';

import {
  Analyser,
  Song,
  Sequencer,
  Sampler,
  Synth,
  Delay,
  Filter,
} from '../src';

import Polysynth from './polysynth';
import Visualization from './visualization';

import './index.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      lightMode: true
    };

    this.handleAudioProcess = this.handleAudioProcess.bind(this);
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
    this.toggleLightMode = this.toggleLightMode.bind(this);
  }
  handleAudioProcess(analyser) {
    this.visualization.audioProcess(analyser);
  }
  handlePlayToggle() {
    this.setState({
      playing: !this.state.playing,
    });
  }
  toggleLightMode(){
    this.setState({lightMode: !this.state.lightMode});
  }
  render() {
    return (
      <div style={this.state.lightMode ? {
        paddingTop: '30px'
      } : {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        paddingTop: '30px'
      }}>







        <Song
          playing={this.state.playing}
          tempo={90}
        >
          <Analyser onAudioProcess={this.handleAudioProcess}>
            <Sequencer
              resolution={16}
              bars={1}
            >




            <Delay>
            <h1>One or two?</h1>
              <Sampler
                sample="samples/kick.wav"
                steps={[0, 2, 8, 10]}
              />
              <Sampler
                sample="samples/snare.wav"
                steps={[4, 8]}
              />
              <Sampler
                sample="samples/cowbell.wav"
                steps={[8]}
              />
              <Sampler
                sample="samples/hihat.wav"
                steps={[2,6, 10, 14]}
              />
             </Delay>
            </Sequencer>










            <Sequencer
              resolution={16}
              bars={2}
            >

            <Filter>

              <Polysynth
                steps={[
                  [0, 16, ['c3', 'd#3', 'g3' ]],
                  [2, 1, ['c4']],
                  [8, 1, ['c3', 'd#3', 'g3']],
                  [10, 1, ['c4']],
                  [12, 1, ['c3', 'd#3', 'g3']],
                  [14, 1, ['d#4']],
                  [16, 1, ['f3', 'g#3', 'c4']],
                  [18, 1, ['f3', 'g#3', 'c4']],
                  [24, 1, ['f3', 'g#3', 'c4']],
                  [26, 1, ['f3', 'g#3', 'c4']],
                  [28, 1, ['f3', 'g#3', 'c4']],
                  [30, 1, ['f3', 'g#3', 'c4']],
                ]}
              />
              </Filter>

            </Sequencer>


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








          </Analyser>
        </Song>

        <div style={{ textAlign: 'center' }}>
          <p style={this.state.lightMode ? {color: 'black'} : {color: 'white'}}>Light Mode</p>
          <label className="switch">
            <input type="checkbox" onChange={this.toggleLightMode} checked={this.state.lightMode} />
            <div className="slider round"></div>
          </label>
        </div>

        <Visualization ref={(c) => { this.visualization = c; }} />

        <button
          className="react-music-button"
          type="button"
          onClick={this.handlePlayToggle}
        >
          {this.state.playing ? 'Stop' : 'Play'}
        </button>
      </div>
    );
  }
}
