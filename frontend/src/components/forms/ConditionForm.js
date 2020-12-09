import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addCondition, updateCondition} from '../../actions/conditionActions'

export default function ChronicleForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/conditions/${id}/edit` : `/api/chronicles/${id}/create` }
        creationType="Condition"
        actionCreator={edit ? updateCondition : addCondition}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
