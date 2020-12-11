import React, { useState } from 'react'


export function TextInput({ label, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (
    <label>{label}
      <input type="text" onChange={handleChange} value={value} />
    </label>
  )
}


export function TextAreaInput({ label, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (
    <label>{label}
      <textarea onChange={handleChange} value={value} />
    </label>
  )
}


export function SelectInput({ label, values, value, setValue }) {
  const handleChange = (e) => setValue(e.target.value)

  return (
    <label>{label}
      <select value={value} onChange={handleChange}>
        <option value="">--</option>
        {Object.values(values).map(val => (<option key={val.id} value={val.id}>{val.title}</option>))}
      </select>
    </label>
  )
}


export function AddToList({
    creationType,
    allItems,
    addedItems,
    setAddedItems
  }) {
  const [itemId, setItemId] = useState("")
  
  const addItem = (e) => {
    if (itemId) {
      const updatedAddedItems = [...addedItems ]
      const newAddedItem = {choice_thread_id: itemId, title: `Go to: ${allItems[itemId].title}`}
      updatedAddedItems.push(newAddedItem)
      setAddedItems(updatedAddedItems)
      setItemId("")
    }
  }
  
  const handleChange = (i) => (e) => {
    console.log("oh", e.target.value)
    const updatedAddedItems = [...addedItems]
    updatedAddedItems[i]["title"] = e.target.value
    setAddedItems(updatedAddedItems)
  }

  const removeItem = (i) => (e) => {
    const updatedAddedItems = [ ...addedItems ]
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