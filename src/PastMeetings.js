import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import PastMeetingsPlay from "./PastMeetingsPlay";
import {Link} from "react-router";

/*Past Meetings
displays all the past meetings in a list for the user to select
clicking a meeting will load the user into that meeting

Also has a filter component to sort through the meetings by description*/

class Filter extends React.Component{
    render()
    {
      return(
        <div className="filterNotesPastMeetings"style={{color : "black", display: "inline-block"}}>
          <input placeholder="Filter Past Meeting" type="text" onKeyUp={event => 
            this.props.onTextChange(event.target.value)}/>
        </div>
      );
    }
  }

export default class PastMeetings extends Component
{
    constructor(props) {
        super(props);
        this.state = {      
            filterString: '',
            pastMeetingList : this.props.serverData,  
            userId : this.props.userId
        };
    }

    loadMeeting(pastMeetingList)
    {
            <Link to={"/pastMeetingsPlay/"+ pastMeetingList.code}/>
    }


    render()
    {
        let pastMeetingToRender = this.state.pastMeetingList? this.state.pastMeetingList.filter(pastMeetingList =>
            pastMeetingList.Description.toLowerCase().includes(this.state.filterString.toLowerCase())): []

    
    return(
        <div className="meetingDivP">
        <div>
        <h1 className="UpcomingMeetings">PastMeetings </h1>
        
        <Filter  onTextChange={text => this.setState({filterString: text})}/>
        </div>
        <div>
        {pastMeetingToRender.map(pastMeetingToRender =>         
        <Link to={"/pastMeetingsPlay/" + pastMeetingToRender.MeetingID} pastMeeting={pastMeetingToRender}>
        <div className="yay">
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{pastMeetingToRender.MeetingID} </ h3>
        <h3 style={{display: "inline-block"}}> - </h3>
        <h3 id="date" style={{display: "inline-block"}} >{pastMeetingToRender.EndTime.slice(0,10)} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{pastMeetingToRender.place}</h4>  
        <h4 style={{display: "inline-block"}}> - </h4>
        <h4 id="time" style={{display: "inline-block"}}>{pastMeetingToRender.EndTime.slice(11,16)}</h4>
        <h4 style={{display: "inline-block"}}> - </h4> 
        <h4 id="type" style={{display: "inline-block"}}>{pastMeetingToRender.Description}</h4> 
        </div>        
        </div>
        </Link>)}
        </div>
        
        </div>
        )
    }
}