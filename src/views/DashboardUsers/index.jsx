// import "./styles.css";
import { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import { useForm } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

function DashboardRoulett() {
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    var bearer = "Bearer " + localStorage.getItem("token");

    fetch("https://roleta-back.vercel.app/user", {
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

  const { register, handleSubmit, reset } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    reset();
  };
  const handleClickOpen = () => {
    setOpen1(true);
  };
  const handleOpen = (item) => {
    setOpen(true);
    setId(item._id);
  };
  const handleClose1 = () => {
    setOpen1(false);
    reset();
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

  const handleCreateAcount = async (data) => {
    setError(false);
    event.preventDefault();
    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://roleta-back.vercel.app/user/auth/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            status: data.status,
          }),
        }
      );

      if (response.status === 422) {
        setError(true);
      } else {
        setError(false);
      }

      if (response.ok) {
        alert("Usuário criado com sucesso");
        handleClose1();
        reset();
        fetchData();
      } else {
        alert("Erro ao criar usuário");
      }
    } catch (error) {
      alert("Erro ao criar usuário");
      handleClose1();
    }
  };

  const handleUpdateAcount = async (data) => {
    event.preventDefault();

    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://roleta-back.vercel.app/user/${id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            status: data.status,
          }),
        }
      );
      if (response.ok) {
        alert("Dados alterados com sucesso");
        handleCloseDialog();
        reset();
        fetchData();
      } else {
        alert("Erro ao alterar dados");
      }
    } catch (error) {
      alert("Erro ao alterar item");
      handleCloseDialog();
      reset();
    }
  };
  const handleDeleteAcount = async (item) => {
    event.preventDefault();
    const confirmed = window.confirm("Tem certeza que deseja excluir o curso?");
    if (!confirmed) {
      return;
    }

    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://roleta-back.vercel.app/user/${item._id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );

      if (response.ok) {
        alert("Usuário Removido com sucesso");

        reset();
        fetchData();
      } else {
        alert("Erro ao remover usuário");
      }
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  };

  const emailCheck = localStorage.getItem("email");

  return (
    <div>
      <DashboardHeader>
        <div className="container_roulette">
          <div>
            <h2>Usuários</h2>

            <div className="courses_more">
              <button className="button_add" onClick={handleClickOpen}>
                <AddIcon />
                Adicionar novo Usuário
              </button>
              <Dialog
                maxWidth={"xs"}
                fullWidth={true}
                open={open1}
                onClose={handleClose1}
              >
                <form onSubmit={handleSubmit(handleCreateAcount)}>
                  <DialogTitle>Adicionar novo usuário</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nome"
                      type="text"
                      fullWidth
                      required
                      variant="standard"
                      {...register("name")}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="E-mail"
                      type="email"
                      {...register("email")}
                      fullWidth
                      required
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="standard-adornment-password"
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      fullWidth
                      required
                      variant="standard"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                    <select required {...register("status")}>
                      <option value="0">0 - admin</option>
                      <option value="1">1 - comercial</option>
                    </select>

                    {error && (
                      <p
                        style={{
                          textAlign: "center",
                          color: "red",
                          fontSize: 16,
                        }}
                      >
                        E-mail já cadastrado
                      </p>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit">Adicionar</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nome</StyledTableCell>
                    <StyledTableCell>E-mail</StyledTableCell>

                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell>{item.email}</StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <button
                          onClick={() => handleOpen(item)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <EditIcon
                            sx={{
                              ":hover": {
                                color: "gray",
                              },
                            }}
                          />
                        </button>

                        <Dialog
                          BackdropProps={{
                            style: {
                              backgroundColor: "rgba(0, 0, 0, 0.3)",
                              boxShadow: 2,
                            },
                          }}
                          maxWidth={"xs"}
                          fullWidth={true}
                          open={open}
                          onClose={handleCloseDialog}
                        >
                          <form onSubmit={handleSubmit(handleUpdateAcount)}>
                            <DialogTitle>Editar opções</DialogTitle>
                            <DialogContent>
                              <div className="textField_dialog">
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Novo nome"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  required
                                  {...register("name")}
                                  defaultValue={item.name}
                                />
                              </div>
                              <div className="textField_dialog">
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  label="Novo e-mail"
                                  type="text"
                                  required
                                  fullWidth
                                  value={item.email}
                                  {...register("email")}
                                  variant="standard"
                                />
                              </div>
                              <div className="textField_dialog">
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="standard-adornment-password"
                                  label="Nova senha"
                                  type={showPassword ? "text" : "password"}
                                  {...register("password")}
                                  fullWidth
                                  required
                                  variant="standard"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              </div>
                              <select
                                defaultValue={item.status}
                                required
                                {...register("status")}
                              >
                                <option value="0">0 - admin</option>
                                <option value="1">1 - comercial</option>
                              </select>
                            </DialogContent>
                            <DialogActions>
                              <Button type="submit">Alterar</Button>
                            </DialogActions>
                          </form>
                        </Dialog>
                        <button
                          disabled={emailCheck === item.email}
                          onClick={() => handleDeleteAcount(item)}
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <br />
          </div>
        </div>
      </DashboardHeader>
    </div>
  );
}

export default DashboardRoulett;
