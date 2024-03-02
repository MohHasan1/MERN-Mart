import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import Message from "../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cartSlice";
import styles from '../components/Product.module.css';


const CartContent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Subscribe to cart Slice of the store:
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler =  (item, qty) => {
        dispatch(addToCart({...item, qty}));
    }

    const removeFromCartHandler =  (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping')
    }



    return (
        <section>
            <h2 className='py-3'> Shopping Cart </h2>

            { cartItems.length === 0 && (<Message><strong>Your Cart is Empty <Link to='/'> Go Back </Link></strong></Message>) }
            
            <Row>
                <Col md={8}>

                    <ListGroup variant="flush">
                        { 
                            cartItems.map((item) => (
                                <ListGroupItem key={item._id} className="my-2">
                                    <Row>
                                        <Col md={3}>
                                            <Image className="mb-3" src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>

                                        <Col md={3}>
                                            <Link className={styles.product_link} to={`/product/${item._id}`}>{item.name}</Link>
                                            <h5 className="my-3">${ item.price }</h5>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Control className="mb-3" as='select' value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                                {
                                                    [...Array(item.inStock).keys()].map((q) => (
                                                        <option key={q+1} value={q+1}>{q+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>

                                        <Col>
                                            <Button  variant="cus-jet" type='button' onClick={() => removeFromCartHandler(item._id)}> <FaTrash/> </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )) 
                        }
                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card bg='cus-charcoal'>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Subtotal - { cartItems.reduce((acc, item) => acc + item.qty, 0) } Item(s) </h2>
                                <h2> ${ cartItems.reduce((acc, item) => acc+item.qty * item.price,0).toFixed(2)}</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button  type='button' className="btn-block w-100" disabled={ cartItems.length === 0} onClick={ checkOutHandler }> Proceed To Checkout</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </section>
    )
}

export default CartContent
