import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { getGalleryChronicles } from '../../store/mainActions/chronicleActions'

// import { updateSelections, wipeSelections } from '../actions/selectionActions'

// COMPONENTS
// import LoginForm from "../auth/LoginForm"
// import SignUpForm from "../auth/SignUpForm"
import Header from '../Header'

export default function Home({ auth, setAuth }) {
  const dispatch = useDispatch()
  let gallery_ids = useSelector(state => state.chronicles.gallery_ids)
  gallery_ids = Array.from(gallery_ids)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/chronicles/newest/12`)
      if (res.ok) {
        const chronicles = await res.json()
        dispatch(getGalleryChronicles(chronicles))
      }
    })()
  }, [])

  if (!gallery_ids.length) return null;

  return (
    <main>
      {!auth && <>
        <div className="lo-wow"><Link to="/sign-up">Create and Account</Link></div>
        <div className="lo-wow"><Link to="/login">Login</Link></div>
      </>}

      <GalleryRibbon ids={gallery_ids} />

    </main>)
}

{/* Want to make games but don't know programming?
      Want to tell a story where the player can decide who they are and what they do?
      
      Welcome! 
      Who are you? What experience in life is it you seek?
      1. Player. --> kinds of games? --> length --> type of player (card suits)
      2. Creator. --> kind of story
      3. Both.
      4. Not sure. */}

function GalleryRibbon({ ids }) {
  const chronicles = useSelector(state => state.chronicles)

  return (
    <aside>
      <h2>Discover Your Next Adventure!</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>
      <ul>
        {Object.values(ids).map(id => (
          <li key={id} className="card" style={{ padding: "0.5rem 1rem" }}>
            <Link to={`/chronicles/${id}`}>
              <i className={`fas fa-3x fa-${chronicles[id].icon}`} style={{ width: "3rem", height: "3rem", float: "left", margin: "0.5rem 1rem", color: chronicles[id].color }}></i>
              <dl>
                <dt>Title</dt>
                <dd>{chronicles[id].title}</dd>
                <dt>Creator</dt>
                <dd><address>{chronicles[id].creator}</address></dd>
                {/* <dt>Latest Update</dt>
            <dd><datetime>{item.updated_at}</datetime></dd>
            <dt>Tags</dt>
            <dd>{item.tags}</dd>
            <dt>Description</dt> */}
                <dd>{parse(chronicles[id].description)}</dd>
                {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}