import React from 'react';

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    </div>
  );
}

export default LoadingSpinner;