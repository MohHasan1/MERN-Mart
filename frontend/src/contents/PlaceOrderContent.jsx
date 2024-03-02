import { useEffect } from "react";
import { Button, Col, ListGroup, ListGroupItem, Row, Image, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersSlice";
import { clearCart } from "../slices/cartSlice";
import { addDecimals } from "../utils/cartUtil";


const PlaceOrderContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  const placeOrderHandler = async ()  => {
    try {

      console.log('place order submit');

      console.log(cart.cartItems);

      const res = await createOrder({
        
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,  
      
      }).unwrap();

      console.log('clear order dispatch');


      dispatch(clearCart());

      navigate(`/orders/${res._id}`);
    } catch (error) {
      console.log('place order error');

      toast.error("Unexpected Application Error!");
    }
  };
  
  useEffect(() => {
    if (!cart.shippingAddress.address)
    {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  },[cart.paymentMethod, cart.shippingAddress.address, navigate]);

  
  return (
    <section>
      <h2>Place Order</h2>
      <CheckOutSteps step1 step2 step3 step4/>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
          
            <ListGroupItem>
              <h4>Shipping</h4>
              <p className="my-3">
                <strong>Address : </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h4>Payment Method</h4>
              <p className="my-3">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h4>Ordered Items</h4>
              <div className="my-3">
                {cart.cartItems.length === 0 && <Message>Your Cart Is Empty.</Message>}
                <ListGroup variant="flush">
                  {cart.cartItems && cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>

                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col>
                          { item.qty } x ${ item.price } = ${addDecimals(item.qty*item.price)} 
                        </Col>
                        
                      </Row>
                  </ListGroupItem>
                  ))} 
                </ListGroup>
              </div>
            </ListGroupItem>

          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup >
              <ListGroupItem> 
                  <h3>Order summary</h3>
              </ListGroupItem>
              <ListGroupItem>
                    <Row className="mt-3">
                      <Col>Items:</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>Shipping:</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>Tax:</Col>
                      <Col>${cart.taxPrice}</Col>
                    </Row>
                    <Row className="my-3">
                      <Col>Total Price:</Col>
                      <Col>${cart.totalPrice}</Col>
                    </Row>
              </ListGroupItem>

              
              <Button type="button" variant="cus-jet" className="btn-block w-100" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
              
              {error && <Message variant='danger'>Error, Please Try Again later!</Message>}
              {isLoading && <Loader></Loader>}
            </ListGroup>
          </Card>
        </Col>
      </Row>

    </section>
  )
}

export default PlaceOrderContent;
