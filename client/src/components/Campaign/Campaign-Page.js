import React, {useEffect, useState} from 'react'

//CSS and UI
import './Campaign-Page.css'
import Button from '../UI/Button'
import Spinner from '../UI/Spinner'
//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

//Components
import ContributeWindow from './ContributePage';

const CampaignPage = ({match}) => {

  const [campaignSummary, setCampaignSummary] = useState();
  const [address, setCampaignAddress] = useState();
  const [contributionInput, setContributionInput] = useState(false);
  const [campaign1, setCampaign1] = useState();
  const [spinner, setSpinner] = useState(false);

  const [minimumContribution, setMinimumContribution] = useState();
  const [manager, setManager] = useState();
  const [approvers, setApprovers] = useState();
  const [requests, setRequests] = useState();
  const [balance, setBalance] = useState();

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

    if(campaignSummary) {
      setMinimumContribution(web3.utils.fromWei(campaignSummary[1], 'ether'));
      setManager(campaignSummary[4])
      setApprovers(campaignSummary[3]);
      setBalance(web3.utils.fromWei(campaignSummary[0], 'ether'))
      setRequests(campaignSummary[2]);
    }

  }, [address, campaignSummary, match.params.camp]);



  const addContribution = () => {
    setContributionInput(true);
  }

  const cancelContribution = () => {
    setContributionInput(false);
  }

  const setSpinnerFalse = () => {
    setSpinner(false);
  }

  return (
    <div className='campaign-page'>
      {contributionInput &&
        <ContributeWindow minimumContribution={minimumContribution}
        campaign1={campaign1}
        cancelContribution={cancelContribution}
        setSpinnerFalse={setSpinnerFalse}
        />}

      {spinner &&
        <Spinner/>}

      <h1>Campaign Address:</h1>
      <h2 style={{fontWeight: 'lighter'}}>{address}</h2>
      <div className='cp-boxes1'>
        <div className='cp-grid'>
          <h3>Manager</h3>
          <p>{campaignSummary && manager}</p>
        </div>
        <div className='cp-grid'>
          <h3>Number of requests so far</h3>
          <p>{campaignSummary && requests}</p>
        </div>
      </div>
      <div className='cp-boxes'>
        <div className='cp-grid'>
          <h3># of Approvers</h3>
          <p>{campaignSummary && approvers} approvers</p>
        </div>
        <div className='cp-grid'>
          <h3>Minimum Contribution</h3>
          <p>{campaignSummary && minimumContribution} ETH</p>
          </div>
        <div className='cp-grid'>
          <h3>Total Balance</h3>
          <p>{campaignSummary && balance} ETH</p>
        </div>
      </div>

      <Link to={`/campaign/${address}/requests`}><Button>See Requests</Button></Link>

      <Button onClick={addContribution}>Contribute</Button>
    </div>
  )
}

export default CampaignPage;
