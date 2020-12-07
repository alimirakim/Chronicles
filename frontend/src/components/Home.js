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


      <CreationFormWrapper
        creationType="Chronicle"
        uniqueInputs={ChronicleForm}
        path={`/api/chronicles/create`}
        actionCreator={addChronicle}
        selectionType="chronicle"
      />
      <YourCreations
        creation_type="Chronicles"
        active={selected.chronicle}
        creations={chronicles}
        selectionType="chronicle"
      />


      <CreationFormWrapper
        creationType="Tale"
        uniqueInputs={TaleForm}
        path={`/api/chronicles/${selected.chronicle.id}/tales/create`}
        actionCreator={addTale}
        selectionType="tale"
      />
      <YourCreations
        creation_type="Tales"
        creations={selected.tales}
        active={selected.tale}
        selectionType="tale"
      />


      <Link to={`/talespinner/tales/${selected.tale.id}`}>Go to TaleSpinner</Link>
      <CreationFormWrapper
        creationType="Thread"
        uniqueInputs={ThreadForm}
        path={`/api/tales/${selected.tale.id}/threads/create`}
        actionCreator={addThread}
        selectionType="thread"
      />
      <YourCreations
        creation_type="Threads"
        creations={selected.threads}
        active={selected.thread}
        selectionType="thread"
      />


      <CreationFormWrapper
        creationType="Choices"
        uniqueInputs={ChoiceForm}
        path={`/api/threads/${selected.thread.id}/choices/create`}
        actionCreator={addChoice}
        selectionType="choice"
      />
      <YourCreations
        creation_type="Choices"
        creations={selected.choices}
        active={selected.choice}
        selectionType="choice"
      />


      {/* <CreationFormWrapper
        creationType="Characters"
        uniqueInputs={CharacterForm}
        path={`/api/chronicles/${activeChronicle.id}/characters/create`}
        actionCreator={addCharacter}
        setActive={setActiveCharacter}
        selectionType="character"
      />
      <YourCreations
        creation_type="Characters"
        creations={characters}
        active={activeCharacter}
        setActive={setActiveCharacter}
        selectionType="character"
      />


      <CreationFormWrapper
        creationType="Places"
        uniqueInputs={PlaceForm}
        path={`/api/chronicles/${activeChronicle.id}/places/create`}
        actionCreator={addPlace}
        setActive={setActivePlace}
        selectionType="place"
      />
      <YourCreations
        creation_type="Places"
        creations={places}
        active={activePlace}
        setActive={setActivePlace}
        selectionType="place"
      />


      <CreationFormWrapper
        creationType="Assets"
        uniqueInputs={AssetForm}
        path={`/api/chronicles/${activeChronicle.id}/assets/create`}
        actionCreator={addAsset}
        setActive={setActiveAsset}
        selectionType="asset"
      />
      <YourCreations
        creation_type="Assets"
        creations={assets}
        active={activeAsset}
        setActive={setActiveAsset}
        selectionType="asset"
      />


      <CreationFormWrapper
        creationType="Conditions"
        uniqueInputs={ConditionForm}
        path={`/api/chronicles/${activeChronicle.id}/conditions/create`}
        actionCreator={addCondition}
        selectionType="condition"
      />
      <YourCreations
        creation_type="Conditions"
        creations={conditions}
        active={activeCondition}
        selectionType="condition"
      />


      <CreationFormWrapper
        creationType="Ranks"
        uniqueInputs={RankForm}
        path={`/api/chronicles/${activeChronicle.id}/races/create`}
        actionCreator={addRank}
        selectionType="rank"
      />
      <YourCreations
        creation_type="Ranks"
        creations={ranks}
        active={activeRank}
        selectionType="rank"
      /> */}

      {/* <ChronicleForm /> */}
      {/* <CharacterForm /> */}
      {/* <MaterialForm /> */}
      {/* <PlaceForm /> */}
      {/* <TaleForm /> */}
    </main>
  )
}
