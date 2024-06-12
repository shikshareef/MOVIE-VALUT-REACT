import React from 'react';

function Pagination({ currentPage, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className='flex justify-center mt-5'>
      <button
        onClick={handlePrevious}
        className={`mx-2 px-4 py-2 bg-gray-300 text-black ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className='mx-2 px-4 py-2'>
        Page {currentPage}
      </span>
      <button
        onClick={handleNext}
        className='mx-2 px-4 py-2 bg-gray-300 text-black'
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
