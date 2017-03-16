import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse">
        <div className="container">
        <a className="navbar-brand" href="#">
        <i className="fa fa-globe" aria-hidden="true"></i> NAV-eddit
        </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
