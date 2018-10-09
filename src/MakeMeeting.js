import React, { Component } from 'react';
import './App.css';
import Popup from "reactjs-popup";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import DatePicker from 'react-date-picker'
import axios from 'axios'

export default class MakeMeeting extends Component{
    constructor(props)
    {
        super(props);
        this.state ={           
            date: new Date(),
            newDate : new Date(),
            selectedTime : null,
            description : null,
            options : [
                '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
            ],
            dateCreated: null,
            datePlanned: null,
            userId: this.props.userID
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }
    handleSubmit(event) {
        this.setPlannedDate(this.state.newDate)
        this.setCreatedDate(this.state.date)
        console.log(this.state.dateCreated)
        console.log(this.state.datePlanned)
        
        fetch('https://smartnote1.azurewebsites.net/api/meetings', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Description :this.state.description,
                CreatedDate : this.state.dateCreated,
                PlannedStartTime : this.state.datePlanned,
                StartTime : this.state.datePlanned, 
                EndTime : this.state.datePlanned,
                Status : 0,
                AudioFile : null,
                CreatedBy : this.state.userId
        })
        })
        .then((response) => response.text())
        .then((responseText) => {
            console.log(responseText);
        })
        .catch((error) => {
            console.error(error);
        });

        event.preventDefault();
    }
    handleChange(event) {
        this.setState({ description: event.target.value });
    }
    onChange = newDate => this.setState({newDate})  
    _onSelect (option) {
        console.log('You selected ', option.label)
        this.setState({selectedTime: option.value})
      }
      setPlannedDate(date)
      {
        let final = null
        date = date.toString()
        let month = date.slice(4,7)
        let isDone = false
        while(!isDone)
        {
          if(month === "Jan")
          {
            month = "01"
            isDone = true
          }   
          if(month === "Feb")
          {
            month = "02"
            isDone = true
          }    
          if(month === "Mar")
          {
            month = "03"
            isDone = true
          }    
          if(month === "Apr")
          {
            month = "04"
            isDone = true
          }    
          if(month === "May")
          {
            month = "05"
            isDone = true
          }    
          if(month === "Jun")
          {
            month = "06"
            isDone = true
          }    
          if(month === "Jul")
          {
            month = "07"
            isDone = true
          }    
          if(month === "Aug")
          {
            month = "08"
            isDone = true
          }   
          if(month === "Sep")
          {
            month = "09"
            isDone = true
          }    
          if(month === "Oct")
          {
            month = "10"
            isDone = true
          }    
          if(month === "Nov")
          {
            month = "11"
            isDone = true
          }    
          if(month === "Dec")
          {
            month = "12"
            isDone = true
          }
        }
        let time = this.state.selectedTime
        console.log(time)
        time  += ":00.511Z"
        let year = date.slice(11,15)
        let day = date.slice(8,10)
        final = year+ "-" +month+ "-"+ day+ "T" +time
        console.log(" month = "+ month)
        console.log(" time = "+ time)
        console.log(" year = "+ year)
        console.log(" day = "+ day)
        console.log(" final = "+ final)
        this.state.datePlanned = final
        console.log(this.state.datePlanned)
      }
      setCreatedDate(date)
        {
        console.log(this.state.newDate)
        let final = null
        date = date.toString()
        let month = date.slice(4,7)
        let isDone = false
        while(!isDone)
        {
            if(month === "Jan")
            {
            month = "01"
            isDone = true
            }   
            if(month === "Feb")
            {
            month = "02"
            isDone = true
            }    
            if(month === "Mar")
            {
            month = "03"
            isDone = true
            }    
            if(month === "Apr")
            {
            month = "04"
            isDone = true
            }    
            if(month === "May")
            {
            month = "05"
            isDone = true
            }    
            if(month === "Jun")
            {
            month = "06"
            isDone = true
            }    
            if(month === "Jul")
            {
            month = "07"
            isDone = true
            }    
            if(month === "Aug")
            {
            month = "08"
            isDone = true
            }   
            if(month === "Sep")
            {
            month = "09"
            isDone = true
            }    
            if(month === "Oct")
            {
            month = "10"
            isDone = true
            }    
            if(month === "Nov")
            {
            month = "11"
            isDone = true
            }    
            if(month === "Dec")
            {
            month = "12"
            isDone = true
            }
        }
        let time = date.slice(16,24)
        time  += ".511Z"
        let year = date.slice(11,15)
        let day = date.slice(8,10)
        final = year+ "-" +month+ "-"+ day+ "T" +time
        console.log(" month = "+ month)
        console.log(" time = "+ time)
        console.log(" year = "+ year)
        console.log(" day = "+ day)
        console.log(" final = "+ final)
        this.state.dateCreated = final
        console.log(this.state.dateCreated)
        }

render()
{
    return(
        <div style={{display: 'inline-block'}}>
        <Popup
        trigger={<button className="meetingModeButton" onClick={() => this.handleClick}>Make Meeting</button>}
        modal
        closeOnDocumentClick>
            <div className="newNote">
                <header style={{background: "#F7941D" }}> New Upcoming Meeting</header>
                <form onSubmit={this.handleSubmit}>
                <label> Date : 
                    <DatePicker 
                    onChange={this.onChange}
                    value={this.state.newDate}
                    minDate={this.state.date}/>
                </label>
                <label> Time : 
                    <Dropdown options={this.state.options} onChange={this._onSelect} value={this.state.selectedTime} placeholder="Select a Time" />
                </label>
                <label> Type : 
                    <input type="text" name="type" className="inputBox"  onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        </Popup>    
    </div>
    )
}
}