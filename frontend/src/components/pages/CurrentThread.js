import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'
import parse from 'html-react-parser'

export default function CurrentThread() {
  const { cid, tid } = useParams()
  const { state: { thid } } = useLocation()
  const tale = useSelector(state => state.tales[tid])
  const { effects, threads, thread, threadChoices, currentThreadChoices } = useSelector(state => ({
    effects: state.effects,
    threads: state.threads,
    threadChoices: state.choices,
    thread: state.threads[thid],
    currentThreadChoices: Object.values(state.choices).filter(choice => choice.current_thread_id === thid),
  }))
  const [history, setHistory] = useState([])
  const [currentThread, setCurrentThread] = useState(thread)
  const [currentChoices, setCurrentChoices] = useState(currentThreadChoices)

  const handleChoice = (chid) => (e) => {
    const updatedHistory = [...history]
    updatedHistory.push(currentThread.id)
    setHistory(updatedHistory)
    console.log("history", history)
    setCurrentThread(threads[chid])
    setCurrentChoices(Object.values(threadChoices).filter(choice => choice.current_thread_id == threads[chid].id))
  }

  const handleGoBack = (e) => {
    const prevThread = threads[history[history.length - 1]]
    setHistory(history.slice(0, history.length - 1))
    setCurrentThread(threads[prevThread.id])
    setCurrentChoices(Object.values(threadChoices).filter(choice => choice.current_thread_id == prevThread.id))
  }

  const checkLocks = (e) => {
    return true
    // TODO Check for locks. On each lock, check requirements, then eventually return final yes/no
  }

  return (<section>
    <div style={{ margin: "1rem" }}><Link to={`/tales/${tid}`}><i className="fas fa-arrow-left" ></i> Go Back</Link></div>


    <h1 style={{ margin: "0 4rem" }}>{tale.title}</h1>
    <section className="chron-head">
      <h2>{currentThread.title}</h2>
      <p>{parse(currentThread.description)}</p>
    </section>

    <hr />
    <h3>Effects</h3>
    <i>N/A</i>
    <ul>
      {thread.effects.map(i => <li key={i}>Effect: {effects[i].title}</li>)}
    </ul>
    <hr />


    <h3>Make Your Choice...</h3>
    <ul>
    {/* TODO Check if 'is_returnable' before allowing Go Back option */}
      {history.length
        ? <li className="card" ><button onClick={handleGoBack} className="yrc-con lo-center-y"><span><i className="fas fa-arrow-left" ></i> Go Back</span></button></li>
        : <li className="card"><Link to={`/tales/${tid}`}   className="yrc-con lo-center-y"><span><i className="fas fa-arrow-left" ></i> Go Back</span></Link></li>
      }
      {currentChoices.filter(choice => checkLocks(choice)).map(choice => (
        

        <li key={choice.id} className="card" onClick={handleChoice(choice.choice_thread_id)}>
        <div style={{ backgroundColor: choice.color }} className="card-pic">
                  <i className={`fas fa-${choice.image} lo-center-y`}></i>
                </div>
                <div className="yrc-con lo-center-y">
        {choice.title}
        </div>
        </li>
      ))}
    </ul>
  </section>
  )
}