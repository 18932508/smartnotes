import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import MakeMeeting from'./MakeMeeting';
import NavbarMenu from './Navbar';
import UpcomingMeetings from './UpcomingMeetings';
import PastMeetings from './PastMeetings';
import Popup from "reactjs-popup";
import axios from 'axios';


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
            },
            attendsData:[],
            tempMeetings:[],
            upComingMeetingData:[],
            pastMeetingData:[],
            userData: this.props.userData

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
      }
    handleSubmit(event) {
        let upcomingMeetingList = this.props.serverData.user.upcomingMeetings;
        let newMeetingCode = upcomingMeetingList[upcomingMeetingList.length - 1].code + 1
        let vdate = this.state.vdate
        let vroom = this.state.vroom
        let vtime = this.state.vtime
        let vtype = this.state.vtype

        console.log(upcomingMeetingList)
        console.log(newMeetingCode)
        let newMeeting =  Object.assign([], this.state.newMeeting);

        newMeeting.code = newMeetingCode
        newMeeting.date= this.state.vdate
        newMeeting.room = this.state.vroom
        newMeeting.time= this.state.vtime
        newMeeting.type=  this.state.vtype
        this.setState({newMeeting});
        console.log(this.state.newMeeting)
        console.log(event)
        

       // let serverData =  Object.assign([],this.state.serverData);
       // console.log(serverData)
       // this.setState(this.state.serverData.user.upcomingMeetings[this.state.upcomingMeetingList.length] = (this.state.newMeeting));
        console.log('REEEE')
        //console.log(this.state.serverData.user.upcomingMeetings)

        event.preventDefault();
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
    let userData = this.state.userData
    const{tempMeetings, pastMeetingData, upComingMeetingData} = this.state
    console.log(pastMeetingData);
    return(            
            <div>
            <NavbarMenu />
            <h1>Welcome {userData.UserName}</h1>
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
                        <input type="text" name="date" className="inputBox" onChange={this.handleChange}/>
                        </label>
                        <label> Room : 
                        <input type="text" name="room" className="inputBox" onChange={this.handleChange}/>
                        </label>
                        <label> Time : 
                        <input type="text" name="time" className="inputBox"  onChange={this.handleChange}/>
                        </label>
                        <label> Type : 
                        <input type="text" name="type" className="inputBox"  onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                </Popup>    
            </div>


            <div className="why">
            <UpcomingMeetings serverData={this.state.upComingMeetingData}/>
            <PastMeetings userId = {this.state.userData.UserId} serverData={this.state.pastMeetingData}/>
            </div>
           </div>
    )
}
}
