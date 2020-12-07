import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddToList } from './FormInputs'



// const threads = useSelector(state => state.threads)
{/* TODO Add input option to chance title, see thread preview */ }
// const editChoiceTitle = (e) => 


export default function ThreadForm({ handleChange, setUniqueContent }) {
  const threads = useSelector(state => state.threads)
  const [choices, setChoices] = useState([])

  useEffect(() => {
    setUniqueContent({choices})
    console.log("choices", choices)
  }, [choices])

  return (<>
    <AddToList
      creationType="Choice"
      allItems={threads}
      chosenItemIds={choices}
      setChosenItemIds={setChoices}
      handleChange={handleChange}
    />
    {/* <button onClick={addEffect}>+Effect</button> */}
    {/* <button onClick={addLock}>+Lock</button> */}

  </>)
}
