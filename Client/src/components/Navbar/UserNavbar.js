import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CSS/Nav.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



function UserNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('myCookie')

    axios.post('/logout');

  };
  const handleHome = () => {
    navigate("/User");
  };
  return (
    <Navbar expand="lg" className="Nav">
      <Container fluid>
        <Navbar.Brand href="#" className='Heading'>Online Voting System</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 Nav-items-container"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link className="Nav-items" onClick={handleHome}>Home</Nav.Link> */}
            <Nav.Link className="Nav-items" href="/Edit">Edit Profile</Nav.Link>
            <Nav.Link className="Nav-items" href='/Login'><Button onClick={handleLogout}>Logout</Button></Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;