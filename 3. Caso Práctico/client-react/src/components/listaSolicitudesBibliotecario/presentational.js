import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { DarkTableCell, DarkTableRow, gridMessageError, gridMessageSuccess, BackdropLoading, ButtonAdd }  from '../customHooks/customComponents';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export const Presentational=({
                            requests, 
                            userAuth,
                            onClickDenegate,
                            onClickApprove,
                            onClickDeliver,
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
    const classes=useStyles();
    return(
        <div>
            {BackdropLoading(loading)}
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h4">
                        Solicitudes de préstamo
                    </Typography>
                </Grid>
                {error && 
                    <Grid item xs={12}>
                        {gridMessageError(error)}
                    </Grid>
                }
                {(response &&
                    response.success===false) &&
                    <Grid item xs={12}>
                        {gridMessageError(response.error)}
                    </Grid>
                }
                <Grid item lg={1} md={1} sm={"auto"} xs={"auto"}></Grid>
                <Grid item lg={10} md={10} sm={12} xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <DarkTableRow>
                                    <DarkTableCell>{"Libro"}</DarkTableCell>
                                    <DarkTableCell align="right">{"Lector"}</DarkTableCell>
                                    <DarkTableCell align="right">{"Email"}</DarkTableCell>
                                    <DarkTableCell align="left">{"Teléfono"}</DarkTableCell>
                                    <DarkTableCell align="left">{"Fecha de Solicitud"}</DarkTableCell>
                                    <DarkTableCell align="center">{"Estatus"}</DarkTableCell>
                                    <DarkTableCell align="left">{"Fecha de Actualización"}</DarkTableCell>
                                    <DarkTableCell></DarkTableCell>
                                </DarkTableRow>
                            </TableHead>
                            <TableBody>
                            {(requests &&
                            requests.slice(page * rowsPerPage??0, page * rowsPerPage + rowsPerPage).map((item) => (
                                <DarkTableRow key={item.id} style={(item.BORROWDATE && !item.DELIVERYDATE) ? { backgroundColor : "rgb(199 243 199)" } : ((item.DENEGATEDDATE) ? { backgroundColor : "rgb(251 201 197)" } :  (item.DELIVERYDATE)  ? { backgroundColor : "#8bd9fb8f" } : { backgroundColor : "rgb(255 254 169)" })}>
                                    <DarkTableCell>{item.title}</DarkTableCell>
                                    <DarkTableCell>{item.first_name} {item.last_name}</DarkTableCell>
                                    <DarkTableCell>{item.email}</DarkTableCell>
                                    <DarkTableCell>{item.phonw}</DarkTableCell>
                                    <DarkTableCell align="right">{item.REQUESTDATE}</DarkTableCell>
                                    <DarkTableCell align="center">{ (!item.BORROWDATE && !item.DENEGATEDDATE) ? "NUEVA SOLICITUD" : (item.BORROWDATE && !item.DELIVERYDATE) ? "AUTORIZADO" : ((item.DENEGATEDDATE) ? "NO AUTORIZADO" : "LIBRO DEVUELTO") }</DarkTableCell>
                                    <DarkTableCell align="left">{(item.BORROWDATE && !item.DELIVERYDATE) ? item.BORROWDATE : ((item.DENEGATEDDATE) ? item.DENEGATEDDATE : item.DELIVERYDATE)}</DarkTableCell>
                                    <DarkTableCell align="center">
                                    { (item.REQUESTDATE && !item.BORROWDATE && !item.DENEGATEDDATE ) ? 
                                        <div>
                                            <Button className={classes.button} variant="contained" startIcon={<ThumbUpIcon />} color="primary" disabled={loading} title="Autorizar solicitud..." size="large" onClick={()=>onClickApprove(item)} />
                                            <Button variant="contained" startIcon={<ThumbDownIcon />} color="secondary" disabled={loading} title="Denegar solicitud..." size="large" onClick={()=>onClickDenegate(item)} />
                                        </div>
                                        : (item.BORROWDATE && !item.DELIVERYDATE) ? 
                                        ButtonAdd("", "Libro devuelto...", ()=>onClickDeliver(item), <CheckCircleIcon /> , loading)
                                        : "" }
                                    </DarkTableCell>
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