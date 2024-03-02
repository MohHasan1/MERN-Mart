import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetSingleProductQuery } from "../slices/productsApiSlice";
import { useDispatch }  from "react-redux";
import { addToCart } from "../slices/cartSlice";


const ProductContent = () => {
  
  const { id:productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // quantity state:
  const [qty, setQty] = useState(1);

  // Get data from the server using RTX Query:
  const { data:product, isLoading, isError } = useGetSingleProductQuery(productId);

  // Onclick cart handler
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) {
    return <Loader/>; // Render a loading indicator
  }

  if (isError) {
    return <Message variant='danger'><h1>Error fetching data</h1></Message>; // Render an error message
  }


  return (
    <section>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                <ListGroup.Item> <Rating value={product.rating} text={product.numReview} /> </ListGroup.Item>
                <ListGroup.Item> <h3>Price: ${product.price}</h3> </ListGroup.Item>
            </ListGroup>

            <Card>
                <ListGroup>
                  <ListGroupItem> 
                      <Row className="mx-auto">
                        <Col><strong >Status:</strong></Col>
                        <Col> 
                            <strong> {product.inStock > 0 ? 'In Stock' : 'Out of Stock'} </strong>
                        </Col>
                      </Row>
                  </ListGroupItem>
                </ListGroup>
            </Card>

            <Card>
                <ListGroup>
                  {
                    product.inStock > 0 && (
                      <ListGroupItem className='my-2'>
                        <Row  className="mx-auto">
                          <Col className="my-auto"><strong>Qty:</strong></Col>
                          <Col className="my-auto">
                            <Form.Control as='select' value={qty} onChange={(event) => setQty(Number(event.target.value))}>
                              { [...Array(product.inStock).keys()].map((q) => (<option keys={q+1} value={q+1}>{q+1}</option>)) }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )
                  }
                </ListGroup>
            </Card>

            <Card className="my-3">
              <Button variant="cus-blue" className="btn-block" type="button" disabled={product.inStock === 0} onClick={addToCartHandler}> 
                Add To Cart
              </Button>
            </Card>

        </Col>

      </Row>

      <Row>
        
        <Col className="my-3">
            <strong>{product.description}</strong>
        </Col>
      
      </Row>
    </section>
  )
}


export default ProductContent;