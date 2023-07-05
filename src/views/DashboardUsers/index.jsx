// import "./styles.css";
import { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";

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
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen1(true);
  };
  const handleOpen = () => {
    setOpen(true);
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
                <DialogTitle>Adicionar novo curso</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="E-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Senha"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <select name="" id="">
                    <option value="">Permissões</option>
                  </select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose1}>Adicionar</Button>
                </DialogActions>
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
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      kggjg
                    </StyledTableCell>
                    <StyledTableCell>khjhkj</StyledTableCell>
                    <StyledTableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <EditIcon
                        onClick={() => handleOpen()}
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
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Novo nome"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div className="textField_dialog">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Novo e-mail"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div className="textField_dialog">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nova senha"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </div>
                <select name="" id="">
                  <option value="">Permissões</option>
                </select>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Alterar</Button>
              </DialogActions>
            </Dialog>
            <br />
          </div>
        </div>
      </DashboardHeader>
    </div>
  );
}

export default DashboardRoulett;
