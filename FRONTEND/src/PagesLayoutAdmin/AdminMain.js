import React from "react";
import Main from "../component/Main/Main";
import { CssBaseline } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useEffect, useState } from "react";
import axios from "axios";
export default function AdminMain() {
  const [tableData, setData] = useState();
  const [res, setRes] = useState();
  const [leave, setLeave] = useState();
  const [dept, setDept] = useState();
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/admin/addhr", {
      withCredentials: true,
    });
    setData(response.data.result);
    const response2 = await axios.get(
      "http://localhost:5000/admin/managedepartment",
      {
        withCredentials: true,
      }
    );
    setRes(response2.data.result);
    const response3 = await axios.get(
      "http://localhost:5000/admin/managedesignation",
      {
        withCredentials: true,
      }
    );
    setLeave(response3.data.result);
    // setDept(new Set(tableData.map((emp) => emp.DEPARTMENT_ID)));
  };

  useEffect(() => {
    getData();
  }, []);

  const Items = [
    {
      text: `Number Of HR  ${tableData ? tableData.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 231, 217)",
    },
    {
      text: `Number Of Designation ${dept ? dept.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 247, 205)",
    },
    {
      text: `Number Of  Department${leave ? leave.length : "0"}`,
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(208, 242, 255)",
    },
    {
      text: `Number Of Leaves ${res ? res.length : "0"}`,
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
