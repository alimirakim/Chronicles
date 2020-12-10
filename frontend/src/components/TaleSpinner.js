import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'
import ChronicleForm from './forms/ChronicleForm'
import ThreadForm from './forms/ThreadForm'
import TaleForm from './forms/TaleForm'
import { addThread } from '../actions/threadActions'
import { deleteChronicle } from '../actions/chronicleActions'
import { deleteTale } from '../actions/taleActions'
import YourCreations from './YourCreations'


function CustomNode({ id, content, data, inputs, outputs }) {
  return (
    <div style={{ background: data.color, borderRadius: '1rem' }} onClick={() => data.onClickEdit(id)}>
      <div style={{ padding: '10px' }}>
        <button onClick={() => data.onClickDelete(id)}>x</button>
        <button onClick={() => data.onClickCreateChoice(id)}>x</button>
        {content}
      </div>
      <div style={{ marginTop: '2rem' }}>
        {inputs.map(port => { cloneElement(port, { style: { width: '1rem', height: '1rem', borderRadius: "50% 0 0 50%", color: 'rgba(255,255,255,0.5)' } }) })}
        {outputs.map(port => { cloneElement(port, { style: { width: '1rem', height: '1rem', borderRadius: "50% 0 0 50%", color: 'rgba(255,255,255,0.5)' } }) })}
      </div>
    </div>
  )
}

export default function TaleSpinner() {
  const selected = useSelector(state => state.selections)
  const chronicles = useSelector(state => state.chronicles)
  const tales = useSelector(state => Object.values(state.tales).filter(tale => tale.chronicle_id === selected.chronicle.id))
  const threads = useSelector(state => state.threads)
  const [open, setOpen] = useState(false)
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const coords = [50, 0]

  useEffect(() => {
    console.log("hello", nodes, links)
    const newNodes = []
    const newLinks = []
    Object.values(threads).filter(thread => thread.tale_id === Number(selected.tale.id)).map((thread, i) => {
      newNodes.push({
        id: String(thread.id),
        content: String(thread.title),
        coordinates: [coords[0], coords[1]],
        inputs: [{ id: `input-${thread.id}`, alignment: 'left' }],
        outputs: [{ id: `output-${thread.id}`, alignment: 'right' }],
      })
      Object.values(thread.choices).map((choice, i) => {
        // console.log("link", choice)
        newLinks.push({
          input: String(`output-${thread.id}`),
          output: String(`input-${choice.choice_thread_id}`),
          label: choice.title !== threads[choice.choice_thread_id].title ? choice.title : ""
        })
      })
      coords[1] += 50
      coords[0] += 50
      // console.log("coords", coords)
    })
    setNodes(newNodes)
    setLinks(newLinks)
    coords[0] = 50
    coords[1] = 0
  }, [selected.tale])


  // const deleteThreadNode = (id) => {
  //   const node = schema.nodes.find(node => node.id === id)
  //   removeNode(nodeToRemove)
  // }
  // const editThreadNode = (id) => {

  // }
  // const createChoiceThreadNode = (id) => {

  // }

  // const addThreadNode = () => {
  //   const newThread = await fetch()
  //   const threadNode = {
  //     id: newThread.id,
  //     content: newThread.title,
  //     coordinates: [0, 0],
  //     render: CustomNode,
  //     data: { onClick: deleteThreadNode },
  //     inputs: [{ id: `input-${newThread.id}`, alignment: 'left' }],
  //     outputs: [{ id: `output-${newThread.id}`, alignment: 'right' }],
  //   }
  //   addNode(threadNode)
  // }


  // console.log("TaleDiagram threads", threads)
  const newNodes = []
  const newLinks = []
  Object.values(threads).filter(thread => thread.tale_id === Number(selected.tale.id)).map((thread, i) => {
    newNodes.push({
      id: String(thread.id),
      content: String(thread.title),
      coordinates: [coords[0], coords[1]],
      inputs: [{ id: `input-${thread.id}`, alignment: 'left' }],
      outputs: [{ id: `output-${thread.id}`, alignment: 'right' }],
    })
    Object.values(thread.choices).map((choice, i) => {
      // console.log("link", choice)
      newLinks.push({
        input: String(`output-${thread.id}`),
        output: String(`input-${choice.choice_thread_id}`),
        label: choice.title !== threads[choice.choice_thread_id].title ? choice.title : ""
      })
    })
    coords[1] += 50
    coords[0] += 50
    // console.log("coords", coords)
  })
  
  // console.log("nodes, links", nodes, links)
  const initialSchema = createSchema({ nodes, links })
  
  
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  if (!nodes.length) return null
  return (<>
    <p>{nodes[0].content}</p>
    {/* <button onClick={handleOpen}> +Thread</button>
    <ThreadForm tid={tid} open={open} handleClose={handleClose} handleChange={} /> */}

    <YourCreations
      creationType="Chronicle"
      active={selected.chronicle}
      creations={chronicles}
      creationForm={ChronicleForm}
      deleteActionCreator={deleteChronicle}
    />

    <YourCreations
      pid={selected.chronicle.id}
      creationType="Tale"
      creations={tales}
      active={selected.tale}
      filterBySelect={(tales, cid) => Object.values(tales).filter(tale => tale.chronicle_id === cid)}
      deleteActionCreator={deleteTale}
      creationForm={TaleForm}
    />

    <h2>Your Threads</h2>

    <div style={{ height: "50rem", outline: "3px pink solid" }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
    {/* <TaleDiagram initialSchema={initialSchema} /> */}
  </>)
}


function TaleDiagram({ initialSchema }) {
  // console.log
  const release = async (e) => {
    // const res = await fetch(`/api/threads/${}/edit-xy`, {
    //   method: "PATCH",
    //   body: JSON.stringify({x: e.screenX, y: e.screenY})
    // })
    console.log("RLEASED", e.screenX, e.screenY, e.target)
    console.log("target value", e.target.value)
    console.log("target...", e.target.key, e.target.id)
  }

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  // console.log("what is schema, onChange", onChange)

  return (
    <div style={{ height: "50rem", outline: "3px pink solid" }} onMouseUp={release}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  )
}