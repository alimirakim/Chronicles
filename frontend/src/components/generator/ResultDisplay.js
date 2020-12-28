import React from 'react'
import { useSelector } from 'react-redux'

import TagList from './TagList'


export default function ResultDisplay() {
  const categories = useSelector(state => state.charGen.categories)
  const traitTypes = useSelector(state => state.charGen.traitTypes)
  const traits = useSelector(state => state.charGen.traits)
  const settings = useSelector(state => state.charGen.setting)

  if (!Object.keys(categories)) return null

  return (
    <article id="npc-display">
      <h2>Character Results</h2>
      {Object.values(categories).map(c => (<>
        <h3 key={c.id}>{c.category.toUpperCase()}</h3>
        <dl className="dis">
          {c.traitTypeIds.map(ttid => {
            const setting = settings[traitTypes[ttid].traitType]
            let displaySetting
            let tagIds = []
            if (typeof setting === "number") {
              displaySetting = traits[setting].trait
              tagIds = traits[setting].tagIds
            } else if (setting && typeof setting === "string") {
              displaySetting = setting
              tagIds = "custom"
            }
            return (<div>
              <dt key={ttid}>{traitTypes[ttid].traitType}:&nbsp;&nbsp;</dt>
              <dd>
                {displaySetting}
                <TagList tagIds={tagIds} />
              </dd>
            </div>)
          })}
        </dl>
      </>))}
    </article>
  )
}