import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import PastMeetingsPlay from "./PastMeetingsPlay";

import {Link} from "react-router";

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
        };
    }

    loadMeeting(pastMeetingList)
    {
            <Link to={"/pastMeetingsPlay/"+ pastMeetingList.code}/>
    }

    render()
    {
        let pastMeetingToRender = this.state.pastMeetingList? this.state.pastMeetingList.filter(pastMeetingList =>
            pastMeetingList.type.toLowerCase().includes(this.state.filterString.toLowerCase())): []
            console.log(pastMeetingToRender);
    
    return(
        <div className="meetingDivP">
        <div>
        <h1 className="UpcomingMeetings">PastMeetings </h1>
        
        <Filter  onTextChange={text => this.setState({filterString: text})}/>
        </div>
        <div>
        {pastMeetingToRender.map(pastMeetingToRender =>         
        <Link to={"/pastMeetingsPlay/" + pastMeetingToRender.code} pastMeeting={pastMeetingToRender}>
        <div className="yay">
        <img src ={meetingIcon} alt="meetingIcon" style={{height:"30px", display: "inline-block", textAlign : "left"}} />
        <h3 id="code" style={{display: "inline-block"}} >{pastMeetingToRender.code} </ h3>
        <h3 style={{display: "inline-block"}}>-</h3>
        <h3 id="date" style={{display: "inline-block"}} >{pastMeetingToRender.date} </ h3>
        <div>
        <h4 id="place" style={{display: "inline-block"}}>{pastMeetingToRender.place}</h4>  
        <h4 style={{display: "inline-block"}}>-</h4>
        <h4 id="time" style={{display: "inline-block"}}>{pastMeetingToRender.time}</h4>
        <h4 style={{display: "inline-block"}}>-</h4> 
        <h4 id="type" style={{display: "inline-block"}}>{pastMeetingToRender.type}</h4> 
        </div>        
        </div>
        </Link>)}
        </div>
        
        </div>
        )
    }
}