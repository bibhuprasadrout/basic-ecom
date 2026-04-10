import { Carousel, InfiniteCategoriesCardGrid } from "../../components";
// import InfiniteCardGridByScrollDetection from "../components/common/InfiniteCardGridByScrollDetection";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/Constants";

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
      console.log("Error fetching random products:", err.status);
      console.log("Error message:", err.message);
    }
  };
  useEffect(() => {
    getElevenRandomProducts();
  }, []);

  // return (
  //   <div className='flex flex-col items-center'>
  //     {/* Hero section */}
  //     <div
  //       className='hero min-h-screen bg-cover bg-center'
  //       style={{
  //         backgroundImage:
  //           "url('https://images.unsplash.com/photo-1767216516661-deb40df6f489?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8N3x8fGVufDB8fHx8fA%3D%3D')",
  //       }}>
  //       {/* Overlay with subtle darkness */}
  //       <div className='hero-overlay bg-black/40'></div>

  //       {/* Content */}
  //       <div className='hero-content text-neutral-content px-4 sm:px-8 md:px-12 lg:px-20'>
  //         <div className='max-w-md md:max-w-lg lg:max-w-2xl text-left'>
  //           <p className='text-3xl md:text-4xl font-bold mb-2'>
  //             Make {new Date().getFullYear()} your year
  //           </p>
  //           <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>
  //             {`New Year's deals just dropped`}
  //           </h1>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Carousel */}
  //     <div className='bg-base-300 py-11 w-full'>
  //       <div
  //         className='text-2xl pb-1
  //       sm:text-4xl sm:pb-3
  //       md:text-5xl md:pb-7
  //       font-bold text-content-base-300 w-fit m-auto '>
  //         Best Discounted Products
  //       </div>
  //       <Carousel products={carouselProducts} />
  //     </div>

  //     {/* Categories */}
  //     {/* <InfiniteCardGridByScrollDetection /> */}
  //     <div className='bg-base-200 py-11 w-full'>
  //       <div
  //         className='text-2xl pb-1
  //       sm:text-4xl sm:pb-3
  //       md:text-5xl md:pb-7
  //       font-bold  text-content-base-300 w-fit m-auto'>
  //         Categories with Best Discounted
  //       </div>
  //       <InfiniteCategoriesCardGrid />
  //     </div>
  //   </div>
  // );

  return (
    <div className='min-h-screen bg-base-100 text-base-content'>
      {/* 1. COMPACT HERO SECTION */}
      <section className='relative overflow-hidden bg-base-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-10'>
          {/* Text Content */}
          <div className='flex-1 text-center md:text-left z-10'>
            <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight mb-4'>
              New Year, <span className='text-primary'>New Deals.</span>
            </h1>
            <p className='text-lg md:text-xl opacity-80 mb-8 max-w-lg'>
              The biggest discounts of the season have arrived. Upgrade your
              lifestyle with our curated collection.
            </p>
            <div className='flex gap-4 justify-center md:justify-start'>
              <Link to='products' className='btn btn-primary px-8'>
                Shop Now
              </Link>
              <button className='btn btn-outline'>Learn More</button>
            </div>
          </div>

          {/* Featured Image - Use a mask or rounded corners for a pro look */}
          <div className='flex-1 relative'>
            <div className='aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-base-100'>
              <img
                src='https://res.cloudinary.com/dsk4p5j0o/image/upload/v1775823716/copy_of_man_and_son_wearing_cool_tees_b136cc.png'
                alt='New Year Promo'
                className='w-full h-full object-cover'
              />
            </div>
            {/* Subtle decorative element for "pro" feel */}
            <div className='absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full opacity-20 blur-2xl'></div>
          </div>
        </div>
      </section>

      {/* 2. THE DEALS CAROUSEL (Now higher up) */}
      <section className='py-12 bg-base-100'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-end justify-between px-4 mb-8'>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold'>Best Discounts</h2>
              <p className='text-sm opacity-60'>
                Handpicked deals just for you
              </p>
            </div>
            <button className='btn btn-ghost btn-sm'>View All →</button>
          </div>
          <Carousel products={carouselProducts} />
        </div>
      </section>

      {/* 3. CATEGORY DISCOVERY GRID */}
      <section className='bg-base-200 py-16'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-2'>
              Explore Categories
            </h2>
            <div className='h-1 w-20 bg-primary mx-auto rounded-full'></div>
          </div>
          <InfiniteCategoriesCardGrid />
        </div>
      </section>
    </div>
  );
};
export default Home;
