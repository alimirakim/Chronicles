import React from 'react'


export default function YourCreations({ creation_type, creations, active, setActive }) {
  
  const handleActive = (creation) => (e) => setActive(creation)
  
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
