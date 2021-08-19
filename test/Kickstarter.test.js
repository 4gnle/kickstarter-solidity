const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider({
  "total_accounts:":20,
  "debug": true,
  "gasLimit": 10000000
}));

const compiledKickstarter = require('../ethereum/build/Kickstarter.json');
const compiledCampaigns = require('../ethereum/build/Campaigns.json');

let accounts;
let kickstart;
let campaignAddress;
let campaign;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();

  kickstart = await new web3.eth.Contract((compiledKickstarter.abi))
    .deploy({ data: compiledKickstarter.evm.bytecode.object})
    .send({ from: accounts[0], gas: '10000000'});

  await kickstart.methods.createCampaign('100')
  .send({from: accounts[0], gas: '10000000'});

  [campaignAddress] = await kickstart.methods.deployedCampaigns().call();
  console.log(campaignAddress);

  campaign = await new web3.eth.Contract(
    compiledCampaigns.abi,
    campaignAddress
  );
});

describe('campaigns', function() {
  it('deploys a kickstart and campaign', async function() {
    await assert.ok(kickstart.options.address);
    await assert.ok(campaign.options.address);
  })
})
