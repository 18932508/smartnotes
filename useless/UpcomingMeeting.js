import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";


export default class UpcomingMeeting extends Component
{
    render()
    {
        let meeting = this.props.upcomingMeetingList
    return(
        <div className="yay">
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{meeting.name.upcomingMeetings.code} </ h3>
        <h3 style={{display: "inline-block"}}>-</h3>
        <h3 id="date" style={{display: "inline-block"}} >{meeting.date} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{meeting.place}</h4>  
        <h4 style={{display: "inline-block"}}>-</h4>
        <h4 id="time" style={{display: "inline-block"}}>{meeting.time}</h4>
        <h4 style={{display: "inline-block"}}>-</h4> 
        <h4 id="type" style={{display: "inline-block"}}>{meeting.type}</h4> 
        </div>
        </div>
        )
    }
}