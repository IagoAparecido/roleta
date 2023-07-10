import "./styles.css";
import { useForm } from "react-hook-form";
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
  const [course, setCourse] = useState("");
  const [id, setId] = useState("");

  const [options] = useState([
    { textColor: "#000000", backgroundColor: "#6ede8a", option: "10%" },
  ]);

  const [emptyCourse, setEmptyCourse] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");

  const [open1, setOpen1] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleOpenDialog = (row) => {
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
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/course")
      .then((res) => res.json())
      .then((data) => {
        setDataValue(data);
      });
  };
  const handleSubmiteCourse = async () => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/course", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: course,
          value: options,
        }),
      });

      if (response.ok) {
        alert("Curso adicionado com sucesso");
        handleClose1();
      }
    } catch (error) {
      alert("Erro ao adicionar curso");

      console.error(error);
      handleClose1();
    }
  };
  const handleDeleteCourse = async () => {
    event.preventDefault();
    const confirmed = window.confirm("Tem certeza que deseja excluir o curso?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/course/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Curso removido com sucesso");
        window.location.reload();
      }
    } catch (error) {
      alert("Erro ao remover curso");

      console.error(error);
    }
  };

  const handleUpdateItemCourse = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`http://localhost:3000/course/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: [
            {
              option: data.valueUpdate,
              backgroundColor: data.backgroundColorUpdate,
              textColor: data.textColorUpdate,
            },
          ],
        }),
      });
      if (response.ok) {
        alert("Item alterado com sucesso");
        handleClose2();
        reset();
        window.location.reload();
      }
    } catch (error) {
      alert("Erro ao alterar item");
      handleClose2();
      console.error(error);
    }
  };

  // const handleDeleteItemCourse = async () => {
  //   event.preventDefault();
  //   const confirmed = window.confirm("Tem certeza que deseja excluir o item?");
  //   if (!confirmed) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`http://localhost:3000/course/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.ok) {
  //       alert("Curso removido com sucesso");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     alert("Erro ao remover curso");

  //     console.error(error);
  //   }
  // };

  const fetchNewData = () => {
    const selectedOption = dataValue.find(
      (item) => item.course === valueSelect
    );

    if (selectedOption) {
      setId(selectedOption._id);
      const newData = selectedOption.value.map((item) => ({
        option: item.option,
        style: {
          backgroundColor: `${item.backgroundColor}`,
          textColor: `${item.textColor}`,
        },
      }));

      setData(newData);
    }

    if (valueSelect === "") {
      setEmptyCourse(true);
    } else {
      setEmptyCourse(false);
    }
  };

  useEffect(() => {
    fetchNewData();
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

  return (
    <div>
      <DashboardHeader>
        <div className="container_roulette">
          <div>
            <h2>Editar Roleta</h2>
            <br />
            <h3>Cursos:</h3>
            <div className="courses_more">
              {emptyCourse ? (
                ""
              ) : (
                <button className="button_icon" onClick={handleDeleteCourse}>
                  <DeleteIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      ":hover": {
                        color: "#d50000",
                      },
                    }}
                  />
                </button>
              )}
              <Select setValueSelect={setValueSelect}>
                {dataValue.map((option, index) => (
                  <option key={index} value={option.course}>
                    {option.course}
                  </option>
                ))}
              </Select>

              <div className="div_addCourse">
                <button className="button_add" onClick={handleClickOpen}>
                  <AddIcon />
                  Adicionar novo curso
                </button>
              </div>

              <Dialog
                maxWidth={"xs"}
                fullWidth={true}
                open={open1}
                onClose={handleClose1}
              >
                <DialogTitle>Adicionar novo curso</DialogTitle>
                <DialogContent>
                  <TextField
                    onChange={(e) => setCourse(e.target.value)}
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
                  <Button onClick={handleSubmiteCourse}>Adicionar</Button>
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
                  {rows.length > 0 ? (
                    rows.map((row, index) => (
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
                          <button
                            disabled={emptyCourse}
                            className="button_icon"
                            onClick={() => handleOpenDialog(row)}
                          >
                            <EditIcon />
                          </button>
                          <button
                            disabled={emptyCourse}
                            className="button_icon"
                          >
                            <DeleteIcon
                              sx={{
                                color: "red",
                                cursor: "pointer",
                                ":hover": {
                                  color: "#d50000",
                                },
                              }}
                            />
                          </button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
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
                  )}

                  <StyledTableRow disabled>
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
                      {/* <form> */}
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
                        <Button type="submit">Adicionar</Button>
                      </DialogActions>
                      {/* </form> */}
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
              <form onSubmit={handleSubmit(handleUpdateItemCourse)}>
                <DialogTitle>Editar opções</DialogTitle>
                <DialogContent>
                  <div className="textField_dialog">
                    <TextField
                      {...register("valueUpdate")}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Novo Prêmio"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={selectedValue}
                    />
                  </div>
                  <div className="textField_dialog">
                    <TextField
                      {...register("backgroundColorUpdate")}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Novo Background"
                      type="text"
                      fullWidth
                      defaultValue={selectedBackgroundColor}
                      variant="standard"
                    />
                  </div>
                  <div className="textField_dialog">
                    <TextField
                      {...register("textColorUpdate")}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Novo TextColor"
                      type="text"
                      fullWidth
                      variant="standard"
                      defaultValue={selectedTextColor}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" onClick={handleCloseDialog}>
                    Alterar
                  </Button>
                </DialogActions>
              </form>
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
