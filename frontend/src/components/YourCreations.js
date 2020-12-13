import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelection } from '../actions/selectionActions'
import DeleteForm from './forms/DeleteForm'

export default function YourCreations({
  pid, // Parent-path id
  creationType,
  creations,
  filterBySelect,
  deleteActionCreator,
  creationForm: CreationForm,
}) {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.selections)
  const [selectedCreations, setSelectedCreations] = useState(creations)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const active = selected[creationType]

  const handleActive = (selection) => (e) => dispatch(updateSelection(creationType, selection))
  const handleOpenCreate = () => setOpenCreate(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseCreate = () => setOpenCreate(false)
  const handleCloseEdit = () => setOpenEdit(false)
  const handleCloseDelete = () => setOpenDelete(false)

  useEffect(() => {
    console.log("creations....,!!!!", selectedCreations, creationType)
    if (filterBySelect) setSelectedCreations(filterBySelect(creations, pid))
    else setSelectedCreations(creations)
  }, [creations, selected])

  if (!selectedCreations) return null;
  const isEmpty = (selectedCreations.length) ? false : true

  return (
    <article>

      <button type="button" onClick={handleOpenCreate} className="lo-wow">
        Create {creationType} <i className="fas fa-feather-alt"></i>
      </button>

      <CreationForm
        open={openCreate}
        handleClose={handleCloseCreate}
        id={pid}
      />
      {openDelete && <DeleteForm
        open={openDelete}
        handleClose={handleCloseDelete}
        creation={selected[creationType]}
        creationType={creationType}
        deleteActionCreator={deleteActionCreator}
      />}
      {openEdit && <CreationForm
        open={openEdit}
        handleClose={handleCloseEdit}
        id={selected[creationType].id}
        edit={selected[creationType]}
      />}

      <h2 className="lo-center-h" style={{ margin: "0 auto", fontSize: "1rem", opacity: 0.8 }}>Your {creationType}s</h2>
      {isEmpty ? <p>You have no {creationType}s yet! Why not start one? :B</p> :
        <>
          <ul style={{ display: "flex", flexWrap: "wrap-reverse" }}>
            {Object.values(selectedCreations).map(creation => (
              <li
                key={creation.id}
                onClick={handleActive(creation)}
                className={active.id === creation.id ? "card active" : "card"}
                style={active.id === creation.id ? { background: `linear-gradient(240deg, ${creation.color} -50%, rgba(250,250,255,0.8) 20%)` } : {}}
              >
                <div style={{ color: creation.color }} className="card-pic">
                  <i className={`fas fa-${creation.image} lo-center`}></i>
                </div>
                <div className="yrc-con lo-center">
                  {creation.title}
                  <div>
                    <button type="button" onClick={handleOpenEdit}>Edit</button>
                    <button type="button" onClick={handleOpenDelete}>Delete</button>
                    <i className="tip fas fa-question-circle"></i>
                    <section className="tip-info"><b>DESCRIPTION</b> <br />{creation.description}</section>
                  </div>
                </div>

              </li>
            ))}
          </ul>
        </>
      }
    </article>
  )
}
