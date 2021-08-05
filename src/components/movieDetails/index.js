import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgressWithLabel from "./rating";

import * as displayMovieDetails from "../../store/actions/index";

//стандартные стили
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "2rem auto",
    maxWidth: "100%",
  },
  typography: {
    margin: "16px 0",
    fontSize: "40px",
    fontWeight: 400,
    lineHeight: 1.167,
    letterSpacing: "0em",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

//компонент с данными о фильме
const MovieDetailsPage = ({ movieDetails, displayMovieDetails, match }) => {
  const movieID = match.params.id;
  const classes = useStyles();
  const [loading, removeLoading] = useState(true);

  //хук для загрузки данных о фильме,только когда данные получены,тогда компонент загрузки убирается
  useEffect(async () => {
    await displayMovieDetails(movieID);
    removeLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <div>
                  <img src={movieDetails.data.Poster} alt="complex" />
                </div>
                <Grid item xs={12} sm container>
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    spacing={12}
                    className={classes.typography}
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="title">
                        {movieDetails.data.Title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Дата выхода: {movieDetails.data.Released}
                      </Typography>
                      <Typography variant="subtitle" color="subTitle">
                        {movieDetails.data.Plot}
                      </Typography>
                      <Typography variant="body1" color="title">
                        Сценаристы: {movieDetails.data.Writer}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        <Grid
                          item
                          xs
                          container
                          direction="row"
                          spacing={8}
                          className={classes.typography}
                        >
                          Оценки:
                          {movieDetails.data.Ratings.map((rating) => {
                            return (
                              <>
                                <Typography variant="subtitle" color="subTitle">
                                  {rating.Source}
                                </Typography>
                                <CircularProgressWithLabel
                                  value={rating.Value}
                                />
                              </>
                            );
                          })}
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </>
      )}
    </>
  );
};

MovieDetailsPage.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  displayMovieDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

// Преобразование state в данные
const mapStateToProps = (state) => ({
  movieDetails: state.movieDetails,
});

const mapDispatchToProps = {
  displayMovieDetails: displayMovieDetails.displayMovieDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
