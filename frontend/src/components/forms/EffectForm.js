import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addEffect, updateEffect} from '../../actions/effectActions'

export default function AssetForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/effects/${id}/edit` : `/api/chronicles/${id}/effects/create` }
        creationType="Effect"
        actionCreator={edit ? updateEffect : addEffect}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
