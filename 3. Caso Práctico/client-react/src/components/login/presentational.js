import { Grid, Box, Typography } from '@material-ui/core';
import { ButtonAdd, gridMessageError, EditTextBinded, BackdropLoading } from '../customHooks/customComponents';
import ForwardIcon from '@material-ui/icons/Forward';

export function Presentational(props) {

    return (
        <div>
            <Grid container spacing={2}>
            <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                <Typography variant="h3" component="h2" align="center">
                    Login
                </Typography>
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                {props.errorMessage && 
                    gridMessageError(props.errorMessage)
                }
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                    {EditTextBinded("email", "Email", props.email, (e) => props.setEmail(e.target.value), props.loading)}
                </Grid>
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                    {EditTextBinded("password", "Password", props.password, (e) => props.setPassword(e.target.value), props.loading, "password")}
                </Grid>
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={6} sm={10} xs={12}>
                <Box display="flex" justifyContent="flex-end">
                    {ButtonAdd("Login","", props.handleLogin, <ForwardIcon />, props.loading)}
                </Box>
                </Grid>
                <Grid item lg={4} md={3} sm={1} xs={"auto"}></Grid>
                </Grid>
                
        </div>
    )
}