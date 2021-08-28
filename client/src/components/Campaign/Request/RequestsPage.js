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

//Router and Redux
import {Link} from 'react-router-dom';

const RequestsPage = ({match}) => {

  const [address, setAddress] = useState();
  const [campaign1, setCampaign1] = useState();
  const [requests, setRequests] = useState();
  const [requestsData, setRequestsData] = useState();

  const [description, setDescription] = useState();
  const [value, setValue] = useState();
  const [recipient, setRecipient] = useState();
  const [complete, setComplete] = useState();
  const [approvals, setApprovals] = useState();

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

    if(requestsData) {
      setDescription(requestsData[0].description)
      setValue(web3.utils.fromWei(requestsData[0].value, 'ether'))
      setRecipient(requestsData[0].recipient)
      setComplete(requestsData[0].complete)
      setApprovals(requestsData[0].approvalCount)
    }

  }, [address, requests, requestsData, match.params.address]);

  console.log(value);

  const requestRows = () => {
    return requestsData.map((request, index) => {
      return <RequestTable
        recipient={request.recipient}
        description={request.description}
        value={request.value}
        approvals={request.approvalCount}
        complete={request.complete}
        index={index}
        key={index}
        />
  })};

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


      <Link to={`/campaign/${address}/requests/add`}><Button className='button primary'>Create a Request</Button></Link>

    </div>
  )
}

export default RequestsPage
