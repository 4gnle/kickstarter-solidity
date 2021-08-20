import React, {useState} from 'react'

//CSS and UI
import './Create-Campaign.css'
import Button from '../UI/Button'
//ETH
import kickstarter from '../../ethereum/kickstarter'
import web3 from '../../ethereum/web3'

const CreateCampaign = () => {

  const [campaignData, setCampaignData] = useState({
    description: '',
    value: '',
    address: ''
  });

  const {description, value, address} = campaignData;

  const sendCampaignData = (e) => {
    e.preventDefault()
    console.log(campaignData)
  }

  const onChange = (e) => {
    setCampaignData({...campaignData, [e.target.name]: e.target.value});
  }

  return (
    <div className='create-campaign'>
      <h1> Create a New Campaign</h1>
      <form onSubmit={e => sendCampaignData(e)}>
        <h3> Description</h3>
        <input
        name='description'
        value={description}
        onChange={e => onChange(e)}
        >

        </input>

        <h3>Value</h3>
        <input
          name='value'
          value={value}
          type='number'
          onChange={e => onChange(e)}
        >

        </input>
        <h3>Address</h3>
        <input
          name='address'
          placeholder='Paste your wallet address'
          value={address}
          onChange={e => onChange(e)}
        >

        </input>
        <br></br>
        <br></br>

        <Button
         type='submit'>
         Create Campaign
        </Button>
      </form>
    </div>
  )
}

export default CreateCampaign
