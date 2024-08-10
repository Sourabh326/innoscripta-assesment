import {
  fetchNewsAPIArticles,
  fetchGuardianArticles,
  fetchNYTArticles,
} from "../../services/newsService";
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SEARCH_ARTICLES,
} from "../constants/types";

export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});

export const fetchArticlesSuccess = (articles) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: articles,
});

export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});

export const searchArticles = (filters) => ({
  type: SEARCH_ARTICLES,
  payload: filters,
});

const AllFetchRequest = [
  fetchNewsAPIArticles(),
  fetchNYTArticles(),
  fetchGuardianArticles(),
];

export const fetchArticles = () => {
  return async function (dispatch) {
    dispatch(fetchArticlesRequest());

    try {
      const resultsPromises = await Promise.allSettled(AllFetchRequest);

      const successfulResults = [];
      resultsPromises?.filter((result, index) => {
        if (result.status === "fulfilled") {
          successfulResults[index] = result.value;
        } else {
          console.error(`Failed to fetch API ${index + 1}:`, result.reason);
        }
      });
      const [newsAPIArticles, nytAPIArticles, guardianAPIArticles] =
        await Promise.all(successfulResults);

      const allArticles = [
        ...(newsAPIArticles && newsAPIArticles.length > 0
          ? newsAPIArticles.map((article) => ({
              title: article.title,
              source: article.source.name,
              description: article.description,
              url: article.url,
              publishedAt: article.publishedAt,
              author: article.author || "Unknown Author",
            }))
          : []),

        ...(nytAPIArticles && nytAPIArticles.length > 0
          ? nytAPIArticles.map((article) => ({
              title: article.title,
              source: "NYT",
              description: article.abstract,
              url: article.url,
              publishedAt: article.published_date,
              multimedia: article.multimedia,
              subsection: article.subsection,
            }))
          : []),
        ...(guardianAPIArticles && guardianAPIArticles.length > 0
          ? guardianAPIArticles.map((article) => ({
              title: article.webTitle,
              source: article.fields.publication,
              description: article.fields.bodyText,
              url: article.webUrl,
              publishedAt: article.webPublicationDate,
              subsection: article.sectionName,
            }))
          : []),
      ];
      const shuffledArticles = allArticles.sort(() => Math.random() - 0.5);
      dispatch(fetchArticlesSuccess(shuffledArticles));
    } catch (error) {
      dispatch(
        fetchArticlesFailure(
          "Failed to fetch articles. Please try again later."
        )
      );
    }
  };
};
