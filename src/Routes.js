import React, { Component } from 'react';
import './App.css';
import {Router, Route, browserHistory} from "react-router";

import MainMenu from "./MainMenu";
import UpComingMeetings from "./UpcomingMeetings";
import PastMeetings from "./PastMeetings";
import PastMeetingsPlay from "./PastMeetingsPlay";
import Login from "./Login";

export default class AppRoutes extends Component{
    render()
    {
        return(
            <div className="App">
            <Router history = {browserHistory}>
                <Route exact path="/" component={MainMenu}/>
                <Route exact path="/login"   component = {Login} />
                <Route exact path="/pastMeetingsPlay/:code"   component = {PastMeetingsPlay} />
                
            </Router>
            </div>
        )
    }
}