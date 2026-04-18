import PropsTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const StarIcon = ({ className = "", fillColor }) => (
  <svg
    width='16'
    height='16'
    className={`w-3 h-3 sm:w-4 sm:h-4 ${className}`}
    fill={fillColor}
    viewBox='0 0 24 24'>
    <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
  </svg>
);

StarIcon.propTypes = {
  className: PropsTypes.string,
  fillColor: PropsTypes.string,
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className='w-full px-1 py-2' // Removes fixed carousel-item width for grid flexibility
      onClick={navigateToProductPage}>
      <div
        className='card bg-base-100 shadow-sm rounded-xl border border-base-300/50
        hover:border-primary transition-all duration-300 hover:shadow-md group
        w-full h-full flex flex-col overflow-hidden cursor-pointer'>
        {/* Thumbnail - Aspect Ratio Box */}
        <figure className='relative aspect-square overflow-hidden bg-base-200'>
          <img
            src={product.thumbnail}
            alt={`${product.title} thumbnail`}
            className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
            draggable={false}
          />
          {product.discountPercentage > 10 && (
            <div className='absolute top-2 left-2 badge badge-error badge-xs sm:badge-sm font-bold'>
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </figure>

        {/* Card Body */}
        <div className='p-2 sm:p-4 flex flex-col flex-grow gap-1 sm:gap-2'>
          {/* Title - Line Clamp for 2-line wrapping */}
          <h2
            className='text-[13px] leading-tight sm:text-sm md:text-base font-medium
            text-base-content line-clamp-2 h-8 sm:h-10 md:h-12 overflow-hidden'>
            {product.title}
          </h2>

          {/* Star Rating */}
          <div className='flex items-center gap-1'>
            <div className='relative flex gap-0.5 text-base-300'>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} fillColor='#D1D5DB' />
              ))}
              <div
                className='absolute top-0 left-0 flex gap-0.5 text-warning overflow-hidden'
                style={{ width: `${(product.rating / 5) * 100}%` }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    fillColor='currentColor'
                    className='shrink-0'
                  />
                ))}
              </div>
            </div>
            <span className='text-[10px] sm:text-xs opacity-60'>
              ({product.rating})
            </span>
          </div>

          {/* Price Section */}
          <div className='mt-auto pt-1'>
            <div className='flex items-baseline gap-1.5 flex-wrap'>
              <span className='text-sm sm:text-lg font-bold text-base-content'>
                {`$${product.price}`}
              </span>
              <span className='text-[10px] sm:text-xs line-through opacity-40'>
                {`$${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}`}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className='mt-1 sm:mt-2' onClick={(e) => e.stopPropagation()}>
            <AddToCartButton
              styles='btn-primary btn-xs sm:btn-sm btn-block rounded-lg'
              product={product}
            />
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
