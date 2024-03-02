import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice"
import { useRegisterUserMutation } from '../slices/userApiSlice';
import { toast } from "react-toastify";

const RegisterContent = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterUserMutation();
  // subscribing to auth in store
  const { userInfo } =  useSelector(state => state.auth);

  // redirect?
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect( () => {
    if (userInfo)
    {
      navigate(redirect);
    } 

  },[userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) 
    {
      toast.error('passwords do not match!');
      return;
    } 

    try {
      const res = await register({name, email, password}).unwrap(); 
      dispatch(setCredentials({...res, }));
      navigate(redirect);
    } catch (err) {
      //toast.error(err.data.message || err.error);
      toast.error("Invalid email/password");
    }
  }

  return (
    <section>
      <h2 className="my-3">Sign Up</h2>

      <FormContainer>

        <Form onSubmit={submitHandler}> 
          <FormGroup controlId="name" className="my-2">
            <FormLabel>Name</FormLabel>
            <FormControl type="text" placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup controlId="email" className="my-2">
            <FormLabel>Email Address</FormLabel>
            <FormControl type="email" placeholder="Enter Your Email Address" value={email} onChange={e => setEmail(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup controlId="password" className="my-3">
           <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="Enter Your password" value={password} onChange={e => setPassword(e.target.value)}></FormControl>
          </FormGroup>

          <FormGroup controlId="confirmPassword" className="my-3">
           <FormLabel>Confirm Password</FormLabel>
            <FormControl type="password" placeholder="Re-Enter Your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></FormControl>
          </FormGroup>

          <Button variant="cus-jet" type='submit' className="my-3" disabled={isLoading}>Register</Button>

          { isLoading && <Loader /> }
        </Form>

        <Row>
          <Col className="py-3">
            <p>Already have an account? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}> Log in. </Link></p>
          </Col>
        </Row>
      
      </FormContainer>
    </section>
  )
}

export default RegisterContent;
