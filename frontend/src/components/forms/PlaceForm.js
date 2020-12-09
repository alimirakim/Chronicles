import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addPlace, updatePlace} from '../../actions/placeActions'

export default function AssetForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/places/${id}/edit` : `/api/chronicles/${id}/places/create` }
        creationType="Place"
        actionCreator={edit ? updatePlace : addPlace}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
