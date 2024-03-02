import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from "react-bootstrap"
import CheckOutSteps from "../components/CheckOutSteps"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { savePaymentMethod } from "../slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"



const PaymentContent = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }


  return (
    <section>
        <h2>Check Out</h2>
        <CheckOutSteps step1 step2 step3/>
        <FormContainer>
            <Form onSubmit={ submitHandler}>
                <FormGroup>
                    <FormLabel as='legend'>Select Method</FormLabel>
                    <Col>
                        <FormCheck type="radio" className="my-3" label='PayPal or Credit Card' id="PayPal" name="paymentMethod" value='PayPal' checked onChange={e => setPaymentMethod(e.target.value)}></FormCheck>
                    </Col>
                </FormGroup>

                <Button variant="cus-jet" type="submit" >Continue</Button>
            </Form>
        </FormContainer>
    </section>
  )
}

export default PaymentContent
