import React, {useState, useEffect} from 'react'

//CSS and UI
import './ContributePage.css'
import Button from '../UI/Button'

//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

const ContributeWindow = ({match, minimumContribution, campaign1, cancelContribution}) => {

  const [value, setValue] = useState();

  const changeValue = (e) => {
    setValue(e.target.value)
    console.log(value);
  }

  const contributeEth = async (e) => {
    e.preventDefault();
    const account = web3.currentProvider.selectedAddress;

    let changedValue;
    changedValue = web3.utils.toWei(value, 'ether')

    console.log(campaign1);
    await campaign1.methods.contribute().send({
      value: changedValue,
      from: account,
      gas: '1000000'
    })
  }

  const goBack = () => {
    cancelContribution();
  }

  return (
    <>
    <div onClick={goBack} className='backdrop'>
    </div>
    <div className='contributing'>
      <h1>Amount</h1>
      <input
        value={value}
        type='number'
        max='10'
        placeholder='Amount in ETH'
        min={minimumContribution}
        onChange={e => changeValue(e)}
      ></input>
      <Button
        onClick={e => contributeEth(e)}
        className="button primary small"
      >Send Contribution</Button>
      <Button
        onClick={goBack}
        className='button danger small'>
      Cancel
      </Button>
    </div>
    </>
  )
}

export default ContributeWindow
