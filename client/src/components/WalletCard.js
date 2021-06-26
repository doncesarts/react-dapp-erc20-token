import React from "react";
import {   Grid,
    Card,
    CardContent,
     ListItemIcon, 
  List, ListItem, ListItemText
  } from "@material-ui/core";
  import Wifi from '@material-ui/icons/Wifi';
  import PermIdentity from '@material-ui/icons/PermIdentity';
  import AccountBalance from '@material-ui/icons/AccountBalance';
  import Lock from '@material-ui/icons/Lock';

/**
 * @App Build Initial Coin Offering using ERC-20
 * @CreditTo  https://github.com/PacktPublishing/Learn-Ethereum
 * @author christopher chavez
 */
const WalledCard = (props) => {
    const classes = {
        root: {
    width: '100%',
    maxWidth: 360,
  }
}
  return (
    <Card className={classes.root} variant="outlined">
    <CardContent>
    <Grid container direction="row" justify="center"  alignItems="center" spacing={3}>
      <Grid item xs={6} >
    <List  dense className={classes.root} aria-label="wallet">
      <ListItem >
        <ListItemIcon>
          <PermIdentity />
        </ListItemIcon>
        <ListItemText primary="My Address" secondary={props.user} />
      </ListItem>
      <ListItem >
      <ListItemIcon>
          <Wifi />
        </ListItemIcon>
      <ListItemText primary="NetworkId" secondary={props.networkId} />
      </ListItem>
    </List>
    </Grid>
    <Grid item xs={6} >
    <List  dense className={classes.root} aria-label="wallet">
      <ListItem >
      <ListItemIcon>
          <AccountBalance />
        </ListItemIcon>
      <ListItemText primary="Balance" secondary={props.balance}/>
      </ListItem>
      <ListItem >
      <ListItemIcon>
          <Lock />
        </ListItemIcon>
      <ListItemText primary="NetworkType" secondary={props.networkType} />
      </ListItem>    
    </List>
    </Grid>                    
    </Grid>
    </CardContent>
  </Card>
  );
};

export default WalledCard;
