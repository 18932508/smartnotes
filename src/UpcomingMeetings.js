import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";


export default class UpcomingMeetings extends Component
{
    render()
    {
        let upcomingMeetingList = this.props.serverData
    return(
        <div className="meetingDivU">
        <h1 className="UpcomingMeetings">UpcomingMeetings</h1>
        <div>
        {upcomingMeetingList.map(upcomingMeetingList =>         
        <div className="yay">
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{upcomingMeetingList.code} </ h3>
        <h3 style={{display: "inline-block"}}>-</h3>
        <h3 id="date" style={{display: "inline-block"}} >{upcomingMeetingList.date} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{upcomingMeetingList.place}</h4>  
        <h4 style={{display: "inline-block"}}>-</h4>
        <h4 id="time" style={{display: "inline-block"}}>{upcomingMeetingList.time}</h4>
        <h4 style={{display: "inline-block"}}>-</h4> 
        <h4 id="type" style={{display: "inline-block"}}>{upcomingMeetingList.type}</h4> 
        </div>
        </div>)}
        </div>
        </div>
        )
    }
}