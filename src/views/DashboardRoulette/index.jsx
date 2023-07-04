import { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Wheel } from "react-custom-roulette";
import "./styles.css";
import Select from "../../components/Select";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function DashboardRoulett() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [valueSelect, setValueSelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataValue, setDataValue] = useState([]);
  const [newDataValue, setNewDataValue] = useState([]);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
  ]);

  useEffect(() => {
    fetch("../../data.json")
      .then((res) => res.json())
      .then((data) => {
        setDataValue(data);
      });
  }, []);

  useEffect(() => {
    const selectedOption = dataValue.find((item) => item.curso === valueSelect);
    setNewDataValue(selectedOption);

    if (selectedOption) {
      const newData = selectedOption.value.map((item) => ({
        option: item.option,
        style: { backgroundColor: `${item.color}`, textColor: "#000000" },
      }));
      setData(newData);
    }
  }, [valueSelect]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DashboardHeader>
        <div className="container_roulette">
          <div>
            <h2>Editar Roleta</h2>
            <br />
            <div>
              <h3>Cursos:</h3>
              <Select setValueSelect={setValueSelect}>
                {dataValue.map((option, index) => (
                  <option key={index} value={option.curso}>
                    {option.curso}
                  </option>
                ))}
              </Select>
            </div>
            <button className="button_add" onClick={handleClickOpen}>
              <AddIcon />
              Adicionar novo curso
            </button>
            <Dialog
              maxWidth={"xs"}
              fullWidth={true}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Adicionar novo curso</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Curso..."
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Adicionar</Button>
              </DialogActions>
            </Dialog>
          </div>
          <Wheel
            mustStartSpinning={mustSpin}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            spinDuration={0.7}
            prizeNumber={prizeNumber}
            textColors={["#999"]}
            fontSize={18}
            fontWeight={400}
            radiusLineColor="#6ede8a"
            outerBorderWidth={2}
            outerBorderColor={"#6ede8a"}
            innerRadius={11}
            innerBorderColor={"#6ede8a"}
            innerBorderWidth={8}
            radiusLineWidth={2}
            pointerProps={{ src: "../pointer-2.svg" }}
          />
        </div>
      </DashboardHeader>
    </div>
  );
}

export default DashboardRoulett;
