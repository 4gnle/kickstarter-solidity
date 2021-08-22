import React from 'react'

//Redux and router

import './Kickstarter-Main.css'
import CampaignList from './Campaign/Campaign-List'
import CreateCampaign from './Campaign/Create-Campaign'

const KickstarterMain = () => {
  return (
    <div className="main-page">
        <CampaignList/>
        <CreateCampaign/>
    </div>
  )
}

export default KickstarterMain
