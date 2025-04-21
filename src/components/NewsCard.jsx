import { useNews } from '../context/NewsContext';

const NewsCard = ({ article }) => {
  const { toggleBookmark, isBookmarked } = useNews();
  const bookmarked = isBookmarked(article.article_id);
  
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=News+Image';
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card h-full flex flex-col animate-slide-up">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={article.image_url || 'https://placehold.co/600x400/e2e8f0/64748b?text=News+Image'}
          alt={article.title || "News image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={handleImageError}
        />
        
        <div className="absolute top-2 right-2 flex gap-2">
          {article.source_id && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
              {article.source_id}
            </span>
          )}
          <button
            onClick={() => toggleBookmark(article)}
            className={`p-1 rounded-full ${
              bookmarked ? 'bg-accent-600 text-white' : 'bg-white text-neutral-600'
            }`}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {article.title || "Untitled"}
          </h3>
          
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 font-serif">
            {article.description || "No description available."}
          </p>
        </div>
        
        <div className="mt-auto">
          {article.pubDate && (
            <p className="text-neutral-500 text-xs mb-2">
              {formatDate(article.pubDate)}
            </p>
          )}
          
          {article.link && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary-600 font-medium text-sm hover:text-primary-800 transition-colors"
            >
              Read full article
              <span className="ml-1">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;