import React from 'react'
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams'


export function TaleDiagram({ initialSchema }) {
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

  // const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  // console.log("what is schema, onChange", onChange)

  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema)
  return (
    <div style={{ height: "50rem", outline: "3px pink solid" }} onMouseUp={release}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  )
}


export function CustomNode({ id, content, data, inputs, outputs }) {
  return (
    <div style={{ borderRadius: '1rem' }} onClick={() => data.onClickEdit(id)}>
      <div style={{ padding: '10px' }}>
        <button onClick={() => data.onClickDelete(id)}>&times;</button>
        <button onClick={() => data.onClickCreateChoice(id)}>+choice</button>
        {content}
      </div>
      {/* <div style={{ marginTop: '2rem' }}>
        {inputs.map(port => { cloneElement(port, { style: { width: '1rem', height: '1rem', borderRadius: "50% 0 0 50%", color: 'rgba(255,255,255,0.5)' } }) })}
        {outputs.map(port => { cloneElement(port, { style: { width: '1rem', height: '1rem', borderRadius: "50% 0 0 50%", color: 'rgba(255,255,255,0.5)' } }) })}
      </div> */}
    </div>
  )
}