import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addPlace, updatePlace } from '../../actions/placeActions'

export default function AssetForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/chronicles/${id}/places/create`}
      creationType="place"
      actionCreator={edit ? updatePlace : addPlace}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
