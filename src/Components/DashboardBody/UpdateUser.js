import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import useUsers from '../../Hooks/useUsers';

const UpdateUser = () => {
    // const [ users, setUsers ] = useUsers();
    const { userId } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const usersFromLocalStorage = JSON.parse( localStorage.getItem( 'users' ) );
    const selectedUser = usersFromLocalStorage?.find( user => parseInt( user?.id ) === parseInt( userId ) );

    const onSubmit = data => {
        const updatedUser = {
            ...selectedUser,
            ...data
        };
        console.log( updatedUser );
        const updatedUsers = usersFromLocalStorage.map( user => parseInt( user?.id ) === parseInt( selectedUser?.id ) ? updatedUser : user );
        // setUsers( updatedUsers );
        localStorage.setItem( 'users', JSON.stringify( updatedUsers ) );
        reset();
    }

    return (
        <div>
            <h1>Update User: <span className="text-primary">{ selectedUser?.name }</span></h1>
            <form onSubmit={ handleSubmit( onSubmit ) } className="m-5">
                <p className="fw-bold text-danger">Please submit the below form to update the user data</p>
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
                <input type="submit" className="btn btn-success" />
            </form>
        </div>
    );
};

export default UpdateUser;