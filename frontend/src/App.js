import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './components/Home'
import SignUpForm from "./components/auth/SignUpForm"
import LoginForm from "./components/auth/LoginForm"
import UsersList from "./components/UsersList"
import User from "./components/User"
import PlayGallery from './components/PlayGallery'
import Library from './components/Library'
import ChroniclePage from './components/ChroniclePage.js'
import TalePage from './components/TalePage'
import WorldWeaver from './components/WorldWeaver'
import TaleSpinner from './components/TaleSpinner'
import CurrentThread from './components/CurrentThread'



// ACTIONS
import { getCreations } from './actions/chronicleActions'

function App() {
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const chronicles = useSelector(state => state.chronicles)
  // const tales = useSelector(state => state.tales)
  const threads = useSelector(state => state.threads)
  // const choices = useSelector(state => state.choices)

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      });
      const content = await res.json();
      console.log("App content", content)
      if (!content.errors) {
        setAuthenticated(true)
        dispatch(getCreations(content))
      }
      setLoaded(true)
    })()
  }, [])

  if (!loaded) return null

  return (
    <BrowserRouter>

      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />

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
      <Route path="/" exact={true}>
        <Home
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>

      <Route path="/gallery" exact={true}>
        <PlayGallery />
      </Route>

      <Route path="/chronicles/:cid" exact={true}>
        <ChroniclePage />
      </Route>
      <Route path="/chronicles/:cid/tales/:tid" exact={true}>
        <TalePage />
      </Route>
      <Route path="/chronicles/:cid/tales/:tid/play">
        <CurrentThread />
      </Route>

      {/* User's Library of joined chronicles/games */}
      <ProtectedRoute path="/library" exact={true} authenticated={authenticated}>
        <Library />
      </ProtectedRoute>

      {/* WorldWeaver*/}
      <ProtectedRoute path="/worldweaver" exact={true} authenticated={authenticated}>
        <WorldWeaver />
      </ProtectedRoute>

      {/* TaleSpinner */}
      <ProtectedRoute path="/talespinner" exact={true} authenticated={authenticated}>
        <TaleSpinner threads={threads} />
      </ProtectedRoute>

      {/* User list and individual user profiles */}
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute path="/users/:uid" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>

      <Footer authenticated={authenticated} setAuthenticated={setAuthenticated} />

    </BrowserRouter>
  );
}

export default App;
