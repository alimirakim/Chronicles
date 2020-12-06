import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addThread } from '../../actions/threadActions'
import ErrorMessages from '../ErrorMessages'
import { TextInput, TextAreaInput, AddToList } from './FormInputs'



// const threads = useSelector(state => state.threads)
{/* TODO Add input option to chance title, see thread preview */ }
// const editChoiceTitle = (e) => 


export default function ThreadForm({ handleChange, setUniqueContent }) {
  const threads = useSelector(state => state.threads)
  const [choices, setChoices] = useState([])

  useEffect(() => {
    setUniqueContent(choices)
  }, [choices])

  return (<>
    <AddToList creationType="Choices" allItems={threads} chosenItemIds={choices} setChosenItemIds={setChoices} handleChange={handleChange} />
    {/* <button onClick={addEffect}>+Effect</button> */}
    {/* <button onClick={addLock}>+Lock</button> */}

  </>)
}
