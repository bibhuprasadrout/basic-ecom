import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FETCH_STATUS } from "../../config/status";
import { fetchProductDetails } from "../../api/apiList";

const ProductPage = () => {
  const { product } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  useEffect(() => {
    const handleProductDetails = async () => {
      setStatus(FETCH_STATUS.LOADING);
      try {
        const response = await fetchProductDetails(product);
        setProductDetails(response[0]);
        setStatus(FETCH_STATUS.SUCCESS);
      } catch (err) {
        setStatus(FETCH_STATUS.ERROR);
      }
    };
    handleProductDetails();
  }, []);
  console.log(productDetails);
  const handleOriginalPrice = () => {
    (productDetails?.price * 100) / (100 - productDetails?.discountPercentage);

    return "12.3";
  };
  return (
    <>
      {console.log(productDetails)}
      {productDetails ? (
        <div className='flex flex-wrap justify-center items-center m-auto max-w-[80%] gap-3'>
          <div className='relative max-w-[300px]'>
            <img
              className=''
              src={
                Array.isArray(productDetails?.images)
                  ? productDetails?.images[0]
                  : productDetails?.images
              }
              alt='product image'
            />
            {productDetails?.availabilityStatus === "Out of Stock" && (
              <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 w-[270px] h-[70px] opacity-30 flex justify-center items-center'>
                {productDetails?.availabilityStatus}
              </div>
            )}
            {productDetails?.availabilityStatus === "In Stock" && (
              <div className='left-0 right-0  bg-green-300 h-[30px] opacity-30 flex justify-center items-center'>
                {productDetails?.availabilityStatus}
              </div>
            )}
            {productDetails?.price && (
              <div className=''>₹ {productDetails?.price}</div>
            )}
            {productDetails?.discountPercentage && (
              <div className='flex gap-1'>
                ₹
                <s>
                  {Number(
                    (
                      (productDetails?.price * 100) /
                      (100 - productDetails?.discountPercentage)
                    ).toFixed(2)
                  )}
                </s>
                <p className='whitespace-nowrap'>
                  <strong>Big Sale!</strong>{" "}
                  {productDetails?.discountPercentage} % OFF 🏷️💲🎉
                </p>
              </div>
            )}
            {
              <div className='flex gap-3 my-3'>
                <button className='border-2 rounded-sm px-3 py-1 w-fit  cursor-pointer'>
                  Buy Now!
                </button>
                <button className='rounded-sm bg-amber-500 px-3 py-1  cursor-pointer'>
                  Add to cart.
                </button>
              </div>
            }
          </div>
          <div className=' flex flex-col max-w-[300px] gap-3'>
            <div className='text-xl'>
              <strong>{productDetails?.title}</strong>
              <div>{productDetails?.description}</div>
            </div>
            <div>
              <div>
                <strong>More details.</strong>
              </div>
              <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-2'>
                <div className='property col-span-1 justify-self-center w-full border-r-2 p-2'>
                  <strong>Property</strong>
                </div>
                <div className='value col-span-1 justify-self-start w-full p-2'>
                  <strong>Value</strong>
                </div>
              </div>
              {productDetails?.dimensions?.height && (
                <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-1'>
                  <div className='property col-span-1 justify-self-center w-full border-r-1 p-1'>
                    Height
                  </div>
                  <div className='value col-span-1 justify-self-start p-1'>
                    {productDetails?.dimensions?.height}
                  </div>
                </div>
              )}
              {productDetails?.dimensions?.width && (
                <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-1'>
                  <div className='property col-span-1 justify-self-center w-full border-r-1 p-1'>
                    Width
                  </div>
                  <div className='value col-span-1 justify-self-start p-1'>
                    {productDetails?.dimensions?.depth}
                  </div>
                </div>
              )}
              {productDetails?.dimensions?.depth && (
                <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-1'>
                  <div className='property col-span-1 justify-self-center w-full border-r-1 p-1'>
                    Depth
                  </div>
                  <div className='value col-span-1 justify-self-start p-1'>
                    {productDetails?.dimensions?.depth}
                  </div>
                </div>
              )}
              {productDetails?.weight && (
                <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-1'>
                  <div className='property col-span-1 justify-self-center w-full border-r-1 p-1'>
                    Weight in Kgs
                  </div>
                  <div className='value col-span-1 justify-self-start p-1'>
                    {productDetails?.weight}
                  </div>
                </div>
              )}
              {productDetails?.warrantyInformation && (
                <div className='grid grid-cols-2 gap-3 max-w-[300px] justify-center items-center border-1'>
                  <div className='property col-span-1 justify-self-center w-full border-r-1 p-1'>
                    Warranty Information
                  </div>
                  <div className='value col-span-1 justify-self-start p-1'>
                    {productDetails?.warrantyInformation}
                  </div>
                </div>
              )}
            </div>
            {productDetails?.shippingInformation && (
              <div>
                This is the shipment details for the product.
                {productDetails?.shippingInformation}.
              </div>
            )}
            {productDetails?.returnPolicy && (
              <div>{productDetails?.returnPolicy}.</div>
            )}
          </div>
        </div>
      ) : (
        <div>Error in Product Page!</div>
      )}
    </>
  );
};
export default ProductPage;
