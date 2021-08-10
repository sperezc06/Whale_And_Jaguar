import React, { useEffect, useState } from "react";
import "./App.scss";
import Table from "./components/Table";

function App() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);

  return (
    <div className="app">
      <h2>Countries</h2>
      <Table rows={rows} setRows={setRows} />
    </div>
  );
}

export default App;
