import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// YOUR COMPONENTS
import YourCreations from '../YourCreations'
import { SelectInputColors, SelectInputImages } from '../forms/FormInputs'

// FORM COMPONENTS
import ChronicleForm from '../forms/ChronicleForm'
import TaleForm from '../forms/TaleForm'
import ThreadForm from '../forms/ThreadForm'
import ChoiceForm from '../forms/ChoiceForm'
import CharacterForm from '../forms/CharacterForm'
import PlaceForm from '../forms/PlaceForm'
import AssetForm from '../forms/AssetForm'
import ConditionForm from '../forms/ConditionForm'
import MeterForm from '../forms/MeterForm'

// ACTION CREATORS
import { deleteChronicle } from '../../actions/chronicleActions'
import { deleteTale } from '../../actions/taleActions'
import { deleteThread } from '../../actions/threadActions'
import { deleteChoice } from '../../actions/choiceActions'
import { deleteCharacter } from '../../actions/characterActions'
import { deletePlace } from '../../actions/placeActions'
import { deleteAsset } from '../../actions/assetActions'
import {deleteCondition } from '../../actions/conditionActions'
import {deleteMeter } from '../../actions/meterActions'
import { updateSelections, wipeSelections } from '../../actions/selectionActions'


export default function WorldWeaver() {
  const dispatch = useDispatch()
  // TODO QUESTION Ask, is this less efficient than selecting each individually??
  const { user, chronicles, tales, threads, choices, selected, characters, assets, places, conditions, meters } = useSelector(state => ({
    user: state.user,
    chronicles: state.chronicles,
    tales: state.tales,
    threads: state.threads,
    choices: state.choices,
    selected: state.selections,
    characters: state.characters,
    assets: state.assets,
    places: state.places,
    conditions: state.conditions,
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

      <Link to={`/talespinner/tales/${selected.tale.id}`}>Go to TaleSpinner</Link>
      <YourCreations
        pid={selected.chronicle.id}
        creationType="tale"
        creations={Object.values(tales).filter(t => user.tale_ids.includes(t.id))}
        filterBySelect={(tales, cid) => Object.values(tales).filter(tale => tale.chronicle_id === cid)}
        deleteActionCreator={deleteTale}
        creationForm={TaleForm}
      />

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

      {/* conditions */}
      <YourCreations
        pid={selected.chronicle.id}
        creationType="condition"
        creations={Object.values(conditions).filter(cond => user.condition_ids.includes(cond.id))}
        filterBySelect={(conditions, cid) => Object.values(conditions).filter(condition => condition.chronicle_id === cid)}
        deleteActionCreator={deleteCondition}
        creationForm={ConditionForm}
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
