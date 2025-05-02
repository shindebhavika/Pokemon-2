import React from 'react'

function Pagination({totalPages, currentPage,handlePageChange}) {
  return (
    <div>
      {totalPages > 1 && (
  <nav aria-label="Pagination Navigation" className="mt-8 flex justify-center">
    <ul className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md dark:bg-[#1c1c27] dark:border-gray-700">
      {/* Previous Button */}
      <li>
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          </li>
        );
      })}

      {/* Next Button */}
      <li>
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
)}

    </div>
  )
}

export default Pagination
