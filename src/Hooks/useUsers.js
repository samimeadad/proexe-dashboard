import { useEffect, useState } from "react";

// custom hook for Users api call
const useUsers = () => {
    const [ users, setUsers ] = useState( [] );

    useEffect( () => {
        fetch( 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data' )
            .then( res => res.json() )
            .then( data => setUsers( data ) );
    }, [ users ] );

    //store the user data in the local storage
    localStorage.setItem( 'users', JSON.stringify( users ) );

    //return users state variable and setUsers function
    return [ users, setUsers ];
}

//export the entire function for external use
export default useUsers;