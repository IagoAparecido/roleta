import "./styles.css";

import DashboardHeader from "../../components/DashboardHeader";
import TableData from "../../components/TableData";

function Dashboard() {
  return (
    <DashboardHeader>
      <div className="container_table">
        <input type="text" placeholder="Pesquisar.." />
        <TableData />
      </div>
    </DashboardHeader>
  );
}

export default Dashboard;
