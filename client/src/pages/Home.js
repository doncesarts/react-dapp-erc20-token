import React, { useContext } from "react";
import { useKYC, useBuyToken } from "../hooks/TokenHooks";
import { Alert } from "@material-ui/lab";
import { Container, Typography, Grid , Button} from "@material-ui/core";
import Web3Context from "../Web3Context";
import Link from "@material-ui/core/Link";

const Home = (props) => {
  const { contracts, totalSupply, balanceOf } = useContext(Web3Context);
  const { response: kycResponse } = useKYC();
  const { response, buyToken } = useBuyToken();

  const handleBuyToken = async (tokenId, price) => {
    await buyToken();
    if (response !== null && response.error !== null) {
      window.location.reload();
    }
  };
  if(response == null || kycResponse == null||  response.data == null || kycResponse.data == null){
    return (<div>loading</div>)
  }
  return (
    <div>
      <section className="text-center">
        <Typography
          component="h5"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          Initial Coin Offering
        </Typography>
        <Container maxWidth="md">
          <Typography component="p" align="center" color="textPrimary">
            Our amazing Organization is the future of amazing organizations.
            With this initial coin offering we are giving you the opportunity to
            collaborate with an amazing team in order to find the final
            question. We already have the answer, 42 !!!
          </Typography>
        <div>
          <h2>Token information</h2>
     <p>Total Supply of Tokens: {totalSupply}</p>
     <p>Total Available Tokens: {balanceOf}</p>
     </div>
          {!!kycResponse && !!kycResponse.error && (
            <Alert severity="error"> {kycResponse.error}</Alert>
          )}
          {kycResponse.data.isKycCompleted && (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={6}>
                <div>
                  <h2>Buy Fancy Org-Token</h2>
                  <p>
                    Send Ether to this address: {contracts.myTokenSale._address}
                  </p>

                  <p>You have: {response.data.userTokens}</p>
                <Button variant="contained" color="primary" onClick={handleBuyToken}>
                  Buy token
                </Button>

                </div>
              </Grid>
            </Grid>
          )}
          {!kycResponse.data.isKycCompleted && (
            <>
              <p></p> <p></p> <p></p>
              <Alert severity="info">
                Please complete your KYC in order to buy tokens.
              </Alert>
              <p></p> <p></p> <p></p>
              <Link variant="button" color="textPrimary" href="/kyc">
                Complete your KYC
              </Link>
            </>
          )}
        </Container>
      </section>
    </div>
  );
};
export default Home;
