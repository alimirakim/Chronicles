import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useLocation, useHistory} from 'react-router-dom'

export default function CurrentThread() {
  const {state: {thid} } = useLocation()
  console.log("thid", thid)
  const {threads, thread, threadChoices, currentThreadChoices} = useSelector(state => ({
    threads: state.threads,
    threadChoices: state.choices,
    thread: state.threads[thid],
    currentThreadChoices: Object.values(state.choices).filter(choice => choice.current_thread_id === thid),
  }))
  const [currentThread, setCurrentThread] = useState(thread)
  const [currentChoices, setCurrentChoices] = useState(currentThreadChoices)
  
  const handleChoice = (tcid) => (e) => {
    console.log("currentThread", threadChoices, currentThread, tcid)
    setCurrentThread(threads[tcid])
    setCurrentChoices(Object.values(threadChoices).filter(choice => choice.current_thread_id == threads[tcid].id))
  }
  
  return (<section>
    <h2>{currentThread.title}</h2>
    <p>{currentThread.description}</p>
    
    <h3>Make Your Choice...</h3>
    <ul>
    {currentChoices.map(choice => (
      <li><button onClick={handleChoice(choice.choice_thread_id)}>{choice.title}</button></li>
    ))}
    </ul>
    </section>
  )
}