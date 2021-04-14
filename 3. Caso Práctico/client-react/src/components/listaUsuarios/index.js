import { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {Presentational as BrowseUsers} from './presentational'
import { useFetch } from '../customHooks/requestAPI'

export const Container=()=>{
    const [ itemUser, setItemUser ] = useState({});
    const [addUser, setAddUser]=useState(false);
    const [url, setUrl]=useState("http://localhost:3000/user/getAll");
    const [response, loading, hasError] = useFetch(url, setUrl, {method:"GET"});
    const clickAddUser=()=>{
        setAddUser(true);
    };
    const clickEditUser=(item)=>{
        item["confirm_password"]=item.password;
        setItemUser(item);
        clickAddUser();
    };
    if (addUser) {
        return <Redirect 
            to={{
                pathname:"/usuario",
                state: itemUser
            }}
            push={true} />;
    }
    return(
        <div>
        {(response &&
            <BrowseUsers 
                rows={response.data} 
                loading={loading}
                hasError={hasError}
                clickAddUser={clickAddUser} 
                clickEditUser={clickEditUser} />
        )}
        </div>
    )
};