import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addAsset, updateAsset} from '../../actions/assetActions'

export default function AssetForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/entities/${id}/edit` : `/api/chronicles/${id}/assets/create` }
        creationType="Asset"
        actionCreator={edit ? updateAsset : addAsset}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
