import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import cx from 'classnames';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: (props) => (props.theme ? props.theme.color : "#6e00c8")
  }
}));

const ListHeader = ({ list }) => {
  const { mytheme } = useSelector((GlobalState) => GlobalState.userData.datas);
  const classes = useStyles({ theme: mytheme });
  return (
    <div className={cx("list-header", classes.header)}>
      <h2 className="list-header-title show"> {list.name} </h2>
    </div>
  );
};

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListHeader;
