import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addRank, updateRank} from '../../actions/rankActions'

export default function RankForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/ranks/${id}/edit` : `/api/chronicles/${id}/create` }
        creationType="Rank"
        actionCreator={edit ? updateRank : addRank}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
