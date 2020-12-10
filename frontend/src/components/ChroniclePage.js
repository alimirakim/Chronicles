import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'


export default function ChroniclePage() {
  const { cid } = useParams()
  const chronicle = useSelector(state => state.chronicles[cid])
  const chronicleTales = useSelector(state => Object.values(state.tales).filter(tale => tale.chronicle_id === Number(cid)))
  console.log("tale start", chronicleTales)

  return (
    <main>
      <h1>{chronicle.title}</h1>
      <address>Created by {chronicle.creator}</address>
      <p>{chronicle.description}</p>

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

    </main>
  )
}
