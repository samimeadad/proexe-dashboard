import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

//main component to add a new user to the database
const AddUser = () => {
    //variables for react-hook-form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    //get all users from browser local storage
    const usersFromLocalStorage = JSON.parse( localStorage.getItem( 'users' ) );

    //set the state of the user to be added. if success is true then show the success message that user is added successfully
    const [ success, setSuccess ] = useState( false );

    //set the state of the error when input ID is matched with any previous Id. if error is true then show the error message that Id is already exist
    const [ error, setError ] = useState( '' );

    //hook for redirection to the home page after adding a user
    const history = useHistory();

    //Add a new user to the browser local storage database
    const onSubmit = data => {
        const matchedId = usersFromLocalStorage.find( user => parseInt( user.id ) === parseInt( data.id ) );

        if ( matchedId ) {
            setError( 'User ID already exists' );
            return;
        }

        const newUserData = {
            ...data,
            address: {
                city: data.city
            }
        }

        usersFromLocalStorage.push( newUserData );
        localStorage.setItem( 'users', JSON.stringify( usersFromLocalStorage ) );
        setSuccess( true );
        reset();
        history.push( '/dashboard' );

    }

    //Add a user in the API Server. Since the server is with fake data, I just put the code without testing. I have implemented the add function in the local storage database. Define the onSubmit function to submit the form and add a new user to the browser local storage database.

    // const onSubmit = data => {
    //      data = {
    //          ...data,
    //          address: {
    //              city: data.city
    //          }   
    //      }
    //     fetch( 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify( data )
    //     } )
    //         .then( res => res.json() )
    //         .then( data => {
    //             if ( data.insertedId ) {
    //                 alert( 'New user has been added successfully. Thank you.' );
    //             }
    //         } )
    // }

    return (
        <div>
            <h1>Add a User</h1>
            <form onSubmit={ handleSubmit( onSubmit ) } className="m-5">
                <p className="fw-bold text-danger">Please submit the below form to add a new user</p>
                <input type="text" placeholder="Id" { ...register( "id", { required: true } ) } />
                <br />
                <br />
                <input type="text" placeholder="Name" { ...register( "name", { required: true } ) } />
                <br />
                <br />
                <input type="email" placeholder="Email" { ...register( "email", { required: true } ) } />
                <br />
                <br />
                <input type="text" placeholder="User Name" { ...register( "username", { required: true } ) } />
                <br />
                <br />
                <input type="text" placeholder="City" { ...register( "city", { required: true } ) } />
                <br />
                <br />
                {/* errors will return when field validation fails  */ }
                { errors.address && <span className="text-danger fw-bold">This field is required</span> }
                {
                    error ? <p className="text-danger">{ error }</p> :
                        success && <p className="text-success fw-bold">User Data Added Successfully</p>
                }
                <Button onClick={ () => history.push( '/dashboard' ) } className="btn btn-danger me-2">Cancel</Button>
                <input type="submit" className="btn btn-success" />
            </form>
        </div >
    );
};

export default AddUser;