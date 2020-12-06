import React, { useState, cloneElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '../ErrorMessages'
import { TextInput, TextAreaInput } from './FormInputs'
import { getErrors, wipeErrors } from '../../actions/errorActions'


export default function CreationFormWrapper({
  creationType,
  uniqueInputs,
  path,
  actionCreator,
  setActive,
}) {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [uniqueContent, setUniqueContent] = useState({})
  // const [colors, setColors] = useState(useSelector(state => state.colors)
  // const [images, setImages] = useState(useSelector(state => state.images)

  const handleActive = (content) => (e) => setActive({...content})
  
  const handleChange = (setFieldValue) => (e) => setFieldValue(e.target.value)

  const handleOpen = (e) => setOpen(true)

  const handleClose = (e) => {
    setOpen(false)
    if (errors) dispatch(wipeErrors())
  }
  // const uniqueInputsWithHandleChange = cloneElement(uniqueInputs, handleChange, setUniqueContent)

  const submitCreation = async (e) => {
    e.preventDefault()
    if (errors) dispatch(wipeErrors())
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, }),
    })
    const content = await res.json()
    if (!content.errors) {
      handleActive(content)
      dispatch(actionCreator(content))
      console.log("active now", content)
      
      // Reset form input values
      setTitle("")
      setDescription("")
      setUniqueContent({})
      handleClose()
      
    } else {
      console.log("ERROR!!!", content.errors)
      dispatch(getErrors(content.errors))
    }
  }

  return (<>
    <button type="button" onClick={handleOpen}>+{creationType}</button>
    <div className={`${open ? "" : "is-hidden"}`}>
      <button onClick={handleClose}>x</button>

      <h2>Create a {creationType}</h2>
      <ErrorMessages errors={errors} />

      <form onSubmit={submitCreation}>
        <TextInput label="Title" handleChange={handleChange} value={title} setValue={setTitle} />
        <TextAreaInput label="Description" handleChange={handleChange} value={description} setValue={setDescription} />
        {/* <SelectInput label="Color" handleChange={handleChange} values={colors} value={color} setValue={setColor} /> */}
        {/* <SelectInput label="Image" handleChange={handleChange} values={images} value={image} setValue={setImage} /> */}

        {/* TODO FFFFFFFFFFFFUUUUUUUUUUUUUUCCCCCCCCCCCCCCCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK FUCK FUCK FUCKITY FUCK */}
        {/* {uniqueInputs} */}

        <button type="submit">Create</button>

        {/* <button onClick={addEffect}>+Effect</button> */}
        {/* <button onClick={addLock}>+Lock</button> */}

      </form>
    </div>
  </>)
}