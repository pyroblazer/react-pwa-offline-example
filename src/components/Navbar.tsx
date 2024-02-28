import React from 'react';
import logo from '../logo.svg';

const Navbar = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-brand">
          <img src={logo} width="35" height="35" className="d-inline-block align-middle" alt="" />
          Firebase Realtime Todo
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
