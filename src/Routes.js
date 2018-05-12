import React, { Component } from 'react';
import './App.css';
import { Router, Route, IndexRoute, hashHistory} from "react-router";

import MainMenu from "./MainMenu";
import UpComingMeetings from "./UpcomingMeetings";
import PastMeetings from "./PastMeetings";
import PastMeetingsPlay from "./PastMeetingsPlay";

export default class AppRoutes extends Component{
    render()
    {
        return(
            <Router history = {hashHistory}>
                <Route path="/" component={MainMenu}>
                    <IndexRoute comonpent={MainMenu} />
                    <Route path="pastMeeting" component = {PastMeetingsPlay} />
                    <Route path="upcomingMeeting" component = {UpComingMeetings} />
                </Route>
            </Router>
        )
    }
}