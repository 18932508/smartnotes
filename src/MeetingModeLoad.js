import React, { Component } from 'react';
import './App.css';

import MeetingMode from'./MeetingMode';
import NavbarMenu from './Navbar';
import Popup from "reactjs-popup";
import axios from 'axios';
import history  from 'history'
import {Link} from "react-router";

/*Meeting Moad Load
simple popup from main menu
allows the user to enter a meeting ID and it checks its status
after its checked and appropiate then the user is able to the meeting */

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
        event.preventDefault();
        let meetingLoadCode = this.state.value
        try{
        let getter = await axios.get(`https://smartnote1.azurewebsites.net/api/meetings/${meetingLoadCode}`)
        let meetingLocal = getter.data
        this.setState({meeting:meetingLocal})
        if(meetingLocal.Status == 2)
        {
            console.log("please join meeting that is planned or under going")
        }
        else
        {
            console.log("/meetingMode/" + this.state.meeting.MeetingID);
            this.setState({
            redirectBool : true
            })
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
                            <input type="submit" value="Check Meeting Status" />
                            </form>
                            {this.state.redirectBool && <Link to={"/meetingMode/" + this.state.meeting.MeetingID}><button>Join Meeting</button></Link>}
                        </div>
                </Popup>  
            </div>
    )
}
}