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
  const [background, setBackground] = useState("");
  const [textcolor, setTextcolor] = useState("");

  const [open1, setOpen1] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open, setOpen] = useState(false);

  // const [selectedRow, setSelectedRow] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");

  const handleOpenDialog = (row) => {
    // setSelectedRow(row);
    setSelectedValue(row.value);
    setSelectedBackgroundColor(row.backgroundColor);
    setSelectedTextColor(row.textColor);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

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
  const handleClickOpen2 = () => {
    setOpen3(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen3(false);
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
                          onClick={() => handleOpenDialog(row)}
                          sx={{
                            cursor: "pointer",
                            ":hover": {
                              color: "gray",
                            },
                          }}
                        />

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
                      onClick={handleClickOpen2}
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

                    <Dialog
                      maxWidth={"xs"}
                      fullWidth={true}
                      open={open3}
                      onClose={handleClose2}
                    >
                      <DialogTitle>Adicionar novo item</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Prêmio"
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Background"
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="TextColor"
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose1}>Adicionar</Button>
                      </DialogActions>
                    </Dialog>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog
              BackdropProps={{
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  boxShadow: 2,
                },
              }}
              maxWidth={"xs"}
              fullWidth={true}
              open={open}
              onClose={handleCloseDialog}
            >
              <DialogTitle>Editar opções</DialogTitle>
              <DialogContent>
                <div className="textField_dialog">
                  <span>{selectedValue}</span>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Novo Prêmio"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="textField_dialog">
                  <span>{selectedBackgroundColor}</span>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Novo Background"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                  />
                </div>
                <div className="textField_dialog">
                  <span>{selectedTextColor}</span>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Novo TextColor"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={textcolor}
                    onChange={(e) => setTextcolor(e.target.value)}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Alterar</Button>
              </DialogActions>
            </Dialog>
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
