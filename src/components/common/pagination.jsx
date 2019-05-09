import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount===1) return null;
  const pages = _.range(1, pagesCount+1);
  //console.log(currentPage);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        {pages.map(page => (
          <li key={page} className={ page===currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={()=>onPageChange(page)}>{page}</a>
          </li>
        ))}
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
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