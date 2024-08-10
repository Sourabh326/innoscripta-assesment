import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES,
} from "../constants/types";

const initialState = {
  articles: [],
  filterArticles: [],
  loading: false,
  error: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload,
        filterArticles: action.payload,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_ARTICLES:
        const { keyword, source, date } = action.payload;
        // filter implementation here for title, source and date
        if (!keyword && !source && !date) {
          return {
            ...state,
            filterArticles: state.articles,
            loading: false,
          };
        }

        let filteredArticles = [...state.articles];
        if (keyword) {
          filteredArticles = filteredArticles.filter((article) =>
            article.title.toLowerCase().includes(keyword.toLowerCase())
          );
        }
        
        if (source) {
          filteredArticles = filteredArticles.filter((article) =>
            article.source.toLowerCase().includes(source.toLowerCase())
          );
        }

       if(date){
        filteredArticles = filteredArticles.filter((article) => {
          const articleDate = new Date(article.publishedAt);
          const filterDate = new Date(date);
          articleDate.setHours(0, 0, 0, 0);
          filterDate.setHours(0, 0, 0, 0);

          return articleDate.getTime() === filterDate.getTime();
        });
       }
        return {
            ...state,
            loading: false,
            filterArticles: filteredArticles,
        };
    default:
      return state;
  }
};

export default articlesReducer;
