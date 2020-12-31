import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import Badge from '@material-ui/core/Badge'
import { createMuiTheme } from '@material-ui/core/styles';

import Header from '../../Header'
import EntityStatuses from './EntityStatuses'
import EntitySlots from './EntitySlots'
import EntityAssets from './EntityAssets'
import EntityMeters from './EntityMeters'

import Info from '../../mylib/Info'

import { addEntity } from '../../../store/mainActions/entityActions'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(250,40,60)",
    },
    secondary: {
      main: '#f44336',
    },
  },
});



export default function EntityPage({ auth, setAuth }) {
  console.log("entity ping")
  const { eid } = useParams()
  const dispatch = useDispatch()
  const { entities, chronicles, assets, meters, statuses, slots } = useSelector(state => state)
  const entity = useSelector(state => state.entities[eid])
  const isPc = false


  let location;
  if (entity.location_id) location = entities[entity.location_id].image
  else location = ""

  useEffect(() => {
    if (!entity) {
      (async () => {
        const res = await fetch(`/api/entities/${eid}`)
        const fetchedEntity = await res.json()
        dispatch(addEntity(fetchedEntity))
      })()
    }
  }, [entity])




  console.log("entity ping")
  if (!entity) return null
  return (<>
    <Header
      auth={auth} setAuth={setAuth}
      imageUrl={location}
      title={entity.title}
      subtitle={location ? `Currently at ${location}` : parse(entity.description)}
    />
    <main>
      <img src={entity.image} alt={entity.title} style={{ float: "left", marginRight: "1rem", borderRadius: "50%", height: "10rem", width: "10rem", objectFit: "cover" }} />


      <dl>
        <div style={{ fontSize: "1.5rem" }}><dt>Name</dt>
          <dd>{entity.title}</dd>
        </div>

        <hr />

        <div style={{ fontSize: "0.8rem" }}>
          <dt>Created at</dt>
          <dd>{entity.created_at.toLocaleString()}</dd>
          <dt>Creator</dt>
          <dd>{entity.creator}</dd>

          {isPc && <>
            <dt>Chronicle</dt>
            <dd><Link to={`/chronicles/${entity.chronicle_id}`}>{chronicles[entity.chronicle_id].title}</Link></dd>
          </>}
        </div>
      </dl>

      <h2 style={{ clear: "both", marginTop: "2rem" }}>About</h2>
      {parse(entity.description)}
      <hr />

      <h2>Details</h2>
      <div style={{ marginLeft: "2rem" }}>
        <EntitySlots entity={entity} />
        <div className="fake-slots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
      <hr />
        
      <div style={{ marginLeft: "2rem" }}>
        <EntityStatuses entity={entity} />
      </div>
      <hr />
      <div style={{ marginLeft: "2rem" }}>
        <EntityAssets entity={entity} />
      </div>
      <hr />
      <div style={{ marginLeft: "2rem" }}>
        <EntityMeters entity={entity} />
      </div>


      </div>
    </main>
  </>)
}


// Renderer callback with condition
