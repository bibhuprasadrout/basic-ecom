import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  getCart, // Assuming you named your fetch thunk 'getCart' in your utils
  addOneItemToCart,
  removeOneItemFromCart,
  deleteProductFromCart,
} from "../utils";

const CartPage = () => {
  const dispatch = useDispatch();
  // 1. Read the state from your slice
  const { data: cart, status, error } = useSelector((state) => state.cart);

  // 2. Fetch the cart when the page loads
  useEffect(() => {
    if (status === "idle") {
      dispatch(getCart());
    }
  }, [status, dispatch]);

  // 3. Extract data from the backend mirror
  // Ensure items defaults to an array, not an object
  const items = useMemo(() => cart?.items || [], [cart?.items]);
  const grandTotal = useMemo(() => cart?.totalPrice || 0, [cart?.totalPrice]);
  const totalItems = useMemo(() => cart?.totalItems || 0, [cart?.totalItems]);

  // 5. Handle Loading and Error states
  if (status === "loading" && items.length === 0) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <span className='loading loading-spinner loading-lg text-primary'></span>
      </div>
    );
  }

  if (error && error != "Cart is empty.") {
    return (
      <div className='text-error text-center mt-10 font-bold'>
        Error: {error}
      </div>
    );
  }

  if (error == "Cart is empty." || items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] bg-base-100'>
        <h2 className='text-3xl font-bold mb-4'>Your cart is empty.</h2>
        <Link to='/' className='btn btn-primary'>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

      {/* Main Layout: Cart Items */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Side: Product List */}
        <div className='flex-1 space-y-4'>
          <div className='hidden sm:flex justify-between text-base-content/70 text-sm font-semibold px-4 pb-2 border-b border-base-300'>
            <span>Product</span>
            <span className='text-right'>Line Total</span>
          </div>

          {items.map((item) => (
            <div
              key={item.productRef._id}
              className='flex flex-col sm:flex-row items-center gap-4 p-4 bg-base-200 rounded-xl shadow-sm'>
              {/* Product Image */}
              <img
                src={item.productRef.thumbnail}
                alt={item.productRef.title}
                className='w-24 h-24 object-cover rounded-md border border-base-300'
              />

              {/* Product Details & Actions */}
              <div className='flex-1 flex flex-col gap-2 w-full'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-lg font-bold'>
                      {item.productRef.title}
                    </h3>
                    <p className='text-sm font-semibold text-base-content/70'>
                      ${item.productRef.price.toFixed(2)} each
                    </p>
                    {item.productRef.stock > 0 ? (
                      <p className='text-xs text-success mt-1'>
                        In Stock ({item.productRef.stock} left)
                      </p>
                    ) : (
                      <p className='text-xs text-error mt-1'>Out of Stock</p>
                    )}
                  </div>
                  {/* Mobile Line Total */}
                  <div className='sm:hidden font-bold text-lg'>
                    ${item.finalItemPrice.toFixed(2)}
                  </div>
                </div>

                <div className='flex items-center gap-4 mt-2'>
                  {/* Quantity Controller */}
                  <div className='join border border-base-300 rounded-lg'>
                    <button
                      className='btn btn-sm join-item bg-base-100 hover:bg-base-300'
                      onClick={() =>
                        dispatch(removeOneItemFromCart(item.productRef._id))
                      }>
                      -
                    </button>
                    <div className='btn btn-sm join-item bg-base-100 no-animation pointer-events-none w-12'>
                      {item.unitsToBuy}
                    </div>
                    <button
                      className='btn btn-sm join-item bg-base-100 hover:bg-base-300'
                      onClick={() => {
                        dispatch(addOneItemToCart(item.productRef._id));
                      }}
                      disabled={item.unitsToBuy >= item.productRef.stock}>
                      +
                    </button>
                  </div>

                  <div className='divider divider-horizontal m-0'></div>

                  {/* Action Links */}
                  <button
                    className='text-error text-sm font-semibold hover:underline flex items-center gap-1'
                    onClick={() =>
                      dispatch(deleteProductFromCart(item.productRef._id))
                    }>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='w-4 h-4'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>

              {/* Desktop Line Total */}
              <div className='hidden sm:block text-xl font-bold text-right w-32'>
                ${item.finalItemPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary (The Bill) */}
        <div className='w-full lg:w-80 shrink-0'>
          <div className='card bg-base-200 border border-base-300 shadow-sm sticky top-24'>
            <div className='card-body'>
              <h2 className='card-title text-2xl border-b border-base-300 pb-2'>
                Order Summary
              </h2>

              <div className='flex justify-between text-base-content/80 mt-2'>
                <span>Items ({totalItems}):</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className='divider my-2'></div>

              <div className='flex justify-between items-center text-xl font-extrabold text-primary'>
                <span>Order Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className='card-actions mt-6'>
                <Link
                  to='/checkout'
                  className='btn btn-primary btn-block text-lg'>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
