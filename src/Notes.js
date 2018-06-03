import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import NavbarMenu from './Navbar';

export default class Notes extends Component{

    render(){
        let notes = this.props.notes;
    return(
        <div>
            <header className="App-header">Notes</header>
            {notes.map(notes =>
            <button className="yay2" onClick={this.noteClick(notes.time)}>
            <h3 >Time : {notes.timecode} - Description : {notes.description}</h3>
            </button>
            )}
        </div>
    )
    }
}