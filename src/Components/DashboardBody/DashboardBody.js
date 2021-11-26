import React from 'react';
import { Container } from 'react-bootstrap';
import useUsers from '../../Hooks/useUsers';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardBody = () => {
    const [ users, setUsers ] = useUsers();

    //DELETE a Booking
    const handleDeleteUser = id => {
        const proceed = window.confirm( "Are you sure to delete the user data?" );
        if ( proceed ) {
            const url = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${ id }`;
            fetch( url, {
                method: 'DELETE'
            } )
                .then( res => res.json() )
                .then( data => {
                    if ( data.deletedCount > 0 ) {
                        const remainingUsers = users.filter( user => parseInt( user.id ) !== parseInt( id ) );
                        setUsers( remainingUsers );
                        alert( 'User Data Deleted Successfully' );
                        window.location.reload( false );
                    }
                } )
        }
    }

    return (
        <Container className="mt-5 text-start">
            <h2>Dashboard</h2>
            <div>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>City</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( user => <tr key={ user._id } >
                                <td>{ user?.id }</td>
                                <td>{ user?.name }</td>
                                <td>{ user?.username }</td>
                                <td>{ user?.email }</td>
                                <td>{ user?.address?.city }</td>
                                <td><Link to={ `/users/update/${ user.id }` }><Button className="btn btn-success ms-3"><FontAwesomeIcon icon={ faEdit } /></Button></Link></td>
                                <td><Button onClick={ () => handleDeleteUser( user.id ) } className="btn btn-danger ms-3"><FontAwesomeIcon icon={ faTrash } /></Button></td>
                            </tr> )
                        }

                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default DashboardBody;