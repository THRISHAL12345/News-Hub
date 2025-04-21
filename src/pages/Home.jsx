import { useEffect } from 'react';
import { useNews } from '../context/NewsContext';
import { fetchNews } from '../services/api';
import NewsList from '../components/NewsList';
import PageHeader from '../components/PageHeader';

const Home = () => {
  const { setNews, setLoading, setError, setCategory } = useNews();

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setCategory('top');
        const newsData = await fetchNews('top');
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
        title="Today's Headlines" 
        description="Stay informed with the latest top stories from around the world."
      />
      <NewsList />
    </div>
  );
};

export default Home;