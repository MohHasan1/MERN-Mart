import { Col, ListGroup, ListGroupItem, Row, Image, Card, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetOrderDetailsQuery } from "../slices/ordersSlice"
import { addDecimals } from "../utils/cartUtil"


const OrderScreen = () => {

    const {id:orderId} = useParams(); 
    const { data:order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);

   if (isLoading) return <Loader />;
   if (isError) return <Message variant='danger'>Error in processing payment!</Message>;

    return (
    <section>
        <h2>Shipment Confirmation</h2>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroupItem></ListGroupItem>
                    <ListGroupItem>
                        <h3>Shipment Information</h3>
                        <p className="my-3">
                            <strong>Name: </strong> { order.user.name}
                        </p>
                        <p className="my-3">
                            <strong>Email: </strong> { order.user.email}
                        </p>
                        <p className="my-3">
                            <strong>Address: </strong> { order.shippingAddress.address } 
                        </p>
                        <p className="my-3">
                            { order.deliveredAt ? <div><strong>Delivered at: </strong> {order.deliveredAt} </div> : <Message variant='danger'>Not Delivered</Message> } 
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h3>Payment Method</h3>
                        <p className="my-3">
                            <strong>Payment Method: </strong> { order.paymentMethod } 
                        </p>
                        <p className="my-3">
                            { order.paidAt ? <div><strong>Paid at: </strong> {order.paidAt} </div> : <Message variant='danger'>Not Paid</Message> } 
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h3>Order Items</h3>
                      
                        { order.orderItems.map((item, index) => (
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>Shipping:</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>Tax:</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row className="my-3">
                      <Col>Total Price:</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
              </ListGroupItem>
                
              <Button type="button" className="btn-block my-3" variant="cus-jet">Pay Now</Button>
            </ListGroup>
          </Card>
        </Col>
        </Row>
    </section>
  )
}

export default OrderScreen;
