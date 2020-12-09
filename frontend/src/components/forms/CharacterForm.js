import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import {addCharacter, updateCharacter} from '../../actions/characterActions'

export default function CharacterForm({ id, edit }) {
  const resetUniqueContent = () => console.log("No unique content to reset")
  
  return (<>
      <CreationFormWrapper
        edit={edit}
        path={edit ? `/api/characters/${id}/edit` : `/api/chronicles/${id}/characters/create` }
        creationType="Character"
        actionCreator={edit ? updateCharacter : addCharacter}
        uniqueContent={{}}
        resetUniqueContent={resetUniqueContent}
        uniqueForm={"span"}
      />
  </>)
}
