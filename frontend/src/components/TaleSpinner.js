import React, { useState, cloneElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'
import ThreadForm from './forms/ThreadForm'
import CreationFormWrapper from './forms/CreationFormWrapper'
import { addThread } from '../actions/threadActions'

function StyledNode({ inputs }) {
  return (
    <div style={{ background: 'lightblue', borderRadius: '1rem' }}>
      <div style={{ padding: '10px', color: 'navy' }}>
        Navy Node
      </div>
      <div style={{ marginTop: '2rem' }}>
        {inputs.map(port => {
          cloneElement(port,
            { style: { width: '1rem', height: '1rem', background: 'navy' } }
          )
        })}
      </div>
    </div>
  )
}

export default function TaleSpinner() {
  const { tid } = useParams()
  const threads = useSelector(state => state.threads)
  const [open, setOpen] = useState(false)
  const nodes = []
  const links = []
  const coords = [50, 0]
  
  // const addThread = () => {
    
  //   // const newThread = {
  //   //   id: 
  //   // }
  // }


  // console.log("TaleDiagram threads", threads)
  Object.values(threads).filter(thread => thread.tale_id === Number(tid)).map((thread, i) => {
    nodes.push({
      id: String(thread.id),
      content: String(thread.title),
      coordinates: [coords[0], coords[1]],
      inputs: [{id: `input-${thread.id}`, alignment: 'left'}],
      outputs: [{id: `output-${thread.id}`, alignment: 'right'}],
    })
    Object.values(thread.choices).map((choice, i) => {
      // console.log("link", choice)
      links.push({
        input: String(`output-${thread.id}`),
        output: String(`input-${choice.choice_thread_id}`),
        label: choice.title !== threads[choice.choice_thread_id].title ? choice.title : ""
      })
    })
    coords[1] += 50
    coords[0] += 50
    // console.log("coords", coords)
  })

  console.log("nodes, links", tid, nodes, links)
  const initialSchema = createSchema({ nodes, links })


  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  return (<>

    {/* <button onClick={handleOpen}> +Thread</button>
    <ThreadForm tid={tid} open={open} handleClose={handleClose} handleChange={} /> */}

    <h2>Your Threads</h2>
    <CreationFormWrapper
        creationType="Thread"
        uniqueInputs={ThreadForm}
        path={`/api/tales/${tid}/threads/create`}
        actionCreator={addThread}
        // setActive={setActiveThread}
      />
      
    <TaleDiagram initialSchema={initialSchema} />
  </>)
}


function TaleDiagram({ initialSchema }) {
  
  const release = async (e) => {
    // const res = await fetch(`/api/threads/${}/edit-xy`, {
    //   method: "PATCH",
    //   body: JSON.stringify({x: e.screenX, y: e.screenY})
    // })
    console.log("RLEASED", e.screenX, e.screenY, e.target)
    console.log("target value", e.target.value)
    console.log("target...", e.target.key, e.target.id)
  }

  const [schema, { onChange }] = useSchema(initialSchema)
  // console.log("what is schema, onChange", schema, onChange)

  return (
    <div style={{ height: "50rem", outline: "3px purple solid" }} onMouseUp={release}>
        <Diagram schema={schema} onChange={onChange} />
    </div>
  )
}