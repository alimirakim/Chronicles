import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import { wipeErrors } from '../store/mainActions/errorActions'
import { updateSelection } from '../store/mainActions/selectionActions'

// MY COMPONENTS
import DeleteForm from './forms/DeleteForm'
import Info from './mylib/Info'


export default function YourCreations({
  pid, // Parent-path id
  creationType,
  creations,
  filterBySelect,
  deleteActionCreator,
  creationForm: CreationForm,
}) {
  const dispatch = useDispatch()
  const errors = useSelector(state => state.errors)
  const selected = useSelector(state => state.selections)
  const [selectedCreations, setSelectedCreations] = useState(creations)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const active = selected[creationType]
  // const active = selected[creationType] ? selected[creationType] : {id: ""}
  


  const handleActive = (selection) => (e) => dispatch(updateSelection(creationType, selection))
  const handleOpenCreate = () => setOpenCreate(true)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleOpenDelete = () => setOpenDelete(true)
  const handleCloseCreate = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenCreate(false)
  }
  const handleCloseEdit = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenEdit(false)
  }
  const handleCloseDelete = () => {
    if (errors.length) dispatch(wipeErrors())
    setOpenDelete(false)
  }

  useEffect(() => {
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

      {openCreate && <>
        <div className="pop lo-center">
          <button onClick={handleCloseCreate} className="lo-x">&times;</button>
          <CreationForm
            open={openCreate}
            handleClose={handleCloseCreate}
            id={pid}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      {openDelete && <>
        <div className="pop lo-center">
          <button onClick={handleCloseDelete} className="lo-x">&times;</button>
          <DeleteForm
            open={openDelete}
            handleClose={handleCloseDelete}
            creation={selected[creationType]}
            creationType={creationType}
            deleteActionCreator={deleteActionCreator}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      {openEdit && <>
        <div className="pop lo-center">
          <button onClick={handleCloseEdit} className="lo-x">&times;</button>
          <CreationForm
            open={openEdit}
            handleClose={handleCloseEdit}
            id={selected[creationType].id}
            edit={selected[creationType]}
          />
        </div>
        <div className="lo-screen"></div>
      </>}

      <h2 className="lo-center-h" style={{ margin: "0 auto", fontSize: "1rem", opacity: 0.8 }}>Your {creationType}s</h2>
      {isEmpty ? <p>You have no {creationType}s yet! Why not start one? :B</p> :
        <>
          <ul>
            {Object.values(selectedCreations).map(creation => (
              <li
                key={creation.id}
                onClick={handleActive(creation)}
                className={active.id === creation.id ? "card active" : "card"}
                style={active.id === creation.id ? { background: `linear-gradient(240deg, ${creation.color} -50%, rgba(250,250,255,0.8) 20%)` } : {}}
              >

                <Link to={`/${creationType}s/${creation.id}`}>
                  <div style={{ backgroundColor: creation.color }} className="card-pic">
                    <i className={`fas fa-${creation.icon} lo-center `}></i>
                  </div>
                </Link>

                <div className="yrc-con lo-center-y">
                  {creation.title}
                  <div>
                    <button type="button" onClick={handleOpenEdit}>Edit</button>
                    <button type="button" onClick={handleOpenDelete}>Delete</button>
                    <Info content={<><b>DESCRIPTION</b> {creation.description
                      ? parse(creation.description) : "N/A"}</>}
                    />
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
