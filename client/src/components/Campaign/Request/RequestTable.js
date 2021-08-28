import React, {useState, useEffect} from 'react'

import './RequestTable.css'

//ether
import campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'

const RequestTable = ({index, request}) => {

  const [description, setDescription] = useState();
  const [value, setValue] = useState();
  const [recipient, setRecipient] = useState();
  const [complete, setComplete] = useState();
  const [approvals, setApprovals] = useState();

  useEffect(() => {
    setDescription(request.description)
    setValue(web3.utils.fromWei(request.value, 'ether'))
    setRecipient(request.recipient)
    setComplete(request.complete)
    setApprovals(request.approvalCount)
  })

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{description}</td>
        <td>{recipient}</td>
        <td>{value} ETH</td>
        <td>{approvals}</td>
        <td>{complete === false ? 'No' : 'Yes'}</td>
      </tr>
    </>
  )
}

export default RequestTable
