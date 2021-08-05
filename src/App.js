import "./App.css";
import SearchAppBar from "./components/header/index";
import MoviesList from "./components/home/MovieList";
import { Route, Switch } from "react-router-dom";
import movieDetails from "./components/movieDetails";

function App() {
  return (
    <div className="App">
      <SearchAppBar />
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/movieDetails/:id" component={movieDetails} />
        <Route path="/movieDetails/" component={movieDetails} />
        <MoviesList />
      </Switch>
    </div>
  );
}

export default App;
