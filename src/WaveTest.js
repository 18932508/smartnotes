import React from 'react';
import ReactDOM from 'react-dom';
import Wavesurfer from 'react-wavesurfer';
import audio from "./PM1.mp3";
import * as ReactBootstrap from 'react-bootstrap';
import './App.css';
import Popup from "reactjs-popup";
import axios from "axios";

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
      notes : this.props.notesData,
      meeting: this.props.meetingName,
      userID: this.props.userId,
      user: {},
      value: '',
      Note : {},
      counter : 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCurrentTime(time)
  {
    let hours = Math.floor(time / 3600);
    time %= 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = Math.round(seconds)

    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return hours + ":" + minutes + ":" +seconds;
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
    //let Note = Object.assign({}, this.state.newNote);
    let Note = {}
    var time = this.state.pos
    var timeFormat = this.getCurrentTime(time)
    var time2 = this.state.meeting.StartTime.slice(11,19)
    time2 = time2.split(":")
    var seconds2 = (+time2[0]) * 60 * 60 + (time2[1]) * 60 + (+time2[2])
    seconds2 = seconds2 + time
    seconds2 = this.getCurrentTime(seconds2)
    var datePart = this.state.meeting.StartTime.slice(0,11)
    var final = datePart.concat(seconds2)

    /*newNote.$id = "10"
    newNote.Description = this.state.value
    newNote.Meeting = null;
    newNote.MeetingID = this.state.meeting.MeetingID
    newNote.Time = final
    newNote.User = null
    newNote.UserID = this.state.userID*/

    Note.Time = final
    Note.UserID = this.state.userID
    Note.MeetingID = this.state.meeting.MeetingID
    Note.Description = this.state.value
    Note.User= this.state.user,
    Note.Meeting= this.state.meeting
    this.setState({Note});
    console.log(Note)

    fetch('https://smartnote1.azurewebsites.net/api/notes', {
        method: 'POST',
        headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
      },
      body: JSON.stringify({      
        Time : final,
        UserID : this.state.userID,
        MeetingID : this.state.meeting.MeetingID,
        Descriptions : this.state.value
      })
    })
    .then((response) => response.text())
    .then((responseText) => {
      console.log(responseText);
    })
    .catch((error) => {
      console.error(error);
    });

    /*axios.post(`https://smartnote1.azurewebsites.net/api/notes`, { Note })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })*/

    event.preventDefault();
  }
  notesFixTime()
  {
    console.log("notesFixedTime start")
    for(var i = 0; this.state.notes.length > i; i++)
    {
        let time1 = this.state.notes[i].Time.slice(11,19)
        console.log(time1)
        time1 = time1.split(":")
        var seconds1 = (+time1[0]) * 60 * 60 + (time1[1]) * 60 + (+time1[2])
        console.log(seconds1)
        let time2 = this.state.meeting.StartTime.slice(11,19)
        console.log(time2)
        time2 = time2.split(":")
        var seconds2 = (+time2[0]) * 60 * 60 + (time2[1]) * 60 + (+time2[2])
        console.log(seconds2)
        let finaltime = seconds1 - seconds2
        console.log(finaltime)
        console.log(this.getCurrentTime(finaltime))
        this.state.notes[i].Time = finaltime
    }
  }
  componentDidMount()
  {
    axios.get(`https://smartnote1.azurewebsites.net/api/users/${this.state.userID}`)
    .then(res => {
    this.setState({
      user : res.data
    });
    })
  }
  render() {
    const user = this.state;
    const waveOptions = {
        progressColor: 'darkorange',
        waveColor: 'orange',
        barWidth: 3
      };
      let notesToRender = this.state.notes? this.state.notes.filter(notes =>
        notes.Description.toLowerCase().includes(this.state.filterString.toLowerCase())): []

      if(this.state.meeting && this.state.counter == 0)
      {
        this.notesFixTime()
        this.state.counter++
      }
      
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
            onClick={() => this.handlePosChange(notes.Time)}>
            <h3 > <img className="note-icon" src={noteIcon} /> Time : {this.getCurrentTime(notes.Time)} - Description : {notes.Description}</h3>
            </button>
            )}
        </div>
        

      </div>
      );
  }
}