import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/apiList";
import { FETCH_STATUS } from "../../config/status";
import ProductListingCard from "./ProductListingCard";
import { useNavigate, useParams } from "react-router";
import ProductPage from "./ProductPage";

const ProdByCat = ({ slug }) => {
  const { product } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const navigate = useNavigate();
  useEffect(() => {
    const handleProducsts = async () => {
      setStatus(FETCH_STATUS.LOADING);
      try {
        const prodByCat = await fetchProducts(slug);
        setProducts(prodByCat);
        console.log(products);
        setStatus(FETCH_STATUS.SUCCESS);
      } catch (err) {
        setStatus(FETCH_STATUS.ERROR);
      }
    };
    handleProducsts();
  }, []);
  const handleOnClickProduct = (product) => {
    navigate(`/${slug}/${product}`);
  };
  return (
    <>
      {product ? (
        <ProductPage product={product} />
      ) : !slug ? (
        <div>No response!</div>
      ) : (
        <div>
          <div className='flex flex-wrap justify-start items-start'>
            {products.map((product) => {
              return (
                <ProductListingCard
                  title={product?.title}
                  price={product?.price}
                  rating={product?.rating}
                  key={product?._id}
                  image={product?.thumbnail}
                  onClick={() => handleOnClickProduct(product?.title)}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default ProdByCat;
