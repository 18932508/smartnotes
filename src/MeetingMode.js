import React, { Component } from 'react';
import './App.css';

export default class MeetingMode extends Component{
render()
{
    return(
        <div style={{display: 'inline-block'}}>
            <button className="meetingModeButton">Meeting Mode</button>
        </div>
    )
}
}