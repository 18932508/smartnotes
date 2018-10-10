import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import MakeMeeting from'./MakeMeeting';
import NavbarMenu from './Navbar';
import UpcomingMeetings from './UpcomingMeetings';
import PastMeetings from './PastMeetings';
import MeetingModeLoad from './MeetingModeLoad';
import Popup from "reactjs-popup";
import axios from 'axios';



export default class MainMenu extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            attendsData:[],
            tempMeetings:[],
            upComingMeetingData:[],
            pastMeetingData:[],
            userData: this.props.userData
        };
    }

    componentDidMount()
    {
        axios.get(`https://smartnote1.azurewebsites.net/api/attends`)
        .then(res => {
        this.setState({
          attendsData : res.data
        });
        }),
        axios.get(`https://smartnote1.azurewebsites.net/api/meetings`)
        .then(res => {
        this.setState({
            tempMeetings : res.data
        })
        })
        
  }
  sortMeetings()
  {
    this.state.tempMeetings.map(m =>
        {
        if(m.Status == 2)
        {
            this.state.pastMeetingData.push(m);
        }
        else if(m.Status == 0)
        {
            this.state.upComingMeetingData.push(m);
        }
    }
    )
    }


render()
{
    this.sortMeetings();
    const{userData} = this.state
    const{tempMeetings, pastMeetingData, upComingMeetingData} = this.state
    console.log(this.state.userData.UserID);
    return(            
            <div>
            <NavbarMenu />
            <h1>Welcome {userData.UserName}</h1>     
            <div style={{display: 'inline-block'}}>
                <MeetingModeLoad />
            </div>
            <MakeMeeting userID = {this.state.userData.UserID}/>
            <div className="why">
            <UpcomingMeetings serverData={this.state.upComingMeetingData}/>
            <PastMeetings userId = {this.state.userData.UserID} serverData={this.state.pastMeetingData}/>
            </div>
           </div>
    )
}
}
