import React, { Component } from 'react';
import './App.css';
import logo from './smartNotesLogo.png';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavbarMenu extends Component{
    render()
    {
        let memes=(
        <Navbar>
            <Navbar.Header>
              <Navbar.Brand>         
                  <img src={logo} className="Nav-logo" alt="logo" />
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
            </Nav>
          </Navbar>);
        return(
        <div>
        {memes}
        </div>
        );
    }
}