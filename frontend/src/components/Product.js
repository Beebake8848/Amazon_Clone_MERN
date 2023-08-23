import Card from "react-bootstrap/card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;
  const { dispatch } = useContext(Store);

  const onCartPress = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button onClick={onCartPress}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
