import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
// import products from "../assets/testApi/products"
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import axios from "axios";


const ProductContent = () => {

  const { id:productId } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();

  }, [productId]);

  return (
    <div>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item> <h3>{product.name}</h3> </ListGroup.Item>
                <ListGroup.Item> <Rating value={product.rating} text={product.numReviews} /> </ListGroup.Item>
                <ListGroup.Item> <h3>Price: ${product.price}</h3> </ListGroup.Item>
            </ListGroup>

            <Card>
                <ListGroup>
                <ListGroupItem> 
                    <Row>
                        <Col><strong>Status:</strong></Col>
                        <Col> 
                            <strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </strong>
                        </Col>
                    </Row>
                </ListGroupItem>
                </ListGroup>
            </Card>

            <Card className="my-3">
                <Button className="btn-block" type="button" disabled={product.countInStock === 0 }> Add To Cart</Button>
            </Card>

        </Col>

      </Row>

      <Row>
        
        <Col className="my-3">
            <strong>{product.description}</strong>
        </Col>
      
      </Row>
    </div>
  )
}


export default ProductContent
