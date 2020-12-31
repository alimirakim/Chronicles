import React, { useState } from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import CreationFormWrapper from './CreationFormWrapper'
import { addAsset, updateAsset } from '../../store/mainActions/assetActions'


export default function AssetForm({ id, edit, open, handleClose }) {
  const [assetValue, setAssetValue] = useState(edit ? edit.value : 1)
  const [assetMax, setAssetMax] = useState(edit ? edit.max : 100)
  const [allowedMultiple, setAllowedMultiple] = useState(edit ? edit.is_allowed_multiple : true)
  const handleChangeValue = (e) => setAssetValue(e.target.value)
  const handleChangeMax = (e) => setAssetMax(e.target.value)
  const handleChangeMultiple = (e) => setAllowedMultiple(prev => !prev)

  const resetUniqueContent = () => {
    setAssetValue(1)
    setAssetMax(100)
  }

  const uniqueForm = () => (<>
    <div className="lo-grida">
      <label className="lo-txt-con-sm">Asset Value
      <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">What is the default, or average, worth of this asset in the market?</section>
        <input type="number" value={assetValue} onChange={handleChangeValue} />
      </label>

      <label className="lo-txt-con-sm">Max Quantity
      <i className="tip fas fa-question-circle"></i>
        <section className="tip-info">How many of this asset can be stacked together at maximum?</section>
        <input type="number" value={assetMax} onChange={handleChangeMax} />
      </label>

      <label className="lo-txt-con-sm">
        
        
        <FormControlLabel control={
        <Switch
          checked={allowedMultiple}
          onChange={handleChangeMultiple}
          size="large"
        />
        }
          label={<><i className="tip fas fa-question-circle">
          <section className="tip-info">Can a character hold more than one stack of this item at a time? For example, if you have a 'wood' asset that can stack to a max of 10 woods, can they get another stack and have two bundles of 10?</section></i>
          is allowed multiple?</>}
          labelPlacement="top"
        />
      </label>
    </div>
  </>)

  return (<>
    <CreationFormWrapper
      open={open}
      handleClose={handleClose}
      edit={edit}
      path={edit ? `/api/assets/${id}/edit` : `/api/assets/create`}
      creationType="asset"
      actionCreator={edit ? updateAsset : addAsset}
      uniqueContent={{}}
      resetUniqueContent={resetUniqueContent}
      uniqueForm={uniqueForm}
    />
  </>)
}
