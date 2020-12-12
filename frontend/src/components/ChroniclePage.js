import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

// TODO NOTE This hard-coded sample is for testing only
const user = { id: 1 }

export default function ChroniclePage() {
  const { cid } = useParams()
  const dispatch = useDispatch()
  const chronicle = useSelector(state => state.chronicles[cid])
  const chronicleTales = useSelector(state => Object.values(state.tales).filter(tale => tale.chronicle_id === Number(cid) && tale.first_thread_id))
  const character = useSelector(state => Object.values(state.characters).find(char => char.chronicle_id === Number(cid) && char.user_id === user.id))
  const assets = useSelector(state => state.assets)
  const conditions = useSelector(state => state.conditions)
  const meters = useSelector(state => state.meters)
  const { addCharacter } = './actions/characterActions'

  const play = async (e) => {
    const res = await fetch(`/api/chronicles/${cid}/characters/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" })
    })
    const newCharacter = await res.json()
    dispatch(addCharacter(newCharacter))
  }

  return (
    <main>
      <h1>{chronicle.title}</h1>
      <address>Created by {chronicle.creator}</address>
      <p>{chronicle.description}</p>

      {!character && <button onClick={play}>Play</button>}

      {character && <section>
        <h2>Profile: {character.title}</h2>
        <image src={`/images/${character.image}.svg`} alt={`Character: ${character.title}`} />
        <h3>About</h3>
        <p>{character.description}</p>

        <h3>Assets</h3>
        <p>Your current possessions.</p>
        <ul>
          {character.assets.map(a => <li key={a}>{assets[a].title}</li>)}
        </ul>

        <h3>Conditions</h3>
        <p>These are conditions that are currently afflicting your character, for good or ill.</p>
        <ul>
          {character.conditions.map(c => <li key={c}>
            <dl>
              <dt>Condition</dt>
              <dd>{conditions[c].title}</dd>
              <dt>Description</dt>
              <dd>{conditions[c].description}</dd>
              {/* <dt>Effect</dt> */}
              {/* <dd>{conditions[c].modifiers}</dd> */}
              {/* <dt>Time Limit</dt> */}
              {/* <dd>{conditions[c].expiry</dd> */}
            </dl></li>)}
        </ul>

        <h3>Ranks</h3>
        <p>'Ranks' can be any number of things, but they are all measured by a number, and are usually able to be improved and leveled up.</p>
        <ul>
          {character.meters.map(m => <li key={m.id}>
            <dl>
              <dt>Rank</dt>
              <dd>{meters[m.id].title}</dd>
              <dt>Description</dt>
              <dd>{meters[m.id].description}</dd>
              <dt>Level</dt>
              <dd>{m.total}</dd>
              <dt>Progress</dt>
              <dd>{m.progress}</dd>
            </dl>
          </li>)}
        </ul>
      </section>}


      {/* TODO Add bulletin board for announcements, updates, etc. */}

      {/* TODO Add clickable map of locations */}

      {/* TODO Add player's character and character state details */}

      {/* TODO Add list of started and finished tales */}

      <h2>Tales</h2>
      <ul>
        {chronicleTales.map(tale => (
          <Link to={`/chronicles/${cid}/tales/${tale.id}`}>
            <dl>
              <dt>Title</dt>
              <dd>{tale.title}</dd>
              <dt>Description</dt>
              <dd>{tale.description}</dd>
            </dl>
          </Link>
        ))}
      </ul>

    </main >
  )
}
