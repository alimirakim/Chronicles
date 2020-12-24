import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addAsset, updateAsset } from '../../store/mainActions/assetActions'

export default function AssetForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/chronicles/${id}/assets/create`}
      creationType="asset"
      actionCreator={edit ? updateAsset : addAsset}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
