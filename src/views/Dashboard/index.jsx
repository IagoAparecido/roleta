import "./styles.css";
import { useEffect, useState } from "react";

import DashboardHeader from "../../components/DashboardHeader";
import TableData from "../../components/TableData";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  var bearer = "Bearer " + localStorage.getItem("token");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://roleta-back.vercel.app/person", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <DashboardHeader>
      <div className="container_table">
        <input
          type="text"
          placeholder="Pesquisar.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableData data={data} search={search} />
      </div>
    </DashboardHeader>
  );
}

export default Dashboard;
