import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import { getGalleryChronicles } from '../../store/mainActions/chronicleActions'

import Header from '../Header'

export default function PlayGallery({ auth, setAuth }) {

  const dispatch = useDispatch()
  const chronicles = useSelector(state => state.chronicles)
  let gallery_ids = useSelector(state => state.chronicles.gallery_ids)
  gallery_ids = Array.from(gallery_ids)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/chronicles/newest/12`)
      if (res.ok) {
        const chronicles = await res.json()
        dispatch(getGalleryChronicles(chronicles))
      }
    })()
  }, [])

  if (!gallery_ids.length) return null;

  return (
    <main>
      <h1>The Chronicles</h1>
      <h2>Discover, Play, or To Be Continued...</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>

      <article>
        <div className="chron-head th-card">
          <Link to={`/chronicles/${gallery_ids[0]}`}>
            {/* <img src={`/images/${item.icon}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
            <h2>Today's Spotlight</h2>
            <dl>
              <dt>Title</dt>
              <dd>{chronicles[gallery_ids[0]].title}</dd>
              <dt>Creator</dt>
              <dd><address>{chronicles[gallery_ids[0]].creator}</address></dd>
              {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd>
              <dt>Description</dt> */}
              <dd>{parse(chronicles[gallery_ids[0]].description)}</dd>
              {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
            </dl>
          </Link>
        </div>
      </article>

      <div className="lo-board">
        <ul className="gal">
          {gallery_ids.map(id => (
            <li key={id} className="th-card gal-card">
              <Link to={`/chronicles/${id}`}>
                {/* <img src={`/images/${item.icon}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
                <dl>
                  <dt>Title</dt>
                  <dd>{chronicles[id].title}</dd>
                  <dt>Creator</dt>
                  <dd><address>{chronicles[id].creator}</address></dd>
                  {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd> */}
                  <dt>Description</dt>
                  <dd>{parse(chronicles[id].description)}</dd>
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