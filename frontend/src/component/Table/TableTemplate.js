// import React from "react";
// import { Paper, Typography, makeStyles } from "@material-ui/core";
// import MaterialTable from "material-table";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const tostifyNotification = (condition) => {
//   // toast.success("Record Edit!");
//   if (condition === "Error") {
//     toast.error("Error In Update!");
//   } else if (condition === "Success") {
//     toast.success("Update Successful!");
//   }
// };

// export default function TableTemplate(props) {
//   const {
//     records,
//     headCells,
//     title,
//     name,
//     onRowAdd,
//     onRowDelete,
//     onRowUpdate,
//   } = props;

//   const [tableData, setData] = useState(records);

//   return (
//     <div>
//       {onRowDelete === "False" &&
//       onRowUpdate === "True" &&
//       onRowAdd === "False" ? (
//         <MaterialTable
//           title={title}
//           data={tableData}
//           columns={headCells}
//           options={{
//             // filtering: true
//             actionsColumnIndex: -1,
//             addRowPosition: "first",
//           }}
//           editable={{
//             onRowUpdate: (newValueRow, oldValueRow) =>
//               new Promise((resolve, reject) => {
//                 const rowIndex = oldValueRow.tableData.id;
//                 const updateRows = [...tableData];
//                 updateRows[rowIndex] = newValueRow;
//                 setTimeout(() => {
//                   setData(updateRows);
//                   tostifyNotification("Success");
//                   resolve();
//                 }, 1000);
//               }),
//           }}
//         />
//       ) : (
//         ""
//       )}

//       {onRowDelete === "True" &&
//       onRowUpdate === "True" &&
//       onRowAdd === "False" ? (
//         <MaterialTable
//           title={title}
//           data={tableData}
//           columns={headCells}
//           options={{
//             // filtering: true
//             actionsColumnIndex: -1,
//             addRowPosition: "first",
//           }}
//           editable={{
//             onRowUpdate: (newValueRow, oldValueRow) =>
//               new Promise((resolve, reject) => {
//                 const rowIndex = oldValueRow.tableData.id;
//                 const updateRows = [...tableData];
//                 updateRows[rowIndex] = newValueRow;
//                 setTimeout(() => {
//                   setData(updateRows);
//                   tostifyNotification("Success");
//                   resolve();
//                 }, 1000);
//               }),
//             onRowDelete: (selectedRow) =>
//               new Promise((resolve, reject) => {
//                 const rowIndex = selectedRow.tableData.id;
//                 const updateRows = [...tableData];
//                 updateRows.splice(rowIndex, 1);
//                 setTimeout(() => {
//                   setData(updateRows);
//                   tostifyNotification("Error");
//                   resolve();
//                 }, 1000);
//               }),
//           }}
//         />
//       ) : (
//         ""
//       )}

//       {onRowDelete === "True" &&
//       onRowUpdate === "True" &&
//       onRowAdd === "True" ? (
//         <MaterialTable
//           title={title}
//           data={tableData}
//           columns={headCells}
//           options={{
//             // filtering: true
//             actionsColumnIndex: -1,
//             addRowPosition: "first",
//           }}
//           editable={{
//             onRowUpdate: (newValueRow, oldValueRow) =>
//               new Promise((resolve, reject) => {
//                 const rowIndex = oldValueRow.tableData.id;
//                 const updateRows = [...tableData];
//                 updateRows[rowIndex] = newValueRow;
//                 setTimeout(() => {
//                   setData(updateRows);
//                   tostifyNotification("Success");
//                   resolve();
//                 }, 1000);
//               }),
//             onRowAdd: (newRow) =>
//               new Promise((resolve, reject) => {
//                 const updateRows = [...tableData, newRow];
//                 setTimeout(() => {
//                   setData(updateRows);

//                   tostifyNotification();

//                   resolve();
//                 }, 1000);
//               }),
//             onRowDelete: (selectedRow) =>
//               new Promise((resolve, reject) => {
//                 const rowIndex = selectedRow.tableData.id;
//                 const updateRows = [...tableData];
//                 updateRows.splice(rowIndex, 1);
//                 setTimeout(() => {
//                   setData(updateRows);
//                   tostifyNotification("Error");
//                   resolve();
//                 }, 1000);
//               }),
//           }}
//         />
//       ) : (
//         ""
//       )}

//       <ToastContainer position="bottom-right" autoClose={2000} />
//     </div>
//   );
// }
