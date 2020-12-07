import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

// COMPONENTS
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Home from './components/Home'
import TaleSpinner from './components/TaleSpinner'
import TaleStart from './components/play/TaleStart'
import CurrentThread from './components/play/CurrentThread'


// ACTIONS
import {getChronicles} from './actions/chronicleActions'
import {getTales} from './actions/taleActions'
import {getThreads} from './actions/threadActions'
import {getChoices} from './actions/choiceActions'


function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const chronicles = useSelector(state => state.chronicles)
  // const tales = useSelector(state => state.tales)
  const threads = useSelector(state => state.threads)
  // const choices = useSelector(state => state.choices)

  useEffect(() => {
    (async() => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
    });
    const content =  await res.json();
    console.log("App content", content)
    if (!content.errors) {
        setAuthenticated(true)
        dispatch(getChronicles(content.chronicles))
        dispatch(getTales(content.tales))
        dispatch(getThreads(content.threads))
        dispatch(getChoices(content.choices))
      }
      setLoaded(true)
    })()
  }, [])
  
  if (!loaded) return null

  return (
    <BrowserRouter>
      
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      
      {/* Login and Signup forms */}
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm 
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      
      <Route path="/chronicles/:cid/tales/:tid" exact={true}>
        <TaleStart />
      </Route>
      <Route path="/chronicles/:cid/tales/:tid/play">
        <CurrentThread />
      </Route>
      
      {/* Homepage */}
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Home />
      </ProtectedRoute>

      {/* TaleSpinner */}
      <ProtectedRoute path="/talespinner/tales/:tid" exact={true} authenticated={authenticated}>
        <TaleSpinner threads={threads} />
      </ProtectedRoute>

      {/* User list and individual user profiles */}
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList/>
      </ProtectedRoute>
      <ProtectedRoute path="/users/:uid" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>

    </BrowserRouter>
  );
}

export default App;
