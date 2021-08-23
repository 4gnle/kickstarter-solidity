import web3 from './web3';

const compiledKickstarter = require('./build/Kickstarter.json');

const kickstart = new web3.eth.Contract(
compiledKickstarter.abi,
'0x516a7b440C2668B2E6f488126C21B47ccA54ED20')

export default kickstart;
