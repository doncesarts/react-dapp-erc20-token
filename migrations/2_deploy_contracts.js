require("dotenv").config({path: "../.env"});

var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(KycContract);
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
    let tokenInstance = await MyToken.deployed();
    // In order for our crowdsale smart contract to work, we must send all the money to the contract. 
    // This is done on the migrations stage in our truffle installation:
    await tokenInstance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
    console.log(`Migrations deployed Test Contract: ${MyTokenSale.address}`);

};
