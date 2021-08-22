import React, {useEffect, useState} from 'react'

//ETH
import kickstarter from '../../ethereum/kickstarter'
import web3 from '../../ethereum/web3'

const CampaignPage = () => {

  const [campaignManager, setCampaignManager] = useState();

  useEffect(() => {
    if (!campaignManager) {
      const getManager = async () => {
        const manager = await kickstarter.methods.manager().call();
      }
    }
  })

  return (
    <div className='campaign-page'>
      <h1>yes</h1>
    </div>
  )
}

export default CampaignPage;
