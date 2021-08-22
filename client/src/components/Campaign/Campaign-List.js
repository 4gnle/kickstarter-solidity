import React, {useState, useEffect} from 'react'

import './Campaign-List.css'

//Redux and Router
import {Link} from 'react-router-dom';

//ETH
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
        {campaign && campaign.map(camp => (
          <div className='cl-address-box'>
            <p>{camp}</p>
            <Link to={`/campaign/${camp}`} style={{textDecoration: 'none'}}>
            <p style={{boxSizing:'border-box', borderRadius: '12px', padding: '10px', border:'1px solid gray', width: '60%', height: '50%', color: 'black', backgroundColor: 'lightgray'}}>See More</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default CampaignList
