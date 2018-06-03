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
      pos: 0,
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(newPos) {
    this.setState({
      pos: newPos
    });
  }  
  render() {
      const waveOptions = {
        progressColor: 'darkorange',
        waveColor: 'orange',
        barWidth: 2
      };
      let notes = this.props.notes;
    return (
      <div>
        <Wavesurfer
          audioFile={audio}
          pos={this.state.pos}
          onPosChange={event => this.handlePosChange(event.originalArgs[0])}
          playing={this.state.playing}
          options={waveOptions}
        />

        <button 
        onClick={() => this.handlePosChange(this.state.pos - 5)}>SkipBack</button>

        <button onClick={this.handleTogglePlay}>PLAY</button>

        <button 
        onClick={() => this.handlePosChange(this.state.pos + 5)}>SkipForward</button>

        <h4>{this.state.pos}</h4>
        
        <div className="form-group col-xs-4">
            <label htmlFor="simple-pos">Position:</label>
            <input
              name="simple-pos"
              type="number"
              step="0.01"
              value={this.state.pos}
              onChange={event => this.handlePosChange(+event.target.value)}
              className="form-control"
            />
        </div>

        <div>
            <header className="App-header">Notes 
            </header>
            {notes.map(notes =>
            <button className="yay2"
            onClick={() => this.handlePosChange(notes.time)}>
            <h3 >Time : {notes.timecode} - Description : {notes.description}</h3>
            </button>
            )}
        </div>

      </div>
      );
  }
}