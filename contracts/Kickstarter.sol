//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Kickstarter {
    struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
    }

    address public manager;
    uint256 public minimumContribution;
    address[] public approvers;
    Request[] public requests;

constructor(uint256 minimum) {
    manager = msg.sender;
    minimumContribution = minimum;
}

modifier managerUser() {
    require(msg.sender == manager);
    _;
}

function setMinimum(uint minimum) public {
    minimumContribution = minimum;
}

function contribute(uint) public payable {
    require(msg.value >= minimumContribution, 'You need to contribute the minimum');
    approvers.push(msg.sender);
}

function getApprovers() public view returns(address[] memory) {
    return approvers;
}

function createRequest(string storage description, uint value, address payable recipient) public managerUser {
  Request memory newRequest = Request({
    description: description,
    value: value,
    recipient: recipient,
    completele: false
  })

}
