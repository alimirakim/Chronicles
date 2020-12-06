// const threads = useSelector(state => state.threads)
// const [item, setItem] = useState("")
// const [items, setItems] = useState([])
// // const [items, setItems] = useState({})

// const addItem = (e) => {
//   if (item) {
//     setItems([...items, item])
//     setItem("")
//     // const choice_title = item
//     // const choice_id = choice_title.split(" ").splice(0, 1)
//     // const newChoices = { ...items }
//     // newChoices[choice_id] = { id: choice_id, title: choice_title }
//     // setItems(newChoices)
//   }
// }

// const removeItem = (id) => (e) => {
//   setItems(items.filter(item => item.id !== id))
//   // const newChoices = { ...items }
//   // delete newChoices[id]
//   // setItems(newChoices)
// }

// return (<>
//   <SelectInput label={creation_type} handleChange={handleChange} value={item} setValue={setItem} />
//   {/* <label>Add {creation_type}
//   <select value={item} onChange={handleChange(setItem)}>
//       <option value="">--</option>
//       {Object.values(threads).filter(thread => !Object.keys(items).includes(String(thread.id))).map(thread => (
//         <option value={`${thread.id} ${thread.title}`}>{thread.title}</option>
//       ))}
//     </select>
//   </label> */}
//   <button type="button" onClick={addItem}>Add</button>

//   <h3>{creation_type} List</h3>
//   <ul>
//     {Object.values(items).map(item => (<>
//       {/* TODO Add input option to chance title, see thread preview */}
//       <button type="button">{item.title}</button>
//       <button type="button" onClick={removeItem(item.id)}>Remove</button>
//     </>
//     ))}
//   </ul>
// </>)
// }