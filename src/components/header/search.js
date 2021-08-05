import React, { useState, useCallback, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debounce from "lodash.debounce";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";

//нужна для ассинхронного действия выпадающего списка
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

//компонент с поиском
const Search = ({ loadMovies, searchResponse, displayMovieDetails }) => {
  const [movie, setMovie] = useState("");
  const inputRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options && options.length === 0;

  //функция которая при  изменении текста в инпуте отправляет введенное слово
  const handleChangeMovieText = useCallback(
    debounce((movie) => {
      setMovie(movie);
      loadMovies(movie);
    }, 1000),
    [inputRef]
  );

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1000);
      const movies = await searchResponse.Search; //жду пока появятся данные
      const newMovies =
        (await movies) &&
        movies.map((topFilms) => {
          return {
            title: topFilms.Title,
            year: topFilms.Year,
            id: topFilms.imdbID,
          };
        }); //преобразую данные массива чтобы они могли валидироваться в autocomlete

      if (active) {
        setOptions(newMovies); //добавляю массив который выглядит теперь [{title: 'examle', year:'year', id:'id'}],а не  [{Title: 'examle', Year:'year', Id:'id'}]
      }
    })();
    return () => {
      active = false;
    };
  }, [searchResponse]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderOption={(option) => (
        <React.Fragment>
          <NavLink
            onClick={(e) => displayMovieDetails(option.id)}
            to={"/movieDetails/" + option.id}
          >
            {option.title}
          </NavLink>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Введите название фильма"
          variant="outlined"
          onChange={(e) => {
            handleChangeMovieText(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
