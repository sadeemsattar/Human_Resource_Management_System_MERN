import qrcode from "qrcode";
import axios from "axios";
import { useState } from "react";
import { saveAs } from "file";

const QRcodeGenerator = () => {
  const [empId, setEmpId] = useState("e1");
  const [url, setUrl] = useState("");
  //   const getData = async () => {
  //     const response = await axios.get(
  //       "localhost:5000/employee/getemployeedata",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setEmpId(response.data);
  //   };
  const generteCode = async () => {
    try {
      const qrUrl = await qrcode.toDataURL(empId);
      setUrl(qrUrl);
      //   SetUrlImage(urlImage);
      //   console.log(urlImage);
    } catch (e) {
      console.log(e);
    }
  };
  const downloadImage = () => {
    let element = document.createElement("a");
    let file = new Blob([url], { type: "image/*" });
    element.setAttribute("href", url);
    element.setAttribute("download", empId);
    element.click();
    console.log(url);
    // saveAs(url, "1.jpg"); // Put your image url here.
  };
  generteCode();
  return (
    <>
      {/* {getData()} */}
      {/* {generteCode()} */}
      {/* {downloadImage()} */}
      <h1>code generator</h1>
      <button
        onClick={() => {
          downloadImage();
        }}
      >
        asas
      </button>
      <img src={url} />
    </>
  );
};
export default QRcodeGenerator;
