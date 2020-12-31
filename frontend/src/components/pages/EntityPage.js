import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import Badge from '@material-ui/core/Badge'
import { createMuiTheme } from '@material-ui/core/styles';
import Countdown from 'react-countdown'

import Header from '../Header'
import Info from '../mylib/Info'

import { addEntity } from '../../store/mainActions/entityActions'


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

function MeterBar({ points, cap }) {
  const percent = points / cap * 100

  return (<div style={{ backgroundColor: "rgba(255,255,255,0.5)", maxWidth: "20rem", padding: "1rem" }}>
    <p style={{ margin: 0 }}>Points: {points ? points + "/" + cap : "MAXED"}</p>
    <LinearProgress variant="determinate" value={percent} />
  </div>)
}



function calculateLevel(meter, points) {
  let level = 0
  let currentPoints = points
  let currentCap = meter.base
  let currentMod = meter.mod
  // let cap = 0
  let i = 1
  while (currentPoints >= currentCap && currentCap > 0 && level < meter.max) {
    level += 1
    currentPoints -= currentCap
    if (meter.algorithm == "constant") {
      console.log("constant's mod never changes")
    } else {
      if (meter.algorithm = "linear") {
        currentMod += meter.mod
      } else if (meter.algorithm = "exponential") {
        currentMod += currentMod
      } else if (meter.algorithm = "doubler") {
        currentMod += meter.mod * i
      } else if (meter.algorithm = "multiplier") {
        currentMod *= meter.mod
      } else if (meter.algorithm = "mod-multiplier") {
        currentMod += meter.mod * meter.mod
      } else if (meter.algorithm = "") {
        currentMod += currentMod + meter.mod
      }
      currentCap += currentMod
    }
    i++
  }
  if (level === meter.max) {
    currentPoints = 0
    currentCap = 0
  }
  return { level, currentPoints, currentCap }
}


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
      subtitle={location ? `Currently at ${location}` : entity.description}
    />
    <main>
      <img src={entity.image} alt={entity.title} style={{ borderRadius: "50%", height: "10rem", width: "10rem", objectFit: "cover" }} />

      <dl>
        <dt>Name</dt>
        <dd>{entity.title}</dd>

        <dt>Created at</dt>
        <dd>{entity.created_at.toLocaleString()}</dd>

        <dt>Creator</dt>
        <dd>{entity.creator}</dd>

        {isPc && <>
          <dt>Chronicle</dt>
          <dd><Link to={`/chronicles/${entity.chronicle_id}`}>{chronicles[entity.chronicle_id].title}</Link></dd>
        </>}

        <dt>About</dt>
        <dd>{entity.description}</dd>
      </dl>

      <h2>Details</h2>
      <h3>Stats</h3>
      {/* TODO Integrate recharts chart with character meter stats */}

      {entity.meters.map((m, i) => {
        const meter = calculateLevel(meters[m[0]], m[1])
        return (

          <li key={i} >
            <Info content={m[0].description} />
            <i className={`fas fa-${meters[m[0]].icon}`}></i>
            { meters[m[0]].title}
            <p><b>Level: {meter.level} / {meters[m[0]].max}</b></p>
            <MeterBar points={meter.currentPoints} cap={meter.currentCap} />

          </li>
        )
      }
      )}

      <h3>Assets</h3>
      {/* TODO Map list of asset items by type */}
      {entity.assets.map((a, i) => (
        <li key={i}>
          <Info content={assets[a[0]].description} />
          <Badge badgeContent={a[1]} color="primary">
            <i className={`fas fa-2x fa-${assets[a[0]].icon}`} style={{ color: assets[a[0]].color }}></i>
          </Badge>
          <small style={{ marginRight: "1rem" }}></small>
          {assets[a[0]].title}
        </li>
      ))}

      <h3>Equipped</h3>
      {/* TODO Show slots and contents */}
      {entity.slots.map((sl, i) => (
        <li key={i}>
          <Info content={slots[sl[0]].description} />
          <i className={`fas fa-lg fa-${slots[sl[0]].icon}`} style={{ color: slots[sl[0]].color }}></i>
          {slots[sl[0]].title}

        </li>
      ))}

      <h3>Status</h3>
      {/* TODO Show conditions */}
      {entity.statuses.map((st, i) => {

        console.log("date", new Date(st[1]))
        return (
          <li key={i}>
            <Info content={statuses[st[0]].description} />
            <Badge badgeContent={a[1]} color="primary">
              <i className={`fas fa-2x fa-${statuses[st[0]].icon}`} style={{ color: statuses[st[0]].color }}></i>
            </Badge>
            {statuses[st[0]].title}
            <Countdown date={new Date(st[1])} renderer={expiryRenderer} />
          </li>
        )
      })}


    </main>
  </>)
}


// Renderer callback with condition


function EntityStatus({ entity }) {
  const statuses = useSelector(state => state.status)
  
  const expiryRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <span>(expired)</span>
    } else {
      // Render a countdown
      return (
        <p><small>
          <b>Expires in:</b> {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
        </small>
        </p>
      );
    }
  };

  
  const expiryRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <span>(expired)</span>
    } else {
      // Render a countdown
      return (
        <p><small>
          <b>Expires in:</b> {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
        </small>
        </p>
      );
    }
  };

  return (<section>
    <h3>Status</h3>
    {entity.statuses.map((st, i) => {

      console.log("date", new Date(st[1]))
      return (
        <li key={i}>
          <Info content={statuses[st[0]].description} />
          <Badge badgeContent={a[1]} color="primary">
            <i className={`fas fa-2x fa-${statuses[st[0]].icon}`} style={{ color: statuses[st[0]].color }}></i>
          </Badge>
          {statuses[st[0]].title}
          <Countdown date={new Date(st[1])} renderer={expiryRenderer} />
        </li>
      )
    })}

  </section>)
}