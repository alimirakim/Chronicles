import React from 'react'
import SelectInput from './SelectInput'

export default function AddToList({
  creationType,
  allItems,
  addedItems,
  setAddedItems
}) {
  const [itemId, setItemId] = useState("")

  const handleChange = (i) => (e) => {
    e.stopPropagation()
    const updatedAddedItems = [...addedItems]
    updatedAddedItems[i]["title"] = e.target.value
    setAddedItems(updatedAddedItems)
  }
  
  const addItem = (e) => {
    if (itemId) {
      const updatedAddedItems = [...addedItems]
      const newAddedItem = { choice_thread_id: itemId, title: `Go to: ${allItems[itemId].title}` }
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
      {addedItems.map((addedItem, i) => (<div key={i}>
        <input type="text" value={addedItem.title} onChange={handleChange(i)} />
        <button type="button" onClick={removeItem(i)}>Remove</button>
        <br />
      </div>
      ))}
    </ul>
  </>)
}