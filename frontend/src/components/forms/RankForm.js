import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addMeter, updateMeter} from '../../actions/meterActions'

export default function MeterForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/meters/${id}/edit` : `/api/chronicles/${id}/create` }
        creationType="Meter"
        actionCreator={edit ? updateMeter : addMeter}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
