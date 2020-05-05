import React from "react";

export default ({ list }) => {
  return (
    <div className="list-header">
      <h2 className="list-header-title show"> {list.name} </h2>
    </div>
  );
};
