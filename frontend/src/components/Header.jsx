import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo/logo.jpg';
import {LinkContainer} from 'react-router-bootstrap'; 
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation, useLogoutUserMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutUserMutation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler =  async () =>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {

      console.log('====================================');
      console.log(error);
      console.log('====================================');
      
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>

        <LinkContainer to='/'>
          <Navbar.Brand>
            <img src={logo} width={'80'} alt='MERN Mart Logo' />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic-navbar-nav'> 
          <Nav className='ms-auto'>

            <LinkContainer to='/cart'>
              <Nav.Link>
                <FaShoppingCart/> Cart 
                {
                  cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft: '5px'}}> { cartItems.reduce((a, p) => a + p.qty, 0) }</Badge>
                  )
                }
                </Nav.Link>
            </LinkContainer>

            { 
              userInfo ? 
              (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) :
              (

                <LinkContainer to='/login'>
                  <Nav.Link><FaUser/> Sign In </Nav.Link>
                </LinkContainer>

              ) 
            } 

          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </header>
  );
}

export default Header
