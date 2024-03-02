import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeContent = () => {

    const {data: products, isLoading, isError} = useGetProductsQuery();

    if (isLoading) {
        return <Loader/>; // Render a loading indicator
    }

    if (isError) {
        return <Message variant='danger'>{ isError.data.message || isError.error}</Message>; // Render an error message
    }

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
