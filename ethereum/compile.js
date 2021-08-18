const path = require ('path');
const fs = require('fs');
const solc = require('solc');

//Extracting the contract file and converting to utf8
const kickstarterLocation = path.resolve(__dirname, 'contracts', 'Kickstarter.sol');
const source = fs.readFileSync(kickstarterLocation, 'utf8')

//Breaking down the contract file
var input = {
   language: "Solidity",
   sources: {
    'Kickstarter.sol': {
       content: source
     }
   },
   settings: {
     outputSelection: {
       "*": {
         "*": ['*']
       }
     }
   }
 }

 // output contains the JSON for the contract
var output = JSON.parse(solc.compile(JSON.stringify(input)));

for (var Kickstarter in output.contracts['Kickstarter.sol']) {
  // console.log(
  //   Inbox +
  //     ': ' +
  //     output.contracts['Inbox.sol'][Inbox].evm.bytecode.object
  // );
}

// exporting the ABI interface from the contract
module.exports.abi = output.contracts['Kickstarter.sol'][Kickstarter].abi
// exporting the bytecode from the contract
module.exports.bytecode =       output.contracts['Kickstarter.sol'][Kickstarter].evm.bytecode.object
