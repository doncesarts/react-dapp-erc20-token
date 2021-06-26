import React from "react";
import { Alert } from "@material-ui/lab";
import {
  Button,
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

/**
 * @App Build Initial Coin Offering using ERC-20
 * @Util aution house for digial art
 * @CreditTo  https://github.com/PacktPublishing/Learn-Ethereum
 * @author christopher chavez
 */
const ArtTokenCard = (props) => {
  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader={`TokenId: ${props.tokenId}`}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        // action={"Pro" === "Pro" ? "StarIcon" : null}
        //  className={classes.cardHeader}
      ></CardHeader>
     <CardActionArea>
        <CardMedia
          // className={classes.media}
          className="img-fluid"
          image={props.image}
          title={props.title}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
          {props.title}
          </Typography> */}
          <div className="dark-grey-text">{props.price} (ether)</div>
          <Typography variant="body2" color="textSecondary" component="p">
            by{" "} <span className="font-weight-bold">{props.author}</span>,{" "}{props.publishDate}
          </Typography>
          <Alert severity="info">{props.desc}</Alert>
        </CardContent>
      </CardActionArea>
      <CardActions>
      { props.onBuyArt && 
        <Button variant="contained" fullWidth color="primary"
          onClick={(e) => {
            e.preventDefault();
            props.onBuyArt(props.tokenId, props.price);
          }}>
          Buy
        </Button>
        }  
        { (props.status==='Publish' || props.onSellArt) && 
                <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  props.onSellArt(props.tokenId);
                }
                }
                data-target=".sell-modal"
                data-toggle="modal" 
              >
                {props.status}
              </Button>
        }                           


      </CardActions>
    </Card>
  );
};

export default ArtTokenCard;
