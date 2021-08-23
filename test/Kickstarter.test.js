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

  const addresses = await kickstart.methods.getDeployedCampaigns().call();
  campaignAddress = addresses[0];
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

  it('check the manager', async function() {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  })

  it('checking if accounts can contribute', async function() {
    const checkMinimum = await campaign.methods.minimumContribution().call();

    await campaign.methods.contribute().send({value: '1000', from: accounts[1]})

    const contributor = await campaign.methods.approvers(accounts[1]).call();
    console.log(contributor)
  })

  it('check for request creation', async function() {
    await campaign.methods
    .createRequest(
      'checking', '1000', accounts[1]
    )
    .send({
      from: accounts[0],
      gas: '10000000'
    })

    const requests = await campaign.methods.requests(0).call();
    console.log(requests);
  })

  it('approve and finalize a request', async function() {

    await campaign.methods.contribute().send({value: web3.utils.toWei('10', 'ether'), from: accounts[0]})

    await campaign.methods
    .createRequest(
      'approving', web3.utils.toWei('5', 'ether'), accounts[1]
    )
    .send({
      from: accounts[0],
      gas: '10000000'
    })

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '10000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '10000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    console.log(balance);

    const requests = await campaign.methods.requests(0).call();
    console.log(requests);
  })

  it('checking summary and requestsLength', async function() {
    const projects = await campaign.methods.summary().call();
    console.log(projects)

    const requestsA = await campaign.methods.requestsLength().call();
    console.log(requestsA);
  })
})
