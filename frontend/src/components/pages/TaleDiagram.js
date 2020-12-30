import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

import ThreadNodeRender from './ThreadNodeRender'

// ACTION CREATORS
import { deleteChoice } from '../../store/mainActions/choiceActions'
import { addThread, updateThread, deleteThread } from '../../store/mainActions/threadActions'


// read tale thread ids, choice ids, threads, choices
// create nodes and links with thread and choice data
// update xy on mouse-up 
// on +add thread, create new untitled thread, return and dispatch to front, listen for change to threads, then add node to schema
// on -delete thread, feed node id to function, fetch-delete thread, listen for lesser threads, then delete node from schema
// on change of selection, check for selected tale. if tale is different, create and render new schema



function createLink(choice, thread) {
  return {
    input: `outport-${choice.prev_thread_id}`,
    output: `inport-${choice.next_thread_id}`,
    label: choice.title !== thread.title ? choice.title : "",
  }
}
function createNode(thread, data) {
  return {
    id: String(thread.id),
    content: thread.title,
    coordinates: [thread.x, thread.y],
    inputs: [{ id: `inport-${thread.id}` }],
    outputs: [{ id: `outport-${thread.id}` }],
    render: ThreadNodeRender,
    data: { ...data, color: thread.color },
    // data: { onClick: deleteNode, color: th.color },
  }
}


export default function TaleDiagram() {
  const dispatch = useDispatch()
  const threads = useSelector(state => state.threads)
  const choices = useSelector(state => state.choices)
  const selectedTale = useSelector(state => state.selections.tale)
  const selectedTaleThreads = useSelector(state => state.selections.tale.thread_ids)
  const [mouseUp, setMouseUp] = useState(false)

  const [schema, { onChange, addNode, removeNode, connect }] = useSchema() // creating initial schema
  const [...taleThreads] = Object.values(threads).filter(th => th.tale_id === selectedTale.id)
  const [...taleChoices] = Object.values(choices).filter(ch => ch.tale_id === selectedTale.id)

  // Updates schema upon selecting new tale
  useEffect(() => {
    console.log("updating schema", selectedTale)
    const nodes = taleThreads.map(thread => createNode(thread, { onClick: deleteNode }))
    const links = taleChoices.map(choice => createLink(choice, threads[choice.next_thread_id]))
    onChange({ nodes, links })
  }, [selectedTale])

  // on mouse-up, post moved node's xy coords to database's thread
  useEffect(() => {
    if (mouseUp) {
      const movedNode = schema.nodes.find(n => threads[n.id].x !== n.coordinates[0] || threads[n.id].y !== n.coordinates[1])
      console.log("schema, nodes, links", schema)
      console.log("mouse up!", movedNode)
      if (movedNode) {
        (async () => {
          const res = await fetch(`/api/threads/${movedNode.id}/update-coords/x/${movedNode.coordinates[0]}/y/${movedNode.coordinates[1]}`, {
            method: "POST",
            body: JSON.stringify({ x: movedNode.coordinates[0], y: movedNode.coordinates[1] })
          })
          const updatedThread = await res.json()
          console.log("updatedThread", updatedThread)
          dispatch(updateThread({ thread: updatedThread, choices: updatedThread.choices }))
        })()
      }
      setMouseUp(false)
    }
  }, [mouseUp])

  // when a thread is deleted, the node is removed
  useEffect(() => {
    if (schema.nodes.length > taleThreads.length) {
      const missingNode = schema.nodes.find(n => !taleThreads.includes(n.id))
      console.log("missingNode", missingNode)
      removeNode(missingNode)
    }
  }, [threads, choices])

  const onMouseUp = e => setMouseUp(true)

  function deleteNode(id) {
    (async () => {
      await fetch(`/api/threads/${id}/delete`, { method: "DELETE" })
    })()
    dispatch(deleteThread(id))
  }

  const createThread = () => {
    (async () => {
      console.log("createthread click")
      const res = await fetch(`/api/tales/${selectedTale.id}/threads/create-node`, 
      { method: "POST" })
      const newThread = await res.json()
      console.log("newThread", newThread)
      dispatch(addThread({ thread: newThread, choices: [] }))
      const newNode = createNode(newThread, { onClick: deleteNode })
      console.log("pre-create schema", newNode, schema)
      addNode(newNode)
      console.log("post-create schema", schema)
    })()
  }
  console.log("selectedTale", selectedTaleThreads)
  console.log("schema", schema)

  return (<>
    <h2>{selectedTale.title}</h2>

    {selectedTale && <>
      <p><small><i>{selectedTaleThreads.length} Threads Total</i> | Created on {selectedTale.created_at.toLocaleString()}. </small></p>
      <button onClick={createThread}><i className="fas fa-plus-circle"></i>Thread</button>
    </>}


    <div style={{ height: "400px", width: "100%" }}>
      <Diagram schema={schema} onChange={onChange} onMouseUp={onMouseUp} />
    </div>
  </>)
}
