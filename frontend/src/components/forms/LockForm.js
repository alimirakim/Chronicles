import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addLock, updateLock} from '../../actions/lockActions'

export default function AssetForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/locks/${id}/edit` : `/api/chronicles/${id}/locks/create` }
        creationType="Lock"
        actionCreator={edit ? updateLock : addLock}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
