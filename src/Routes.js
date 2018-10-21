import React, { Component } from 'react';
import './App.css';
import {Router, Route, browserHistory} from "react-router";
import axios from 'axios';

import MainMenu from "./MainMenu";
import PastMeetingsPlay from "./PastMeetingsPlay";
import Login from "./Login";
import MeetingMode from "./MeetingMode";


/*Routes
Main page of the app that determines what the user is looking at according to the url
gets the user data and passes this down to Main Menu*/
export default class AppRoutes extends Component{
    constructor(){
        super()
        this.state={
          userData: [],
          history : null
        }
      }
      componentDidMount()
    {
      axios.get(`https://smartnote1.azurewebsites.net/api/users/1`)
      .then(res => {
      this.setState({
        userData : res.data
      });
    }
  )
}
    render()
    {
        const userData = this.state;
        return(
            <div className="App">
            {this.state.userData.UserName ?
            <div>
            <Router history = {browserHistory}>
                <Route exact path="/" component={() => <MainMenu history={this.props.history}  userData={this.state.userData}/>}/>
                <Route exact path="/login"   component = {Login} />
                <Route exact path="/pastMeetingsPlay/:meetingCode"   component={(props) => <PastMeetingsPlay  user={this.state.userData.UserID} {...props}/>} />
                <Route exact path="/meetingMode/:meetingCode" component={(props) => <MeetingMode user={this.state.userData.UserID} {...props}/>} />
            </Router>
            </div>:<h1>Loading...</h1>
            }
            </div>
        )
    }
}