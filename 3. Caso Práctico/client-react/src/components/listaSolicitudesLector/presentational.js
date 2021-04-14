import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid, IconButton, Collapse, Box, Backdrop, CircularProgress, InputLabel, TableCell, TableRow } from '@material-ui/core';
import { DarkTableCell, DarkTableRow, gridMessageError, BackdropLoading }  from '../customHooks/customComponents';

export const Presentational=({
    requests, 
    error,
    response,
    message,
    loading
})=>{
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
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h4">
                        Mis Solicitudes
                    </Typography>
                </Grid>
                <Grid item lg={1} md={1} sm={"auto"} xs={"auto"}></Grid>
                <Grid item lg={10} md={10} sm={12} xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <DarkTableRow>
                                    <DarkTableCell>{"Libro"}</DarkTableCell>
                                    <DarkTableCell align="right">{"Fecha de Solicitud"}</DarkTableCell>
                                    <DarkTableCell align="right">{"Estatus"}</DarkTableCell>
                                    <DarkTableCell align="right">{"Fecha de Actualización"}</DarkTableCell>
                                </DarkTableRow>
                            </TableHead>
                            <TableBody>
                            {(requests &&
                            requests.slice(page * rowsPerPage??0, page * rowsPerPage + rowsPerPage).map((item) => (
                                <DarkTableRow key={item.id} style={(item.BORROWDATE && !item.DELIVERYDATE) ? { backgroundColor : "rgb(199 243 199)" } : ((item.DENEGATEDDATE) ? { backgroundColor : "rgb(251 201 197)" } :  (item.DELIVERYDATE)  ? { backgroundColor : "#8bd9fb8f" } : { backgroundColor : "rgb(255 254 169)" })}>
                                    <DarkTableCell>{item.title}</DarkTableCell>
                                    <DarkTableCell align="right">{item.REQUESTDATE}</DarkTableCell>
                                    <DarkTableCell align="right">{ (!item.BORROWDATE && !item.DENEGATEDDATE) ? "ESPERANDO AUTORIZACION" : (item.BORROWDATE && !item.DELIVERYDATE) ? "AUTORIZADO" : ((item.DENEGATEDDATE) ? "NO AUTORIZADO" : "LIBRO DEVUELTO") }
                                                </DarkTableCell>
                                    <DarkTableCell align="right">{(item.BORROWDATE && !item.DELIVERYDATE) ? item.BORROWDATE : ((item.DENEGATEDDATE) ? item.DENEGATEDDATE : item.DELIVERYDATE)}</DarkTableCell>
                                </DarkTableRow>
                            )))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={requests ? requests.length : 0 }
                            rowsPerPage={requests ? rowsPerPage : 0}
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