import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessages from '../ErrorMessages'
import { TextInput, TextAreaInput, SelectInputColors, SelectInputImages } from './FormInputs'
import { getErrors, wipeErrors } from '../../actions/errorActions'
import { updateSelection } from '../../actions/selectionActions'

export default function CreationFormWrapper({
  open,
  handleClose,
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
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  const [color, setColor] = useState(edit ? edit.color : "rgb(70,60,70)")
  const [image, setImage] = useState(edit ? edit.image : `heart`)

  const handleSelection = (selection) => {
    if (creationType === "thread") return dispatch(updateSelection(creationType, selection.thread))
    dispatch(updateSelection(creationType, selection))
    console.info("new creation selection", creationType, selection)
  }
  const handleCloseAndReset = (e) => {
    if (errors.length) dispatch(wipeErrors())
    if (!edit) {
      setTitle("")
      setDescription("")
      resetUniqueContent()
    }
    handleClose()
  }

  const submitCreation = async (e) => {
    e.preventDefault()
    if (errors.length) dispatch(wipeErrors())
    console.log("submit!",)
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, color, image, ...uniqueContent }),
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

  if (!open) return null
  return (<>
    <form onSubmit={submitCreation}>
      <h2>{edit ? `Edit ${creationType}: "${edit.title}"` : `Create a ${creationType}`}</h2>

      {/* Hides popup form on click */}

      {/* Shows error messages on failed submission */}
      <ErrorMessages errors={errors} />

      {/* Generic inputs */}
      <TextInput label="Title" value={title} setValue={setTitle} />
      <TextAreaInput label="Description" value={description} setValue={setDescription} />
      <SelectInputColors image={image} value={color} setValue={setColor} />
      <SelectInputImages color={color} value={image} setValue={setImage} />
      <UniqueForm />

      <button className="lo-wow">
        {edit ? ` Save ` : ` Create `}
        <i className="fas fa-feather-alt"></i>
      </button>
    </form>
  </>)
}