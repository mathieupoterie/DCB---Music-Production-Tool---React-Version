import React, { Component } from 'react';

import {
    Analyser,
    Song,
    Sequencer,
    Sampler,
    Synth,
    Filter,
    Monosynth,
} from '../src';

import Instruments from './Instruments'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }



    render() {
        return (

            <div>
                <Instruments />
            </div>
        );
    }
}
