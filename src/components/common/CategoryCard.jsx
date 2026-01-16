import PropsTypes from "prop-types";
const CategoryCard = ({ category }) => {
  return (
    <div
      key={category._id}
      className='card shadow-sm relative overflow-hidden group rounded-field
      w-[160px] h-[213px]
    sm:w-[200px] sm:h-[267px]
    lg:w-[320px] lg:h-[427px]
    xl:w-[360px] xl:h-[480px]
      transition-all duration-300'>
      <figure className='h-full'>
        <img
          src={category?.image}
          alt={`${category?.name} card image`}
          className='w-full h-full object-cover'
          draggable={false}
        />
        <div
          className='absolute inset-0
        bg-linear-to-t from-black/30 via-black/15 to-black/5
        group-hover:from-black/30 group-hover:via-black/5 group-hover:to-transparent
        transition-opacity duration-300 '></div>
      </figure>
      <div className='card-body absolute bottom-0 left-0 right-0 z-10 flex justify-center items-center text-center'>
        <h2 className='card-title text-xl font-extrabold text-white'>
          {category.name}
        </h2>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropsTypes.shape({
    _id: PropsTypes.string.isRequired,
    image: PropsTypes.string,
    name: PropsTypes.string,
  }),
};
export default CategoryCard;
