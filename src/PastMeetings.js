import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import PastMeetingsPlay from "./PastMeetingsPlay"

export default class PastMeetings extends Component
{

    loadMeeting(pastMeetingList)
    {
        return(
        <PastMeetingsPlay pastMeetingList={pastMeetingList} />
        )
    }

    render()
    {
        let pastMeetingList=this.props.serverData
    return(
        <div className="meetingDiv">
        <h1 className="UpcomingMeetings">PastMeetings</h1>
        <div>
        {pastMeetingList.map(pastMeetingList =>         
        <div className="yay" onClick={() => this.loadMeeting(pastMeetingList)}>
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{pastMeetingList.code} </ h3>
        <h3 style={{display: "inline-block"}}>-</h3>
        <h3 id="date" style={{display: "inline-block"}} >{pastMeetingList.date} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{pastMeetingList.place}</h4>  
        <h4 style={{display: "inline-block"}}>-</h4>
        <h4 id="time" style={{display: "inline-block"}}>{pastMeetingList.time}</h4>
        <h4 style={{display: "inline-block"}}>-</h4> 
        <h4 id="type" style={{display: "inline-block"}}>{pastMeetingList.type}</h4> 
        </div>
        </div>)}
        </div>  
        </div>
        )
    }
}