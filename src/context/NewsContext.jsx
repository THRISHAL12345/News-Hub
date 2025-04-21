import { createContext, useState, useContext, useEffect } from 'react';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('top');
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('newsBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article) => {
    setBookmarks(prevBookmarks => {
      const isBookmarked = prevBookmarks.some(bookmark => bookmark.article_id === article.article_id);
      if (isBookmarked) {
        return prevBookmarks.filter(bookmark => bookmark.article_id !== article.article_id);
      } else {
        return [...prevBookmarks, article];
      }
    });
  };

  const isBookmarked = (articleId) => {
    return bookmarks.some(bookmark => bookmark.article_id === articleId);
  };

  const value = {
    news,
    setNews,
    loading,
    setLoading,
    error,
    setError,
    category,
    setCategory,
    bookmarks,
    toggleBookmark,
    isBookmarked
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};