import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import {Container as BrowserBooks} from './listaLibros';
import {Container as LibrarianRequests } from './listaSolicitudesBibliotecario';
import {Container as ReaderRequests } from './listaSolicitudesLector';
import {Container as FormUser} from './mantenimientoUsuario';
import {Container as BrowserUsers} from './listaUsuarios';
import {Container as FormBook} from './mantenimientoLibro';
import {Container as Login} from './login';
import { useAuthDispatch, useAuthState, logout } from './context'
import { useState } from 'react';
import { Grid, Box, Typography, Menu as MenuUI, MenuItem, Button,ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewListIcon from '@material-ui/icons/ViewList';
import ReorderIcon from '@material-ui/icons/Reorder';
import FaceIcon from '@material-ui/icons/Face';
import { useEffect } from 'react'
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <MenuUI
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    }
  }))(MenuItem);

export default function Menu(props){
    const dispatch = useAuthDispatch() // read dispatch method from context
    const user = useAuthState() //read user details from context
    const [singout, setSingOut] = useState(false);
 
    const handleLogout = () => {
        logout(dispatch) //call the logout action
        setSingOut(true);
        
        //props.history.push('/usuario/login') //navigate to logout page on logout
    }

    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return(
        <div>
            <Typography variant="h2" component="h2" align="left">
                Virtual Library
            </Typography>
            <Router>
            {(
                user.userDetails &&
                <Box display="flex" flexDirection="row-reverse">
                  <Button
                  size="large"
                  startIcon={<FaceIcon />}
                  endIcon={<ReorderIcon />}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Bienvenido {user.userDetails.first_name} {user.userDetails.last_name}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
                        user.userDetails.profile_id===1 &&
                        <StyledMenuItem
                        component={Link}
                        to="/usuario/lista"
                        >
                        <ListItemIcon>
                        <PeopleAltIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Usuarios" />
                                  </StyledMenuItem>
                        }
          {(user.userDetails.profile_id===1 || user.userDetails.profile_id===3) &&
          <StyledMenuItem
          component={Link}
          to="/libro/lista"
          >
          <ListItemIcon>
          <MenuBookIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Libros" />
                    </StyledMenuItem>
                    }
        {
                        (user.userDetails.profile_id===2
                            ) &&
                            <StyledMenuItem
                            component={Link}
                        to="/solicitudesBibliotecario"
                            >
          <ListItemIcon>
            <ViewListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Solicitudes de Préstamo" />
        </StyledMenuItem>
                    }
                    {
                        (user.userDetails.profile_id===3
                            ) &&
                            <StyledMenuItem
                            component={Link}
                        to="/solicitudesLector"
                            >
          <ListItemIcon>
            <ViewListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mis Solicitudes" />
        </StyledMenuItem>
                    }
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </StyledMenuItem>
      </StyledMenu>
                </Box>
                
            )}
                <Route path="/libro/lista" render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : <BrowserBooks {...props} />
                }
                />
                <Route path="/solicitudesBibliotecario" exact render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : ( user.userDetails.profile_id!==2 ? <Redirect to="/usuario/login" /> : <LibrarianRequests {...props} />)
                } />
                <Route path="/solicitudesLector" exact render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : ( user.userDetails.profile_id!==3 ? <Redirect to="/usuario/login" /> : <ReaderRequests {...props} />)
                } />
                <Route path="/usuario" exact render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : 
                    (user.userDetails.profile_id === 1 ?
                    <FormUser {...props} /> :
                    <FormUser {...props } location={{...props, state:user.userDetails}} />)
                } />
                <Route path="/usuario/lista" exact render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : (user.userDetails.profile_id === 1 ?
                      <BrowserUsers {...props} />
                    : <Redirect to="/usuario/login" />)
                } />
                <Route path="/libro" exact render={
                    props=> !user.userDetails ? <Redirect to="/usuario/login" /> 
                    : <FormBook {...props} />
                } />
                <Route path="/usuario/login" exact render={props=><Login {...props} location={{closeMenu:()=>handleClose}} />}/>
                <Route exact path="/">
                    <Redirect to="/usuario/Login" />
                </Route>
                {( singout && 
                    <Redirect to="/usuario/login" />
                )}
            </Router>
        </div>
    )
}