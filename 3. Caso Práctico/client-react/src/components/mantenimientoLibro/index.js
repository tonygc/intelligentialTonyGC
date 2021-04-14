import { useState, useEffect } from 'react';
import {Presentational as UserFormulario} from './presentational'
import { useFetch } from '../customHooks/requestAPI'
import { Redirect } from 'react-router-dom';

export const Container=(props)=>{
    const [dataBook, setDataBook]=useState({
        title:props.location.state.title??"",
        author:props.location.state.author??"",
        editorial:props.location.state.editorial??"",
        pages:props.location.state.pages??0,
        year:props.location.state.year??0,
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
            body:JSON.stringify(dataBook)
        }
    );
    const [back, setBack]=useState(false);
    const clearData=()=>{
        setDataBook({...dataBook, title:"", author:"", pages:0, year:0, editorial:""});
    };
    const [ response, loading, hasError] = useFetch(url,setUrl, 
        requestOptions);
    
    useEffect(()=>{
        if(response.success){
            clearData();
        }
    },[response]);

    const SubmitForm= (ev)=>{
        //setting url to call api hook
        if(!dataBook.id){
            setRequestOptions({...requestOptions, method:"POST", body:JSON.stringify(dataBook)});
            setUrl("http://localhost:3000/book/add");    
        }else{
            console.log("data json->", dataBook);
            setRequestOptions({...requestOptions, method:"PUT", body:JSON.stringify(dataBook)});
            setUrl("http://localhost:3000/book/update");
        }
        
    };

    const onChangeInput=(ev)=>{
        setDataBook({...dataBook, [ev.target.id]: ev.target.value})
    };
    const backList=()=>{
        setBack(true);
    };
    

    return(
        <div>
        {(back && 
                <Redirect to="/libro/lista" push={true} />
        )}
        <UserFormulario dataBook={dataBook} 
                        setDataBook={setDataBook} 
                        onChangeInput={onChangeInput} 
                        submitForm={SubmitForm}
                        backList={backList}
                        response={response}
                        error={hasError}
                        loading={loading}
                        />
        </div>
    )
};