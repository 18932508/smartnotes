import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';
import audio from "./PM1.mp3"

require('wavesurfer.js');

export default class Waveform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value
    });
  }
  render() {
      const waveOptions = {
        progressColor: 'darkorange',
        waveColor: 'orange'
      };
    return (
      <div>
        <Wavesurfer
          audioFile={audio}
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
          options={waveOptions}
        />
        <button onClick={this.handleTogglePlay}>PLAY</button>
        <button 
        value={5}
        onClick={(value) => this.handlePosChange(value)}>SkipTest</button>
        <div className="form-group col-xs-4">
            <label htmlFor="simple-pos">Position:</label>
            <input
              name="simple-pos"
              type="number"
              step="0.01"
              value={this.state.pos}
              onChange={this.handlePosChange}
              className="form-control"
            />
            </div>
      </div>
      );
  }
}