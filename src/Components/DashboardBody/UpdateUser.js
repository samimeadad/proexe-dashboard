import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const UpdateUser = () => {
    //extract the matched user Id from the url path
    const { userId } = useParams();

    //variables for react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    //set the state of the user to be updated. if success is true then show the success message that user is updated successfully
    const [ success, setSuccess ] = useState( false );

    //hook for redirection to the home page after adding a user
    const history = useHistory();

    //get all users from browser local storage
    const usersFromLocalStorage = JSON.parse( localStorage.getItem( 'users' ) );

    //select the required user by matching the url path parameter (userId) and user Id from the local storage database
    const selectedUser = usersFromLocalStorage?.find( user => parseInt( user?.id ) === parseInt( userId ) );

    //Update user data in the browser local storage
    const onSubmit = data => {
        data = {
            ...data,
            address: {
                city: data.city
            }
        }
        const updatedUser = {
            ...selectedUser,
            ...data
        };
        const updatedUsers = usersFromLocalStorage.map( user => parseInt( user?.id ) === parseInt( selectedUser?.id ) ? updatedUser : user );
        localStorage.setItem( 'users', JSON.stringify( updatedUsers ) );
        setSuccess( true );
        history.push( '/dashboard' )
        reset();
    }

    //Update a user in the API Server. Since the server is with fake data, I just put the code without testing. I have implemented the add function in the local storage database. Define the onSubmit function to submit the form and update the user to the browser local storage database.

    // const onSubmit = ( id, data ) => {
    //      data = {
    //          ...data,
    //          address: {
    //              city: data.city
    //          }
    //      }
    //     const url = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${ id }`;
    //     fetch( url, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify( data )
    //     } )
    //         .then( res => res.json() )
    //         .then( data => {
    //             if ( data.modifiedCount > 0 ) {
    //                 alert( 'User Data Update Successful' );
    //                 history.push('/dashboard');
    //             }
    //         } )
    // }

    return (
        <div className="my-5">
            <h1>Update User: <span className="text-primary">{ selectedUser?.name }</span></h1>
            <form onSubmit={ handleSubmit( onSubmit ) } className="m-5">
                <p className="fw-bold text-danger">Please Submit the below form to update the user data or press Cancel to return back to your dashboard</p>
                <input type="text" defaultValue={ selectedUser?.name } { ...register( "name", { required: true } ) } />
                <br />
                <br />
                <input type="email" defaultValue={ selectedUser?.email } { ...register( "email", { required: true } ) } />
                <br />
                <br />
                <input type="text" defaultValue={ selectedUser?.username } { ...register( "username", { required: true } ) } />
                <br />
                <br />
                <input type="text" defaultValue={ selectedUser?.address?.city } { ...register( "city", { required: true } ) } />
                <br />
                <br />
                {/* errors will return when field validation fails  */ }
                { errors.address && <span className="text-danger fw-bold">This field is required</span> }
                { success && <p className="text-success fw-bold">User Data Updated Successfully</p> }
                <Button onClick={ () => history.push( '/dashboard' ) } className="btn btn-danger me-2">Cancel</Button>
                <input type="submit" className="btn btn-success" />
            </form>
        </div>
    );
};

export default UpdateUser;