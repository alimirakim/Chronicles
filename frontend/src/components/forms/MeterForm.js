import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addMeter, updateMeter } from '../../actions/meterActions'

export default function MeterForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/meters/${id}/edit` : `/api/chronicles/${id}/meters/create`}
      creationType="meter"
      actionCreator={edit ? updateMeter : addMeter}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
