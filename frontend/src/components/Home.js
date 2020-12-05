import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ThreadForm from './forms/ThreadForm'
import {useParams} from 'react-router-dom'


export default function Home() {
  const [open, setOpen] = useState(false)
  const chronicles = useSelector(state => state.chronicles)
  const tales = useSelector(state => state.tales)
  const threads = useSelector(state => state.threads)
    
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  
  return (
    <main>
      {/* <p>Welcome, {user.username}...</p> */}

      <h2>Your Chronicles</h2>
      <dl>
      {Object.values(chronicles).map(chronicle => (<>
        <dt>{chronicle.title}</dt>
        <dd>{chronicle.description}</dd>
      </>))}
      </dl>
      
      <h2>Your Tales</h2>
      {/* <ChronicleForm /> */}
      {/* <CharacterForm /> */}
      {/* <MaterialForm /> */}
      {/* <PlaceForm /> */}
      <dl>
      {Object.values(tales).map(tale => (<>
        <dt>{tale.title}</dt>
        <dd><p>{tale.description}</p>
        <button onClick={handleOpen}>+Thread</button>
        <ThreadForm tid={tale.id} open={open} handleClose={handleClose} />
        </dd>
      </>))}
      </dl>

      <h2>Your Threads</h2>
      {/* <TaleForm /> */}
      <dl>
      {Object.values(threads).map(thread => (<>
        <dt>{thread.title}</dt>
        <dd>{thread.description}
        {/* <b>Choices:</b> {threads.filter()} */}
      </dd>
      </>))}
      </dl>


    </main>
  )
}