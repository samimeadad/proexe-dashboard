import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/dashboard"><img src={ logo } style={ { width: '60px' } } alt="logoImage" className="img-fluid rounded" /></Link>
                <Navbar.Brand className="navbar mx-auto fs-2">Proexe Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default Header;