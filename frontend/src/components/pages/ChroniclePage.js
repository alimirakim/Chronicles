import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import PlayerCharacterForm from '../forms/PlayerCharacterForm'
import ChronicleForm from '../forms/ChronicleForm'
import DeleteForm from '../forms/DeleteForm'
import { getChronicle, deleteChronicle } from '../../actions/chronicleActions'
import { getTales } from '../../actions/taleActions'


export default function ChroniclePage() {
  const { cid } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const chronicles = useSelector(state => state.chronicles)
  const tales = useSelector(state => state.tales)
  const pc = useSelector(state => Object.values(state.characters)
    .find(char => char.chronicle_id === Number(cid) && user.pc_ids.includes(char.id)))
  const assets = useSelector(state => state.assets)
  const conditions = useSelector(state => state.conditions)
  const meters = useSelector(state => state.meters)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleOpenDelete = () => setOpenEdit(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = (e) => setOpenEdit(false)
  const handleCloseDelete = () => setOpenDelete(false)

  // Get the page's chronicle, its list of tales, and user's character
  useEffect(() => {
    if (!chronicles[cid]) {
      (async () => {
        const res = await fetch(`/api/chronicles/${cid}`)
        if (res.ok) {
          const { chronicle, tales } = await res.json()
          dispatch(getChronicle(chronicle, tales))
        } else {
          console.error("Chronicle fetch fail D: ")
        }
      })()
    } else if (Object.keys(tales).filter(t => chronicles[cid].tale_ids.includes(Number(t))).length !== chronicles[cid].tale_ids.length) {
      (async () => {
        const res = await fetch(`/api/tales/chronicle/${cid}`)
        if (res.ok) {
          const tales = await res.json()
          dispatch(getTales(tales))
        } else {
          console.error("Tales fetch faile D: ")
        }
      })()
    }
  }, [])
  

  if (!chronicles[cid]) return null
  if (Object.keys(tales).filter(t => chronicles[cid].tale_ids.includes(Number(t))).length !== chronicles[cid].tale_ids.length) return null

  return (
    <main>
      {/* Edit / Delete options, restricted to creator */}
      {user.id === chronicles[cid].user_id && <>
        <button type="button" onClick={handleOpenEdit}>Edit</button>
        <button type="button" onClick={handleOpenDelete}>Delete</button>

        {openEdit && <ChronicleForm
          open={openEdit}
          handleClose={handleCloseEdit}
          id={cid}
          edit={chronicles[cid]}
        />}
        {openDelete && <DeleteForm
          open={openDelete}
          handleClose={handleCloseDelete}
          creation={chronicles[cid]}
          creationType="chronicle"
          deleteActionCreator={deleteChronicle}
        />}
      </>}

      {/* Chronicle summary header */}
      <section className="chron-head">
        <h1>{chronicles[cid].title}</h1>
        <address>Created by <Link to={`/users/${chronicles[cid].user_id}`}>{chronicles[cid].creator}</Link>
        </address>
        <small><datetime>on {chronicles[cid].created_at.toLocaleString()}</datetime></small>
        {parse(chronicles[cid].description)}
      </section>

      {/* Character maker + chronicle start, restricted to new players */}
      {!pc && <>
        <h2>Start "{chronicles[cid].title}": Make Your Character!</h2>
        <PlayerCharacterForm tid={chronicles[cid].first_tale_id} />
      </>}

      
      {pc && <section>
        <h2>Profile: {pc.title}</h2>
        <i className={`fas fa-${pc.image}`}></i>
        <h3>About</h3>
        <p>{parse(pc.description)}</p>

        <h3>Assets</h3>
        <p>Your current possessions.</p>
        <ul>
          {pc.assets.map(a => <li key={a}>{assets[a].title}</li>)}
        </ul>

        <h3>Conditions</h3>
        <p>These are conditions that are currently afflicting your character, for good or ill.</p>
        <ul>
          {pc.conditions.map(c => <li key={c}>
            <dl>
              <dt>Condition</dt>
              <dd>{conditions[c].title}</dd>
              <dt>Description</dt>
              <dd>{parse(conditions[c].description)}</dd>
              {/* <dt>Effect</dt> */}
              {/* <dd>{conditions[c].modifiers}</dd> */}
              {/* <dt>Time Limit</dt> */}
              {/* <dd>{conditions[c].expiry</dd> */}
            </dl></li>)}
        </ul>

        <h3>Ranks</h3>
        <p>'Ranks' can be any number of things, but they are all measured by a number, and are usually able to be improved and leveled up.</p>
        <ul>
          {pc.meters.map(m => <li key={m.id}>
            <dl>
              <dt>Rank</dt>
              <dd>{meters[m.id].title}</dd>
              <dt>Description</dt>
              <dd>{parse(meters[m.id].description)}</dd>
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

      <h2>The Tales of "{chronicles[cid].title}"</h2>
      <ul className="gal">
        {chronicles[cid].tale_ids.map(tid => (
          <li key={tid} className="th-card">
            <Link to={`/chronicles/${cid}/tales/${tid}`}>
              <dl>
                <dt>Title</dt>
                <dd>{tales[tid].title}</dd>
                <dt>Description</dt>
                <dd>{parse(tales[tid].description)}</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ul>

    </main >
  )
}
