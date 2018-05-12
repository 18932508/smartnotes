import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";

export default class PastMeetingPlay extends Component
{
    render()
    {
        let pastMeeting=this.props.pastMeetingList
        return(
            <h1>{pastMeeting.code} - {pastMeeting.date}</h1>
        )
    }
}