import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import MakeMeeting from'./MakeMeeting';
import NavbarMenu from './Navbar';
import UpcomingMeetings from './UpcomingMeetings';
import PastMeetings from './PastMeetings';
let fakeServerData = {
    user:{
      name: "Calvin",
      upcomingMeetings:
      [
        {code :"123",
        date:"1/2/3",
        place:"home",
        time:"12:00",
        type:"up"},
        {code :"456",
        date:"1/2/3",
        place:"home",
        time:"12:00",
        type:"up"},
        {code :"789",
        date:"1/2/3",
        place:"home",
        time:"12:00",
        type:"up"}
      ],
      pastMeetings:
      [      
      {code :"123",
      date:"1/2/3",
      place:"home",
      time:"12:00",
      type:"past"},
      {code :"456",
      date:"1/2/3",
      place:"home",
      time:"12:00",
      type:"past"}]
    }
  }
export default class MainMenu extends Component{
    constructor(){
        super()
        this.state={
          isLoggedIn: true,
          serverData: {}
        }
      }
      componentDidMount()
    {
      setTimeout(() =>{
        this.setState({serverData: fakeServerData});
      },1000);
    }
render()
{
    let serverData = this.state.serverData
    console.log(serverData)
    return(
        
        <div>
            {this.state.serverData.user ?
            <div>
            <NavbarMenu />
            <h1>Welcome {this.state.serverData.user.name}</h1>
            <MeetingMode />
            <MakeMeeting />
            <div className="why">
            <UpcomingMeetings serverData={this.state.serverData.user.upcomingMeetings}/>
            <PastMeetings serverData={this.state.serverData.user.pastMeetings}/>
            </div>
            </div>:<h1>Loading...</h1>
            }
           </div>
    )
}
}