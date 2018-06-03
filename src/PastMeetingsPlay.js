import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import NavbarMenu from './Navbar';
import Notes from './Notes';
import WaveTest from './WaveTest';

export default class PastMeetingPlay extends Component
{

    render()
    {
        let meetingCode = this.props.params.meetingCode
        let serverData=this.props.serverData.user.pastMeetings

        var i = serverData.length, pastMeeting;
        while(i--)
        {
            if(meetingCode == serverData[i].code){
                pastMeeting = serverData[i];
                break;
            }
        }
        console.log(pastMeeting)        
        return(
            <div>
            <NavbarMenu />
            <h1>{pastMeeting.code} - {pastMeeting.date}</h1>
            <WaveTest song={pastMeeting.audio.audiothing} notes={pastMeeting.notes} />
            </div>
        )
    }
}