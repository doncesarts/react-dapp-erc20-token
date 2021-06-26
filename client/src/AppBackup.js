import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contracts: null,  loaded: false, kycAddress: "0x123", userTokens: 0  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // this.networkId = await this.web3.eth.getChainId();      
      const myToken = new web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[networkId] && MyToken.networks[networkId].address,
      );
      const myTokenSale = new web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[networkId] && MyTokenSale.networks[networkId].address,
      );
      const kycContract = new web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[networkId] && KycContract.networks[networkId].address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      if(kycContract._address){
        const totalSupply = await myToken.methods.totalSupply().call();
        const balanceOf = await myToken.methods.balanceOf(myTokenSale._address).call();

        
        this.setState({ web3, accounts, contracts: {myToken, myTokenSale, kycContract} , loaded:true, totalSupply, balanceOf}, this.updateUserTokens);
        this.listenToTokenTransfer();
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert( `Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  updateUserTokens = async() => {
    let userTokens = await this.state.contracts.myToken.methods.balanceOf(this.state.accounts[0]).call();
    this.setState({userTokens: userTokens});
  }

  listenToTokenTransfer = async() => {
    this.state.contracts.myToken.events.Transfer({to: this.state.accounts[0]}).on("data", this.updateUserTokens);
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleBuyToken = async () => {
    await this.state.contracts.myTokenSale.methods.buyTokens(this.state.accounts[0]).send({from: this.state.accounts[0], value: 1});
  }

  handleKycSubmit = async () => {
    const { contracts, accounts, kycAddress } = this.state;
    const { kycContract } = contracts; 
    await kycContract.methods.setKycCompleted(kycAddress).send({from: accounts[0]});
    alert("Account "+kycAddress+" is now whitelisted");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
     <h1>Capuccino Token for StarDucks</h1>

     <h2>Token information</h2>
     <p>Total Supply of Tokens: {this.state.totalSupply}</p>
     <p>Total Available Tokens: {this.state.balanceOf}</p>

      <h2>Enable your account</h2>
      Address to allow: 
      <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
      <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>

      <h2>Buy Cappucino-Tokens</h2>
        <p>Send Ether to this address: {this.state.contracts.myTokenSale._address}</p>

        <p>You have: {this.state.userTokens}</p>
        <button type="button" onClick={this.handleBuyToken}>Buy more tokens</button>
      </div>
    );
  }
}

export default App;
