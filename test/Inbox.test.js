// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There'
const NEW_MESSAGE = 'new message'

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING]
    })
    .send({
      from: accounts[0], gas: '1000000'
    });

});

describe('Inbox',() => {
  it('deploys a contract',() => {
    assert.ok(inbox.options.address);
  })

  it('has a default message',async () => {
    // first () -> all arguments to functions
    // second () -> send transaction data on the network
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING)
    
  })

  it('can change the message',async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({
      from: accounts[0]
    })
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE)
  })  

}) 
