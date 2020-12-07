import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import YourCreations from './YourCreations'
import CreationFormWrapper from './forms/CreationFormWrapper'
import ChronicleForm from './forms/ChronicleForm'
import TaleForm from './forms/TaleForm'
import ThreadForm from './forms/ThreadForm'
import ChoiceForm from './forms/ChoiceForm'
import { addChronicle } from '../actions/chronicleActions'
import { addTale } from '../actions/taleActions'
import { addThread } from '../actions/threadActions'
import { addChoice } from '../actions/choiceActions'
import { updateSelections, wipeSelections } from '../actions/selectionActions'


export default function Home() {
  const dispatch = useDispatch()
  const { chronicles, tales, threads, choices, selected } = useSelector(state => ({
    chronicles: state.chronicles,
    tales: state.tales,
    threads: state.threads,
    choices: state.choices,
    selected: state.selections
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
    dispatch(updateSelections([
      { type: "tales", selection: Object.values(tales).filter(tale => tale.chronicle_id === selected.chronicle.id) },
    ]))
  }, [selected.chronicle])

  // Upon tale selection, clear dependent selections and refresh threads
  useEffect(() => {
    dispatch(wipeSelections(["thread", "choice", "threads", "choices"]))
    dispatch(updateSelections([
      { type: "threads", selection: Object.values(threads).filter(thread => thread.tale_id === selected.tale.id) }
    ]))
  }, [selected.tale])

  // Upon thread selection, clear dependent selections and refresh choices // TODO Plus effects
  useEffect(() => {
    dispatch(wipeSelections(["choice", "choices"]))
    dispatch(updateSelections([
      { type: "choices", selection: Object.values(choices).filter(choice => choice.current_thread_id === selected.thread.id) },
    ]))
  }, [selected.thread])



  return (
    <main>
      {/* <p>Welcome, {user.username}...</p> */}

      <YourCreations
        creationType="Chronicle"
        active={selected.chronicle}
        creations={chronicles}
        creationForm={ChronicleForm}
      />

      {selected.chronicle ?
        <TaleForm id={selected.chronicle.id} /> :
        <button disabled>+Tale</button>
      }
      <Link to={`/talespinner/tales/${selected.tale.id}`}>Go to TaleSpinner</Link>
      <YourCreations
        pid={selected.chronicle.id}
        creationType="Tale"
        creations={selected.tales}
        active={selected.tale}
        creationForm={TaleForm}
      />

      <YourCreations
        pid={selected.tale.id}
        creationType="Thread"
        creations={selected.threads}
        active={selected.thread}
        creationForm={ThreadForm}
      />

      <YourCreations
        pid={selected.thread.id}
        creationType="Choice"
        creations={selected.choices}
        active={selected.choice}
        creationForm={ChoiceForm}
      />

      {/* <YourCreations
        creationType="Characters"
        creations={characters}
        active={activeCharacter}
        setActive={setActiveCharacter}
        selectionType="character"
      />

      <YourCreations
        creationType="Places"
        creations={places}
        active={activePlace}
        setActive={setActivePlace}
        selectionType="place"
      />

      <YourCreations
        creationType="Assets"
        creations={assets}
        active={activeAsset}
        setActive={setActiveAsset}
        selectionType="asset"
      />

      <YourCreations
        creationType="Conditions"
        creations={conditions}
        active={activeCondition}
        selectionType="condition"
      />

      <YourCreations
        creationType="Ranks"
        creations={ranks}
        active={activeRank}
        selectionType="rank"
      /> */}

    </main>
  )
}
