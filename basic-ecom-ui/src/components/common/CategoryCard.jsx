import PropsTypes from "prop-types";
const CategoryCard = ({ category }) => {
  console.log("categoryCard:", category._id);

  return (
    <div
      key={category._id}
      className='card w-full max-w-[320px] h-96 shadow-sm relative overflow-hidden group'>
      <figure className='h-full'>
        <img
          src={category?.image}
          alt={`${category?.name} card image`}
          className='w-full h-full object-cover'
          draggable={false}
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/30 via-black/15 to-black/5  group-hover:from-black/30 group-hover:via-black/5 group-hover:to-transparent transition-opacity duration-300 '></div>
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
