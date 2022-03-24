// import React from "react";
// import "./Chart.css";
// import { useState } from "react";

// import Axios from "axios";
// const Chart = () => {
//   const [fetchData, setData] = useState("");
//   const fetching = (e) => {
//     Axios.post("http://localhost:5000/Item")
//       .then((res) => {
//         // console.log(res);
//         setData(res.data);
//         console.log(fetchData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <button onClick={fetching}>Show Item</button>
//       <div className="app-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Item ID</th>
//               <th>Item Name</th>
//               <th>Quatity</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fetchData
//               ? fetchData.map((obj) => (
//                   <tr>
//                     <td>{obj.itemId}</td>
//                     <td>{obj.itemName}</td>
//                     <td>{obj.Quantity}</td>
//                     <td>{obj.Price}</td>
//                   </tr>
//                 ))
//               : ""}
//             ;
//           </tbody>
//         </table>
//      </div>
//     </>
//   );
// };
// export default Chart;

import React from "react";
import Chart from "react-apexcharts";

const ChartBar = () => {
  return (
    <Chart
      type="bar"
      width="500"
      series={[
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ]}
      options={{
        colors: ["#FFC107"],
        xaxis: {
          categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
          title: {
            text: "Years",
          },
        },
        title: {
          text: "Hiring",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        subtitle: {
          text: "%",
          style: {
            fontSize: "12px",
          },
        },
      }}
    />
  );
};
export default ChartBar;
