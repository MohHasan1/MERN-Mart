import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import styles from './Product.module.css';

const Product = ({ product }) => {
  return (
    <Card className={`my-3 p-3 rounded ${styles.card}`} bg='cus-charcoal' >

      <Link to={`/product/${product._id}`} className={styles.image_div}> 
        <Card.Img src={product.image} variant="top" alt={product.name} className={styles.image}/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className={styles.product_link}>
          <Card.Title as="div" className={styles.product_title}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'> <Rating value={product.rating} text={`${product.numReview}`} /> </Card.Text>

        <Card.Text className='my-2' as="h3">${product.price}</Card.Text>
      </Card.Body>

    </Card>
  )
}

export default Product
