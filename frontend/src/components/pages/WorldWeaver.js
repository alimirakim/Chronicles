import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// YOUR COMPONENTS
import YourCreations from '../YourCreations'


// FORM COMPONENTS
import ChronicleForm from '../forms/ChronicleForm'
import TaleForm from '../forms/TaleForm'
import ThreadForm from '../forms/ThreadForm'
import ChoiceForm from '../forms/ChoiceForm'
import CharacterForm from '../forms/CharacterForm'
import PlaceForm from '../forms/PlaceForm'
import AssetForm from '../forms/AssetForm'
import StatusForm from '../forms/StatusForm'
import MeterForm from '../forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../../store/mainActions/chronicleActions'
import { deleteTale } from '../../store/mainActions/taleActions'
import { deleteThread } from '../../store/mainActions/threadActions'
import { deleteChoice } from '../../store/mainActions/choiceActions'
import { deleteCharacter } from '../../store/mainActions/characterActions'
import { deletePlace } from '../../store/mainActions/placeActions'
import { deleteAsset } from '../../store/mainActions/assetActions'
import {deleteStatus } from '../../store/mainActions/statusActions'
import {deleteMeter } from '../../store/mainActions/meterActions'
import { updateSelections, wipeSelections } from '../../store/mainActions/selectionActions'


export default function WorldWeaver() {
  
  const dispatch = useDispatch()
  // TODO QUESTION Ask, is this less efficient than selecting each individually??
  const { user, chronicles, tales, threads, choices, selected, characters, assets, places, statuses, meters } = useSelector(state => ({
    user: state.user,
    chronicles: state.chronicles,
    tales: state.tales,
    threads: state.threads,
    choices: state.choices,
    selected: state.selections,
    characters: state.characters,
    assets: state.assets,
    places: state.places,
    statuses: state.statuses,
    meters: state.meters,
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
      {/* <p>Welcome, {user.username}...</p> */}

      <YourCreations
        creationType="chronicle"
        creations={chronicles}
        creations={Object.values(chronicles).filter(c => user.chronicle_ids.includes(c.id))}
        creationForm={ChronicleForm}
        deleteActionCreator={deleteChronicle}
      />


      <YourCreations
        pid={selected.chronicle.id}
        creationType="tale"
        creations={Object.values(tales).filter(t => user.tale_ids.includes(t.id))}
        filterBySelect={(tales, cid) => Object.values(tales).filter(tale => tale.chronicle_id === cid)}
        deleteActionCreator={deleteTale}
        creationForm={TaleForm}
      />
            <div className="lo-wow" style={{margin: "2rem 0", padding: "0.5rem", textAlign: "center", backgroundColor: "rgba(70,40,60,0.2)", borderRadius: "1rem 0", transform: "skew(-10deg)"}}>
      <Link to={`/talespinner/tales/${selected.tale.id}`}>Go to TaleSpinner</Link>
      </div>

      <YourCreations
        pid={selected.chronicle.id}
        creationType="character"
        creations={Object.values(characters).filter(char => user.character_ids.includes(char.id))}
        filterBySelect={(characters, cid) => Object.values(characters).filter(character => character.chronicle_id === cid)}
        deleteActionCreator={deleteCharacter}
        creationForm={CharacterForm}
      />

      {/* places */}
      <YourCreations
        pid={selected.chronicle.id}
        creationType="place"
        creations={Object.values(places).filter(p => user.place_ids.includes(p.id))}
        filterBySelect={(places, cid) => Object.values(places).filter(place => place.chronicle_id === cid)}
        deleteActionCreator={deletePlace}
        creationForm={PlaceForm}
      />

      {/* assets */}
      <YourCreations
        pid={selected.chronicle.id}
        creationType="asset"
        creations={Object.values(assets).filter(a => user.asset_ids.includes(a.id))}
        filterBySelect={(assets, cid) => Object.values(assets).filter(asset => asset.chronicle_id === cid)}
        deleteActionCreator={deleteAsset}
        creationForm={AssetForm}
      />

      {/* statuses */}
      <YourCreations
        pid={selected.chronicle.id}
        creationType="status"
        creations={Object.values(statuses).filter(cond => user.status_ids.includes(cond.id))}
        filterBySelect={(statuses, cid) => Object.values(statuses).filter(status => status.chronicle_id === cid)}
        deleteActionCreator={deleteStatus}
        creationForm={StatusForm}
      />
      
      
      <YourCreations
        pid={selected.chronicle.id}
        creationType="meter"
        creations={Object.values(meters).filter(m => user.meter_ids.includes(m.id))}
        filterBySelect={(meters, cid) => Object.values(meters).filter(meter => meter.chronicle_id === cid)}
        deleteActionCreator={deleteMeter}
        creationForm={MeterForm}
      />


    </main>
  )
}
