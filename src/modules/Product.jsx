import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../config/Constants";
import { downArrow } from "../assets";

const Product = () => {
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState({});
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
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProductById(id);
  }, []);
  console.log("product:", product);

  return (
    <div>
      <div className='h-12'></div>
      <div className='flex flex-col sm:flex-row gap-3 min-h-screen w-full max-w-364 pt-1 pb-11'>
        {/* product images */}
        <div className='inline-flex w-1/4 h-screen max-h-164 justify-center items-start z-10 mr-3'>
          <div className='min-w-100 max-w-120 focus:outline-none'>
            {productImages.length > 1 ? (
              <figure className='hover-gallery w-full max-w-120 focus:outline-none'>
                {productImages.map((imgString, index) => {
                  return <img key={index} src={imgString} loading='eager' />;
                })}
              </figure>
            ) : (
              <img src={productImages[0]} />
            )}
          </div>
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
          <div className='text-sm text-neutral-400'>
            Eligible for {product.returnPolicy}
          </div>
          {/* information table */}
          <div
            tabIndex={0}
            className='collapse collapse-arrow bg-base-100 border-base-300 border rounded-md'>
            <div className='collapse-title text-xl font-bold after:start-5 after:end-auto pe-4 ps-12 '>
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
        <div className='inline-flex flex-col gap-3 w-1/4 h-screen max-h-120 bg-blue'>
          <div className='card w-full bg-base-100 border-1'>
            <div className='card-body'>
              <div className='text-4xl'>$ {product?.price}</div>
              <div className='text-md text-neutral-400'>
                Must purchase a minimum order quantity of{" "}
                {product.minimumOrderQuantity}
              </div>
              <div className='text-sm font-bold text-red-700 py-3'>
                Usually {product.shippingInformation}
              </div>
              <div className='dropdown'>
                <label
                  tabIndex={0}
                  role='button'
                  className='btn rounded-lg w-full flex justify-between'>
                  Quantity <img className='size-7' src={downArrow} />
                </label>
                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-200 rounded-lg z-1 w-full max-h-40 overflow-y-auto p-2 shadow-sm flex flex-col flex-nowrap'>
                  {Array.from({ length: 100 }).map((_, i) => (
                    <li key={i} className='p-1 w-full'>
                      <a className='flex justify-center w-full'>{i + 1}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-1'>
                <button
                  className='btn btn-primary btn-block'
                  disabled={!(product?.availabilityStatus === "In Stock")}>
                  Add to cart
                </button>
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
//     "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
//     "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
//     "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
//     "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
//     "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
//     "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
//     "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/2.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/ice-cream/4.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/juice/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/lemon/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/milk/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/mulberry/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/potatoes/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/protein-powder/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/red-onions/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/rice/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/strawberry/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/1.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/2.webp",
//     "https://cdn.dummyjson.com/product-images/groceries/water/1.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/2.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/3.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/1.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/2.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/3.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/1.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/2.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/3.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/4.webp",
//     "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/2.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/2.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/3.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/4.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/2.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/3.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/4.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/2.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/3.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/4.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/2.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/1.webp",
//     "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp",
//     "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/4.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/3.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp",
//     "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/3.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/3.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/3.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/4.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/2.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/1.webp",
//     "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/2.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/3.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/4.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/2.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/3.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/kawasaki-z800/4.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/2.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/3.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/4.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/2.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/3.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/scooter-motorcycle/4.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/1.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/2.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/3.webp",
//     "https://cdn.dummyjson.com/product-images/motorcycle/sportbike-motorcycle/4.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/2.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/3.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/1.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/2.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/3.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/1.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/2.webp",
//     "https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-6/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/4.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-x/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-x/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/3.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/2.webp",
//     "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/3.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/2.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/3.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/basketball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/2.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/3.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/4.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/football/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/metal-baseball-bat/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/1.webp",
//     "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/1.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/2.webp",
//     "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/3.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/2.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/3.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/4.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/2.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/3.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/4.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/1.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/2.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/3.webp",
//     "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/4.webp",
//     "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
//     "https://cdn.dummyjson.com/product-images/tops/blue-frock/2.webp",
//     "https://cdn.dummyjson.com/product-images/tops/blue-frock/3.webp",
//     "https://cdn.dummyjson.com/product-images/tops/blue-frock/4.webp",
//     "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp",
//     "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/2.webp",
//     "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/3.webp",
//     "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/4.webp",
//     "https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp",
//     "https://cdn.dummyjson.com/product-images/tops/gray-dress/2.webp",
//     "https://cdn.dummyjson.com/product-images/tops/gray-dress/3.webp",
//     "https://cdn.dummyjson.com/product-images/tops/gray-dress/4.webp",
//     "https://cdn.dummyjson.com/product-images/tops/short-frock/1.webp",
//     "https://cdn.dummyjson.com/product-images/tops/short-frock/2.webp",
//     "https://cdn.dummyjson.com/product-images/tops/short-frock/3.webp",
//     "https://cdn.dummyjson.com/product-images/tops/short-frock/4.webp",
//     "https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp",
//     "https://cdn.dummyjson.com/product-images/tops/tartan-dress/2.webp",
//     "https://cdn.dummyjson.com/product-images/tops/tartan-dress/3.webp",
//     "https://cdn.dummyjson.com/product-images/tops/tartan-dress/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/1.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/2.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/3.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/5.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/300-touring/6.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/1.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/2.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/3.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/5.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/6.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/1.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/2.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/3.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/5.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/dodge-hornet-gt-plus/6.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/1.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/2.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/3.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/5.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/durango-sxt-rwd/6.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/1.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/2.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/3.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/4.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/5.webp",
//     "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/6.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/3.webp",
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
//     "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/4.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/3.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/1.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/2.webp",
//     "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/3.webp",
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
