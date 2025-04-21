import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import PageHeader from '../components/PageHeader';

const TechNews = () => {
  const { setNews, setLoading, setError, setCategory } = useNews();

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setCategory('tech');
        const newsData = await fetchNews('tech');
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
        title="Technology News" 
        description="Discover the latest innovations, gadgets, and breakthroughs in the tech world."
      />
      <NewsList />
    </div>
  );
};

export default TechNews;