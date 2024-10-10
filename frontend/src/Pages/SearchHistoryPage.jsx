import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/dateFunc";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await apiRequest.get("/search/history");
        setSearchHistory(response.data.content);
      } catch (error) {
        setSearchHistory([]); // This should be `setSearchHistory`, not `searchHistory`
      }
    };

    getSearchHistory();
  }, []); // No dependency array, will run only once after mount

  const handleDelete = async (history) => {
    try {
      await apiRequest.get(`/search/history/${history.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== history.id)); //also remove from searchHistory
    } catch (err) {
      toast.error("Failed to delete the History Item");
    }
  };
  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search Hostory</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No Search History Found</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((history) => (
            <div
              className="bg-gray-800 p-4 rounded flex items-start"
              key={history.id}
            >
              <img
                src={SMALL_IMG_BASE_URL + history.image}
                alt="history poster img"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-lg">{history.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(history.createdAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-200 text-center rounded-full text-sm ml-auto ${
                  history.searchType === "movie"
                    ? "bg-red-600"
                    : history.searchType === "Tv Show"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {history.searchType[0].toUpperCase() +
                  history.searchType.slice(1)}
              </span>
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(history)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
