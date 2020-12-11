import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// YOUR COMPONENTS
import YourCreations from './YourCreations'

// FORM COMPONENTS
import ChronicleForm from './forms/ChronicleForm'
import TaleForm from './forms/TaleForm'
import ThreadForm from './forms/ThreadForm'
import ChoiceForm from './forms/ChoiceForm'
import CharacterForm from './forms/CharacterForm'
import PlaceForm from './forms/PlaceForm'
import AssetForm from './forms/AssetForm'
import ConditionForm from './forms/ConditionForm'
import MeterForm from './forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../actions/chronicleActions'
import { deleteTale } from '../actions/taleActions'
import { deleteThread } from '../actions/threadActions'
import { deleteChoice } from '../actions/choiceActions'
import {deleteCharacter } from '../actions/characterActions'
import {deletePlace } from '../actions/placeActions'
import {deleteAsset } from '../actions/assetActions'
import {deleteCondition } from '../actions/conditionActions'
import {deleteMeter } from '../actions/meterActions'
import { updateSelections, wipeSelections } from '../actions/selectionActions'


export default function Home() {
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
      {/* <p>Welcome, {user.username}...</p> */}

      <YourCreations
        creationType="Chronicle"
        active={selected.chronicle}
        creations={chronicles}
        creationForm={ChronicleForm}
        deleteActionCreator={deleteChronicle}
      />

      <Link to={`/talespinner/tales/${selected.tale.id}`}>Go to TaleSpinner</Link>
      <YourCreations
        pid={selected.chronicle.id}
        creationType="Tale"
        creations={tales}
        active={selected.tale}
        filterBySelect={(tales, cid) => Object.values(tales).filter(tale => tale.chronicle_id === cid)}
        deleteActionCreator={deleteTale}
        creationForm={TaleForm}
      />

      <YourCreations
        pid={selected.tale.id}
        creationType="Thread"
        creations={threads}
        active={selected.thread}
        filterBySelect={(threads, tid) => Object.values(threads).filter(thread => thread.tale_id === tid)}
        deleteActionCreator={deleteThread}
        creationForm={ThreadForm}
      />

      <YourCreations
        pid={selected.thread.id}
        creationType="Choice"
        creations={choices}
        active={selected.choice}
        filterBySelect={(choices, thid) => Object.values(choices).filter(choice => choice.current_thread_id === thid)}
        deleteActionCreator={deleteChoice}
        creationForm={ChoiceForm}
      />

      <YourCreations
        pid={selected.chronicle.id}
        creationType="Character"
        creations={characters}
        active={selected.character}
        filterBySelect={(characters, cid) => Object.values(characters).filter(character => character.chronicle_id === cid)}
        deleteActionCreator={deleteCharacter}
        creationForm={CharacterForm}
      />

      <YourCreations
        pid={selected.chronicle.id}
        creationType="Place"
        creations={places}
        active={selected.place}
        filterBySelect={(places, cid) => Object.values(places).filter(place => place.chronicle_id === cid)}
        deleteActionCreator={deletePlace}
        creationForm={PlaceForm}
      />

      <YourCreations
        pid={selected.chronicle.id}
        creationType="Asset"
        creations={assets}
        active={selected.asset}
        filterBySelect={(assets, cid) => Object.values(assets).filter(asset => asset.chronicle_id === cid)}
        deleteActionCreator={deleteAsset}
        creationForm={AssetForm}
      />
{/* 
      <YourCreations
        pid={selected.chronicle.id}
        creationType="Condition"
        creations={conditions}
        active={selected.condition}
        filterBySelect={(conditions, cid) => Object.values(conditions).filter(condition => condition.chronicle_id === cid)}
        deleteActionCreator={deleteCondition}
        creationForm={ConditionForm}
      />

      <YourCreations
        pid={selected.chronicle.id}
        creationType="Meter"
        creations={meters}
        active={selected.meter}
        filterBySelect={(meters, cid) => Object.values(meters).filter(chronicle => chronicle.chronicle_id === cid)}
        deleteActionCreator={deleteMeter}
        creationForm={MeterForm}
      /> */}

    </main>
  )
}
