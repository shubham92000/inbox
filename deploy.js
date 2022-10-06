// deploy code will go here

// two tasks
// unlock a user account on ethereum to use it as a source for deployment
// use a node to deploy ( infura )
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'crawl impact utility garlic immense climb property frown scatter spin link settle',
  'https://goerli.infura.io/v3/c88183524f4b4f7d93aa37d422a11d71'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from account ${accounts[0]}`);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi There']
    })
    .send({
      gas: '1000000',
      from: accounts[0]
    })
  
  console.log(result.options.address);
  provider.engine.stop();
};

deploy();