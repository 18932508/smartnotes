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


class Login extends Component {
  render() {
    return <div className="App">
          <LoggedIn />
      </div>
  }
}


export default Login;