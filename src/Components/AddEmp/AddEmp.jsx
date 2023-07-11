import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const AddEmp = () => {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className={"he_d"}>Home</NavLink>
                        <NavLink to="/add_emp" className={"he_d"}>Add Emp</NavLink>
                        <NavLink to="/view_emp" className={"he_d"}>View Emp</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default AddEmp;
