import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid,IconButton, Button, Collapse, Box, Backdrop, CircularProgress, InputLabel } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { DarkTableCell, DarkTableRow, gridMessageError, BackdropLoading, ElementsPaginateTable }  from '../customHooks/customComponents';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonAdd } from '../customHooks/customComponents'
import AddBoxIcon from '@material-ui/icons/AddBox';

export const Presentational=(
            {
                rows, 
                setRows, 
                clickAddBook, 
                clickEditBook, 
                clickRequestBook,
                userDetails, 
                loading,
                hasError})=>{
        
const styles = makeStyles((theme)=>({
    root: {
        '& > *': {
        borderBottom: 'unset',
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
      },
    })
    );
const classes=styles();
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    
    return (
        <React.Fragment>
        <DarkTableRow className={classes.root}>
            <DarkTableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} title="Más información del libro...">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </DarkTableCell>
            <DarkTableCell component="th" scope="row">{row.title}</DarkTableCell>
            <DarkTableCell align="right">{row.author}</DarkTableCell>
            <DarkTableCell align="right">{row.editorial}</DarkTableCell>
            <DarkTableCell>
                {
                    {
                    1: <Button variant="contained" title="Editar libro..." size="small" onClick={()=>clickEditBook(row)}>
                            <EditIcon />
                        </Button>,
                    2: "",
                    3: <Button variant="contained"  title="Solicitar préstamo..." size="small" onClick={()=>clickRequestBook(row)}>
                        <MenuBookIcon />
                    </Button>,
                    }[userDetails.profile_id]
                }
            </DarkTableCell>
        </DarkTableRow>
        <DarkTableRow>
            <DarkTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                
                <Typography variant="h5">
                Mas información
                </Typography>
                <Grid container>
                    <Grid container item xs={7}></Grid>
                    <Grid container item xs={3}>
                        <Typography variant="h6" >
                            Número de Páginas
                        </Typography>
                    </Grid>
                    <Grid container item xs={2}>
                        <Typography variant="subtitle1" >
                            {row.pages}
                        </Typography>
                    </Grid>
                    <Grid container item xs={7}></Grid>
                    <Grid container item xs={3}>
                        <Typography variant="h6" >
                            Año de publicación
                        </Typography>
                    </Grid>
                    <Grid container item xs={2}>
                        <Typography variant="subtitle1" >
                            {row.year}
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
            </Collapse>
            </DarkTableCell>
        </DarkTableRow>
        </React.Fragment>
    );
    }

    //const [ rowsPerPage, page, handleChangePage, handleChangeRowsPerPage] = ElementsPaginateTable();
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
            {(userDetails.profile_id===1 &&
                <Box mb={1}>{ButtonAdd("Agregar libro", "Agregar libro...", clickAddBook, <AddBoxIcon /> , loading)}</Box>
            )}
            {BackdropLoading(loading)}
            <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h4">
                    Mantenimiento de Libros
                </Typography>
            </Grid>
            {hasError && 
                gridMessageError("")
            }
            
            <Grid item lg={3} md={2} sm={1} xs={"auto"}></Grid>
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <DarkTableRow>
                                <DarkTableCell />
                                <DarkTableCell>{"Libro"}</DarkTableCell>
                                <DarkTableCell align="right">{"Autor"}</DarkTableCell>
                                <DarkTableCell align="right">{"Editorial"}</DarkTableCell>
                                <DarkTableCell align="left">{userDetails.profile_id===3 ? "Solicitar préstamo" : ""}</DarkTableCell>
                            </DarkTableRow>
                        </TableHead>
                        <TableBody>
                        {(rows &&
                        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row key={row.id} row={row} />
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
            <Grid item lg={3} md={2} sm={1} xs={"auto"}></Grid>
            </Grid>
        </div>
    )
}