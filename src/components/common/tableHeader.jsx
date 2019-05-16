import React, { Component } from 'react'

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {

  raiseSort = path => {
    //console.log('raise sort ' + path);
    const sortColumn = { ...this.props.sortColumn };
    if(sortColumn.path === path){
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    }
    else{
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if(column.path !== sortColumn.path) return null;
    if(sortColumn.order === "asc") return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }
 ; 

  render() {
    return (
      <thead>
        <tr>
          { this.props.columns.map(column => (
            <th 
              key={column.path || column.key} 
              onClick={() => this.raiseSort(column.path)}
              className="clickable"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}


export default TableHeader;