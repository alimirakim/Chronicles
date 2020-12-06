import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ authenticated, setAuthenticated }) => {
  
  return (<header>
    <h1>TaleSpinner</h1>
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>

      {!authenticated && <>
        <li>
          <NavLink to="/talespinner" exact={true} activeClassName="active">
            TaleSpinner
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </>}
        
        {/* For Anon Users, show only Login/Signup options: */}
        {authenticated && <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </>}
        
      </ul>
    </nav>
  </header>);
}

export default NavBar;