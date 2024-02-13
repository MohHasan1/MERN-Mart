import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/logo/logo.jpg'

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <img src={logo} width={'80'} alt='MERN Mart Logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'> 
            <Nav className='ms-auto'>
              <Nav.Link href='/cart' ><FaShoppingCart/> Cart</Nav.Link>
              <Nav.Link href='/login' ><FaUser/> Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header