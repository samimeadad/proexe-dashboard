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
        <Container className="my-5 text-start">
            <h2 className="my-5">Dashboard</h2>
            <div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                    <h2>User List</h2>
                    <Link to="/users/addUser"><Button className="btn btn-primary">Add New User</Button></Link>
                </div>

                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>City</th>
                            <th>Email</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( user => <tr key={ user.id } >
                                <td>{ user?.id }</td>
                                <td>{ user?.name }</td>
                                <td>{ user?.username }</td>
                                <td>{ user?.address?.city }</td>
                                <td>{ user?.email }</td>
                                <td className="text-center"><Link to={ `/users/update/${ user.id }` }><Button className="btn btn-warning"><FontAwesomeIcon icon={ faEdit } /></Button></Link></td>
                                <td className="text-center"><Button onClick={ () => handleDeleteUser( user.id ) } className="btn btn-danger"><FontAwesomeIcon icon={ faTrash } /></Button></td>
                            </tr> )
                        }

                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default DashboardBody;