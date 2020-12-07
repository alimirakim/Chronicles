import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSelection } from '../actions/selectionActions'
// import DeleteForm from './forms/DeleteForm'

export default function YourCreations({ 
  pid, // Parent-path id
  creationType, 
  creations, 
  active,
  creationForm: CreationForm,
  }) {
  const dispatch = useDispatch()
  const handleActive = (selection) => (e) => {
    // console.info("selected: ", selection)
    // console.error("selected: ", selection)
    // console.warn("selected: ", selection)
    dispatch(updateSelection(creationType.toLowerCase(), selection))
  }

  let isEmpty = true
  if (Object.keys(creations).length) isEmpty = false

  return (
    <article>
      <h2>Your {creationType}s</h2>
      <CreationForm id={pid} />
      {isEmpty ? <p>You have no {creationType} yet! Why not start one? :B</p> : ""}
      <dl>
        {Object.values(creations).map(creation => (
            <button key={creation.id} type="button" onClick={handleActive(creation)} className={active.id === creation.id ? "active" : ""}>
              {/* <DeleteForm id={creation.id} /> */}
              <CreationForm id={creation.id} edit={creation} />
              <dt>{creation.title}</dt>
              <dd>{creation.description}</dd>
            </button>
        ))}
      </dl>
    </article>
  )
}
