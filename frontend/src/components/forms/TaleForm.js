import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addTale, updateTale} from '../../actions/taleActions'

export default function TaleForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/tales/${id}/edit` : `/api/chronicles/${id}tales/create` }
        creationType="Tale"
        actionCreator={edit ? updateTale : addTale}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
