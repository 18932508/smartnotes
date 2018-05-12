import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import MakeMeeting from'./MakeMeeting';
import NavbarMenu from './Navbar';
import UpcomingMeetings from './UpcomingMeetings';
import PastMeetings from './PastMeetings';

export default class MainMenu extends Component{
render()
{
    let serverData = this.props.serverData
    return(
        <div>
            <NavbarMenu />
            <h1>Welcome {this.props.serverData.user.name}</h1>
            <MeetingMode />
            <MakeMeeting />
            <div className="why">
            <UpcomingMeetings serverData={this.props.serverData.user.upcomingMeetings}/>
            <PastMeetings serverData={this.props.serverData.user.pastMeetings}/>
            </div>
           </div>
    )
}
}