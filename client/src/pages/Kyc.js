import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useKYC } from "../hooks/TokenHooks";

/**
 * @App Build Initial Coin Offering using ERC-20
 * @author christopher chavez
 */
const Kyc = (props) => {
    const { response, setKycCompleted} = useKYC();

  const [state, setState] = useState({
    isFetching: false,
    kycAddress: "",
    error: undefined,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { kycAddress } = state;
    if (
      isNotEmpty(kycAddress)
    ) {
        await setKycCompleted(kycAddress);
        props.history.push(`/home`);
        window.location.reload();
    } else {
      setState((prevState) => ({
        ...prevState,
        error: "Input data incorrect.",
      }));
    }
  };
  const isNotEmpty = (val) => val && val.length > 0;
  const handleFormChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div>
      <section className="text-center">
        <Typography
          component="h5"
          variant="h2"
          align="center"
          color="textPrimary"
        >
          KYC - Enable your account
        </Typography>
        <Container maxWidth="md">
          {!!response.error && (
            <Alert severity="error">
              {response.error}
            </Alert>
          )}
          {!!state.error && <Alert severity="error"> {state.error}</Alert>}
          <form
            className="text-center border border-light p-5"
            noValidate
            onSubmit={handleSubmit}
          >
            <Card>
              <CardContent>
                <CardHeader
                  title="Personal details"
                  subheader="Wallet address to clear KYC"
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  // action={"Pro" === "Pro" ? "StarIcon" : null}
                ></CardHeader>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      id="kycAddress"
                      name="kycAddress"
                      label="Wallet Address"
                      placeholder="0X...."
                      autoComplete="off"
                      autoFocus
                      onChange={handleFormChange}
                      value={state.kycAddress}
                    />
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" type="submit">
                Add Address to Whitelist
                </Button>
              </CardActions>
            </Card>
          </form>
        </Container>
      </section>
    </div>
  );
};

export default Kyc;
