import { useState } from "react"
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckOutSteps from "../components/CheckOutSteps"


const ShippingContent = () => {
    // Cart state:
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Shipping address: (if already in the the cart state, use that.)
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');


    // For handle continue:
    const submitHandler = (e) => {
        e.preventDefault();

        // dispatch to save shipping address in (cart state)
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        
        // then go to the payment page:
        navigate('/payment');


        console.log('submit');
    };

  return (
    <section>
        <h2>Shipping Screen</h2>
        <CheckOutSteps step1 step2 />
        <FormContainer>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="address" className="my-3">
                    <FormLabel>Address</FormLabel>
                    <FormControl type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId="city" className="my-3">
                    <FormLabel>City</FormLabel>
                    <FormControl type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId="postalCode" className="my-3">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl type="text" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId="country" className="my-3">
                    <FormLabel>Country</FormLabel>
                    <FormControl type="text" placeholder="country" value={country} onChange={e => setCountry(e.target.value)}></FormControl>
                </FormGroup>

                <Button variant='cus-jet' type='submit' className="my-3">Continue</Button>
            </Form>
        </FormContainer>
    
    
    </section>
  )
}

export default ShippingContent
