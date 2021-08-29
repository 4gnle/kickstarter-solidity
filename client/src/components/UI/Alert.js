import React from 'react'

import './Alert.css';
import Button from './Button'

const Alert = ({alertData, cancelAlert, type, className, disabled}) => {

  return (
  <>
    <div onClick={cancelAlert} className='backdrop'>
    </div>
    <div className='alert'>
      <header>{alertData.header}</header>
      <p>{alertData.message}</p>
      <Button
        type={'button' || type}
        className={'button' || className}
        disabled={disabled}
        onClick={cancelAlert}
      >
        OK
      </Button>
    </div>
  </>
  )
}

export default Alert
