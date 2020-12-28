import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUpForm from "./components/auth/SignUpForm"
import LoginForm from "./components/auth/LoginForm"
import FileForm from './components/forms/FileForm'

// PAGE COMPONENTS
import Home from './components/pages/Home'
import PlayGallery from './components/pages/PlayGallery'
import ChroniclePage from './components/pages/ChroniclePage.js'
import TalePage from './components/pages/TalePage'
import CurrentThread from './components/pages/CurrentThread'
import User from "./components/pages/User"
import UsersList from "./components/pages/UsersList"
import Library from './components/pages/Library'
import WorldWeaver from './components/pages/WorldWeaver'
import TaleSpinner from './components/pages/TaleSpinner'
import About from './components/pages/About'
import Generator from './components/generator/Generator'


// ACTIONS
import { getCreations } from './store/mainActions/userActions'

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
      <Route path="/about" exact={true}>
        <About />
      </Route>

      {/* Public game pages, for all players */}
      <Route path="/gallery" exact={true}>
        <PlayGallery />
      </Route>
      
      <Route path="/chronicles/:cid" exact={true}>
        <ChroniclePage />
      </Route>
      
      <Route path="/tales/:tid" exact={true}>
        <TalePage />
      </Route>
      
      <Route path="/tales/:tid/play">
        <CurrentThread />
      </Route>

      <Route path="/character-generator">
        <Generator />
      </Route>

      {/* Private game-library and creator pages, for users */}
      <ProtectedRoute path="/library" exact={true} authenticated={authenticated}>
        <Library />
      </ProtectedRoute>
      
      <ProtectedRoute path="/worldweaver" exact={true} authenticated={authenticated}>
        <WorldWeaver />
      </ProtectedRoute>
      
      <ProtectedRoute path="/talespinner/tales/:tid" exact={true} authenticated={authenticated}>
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
