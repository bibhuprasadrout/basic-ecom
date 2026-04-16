import PropsTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOneItemToCart } from "../../utils";
import { useAuth } from "../../hooks";

const AddToCartButton = ({ styles, product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useAuth();

  // 1. Grab the cart items from Redux
  const cartItems = useSelector((state) => state.cart.data?.items || []);

  // 2. Check if this specific product is already in the cart array
  // We check both item.productRef._id (if populated) or item.productRef (if just a string ID)
  const isInCart = cartItems.some((item) => {
    const itemId = item.productRef?._id || item.productRef;
    return itemId === product._id;
  });
  const handleAddToCart = (e) => {
    // 1. Stop the click from reaching the parent <div>
    e.stopPropagation();

    if (!auth) navigate("/signin", { replace: true });

    if (isInCart) {
      // If it's already in the cart, take them to the cart page
      navigate("/cart");
    } else {
      // If it's not in the cart, dispatch the add action
      dispatch(addOneItemToCart(product._id));
    }
  };
  return (
    <>
      {/* CTA */}
      <div className='card-actions justify-end'>
        <button
          className={`btn ${auth && isInCart ? "btn-secondary" : "btn-primary"} ${styles}`}
          onClick={handleAddToCart}>
          {auth && isInCart ? "Go to cart" : "Add to cart"}
        </button>
      </div>
    </>
  );
};

AddToCartButton.propTypes = {
  styles: PropsTypes.string.isRequired,
  product: PropsTypes.object.isRequired,
};

export default AddToCartButton;
