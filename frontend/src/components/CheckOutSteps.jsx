import { Nav, NavItem, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const CheckOutSteps = ({ step1, step2, step3, step4}) => {
  return (
   <section>

    <Nav className="justify-content-center my-3">

        <NavItem>
            { 
                step1 ? 
                (
                    <LinkContainer to='/login'>
                        <NavLink>Sign In</NavLink>
                    </LinkContainer>
                ) :
                (
                    <NavLink disabled>Sign In</NavLink>
                )
            }
        </NavItem>
        
        <NavItem>
            { 
                step2 ? 
                (
                    <LinkContainer to='/shipping'>
                        <NavLink>Shipping</NavLink>
                    </LinkContainer>
                ) :
                (
                    <NavLink disabled>Shipping</NavLink>
                )
            }
        </NavItem>

        <NavItem>
            { 
                step3 ? 
                (
                    <LinkContainer to='/payment'>
                        <NavLink>Payment</NavLink>
                    </LinkContainer>
                ) :
                (
                    <NavLink disabled>Payment</NavLink>
                )
            }
        </NavItem>

        <NavItem>
            { 
                step4 ? 
                (
                    <LinkContainer to='/payment'>
                        <NavLink>Place Order</NavLink>
                    </LinkContainer>
                ) :
                (
                    <NavLink disabled>Place Order</NavLink>
                )
            }
        </NavItem>
    </Nav>
    
   
   </section>
  )
}

export default CheckOutSteps;
