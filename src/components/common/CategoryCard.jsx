import PropsTypes from "prop-types";
import { Link } from "react-router-dom";
const CategoryCard = ({ category }) => {
  return (
    <div>
      <Link
        to={`/products?category=${category?.slug}&page=2&limit=10`}
        key={category?._id}
        className='link link-hover'>
        <div
          key={category._id}
          className='card shadow-sm relative overflow-hidden group rounded-field
      w-40 h-53.25
      sm:w-50 sm:h-66.75
      lg:w-[320px] lg:h-106.75
      xl:w-90 xl:h-120
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
              {category?.name}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropsTypes.shape({
    _id: PropsTypes.string.isRequired,
    image: PropsTypes.string,
    name: PropsTypes.string,
    slug: PropsTypes.string,
  }),
};
export default CategoryCard;
