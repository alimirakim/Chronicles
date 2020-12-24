import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getEstablishedTagIds,
  getApplicableTagIds,
  filterTraitsByTags,
  rollForTrait
} from './utils'

// MY COMPONENTS
import ResultDisplay from './ResultDisplay'
import TraitField from './TraitField'

// ACTIONS
import { setAllContent } from '../../store/genActions/traitActions'
import { updateSetting, } from '../../store/genActions/settingActions'
import { setGenerator } from '../../store/genActions/genActions'

const basePath = `http://localhost:4000`

// *****************************************************************************


export default function Generator() {
  const dispatch = useDispatch()

  const categories = useSelector(state => state.charGen.categories)
  const traitTypes = useSelector(state => state.charGen.traitTypes)
  const traits = useSelector(state => state.charGen.traits)
  const tagTypes = useSelector(state => state.charGen.tagTypes)
  const tagTypeChances = useSelector(state => state.charGen.tagTypeChances)
  const genSettings = useSelector(state => state.charGen.genSettings)
  const generator = useSelector(state => state.charGen.generator)

  useEffect(() => {
    // TODO Create action creator that does both simultaneously
    if (!Object.keys(categories).length) {
      (async () => {
        const resCat = await fetch(`${basePath}/categories/all`)
        const content = await resCat.json()
        dispatch(setAllContent(content))
      })()
    }
    if (!generator.id) {
      (async () => {
        const id = 2
        const resGen = await fetch(`${basePath}/generators/chances/${id}`)
        const { generator, tagTypeChances } = await resGen.json()
        console.log("generator", generator)
        dispatch(setGenerator(generator, tagTypeChances))
      })()
    }
  }, [])


  const handleSubmit = (ev) => {
    ev.preventDefault()
    Object.values(traitTypes).forEach(traitType => {
      if (!genSettings[traitType.traitType]) {
        const traitsOfType = Object.values(traits).filter(t => traitType.traitIds.includes(t.id))

        const estTagIds = getEstablishedTagIds(genSettings, traits)
        const appTagIds = getApplicableTagIds(traitType.tagTypeIds, tagTypes, estTagIds, tagTypeChances)
        const traitsWithTags = filterTraitsByTags(traitType.tagTypeIds, appTagIds, traitsOfType, tagTypes)
        let trait = rollForTrait(traitsWithTags)

        dispatch(updateSetting({ traitType: traitType.traitType, trait: trait.id }))
      }
    })
  }

  if (!Object.keys(categories)) return null

  return (<>
    <h1>NPSEED</h1>

    <ResultDisplay />

    <form onSubmit={handleSubmit}>

      <h2>Customize Options</h2>

      <button>Submit</button>

      {Object.values(categories).map(c => (
        <>
          <h3>Category: {c.category}</h3>
          {c.traitTypeIds.map(ttid => {
            return (<TraitField
              traitType={traitTypes[ttid]}
              traitsOfType={Object.values(traits).filter(t => traitTypes[ttid].traitIds.includes(t.id))}
              tagTypeIds={traitTypes[ttid].tagTypeIds}
            />)
          })}
        </>
      ))}

    </form> </>
  )
}