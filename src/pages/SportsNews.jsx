import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import PageHeader from '../components/PageHeader';

const SportsNews = () => {
  const { setNews, setLoading, setError, setCategory } = useNews();

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setCategory('sports');
        const newsData = await fetchNews('sports');
        setNews(newsData);
        setError(null);
      } catch (error) {
        setError(error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    getNews();

    // Cleanup function
    return () => {
      setNews([]);
    };
  }, [setNews, setLoading, setError, setCategory]);

  return (
    <div className="container-custom py-8">
      <PageHeader 
        title="Sports News" 
        description="Follow the latest scores, highlights, and updates from the world of sports."
      />
      <NewsList />
    </div>
  );
};

export default SportsNews;