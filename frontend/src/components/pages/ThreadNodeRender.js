import React, { cloneElement } from 'react'


export default function ThreadNodeRender({ id, content, data, inputs, outputs }) {

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