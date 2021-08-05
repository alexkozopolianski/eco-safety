import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//стандартные стили
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: "none",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//стандартные стили
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const MoviesList = ({ searchResponse }) => {
  const classes = useStyles();
  if (searchResponse && searchResponse.Search) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Название</StyledTableCell>
              <StyledTableCell align="right">Постер</StyledTableCell>
              <StyledTableCell align="right">Год выпуска</StyledTableCell>
              <StyledTableCell align="right">Тип</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResponse.Search.map((movie) => {
              return (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <Link to={"/movieDetails/" + movie.imdbID}>
                      {" "}
                      {movie.Title}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <img src={movie.Poster} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{movie.Year}</StyledTableCell>
                  <StyledTableCell align="right">{movie.Type}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return <div>Введите Название фильма</div>;
};

// Преобразование state в данные
const mapStateToProps = (state) => ({
  searchResponse: state.searchResponse.data,
});

export default connect(mapStateToProps, null)(MoviesList);
