import React, {useState, useEffect} from 'react'

//CSS and UI
import './RequestsPage.css';
import Button from '../../UI/Button';

//ether
import campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

const RequestsPage = ({match}) => {

  const [address, setAddress] = useState();
  const [campaign1, setCampaign1] = useState();
  const [requests, setRequests] = useState();

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

    if(requests) {
      const breakRequests = async() => {
        const getRequests = await Promise.all(
          Array(requests).fill().map((element, index) =>{
            return campaignT.methods.requests(index).call();
          })
        )
      }
      console.log(breakRequests);
    }
  }, [address, requests, match.params.address]);



  return (
    <div className='requests-page'>
      <h1>Requests</h1>

      <Button></Button>
    </div>
  )
}

export default RequestsPage
