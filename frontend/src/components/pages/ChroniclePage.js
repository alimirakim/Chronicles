import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import PlayerCharacterForm from '../forms/PlayerCharacterForm'
import ChronicleForm from '../forms/ChronicleForm'
import DeleteForm from '../forms/DeleteForm'


import { getChronicle, deleteChronicle } from '../../store/mainActions/chronicleActions'
import { getTales } from '../../store/mainActions/taleActions'


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
        </address> <small>on {chronicles[cid].created_at.toLocaleString()}</small>
        
        {parse(chronicles[cid].description)}
      </section>

      {/* Character maker + chronicle start, restricted to new players */}
      {!pc && <>
        <h2>Start "{chronicles[cid].title}": Make Your Character!</h2>
        <PlayerCharacterForm tid={chronicles[cid].first_tale_id} />
      </>}


      {pc && <section>
        <h2>Profile: {pc.title}
          <i className="tip fas fa-question-circle">
            <section className="tip-info">Keep track of your character's status, possessions, levels, conditions, and levels.</section></i>
        </h2>

        <i className={`fa-10x fas fa-${pc.image}`} style={{ color: pc.color }}></i>

        {/* <h3>About</h3>
        <p>{pc.description) ? parse(pc.description)}</p> */}

        <section style={{ position: "relative" }}>
          <h3>
            Assets <i className="tip fas fa-question-circle">
              <section className="tip-info">Your current possessions.</section>
            </i>
          </h3>
          <ul style={{ paddingLeft: "2rem" }}>
            {pc.assets.map(a => <li key={a.asset_id} style={{ listStyle: "square" }}><i><b>{assets[a.asset_id].title}</b></i> (Quantity: {a.quantity})</li>)}
          </ul>
        </section>

        <hr />

        <h3>Levels
          <i className="tip fas fa-question-circle">
            <section className="tip-info">'Levels' can be any number of things, but they are all measured by a number, and are usually able to be improved and leveled up.</section></i>
        </h3>

        <ul>
          {pc.meters.map(m => <li key={m.meter_id}>
            <div className="tip-card" style={{ backgroundColor: meters[m.meter_id].color }}>
              <i className={`tip fas fa-2x fa-${meters[m.meter_id].image}`} >
                <section className="tip-info" style={{ color: "black" }}><b>{meters[m.meter_id].title}</b>: <hr />{parse(meters[m.meter_id].description)}</section>
              </i></div>
            <dl>
              <li><b>Level Type:</b> {meters[m.meter_id].title}</li>
              <li><b>Current Level:</b> {m.total}</li>
              <li><b>Progress:</b> {m.progress} / {meters[m.meter_id].base}</li>
            </dl>
          </li>)}
        </ul>
      </section>}

      <hr />


      <h3>Conditions
        <i className="tip fas fa-question-circle">
          <section className="tip-info">These are conditions that are currently afflicting your character, for good or ill.</section>
        </i></h3>

            <p><i>N/A</i></p>
      <ul>
        {/* {pc.conditions.map(c => <li key={c}>
          <dl>
            <dt>Condition</dt>
            <dd>{conditions[c].title}</dd>
            <dt>Description</dt>
            <dd>{parse(conditions[c].description)}</dd>
            <dt>Effect</dt>
            <dd>{conditions[c].modifiers}</dd>
            <dt>Time Limit</dt>
            <dd>{conditions[c].expiry</dd>
          </dl></li>)} */}
      </ul>

      <hr />

      {/* TODO Add bulletin board for announcements, updates, etc. */}

      {/* TODO Add clickable map of locations */}

      {/* TODO Add list of started and finished tales */}

      <h2>The Tales of "{chronicles[cid].title}" <i className="tip fas fa-question-circle">
        <section className="tip-info">These are the available stories for "{chronicles[cid].title}" that you can play. Maybe you can unlock more depending on certain circumstances...</section>
      </i></h2>

      <ul className="gal">
        {chronicles[cid].tale_ids.map(tid => (
          <li key={tid} className="th-card">
            <Link to={`/tales/${tid}`}>
              <dl>
                <dt>Title</dt>
                <dd>{tales[tid].title}</dd>
                <dt>Description</dt>
                <dd>{tales[tid].description ? parse(tales[tid].description) : "N/A"}</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ul>

    </main >
  )
}
