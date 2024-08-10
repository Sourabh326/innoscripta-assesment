import React, { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, searchArticles } from "../store/actions/articleActions";
import Filters from "./Filters";
import { ClipLoader } from "react-spinners";

const NewsAggregator = () => {
  const dispatch = useDispatch();
  const { filterArticles, loading, error } = useSelector(
    (state) => state.articles
  );
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleSearch = (filters) => {
    const { keyword, source, date } = filters;
    dispatch(searchArticles({ keyword, source, date }));
    setDisplayCount(8);
  };

  const handleResetFilter = () => {
    dispatch(fetchArticles());
    setDisplayCount(8);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  }

  return (
    <div className="news-aggregator">
      <h1 className="heading">News Articles</h1>

      {/* Filter Section */}
      <Filters onSearch={handleSearch} onResetFilter={handleResetFilter} />
      {loading && (
        <div className="loading-section">
          <ClipLoader size={50} />
        </div>
      )}
      {error && (
        <div className="no-articles-message">
          <p>{error}</p>
        </div>
      )}

      {/* Main Section */}
      {!loading &&
        !error &&
        (filterArticles.length > 0 ? (
          <>
            <ArticleList articles={filterArticles.slice(0,displayCount)} />
            {
              displayCount < filterArticles.length && <div className="load-more"><button className="load-more-button" onClick={handleLoadMore}>Load More</button></div>
            }
          </>
        ) : (
          <div className="no-articles-message">
            <p>No articles found. Please adjust your filters.</p>
          </div>
        ))}
    </div>
  );
};

export default NewsAggregator;
