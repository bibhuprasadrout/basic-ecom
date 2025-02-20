import { useCallback, useEffect, useRef, useState } from "react";
import CategoryCard from "../../components/cards/CategoryCard";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { FETCH_STATUS } from "../../config/status";
import { VIEWPORT_VAL } from "../../config/viewPortVidth";

const LandingPage = () => {
  const [allCategoriesLength, setAllCategoriesLength] = useState(0);
  const [categoriesBySectionList, setCategoriesBySectionList] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [sectionItemLength, setSectionItemLength] = useState(0);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  useEffect(() => {
    calculateSectionItemLength();
    fetchCategoryLength();
  }, []);

  const loading = status === FETCH_STATUS.LOADING;
  const calculateSectionItemLength = () => {
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
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const baseUrl = process.env.REACT_APP_BASE_URL_LOCAL;
  const fetchCategoryLength = async () => {
    if (totalLength > 0 && allCategoriesLength === totalLength) return;
    setStatus(FETCH_STATUS.LOADING);
    try {
      const response = await axios.get(baseUrl);
      const res = response.data;
      setTotalLength(res?.categoriesLength);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (err) {
      setStatus(FETCH_STATUS.ERROR);
      console.log("Error fetching data:", err.message);
    }
  };
  const fetchCategoriesList = async () => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      const response = await axios.get(baseUrl, {
        params: {
          skipItems: allCategoriesLength,
          fetchItems: sectionItemLength,
        },
      });
      const res = response?.data?.categories;
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
        fetchCategoriesList();
      }
    });
    if (node) observer.current.observe(node);
  });

  return (
    <>
      <div>
        <Navbar />
        <div className=' bg-cyan-100 h-[50vh] text-center flex flex-col justify-center items-center'>
          <h1 className='text-7xl'>BIG HERO SECTION!</h1>
          <h2 className='text-3xl'>Some grand offer going on.</h2>
        </div>
        {allCategoriesLength ? (
          [...new Set(categoriesBySectionList)].map((section, i) => {
            return (
              <div
                key={i}
                className='border-2 rounded-xl m-7 p-5 flex justify-between items-center flex-wrap 
            xl:flex-nowrap
            gap-5 overflow-x-auto'>
                {section.map((category) => {
                  return (
                    <CategoryCard
                      title={category?.name}
                      key={category?._id}
                      image={category?.image}
                    />
                  );
                })}
              </div>
            );
          })
        ) : (
          <></>
        )}
        <div ref={allCategoriesLength < totalLength ? apiCallRef : null}></div>
      </div>
    </>
  );
};
export default LandingPage;
