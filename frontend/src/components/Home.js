import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateSelections, wipeSelections } from '../actions/selectionActions'

// COMPONENTS
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

export default function Home({authenticated, setAuthenticated}) {
  const dispatch = useDispatch()
  const { chronicles, tales, threads, choices, selected, characters, assets, places } = useSelector(state => ({
    chronicles: state.chronicles,
    tales: state.tales,
    threads: state.threads,
    choices: state.choices,
    selected: state.selections,
    characters: state.characters,
    assets: state.assets,
    places: state.places,
    // conditions: state.conditions,
    // meters: state.meters,
  }))

  // Select a user's first chronicle and its tales/content upon initialization
  useEffect(() => {
    dispatch(updateSelections([
      { type: "chronicle", selection: Object.keys(chronicles) ? chronicles[Object.keys(chronicles)[0]] : "" },
    ]))
  }, [])
  // Upon chronicle-selection, clear dependent selections and refresh tales // TODO Plus charas, places, assets, etc.
  useEffect(() => {
    dispatch(wipeSelections(["tale", "thread", "choice", "threads", "choices"]))
    console.log("tales", tales)
  }, [selected.chronicle])

  // Upon tale selection, clear dependent selections and refresh threads
  useEffect(() => {
    dispatch(wipeSelections(["thread", "choice", "threads", "choices"]))
  }, [selected.tale])

  // Upon thread selection, clear dependent selections and refresh choices // TODO Plus effects
  useEffect(() => {
    dispatch(wipeSelections(["choice", "choices"]))
  }, [selected.thread])

  return (
    <main>
      <h1>Welcome to TaleSpinner</h1>
      <p>Discover and play free text adventures made by users like you, or spin your own tale or three and share it to the world!</p>

      <SignUpForm
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <LoginForm
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />

      <GalleryRibbon items={chronicles} />

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
          <li key={item.id}>
            {/* <img src={`/images/${item.image}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
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
              <dd>{item.description}</dd>
              {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
            </dl>
          </li>
        ))}
      </ul>
    </aside>
  )
}