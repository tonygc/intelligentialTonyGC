import { useState } from 'react';
import {Presentational as PresentationalHistoryBooks} from './presentational';
import { useFetch } from '../customHooks/requestAPI';
import { useAuthState } from '../context';
export const Container=()=>{
    const { userDetails } = useAuthState();
    const [url, setUrl]=useState(`http://localhost:3000/bookRequest/getAll/${userDetails.id}`);
    const [ response, loading, hasError, message] = useFetch(url, setUrl);
    
    return(
        <div>
            {(response &&
                <PresentationalHistoryBooks 
                    requests={response.data} 
                    error={hasError}
                    response={response}
                    loading={loading}
                    message={message}
                />
            )}
        </div>
    )
}