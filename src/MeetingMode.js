import React, { Component } from 'react';
import './App.css';
import Popup from 'reactjs-popup'
import axios from 'axios'
import NavbarMenu from './Navbar';

/*Meeting Mode
Screen the user views after succesfully joining a meeting
allows user to join if meeting is planned or in progress
Only allows posting a note if in progress*/

export default class MeetingMode extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            meetingID : this.props.params.meetingCode,
            userID : this.props.user,
            value: '',
            meeting: {},
            date: "",
            time:"",
            warning:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    componentDidMount()
    {
        axios.get(`https://smartnote1.azurewebsites.net/api/meetings/${this.state.meetingID}`)
        .then(res => {
        this.setState({
            meeting : res.data,
            date: res.data.PlannedStartTime.slice(0,10),
            time: res.data.PlannedStartTime.slice(11,19)
        });
        })
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        let getter = await axios.get(`https://smartnote1.azurewebsites.net/api/meetings/${this.state.meetingID}`)
        let meetingLocal = getter.data
        if(meetingLocal.Status == 1)
        {
            fetch('https://smartnote1.azurewebsites.net/api/notes', {
                method: 'POST',
                headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              },
              body: JSON.stringify({      
                Time : "0001-01-01T00:00:00",
                UserID : this.state.userID,
                MeetingID : this.state.meetingID,
                Descriptions : this.state.value
              })
            })
            .then((response) => response.text())
            .then((responseText) => {
              console.log(responseText);
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else
        {
            this.setState({warning: "Please wait for the Meeting to begin"})
            setTimeout(()=>{
                this.setState({
                warning:""})
            },2500)
        }
    }
render()
{
    console.log(this.state.meeting)
    return(
        <div>
            <NavbarMenu />
            <h3>Meeting Number : {this.state.meetingID}</h3>
            <div>
            <h4>Date: {this.state.date}</h4>
            </div>
            <h4 margin-bottom="100px"> Starting Time: {this.state.time} </h4>
            <form onSubmit={this.handleSubmit}>
                <label> Note
                </label>
                <div>
                <label>
                  Description
                  <input type="text" className="inputBox" value={this.state.value} onChange={this.handleChange} />
                </label>
                </div>
                <input type="submit" value="Submit" />
              </form>
              <h3>{this.state.warning}</h3>
        </div>

    )
}
}