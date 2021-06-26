# React Dapp  - ERC20 Token for an ICO.

React Dapp that enables to create an Initial coin offering of an ERC20 Token. 
Any address that wants to buy the ERC20Token must be validated with KYC previous to any purchase. 
Only the admin of the ICO can whitelist addresses after KYC process. 
They ICO receives Ethereum as payment for the ERC20Token .


# Set of tools. 
solidity + react + chai + Truffle +  Openzeppelin Smart Contracts


## Main contracts and methods.
ERC20 interface
- allowance(address,address): Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}.
- balanceOf(address):  Returns the amount of tokens owned by `account`.
- totalSupply():  Returns the amount of tokens in existence.
- transfer(address,uint256): Moves `amount` tokens from the caller's account to `recipient`. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.
- transferFrom(address,address,uint256):  Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance. Returns a boolean value indicating whether the operation succeeded. Emits a {Transfer} event.

- Crowdsale.sol : Crowdsale is a base contract for managing a token crowdsale, allowing investors to purchase tokens with ether. From Openzeppelin 
- KycContract.sol : Whitelist address after KYC is completed. 
- MyToken.sol : ERC20 Token for the ICO
- MyTokenSale.sol : Allows user to purchase the ERC20 Token.


## Install 
 `npm i`
## Configuration 
Create an .env file with the customizing the following variables:
```
INITIAL_TOKENS=INITIAL_TOKENS
MNEMONIC="YOUR_WALLET_MNENOMIC"
PROJECT_ID="YOUR_INFURA_PROJECT_ID"
```

## Compile smart contracts
```
truffle compile
```

## Deploy smart contracts

```
truffle migrate --reset
or 
truffle migrate --reset --network ropsten


```

## Test
```
truffle test
```

## Run

```
cd client
npm start
```



## How this project was built 

### Truffle project init
Add ERC20 smart Contract 
Add Crowdsale Contract 
Add KYC Contract 
Add React Client to interact with the smart contracts 
Deploy to test net 

```
mkdir react-dapp-erc20-token
cd react-dapp-erc20-token
```

### Truffle project init
```
npm install -g truffle
truffle unbox react 
npm install --save @openzeppelin/contracts

rm contracts/SimpleStorage.sol
rm migrations/2_deploy_contracts.js
rm test/TestSimpleStorage.sol

touch contracts/MyToken.sol
touch migrations/2_deploy_contracts.js
```

Copy the ERC20 template and customize as need from https://docs.openzeppelin.com/contracts/4.x/erc20 to  `contracts/MyToken.sol`

Add the compiler version on truffle 
```
  compilers: {
    solc:{
      version:"^0.8.0"
    }
  }
  ```

Change the compiler version on file `pragma solidity ^0.8.0;` migrations/1_initial_migration.js

Update  migrations/2_deploy_contracts.js
```
var MyToken = artifacts.require("./MyToken.sol");

module.exports = async function(deployer) {
    await deployer.deploy(MyToken, 100000000);
};
```

Deploy the contract
```
truffle developer 
migrate 
```

### Truffle project  - add unit test
Start ganache  and configure truffle config 

npm install --save-dev chai chai-bn chai-as-promised
npm install --save dotenv
echo "INITIAL_TOKENS=INITIAL_TOKENS" >> .env.development

touch test/MyToken.test.js
touch test/setupchai.js

truffle test


### Add Crowdsale Contracts¶

touch contracts/Crowdsale.sol
touch contracts/MyTokenSale.sol
touch test/MyTokenSale.test.js

truffle test

### Add in a Kyc Mockup

touch contracts/KycContract.sol
touch test/KycContract.test.js
truffle test
