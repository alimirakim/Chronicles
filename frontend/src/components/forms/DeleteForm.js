import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

export default function DeleteForm({creation, creationType, deleteActionCreator}) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/${creationType.toLowerCase()}s/${creation.id}/delete`, { method: "DELETE" })
    if (res.ok) {
      console.log("ok!", res)
      dispatch(deleteActionCreator(creation))
      handleClose()
    } else {
      console.error(res)
    }
  }
  
  return (<>
    <button onClick={handleOpen}>Delete</button>
    
    <form className={open ? "is-popped" : "is-hidden"}>
      <h3>Delete {creationType}: "{creation.title}"?</h3>
      <strong>Are you SURE you want to permanently delete the {creationType} "{creation.title}" and everything that depends on it? D:</strong>
      <button type="button" onClick={handleClose}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </form>
      <div className={`${open ? "is-popped" : "is-hidden"}`}></div>
  </>)
}