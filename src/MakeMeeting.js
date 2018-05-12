import React, { Component } from 'react';
import './App.css';

export default class MakeMeeting extends Component{
render()
{
    return(
        <div style={{display: 'inline-block'}}>
            <button className="meetingModeButton">Make Meeting</button>
        </div>
    )
}
}