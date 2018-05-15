import React, { Component } from 'react';
import logo from './smartNotesLogo.png';
import userIcon from './userIcon.png';
import './App.css';

import MainMenu from'./MainMenu';

class LoggedIn extends Component
{
  render()
  {
    return(
      <div className='App'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SmartNotes</h1>
        </header>
            <h3>Please Login</h3>
         <form onSubmit= { this.props.onSubmit }>
         <img style={{display:"inline-block"}} src={userIcon} className="User-icon" />
          <Input type='text' name='username' placeholder='username' />
          <Input type='password' name='password' placeholder='password' />
                <button className="btn"> Sign In</button>
              </form>
           </div>
    )
  }
}

class Input extends Component {
  render() {
    return <div className='memes'>
      <input className='input' type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false'/>
      <label for={ this.props.name } ></label>
     </div>
  }

}



let fakeServerData = {
  user:{
    name: "Calvin",
    upcomingMeetings:
    [
      {code :"123",
      date:"1/2/3",
      place:"home",
      time:"12:00",
      type:"up"},
      {code :"456",
      date:"1/2/3",
      place:"home",
      time:"12:00",
      type:"up"},
      {code :"789",
      date:"1/2/3",
      place:"home",
      time:"12:00",
      type:"up"}
    ],
    pastMeetings:
    [      
    {code :"123",
    date:"1/2/3",
    place:"home",
    time:"12:00",
    type:"past"},
    {code :"456",
    date:"1/2/3",
    place:"home",
    time:"12:00",
    type:"past"}]
  }
}

class App extends Component {
  constructor(){
    super()
    this.state={
      isLoggedIn: true,
      serverData: {}
    }
  }
  componentDidMount()
{
  setTimeout(() =>{
    this.setState({serverData: fakeServerData});
  },1000);
}
  loginButton (loggedin) 
  {
      this.setState({
        isLoggedIn: !this.state.isLoggedIn
      });
  };
  render() {
    let serverData = this.state.serverData
    console.log(serverData)
    return (
      <div className="App">

      {this.state.serverData.user ?
      <div>
        {
          this.state.isLoggedIn?
          <LoggedIn />
          :<MainMenu serverData={serverData}/>
        }
        <div>
          <button onClick={this.loginButton.bind(this)}>
          Login
          </button>
        </div>
      </div>: <h1>Loading...</h1>
      }
      </div> 
      
    );
  }
}


export default App;