import React, {useState, useEffect} from 'react'

import './Campaign-List.css'

import kickstarter from '../../ethereum/kickstarter'
import web3 from '../../ethereum/web3'

const CampaignList = () => {

  const [campaign, setCampaign] = useState();

  useEffect(() => {
    if (!campaign) {
    const getCampaigns = async () => {
    const campaigns = await kickstarter.methods.getDeployedCampaigns().call();
    setCampaign(campaigns);
  }
  getCampaigns();
  };
    console.log(campaign);

  })

  return (
    <div className='campaign-list'>
      <h1>Available Campaigns</h1>
      <div className='cl-addresses'>
        <p>{campaign}</p>
      </div>
    </div>
  )
}

export default CampaignList
