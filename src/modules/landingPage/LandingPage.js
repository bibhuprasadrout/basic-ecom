import { useCallback, useEffect, useRef, useState } from "react";
import CategoryCard from "../../components/cards/CategoryCard";
import { FETCH_STATUS } from "../../config/status";
import { VIEWPORT_VAL } from "../../config/viewPortVidth";
import { fetchCategoriesList, fetchCategoryLength } from "../../api/apiList";
import { Outlet, useNavigate, useParams } from "react-router";
import ProdByCat from "../products/ProdByCat";

const LandingPage = () => {
  const [allCategoriesLength, setAllCategoriesLength] = useState(0);
  const [categoriesBySectionList, setCategoriesBySectionList] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [sectionItemLength, setSectionItemLength] = useState(0);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const [prodByCat, setProdByCat] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    alert(
      "If the page does not load any data, Please wait for 20 to 30 secs and reload the page. This happens due to the free hosting I am currently using. Thank you for your kindness."
    );
    calculateSectionItemLength();
    handleCategoryLength();
  }, []);

  const loading = status === FETCH_STATUS.LOADING;
  const calculateSectionItemLength = () => {
    // calculating number of items that can be acomotated in a single section/container based on the viewport width.
    if (allCategoriesLength !== 0 && allCategoriesLength === totalLength) {
      setSectionItemLength(0);
    } else {
      const width = window.innerWidth;
      setSectionItemLength(
        width <= VIEWPORT_VAL.SM
          ? 1
          : width <= VIEWPORT_VAL.MD
          ? 2
          : width <= VIEWPORT_VAL.LG
          ? 3
          : width <= VIEWPORT_VAL.XXL
          ? 4
          : 5
      );
    }
  };

  const handleCategoryLength = async () => {
    // fetch the number of categories available from backend
    if (totalLength > 0 && allCategoriesLength === totalLength) return;
    setStatus(FETCH_STATUS.LOADING);
    try {
      const res = await fetchCategoryLength();
      setTotalLength(res?.categoriesLength);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (err) {
      setStatus(FETCH_STATUS.ERROR);
    }
  };

  const handleCategoriesList = async () => {
    //fetch a set number of category card info from backend for a single section/container
    setStatus(FETCH_STATUS.LOADING);
    try {
      const paramsObj =
        {
          skipItems: allCategoriesLength,
          fetchItems: sectionItemLength,
        } || {};
      const res = await fetchCategoriesList(paramsObj);
      !allCategoriesLength
        ? setAllCategoriesLength(res.length)
        : setAllCategoriesLength((len) => len + res.length);
      res.length &&
        setCategoriesBySectionList((arr) =>
          !arr.includes(res) ? [...arr, res] : [...arr]
        );
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (err) {
      setStatus(FETCH_STATUS.ERROR);
      console.error("Error fetching data:", err.message);
    } finally {
    }
  };

  const observer = useRef(null);
  const apiCallRef = useCallback((node) => {
    if (loading || allCategoriesLength >= totalLength) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleCategoriesList();
      }
    });
    if (node) observer.current.observe(node);
  });

  const handleOnClickCategory = (slug) => {
    navigate(`/${slug}`);
  };
  return (
    <>
      <div>
        <div className=' bg-cyan-100 h-[50vh] text-center flex flex-col justify-center items-center'>
          <h1 className='text-7xl'>BIG HERO SECTION!</h1>
          <h2 className='text-3xl'>Some grand offer going on.</h2>
        </div>
        {slug ? (
          <ProdByCat slug={slug} />
        ) : (
          <div>
            {allCategoriesLength ? (
              [...new Set(categoriesBySectionList)].map((section, i) => {
                return (
                  <div
                    key={i}
                    className='border-2 rounded-xl m-7 p-5 flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 overflow-x-auto'>
                    {section.map((category) => {
                      return (
                        <CategoryCard
                          title={category?.name}
                          key={category?._id}
                          image={category?.image}
                          onClick={() => handleOnClickCategory(category?.slug)}
                        />
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
        <div ref={allCategoriesLength < totalLength ? apiCallRef : null}></div>
      </div>
    </>
  );
};
export default LandingPage;
