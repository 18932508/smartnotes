import React, { Component } from 'react';
import './App.css';
import Popup from "reactjs-popup";

export default class MakeMeeting extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
        date : '',
        room : '',
        time : '',
        type : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {

        event.preventDefault();
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

render()
{
    let upcomingMeetingList = this.props.serverData
    return(
        
        <div style={{display: 'inline-block'}}>
        {console.log(upcomingMeetingList )}
                <Popup
        trigger={<button className="meetingModeButton" onClick={() => this.handleClick}>Make Meeting</button>}
        modal
        closeOnDocumentClick>
        <div className="newNote">
        <header style={{background: "#F7941D" }}> New Upcoming Meeting</header>
        <form onSubmit={this.handleSubmit}>
        <label> Date : 
        <input type="text" name="date" className="inputBox" date={this.state.date} onChange={this.handleChange}/>
        </label>
        <label> Room : 
        <input type="text" name="room" className="inputBox" room={this.state.room} onChange={this.handleChange}/>
        </label>
        <label> Time : 
        <input type="text" name="time" className="inputBox" time={this.state.time} onChange={this.handleChange}/>
        </label>
        <label> Type : 
        <input type="text" name="type" className="inputBox" type={this.state.type} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
        </form>
        </div>
        </Popup>    
        </div>
    )
}
}