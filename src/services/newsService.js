import axios from 'axios';
import { NEWS_API_URL, GUARDIAN_API_URL, NYT_API_URL } from './constants';

// API keys
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;  
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;  
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

// Fetch articles from NewsAPI
export const fetchNewsAPIArticles = async () => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      apiKey: NEWS_API_KEY,
      category: 'general',
    },
  });
  return response.data.articles;
};

// Fetch articles from The Guardian
export const fetchGuardianArticles = async () => {
  const response = await axios.get(GUARDIAN_API_URL, {
    params: {
      'api-key': GUARDIAN_API_KEY,
      section: 'news',
      'show-fields': 'all',
    },
  });
  return response.data.response.results;
};

// Fetch articles from The New York Times
export const fetchNYTArticles = async () => {
  const response = await axios.get(NYT_API_URL, {
    params: {
      'api-key': NYT_API_KEY,
    },
  });
  return response.data.results;
};
