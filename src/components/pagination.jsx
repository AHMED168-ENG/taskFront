


import React from 'react'
import ReactPaginate from 'react-paginate'
import "../scss/pagination.scss"
export default function Pagination({handlePageClick , pagination}) {
  return (
    <ReactPaginate
        pageRangeDisplayed={pagination.totalDocs}
        pageCount={pagination.totalPages}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
    />
  )
}
