import PropsTypes from "prop-types";
const ProductCard = ({ product }) => {
  return (
    // <div key={product._id} className='carousel-item shrink-0 p-1'>
    //   <div className='card bg-base-100 shadow-md rounded-field min-w-90 max-w-90'>
    //     {/* thumbnail */}
    //     <figure className='bg-inherit'>
    //       <img
    //         src={product.thumbnail}
    //         alt={`${product.title} card thumbnail`}
    //         className='w-full h-70 object-cover'
    //         draggable={false}
    //       />
    //     </figure>
    //     {/* card body with all card information */}
    //     <div className='card-body  bg-base-100 rounded-2xl'>
    //       <h2 className='card-title'>{product.title}</h2>

    //       {/* star rating */}
    //       <div className='relative flex w-30 max-w-30'>
    //         <div
    //           className={`absolute right-0 top-0 h-full bg-base-100`}
    //           style={{
    //             width: `${Math.floor(100 - product.rating * 20)}%`,
    //           }}></div>
    //         {[...Array(5)].map((_, index) => (
    //           <p key={index} className='stars'>
    //             <svg
    //               width='24'
    //               height='24'
    //               viewBox='0 0 24 24'
    //               fill='gold'
    //               xmlns='http://www.w3.org/2000/svg'>
    //               <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
    //             </svg>
    //           </p>
    //         ))}
    //       </div>

    //       {/* price */}
    //       <div className='text-4xl'>{`$${product.price}`}</div>

    //       {/* orginal price and discount */}
    //       <div className=''>
    //         <span className='line-through'>{`price: $${
    //           Math.floor(
    //             (product.price +
    //               Math.floor(product.discountPercentage * product.price) /
    //                 100) *
    //               100
    //           ) / 100
    //         }`}</span>
    //         <span className='text-lg text-info p-3'>{`${product.discountPercentage}% discount`}</span>
    //       </div>
    //       {/* <p>{product.description}</p> */}
    //       <div className='card-actions justify-end'>
    //         <button className='btn btn-primary btn-xl'>Buy Now</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div key={product._id} className='carousel-item shrink-0 px-1 sm:px-2'>
      <div
        className='card bg-base-100 shadow-md rounded-field
      w-[160px] h-[260px]
      sm:w-[200px] sm:h-[320px]
      md:w-[260px] md:h-[400px]
      lg:w-[320px] lg:h-[500px]
      xl:w-[360px] xl:h-[560px]
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
                    100
                ) / 100
              }`}
            </span>
            <span className='text-info pl-1 sm:pl-2'>
              {`${product.discountPercentage}% off`}
            </span>
          </div>
          {/* CTA */}
          <div className='card-actions justify-end'>
            <button className='btn btn-primary btn-xs sm:btn-sm'>
              Buy Now
            </button>
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
