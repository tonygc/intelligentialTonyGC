import { useState, useEffect } from 'react';
import {Presentational as UserFormulario} from './presentational'
import { useFetch } from '../customHooks/requestAPI'
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../context';

export const Container=(props)=>{
    const { userDetails } = useAuthState();

    const [dataUser, setDataUser]=useState({
        first_name:props.location.state.first_name??"",
        last_name:props.location.state.last_name??"",
        email:props.location.state.email??"",
        password:props.location.state.password??"",
        confirm_password: userDetails.profile_id === 3 ? props.location.state.password : props.location.state.confirm_password??"",
        phone:props.location.state.phone??"",
        profile_id:props.location.state.profile_id??3,
        id:props.location.state.id??0
    });
    
    const [url, setUrl]=useState("");
    const [requestOptions, setRequestOptions]=useState(
        { 
            method:"POST", 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dataUser)
        }
    );
    const [back, setBack]=useState(false);
    const [ response, loading, hasError, message] = useFetch(url,setUrl, 
        requestOptions);
        useEffect(()=>{
            const clearData=()=>{
                setDataUser({...dataUser, profile_id:3, first_name:"", last_name:"", email:"", password:"", confirm_password:"", phone:""});
            };

            if(response.success){
                clearData();
            }
        },[response]);
    
        const SubmitForm= (ev)=>{
            //setting url to call api hook
            if(!dataUser.id){
                setRequestOptions({...requestOptions, method:"POST", body:JSON.stringify(dataUser)});
                setUrl("http://localhost:3000/user/add");    
            }else{
                setRequestOptions({...requestOptions, method:"PUT", body:JSON.stringify(dataUser)});
                setUrl("http://localhost:3000/user/update");
            }
            
        };

    const onChangeInput=(ev)=>{
        setDataUser({...dataUser, [ev.target.id]: ev.target.value})
    };
    const backList=()=>{
        setBack(true);
    };
    return(
        <div>
            {((back && userDetails.profile_id === 1) && 
                    <Redirect to="/usuario/lista" push={true} />
            )}
            {((back && userDetails.profile_id === 3) && 
                    <Redirect to="/solicitudesLector" push={true} />
            )}
            <UserFormulario dataUser={dataUser} 
                            setDataUser={setDataUser} 
                            onChangeInput={onChangeInput} 
                            submitForm={SubmitForm}
                            backList={backList}
                            error={hasError}
                            response={response}
                            loading={loading}
                            message={message}
                            userDetails={userDetails}
                            />
        </div>
    )
};