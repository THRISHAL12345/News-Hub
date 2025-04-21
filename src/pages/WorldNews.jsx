import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import PageHeader from '../components/PageHeader';

const WorldNews = () => {
  const { setNews, setLoading, setError, setCategory } = useNews();

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setCategory('world');
        const newsData = await fetchNews('world');
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
        title="World News" 
        description="Explore global events and international updates from across the planet."
      />
      <NewsList />
    </div>
  );
};

export default WorldNews;