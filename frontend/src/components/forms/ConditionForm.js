import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addCondition, updateCondition } from '../../store/mainActions/conditionActions'

export default function ConditionForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/chronicles/${id}/conditions/create`}
      creationType="condition"
      actionCreator={edit ? updateCondition : addCondition}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
