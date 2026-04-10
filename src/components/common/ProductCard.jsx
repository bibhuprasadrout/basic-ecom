import PropsTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const StarIcon = ({ className = "", fillColor }) => (
  <svg
    width='16'
    height='16'
    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${className}`}
    fill={fillColor} // This is the secret to theme-ready colors
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
    navigate(`products/${product._id}`);
  };

  return (
    // <div
    //   key={product._id}
    //   className='carousel-item shrink-0 px-1 sm:px-2'
    //   onClick={navigateToProductPage}>
    //   <div
    //     className='card bg-base-100 shadow-md rounded-field
    //     w-40 h-65
    //     sm:w-50 sm:h-80
    //     md:w-65 md:h-100
    //     lg:w-[320px] lg:h-125
    //     xl:w-90 xl:h-140
    //     transition-all duration-300'>
    //     {/* Thumbnail */}
    //     <figure className='h-[55%]'>
    //       <img
    //         src={product.thumbnail}
    //         alt={`${product.title} thumbnail`}
    //         className='w-full h-full object-cover rounded-t-field'
    //         draggable={false}
    //       />
    //     </figure>
    //     {/* Card Body */}
    //     <div className='card-body h-[45%] flex flex-col justify-between gap-0 md:gap-2 p-2 sm:p-3'>
    //       {/* Title */}
    //       <h2 className='card-title text-xs sm:text-sm md:text-base lg:text-lg truncate'>
    //         {product.title}
    //       </h2>
    //       {/* Star Rating */}
    //       <div className='relative flex items-center gap-1 p-0'>
    //         <div
    //           className='absolute right-0 top-0 h-full bg-base-100'
    //           style={{
    //             width: `${Math.floor(100 - product.rating * 20)}%`,
    //           }}></div>
    //         {[...Array(5)].map((_, i) => (
    //           <svg
    //             key={i}
    //             width='16'
    //             height='16'
    //             className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'
    //             fill='gold'
    //             viewBox='0 0 24 24'>
    //             <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
    //           </svg>
    //         ))}
    //       </div>
    //       {/* Price */}
    //       <div className='text-base sm:text-lg md:text-xl font-bold'>
    //         {`$${product.price}`}
    //       </div>
    //       {/* Original Price & Discount */}
    //       <div className='text-[10px] sm:text-xs md:text-sm flex items-center'>
    //         <span className='line-through'>
    //           {`$${
    //             Math.floor(
    //               (product.price +
    //                 Math.floor(product.discountPercentage * product.price) /
    //                   100) *
    //                 100,
    //             ) / 100
    //           }`}
    //         </span>
    //         <span className='text-info pl-1 sm:pl-2'>
    //           {`${product.discountPercentage}% off`}
    //         </span>
    //       </div>
    //       {/* CTA */}
    //       <AddToCartButton styles={"btn-xs sm:btn-sm"} product={product} />
    //     </div>
    //   </div>
    // </div>
    <div
      key={product._id}
      className='carousel-item shrink-0 px-1 sm:px-2'
      onClick={navigateToProductPage}>
      <div
        className='card bg-base-100 shadow-md rounded-field
        border border-base-300/50 hover:border-primary
        w-40 h-65
        sm:w-50 sm:h-80
        md:w-65 md:h-100
        lg:w-[320px] lg:h-125
        xl:w-90 xl:h-140
        transition-all duration-300 hover:shadow-xl group'>
        {/* Thumbnail */}
        <figure className='h-[55%] overflow-hidden'>
          <img
            src={product.thumbnail}
            alt={`${product.title} thumbnail`}
            className='w-full h-full object-cover rounded-t-field transition-transform duration-500 group-hover:scale-105'
            draggable={false}
          />
        </figure>

        {/* Card Body */}
        <div className='card-body h-[45%] flex flex-col justify-between gap-0 md:gap-2 p-2 sm:p-4'>
          {/* Title */}
          <h2 className='card-title text-xs sm:text-sm md:text-base lg:text-lg truncate text-base-content'>
            {product.title}
          </h2>

          {/* Star Rating - Theme Ready Logic */}
          <div className='relative flex items-center gap-1 p-0'>
            {/* We use a mask approach that works better with theme backgrounds than a solid div */}
            <div className='relative flex gap-1 text-base-300'>
              {/* Background Stars (Empty/Gray) */}
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} fillColor='gray' />
              ))}

              {/* Overlapping Gold Stars (Filled) */}
              <div
                className='absolute top-0 left-0 flex gap-1 text-warning overflow-hidden transition-all duration-1000'
                style={{
                  width: `${(product.rating / 5) * 100}%`,
                  whiteSpace: "nowrap", // Prevents stars from wrapping to a new line when width is small
                }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    fillColor='currentColor'
                    className='shrink-0'
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className='flex flex-col'>
            <div className='text-base sm:text-lg md:text-xl font-bold text-base-content'>
              {`$${product.price}`}
            </div>

            {/* Original Price & Discount */}
            <div className='text-[10px] sm:text-xs md:text-sm flex items-center flex-wrap'>
              <span className='line-through opacity-50'>
                {`$${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}`}
              </span>
              <span className='text-success font-semibold pl-1 sm:pl-2'>
                {`${Math.round(product.discountPercentage)}% off`}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className='mt-2'>
            <AddToCartButton
              styles='btn-primary btn-xs sm:btn-sm btn-block no-animation'
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
