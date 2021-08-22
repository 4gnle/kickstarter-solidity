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
  })

  return (
    <div className='campaign-list'>
      <h1>Available Campaigns</h1>
      <div className='cl-addresses'>
        {campaign && campaign.map(camp => (
          <>
        <p>{camp}</p>
        <a><i></i></a>
          </>
        ))}
      </div>
    </div>
  )
}

export default CampaignList
