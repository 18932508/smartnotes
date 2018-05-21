import React, { Component } from 'react';
import './App.css';
import meetingIcon from "./meetingIcon.png";
import NavbarMenu from './Navbar';

export default class PastMeetingPlay extends Component
{
    render()
    {
        let pastMeeting=this.props.pastMeeting
        console.log(pastMeeting)
        return(
            <div>
            <NavbarMenu />
            <h1>{this.props.params.code}</h1>
            </div>
        )
    }
}