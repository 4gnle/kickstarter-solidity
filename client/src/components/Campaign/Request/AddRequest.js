import React, {useState, useEffect} from 'react'

//CSS and UI
import './AddRequest.css'
import Button from '../../UI/Button'

//ether
import campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

const requestInitial = {
  description: '',
  value: '',
  recipient: ''
}

const AddRequest = ({match}) => {

  const [requestData, setRequestData] = useState(requestInitial)
  const [address, setAddress] = useState();
  const [campaign1, setCampaign1] = useState();

  const {
    description,
    value,
    recipient
  } = requestData;

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

  const onChange = (e) => setRequestData({...requestData, [e.target.name]: e.target.value})

  const sendRequest = async (e) => {
    e.preventDefault();
    const account = web3.currentProvider.selectedAddress;
    let changedValue;
    changedValue = web3.utils.toWei(value, 'ether')

    await campaign1.methods.createRequest(description, changedValue, recipient).send({
      from: account,
      gas: '1000000'
    })
  }

  return (
    <div className='add-request'>
      <h1>Sending request to</h1>
      <h2 style={{fontWeight: 'lighter'}}>{address}</h2>
      <form onSubmit={e => sendRequest(e)}>
        <h3>Description</h3>
        <input
        name='description'
        value={description}
        placeholder='Name of your campaign'
        onChange={e => onChange(e)}
        ></input>

        <h3>Recipient Address</h3>
        <input
          name='recipient'
          value={recipient}
          placeholder='Paste the address'
          onChange={e => onChange(e)}
        ></input>

        <h3>Value to Request</h3>
        <input
          name='value'
          value={value}
          type='number'
          style={{textAlign: 'center'}}
          placeholder='Request value in ETH'
          onChange={e => onChange(e)}
        ></input>
        <br></br>
        <Button type='submit'>Send Request</Button>
      </form>
    </div>
  )
}

export default AddRequest;
