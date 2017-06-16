import React, { Component } from 'react';

export default class Visualization extends Component {
  constructor(props) {
    super(props);
    this.audioProcess = this.audioProcess.bind(this);
  }
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }
  componentDidReceiveProps() {

  }
  audioProcess(analyser) {
    if (this.ctx) {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, 'rgb(41, 182, 176)');
      gradient.addColorStop(0.25, 'rgb(40, 100, 120 )');
      gradient.addColorStop(0.75, 'rgb(39, 75, 83)');
      gradient.addColorStop(1, 'rgb(0, 0, 0)');

      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      this.ctx.clearRect(0, 0, 800, 512);
      this.ctx.fillStyle = gradient;

      for (let i = 0; i < (array.length); i++) {
        const value = array[i];
        this.ctx.fillRect(i * 12, 512, 10, value * -2);
      }
    }
  }
  render() {
    return (
      <canvas
        className="react-music-canvas"
        width={800}
        height={512}
        ref={(c) => { this.canvas = c; }}
      />
    );
  }
}
