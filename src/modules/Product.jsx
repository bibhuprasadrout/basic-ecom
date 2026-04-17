import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHoverMedia } from "../hooks";
import { AddToCartButton, ProductQuantityWheelHorizontal } from "../components";
import { request } from "../utils";

const Product = () => {
  const [productImages, setProductImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [productCount, setProductCount] = useState(1);
  const canHover = useHoverMedia();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductById = async (productId) => {
      const { data, error } = await request({
        method: "get",
        url: `products/${productId}`,
      });
      if (error) {
        console.log("error fetching product:", error);
      }
      setProduct(() => data?.data);
      setProductImages(() => data?.data?.images || []);
    };
    fetchProductById(id);
  }, [id]);

  return (
    <div className='bg-base-100 min-h-screen'>
      <div className='h-8 md:h-12'></div>

      {/* CONTAINER:
          - flex-col for mobile (stacked)
          - lg:flex-row for desktop (side-by-side)
      */}
      <div className='flex flex-col lg:flex-row gap-8 w-full max-w-7xl px-4 md:px-6 py-4 m-auto'>
        {/* --- 1. PRODUCT IMAGES (Left Column) --- */}
        {/* w-full on mobile, lg:w-5/12 on desktop */}
        <div className='flex flex-col gap-4 w-full lg:w-5/12 max-w-xl mx-auto lg:mx-0'>
          {!productImages || productImages.length === 0 ? (
            <div className='p-4 bg-base-200 rounded-lg text-center'>
              No image available
            </div>
          ) : (
            <div className='w-full aspect-square bg-base-100 border border-base-200 rounded-xl overflow-hidden flex items-center justify-center shadow-sm'>
              <img
                src={productImages[activeImageIndex]}
                alt={product?.title}
                className='w-full h-full object-contain p-2'
              />
            </div>
          )}

          {productImages.length > 1 && (
            <div className='flex gap-3 overflow-x-auto py-2 px-1 no-scrollbar'>
              {productImages.map((imgString, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  onMouseEnter={
                    canHover ? () => setActiveImageIndex(index) : undefined
                  }
                  className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${activeImageIndex === index ? "border-primary shadow-md" : "border-base-300 opacity-70"}`}>
                  <img
                    src={imgString}
                    alt='thumb'
                    className='w-full h-full object-cover bg-base-100'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- 2. PRODUCT INFORMATION (Middle Column) --- */}
        {/* w-full on mobile, lg:w-4/12 on desktop */}
        <div className='flex flex-col gap-3 w-full lg:w-4/12'>
          <h1 className='text-2xl md:text-3xl font-bold'>{product?.title}</h1>
          <p className='text-lg opacity-80'>{product?.description}</p>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <span className='text-sm font-semibold'>{product?.rating}/5</span>
            <div className='flex text-warning'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width='16'
                  height='16'
                  fill={
                    i < Math.floor(product?.rating || 0)
                      ? "currentColor"
                      : "none"
                  }
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z' />
                </svg>
              ))}
            </div>
          </div>

          <div
            className={`badge badge-outline rounded-md ${product?.availabilityStatus === "In Stock" ? "badge-success" : "badge-error"}`}>
            {product?.availabilityStatus}
          </div>

          <div className='border-t border-base-300 my-2'></div>

          <div className='text-3xl font-bold'>${product?.price}</div>

          <div className='text-sm'>
            <span className='badge badge-success rounded-none text-base-100 mr-2'>
              Savings
            </span>
            Get {product?.discountPercentage}% discount
          </div>

          {/* Info Table */}
          <div className='collapse collapse-arrow bg-base-100 border border-base-300 rounded-md mt-4'>
            <input type='checkbox' />
            <div className='collapse-title text-lg font-bold'>
              About this item
            </div>
            <div className='collapse-content overflow-x-auto'>
              <table className='table table-xs w-full'>
                <tbody>
                  {Object.entries(product || {}).map(([key, value], i) => {
                    const ignore = [
                      "id",
                      "images",
                      "meta",
                      "reviews",
                      "sku",
                      "stock",
                      "tags",
                      "thumbnail",
                      "_id",
                    ];
                    if (ignore.includes(key) || typeof value === "object")
                      return null;
                    return (
                      <tr key={i}>
                        <td className='font-semibold capitalize'>
                          {key.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- 3. USER ACTIONS (Right Column / Bottom on Mobile) --- */}
        {/* w-full on mobile, lg:w-3/12 on desktop */}
        <div className='w-full lg:w-3/12'>
          <div className='card w-full bg-base-200 shadow-sm border border-base-300 sticky top-20'>
            <div className='card-body p-6'>
              <div className='text-3xl font-bold'>${product?.price}</div>
              <div className='text-sm opacity-70'>
                Min. Order: {product?.minimumOrderQuantity}
              </div>
              <div className='text-sm font-bold text-error mt-2'>
                {product?.shippingInformation}
              </div>

              <div className='mt-4 space-y-2'>
                <span className='text-xs font-bold uppercase opacity-60'>
                  Quantity:
                </span>
                <ProductQuantityWheelHorizontal
                  value={productCount}
                  onChange={setProductCount}
                />
              </div>

              <div className='card-actions mt-6'>
                <AddToCartButton
                  styles='btn btn-primary btn-block'
                  product={product}
                />
              </div>
              <p className='text-[10px] text-center mt-4 opacity-50'>
                {product?.returnPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
