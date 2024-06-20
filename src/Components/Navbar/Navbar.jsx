import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import apis from "../../apis/apis";
import { Navigate } from "react-router";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    apis
      .isLogged()
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {});
  }, []);

  const handleLogout = () => {
    apis
      .logout()
      .then((res) => {
        
        localStorage.removeItem("access_token");
        window.location.href = "/"; 
        
        
      })
      .catch((err) => {});
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">ExamApp</Navbar.Brand>
        {isLoggedIn &&
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        }
        {isLoggedIn && (
            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="me-auto">
                <Nav.Link href="/create">Create</Nav.Link>
                </Nav>
            
                <Nav className="ml-auto">
                <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                </Button>
                </Nav>
            
            </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
