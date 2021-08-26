import React from 'react'

import './Alert.css';
import Button from './Button'

const Alert = ({alertData, cancelAlert}) => {
  return (
  <>
    <div className='backdrop'>
    </div>
    <div className='alert'>
      <header>{alertData.header}</header>
      <p>{alertData.message}</p>
      <Button
        className='button primary'
        onClick={cancelAlert}
      >
        OK
      </Button>
    </div>
  </>
  )
}

export default Alert
