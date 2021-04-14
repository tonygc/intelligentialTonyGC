import {useState, useEffect} from 'react';
import {Presentational as PresentationalHistoryBooks} from './presentational';
import { useFetch } from '../customHooks/requestAPI';
import { useAuthState } from '../context';
import { today } from '../utilities';
import { ConfirmationDialog }  from '../customHooks/customComponents';
export const Container=()=>{
    const [url, setUrl]=useState("http://localhost:3000/bookRequest/getAll");
    const [requestOptions, setRequestOptions]=useState(
        { 
            method:"GET", 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body:null
        }
    );
    const [openConfirm, setOpenConfirm ]=useState(false);
    const [ response, loading, hasError, message] = useFetch(url, setUrl, requestOptions);
    const { userDetails} = useAuthState();
    // const [itemSelected,setItemSelected]=useState({});
    
    // const onCloseConfirmation=(accept)=>{
    //     if(accept){

    //     }
    // }
    // ConfirmationDialog({title:"Atención",message:"¿Está seguro de aprobar la solicitud?",onClose:onCloseConfirmation, open:openConfirm});
    // const onConfirmApprove=(item)=>{
    //      setItemSelected(item);
    //      setOpenConfirm(true);
    // };
    const onClickApprove=(item)=>{
        item.BORROWDATE = today();
        setRequestOptions({...requestOptions, method:"PUT", body:JSON.stringify(item)});
        sendUpdate();
    };
    const onClickDenegate=(item)=>{
        item.DENEGATEDDATE = today();
        setRequestOptions({...requestOptions, method:"PUT", body:JSON.stringify(item)});
        sendUpdate();
    };
    const onClickDeliver=(item)=>{
        item.DELIVERYDATE = today();
        setRequestOptions({...requestOptions, method:"PUT", body:JSON.stringify(item)});
        sendUpdate();
    };
    const sendUpdate=()=>{
        setUrl("http://localhost:3000/bookRequest/update");
    };
    useEffect(()=>{
        if(!response.data){
            if(response.success)
            {
                setRequestOptions(
                    { 
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        method:"GET", 
                        body:null
                    }
                );
                setUrl("http://localhost:3000/bookRequest/getAll");
            }
        }
    },[response]);
    return(
        <div>
            {(response &&
                <PresentationalHistoryBooks 
                    requests={response.data} 
                    userAuth={userDetails}
                    onClickApprove={onClickApprove}
                    onClickDenegate={onClickDenegate}
                    onClickDeliver={onClickDeliver}
                    error={hasError}
                    response={response}
                    loading={loading}
                    message={message}
                />
            )}
        </div>
    )
}