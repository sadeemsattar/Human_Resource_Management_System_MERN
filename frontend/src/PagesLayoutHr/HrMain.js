import React from "react";
import Main from "../component/Main/Main";
import { CssBaseline } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HrMain() {
  const [tableData, setData] = useState();
  const [res, setRes] = useState();
  const [leave, setLeave] = useState();
  const [dept, setDept] = useState();
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/hr/manageemployee",
      {
        withCredentials: true,
      }
    );
    setData(response.data.result);
    const response2 = await axios.get(
      "http://localhost:5000/hr/manageresignation",
      {
        withCredentials: true,
      }
    );
    setRes(response2.data.result);
    const response3 = await axios.get("http://localhost:5000/hr/manageleave", {
      withCredentials: true,
    });
    setLeave(response3.data.result);
    // setDept(new Set(tableData.map((emp) => emp.DEPARTMENT_ID)));
  };

  useEffect(() => {
    getData();
  }, []);

  const Items = [
    {
      text: `Number Of Employees  ${tableData ? tableData.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 231, 217)",
    },
    {
      text: `Number Of Employee's Department ${dept ? dept.size : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 247, 205)",
    },
    {
      text: `Number Of Applied Resignation ${res ? res.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(208, 242, 255)",
    },
    {
      text: `Number Of Leaves ${leave ? leave.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(200, 250, 205)",
    },
  ];

  return (
    <>
      <Main name="Sadeem" Items={Items} />

      <CssBaseline />
    </>
  );
}
