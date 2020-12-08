import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import YourCreations from './YourCreations'
import ChronicleForm from './forms/ChronicleForm'
import TaleForm from './forms/TaleForm'
import ThreadForm from './forms/ThreadForm'
import ChoiceForm from './forms/ChoiceForm'
import { deleteChronicle } from '../actions/chronicleActions'
import { deleteTale } from '../actions/taleActions'
import { deleteThread } from '../actions/threadActions'
import { deleteChoice } from '../actions/choiceActions'
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

      {/* <YourCreations
        creationType="Characters"
        creations={characters}
        active={activeCharacter}
        filterBySelect={(characters, cid) => Object.values(characters).filter(tale => tale.chronicle.id === cid)}
        deleteActionCreator={deleteCharacter}
        creationForm={CharacterForm}
      />

      <YourCreations
        creationType="Places"
        creations={places}
        active={activePlace}
        filterBySelect={(places, cid) => Object.values(places).filter(tale => tale.chronicle.id === cid)}
        deleteActionCreator={deletePlace}
        creationForm={PlaceForm}
      />

      <YourCreations
        creationType="Assets"
        creations={assets}
        active={activeAsset}
        filterBySelect={(assets, cid) => Object.values(assets).filter(tale => tale.chronicle.id === cid)}
        deleteActionCreator={deleteAsset}
        creationForm={AssetForm}
      />

      <YourCreations
        creationType="Conditions"
        creations={conditions}
        active={activeCondition}
        filterBySelect={(conditions, cid) => Object.values(conditions).filter(tale => tale.chronicle.id === cid)}
        deleteActionCreator={deleteCondition}
        creationForm={ConditionForm}
      />

      <YourCreations
        creationType="Ranks"
        creations={ranks}
        active={activeRank}
        filterBySelect={(ranks, cid) => Object.values(ranks).filter(tale => tale.chronicle.id === cid)}
        deleteActionCreator={deleteRank}
        creationForm={RankForm}
      /> */}

    </main>
  )
}
