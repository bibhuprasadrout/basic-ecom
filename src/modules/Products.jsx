import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/Constants";
import { ProductCard } from "../components";
import { useSelector } from "react-redux";

const Products = () => {
  // 1. URL State Management
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL or use defaults
  const category = searchParams.get("category") || "";
  //   const sort = searchParams.get("sort") || "newest";

  // 2. Local State for Data and Pagination
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //   const categoriesValue = useSelector((state) => state.categories.value);
  const categories = useSelector((state) => state.categories.value);

  // 4. Reset Logic: When filters change, clear products and reset to page 1
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [category]);
  //   }, [category, sort]);

  // 5. Fetch Products Logic
  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasMore || (loading && page !== 1)) return;
      setLoading(true);

      try {
        const params = {
          page,
          limit: 12, // Standard grid size
          ...(category !== "" && { category }),
          //   sort,
        };

        const res = await axios.get(`${BASE_URL}/products`, { params });
        const newProducts = res.data.data;

        setProducts((prev) =>
          page === 1 ? newProducts : [...prev, ...newProducts],
        );

        // If we get fewer items than the limit, we've reached the end
        if (newProducts.length < 12) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, category]);
  //   }, [page, category, sort]);

  // 6. Intersection Observer for Infinite Scroll
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  // 7. Filter Handlers
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8'>
      {/* --- SIDEBAR --- */}
      <aside className='w-full md:w-64 shrink-0 space-y-8'>
        <div>
          <h3 className='font-bold text-lg mb-4'>Sort By</h3>
          <select
            className='select select-bordered w-full'
            value={""} // value={sort}
            onChange={(e) => updateFilters("sort", e.target.value)}>
            <option value='newest'>Newest</option>
            <option value='price_asc'>Price: Low to High</option>
            <option value='price_desc'>Price: High to Low</option>
            <option value='rating_desc'>Top Rated</option>
          </select>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-4'>Categories</h3>
          <div className='flex flex-col gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
            <button
              onClick={() => updateFilters("category", "all")}
              className={`btn btn-sm justify-start ${category === "" ? "btn-primary" : "btn-ghost"}`}>
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilters("category", cat)}
                className={`btn btn-sm justify-start capitalize ${category === cat ? "btn-primary" : "btn-ghost"}`}>
                {cat?.name ? cat?.name : cat?.slug.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* --- PRODUCT GRID --- */}
      <main className='flex-1'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <div ref={lastProductElementRef} key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            }
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>

        {/* --- SKELETON / LOADING --- */}
        {loading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex flex-col gap-4 w-full'>
                <div className='skeleton h-48 w-full'></div>
                <div className='skeleton h-4 w-28'></div>
                <div className='skeleton h-4 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
              </div>
            ))}
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className='divider mt-12 opacity-50'>{`You've reached the end`}</div>
        )}
      </main>
    </div>
  );
};

export default Products;
