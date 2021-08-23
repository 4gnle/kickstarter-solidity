import React, {useEffect, useState} from 'react'

//CSS and UI
import './Campaign-Page.css'
import Button from '../UI/Button'

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

const CampaignPage = ({match}) => {

  const [campaignSummary, setCampaignSummary] = useState();
  const [address, setCampaignAddress] = useState();

  useEffect(() => {
    if (!address) {
      const getAddress = async () => {
      await setCampaignAddress(match.params.camp);
      }
      getAddress();
    }

    const campaign1 = campaign(address);

    if (address && !campaignSummary) {
      const getSummary = async () => {
        const summary = await campaign1.methods.summary().call();
        await setCampaignSummary(summary);
      }
      getSummary();
    }
  }, [address, campaignSummary, match.params.camp]);

  return (
    <div className='campaign-page'>
      <h1>Campaign Address:</h1>
      {address}
      <div className='cp-grid unique'>
        <h3>Manager</h3>
        <p>{campaignSummary && campaignSummary[4]}</p>
      </div>
      <div className='cp-boxes'>
        <div className='cp-grid'>
          <h3># of Approvers</h3>
          <p>{campaignSummary && campaignSummary[3]} approvers</p>
        </div>
        <div className='cp-grid'>
          <h3>Minimum Contribution</h3>
          <p>{campaignSummary && web3.utils.fromWei(campaignSummary[1], 'ether')} ETH</p>
          </div>
        <div className='cp-grid'>
          <h3>Total Balance</h3>
          <p>{campaignSummary && web3.utils.fromWei(campaignSummary[0], 'ether')} ETH</p>
        </div>
      </div>

      <Button>Edit Campaign</Button>
    </div>
  )
}

export default CampaignPage;
