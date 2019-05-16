import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount===1) return null;
  const pages = _.range(1, pagesCount+1);
  
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <Link to="" className="page-link"><span aria-hidden="true">&laquo;</span></Link>
        </li>
        {pages.map(page => (
          <li key={page} className={ page===currentPage ? 'page-item active' : 'page-item'}>
            <Link to="" className="page-link" onClick={()=>onPageChange(page)}>{page}</Link>
          </li>
        ))}
        <li className="page-item">
          <Link to="" className="page-link"><span aria-hidden="true">&raquo;</span></Link>
        </li>
      </ul>
    </nav>
  )
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;