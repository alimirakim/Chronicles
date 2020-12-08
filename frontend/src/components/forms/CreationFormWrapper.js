import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '../ErrorMessages'
import { TextInput, TextAreaInput } from './FormInputs'
import { getErrors, wipeErrors } from '../../actions/errorActions'
import { updateSelection } from '../../actions/selectionActions'


export default function CreationFormWrapper({
    edit,
    path,
    creationType,
    actionCreator,
    uniqueContent,
    resetUniqueContent,
    uniqueForm: UniqueForm,
  }) {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  // const [image, setImage] = useState(edit ? edit.image : 1)
  // const [color, setColor] = useState(edit ? edit.color : 1)
  // const colors = useState(useSelector(state => state.colors))
  // const images = useState(useSelector(state => state.images))

  const handleSelection = (selection) => dispatch(updateSelection(creationType.toLowerCase(), selection))
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => {
    setOpen(false)
    if (errors.length) dispatch(wipeErrors())
    if (!edit) {
      setTitle("")
      setDescription("")
      resetUniqueContent()
    }
  }

  const submitCreation = async (e) => {
    e.preventDefault()
    if (errors.length) dispatch(wipeErrors())
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, ...uniqueContent }),
    })
    const content = await res.json()
    if (!content.errors) {
      dispatch(actionCreator(content))
      handleSelection(content)
      handleClose()
    } else {
      console.error("ERROR!!!", content.errors)
      dispatch(getErrors(content.errors))
    }
  }

  return (<>
    <button type="button" onClick={handleOpen} disabled={open}>{edit ? `Edit` : `+${creationType}`}</button>
    <div className={`${open ? "is-popped" : "is-hidden"}`}>
      <h2>{edit ? `Edit ${creationType}: "${edit.title}"` : `Create a ${creationType}`}</h2>

      {/* Hides popup form on click */}
      <button onClick={handleClose}>x</button>

      {/* Shows error messages on failed submission */}
      <ErrorMessages errors={errors} />

      <form onSubmit={submitCreation}>
        {/* Generic inputs */}
        <TextInput label="Title" value={title} setValue={setTitle} />
        <TextAreaInput label="Description" value={description} setValue={setDescription} />
        {/* <SelectInput label="Color" values={colors} value={color} setValue={setColor} /> */}
        {/* <SelectInput label="Image" values={images} value={image} setValue={setImage} /> */}

        <UniqueForm />

        <button type="submit">{edit ? `Save` : `Create`}</button>

      </form>
    </div>
  </>)
}