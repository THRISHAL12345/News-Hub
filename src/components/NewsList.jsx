import NewsCard from './NewsCard';
import LoadingSkeleton from './LoadingSkeleton';
import { useNews } from '../context/NewsContext';

const NewsList = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return <LoadingSkeleton count={8} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-accent-50 text-accent-700 p-4 rounded-lg inline-block">
          <h3 className="text-lg font-semibold mb-2">Error Loading News</h3>
          <p>{error.message || 'Something went wrong. Please try again later.'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-neutral-100 p-4 rounded-lg inline-block">
          <h3 className="text-lg font-semibold mb-2">No News Available</h3>
          <p>There are currently no articles to display in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {news.map((article, index) => (
        <div 
          key={article.article_id || index} 
          className="h-full"
          style={{
            animationDelay: `${index * 0.05}s`
          }}
        >
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
};

export default NewsList;