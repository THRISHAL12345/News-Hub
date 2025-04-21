const LoadingSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(count)
        .fill()
        .map((_, index) => (
          <div key={index} className="card animate-pulse">
            {/* Image placeholder */}
            <div className="aspect-video bg-neutral-200"></div>
            
            {/* Content placeholders */}
            <div className="p-4">
              {/* Title placeholder */}
              <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/2 mb-4"></div>
              
              {/* Description placeholders */}
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
              
              {/* Footer placeholders */}
              <div className="h-3 bg-neutral-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LoadingSkeleton;