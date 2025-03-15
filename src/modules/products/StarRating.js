const StarRating = ({ rating }) => {
  const totalStars = 5;
  const percentage = (rating / totalStars) * 100;
  return (
    <div className='relative inline-block w-[100%] max-w-[67px] h-[1rem] text-gray-500'>
      <div className='absolute whitespace-nowrap h-[1.3rem]'>★★★★★</div>
      <div
        className='absolute top-0 left-0 text-amber-500 overflow-hidden whitespace-nowrap'
        style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
    </div>
  );
};

export default StarRating;
