import React from 'react'

export default function ErrorMessages({errors}) {
  return (<div>
    {Object.keys(errors).length ? <h2>Uh oh!</h2> : ""}
    <ul>
      {Object.values(errors).map(error => <li>{error}</li>)}
    </ul>
  </div>)
}