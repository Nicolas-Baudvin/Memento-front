import React from "react";
import PropTypes from 'prop-types';

const ListHeader = ({ list }) => {
  return (
    <div className="list-header">
      <h2 className="list-header-title show"> {list.name} </h2>
    </div>
  );
};

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListHeader;
