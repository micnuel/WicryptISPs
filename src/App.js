import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Device Id",
    selector: "deviceId",
    sortable: true,
  },
  {
    name: "ISP",
    selector: "isp",
    sortable: true,
  },
  {
    name: "Connection Speed",
    selector: "connectionSpeed",
    sortable: true,
  },

  {
    name: "Location (City)",
    selector: "location.city",
    sortable: true,
  },
];

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://explorer.wicrypt.com/api/v1/Device"
        );
        const json = await response.json();
        console.log(json);
        const filteredData = json.data.records.filter(
          (record) =>
            record.connectionSpeed !== "unknown" &&
            record.connectionSpeed !== "---"
        );
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
