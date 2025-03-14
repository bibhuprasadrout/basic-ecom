const CategoryCard = (props) => {
  const { title, image, setProdByCat, onClick } = props;
  return (
    <>
      <div
        className='p-1 mx-auto my-[1rem] xl:m-auto bg-gray-300 w-[13rem] h-[17rem] border-2 rounded-lg cursor-pointer'
        onClick={onClick}>
        <h4 className=' border-0 rounded-sm bg-amber-50 mx-1 mt-1 mb-3 h-[50px] flex justify-center items-center'>
          {title}
        </h4>
        <img
          className='size-max m-auto'
          src={image}
          alt='category familiarity image'
          // loading='lazy'
        />
      </div>
    </>
  );
};
export default CategoryCard;
