import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link } from 'react-router-dom'


export default function CurrentThread() {
  const {cid, tid} = useParams()
  const { state: { thid } } = useLocation()
  console.log("thid", thid)
  const { threads, thread, threadChoices, currentThreadChoices } = useSelector(state => ({
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

  return (<section>
    <h2>{currentThread.title}</h2>
    <p>{currentThread.description}</p>

    <h3>Make Your Choice...</h3>
    <ul>
      {history.length ? <li><button onClick={handleGoBack}>Go Back</button></li> : <Link to={`/chronicles/${cid}/tales/${tid}`}>Go Back</Link>}
      {currentChoices.map(choice => (
        <li key={choice.id}><button onClick={handleChoice(choice.choice_thread_id)}>{choice.title}</button></li>
      ))}
    </ul>
  </section>
  )
}