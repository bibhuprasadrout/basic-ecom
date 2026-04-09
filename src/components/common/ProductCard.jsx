import PropsTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate(`products/${product._id}`);
  };

  return (
    <div
      key={product._id}
      className='carousel-item shrink-0 px-1 sm:px-2'
      onClick={navigateToProductPage}>
      <div
        className='card bg-base-100 shadow-md rounded-field
        w-40 h-65
        sm:w-50 sm:h-80
        md:w-65 md:h-100
        lg:w-[320px] lg:h-125
        xl:w-90 xl:h-140
        transition-all duration-300'>
        {/* Thumbnail */}
        <figure className='h-[55%]'>
          <img
            src={product.thumbnail}
            alt={`${product.title} thumbnail`}
            className='w-full h-full object-cover rounded-t-field'
            draggable={false}
          />
        </figure>
        {/* Card Body */}
        <div className='card-body h-[45%] flex flex-col justify-between gap-0 md:gap-2 p-2 sm:p-3'>
          {/* Title */}
          <h2 className='card-title text-xs sm:text-sm md:text-base lg:text-lg truncate'>
            {product.title}
          </h2>
          {/* Star Rating */}
          <div className='relative flex items-center gap-1 p-0'>
            <div
              className='absolute right-0 top-0 h-full bg-base-100'
              style={{
                width: `${Math.floor(100 - product.rating * 20)}%`,
              }}></div>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width='16'
                height='16'
                className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'
                fill='gold'
                viewBox='0 0 24 24'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
              </svg>
            ))}
          </div>
          {/* Price */}
          <div className='text-base sm:text-lg md:text-xl font-bold'>
            {`$${product.price}`}
          </div>
          {/* Original Price & Discount */}
          <div className='text-[10px] sm:text-xs md:text-sm flex items-center'>
            <span className='line-through'>
              {`$${
                Math.floor(
                  (product.price +
                    Math.floor(product.discountPercentage * product.price) /
                      100) *
                    100,
                ) / 100
              }`}
            </span>
            <span className='text-info pl-1 sm:pl-2'>
              {`${product.discountPercentage}% off`}
            </span>
          </div>
          {/* CTA */}
          <AddToCartButton styles={"btn-xs sm:btn-sm"} product={product} />
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
