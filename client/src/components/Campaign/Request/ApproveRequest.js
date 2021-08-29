import React, {useState, useEffect} from 'react'

//CSS and UI
import './ApproveRequest.css'
import Button from '../../UI/Button'
import Alert from '../../UI/Alert'

//Router and Redux
import {Link} from 'react-router-dom';

//ETH
import campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

const ApproveRequest = ({match, campaign1, cancelRequest, setSpinnerFalse, setSpinnerTrue}) => {

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

  const sendApproval = (e) => {
    if(!value) {
      setAlertData({message: 'Add an ID', header: 'No ID in Input'})
    }
  }

  const goBack = () => {
    cancelRequest();
    setSpinnerFalse();
  }

  const cancelAlert = () => {
    setAlert(false);
  }

  return (
    <>
    {alert ? (<Alert className="danger" cancelAlert={cancelAlert} alertData={alertData}/>) : (
      <>
      <div onClick={goBack} className='backdrop'>
      </div>
      <div className='approving'>
        <h1>Write the Request ID</h1>
        <input
          value={value}
          type='number'
          placeholder='Request ID'
          onChange={e => changeValue(e)}
        ></input>
        <Button
          onClick={e => sendApproval(e)}
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

export default ApproveRequest
