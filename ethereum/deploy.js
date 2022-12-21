const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
//const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json'); 

const provider = new HDWalletProvider(
  'fiscal talent mansion dream such grunt correct okay pair gravity volume future',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/11cf3c38eaa9407ab8037da1478cbfd0'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

//   const result = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode })
//     .send({ gas: '1000000', from: accounts[0] });

   const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
       //.deploy({ data: bytecode })
       .deploy({data: compiledFactory.bytecode})
       .send({ gas: '1000000', from: accounts[0] });

  //console.log(interface);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop(); 
};
deploy();