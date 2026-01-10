import PropsTypes from "prop-types";
const ProductCard = ({ product }) => {
  return (
    <div
      key={product._id}
      className='carousel-item shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 min-w-90 max-w-90 p-3'>
      <div className='card bg-base-100 shadow-md  rounded-2xl'>
        {/* thumbnail */}
        <figure className='bg-inherit'>
          <img
            src={product.thumbnail}
            alt={`${product.title} card thumbnail`}
            className='w-full h-70 object-cover'
            draggable={false}
          />
        </figure>
        {/* card body with all card information */}
        <div className='card-body  bg-base-100 rounded-2xl'>
          <h2 className='card-title'>{product.title}</h2>

          {/* star rating */}
          <div className='relative flex w-30 max-w-30'>
            <div
              className={`absolute right-0 top-0 h-full bg-base-100`}
              style={{
                width: `${Math.floor(100 - product.rating * 20)}%`,
              }}></div>
            {[...Array(5)].map((_, index) => (
              <p key={index} className='stars'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='gold'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
                </svg>
              </p>
            ))}
          </div>

          {/* price */}
          <div className='text-4xl'>{`$${product.price}`}</div>

          {/* orginal price and discount */}
          <div className=''>
            <span className='line-through'>{`price: $${
              Math.floor(
                (product.price +
                  Math.floor(product.discountPercentage * product.price) /
                    100) *
                  100
              ) / 100
            }`}</span>
            <span className='text-lg text-info p-3'>{`${product.discountPercentage}% discount`}</span>
          </div>
          {/* <p>{product.description}</p> */}
          <div className='card-actions justify-end'>
            <button className='btn btn-primary btn-xl'>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropsTypes.shape({
    _id: PropsTypes.string.isRequired,
    thumbnail: PropsTypes.string,
    title: PropsTypes.string,
    rating: PropsTypes.number,
    price: PropsTypes.number,
    discountPercentage: PropsTypes.number,
  }),
};
export default ProductCard;
