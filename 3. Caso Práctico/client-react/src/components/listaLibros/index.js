import { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import { Presentational as BrowseBooks } from './presentational'
import { Container as MyRequestsComponent } from '../listaSolicitudesLector'
import { useFetch } from '../customHooks/requestAPI';
import { useAuthState } from '../context';
export const Container=(props)=>{
    // const [rows, setRows] = useState([
    //     {title: "Cáscara de nuez", author: "Ian McEwan", editorial: "Anagrama", pages: 350, year:2000}
    //     ,{title: "Nosotros en la noche", author: "Kent Haruf", editorial: "Literatura Random House", pages: 350, year:2000}
    //     ,{title: "Los milagros prohibidos", author: "Alexis Ravelo", editorial: "Siruela",pages: 350, year:2000}
    //     ,{title: "Orthodoxia", author: "Ulises Bértolo", editorial: "Ediciones Carena", pages: 350, year:2000}
    //     ,{title: "El cuento de la criada", author: "Margaret Atwood", editorial: "Salamandra", pages: 350, year:2000}
    // ]);
    const [ itemBook, setItemBook ] = useState({});
    const [url, setUrl]=useState("http://localhost:3000/book/getAll");
    const [addBook, setAddBook]=useState(false);
    const [myRequests, setMyRequests]=useState(false);
    const { userDetails } = useAuthState();
    const [requestOptions, setRequestOptions]=useState(
        { 
            method:"GET", 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }
    );
    const [ response, loading, hasError] = useFetch(url, setUrl, requestOptions);
    
    const clickAddBook=()=>{
        setAddBook(true);
    };
    const clickEditBook=(item)=>{
        //console.log(item);
        setItemBook(item);
        clickAddBook();
    }
    const clickRequestBook=(item)=>{
        let data={id_user:userDetails.id,id_book:item.id};
        console.log("data book request", data);
        setRequestOptions(
            { ...requestOptions,
                method:"POST", 
                body:JSON.stringify(data)
            }
        );
        setUrl("http://localhost:3000/bookRequest/add");
    };
    useEffect(()=>{
        if(!response.data){
            if(response.success)
            {
                setMyRequests(true);
                //     setRequestOptions(
            //     { 
            //         headers: {
            //             'Accept': 'application/json, text/plain, */*',
            //             'Content-Type': 'application/json'
            //         },
            //         method:"GET", 
            //         body:null
            //     }
            // );
            // setUrl("http://localhost:3000/book/getAll");
            }
        }
    },[response]);
    if (addBook) {
        return <Redirect to={{
            pathname:"/libro",
            state: itemBook
        }} push={true} />;
    }
    return(
        <div>
        {myRequests===true &&
            props.history.push('/solicitudesLector')
        }
        {(response &&
            <BrowseBooks userDetails={userDetails} 
            rows={response.data} 
            clickAddBook={clickAddBook} 
            clickEditBook={clickEditBook}
            clickRequestBook={clickRequestBook}
            loading={loading}
            hasError={hasError}
            />
        )}
        </div>
    )
}