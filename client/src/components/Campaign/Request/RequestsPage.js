import React, {useState, useEffect} from 'react'

//CSS and UI
import './RequestsPage.css';
import Button from '../../UI/Button';

//ether
import campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

//Components
import AddRequest from './AddRequest';
import RequestTable from './RequestTable';
import ApproveRequest from './ApproveRequest'

//Router and Redux
import {Link} from 'react-router-dom';

const RequestsPage = ({match}) => {

  const [address, setAddress] = useState();
  const [campaign1, setCampaign1] = useState();
  const [requests, setRequests] = useState();
  const [requestsData, setRequestsData] = useState();
  const [approveRequestInput, setApproveRequestInput] = useState(false);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!address) {
      const getAddress = async () => {
      await setAddress(match.params.address);
      }
      getAddress();
    }

    const campaignT = campaign(address);
    setCampaign1(campaignT);

    if (address && !requests) {
      const getRequests = async () => {
        const request = await campaignT.methods.requestsLength().call();
        await setRequests(request);
      }
      getRequests();
    }

    if(requests && !requestsData) {
      const breakRequests = async() => {
        const getRequests = await Promise.all(
          Array(parseInt(requests)).fill().map((element, index) =>{
            return campaignT.methods.requests(index).call();
          })
        )
        setRequestsData(getRequests);
      }
      breakRequests();
    }

  }, [address, requests, requestsData, match.params.address]);

  const requestRows = () => {
    return requestsData.map((request, index) => {
      return <RequestTable
        request={request}
        index={index}
        key={index}
        />
  })};

  const requestWindow = () => {
    setApproveRequestInput(true)
  }

  const cancelRequest = () => {
    setApproveRequestInput(false);
  }

  const setSpinnerFalse = () => {
    setSpinner(false);
  }

  const setSpinnerTrue = () => {
    setSpinner(true)
  }

  return (
    <div className='requests-page'>
    <h1>Requests</h1>
    <table className='rp-table'>
    <tbody>
      <tr>
        <th>ID</th>
        <th>Description</th>
        <th>Recipient</th>
        <th>Value</th>
        <th>Approvals</th>
        <th>Completed</th>
      </tr>
      {requestsData && requestRows()}
      </tbody>
    </table>

      {approveRequestInput &&
        <ApproveRequest
        campaign1={campaign1}
        cancelRequest={cancelRequest}
        setSpinnerFalse={setSpinnerFalse}
        setSpinnerTrue={setSpinnerTrue}
        />}

      <Link to={`/campaign/${address}/requests/add`}><Button className='button primary'>Create a Request</Button></Link>

      <Button
      onClick={requestWindow}
      className='button primary' style={{backgroundColor:
      'yellow'}}>Approve a Request</Button>

    </div>
  )
}

export default RequestsPage
