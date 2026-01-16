import Carousel from "../../components/common/Carousel";
// import InfiniteCardGridByScrollDetection from "../components/common/InfiniteCardGridByScrollDetection";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";
import InfiniteCategoriesCardGrid from "./InfiniteCategoriesCardGrid";

const Home = () => {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const getElevenRandomProducts = async () => {
    try {
      const randomProducts = await axios({
        url: "products/random",
        method: "get",
        baseURL: BASE_URL,
      });
      if (!randomProducts) throw new Error();
      setCarouselProducts(randomProducts.data?.data);
      return randomProducts;
    } catch (err) {
      console.log(err.status);
      console.log(err.message);
    }
  };
  useEffect(() => {
    getElevenRandomProducts();
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {/* Hero section */}
      <div
        className='hero min-h-screen bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1767216516661-deb40df6f489?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8fA%3D%3D')",
        }}>
        {/* Overlay with subtle darkness */}
        <div className='hero-overlay bg-black/40'></div>

        {/* Content */}
        <div className='hero-content text-neutral-content px-4 sm:px-8 md:px-12 lg:px-20'>
          <div className='max-w-md md:max-w-lg lg:max-w-2xl text-left'>
            <p className='text-3xl md:text-4xl font-bold mb-2'>
              Make {new Date().getFullYear()} your year
            </p>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>
              {`New Year's deals just dropped`}
            </h1>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className='bg-base-300 py-11 w-full'>
        <div
          className='text-2xl pb-1
        sm:text-4xl sm:pb-3
        md:text-5xl md:pb-7
        font-bold text-content-base-300 w-fit m-auto '>
          Best Discounted Products
        </div>
        <Carousel products={carouselProducts} />
      </div>

      {/* Categories */}
      {/* <InfiniteCardGridByScrollDetection /> */}
      <div className='bg-base-200 py-11 w-full'>
        <div
          className='text-2xl pb-1
        sm:text-4xl sm:pb-3
        md:text-5xl md:pb-7
        font-bold  text-content-base-300 w-fit m-auto'>
          Categories with Best Discounted
        </div>
        <InfiniteCategoriesCardGrid />
      </div>
    </div>
  );
};
export default Home;
