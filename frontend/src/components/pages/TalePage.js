import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'

export default function TalePage() {
  const { cid, tid } = useParams()
  const tale = useSelector(state => state.tales[tid])
  console.log("tale start", tale, tale.first_thread_id)
  return (
    <main>
      <div style={{ margin: "1rem" }}><Link to={`/chronicles/${cid}`}><i className="fas fa-arrow-left" ></i> Go Back</Link></div>

      <section className="chron-head">

        <h1>{tale.title}</h1>
        <address>Created by <Link to={`/users/${tale.user_id}`}>{tale.creator}</Link>
        </address> <small>on {tale.created_at.toLocaleString()}</small>

        <p>{parse(tale.description)}</p>
      </section>


      <button className="lo-wow"><Link to={{
        pathname: `/tales/${tid}/play`,
        state: { thid: tale.first_thread_id }
      }}>
        Start!
      </Link></button>
    </main>
  )
}
