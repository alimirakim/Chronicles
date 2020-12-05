import React from 'react'

export default function ErrorMessages({errors}) {
  return (<div>
    {errors.length ? <h2>Uh oh!</h2> : ""}
    <ul>
      {errors.map(error => <li>{error}</li>)}
    </ul>
  </div>)
}