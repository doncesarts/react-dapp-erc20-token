import  { useState, useEffect } from 'react';
import { getWeb3, getContractInstance}  from "../Web3Util";

const useWeb3 = ()=> {
    const [state, setState] =  useState({
        user: "",
        balance: 0,
        contracts: null,
        networkId: "",
        networkType: "",
        web3: undefined,
      });

    useEffect(()=>{
        async function loadWeb3 () {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const user = accounts[0];
          const balanceInWei = await web3.eth.getBalance(user);
          var balance = web3.utils.fromWei(balanceInWei, "ether");
          const networkId = await web3.eth.net.getId();
          const networkType = await web3.eth.net.getNetworkType();
          
          const myToken = await getContractInstance(web3,'MyToken');
          const myTokenSale = await getContractInstance(web3,'MyTokenSale');
          const kycContract = await getContractInstance(web3,'KycContract');
           
          let totalSupply = 0;
          let balanceOf = 0;

          if(kycContract._address){
            totalSupply = await myToken.methods.totalSupply().call();
            balanceOf = await myToken.methods.balanceOf(myTokenSale._address).call();
          }

          window.web3 = web3;
          window.user = user;
          setState({ 
            accounts,
            user: user, 
            balance: balance, 
            contracts: { myToken, myTokenSale, kycContract},
            networkId: networkId ,
            networkType: networkType,
            web3: web3,
            totalSupply, balanceOf
           });
        }
        loadWeb3();
      },[ ]);
      return {...state} ;
  }
  export default useWeb3;