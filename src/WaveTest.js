import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';
import audio from "./PM1.mp3";

require('wavesurfer.js');

class Filter extends React.Component{
  render()
  {
    return(
      <div style={{color : "black", display: "inline-block", algin : "right"}}>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

export default class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pos: 0,
      filterString: '',
      notes : this.props.notes
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  getCurrentTime(time)
  {
    return [
      Math.floor((time % 3600)/60),
        ('00'+ Math.floor(time % 60)).slice(-2)
    ].join(':');
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
        barWidth: 3
      };
      const timelineOptions = {
        timeInterval: 0.5,
        height: 30,
        primaryFontColor: '#00f',
        primaryColor: '#00f'
      };

      let notesToRender = this.state.notes? this.state.notes.filter(notes =>
        notes.description.toLowerCase().includes(this.state.filterString.toLowerCase())): []

    return (
      <div>
        <Wavesurfer
          audioFile={audio}
          pos={this.state.pos}
          onPosChange={event => this.handlePosChange(event.originalArgs[0])}
          playing={this.state.playing}
          options={waveOptions}
          
        >
        </Wavesurfer>
        <h4 className="timecodeleft">{this.getCurrentTime(this.state.pos)}</h4>

        <button 
        onClick={() => this.handlePosChange(this.state.pos - 5)}>SkipBack</button>

        <button onClick={this.handleTogglePlay}>PLAY</button>

        <button 
        onClick={() => this.handlePosChange(this.state.pos + 5)}>SkipForward</button>

        <div>
            <header className="App-header">Notes 

            <Filter onTextChange={text => this.setState({filterString: text})}/>

            </header>
            {notesToRender.map(notes =>
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