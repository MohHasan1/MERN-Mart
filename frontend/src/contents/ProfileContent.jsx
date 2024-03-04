import { LinkContainer } from "react-router-bootstrap"
import { useProfileUserMutation } from "../slices/userApiSlice"
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { setCredentials } from "../slices/authSlice"
import { useEffect, useState } from "react"
import { useGetMyOrderQuery } from "../slices/ordersSlice"



const ProfileContent = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConformPassword] = useState("");

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);

    const [updateProfile, { isLoading: UpdateProfileLoader}] = useProfileUserMutation();
    const  {data:orders, isLoading, error} = useGetMyOrderQuery();

    useEffect(() => {
    
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else if (password === '') {
            toast.error("Please write in the password");
        } else {

            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password}).unwrap();
                dispatch(setCredentials(res))
                toast.success("Profile Updates")
            } catch (error) {
                toast.error("Error updating profile!")
            }   
        }
        
    }
  
  
    return (

   <section>
        <h2>My Profile</h2>

        <Row>
            <Col md={3}>
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId="name" className="my-3">
                        <FormLabel>Name</FormLabel>
                        <FormControl type="name" placeholder={userInfo.name} value={name} onChange={e => setName(e.target.value)}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="Email" className="my-3">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="Email" placeholder={userInfo.email} value={email} onChange={e => setEmail(e.target.value)}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="Password" className="my-3">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="Password" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)}></FormControl>
                    </FormGroup>
                    <FormGroup controlId="confirmedPassword" className="my-3">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl type="Password" placeholder="Confirm Your Password" value={confirmPassword} onChange={e => setConformPassword(e.target.value)}></FormControl>
                    </FormGroup>
                    <Button type='submit' variant='cus-jet' className="my-3 w-100"> Update </Button>
                    {UpdateProfileLoader && <Loader />}
                </Form>

            </Col>

            <Col md={8} className="mx-5">
                <h3>Past Orders</h3>
                { isLoading && <Loader /> }
                { error && <Message variant='danger'>Error Loading Orders</Message> }
                
                {!error && (
                    <Table striped responsive hover className="table-sm" variant="dark">
                        <thead>
                            <tr>
                                <th  style={{ color: 'white' }}>ID</th>
                                <th  style={{ color: 'white' }}>Date</th>
                                <th  style={{ color: 'white' }}>Total</th>
                                <th  style={{ color: 'white' }}> Paid</th>
                                <th  style={{ color: 'white' }}>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id}>
                                    <td style={{ color: 'white' }}>{order._id}</td>
                                    <td style={{ color: 'white' }}>{order.createdAt.substring(0, 10)}</td>
                                    <td style={{ color: 'white' }}>{order.totalPrice}</td>
                                    <td style={{ color: 'white' }}>{order.isPaid? <p>Yes</p>:<p style={{ color: 'red' }}>X</p>}</td>
                                    <td>{order.isDelivered? <p>Yes</p> :<p style={{ color: 'Red' }}>X</p>}</td> 
                                    <td><LinkContainer to={`/orders/${order._id}`}><Button className="btn-sm" variant="cus-jet">details</Button></LinkContainer></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                
            </Col>
        </Row>
   </section>
  )
}

export default ProfileContent
