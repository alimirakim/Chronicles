import React from "react";
import {Redirect} from 'react-router-dom'
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false)
    return <Redirect to="/login" />
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
