import { useNews } from '../context/NewsContext';
import NewsList from '../components/NewsList';
import PageHeader from '../components/PageHeader';

const BookmarkedNews = () => {
  const { bookmarks, setNews, setLoading, setError } = useNews();

  // Set bookmarks as the current news list
  setNews(bookmarks);
  setLoading(false);
  setError(null);

  return (
    <div className="container-custom py-8">
      <PageHeader 
        title="Bookmarked News" 
        description="Your personally curated collection of saved articles."
      />
      <NewsList />
    </div>
  );
};

export default BookmarkedNews;