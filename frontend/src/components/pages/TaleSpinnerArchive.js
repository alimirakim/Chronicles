import React, { useState, cloneElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'
import ChronicleForm from '../forms/ChronicleForm'
import ThreadForm from '../forms/ThreadForm'
import TaleForm from '../forms/TaleForm'
import ChoiceForm from '../forms/ChoiceForm'


import { addThread } from '../../store/mainActions/threadActions'
import { deleteChronicle } from '../../store/mainActions/chronicleActions'
import { deleteTale } from '../../store/mainActions/taleActions'
import { deleteThread } from '../../store/mainActions/threadActions'
import { deleteChoice } from '../../store/mainActions/choiceActions'

import YourCreations from '../YourCreations'
import {TaleDiagram, CustomNode } from '../TaleDiagram'


export default function TaleSpinner({auth, setAuth}) {
  const {tid} = useParams()
  const user = useSelector(state => state.user)
  const selected = useSelector(state => state.selections)
  const chronicles = useSelector(state => state.chronicles)
  const tales = useSelector(state => Object.values(state.tales).filter(tale => tale.chronicle_id === selected.chronicle.id))
  const threads = useSelector(state => state.threads)
  const choices = useSelector(state => state.choices)
  const [open, setOpen] = useState(false)
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [initialSchema, setInitialSchema] = useState()
  const coords = [50, 0]
console.log("threads", threads)
  const newNodes = []
  const newLinks = []
    Object.values(threads).filter(thread => thread.tale_id === Number(tid)).map((thread, i) => {
    newNodes.push({
      id: String(thread.id),
      content: String(thread.title),
      coordinates: [coords[0], coords[1]],
      inputs: [{ id: `input-${thread.id}`, alignment: 'left' }],
      outputs: [{ id: `output-${thread.id}`, alignment: 'right' }],
      // render: CustomNode,
      // data: {onClickDelete: deleteThreadNode, onClickCreateChoice: createChoice},
    })
    Object.values(thread.choices).map((choice, i) => {
      console.log("link", choice)
      newLinks.push({
        input: String(`output-${thread.id}`),
        output: String(`input-${choice.next_thread_id}`),
        label: choice.title !== threads[choice.next_thread_id].title ? choice.title : ""
      })
    })
    coords[1] += 50
    coords[0] += 50
    console.log("nodes, links", newNodes, newLinks)
  })
  coords[0] = 50
  coords[1] = 0
  if (!initialSchema) setInitialSchema(createSchema({ nodes: newNodes, links: newLinks }))

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
        // render: CustomNode,
        // data: { 
        //   onClickDelete: deleteThreadNode, 
        //   onClickCreateChoice: createChoice, 
        //   onClickEdit: editThreadNode,
        // },
      })
      Object.values(thread.choices).map((choice, i) => {
        // console.log("link", choice)
        newLinks.push({
          input: String(`output-${thread.id}`),
          output: String(`input-${choice.next_thread_id}`),
          label: choice.title !== threads[choice.next_thread_id].title ? choice.title : ""
        })
      })

      coords[0] += 50
      coords[1] += 50
      // console.log("coords", coords)
    })
    setNodes(newNodes)
    setLinks(newLinks)
    coords[0] = 50
    coords[1] = 0
    setInitialSchema(createSchema({ nodes, links }))
  }, [selected.chronicle, selected.tale, threads])




  const deleteThreadNode = async (id) => {
    const node = schema.nodes.find(node => node.id === id)
    const res = await fetch(`/api/threads/${node.id}`, { method: "DELETE" })
    if (res.ok) removeNode(node)
    else console.error("deleteThreadNode error, add to error reducer!")
  }
  const editThreadNode = (id) => {
    console.log("edit")
  }
  const createChoice = (id) => {

  }

  const addThreadNode = () => {
    const newThread = {};
    const threadNode = {
      id: newThread.id,
      content: newThread.title,
      coordinates: [0, 0],
      render: CustomNode,
      data: { onClick: deleteThreadNode },
      inputs: [{ id: `input-${newThread.id}`, alignment: 'left' }],
      outputs: [{ id: `output-${newThread.id}`, alignment: 'right' }],
    }
    addNode(threadNode)
  }

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  
  
  return (<main>
    {/* <button onClick={handleOpen}> +Thread</button>
    <ThreadForm tid={tid} open={open} handleClose={handleClose} handleChange={} /> */}
    <YourCreations
        pid={selected.tale.id}
        creationType="thread"
        creations={Object.values(threads).filter(th => user.thread_ids.includes(th.id))}
        filterBySelect={(threads, tid) => Object.values(threads).filter(thread => thread.tale_id === tid)}
        deleteActionCreator={deleteThread}
        creationForm={ThreadForm}
      />

      <YourCreations
        pid={selected.thread.id}
        creationType="choice"
        creations={Object.values(choices).filter(ch => user.choice_ids.includes(ch.id))}
        filterBySelect={(choices, thid) => Object.values(choices).filter(choice => choice.prev_thread_id === thid)}
        deleteActionCreator={deleteChoice}
        creationForm={ChoiceForm}
      />

    <h2>Your Threads</h2>
    {/* <button onClick={addNewNode}>+Thread</button> */}
    <ThreadForm id={selected.tale.id} />
    
    <TaleDiagram initialSchema={initialSchema} />
  
  </main>)
}
