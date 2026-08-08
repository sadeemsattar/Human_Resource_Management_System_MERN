import React from "react";
import { useState, useRef } from "react";
import qrcode from "qrcode";
import QrReader from "react-qr-reader";
import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";

export default function Qrcode() {
  const [UserID, setUserID] = useState("");
  const [urlImage, SetUrlImage] = useState("");
  const [resultRes, setResult] = useState("");
  const [errorRes, setError] = useState("");
  const generteCode = async () => {
    try {
      const urlImage = await qrcode.toDataURL(UserID);
      SetUrlImage(urlImage);
      console.log(urlImage);
    } catch (e) {
      console.log(e);
    }
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
    setError(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      console.log(result);
      setResult(result);
    }
  };
  const qrref = useRef(null);
  return (
    <Paper elevation={0} square>
      <Typography variant="h4" component="div" align="center">
        Qr Code :
      </Typography>
      <Grid container spacing={4}>
        <Grid item>
          <TextField
            label="Enter UserID"
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          ></TextField>
          <Button variant="contained" color="secondory" onClick={generteCode}>
            Generate QRCode
          </Button>

          <br></br>
          <br></br>
          <br></br>
          <a href={urlImage} download>
            <imG src={urlImage}></imG>
          </a>
        </Grid>
        <Grid item xl={5} lg={3}>
          <h1>Scan QRCode</h1>
          <QrReader
            delay={50}
            style={{ width: "100%" }}
            onScan={handleScanWebCam}
            onError={handleErrorWebCam}
          />
          <h1>Result:</h1>
          <h2>Error: {errorRes}</h2>
          <h2>Result: {resultRes}</h2>
        </Grid>
      </Grid>
    </Paper>
  );
}
