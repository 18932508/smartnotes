import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import NavbarMenu from './Navbar';
import Notes from './Notes';

export default class PastMeetingPlay extends Component
{
    render()
    {
        let meetingCode = this.props.params.meetingCode
        let serverData=this.props.serverData.user.pastMeetings
        console.log(meetingCode)
        console.log(serverData)

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
            <h1>SOUNDWAVE HERE</h1>
            <h1>AUDIO HERE</h1>
            <h1>NOTES HERE</h1>
            <Notes notes={pastMeeting.notes}/>
            </div>
        )
    }
}