import StarRating from "./StarRating";

const ProductListingCard = (props) => {
  const { title, image, price, rating, setProdByCat, onClick } = props;

  return (
    <>
      <div
        className='p-[1rem] mx-auto my-[1rem] xl:m-auto bg-gray-300 w-[13rem] h-[21rem] border-2 rounded-lg cursor-pointer flex flex-col gap-3'
        onClick={onClick}>
        <img
          className='h-[11rem] w-auto m-auto bg-white rounded-lg'
          src={image}
          alt='product image'
          // loading='lazy'
        />
        <div className='flex flex-col gap-2 '>
          <div>₹ {price}</div>
          <div>{title}</div>
          <div className='flex gap-3'>
            <StarRating rating={rating} />
            {rating}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductListingCard;
