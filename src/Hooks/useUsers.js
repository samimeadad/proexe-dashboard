import { useEffect, useState } from "react";

// custom hook for Users api call
const useUsers = () => {
    //react state variable for users data
    const [ users, setUsers ] = useState( [] );

    //useEffect hook since the data is being loaded from an external source
    useEffect( () => {
        //validation for local storage data. if data exist in the local storage, the state variable will be set to the data from local storage
        if ( localStorage.getItem( 'users' ) ) {
            const usersFromLocalStorage = JSON.parse( localStorage.getItem( "users" ) );
            setUsers( usersFromLocalStorage );
        }
        else {
            //if data does not exist in the local storage, the data will be loaded from an external source (given API)
            fetch( 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data' )
                .then( res => res.json() )
                .then( data => {
                    setUsers( data );
                    //after loading set the data into the local storage
                    localStorage.setItem( "users", JSON.stringify( data ) );
                } );
        }
    }, [] );

    //return users state variable and setUsers function
    return [ users, setUsers ];
}

//export the entire function for external use
export default useUsers;