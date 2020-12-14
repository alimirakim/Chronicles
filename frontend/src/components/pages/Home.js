import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

// import { updateSelections, wipeSelections } from '../actions/selectionActions'

// COMPONENTS
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"

export default function Home({ authenticated, setAuthenticated }) {
  const dispatch = useDispatch()
  const chronicles = useSelector(state => state.chronicles)

  // Select a user's first chronicle and its tales/content upon initialization
  useEffect(() => {
    // TODO Refetch chronicle selection
    if (!chronicles) {
      
    }
  }, [])

  return (
    <main>
      <h1>Welcome to TaleSpinner</h1>
      <p>Discover and play free text adventures made by users like you, or spin your own tale or three and share it to the world!</p>'

      {/* Want to make games but don't know programming?
      Want to tell a story where the player can decide who they are and what they do?
      
      Welcome! 
      Who are you? What experience in life is it you seek?
      1. Player. --> kinds of games? --> length --> type of player (card suits)
      2. Creator. --> kind of story
      3. Both.
      4. Not sure. */}
      <div >
        <SignUpForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />

        <GalleryRibbon items={chronicles} />
      </div>
    </main>
  )
}

function GalleryRibbon({ items }) {

  return (
    <aside>
      <h2>Discover Your Next Adventure!</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>
      <ul>
        {Object.values(items).map(item => (
          <li key={item.id} className="card">
            <Link to={`/chronicles/${item.id}`}>
              <img style={{ width: "3rem", height: "3rem", float: "left", margin: "0.5rem 1rem" }} src={`/images/${item.image}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} />
              <dl>
                <dt>Title</dt>
                <dd>{item.title}</dd>
                <dt>Creator</dt>
                <dd><address>{item.creator}</address></dd>
                {/* <dt>Latest Update</dt>
            <dd><datetime>{item.updated_at}</datetime></dd>
            <dt>Tags</dt>
            <dd>{item.tags}</dd>
            <dt>Description</dt> */}
                <dd>{parse(item.description)}</dd>
                {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}