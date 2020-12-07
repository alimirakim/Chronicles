import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addChronicle, updateChronicle} from '../../actions/chronicleActions'

export default function ChronicleForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/chronicles/${id}/edit` : `/api/chronicles/create` }
        creationType="Chronicle"
        actionCreator={edit ? updateChronicle : addChronicle}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
