import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreationFormWrapper from './CreationFormWrapper'
import AddToList from '../mylib/AddToList'


import { addThread, updateThread } from '../../store/mainActions/threadActions'


// const threads = useSelector(state => state.threads)
{/* TODO Add input option to chance title, see thread preview */ }
// const editChoiceTitle = (e) => 


export default function ThreadForm({ tid, id, edit, open, handleClose }) {
  const threads = useSelector(state => Object.values(state.threads).filter(th=>th.tale_id == tid))
  const [choices, setChoices] = useState(edit ? edit.choices : [])

  const resetUniqueContent = () => setChoices([])

  const addChoicesToThread = () => (
    <AddToList
      creationType="choice"
      allItems={threads}
      addedItems={choices}
      setAddedItems={setChoices}
    />
  )

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/threads/${id}/edit` : `/api/tales/${id}/threads/create`}
      creationType="thread"
      actionCreator={edit ? updateThread : addThread}
      uniqueContent={{ choices }}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={addChoicesToThread}
    />

    {/* <button onClick={addEffect}>+Effect</button> */}
    {/* <button onClick={addLock}>+Lock</button> */}

  </>)
}
