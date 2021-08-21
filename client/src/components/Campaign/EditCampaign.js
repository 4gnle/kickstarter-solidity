import React from 'react'

const EditCampaign = () => {
  return (
    <div className='edit-campaign'>
      <form>
        <h3>Address</h3>
        <input
          name='address'
          placeholder='Paste the wallet address'
          value={address}
          onChange={e => onChange(e)}
        >
        </input>
        <h3> Description</h3>
        <input
        name='description'
        value={description}
        placeholder='Name of your campaign'
        onChange={e => onChange(e)}
        >
            </input>
      </form>
    </div>
  )
}

export default EditCampaign
