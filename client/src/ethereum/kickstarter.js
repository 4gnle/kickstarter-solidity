import web3 from './web3';

const address = "0x59B06466403D07fDd8Aa9cC52Fe213992b733Ffa"

const abi = [{"inputs":[{"internalType":"uint256","name":"minimum","type":"uint256"}],"name":"createCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"deployedCampaigns","outputs":[{"internalType":"contract Campaigns","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeployedCampaigns","outputs":[{"internalType":"contract Campaigns[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"}]

export default new web3.eth.Contract(abi, address);
