import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddUser = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const users = JSON.parse( localStorage.getItem( 'users' ) );
    const [ success, setSuccess ] = useState( false );

    const validateEmail = ( email ) => {
        return String( email )
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onSubmit = data => {
        data = {
            ...data,
            address: {
                city: data.city
            }
        }
        if ( validateEmail( data.email ) ) {
            users.push( data );
            localStorage.setItem( 'users', JSON.stringify( users ) );
            setSuccess( true );
            reset();
        }

    }

    return (
        <div>
            <h1>Add a User</h1>
            <form onSubmit={ handleSubmit( onSubmit ) } className="m-5">
                <p className="fw-bold text-danger">Please submit the below form to add a new user</p>
                <input type="text" defaultValue={ ( users.length ) + 1 } { ...register( "id", { required: true } ) } />
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
                { success && <p className="text-success fw-bold">User Data Added Successfully</p> }
                <input type="submit" className="btn btn-success" />
            </form>
        </div >
    );
};

export default AddUser;