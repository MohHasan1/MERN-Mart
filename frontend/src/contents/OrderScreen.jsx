import { Col, ListGroup, ListGroupItem, Row, Image, Card, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../slices/ordersSlice"
import { addDecimals } from "../utils/cartUtil"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const OrderScreen = () => {
    const {id:orderId} = useParams(); 
    const { data:order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading:loadPayPal }] = usePayOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data:paypal,  isLoading: payPalLoading, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector(state => state.auth);


    const onApprovedTest = async () => {
      await payOrder({orderId, details: {payer: {}} });
      refetch();
      toast.success('payment successfull');
    };

    const onApprove = (data, actions) => {
      return actions.order.capture().then( async function (details) {

        try {
          await payOrder({orderId, details});
          refetch();
          toast.success('payment successfull');
        } catch (error) {
          toast.error("payment failed");
        }
      });
    };

    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount:{ value: order.totalPrice }
        }]
      }).then((orderId) => { return orderId });
    };

    const onError = (err) => {
      toast.error(err.message);
    };

    useEffect(() => {
      if (!errorPayPal && !loadPayPal && paypal?.clientId)
      {
        const loadPayPalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
            }
          });
          paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
        }
        if (order && !order.isPaid) {
          if (!window.paypal)
          {
            loadPayPalScript();
          }
        }
      }
    }, [order, paypal, paypalDispatch, loadPayPal, errorPayPal])

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

              { !order.isPaid && (
                <ListGroupItem>
                  {loadPayPal && <Loader />}
                  {isPending && <Loader />}
                  {
                    !isPending && 
                    <div>
                      <Button type="button" className="btn-block my-3 w-100" variant="cus-jet" onClick={onApprovedTest}>Test Pay Now</Button> 
                      <div> <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} /></div>
                    </div>
                  }
                </ListGroupItem>
              )
             }
              
            </ListGroup>
          </Card>
        </Col>
        </Row>
    </section>
  )
}

export default OrderScreen;
