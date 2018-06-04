import React, { Component } from 'react';
import './App.css';
import {Router, Route, browserHistory} from "react-router";

import MainMenu from "./MainMenu";
import UpComingMeetings from "./UpcomingMeetings";
import PastMeetings from "./PastMeetings";
import PastMeetingsPlay from "./PastMeetingsPlay";
import Login from "./Login";
import audiothing from "./PM1.mp3"

let fakeServerData = {
    user:{
      name: "Calvin",
      upcomingMeetings:
      [
        {code :"1234",
        date:"5/6/2018",
        place:"TLC-212",
        time:"2:00",
        type:"Investor update"},
        {code :"1235",
        date:"12/6/2018",
        place:"TLC-414",
        time:"10:00",
        type:"Update Meeting"},
        {code :"1236",
        date:"27/7/2018",
        place:"BG-Common",
        time:"11:00",
        type:"Stratergy Meeting"}
      ],
      pastMeetings:
      [      
      {code :"1231",
      date:"30/5/2018",
      place:"PS2-212",
      time:"1:30",
      type:"Update Meeting",
      audio: {audiothing},
      notes:[
        {timecode: "1:00",
         time: 60,
         description: "Change template for clients"},
         {timecode: "2:00",
         time: 120,
         description: "Make sure to call to schedule meeting for clients"},
         {timecode: "3:00",
         time: 180,
         description: "Change meeting time with designers for project"},
      ]
    },
      {code :"1232",
      date:"25/5/2018",
      place:"BG-115",
      time:"11:00",
      type:"Update Meeting",
      notes:[
        {timecode: "1:00",
         description: "Note 1"},
        {timecode: "2:00",
        description: "Note 2"},
      ]}]
    }
  }


export default class AppRoutes extends Component{
    constructor(){
        super()
        this.state={
          serverData: {}
        }
      }
      componentDidMount()
    {
      setTimeout(() =>{
        this.setState({serverData: fakeServerData});
      },1000);
    }
    render()
    {
        let serverData = this.state.serverData
        console.log(serverData)
        return(
            <div className="App">
            {this.state.serverData.user ?
             
            <div>
            <Router history = {browserHistory}>
                <Route exact path="/" component={() => <MainMenu  serverData={this.state.serverData}/>}/>
                <Route exact path="/login"   component = {Login} />
                <Route exact path="/pastMeetingsPlay/:meetingCode"   component={(props) => <PastMeetingsPlay  serverData={serverData} {...props}/>} />
            </Router>
            </div>:<h1>Loading...</h1>
            }
            </div>
        )
    }
}