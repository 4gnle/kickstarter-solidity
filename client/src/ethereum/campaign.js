import web3 from './web3';

const compiledCampaigns = require('./build/Campaigns.json');

const campaign = (address) => new web3.eth.Contract(
compiledCampaigns.abi,
address)

export default campaign;
