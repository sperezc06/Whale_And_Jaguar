import {
  IconButton,
  lighten,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const { numSelected, setRows } = props;

  const submit = () => {
    fetch(`https://restcountries.eu/rest/v2/name/${input}`)
      .then((response) => response.json())
      .then((data) => setRows(data));
    setInput("");
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Countries
        </Typography>
      )}

      {search && (
        <div className="search-div">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="search"
            placeholder="Search"
          />
          <button onClick={submit}>Search</button>
        </div>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            aria-label="filter list"
            onClick={() => setSearch(!search)}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
