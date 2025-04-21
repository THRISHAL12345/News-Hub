import axios from 'axios';
const BASE_URL = 'https://gnews.io/api/v4';

// Cache storage
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const getCategoryParam = (category) => {
  switch (category) {
    case 'world':
      return 'world';
    case 'tech':
      return 'technology';
    case 'sports':
      return 'sports';
    default:
      return 'general';
  }
};

const getCacheKey = (category) => {
  const categoryParam = getCategoryParam(category);
  return `news_${categoryParam}`;
};

const isValidCache = (cacheEntry) => {
  return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
};

const transformArticle = (article) => ({
  article_id: article.url, // Using URL as unique identifier
  title: article.title,
  description: article.description,
  image_url: article.image,
  link: article.url,
  pubDate: article.publishedAt,
  source_id: article.source?.name
});

export const fetchNews = async (category = 'top') => {
  try {
    const cacheKey = getCacheKey(category);
    const cachedData = cache.get(cacheKey);

    if (isValidCache(cachedData)) {
      return cachedData.data;
    }

    const categoryParam = getCategoryParam(category);
    const endpoint = `${BASE_URL}/top-headlines?category=${categoryParam}&lang=en&apikey=${import.meta.env.VITE_API_KEY}&max=10`;
    
    const response = await axios.get(endpoint);
    
    if (response.data.articles) {
      const transformedArticles = response.data.articles.map(transformArticle);
      
      cache.set(cacheKey, {
        data: transformedArticles,
        timestamp: Date.now()
      });
      
      return transformedArticles;
    } else {
      throw new Error('Failed to fetch news data');
    }
  } catch (error) {
    console.error('API Error:', error);
    
    // Return cached data if available, even if expired
    const cacheKey = getCacheKey(category);
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached data due to API error');
      return cachedData.data;
    }
    
    throw error;
  }
};
