import React from 'react';
import { useParams } from 'react-router-dom';
import useUsers from '../../Hooks/useUsers';

const UpdateUser = () => {
    const { userId } = useParams();
    const [ users ] = useUsers();
    const user = users.find( user => parseInt( user.id ) === parseInt( userId ) );

    return (
        <div>
            <h1>Update User: { user?.name }</h1>
        </div>
    );
};

export default UpdateUser;