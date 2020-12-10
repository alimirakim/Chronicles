import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

export default function TalePage() {
  const { cid, tid } = useParams()
  const tale = useSelector(state => state.tales[tid])
  console.log("tale start", tale, tale.first_thread_id)
  return (
    <article>
      <h1>{tale.title}</h1>
      <Link to={`/chronicles/${cid}`}>Go back to Chronicle page</Link>
      <p>{tale.description}</p>
      <Link to={{
        pathname: `/chronicles/${cid}/tales/${tid}/play`,
        state: { thid: tale.first_thread_id }
      }}>
        Start
      </Link>
    </article>
  )
}
