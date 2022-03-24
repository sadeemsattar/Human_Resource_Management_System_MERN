import QrReader from "react-qr-reader";
import { useState } from "react";
import axios from "axios";
const QRcodeReader = () => {
  //   const [att, setAtt] = useState();
  const [att, setAtt] = useState("reading");
  const handleScanWebCam = (result) => {
    if (result) {
      const getData = async () => {
        try {
          const response = await axios.post("http://localhost:5000/qr/read", {
            id: result,
          });
          setAtt(`Attendance marked successfully for employee ${result}`);
          setTimeout(() => {
            setAtt("reading");
          }, 3000);
        } catch (err) {
          console.log(err);
          console.log(err.message);
          if (err.message === "Request failed with status code 404") {
            setAtt(
              "Cannot Mark Attendance.Please use this module in organisation"
            );
          } else {
            setAtt("failed");
          }

          setTimeout(() => {
            setAtt("reading");
          }, 3000);
        }
      };
      getData();
    }
  };
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 0,
        margin: 0,
      }}
    >
      <h1>ATTENDANCE MARKING MODULE</h1>
      <QrReader
        delay={3000}
        style={{ width: "50%", height: "50%" }}
        onScan={handleScanWebCam}
        onError={(err) => {
          console.log(err);
        }}
      />
      <h1>{att}</h1>
    </div>
  );
};
export default QRcodeReader;
