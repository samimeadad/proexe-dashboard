import React from 'react';
import { useForm } from "react-hook-form";

const AddUser = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const users = JSON.parse( localStorage.getItem( 'users' ) );

    const onSubmit = data => {
        const updatedUsers = {
            ...users,
            ...data
        };
        console.log( updatedUsers );
        localStorage.setItem( 'users', JSON.stringify( [ updatedUsers ] ) );
        reset();

    }

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
                <br /><br />
                <input type="submit" className="btn btn-success" />
            </form>
        </div >
    );
};

export default AddUser;