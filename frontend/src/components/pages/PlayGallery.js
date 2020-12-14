import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import { addChronicles } from '../../actions/chronicleActions'


export default function PlayGallery() {
  const dispatch = useDispatch()
  const chronicles = useSelector(state => state.chronicles)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/chronicles/newest/12`)
      if (res.ok) {
        // console.log("gallery newest", await res.json())
        dispatch(addChronicles(await res.json()))
      }
    })()
  }, [])
  console.log("play chronicles??", Object.values(chronicles)[0])
  if (!Object.keys(chronicles).length) return null;
  const spotlight = Object.values(chronicles)[0]

  return (
    <main>
      <h1>The Chronicles</h1>
      <h2>Discover, Play, or To Be Continued...</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>

      <article className="spot">
        <div className="lo-center-h th-card">
          <Link to={`/chronicles/${spotlight.id}`}>
            {/* <img src={`/images/${item.image}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
            <h2>Today's Spotlight</h2>
            <dl>
              <dt>Title</dt>
              <dd>{spotlight.title}</dd>
              <dt>Creator</dt>
              <dd><address>{spotlight.creator}</address></dd>
              {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd>
              <dt>Description</dt> */}
              <dd>{parse(spotlight.description)}</dd>
              {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
            </dl>
          </Link>
        </div>
      </article>

      <div className="lo-board">
        <ul className="gal">
          {Object.values(chronicles).map(chronicle => (
            <li key={chronicle.id} className="th-card gal-card">
              <Link to={`/chronicles/${chronicle.id}`}>
                {/* <img src={`/images/${item.image}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
                <dl>
                  <dt>Title</dt>
                  <dd>{chronicle.title}</dd>
                  <dt>Creator</dt>
                  <dd><address>{chronicle.creator}</address></dd>
                  {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd> */}
                  <dt>Description</dt>
                  <dd>{parse(chronicle.description)}</dd>
                  {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}