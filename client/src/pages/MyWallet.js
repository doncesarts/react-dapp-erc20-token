import React, {useState, useContext } from 'react';
import { ArtTokenCard, WalletCard } from "../components";
import { useBuyToken } from "../hooks/TokenHooks";

import {  Container, Typography, Grid, TextField, Dialog, DialogActions, DialogTitle, DialogContent, Button} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Web3Context  from "../Web3Context";

/**
 * @App Build Initial Coin Offering using ERC-20
 * @Util my digital wallet
 * @author christopher chavez
 */
const  MyWallet = (props)=>{
  const web3Context = useContext(Web3Context);
  const { response } = useBuyToken();
    const classes = {
      root: {
        width: "100%",
        maxWidth: 360,
      },
    };
    return (
      <div>
        <section className="text-center">
          <Container maxWidth="md">
            <Typography
              component="h5"
              variant="h2"
              align="center"
              color="textPrimary"
            >
              My Wallet
            </Typography>
            <WalletCard
              className={classes.root}
              user={web3Context.user}
              networkId={web3Context.networkId}
              balance={web3Context.balance}
              networkType={web3Context.networkType}
            />
                    {!!response.error && ( 
                <Alert severity="error"> {response.error}</Alert>
          )}
                <Container maxWidth="md">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                  <p>Total of Tokens in your wallet: {response.data.userTokens}</p>
                  </Grid>
                </Container>
          </Container>
        </section>
      </div>
    );
}

export default MyWallet;
