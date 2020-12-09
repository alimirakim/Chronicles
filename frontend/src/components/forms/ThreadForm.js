import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreationFormWrapper from './CreationFormWrapper'
import { AddToList } from './FormInputs'
import { addThread, updateThread } from '../../actions/threadActions'


// const threads = useSelector(state => state.threads)
{/* TODO Add input option to chance title, see thread preview */ }
// const editChoiceTitle = (e) => 


export default function ThreadForm({ id, edit }) {
  const threads = useSelector(state => state.threads)
  const [choices, setChoices] = useState(edit ? edit.choices : [])

  const resetUniqueContent = () => setChoices([])

  const addChoicesToThread = () => (
    <AddToList
      creationType="Choice"
      allItems={threads}
      addedItems={choices}
      setAddedItems={setChoices}
    />
  )

  return (<>
    <CreationFormWrapper
      edit={edit}
      path={edit ? `/api/threads/${id}/edit` : `/api/tales/${id}/threads/create`}
      creationType="Thread"
      actionCreator={edit ? updateThread : addThread}
      uniqueContent={{ choices }}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={addChoicesToThread}
    />

    {/* <button onClick={addEffect}>+Effect</button> */}
    {/* <button onClick={addLock}>+Lock</button> */}

  </>)
}
