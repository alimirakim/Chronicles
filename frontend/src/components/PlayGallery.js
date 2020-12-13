import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'


export default function PlayGallery() {
  const chronicles = useSelector(state => state.chronicles)
  const spotlightChronicle = Object.keys(chronicles)[0]
  console.log("spotlight??", Object.keys(chronicles))

  return (
    <main>
      <h1>The Chronicles</h1>
      <h2>Discover, Play, or To Be Continued...</h2>
      <small>No account? No problem! Play now and if you enjoy the tale you've started but haven't finished, you can make an account to save your progress any time before you leave!</small>

      <Link to={`/chronicles/${spotlightChronicle.id}`}>
        {/* <img src={`/images/${item.image}.svg`} alt={`Splash image for "${item.title}" by ${item.creator}`} /> */}
        <h2>Today's Spotlight</h2>
        <dl>
          <dt>Title</dt>
          <dd>{spotlightChronicle.title}</dd>
          <dt>Creator</dt>
          <dd><address>{spotlightChronicle.creator}</address></dd>
          {/* <dt>Latest Update</dt>
              <dd><datetime>{item.updated_at}</datetime></dd>
              <dt>Tags</dt>
              <dd>{item.tags}</dd>
              <dt>Description</dt> */}
          <dd>{spotlightChronicle.description}</dd>
          {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
        </dl>
      </Link>

      <ul>
        {Object.values(chronicles).map(chronicle => (
          <li key={chronicle.id}>
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
              <dd>{item.tags}</dd>
              <dt>Description</dt> */}
                <dd>{chronicle.description}</dd>
                {/* TODO Notes like how many tales, how many users, wordcount, hearts/stars */}
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}