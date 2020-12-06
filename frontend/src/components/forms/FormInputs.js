import React, {useState} from 'react'


export function TextInput({ handleChange, label, value, setValue }) {
  return (
    <label>{label}
      <input type="text" onChange={handleChange(setValue)} value={value} required />
    </label>
  )
}


export function TextAreaInput({ handleChange, label, value, setValue }) {
  return (
    <label>{label}
      <textarea onChange={handleChange(setValue)} value={value} required />
    </label>
  )
}


export function SelectInput({ handleChange, label, values, value, setValue }) {
  return (
    <label>{label}
      <select value={value} onChange={handleChange(setValue)}>
        <option value="">--</option>
        {Object.keys(values).map(value => (<option value={value.id}>{value.title}</option>))}
      </select>
    </label>
  )
}


export function AddToList({ creationType, handleChange, allItems, chosenItemIds, setChosenItemIds }) {
  const [item_id, setItemId] = useState("")
  
  const addItem = (e) => {
    if (item_id) {
      setChosenItemIds([...chosenItemIds, item_id])
      setItemId("")
    }
  }
  
  const removeItem = (id) => (e) => {
    setChosenItemIds(chosenItemIds.filter(cid => cid !== id))
  }
  
  return (<>
    <h3>+{creationType}</h3>
    <SelectInput label={creationType} handleChange={handleChange} values={allItems} value={item_id} setValue={setItemId} />
    <button type="button" onClick={addItem}>Add</button>

    <h4>{creationType} List</h4>
    <ul>
      {Object.values(chosenItemIds).map(cid => (<>
        <button type="button">{allItems[cid].title}</button>
        <button type="button" onClick={removeItem(cid.id)}>Remove</button>
      </>
      ))}
    </ul>
  </>)
}