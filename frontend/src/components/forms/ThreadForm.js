import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addThread} from '../../actions/threadActions'
import ErrorMessages from '../ErrorMessages'



export default function ThreadForm({tid, open, handleClose}) {
  const dispatch = useDispatch()
  // const images = useSelector(state => state.images)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [choice, setChoice] = useState("")
  const [choices, setChoices] = useState([])
  const [errors, setErrors] = useState([])
  const threads = useSelector(state => state.threads)
  
  const handleChange = (setFieldValue) => (e) => {
    setFieldValue(e.target.value)
    console.log(e.target.value)
  }
  const addChoice = (e) => {
    setChoices([...choices, choice])
    console.log("adding choice", choice, choices)
  }
  const removeChoice = (id) => (e) => setChoices(choices.filter(choice => choice.id !== id))
  
  const submitThread = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/tales/${tid}/threads/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tale_id: tid, title, description, choices, }),
    })
    const thread = await res.json()
    if (!thread.errors) {
      console.log("created thread", thread)
      dispatch(addThread(thread))
      handleClose()
    } else {
      setErrors(thread.errors)
    }
  }
  return (<div className={`${open ? "" : "is-hidden"}`}>
    <button onClick={handleClose}>x</button>
    <h2>Create a Thread</h2>
    <form onSubmit={submitThread}>
      <ErrorMessages errors={errors} />
      <label>Title
        <input type="text" onChange={handleChange(setTitle)} value={title} required />
      </label>
      
      <label>Description
        <textarea onChange={handleChange(setDescription)} value={description} required />
      </label>
      
      {/* <button onClick={addEffect}>+Effect</button> */}
      
      <label>Add a Choice
        <select value={choice} onChange={handleChange(setChoice)}>
            <option value="">--</option>
          {Object.values(threads).map(thread => (
            <option value={thread.id}>{thread.title}</option>
          ))}
        </select>
      </label> 
      <button type="button" onClick={addChoice}>Add</button>

      <h3>Choices</h3>
      <ul>
      {choices.map(choice => (<>
        <button>{threads[choice].title}</button>
        <button onClick={removeChoice(choice)}>Remove</button>
        </>
      ))}
      </ul>

      <button type="submit">Create Thread</button>
      {/* <button onClick={addLock}>+Lock</button> */}
      {/* <label>Image
        <select>
          {images.map(img => (
            <option value={img}><img src={`${img}.png`} alt={img} /></option>
          ))}
        </select>
      </label> */}
    </form>
    </div>)
}