import React from 'react';

export const SkeletonLoader = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className={`animate-pulse bg-white/5 rounded-lg ${className}`}
        ></div>
      ))}
    </>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="w-full bg-surface border border-white/5 rounded-lg overflow-hidden">
      <div className="flex border-b border-white/5 p-4 bg-white/5">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="flex-1 px-4">
            <SkeletonLoader className="h-4 w-24" />
          </div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex border-b border-white/5 p-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="flex-1 px-4">
              <SkeletonLoader className="h-4 w-full max-w-[80%]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
