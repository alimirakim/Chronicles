import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'

import Header from '../Header'

export default function TalePage({auth, setAuth}) {
  const { cid, tid } = useParams()
  const tale = useSelector(state => state.tales[tid])
  console.log("tale start", tale, tale.first_thread_id, tale.image)
  
  return (<>
          <Header
          auth={auth} setAuth={setAuth}
          imageUrl={tale.image}
          title={tale.title}
          subtitle={<><address>Created by <Link to={`/users/${tale.user_id}`}>{tale.creator}</Link>
        </address> <small>on {tale.created_at.toLocaleString()}</small></>}
        />
  
    <main>
      <div style={{ margin: "1rem" }}>
      <Link to={`/chronicles/${cid}`}><i className="fas fa-arrow-left" ></i> Go Back</Link>
      </div>

      <section className="chron-head">
        <p>{parse(tale.description)}</p>
      </section>


      <button className="lo-wow"><Link to={{
        pathname: `/chronicles/${cid}/tales/${tid}/play`,
        state: { thid: tale.first_thread_id }
      }}>
        Start!
      </Link></button>
    </main>
  </>)
}
