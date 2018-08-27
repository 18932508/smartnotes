import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import MakeMeeting from'./MakeMeeting';
import NavbarMenu from './Navbar';
import UpcomingMeetings from './UpcomingMeetings';
import PastMeetings from './PastMeetings';
import Popup from "reactjs-popup";

export default class MainMenu extends Component{
constructor(props)
    {
        super(props);
        this.state ={
            vdate : '',
            vroom : '',
            vtime : '',
            vtype : '',

            newMeeting : {
                code : 0,
                date : '',
                room : '',
                time: '',
                type: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        let upcomingMeetingList = this.props.serverData.user.upcomingMeetings;
        let newMeetingCode = upcomingMeetingList[upcomingMeetingList.length - 1].code + 1

        console.log(upcomingMeetingList)
        let newMeeting =  Object.assign([], this.state.newMeeting);

        newMeeting.code = this.state.newMeetingCode
        newMeeting.date= this.state.vdate
        newMeeting.room = this.state.vroom
        newMeeting.time= this.state.vtime
        newMeeting.type=  this.state.vtype
        
        console.log(this.props.newMeeting)

        let serverData =  Object.assign([],this.state.serverData);
        console.log(serverData)
        this.setState(this.state.serverData.user.upcomingMeetings[this.state.upcomingMeetingList.length] = (this.state.newMeeting));
        console.log('REEEE')
        console.log(this.state.serverData.user.upcomingMeetings)

        event.preventDefault();
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }

render()
{
    let serverData = this.props.serverData
    return(            
            <div>
            <NavbarMenu />
            <h1>Welcome {serverData.user.name}</h1>
            <MeetingMode />
            

            <div style={{display: 'inline-block'}}>
                <Popup
                trigger={<button className="meetingModeButton" onClick={() => this.handleClick}>Make Meeting</button>}
                modal
                closeOnDocumentClick>
                    <div className="newNote">
                        <header style={{background: "#F7941D" }}> New Upcoming Meeting</header>
                        <form onSubmit={this.handleSubmit}>
                        <label> Date : 
                        <input type="text" name="date" className="inputBox" value={this.state.vdate} onChange={this.handleChange}/>
                        </label>
                        <label> Room : 
                        <input type="text" name="room" className="inputBox" value={this.state.vroom} onChange={this.handleChange}/>
                        </label>
                        <label> Time : 
                        <input type="text" name="time" className="inputBox" value={this.state.vtime} onChange={this.handleChange}/>
                        </label>
                        <label> Type : 
                        <input type="text" name="type" className="inputBox" value={this.state.vtype} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                </Popup>    
            </div>


            <div className="why">
            <UpcomingMeetings serverData={serverData.user.upcomingMeetings}/>
            <PastMeetings serverData={serverData.user.pastMeetings}/>
            </div>
           </div>
    )
}
}