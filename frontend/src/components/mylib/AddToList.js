import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import SelectInput from './SelectInput'
import Info from './Info'

export default function AddToList({
  creationType,
  allItems,
  addedItems,
  setAddedItems
}) {
  const threads = useSelector(state => state.threads)
  const [itemId, setItemId] = useState("")

  const handleChange = (i) => (e) => {
    e.stopPropagation()
    const updatedAddedItems = [...addedItems]
    
    updatedAddedItems[i] = updatedAddedItems[i].split(" ")[0] + " " + e.target.value
    console.log("update", updatedAddedItems)
    setAddedItems(updatedAddedItems)
  }
  
  const addItem = (e) => {
    if (itemId) {
      const updatedAddedItems = [...addedItems]
      const newAddedItem = `${itemId} Go to: ${allItems[itemId].title}`
      updatedAddedItems.push(newAddedItem)
      setAddedItems(updatedAddedItems)
      setItemId("")
    }
  }

  const removeItem = (i) => (e) => {
    const updatedAddedItems = [...addedItems]
    updatedAddedItems.splice(i, 1)
    setAddedItems(updatedAddedItems)
  }
console.log("addtolist ping")
  return (<>
    <h3>Add a {creationType}</h3>

    <SelectInput
      label={creationType}
      values={allItems}
      value={itemId}
      setValue={setItemId}
    />

    <button type="button" onClick={addItem}>Add</button>

    <h4>Added {creationType}s</h4>
    <ul>
      {addedItems.map((addedItem, i) => (<div key={i} className={i}>
      Choice: {threads[Number(addedItem.split(" ")[0])].title} 
      <Info content={threads[Number(addedItem.split(" ")[0])].description} />
        <input type="text" value={addedItem.slice(2)} onChange={handleChange(i)} />
        <button type="button" onClick={removeItem(i)}>Remove</button>
        <br />
      </div>
      ))}
    </ul>
  </>)
}