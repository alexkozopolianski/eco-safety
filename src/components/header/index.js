import React, { useState, useCallback, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";

import Search from "./search";
import { loadMovies, displayMovieDetails } from "../../store/actions/index";

//стандартные стили
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing("auto"),
    flexGrow: 0,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    margin: "0 auto",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing("auto"),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchAppBar = ({ loadMovies, searchResponse, displayMovieDetails }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              ЭКО-БЕЗОПАСТНОСТЬ
            </NavLink>
          </Typography>
          <div className={classes.search}>
            <Search
              loadMovies={loadMovies}
              searchResponse={searchResponse}
              displayMovieDetails={displayMovieDetails}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchResponse: state.searchResponse.data,
});

export default connect(mapStateToProps, { loadMovies, displayMovieDetails })(
  SearchAppBar
);
