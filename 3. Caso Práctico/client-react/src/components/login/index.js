import { Presentational as FormLogin } from './presentational';
import { useState, useEffect } from 'react';
import { useAuthDispatch, useAuthState, LoginUser } from '../context'
export function Container(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const dispatch = useAuthDispatch()
    const { loading, errorMessage, userDetails } = useAuthState() //read the values of loading and errorMessage from context
 
    useEffect(()=>{
          if(userDetails){
            switch(userDetails.profile_id){
                case 1: //Administrador
                    props.history.push('/usuario/lista')
                    break;
                case 2://Bibliotecario
                    props.history.push('/solicitudesBibliotecario')
                    break;
                case 3://Lector
                    props.history.push('/solicitudesLector')
                    break;
                default:
                    break;
            }
          }
    },[]);
    const handleLogin = async (e) => {
        e.preventDefault()
 
        try {
            let response = await LoginUser(dispatch, { email, password })
                if (!response) return
            setTimeout(props.location.closeMenu(),10);
            switch(response.profile_id){
                case 1: //Administrador
                    props.history.push('/usuario/lista')
                    break;
                case 2://Bibliotecario
                    props.history.push('/solicitudesBibliotecario')
                    break;
                case 3://Lector
                    props.history.push('/solicitudesLector')
                    break;
                default:
                    break;
            }
            
        } catch (error) {
            dispatch({ type: 'LOGIN_ERROR', error: error.message });
        }
    }

    return (
        <FormLogin 
        email={email} 
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loading={loading}
        errorMessage={errorMessage}
        userDetails={userDetails}
        />
    )
}
 