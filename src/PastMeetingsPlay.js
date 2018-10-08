import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import NavbarMenu from './Navbar';
import Notes from './Notes';
import WaveTest from './WaveTest';
import axios from 'axios';

export default class PastMeetingPlay extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            notesData : null,
            meetingCode: this.props.params.meetingCode,
            meeting: null,
            userId: this.props.user
        }
    }
    componentDidMount()
    {
        axios.get(`https://smartnote1.azurewebsites.net/api/meetings/${this.state.meetingCode}`)
        .then(res => {
        this.setState({
            meeting : res.data
        });
        })
        axios.get(`https://smartnote1.azurewebsites.net/api/notes?userid=${this.state.userId}&meetingid=${this.state.meetingCode}`)
        .then(res => {
        this.setState({
          notesData : res.data
        });
        })
    }

    render()
    {
        console.log(this.state.notesData)
        console.log(this.state.meeting)
        /*     
        return(
            <div>
            <NavbarMenu />
            <h1>{pastMeeting.code} - {pastMeeting.date}</h1>
            <WaveTest song={pastMeeting.audio.audiothing} notes={pastMeeting.notes} />
            </div>
        )
        */
        const{meeting, meetingCode, notesData, userId} = this.state; 
        if(!this.state.notesData)
        {
            return <div/>
        }
        return(
            <div>
            <NavbarMenu />
            <h1></h1>
            <WaveTest  userId = {this.state.userId} meetingName = {this.state.meeting} notesData={this.state.notesData}/>
            </div>
        )
    }
}