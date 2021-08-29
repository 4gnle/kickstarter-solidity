import React, {useState, useEffect} from 'react'

//CSS and UI
import './ContributePage.css'
import Button from '../UI/Button'
import Alert from '../UI/Alert'

//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../ethereum/campaign'
import web3 from '../../ethereum/web3'

const ContributeWindow = ({match, minimumContribution, campaign1, cancelContribution, setSpinnerFalse, setSpinnerTrue}) => {

  const [value, setValue] = useState();
  const [alertData, setAlertData] = useState({
    message: '',
    header: ''
  });
  const [alert, setAlert] = useState(false);

  const changeValue = (e) => {
    setValue(e.target.value)
    console.log(value);
  }

  const refreshPage = () => {
     window.location.reload();
  }

  const contributeEth = async (e) => {
    e.preventDefault();
    const account = web3.currentProvider.selectedAddress;

    if(value >= minimumContribution) {
      cancelContribution();
      setSpinnerTrue();

      try {
        await campaign1.methods.contribute().send({
          value: web3.utils.toWei(value, 'ether'),
          from: account,
          gas: '1000000'
        });

        setSpinnerFalse();
        refreshPage();

      } catch (err) {
        setSpinnerFalse();
        setAlertData({message:`${err.message}`,
        header: 'Error'});
        setAlert(true);
      }
    } else {
      setAlertData({message: `Minimum Contribution is ${minimumContribution}`,
      header: 'Wrong Value'});
      setAlert(true);
    }
  }

  const goBack = () => {
    cancelContribution();
    setSpinnerFalse();
  }

  const cancelAlert = () => {
    setAlert(false)
  }

  return (
    <>
    {alert ? (<Alert cancelAlert={cancelAlert} alertData={alertData}/>) : (
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
        >Send</Button>
        <Button
          onClick={goBack}
          className='button danger small'>
        Cancel
        </Button>
      </div>
      </>
    )}
    </>
  )
}

export default ContributeWindow
