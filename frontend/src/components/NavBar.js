import React from 'react';
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ authenticated, setAuthenticated }) => {
  const tid = useSelector(state => state.selections.tale ? `/tales/${state.selections.tale.id}` : "")
  
  return (<header>
    <h1>TaleSpinner</h1>
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>

      {authenticated && <>
      
        <li>
          <NavLink to={`/worldweaver`} exact={true} activeClassName="active">
            WorldWeaver
          </NavLink>
        </li>
      
        <li>
          <NavLink to={`/talespinner`} exact={true} activeClassName="active">
            TaleSpinner
          </NavLink>
        </li>
        
        <li>
          <NavLink to={`/gallery`} exact={true} activeClassName="active">
            Games 
            {/* Spotlight, discovery, find, new, latest, by your followed, by tag, popular */}
          </NavLink>
        </li>
        
        <li>
          <NavLink to={`/library`} exact={true} activeClassName="active">
            Library
          </NavLink>
        </li>
        
        {/* <li>
          <NavLink to="/characters" exact={true} activeClassName="active">
            My Characters
          </NavLink>
        </li>
        <li>
          <NavLink to="/Places" exact={true} activeClassName="active">
            My Places
          </NavLink>
        </li>
        <li>
          <NavLink to="/assets" exact={true} activeClassName="active">
            My Assets
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}

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
        {!authenticated && <>
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