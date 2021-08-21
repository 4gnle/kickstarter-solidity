import React, {useState} from 'react'

//CSS and UI
import './Create-Campaign.css'
import Button from '../UI/Button'
//ETH
import kickstarter from '../../ethereum/kickstarter'
import web3 from '../../ethereum/web3'

const CreateCampaign = () => {

  const [campaignData, setCampaignData] = useState({
    value: ''
  });

  const {description, value, address} = campaignData;

  const sendCampaignData = async (e) => {
    e.preventDefault()

    const ethValue = web3.utils.toWei(value, 'ether');

    const currentAccount = await web3.eth.currentProvider.selectedAddress;

    await kickstarter.methods.createCampaign(ethValue).send({from: currentAccount, gas: '1000000'})
  }

  const onChange = (e) => {
    setCampaignData({...campaignData, [e.target.name]: e.target.value});
  }

  return (
    <div className='create-campaign'>
      <h1> Create a New Campaign</h1>
      <form onSubmit={e => sendCampaignData(e)}>

        <h3>Value</h3>
        <input
          name='value'
          value={value}
          type='number'
          placeholder='Set minmum value in ETH'
          onChange={e => onChange(e)}
        >
        </input>
        <br></br>
        <br></br>

        <Button
         type='submit'
         className='button primary'>
         Create Campaign
        </Button>
      </form>
    </div>
  )
}

export default CreateCampaign
