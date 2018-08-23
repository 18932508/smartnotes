import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';
import audio from "./PM1.mp3";
import * as ReactBootstrap from 'react-bootstrap';
import './App.css';
import Popup from "reactjs-popup";

import playbutton from "./imgs/playbutton.png";
import playback from "./imgs/playback.png";
import playforw from "./imgs/playforw.png";
import playpause from "./imgs/playpause.png";
import noteIcon from "./imgs/note.png";
import confirmIcon from "./imgs/confirm.png";

require('wavesurfer.js');

class Filter extends React.Component{
  render()
  {
    return(
      <div className="filterNotes"style={{color : "black", display: "inline-block"}}>
        <input placeholder="Filter notes" className="filterNotes" type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}
class PlayButton extends React.Component{
    render()
    {
      let isPlaying = this.props.playing
      if(isPlaying)
      {
        return <img style={{height: "45px"}}src={playpause} />
      }
      return <img style={{height: "45px"}}src={playbutton} />
      
    }
  }


export default class Waveform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pos: 0,
      filterString: '',
      regions:{},
      notes : this.props.notes,
      value: '',
      newNote : {timecode:'', time:'', description:''}
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


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

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    console.log('timecode ' + this.getCurrentTime(this.state.pos));
    console.log('time: '+ this.state.pos);
    console.log('description : ' +  this.state.value);

    let newNote = Object.assign([], this.state.newNote);
    
    let notes = Object.assign([],this.state.notes);

    newNote.timecode = this.getCurrentTime(this.state.pos)
    newNote.time = this.state.pos
    newNote.description = this.state.value

    this.setState({newNote});
    this.setState(this.state.notes[this.state.notes.length] = (newNote));
    console.log(this.state.notes);
    event.preventDefault();
  }

  render() {
      const waveOptions = {
        progressColor: 'darkorange',
        waveColor: 'orange',
        barWidth: 3
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

        <ReactBootstrap.Button bsStyle="link"
        onClick={() => this.handlePosChange(this.state.pos - 5)}><img style={{height: "45px"}} src={playback} /> </ReactBootstrap.Button>

        <ReactBootstrap.Button bsStyle="link" onClick={this.handleTogglePlay}><PlayButton playing={this.state.playing}/></ReactBootstrap.Button>

        <ReactBootstrap.Button bsStyle="link"
        onClick={() => this.handlePosChange(this.state.pos + 5)}><img style={{height: "45px"}} src={playforw} /> </ReactBootstrap.Button>

        <div>
            <header className="App-header">Notes 

            <Filter onTextChange={text => this.setState({filterString: text})}/>
            <Popup
              trigger={<button className="button"> Add Note </button>}
              modal
              closeOnDocumentClick
            >
              <div className="newNote">
                <header style={{background: "#F7941D" }}> New Note</header>
                <form onSubmit={this.handleSubmit}>
                <label> Time: {this.getCurrentTime(this.state.pos)}
                </label>
                <div>
                <label>
                  Description:
                  <input type="text" className="inputBox" value={this.state.value} onChange={this.handleChange} />
                </label>
                </div>
                <input type="submit" value="Submit" />
              </form>

              </div>
            </Popup>
            </header>

            {notesToRender.map(notes =>
            <button className="yay2"
            onClick={() => this.handlePosChange(notes.time)}>
            <h3 > <img className="note-icon" src={noteIcon} /> Time : {notes.timecode} - Description : {notes.description}</h3>
            </button>
            )}
        </div>

      </div>
      );
  }
}