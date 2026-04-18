import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components";
import { useSelector } from "react-redux";
import { request } from "../utils";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  const categories = useSelector((state) => state.categories.value);

  // 1. Reset Logic: Clear everything when filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [category, sort]);

  // 2. Fetch Logic: Separated from the "Observer" logic
  useEffect(() => {
    const fetchProducts = async () => {
      if (loading) return;
      setLoading(true);

      const params = {
        page,
        limit,
        ...(category && { category }),
        sort,
      };

      const { data, error } = await request({
        method: "get",
        url: `products`,
        params,
      });

      if (!error && data?.data) {
        const fetchedItems = data.data;
        setProducts((prev) =>
          page === 1 ? fetchedItems : [...prev, ...fetchedItems],
        );

        // If we got less than the limit, we are at the end
        if (fetchedItems.length < limit) {
          setHasMore(false);
        }
      }
      setLoading(false);
    };

    fetchProducts();
    // Dependency array strictly only page/filters.
    // Do NOT add loading or hasMore here.
  }, [page, category, sort]);

  // 3. Intersection Observer
  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value === "all" ? params.delete(key) : params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-6 md:py-12'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* --- RESPONSIVE SIDEBAR --- */}
        <aside className='w-full lg:w-64 shrink-0'>
          {/* Mobile Filter Toggle (Visible only on small screens) */}
          <div className='collapse collapse-arrow lg:collapse-open bg-base-200 lg:bg-transparent border border-base-300 lg:border-none rounded-box py-3'>
            <input type='checkbox' className='lg:hidden' />
            <div className='collapse-title lg:hidden font-bold'>
              Filters & Categories
            </div>
            <div className='collapse-content lg:p-0 space-y-8'>
              {/* Sort Section */}
              <div className='mt-4 lg:mt-0'>
                <h3 className='font-black uppercase tracking-widest text-xs mb-4 opacity-50'>
                  Sort By
                </h3>
                <select
                  className='select select-bordered w-full bg-base-100'
                  value={sort}
                  onChange={(e) => updateFilters("sort", e.target.value)}>
                  <option value='newest'>Newest</option>
                  <option value='price_asc'>Price: Low to High</option>
                  <option value='price_desc'>Price: High to Low</option>
                  <option value='rating_desc'>Top Rated</option>
                </select>
              </div>

              {/* Categories Section */}
              <div>
                <h3 className='font-black uppercase tracking-widest text-xs mb-4 opacity-50'>
                  Categories
                </h3>
                <div className='flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-96 pb-2 lg:pb-0 custom-scrollbar'>
                  <button
                    onClick={() => updateFilters("category", "all")}
                    className={`btn btn-sm lg:justify-start whitespace-nowrap ${category === "" ? "btn-primary" : "btn-ghost"}`}>
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id || cat.slug}
                      onClick={() => updateFilters("category", cat.slug || cat)}
                      className={`btn btn-sm lg:justify-start whitespace-nowrap capitalize ${category === (cat.slug || cat) ? "btn-primary" : "btn-ghost"}`}>
                      {cat?.name || cat.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className='flex-1'>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6'>
            {products.map((product, index) => {
              const isLastElement = products.length === index + 1;
              return (
                <div
                  ref={isLastElement ? lastProductElementRef : null}
                  key={product._id}
                  className='h-full'>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mt-6'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='flex flex-col gap-2 w-full opacity-50'>
                  <div className='skeleton h-40 md:h-64 w-full rounded-xl'></div>
                  <div className='skeleton h-3 w-20'></div>
                  <div className='skeleton h-3 w-full'></div>
                </div>
              ))}
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <div className='divider mt-16 font-bold opacity-30 text-xs uppercase tracking-[0.2em]'>
              End of Collection
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 opacity-50'>
              <p className='text-xl font-bold'>No products found</p>
              <button
                onClick={() => updateFilters("category", "all")}
                className='btn btn-link'>
                Clear filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
