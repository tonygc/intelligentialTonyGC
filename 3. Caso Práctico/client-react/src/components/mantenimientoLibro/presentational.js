import { TextField, Grid, Box, Typography } from '@material-ui/core'
import { ButtonSave, ButtonCancel, gridMessageError } from '../customHooks/customComponents'

export const Presentational=(
    {
        dataBook, 
        setDataBook,
        onChangeInput,
        submitForm,
        backList,
        response,
        loading,
        error
    })=>{
return (
    <div>
        <Grid container spacing={2}>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={8} sm={10} xs={12}>
                <Typography variant="h4">
                    Mantenimiento de Libros
                </Typography>
            </Grid>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
            {error && 
                gridMessageError(error)
            }
            {(response &&
                response.success===false) &&
                gridMessageError(response.error)
            }
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        label="Título"
                        variant="outlined"
                        value={dataBook.title} 
                        disabled={loading}
                        onChange={(ev)=> onChangeInput(ev)}
                    />
                </Grid>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
            <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="author"
                        label="Autor"
                        variant="outlined"
                        value={dataBook.author} 
                        disabled={loading}
                        onChange={(ev)=> onChangeInput(ev)}
                        />
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="editorial"
                    label="Editorial"
                    variant="outlined"
                    value={dataBook.editorial} 
                    disabled={loading}
                    onChange={(ev)=> onChangeInput(ev)}
                    />
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                <Grid item lg={4} md={8} sm={10} xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="pages"
                    label="Número de Páginas"
                    variant="outlined"
                    type="number"
                    value={dataBook.pages} 
                    disabled={loading}
                    onChange={(ev)=> onChangeInput(ev)}
                    />
                </Grid>
                <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={2} sm={1} xs={"auto"}></Grid>
                    <Grid item lg={4} md={8} sm={10} xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="year"
                        label="Año de publicación"
                        variant="outlined"
                        type="number"
                        value={dataBook.year} 
                        disabled={loading}
                        onChange={(ev)=> onChangeInput(ev)}
                        />
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