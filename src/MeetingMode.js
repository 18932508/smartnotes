import React, { Component } from 'react';
import './App.css';
import Popup from 'reactjs-popup'
import axios from 'axios'

export default class MeetingMode extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            meetingID : this.props.params.meetingCode,
            userID : this.props.user,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
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
                Time : "0001-01-01T12:00:00.51",
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
            console.log("be patient")
        }
    }
render()
{
    return(
        <div>
            {this.state.userID} {this.state.meetingID} 
            <form onSubmit={this.handleSubmit}>
                <label> NOTE
                </label>
                <div>
                <label>
                  Description:
                  <input type="text" className="inputBox" value={this.state.value} onChange={this.handleChange} />
                </label>
                </div>
                <input type="submit" value="Submit" />
              </form>
        </div>

    )
}
}