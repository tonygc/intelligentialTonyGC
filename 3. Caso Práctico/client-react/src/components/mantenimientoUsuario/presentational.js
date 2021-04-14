import { Grid, Box, Typography } from '@material-ui/core';
import { SelectBinded,ButtonSave, ButtonCancel, gridMessageError, EditTextBinded, BackdropLoading, gridMessageSuccess } from '../customHooks/customComponents';

export const Presentational=(
        {
            dataUser, 
            setDataUser,
            onChangeInput,
            submitForm,
            backList,
            response,
            loading,
            error,
            message,
            userDetails
        })=>{
    return (
        <div>
            {BackdropLoading(loading)}
            <Grid container spacing={2}>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <Typography variant="h4">
                        { userDetails.profile_id===3?"Perfil de Usuario":"Mantenimiento de Usuarios" }
                    </Typography>
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
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
                {(response &&
                    response.success===true) &&
                    <Grid item xs={12}>
                        {gridMessageSuccess("")}
                    </Grid>
                }
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("first_name", "Nombre", dataUser.first_name, onChangeInput, loading)}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("last_name", "Apellido(s)", dataUser.last_name, onChangeInput, loading)}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("email", "Email", dataUser.email, onChangeInput, loading,"email")}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("phone", "Teléfono", dataUser.phone, onChangeInput, loading,"phone")}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {SelectBinded("profile_id", "Rol",[{id:1,name:"Administrador"},{id:2,name:"Bibliotecario"},{id:3,name:"Lector"}] , dataUser.profile_id, onChangeInput, (userDetails.profile_id===3?true:loading))}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("password", "Password", dataUser.password, onChangeInput, loading, "password")}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    {EditTextBinded("confirm_password", "Confirme Password", dataUser.confirm_password, onChangeInput, loading, "password")}
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            {ButtonSave("Guardar", submitForm, loading)}
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="flex-end">
                                {ButtonCancel("Cancelar", backList, loading)}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};