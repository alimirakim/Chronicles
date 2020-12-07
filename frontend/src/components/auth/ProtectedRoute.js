import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {

  if (!props.authenticated) return <Redirect to="/sign-up" />

  return <Route {...props} />
};

export default ProtectedRoute;