import { Row, Col, Container } from 'react-bootstrap';
import products from '../assets/testApi/products'
import Product from '../components/Product';


const HomeContent = () => {
  return (
    <section>
        <h2>Latest Products</h2>
        <Row>
            { 
                products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))
            }
        </Row>
    </section>
  )
}

export default HomeContent
