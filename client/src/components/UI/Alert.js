import React from 'react'

import './Alert.css';
import Button from './Button'

const Alert = ({alertData, cancelAlert}, props) => {
  return (
  <>
    <div className='backdrop'>
    </div>
    <div className='alert'>
      <header>{alertData.header}</header>
      <p>{alertData.message}</p>
      <Button
        type={'button' || props.type}
        className={'button' || props.className}
        onClick={props.onClick}
        disabled={props.disabled}
        onClick={cancelAlert}
      >
        OK
      </Button>
    </div>
  </>
  )
}

export default Alert
