import React, { useState, useEffect } from "react";
import PokeList from "./PokeList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(result => {
        setLoading(false);
        setNextPageUrl(result.data.next);
        setPreviousPageUrl(result.data.previous);
        setPokemon(result.data.results.map(poke => poke.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function toNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function toPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  return loading ? (
    "Loading..."
  ) : (
    <React.Fragment>
      <PokeList pokemon={pokemon} />
      <Pagination toNextPage={nextPageUrl ? toNextPage : null} toPreviousPage={previousPageUrl ? toPreviousPage : null} />
    </React.Fragment>
  );
}

export default App;
