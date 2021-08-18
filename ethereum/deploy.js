const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile')

const provider = new HDWalletProvider({
  mnemonic: 'rose turn hybrid ordinary poverty camera diesel candy ability rain state dutch',
  providerOrUrl: 'https://ropsten.infura.io/v3/a4f6a648506a46689f58f1254a602301'
})

const web3 = new Web3(provider);

const deploy = async () => {

const accounts = await web3.eth.getAccounts();

console.log('Contract deploying to', accounts[0])

const deployedAccount = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode})
    .send({from: accounts[0], gas: '1000000'})
    console.log(abi)
    console.log('Contract deployed to', deployedAccount.options.address)
}

deploy()
