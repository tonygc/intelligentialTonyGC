import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { DarkTableCell, DarkTableRow, gridMessageError, BackdropLoading }  from '../customHooks/customComponents';
import { ButtonAdd } from '../customHooks/customComponents'
import AddBoxIcon from '@material-ui/icons/AddBox';

export const Presentational=({rows, setRows, clickAddUser, clickEditUser, loading, hasError})=>{
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    return(
        <div>
        {BackdropLoading(loading)}
        <Box mb={1}>{ButtonAdd("Agregar usuario", "Agregar usuario", clickAddUser, <AddBoxIcon /> ,loading)}</Box>
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h4">
                    Mantenimiento de Usuarios
                </Typography>
            </Grid>
            {hasError && 
                gridMessageError("")
            }
            <Grid item lg={1} md={1} sm={"auto"} xs={"auto"}></Grid>
            <Grid item lg={10} md={10} sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <DarkTableRow>
                                <DarkTableCell>{"Nombre"}</DarkTableCell>
                                <DarkTableCell align="right">{"Apellido"}</DarkTableCell>
                                <DarkTableCell align="right">{"Email"}</DarkTableCell>
                                <DarkTableCell align="right">{"Teléfono"}</DarkTableCell>
                                <DarkTableCell align="right">{"Rol"}</DarkTableCell>
                                <DarkTableCell />
                            </DarkTableRow>
                        </TableHead>
                        <TableBody>
                        {(rows &&
                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <DarkTableRow>
                                <DarkTableCell>{item.first_name}</DarkTableCell>
                                <DarkTableCell>{item.last_name}</DarkTableCell>
                                <DarkTableCell>{item.email}</DarkTableCell>
                                <DarkTableCell>{item.phone}</DarkTableCell>
                                <DarkTableCell> {
                                {
                                    1: "Administrador",
                                    2: "Bibliotecario",
                                    3: "Lector",
                                    }[ item.profile_id ]
                                }
                                </DarkTableCell>
                                <DarkTableCell>
                                <Button variant="contained" title="Editar usuario..." size="small" onClick={()=>clickEditUser(item)}>
                            <EditIcon />
                        </Button>,
                                </DarkTableCell>
                            </DarkTableRow>
                        )))}
                        </TableBody>
                    
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows ? rows.length : 0 }
                        rowsPerPage={rows ? rowsPerPage : 0}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage} />
                    </TableContainer>
            </Grid>
            <Grid item lg={1} md={1} sm={"auto"} xs={"auto"}></Grid>
            </Grid>
        </div>
    )
}