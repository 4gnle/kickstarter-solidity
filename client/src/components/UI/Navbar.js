import React from 'react'
import {useHistory} from 'react-router-dom'

//CSS and UI
import './Navbar.css'
import Button from './Button';

const Navbar = () => {

  const history = useHistory();

  const goBack = () => {
    history.goBack()
  }

  return (
    <div onClick={goBack} className='navbar'>
      <Button
        className='button small'
      >{'< Go Back'}</Button>
    </div>
  )
}

export default Navbar;
