import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/apiList";
import { FETCH_STATUS } from "../../config/status";
import CategoryCard from "../../components/cards/CategoryCard";

const ProdByCat = ({ slug }) => {
  console.log(slug, "slug in comp");
  const [products, setProducts] = useState([]);
  const [fetchProdStatus, setFetchProdStatus] = useState(FETCH_STATUS.IDLE);
  useEffect(() => {
    const handleProducsts = async () => {
      setFetchProdStatus(FETCH_STATUS.LOADING);
      try {
        const prodByCat = await fetchProducts(slug);
        setProducts(prodByCat);
        setFetchProdStatus(FETCH_STATUS.SUCCESS);
      } catch (err) {
        setFetchProdStatus(FETCH_STATUS.ERROR);
      }
    };
    handleProducsts();
  }, []);
  const handleOnClickProduct = () => {
    console.log("Go to product page.");
  };
  return (
    <>
      {slug ? (
        <div>
          {console.log(products)}
          <div>
            <div className='border-2 rounded-xl m-7 p-5 flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 overflow-x-auto'>
              {products.map((product) => {
                return (
                  <CategoryCard
                    title={product?.title}
                    key={product?._id}
                    image={product?.thumbnail}
                    onClick={() => handleOnClickProduct}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>No response!</div>
      )}
    </>
  );
};
export default ProdByCat;
