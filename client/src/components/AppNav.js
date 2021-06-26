import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Web3Context  from "../Web3Context";
import { getWeb3, getInstance } from "../Web3Util";
import { AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

/**
 * @App Build Initial Coin Offering using ERC-20
 * @Util header navigation
 * @author christopher chavez
 */
const AppNav = props => {
  const [state, setState] = useState({
    name: "",
    symbol: "",
    collapsed: false,
  });
  const { contracts } = useContext(Web3Context);
  const { myToken } = contracts; 
  useEffect(  () => {
    (async  ()=> {

      const symbol = await myToken.methods.symbol().call();
      const name = await myToken.methods.name().call();
      setState((prevState) => ({ ...prevState, symbol, name }));
    })();

  }, []);
  const classes = {  toolbar: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },};

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar style={classes.toolbar} component="nav">
        <Typography
          // variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <strong>
            <i className="fa fa-coins"></i>Initial Coin Offering ({" "}
            {state.name} | {state.symbol})
          </strong>
        </Typography>
          <Link
            variant="button"
            color="textPrimary"
            href="/"
            className={classes.link}
          >
            Home
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="/kyc"
            className={classes.link}
          >
            KYC
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="/myWallet"
            className={classes.link}
          >
            My Wallet Info
          </Link>
        {/* <Button href="#" color="primary" variant="outlined" className={classes.link}>
          Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default AppNav;
