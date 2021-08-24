import React, {useEffect, useState} from 'react'

//CSS and UI
import './Campaign-Page.css'
import Button from '../UI/Button'

//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

//Components
import ContributeWindow from './ContributePage'

const CampaignPage = ({match}) => {

  const [campaignSummary, setCampaignSummary] = useState();
  const [address, setCampaignAddress] = useState();
  const [contributionInput, setContributionInput] = useState(false);
  const [campaign1, setCampaign1] = useState();

  useEffect(() => {
    if (!address) {
      const getAddress = async () => {
      await setCampaignAddress(match.params.camp);
      }
      getAddress();
    }

    const campaignT = campaign(address);
    setCampaign1(campaignT);

    console.log(campaign1);

    if (address && !campaignSummary) {
      const getSummary = async () => {
        const summary = await campaignT.methods.summary().call();
        await setCampaignSummary(summary);
      }
      getSummary();
    }
  }, [address, campaignSummary, match.params.camp]);

  const addContribution = () => {
    setContributionInput(true);
  }

  return (
    <div className='campaign-page'>
      {contributionInput &&
        <ContributeWindow minimumContribution={campaignSummary[1]}
        campaign1={campaign1}
        />}

      <h1>Campaign Address:</h1>
      <h2 style={{fontWeight: 'lighter'}}>{address}</h2>
      <div className='cp-grid unique'>
        <h3>Manager</h3>
        <p>{campaignSummary && campaignSummary[4]}</p>
      </div>
      <div className='cp-grid'>
        <h3>Number of requests so far</h3>
        <p>{campaignSummary && campaignSummary[2]}</p>
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

      <Link to={`/campaign/request/${address}`}><Button>Add Request</Button></Link>

      <Button onClick={addContribution}>Contribute</Button>
    </div>
  )
}

export default CampaignPage;
