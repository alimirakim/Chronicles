import React from 'react'
import useFileHandlers from './hooks/useFileHandlers'

function Input(props) {
  return (
    <input
      type="file" accept="image/*" name="user_file" multiple {...props}
    />
  )
}

export default function FileInput() {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useFileHandlers()

  return (
    <div className="fil-con">
      <form className="fil" onSubmit={onSubmit}>

        {status === 'FILES_UPLOADED' && (
          <div className="success-container">
            <div>
              <h2>Congratulations!</h2>
              <small>You uploaded your files. Get some rest.</small>
            </div>
          </div>
        )}

        <div>
          <Input onChange={onChange} />
          <button type="submit">Submit</button>
        </div>

        <div>
          {files.map(({ file, src, id }, index) => (
            <div
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className="thumbnail-wrapper"
            >
              <img className="thumbnail" src={src} alt="" />
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>

      </form>
    </div>
  )
}
