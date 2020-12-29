import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'

import { updateThread, editThread, deleteThread } from '../../store/mainActions/threadActions'
import { SelectInputImages } from '../forms/FormInputs'

export default function TaleSpinner() {
  const { tid } = useParams()
  const dispatch = useDispatch()
  const threads = useSelector(state => state.threads)
  const taleThreads = useSelector(state => Object.values(state.threads).filter(th => th.tale_id === Number(tid)))
  const threadChoices = []
  taleThreads.forEach(th => th.choices.forEach(ch => threadChoices.push(ch.id)))
  // const choices = useSelector(state.choices)
  const taleChoices = useSelector(state => Object.values(state.choices).filter(ch => threadChoices.includes(ch.id)))
  const [mouseUp, setMouseUp] = useState(false)

  const [nodes, setNodes] = useState(taleThreads.map(th => ({
    id: th.id,
    content: th.title,
    coordinates: [th.x, th.y],
    inputs: [{ id: `inport-${th.id}` }],
    outputs: [{ id: `outport-${th.id}` }],
    render: CustomRender,
    data: { onClick: deleteNode, color: th.color },
  })))

  const [links, setLinks] = useState(taleChoices.map(ch => ({
    input: `outport-${ch.prev_thread_id}`,
    output: `inport-${ch.next_thread_id}`,
    label: ch.title !== threads[ch.next_thread_id].title ? ch.title : "",
  })))

  // create diagram schema
  const [initialSchema, setInitialSchema] = useState(createSchema({ nodes, links }))
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  
  // TODO How to track 'one level down' with useEffect??
  useEffect(() => {
    console.log("nodes, links", nodes, links)
    if (mouseUp) {
      const movedNode = nodes.find(node => threads[node.id].x !== node.coordinates[0] || threads[node.id].y !== node.coordinates[1])
      console.log("mouse up!", movedNode)
      if (movedNode) {
        (async () => {
          const res = await fetch(`/api/threads/${movedNode.id}/update-coords/x/${movedNode.coordinates[0]}/y/${movedNode.coordinates[1]}`, {
            method: "POST",
          })
          const updatedThread = await res.json()
          console.log("updatedThread", updatedThread)
          dispatch(updateThread(updatedThread))
        })()
      }
      setMouseUp(false)
    }
  }, [mouseUp, nodes, links])

  

  
  const onMouseUp = e => setMouseUp(true)

  const deleteNode = (id) => {
    const badNode = schema.nodes.find(node => node.id === id)
      (async () => {
        await fetch(`/api/tales/${tid}/threads/${id}/delete`, {
          method: "DELETE",
        })
      })()
    removeNode(badNode)
    setNodes(nodes.filter(node => node.id !== id))
    dispatch(deleteThread(id))
  }

  const createNode = () => {
    (async () => {
      const res = await fetch(`/api/tales/${tid}/threads/create`, {
        method: "POST",
      })
      const newThread = await res.json()
      const newNode = {
        id: newThread.id,
        content: newThread.title,
        coordinates: [newThread.x, newThread.y],
        inputs: [{ id: `inport-${newThread.id}` }],
        outputs: [{ id: `outport-${newThread.id}` }],
        render: CustomRender,
        data: { onClick: deleteNode, color: newThread.color },
      }
      addNode(newNode)
      setNodes([...nodes, newNode])
    })()
  }


  return (<>
    <button onClick={createNode}><i className="fas fa-plus-circle"></i> Thread</button>
    <div style={{ height: "800px", width: "100%" }}>
      <Diagram schema={schema} onChange={onChange} onMouseUp={onMouseUp} />
    </div>
  </>)
}

function CustomRender({ id, content, data, inputs, outputs }) {

  return (
    <div style={{ background: data.color }}>
      <div>
        <button onClick={() => data.onClick(id)} type="button">
          <i className="fas fa-minus-circle"></i>Delete
        </button>
        <div role="button">
          {content}
        </div>
        <div>
          {inputs.map(port => cloneElement(port))}
          {outputs.map(port => cloneElement(port))}
        </div>
      </div>
    </div>
  )
}