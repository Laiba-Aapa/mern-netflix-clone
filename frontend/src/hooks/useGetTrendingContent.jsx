import { useEffect, useState } from "react";
import { contentStore } from "../store/content";
import apiRequest from "../lib/apiRequest";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = contentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const response = await apiRequest.get(`/${contentType}/trending`);
      setTrendingContent(response.data.content);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
