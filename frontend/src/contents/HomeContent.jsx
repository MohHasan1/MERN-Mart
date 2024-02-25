import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import products from '../assets/testApi/products' // From product json
import Product from '../components/Product';
import { useEffect, useState } from 'react';


const HomeContent = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <section>
            <h2 className='py-3 '>Latest Products</h2>
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
    );
}

export default HomeContent
