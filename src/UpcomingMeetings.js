import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";


/*Upcoming Meetings
exactly like past Meetings, gets data and lists it, also has filter by description*/
class Filter extends React.Component{
    render()
    {
      return(
        <div className="filterNotesPastMeetings"style={{color : "black", display: "inline-block"}}>
          <input placeholder="Filter Upcoming Meeting" type="text" onKeyUp={event => 
            this.props.onTextChange(event.target.value)}/>
        </div>
      );
    }
  }

export default class UpcomingMeetings extends Component
{
    constructor(props) {
        super(props);
        this.state = {      
            filterString: '',
            upcomingMeetingList : this.props.serverData
        };
    }
    render()
    {
        let upcomingMeetingToRender = this.state.upcomingMeetingList? this.state.upcomingMeetingList.filter(upcomingMeetingList =>
            upcomingMeetingList.Description.toLowerCase().includes(this.state.filterString.toLowerCase())): []
    return(
        <div className="meetingDivU">
        <div>
        <h1 className="UpcomingMeetings">UpcomingMeetings</h1>
        <Filter  onTextChange={text => this.setState({filterString: text})}/>

        </div>
        <div>
        {upcomingMeetingToRender.map(upcomingMeetingList =>         
        <div className="yay">
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{upcomingMeetingList.MeetingID} </ h3>
        <h3 style={{display: "inline-block"}}>-</h3>
        <h3 id="date" style={{display: "inline-block"}} >{upcomingMeetingList.EndTime.slice(0,10)} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{upcomingMeetingList.place}</h4>  
        <h4 style={{display: "inline-block"}}>-</h4>
        <h4 id="time" style={{display: "inline-block"}}>{upcomingMeetingList.EndTime.slice(11,16)}</h4>
        <h4 style={{display: "inline-block"}}>-</h4> 
        <h4 id="type" style={{display: "inline-block"}}>{upcomingMeetingList.Description}</h4> 
        </div>
        </div>)}
        </div>
        </div>
        )
    }
}