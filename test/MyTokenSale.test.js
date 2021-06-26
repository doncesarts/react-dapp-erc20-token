const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;

//   beforeEach(async () => {
//     // getting the token from truffle network
//     this.tokenInstance = await Token.deployed();
//     // getting the token from a ganache network
//     // this.myToken = await Token.new(process.env.INITIAL_TOKENS);
//   });

  it("there should not be any coins in my account", async () => {
    const tokenInstance = await Token.deployed();
    return expect(
      tokenInstance.balanceOf.call(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(new BN(0));
  });
  it("all coins should be in the tokensale smart contract", async () => {
    const tokenInstance = await Token.deployed();
    let balance = await tokenInstance.balanceOf.call(TokenSale.address);
    let totalSupply = await tokenInstance.totalSupply.call();
    return expect(balance).to.be.a.bignumber.equal(totalSupply);
  });

  it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
    const tokenInstance = await Token.deployed();
    let tokenSaleInstance = await TokenSale.deployed();
    let kycInstance = await KycContract.deployed();

    let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
    
    const buyPayload = {from: recipient, value: web3.utils.toWei("1", "wei")};


    expect(tokenSaleInstance.sendTransaction(buyPayload)).to.be.rejected;
    expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    expect(await kycInstance.isKycCompleted(recipient)).to.be.false; 
    

    expect(await kycInstance.isKycCompleted(recipient)).to.be.true; 
    expect(tokenSaleInstance.sendTransaction(buyPayload)).to.be.fulfilled;
    const balanceAfter = await tokenInstance.balanceOf.call(recipient);

    return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(balanceAfter);
  });
});
