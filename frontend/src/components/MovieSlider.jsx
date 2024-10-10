import { useEffect, useRef, useState } from "react";
import { contentStore } from "../store/content";
import apiRequest from "../lib/apiRequest";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = contentStore();

  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const formattedCategory =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContent = contentType === "movie" ? "Movies" : "TV Shows";
  const sliderRef = useRef();
  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const response = await apiRequest.get(`/${contentType}/${category}`);

      setContent(response.data.content);
    };
    getContent();
  }, [contentType, category]);
  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategory} {formattedContent}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content &&
          content.map((item) => (
            <Link
              key={item.id}
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group"
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={`${SMALL_IMG_BASE_URL + item.backdrop_path}`}
                  alt="Movie img"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-4 text-center">{item.title || item.name}</p>
            </Link>
          ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={slideLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={slideRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
