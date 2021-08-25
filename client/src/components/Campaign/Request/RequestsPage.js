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

  useEffect(() =>{
    if(match) {
      const getAddress = async () => {
      await setAddress(match.params.address);
    }
    getAddress();
    console.log(address);

    }

    if (address && !campaign1) {
      const getCampaign1 = async () => {
        await setCampaign1(campaign(address));
      }
      getCampaign1()
      console.log(campaign1);
    }
  },[address, match.params.address])

  return (
    <div className='requests-page'>
      <h1>Requests</h1>


    </div>
  )
}

export default RequestsPage
