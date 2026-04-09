import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config/Constants";
import { useHoverMedia } from "../hooks";
import { AddToCartButton, ProductQuantityWheelHorizontal } from "../components";

const Product = () => {
  const [productImages, setProductImages] = useState([]); // this state handles the images that once they are fetched using the fetchProductById function.
  const [activeImageIndex, setActiveImageIndex] = useState(0); // this state manages which image should be the main image among th thumbnails in the product image gallary of the page.
  const [product, setProduct] = useState({});
  const [productCount, setProductCount] = useState(1);
  const canHover = useHoverMedia();
  const { id } = useParams();
  const fetchProductById = async (productId) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: `products/${productId}`,
      });
      setProduct(() => res.data?.data);
      setProductImages(() => res.data?.data?.images);
    } catch (err) {
      console.log("error fetching product:", err);
    }
  };
  useEffect(() => {
    fetchProductById(id);
  }, []);

  return (
    <div>
      <div className='h-12'></div>
      <div className='flex flex-col sm:flex-row gap-3 min-h-screen w-full max-w-364 pt-1 pb-11 m-auto'>
        {/* product images */}
        {/* Main wrapper: You can adjust the width (e.g., w-full md:w-1/2 lg:w-1/3) based on your grid */}
        <div className='flex flex-col gap-4 w-full max-w-md'>
          {/* --- MAIN IMAGE DISPLAY --- */}
          {/* aspect-square ensures the box stays a perfect square so the layout doesn't jump around when clicking differently sized images */}
          {!productImages || productImages.length === 0 ? (
            <div className='p-4 bg-base-200 rounded-lg'>No image available</div>
          ) : (
            <div className='w-full aspect-square bg-base-100 border border-base-200 rounded-xl overflow-hidden flex items-center justify-center'>
              <img
                src={productImages[activeImageIndex]}
                alt={`Product view ${activeImageIndex + 1}`}
                // object-contain ensures the whole image is visible without stretching or cropping
                className='w-full h-full object-contain'
              />
            </div>
          )}
          {/* --- THUMBNAIL ROW --- */}
          {/* Only show thumbnails if there is more than 1 image */}
          {productImages.length > 1 && (
            <div className='flex gap-3 overflow-x-auto py-2 px-1 hide-scrollbar'>
              {productImages.map((imgString, index) => {
                const isActive = activeImageIndex === index;

                return (
                  <button
                    key={index}
                    // Update the main image when a thumbnail is clicked
                    onClick={() => setActiveImageIndex(index)}
                    // // If they have a mouse, attach the hover event. Otherwise, do nothing.
                    onMouseEnter={
                      canHover ? () => setActiveImageIndex(index) : undefined
                    }
                    className={`
                      relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${
                        isActive
                          ? "border-primary shadow-md" // Active state: Highlighted with your daisyUI primary color
                          : "border-base-300 opacity-70 hover:opacity-100 hover:border-base-content/50" // Inactive state
                      }
                    `}>
                    <img
                      src={imgString}
                      alt={`Thumbnail ${index + 1}`}
                      // object-cover is good for thumbnails so they fill the square perfectly
                      className='w-full h-full object-cover bg-base-100'
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {/* product information */}
        <div className='inline-flex flex-col gap-3 w-2/4 h-fit z-20'>
          <div className='text-3xl'>{product?.title}</div>
          <div className='text-xl'>{product?.description}</div>
          {/* rating */}
          <div className=' inline-flex gap-1'>
            <div className='text-sm'>{product?.rating}/5</div>
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
          </div>
          {/* stock status badge */}
          <div
            className={
              product?.availabilityStatus === "In Stock"
                ? "badge badge-outline badge-success rounded-md "
                : "badge badge-outline badge-error scale-500 rounded-md self-center rotate-315"
            }>
            {product?.availabilityStatus}
          </div>
          {/* horizontal divider line */}
          <div className='border-t-2 border-base-300 my-1'></div>

          <div className='text-4xl'>$ {product?.price}</div>
          <div>
            <span className='badge badge-success rounded-none text-base-100 '>
              Savings
            </span>
            &nbsp; Get {product?.discountPercentage}% discount on{" "}
            <span className=''>
              {`$${
                Math.floor(
                  (product.price +
                    Math.floor(product.discountPercentage * product.price) /
                      100) *
                    100,
                ) / 100
              }`}
            </span>
          </div>
          <div className='text-sm text-base-content/70'>
            Eligible for {product.returnPolicy}
          </div>
          {/* information table */}
          <div className='collapse collapse-arrow bg-base-100 border-base-300 border rounded-md'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-bold after:inset-s-5 after:end-auto pe-4 ps-12 '>
              About this item
            </div>
            <div className='collapse-content text-sm h-fit'>
              <div className='overflow-auto h-fit max-h-96 w-full'>
                <table className='table table-xs table-pin-rows table-pin-cols min-w-200'>
                  <thead>
                    <tr>
                      <td className='w-30 max-w-40'>Property</td>
                      <td className='max-w-50 whitespace-normal'>Value</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product).map(([key, value], i) => {
                      const ignoreProperties = [
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
                      if (new Set(ignoreProperties).has(key)) {
                        return null;
                      }
                      if (typeof value === "object" && value !== null) {
                        return null; // skip objects
                      }
                      return (
                        <tr key={i}>
                          <td className='w-30 max-w-40 font-semibold'>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (s) => s.toUpperCase())}
                          </td>
                          <td className='max-w-50 whitespace-normal'>
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className='w-30 max-w-40'>Property</td>
                      <td className='max-w-50 whitespace-normal'>Value</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* product related user actions */}
        <div className='inline-flex flex-col gap-3 w-1/4 h-screen max-h-120'>
          <div className='card w-full bg-base-100 border border-base-300'>
            <div className='card-body'>
              <div className='text-4xl'>$ {product?.price}</div>
              <div className='text-md text-base-content/70'>
                Must purchase a minimum order quantity of{" "}
                {product.minimumOrderQuantity}
              </div>
              <div className='text-sm font-bold text-error py-3'>
                Usually {product.shippingInformation}
              </div>

              {/* --- NEW APPLE-STYLE QUANTITY PICKER --- */}
              <div className='flex flex-col gap-2 w-full'>
                <span className='text-sm font-semibold text-base-content/70'>
                  Quantity:
                </span>
                <ProductQuantityWheelHorizontal
                  value={productCount}
                  onChange={setProductCount}
                />
              </div>

              {/* CTA */}
              <div className='mt-1'>
                <AddToCartButton
                  styles={"btn btn-primary btn-block"}
                  product={product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;

// #region
// availabilityStatus: "In Stock"
// brand: "Knoll"
// category: "furniture"
// description: "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design."
// dimensions: {width: 16.59, height: 21.46, depth: 29.07}
// discountPercentage: 15.23
// id: 14
// images: (3)['https://cdn.dummyjson.com/products/images/furnitur…20Saarinen%20Executive%20Conference%20Chair/1.png',
//   'https://cdn.dummyjson.com/products/images/furnitur…20Saarinen%20Executive%20Conference%20Chair/2.png',
//   'https://cdn.dummyjson.com/products/images/furnitur…20Saarinen%20Executive%20Conference%20Chair/3.png']
// meta: {
//   createdAt: '2024-05-23T08:56:21.620Z',
//   updatedAt: '2024-05-23T08:56:21.620Z',
//   barcode: '0726316339746',
//   qrCode: 'https://assets.dummyjson.com/public/qr-code.png'
// }
// minimumOrderQuantity: 5
// price: 499.99
// rating: 4.11
// returnPolicy: "30 days return policy"
// reviews: (3) [{…}, {…}, {…}]
// shippingInformation: "Ships in 3-5 business days"
// sku: "RKHVJ4FE"
// stock: 47
// tags: (2) ['furniture', 'office chairs']
// thumbnail: "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png"
// title: "Knoll Saarinen Executive Conference Chair"
// warrantyInformation: "Lifetime warranty"
// weight: 3
// _id: "67a9255fb597d5696eaf4c67"
// #endregion

//
//
//
// download assets like images if you have the cdn links
// import JSZip from "jszip";
// import { saveAs } from "file-saver";
//   const productsImages = [
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/3.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/football/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/3.webp",
//   ];

//   async function downloadImages(productsImages) {
//     const zip = new JSZip();
//     for (const image of productsImages) {
//       try {
//         const res = await fetch(image);
//         const blob = await res.blob();
//         const filename = image.slice(41);
//         zip.file(filename, blob);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     const content = await zip.generateAsync({ type: "blob" });
//     saveAs(content, "images.zip");
//   }
//   useEffect(() => {
//     // downloadImages(productsImages);
//     console.log(productsImages);
//   }, []);
