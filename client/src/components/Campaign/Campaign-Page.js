import React, {useEffect, useState} from 'react'

const CampaignPage = () => {

  const [campaignManager, setCampaignManager] = useState();

  useEffect(() => {
    if (!campaignManager) {

    }
    const manager = await campaign.methods.manager().call();

  })

  return (
    <div className='campaign-page'>


    </div>
  )
}

export default CampaignPage
