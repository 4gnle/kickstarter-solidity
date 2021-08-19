const path = require ('path');
const fs = require('fs-extra');
const solc = require('solc');

//Extracting the contract file and converting to utf8
const buildFolder = path.resolve(__dirname, 'build');
fs.removeSync(buildFolder);

const kickstarterLocation = path.resolve(__dirname, 'contracts', 'Kickstarter.sol');
const source = fs.readFileSync(kickstarterLocation, 'utf8');

fs.ensureDirSync(buildFolder);

//Breaking down the contract file
const input = {
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

const contracts = output.contracts['Kickstarter.sol'];

for (let contract in contracts) {
  const contract1 = contracts[contract];

  fs.writeFileSync(
    path.resolve(buildFolder, `${contract}.json`),
    JSON.stringify(contract1, null, 2),
    "utf8"
  );
}

// // exporting the ABI interface from the contract
// module.exports.abi = output.contracts.abi
// // exporting the bytecode from the contract
// module.exports.bytecode = output.contracts.evm.bytecode.object
