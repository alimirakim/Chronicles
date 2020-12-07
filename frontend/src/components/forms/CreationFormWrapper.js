import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '../ErrorMessages'
import { TextInput, TextAreaInput } from './FormInputs'
import { getErrors, wipeErrors } from '../../actions/errorActions'
import { updateSelection} from '../../actions/selectionActions'

export default function CreationFormWrapper({
  path,
  creationType,
  uniqueInputs: UniqueInput,
  actionCreator,
  selectionType
}) {
  
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // const [colors, setColors] = useState(useSelector(state => state.colors)
  // const [images, setImages] = useState(useSelector(state => state.images)
  const [uniqueContent, setUniqueContent] = useState({})

  const handleSelection = (selection) => (e) => updateSelection({ selectionType, selection })
  const handleChange = (setFieldValue) => (e) => setFieldValue(e.target.value)
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => {
    setOpen(false)
    if (errors) dispatch(wipeErrors())
  }

  const submitCreation = async (e) => {
    e.preventDefault()
    if (errors) dispatch(wipeErrors())
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, ...uniqueContent}),
    })
    const content = await res.json()
    if (!content.errors) {
      handleSelection(content)
      dispatch(actionCreator(content))

      // Reset form input values
      setTitle("")
      setDescription("")
      setUniqueContent({})
      handleClose()

    } else {
      console.error("ERROR!!!", content.errors)
      console.info("INFO1!!!")
      dispatch(getErrors(content.errors))
    }
  }

  return (<>
    <button type="button" onClick={handleOpen}>+{creationType}</button>
    <div className={`${open ? "" : "is-hidden"}`}>
      <h2>Create a {creationType}</h2>
    
      {/* Hides popup form on click */}
      <button onClick={handleClose}>x</button>
      
      {/* Shows error messages on failed submission */}
      <ErrorMessages errors={errors} />

      <form onSubmit={submitCreation}>
        {/* Generic inputs */}
        <TextInput label="Title" handleChange={handleChange} value={title} setValue={setTitle} />
        <TextAreaInput label="Description" handleChange={handleChange} value={description} setValue={setDescription} />
        {/* <SelectInput label="Color" handleChange={handleChange} values={colors} value={color} setValue={setColor} /> */}
        {/* <SelectInput label="Image" handleChange={handleChange} values={images} value={image} setValue={setImage} /> */}
        
        <UniqueInput handleChange={handleChange} setUniqueContent={setUniqueContent} />
        
        <button type="submit">Create</button>

      </form>
    </div>
  </>)
}