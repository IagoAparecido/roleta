import "./styles.css";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { Wheel } from "react-custom-roulette";
import Select from "../../components/Select";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";

function DashboardRoulett() {
  const [mustSpin, setMustSpin] = useState(false);
  const [valueSelect, setValueSelect] = useState("");
  const [dataValue, setDataValue] = useState([]);
  const [value, setValue] = useState("");

  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([
    {
      option: "0. ??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "1. ??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "2. ??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "3. ??",
      style: { backgroundColor: "#6ede8a", textColor: "#000000" },
    },
    {
      option: "4. ??",
      style: { backgroundColor: "#92e6a7", textColor: "#000000" },
    },
    {
      option: "5. ??",
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

    if (selectedOption) {
      let i = 0;
      const newData = selectedOption.value.map((item) => ({
        option: i++ + ". " + item.option,
        style: {
          backgroundColor: `${item.color}`,
          textColor: `${item.textColor}`,
        },
      }));
      setData(newData);
    }
  }, [valueSelect]);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const rows = data.map((item) => ({
    value: item.option,
    backgroundColor: item.style.backgroundColor,
    textColor: item.style.textColor,
  }));

  console.log(value);

  return (
    <div>
      <DashboardHeader>
        <div className="container_roulette">
          <div>
            <h2>Editar Roleta</h2>
            <br />
            <h3>Cursos:</h3>
            <div className="courses_more">
              <Select setValueSelect={setValueSelect}>
                {dataValue.map((option, index) => (
                  <option key={index} value={option.curso}>
                    {option.curso}
                  </option>
                ))}
              </Select>
              <button className="button_add" onClick={handleClickOpen}>
                <AddIcon />
                Adicionar novo curso
              </button>
              <Dialog
                maxWidth={"xs"}
                fullWidth={true}
                open={open1}
                onClose={handleClose1}
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
                  <Button onClick={handleClose1}>Adicionar</Button>
                </DialogActions>
              </Dialog>
            </div>

            <TableContainer component={Paper}>
              <Table
                sx={{ width: 600, maxWidth: 600 }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Prêmio</StyledTableCell>
                    <StyledTableCell>Background</StyledTableCell>
                    <StyledTableCell>TextColor</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {row.value}
                      </StyledTableCell>
                      <StyledTableCell>{row.backgroundColor}</StyledTableCell>
                      <StyledTableCell>{row.textColor}</StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <EditIcon
                          onClick={handleOpen}
                          sx={{
                            cursor: "pointer",
                            ":hover": {
                              color: "gray",
                            },
                          }}
                        />
                        <div style={{ backgroundColor: "pink" }}>
                          <Dialog
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                boxShadow: 2,
                                // Change the background color and transparency here
                              },
                            }}
                            maxWidth={"xs"}
                            fullWidth={true}
                            open={open}
                            onClose={handleClose}
                          >
                            <DialogTitle>Editar opções</DialogTitle>
                            <DialogContent>
                              <div className="textField_dialog">
                                <span>{row.value}</span>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Novo Prêmio"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  onChange={(e) => setValue(e.target.value)}
                                />
                              </div>
                              <div className="textField_dialog">
                                <span>{row.backgroundColor}</span>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Novo Background"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                />
                              </div>
                              <div className="textField_dialog">
                                <span>{row.textColor}</span>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Novo TextColor"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                />
                              </div>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Alterar</Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <DeleteIcon
                          sx={{
                            color: "red",
                            cursor: "pointer",
                            ":hover": {
                              color: "#d50000",
                            },
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  <StyledTableRow>
                    <StyledTableCell
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          backgroundColor: "#f1f1f1f1",
                        },
                      }}
                    >
                      <AddIcon sx={{ color: "green" }} />
                      Adicionar item
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={0}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            spinDuration={0.7}
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
