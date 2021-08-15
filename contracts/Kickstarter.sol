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
    uint public minimumContribution;
    address[] public approvers;

constructor() {
    manager = msg.sender;
}

modifier managerUser() {
    require(msg.sender == manager);
    _;
}

function setMinimum(uint memory minimum) public {
    minimumContribution = minimum;
}

function contribute(uint) public payable {
    require(msg.value > minimumContribution, '402: contribution is too low (min. 0.1)');
    approvers.push(msg.sender);
}

function getApprovers() public view returns(address[] memory) {
    return approvers;
}

}
