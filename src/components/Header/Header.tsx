import React, {Component} from 'react';
import logo from '../../assets/imgs/logo.svg';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';


export default class Header extends Component {
  render() {
    return (
        <header>
          <Nav>
            <Nav.Item>
              <NavLink exact className="nav-link" to="/" activeClassName="active">Main</NavLink>
            </Nav.Item>
          </Nav>
        </header>

    );
  }
}
