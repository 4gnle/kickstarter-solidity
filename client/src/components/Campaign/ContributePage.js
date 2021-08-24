import React, {useState, useEffect} from 'react'

//CSS and UI
import './ContributePage.css'
import Button from '../UI/Button'

//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

const ContributeWindow = ({match, minimumContribution, campaign1}) => {

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

  return (
    <div>
      <input
        value={value}
        type='number'
        max='10'
        min={minimumContribution}
        onChange={e => changeValue(e)}
      ></input>
      <Button
        onClick={e => contributeEth(e)}
      >Contribute</Button>
    </div>
  )
}

export default ContributeWindow
