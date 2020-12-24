import React from 'react'
import CreationFormWrapper from './CreationFormWrapper'
import { addCharacter, updateCharacter } from '../../store/mainActions/characterActions'

export default function CharacterForm({ id, edit, open, handleClose }) {
  const resetUniqueContent = () => console.log("No unique content to reset")

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/entities/${id}/edit` : `/api/chronicles/${id}/characters/create`}
      creationType="character"
      actionCreator={edit ? updateCharacter : addCharacter}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={"span"}
    />
  </>)
}
