import React from 'react'
import {useDispatch} from 'react-redux'
import {updateSelection} from '../actions/selectionActions'

export default function YourCreations({ creation_type, creations, active, selectionType }) {
  const dispatch = useDispatch()
  const handleActive = (selection) => (e) => {
    // console.info("selected: ", selection)
    // console.error("selected: ", selection)
    // console.warn("selected: ", selection)
    dispatch(updateSelection(selectionType, selection))
  }
  
  let isEmpty = true
  if (Object.keys(creations).length) isEmpty = false
  
  return (
    <article>
      <h2>Your {creation_type}</h2>
      {isEmpty ? <p>You have no {creation_type} yet! Why not start one? :B</p> : ""}
      <dl>
        {Object.values(creations).map(creation => (<>
          <button type="button" onClick={handleActive(creation)} className={active.id === creation.id ? "active" : ""}>
            <dt>{creation.title}</dt>
            <dd>{creation.description}</dd>
          </button>
        </>))}
      </dl>
    </article>
  )
}
