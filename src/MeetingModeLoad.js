import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import NavbarMenu from './Navbar';
import Popup from "reactjs-popup";
import axios from 'axios';
import {history, Redirect, Route} from "react-router";



export default class MeetingModeLoad extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            meeting:{},
            value:0,
            redirectBool:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleSubmit(event) 
    {
        let history = this.props.browserHistory
        event.preventDefault();
        let meetingLoadCode = this.state.value
        console.log("reee" + meetingLoadCode)  
        try{
        let getter = await axios.get(`https://smartnote1.azurewebsites.net/api/meetings/${meetingLoadCode}`)
        console.log(getter)
        
        let meetingLocal = getter.data
        this.setState({meeting:meetingLocal})
        console.log(meetingLocal)
        console.log(this.state.meeting)
        if(meetingLocal.Status == 2)
        {
            console.log("please join meeting that is planned or under going")
        }
        else
        {
            console.log("/meetingMode/" + this.state.meeting.MeetingID);
            //<Redirect push to={"/meetingMode/" + this.state.meeting.MeetingID}/>
            this.props.history.push(/meetingMode/ + this.state.meeting.MeetingID)
        }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    handleChange(event) 
    {
        this.state.value = event.target.value
        console.log(this.state.value)
    }
render()
{
    return(            
            <div>
                <Popup
                    trigger={<button className="meetingModeButton" onClick={() => this.handleClick}>Meeting Mode</button>}
                    modal
                    closeOnDocumentClick>
                        <div className="newNote">
                            <header style={{background: "#F7941D" }}> Meeting Mode</header>
                            <form onSubmit={this.handleSubmit}>
                            <label> Enter Meeting Code : 
                                <input type="text" name="type" className="inputBox"  onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Submit" />
                            </form>
                        </div>
                        {console.log(this.state.meeting)}
                </Popup>  
            </div>
    )
}
}
