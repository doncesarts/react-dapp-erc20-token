import { useState, useEffect, useCallback, useContext } from "react";
import Web3Context from "../Web3Context";

export const useKYC = (props) => {
  const { contracts, user } = useContext(Web3Context);
  const { kycContract } = contracts;
  const [response, setResponse] = useState({
    data: { isKycCompleted: false},
    isFetching: false,
    error: null,
  });

  const isKycCompletedFn = useCallback(async () => {
    try {
      const isKycCompleted =  await kycContract.methods.isKycCompleted(user).call();
      setResponse({ isFetching: false, data:{ isKycCompleted } });
    } catch (e) {
      console.log("Error", e);
      setResponse({
        isFetching: false,
        data: {isKycCompleted: false},
        error: e.message,
      });
    }
  }, [kycContract, user]);

  const setKycCompleted = useCallback(async (kycAddress) => {
    try {
      await kycContract.methods.setKycCompleted(kycAddress).send({from: user});
      setResponse({ isFetching: false, data:{ isKycCompleted: true } });
    } catch (e) {
      console.log("Error", e);
      setResponse({
        isFetching: false,
        data: {isKycCompleted: false},
        error: e.message,
      });
    }
  }, [kycContract, user]);

  useEffect(() => {
    isKycCompletedFn();
  }, [isKycCompletedFn]);


  return { response, isKycCompleted:isKycCompletedFn, setKycCompleted};
};

export const useBuyToken = () => {
  const { contracts, user } = useContext(Web3Context);
  const { myTokenSale, myToken } = contracts;
  const [response, setResponse] = useState({
    data: { userTokens: 0 },
    isFetching: false,
    error: null,
  });

  const buyToken = useCallback(async () => {
    try {
      await myTokenSale.methods.buyTokens(user).send({
        from: user,
        gas: 6000000,
        value: 1,
      });

      setResponse({ isFetching: false });
    } catch (e) {
      console.log("Error", e);
      setResponse({
        isFetching: false,
        error: e.message,
      });
    }
  }, [myTokenSale, user]);

  const userTokenBalance = useCallback(async () => {
    try {
        const userTokens = await myToken.methods.balanceOf(user).call();
        setResponse((prevState) => ({
          ...prevState,
          isFetching: false ,
          data: { ...prevState.data, userTokens },
        }));

    } catch (e) {
      console.log("Error", e);
      setResponse({
        isFetching: false,
        error: e.message,
      });
    }
  }, [myTokenSale, user]);

  useEffect(() => {
    const listenToTokenTransfer = async () => {
      myToken.events.Transfer({ to: user }).on("data", userTokenBalance);
    };
    userTokenBalance();
    listenToTokenTransfer();
  }, [userTokenBalance]);

  return { response, buyToken, userTokenBalance };
};
