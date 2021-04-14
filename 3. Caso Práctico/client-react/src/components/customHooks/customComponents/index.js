import { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Select,TableRow, TableCell, Button, Grid, Box, InputLabel, TextField, Backdrop, CircularProgress, FormControl, MenuItem } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const DarkTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        fontSize: 14,
        },
    },
    }))(TableRow);
export const DarkTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 20,
    },
    body: {
        fontSize: 18,
    },
    }))(TableCell);
    
    const GreenButton = withStyles((theme) => ({
        root: {
        color:"white",
          //color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[700],
          '&:hover': {
            backgroundColor: green[900],
          },
        },
      }))(Button);

export const ButtonSave = (text, clickEvent, disabled) => {
    return(
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={clickEvent}
        title={text}
        disabled={disabled}
        startIcon={<SaveIcon />}
        >
        {text}
        </Button>
    )
};
export const ButtonCancel = (text, clickEvent, disabled) => {
    return(
        <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={clickEvent}
        disabled={disabled}
        title={text}
        startIcon={<CancelIcon />}
        >
        {text}
        </Button>
    )
};
export const ButtonAdd = (text, tooltip ,clickEvent, icon, disabled) => {
    return(
        <GreenButton
        variant="contained"
        size="large"
        text={text}
        title={tooltip}
        onClick={clickEvent}
        disabled={disabled}
        startIcon={icon}
        >
        {text}
        </GreenButton>
    )
};
export const gridMessageError=(message)=>{
    return (
        <Grid container>
            <Grid item lg={3} md={2} sm={1} xs={"auto"}></Grid>
            <Grid item lg={6} md={8} sm={10} xs={12}>
                <Box display="flex" justifyContent="center">
                    <InputLabel error><ErrorIcon /> Error al procesar la solicitud. {message}</InputLabel>
                </Box>
            </Grid>
            <Grid item lg={3} md={2} sm={1} xs={"auto"}></Grid>
        </Grid>
    )
}
export const gridMessageSuccess=(message)=>{
        
    return (
        <Grid container>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={8} sm={10} xs={12}>
                <Box display="flex" justifyContent="center">
                    <InputLabel style={{color:"green"}} ><DoneIcon /> Solicitud procesada con éxito. {message}</InputLabel>
                </Box>
            </Grid>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
        </Grid>
    )
}
export const EditTextBinded=(id, label, value, onChangeInput, disabled, type="text")=>{
    return (<TextField
        required
        type={type}
        fullWidth
        id={id}
        label={label}
        variant="outlined"
        value={value} 
        disabled={disabled}
        onChange={(ev)=> onChangeInput(ev)}
    />)

};


export const BackdropLoading=(loading)=>{
    return (
        <Backdrop style={{zIndex:1000, color:"#000"}} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export function ElementsPaginateTable(){
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setRowsPerPage(rowsPerPage);
      };

    return [ rowsPerPage, page, setRowsPerPage, setPage, handleChangePage, handleChangeRowsPerPage];
}

export const SelectBinded=(id, title, values, value, handleChange, disabled)=>{
    console.log("disabled", disabled);
    console.log("value", value);
    const classes=useStyles();
    return (
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel id={id+"-label"}>{title}</InputLabel>
        <Select
          labelId={id+"-label"}
          id={id}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          label={title}
        >
            {values.map((item)=>(
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    )
}

export function ConfirmationDialog(props) {
    const { title, message, onClose, open, ...other } = props;
   
    const handleCancel = () => {
      onClose(false);
    };
  
    const handleOk = () => {
      onClose(true);
    };
  
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent dividers>
          {message}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  