import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import React from 'react'
import FormAddMov from './FormAddMov'
import FormAddTv from './FormAddTv'
import { Link } from 'react-router-dom'

function NavbarComp(){
 
  return(
    <Navbar bg="light" variant="light">
    <Navbar.Brand 
    style={{
      position: 'absolute',
      left:'0',
      marginLeft:'10px'
    }}
    >ENTERTAIN ME</Navbar.Brand>
    <Nav className="mx-auto">
      <Nav.Link as={Link} to='/'>Home</Nav.Link>
      <Nav.Link as={Link} to='/movies' >Movies</Nav.Link>
      <Nav.Link as={Link} to='/tvseries'>Tv Series</Nav.Link>
    </Nav>
    <Form inline style={{
      position:'absolute',
      right:'0'
    }}>
      {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
      {/* <Button variant="outline-primary">Search</Button> */}
      <div style={{
        display:'flex',
        flexDirection:'row'
      }}>
      <FormAddMov/>
      <FormAddTv/>
      </div>
    </Form> 
  </Navbar>
    )
}

export default NavbarComp