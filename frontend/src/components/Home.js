import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import YourCreations from './YourCreations'
import CreationFormWrapper from './forms/CreationFormWrapper'
import ChronicleForm from './forms/ChronicleForm'
import TaleForm from './forms/TaleForm'
import ThreadForm from './forms/ThreadForm'
import { addChronicle } from '../actions/chronicleActions'
import { addTale } from '../actions/taleActions'
import { addThread } from '../actions/threadActions'

export default function Home() {
  const chronicles = useSelector(state => state.chronicles)
  const all_tales = useSelector(state => state.tales)
  const all_threads = useSelector(state => state.threads)
  const all_choices = useSelector(state => state.choices)
  const [tales, setTales] = useState([])
  const [threads, setThreads] = useState([])
  const [choices, setChoices] = useState([])
  const [activeChronicle, setActiveChronicle] = useState(Object.keys(chronicles) ? chronicles[Object.keys(chronicles)[0]] : "")
  const [activeTale, setActiveTale] = useState("")
  const [activeThread, setActiveThread] = useState("")
  const [activeChoice, setActiveChoice] = useState("")

  useEffect(() => {
    setTales(Object.values(all_tales).filter(tale => tale.chronicle_id === activeChronicle.id))
    setThreads(Object.values(all_threads).filter(thread => thread.tale_id === activeTale.id))
    setChoices(Object.values(all_choices).filter(choice => choice.current_thread_id === activeThread.id))
  }, [activeChronicle, activeTale, activeThread, all_tales, all_threads, all_choices, chronicles])

  useEffect(() => {
    setActiveTale("")
    setActiveThread("")
  }, [activeChronicle])

  useEffect(() => {
    setActiveThread("")
  }, [activeTale])

  useEffect(() => {
    console.log("activeC", activeChronicle, "activeT", activeTale, "activeTh", activeThread)
  }, [activeChronicle, activeTale, activeThread])

  return (
    <main>
      {/* <p>Welcome, {user.username}...</p> */}
      <CreationFormWrapper
        creationType="Chronicle"
        uniqueInputs={ChronicleForm}
        path={`/api/chronicles/create`}
        actionCreator={addChronicle}
        setActive={setActiveChronicle}
      />
      <YourCreations
        creation_type="Chronicles"
        active={activeChronicle}
        creations={chronicles}
        setActive={setActiveChronicle}
      />

      <CreationFormWrapper
        creationType="Tale"
        uniqueInputs={TaleForm}
        path={`/api/chronicles/${activeChronicle.id}/tales/create`}
        actionCreator={addTale}
        setActive={setActiveTale}
      />
      <YourCreations
        creation_type="Tales"
        creations={tales}
        active={activeTale}
        setActive={setActiveTale}
      />

      <Link to={`/talespinner/tales/${activeTale.id}`}>Go to TaleSpinner</Link>
      <CreationFormWrapper
        creationType="Thread"
        uniqueInputs={ThreadForm}
        path={`/api/tales/${activeTale.id}/threads/create`}
        actionCreator={addThread}
        setActive={setActiveThread}
      />
      <YourCreations
        creation_type="Threads"
        creations={threads}
        active={activeThread}
        setActive={setActiveThread}
      />

      <CreationFormWrapper
        creationType="Choices"
        uniqueInputs={ChoiceForm}
        path={`/api/threads/${activeThread.id}/choices/create`}
        actionCreator={addChoice}
        setActive={setActiveChoice}
      />
      <YourCreations
        creation_type="Choices"
        creations={choices}
        active={activeChoice}
        setActive={setActiveChoice}
      />

      <CreationFormWrapper
        creationType="Characters"
        uniqueInputs={CharacterForm}
        path={`/api/chronicles/${activeChronicle.id}/characters/create`}
        actionCreator={addCharacter}
        setActive={setActiveCharacter}
      />
      <YourCreations
        creation_type="Characters"
        creations={characters}
        active={activeCharacter}
        setActive={setActiveCharacter}
      />

      <CreationFormWrapper
        creationType="Places"
        uniqueInputs={PlaceForm}
        path={`/api/chronicles/${activeChronicle.id}/places/create`}
        actionCreator={addPlace}
        setActive={setActivePlace}
      />
      <YourCreations
        creation_type="Places"
        creations={places}
        active={activePlace}
        setActive={setActivePlace}
      />

      <CreationFormWrapper
        creationType="Assets"
        uniqueInputs={AssetForm}
        path={`/api/chronicles/${activeChronicle.id}/assets/create`}
        actionCreator={addAsset}
        setActive={setActiveAsset}
      />
      <YourCreations
        creation_type="Assets"
        creations={assets}
        active={activeAsset}
        setActive={setActiveAsset}
      />

      <CreationFormWrapper
        creationType="Conditions"
        uniqueInputs={ConditionForm}
        path={`/api/chronicles/${activeChronicle.id}/conditions/create`}
        actionCreator={addCondition}
        setActive={setActiveCondition}
      />
      <YourCreations
        creation_type="Conditions"
        creations={conditions}
        active={activeCondition}
        setActive={setActiveCondition}
      />

      <CreationFormWrapper
        creationType="Ranks"
        uniqueInputs={RankForm}
        path={`/api/chronicles/${activeChronicle.id}/races/create`}
        actionCreator={addRank}
        setActive={setActiveRank}
      />
      <YourCreations
        creation_type="Ranks"
        creations={ranks}
        active={activeRank}
        setActive={setActiveRank}
      />

      {/* <ChronicleForm /> */}
      {/* <CharacterForm /> */}
      {/* <MaterialForm /> */}
      {/* <PlaceForm /> */}
      {/* <TaleForm /> */}
    </main>
  )
}
