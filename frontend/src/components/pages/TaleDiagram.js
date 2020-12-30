import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

import ThreadNodeRender from './ThreadNodeRender'

// ACTION CREATORS
import { deleteChoice } from '../../store/mainActions/choiceActions'
import { updateThread, editThread, deleteThread } from '../../store/mainActions/threadActions'


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
    id: thread.id,
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
  const tid = useSelector(state => state.selections.tale.id)
  const dispatch = useDispatch()
  const selected = useSelector(state => state.selections)
  const threads = useSelector(state => state.threads)
  const choices = useSelector(state => state.choices)
  const taleThreads = useSelector(state => Object.values(state.threads).filter(th => th.tale_id === Number(tid)))
  const threadChoices = []
  taleThreads.forEach(th => th.choices.forEach(ch => threadChoices.push(ch.id)))
  const taleChoices = useSelector(state => Object.values(state.choices).filter(ch => threadChoices.includes(ch.id)))
  const [mouseUp, setMouseUp] = useState(false)
  
  // creates nodes and links
  const [currentSchema, setCurrentSchema] = useState("")
  const nodes = taleThreads.map(thread => createNode(thread, { onClick: deleteNode }))
  const links = taleChoices.map(choice => createLink(choice, threads[choice.next_thread_id]))
  // create diagram schema

  // when a new tale is selected, a new schema is populated
  useEffect(() => {
    const [schema, { onChange, addNode, removeNode }] = useSchema(createSchema({ nodes, links })) // creating initial schema
    const schemaContent = {schema, onChange, addNode, removeNode}
    setCurrentSchema(schemaContent)
  }, [selected.tale])
  
  // on mouse-up, post moved node's xy coords to database's thread
  useEffect(() => {
    if (mouseUp) {
      const movedNode = nodes.find(n => threads[n.id].x !== n.coordinates[0] || threads[n.id].y !== n.coordinates[1])
      console.log("schema, nodes, links", schema, nodes, links)
      console.log("mouse up!", movedNode)
      if (movedNode) {
        (async () => {
          const res = await fetch(`/api/threads/${movedNode.id}/update-coords/x/${movedNode.coordinates[0]}/y/${movedNode.coordinates[1]}`, {
            method: "POST",
            body: JSON.stringify({ x: movedNode.coordinates[0], y: movedNode.coordinates[1] })
          })
          const updatedThread = await res.json()
          console.log("updatedThread", updatedThread)
          dispatch(updateThread(updatedThread))
        })()
      }
    }
  }, [mouseUp])

  // when a thread is deleted, the node is removed
  useEffect(() => {
    if (nodes.length > taleThreads.length) {
      const missingNode = nodes.find(n => !taleThreads.includes(n.id))
      currentSchema.removeNode(missingNode)
      setMouseUp(false)
    }
  }, [threads, choices])

  const onMouseUp = e => setMouseUp(true)

  function deleteNode(id) {
    (async () => {
      await fetch(`/api/tales/${tid}/threads/${id}/delete`, {method: "DELETE" })
    })()
    dispatch(deleteThread(id))
  }

  const createThread = () => {
    (async () => {
      const res = await fetch(`/api/tales/${tid}/threads/create`, {
        method: "POST",
      })
      const newThread = await res.json()
      console.log("newThread", newThread)
      const newNode = createNode(newThread, { onClick: deleteNode })
      currentSchema.addNode(newNode)
    })()
  }

if (!currentSchema) return null;
  return (<>
    <button onClick={createThread}><i className="fas fa-plus-circle"></i>Thread</button>

    <div style={{ height: "800px", width: "100%" }}>
      <Diagram schema={currentSchema.schema} onChange={currentSchema.onChange} onMouseUp={onMouseUp} />
    </div>
  </>)
}
