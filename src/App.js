import { useState, useEffect } from "react";
import Film from "./Film";
import "./styles.css";

export default function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFilms, setShowFilms] = useState(false);
  const query = `
  query {
      allFilms {
        films {
          title
          producers
          releaseDate
        }
      }
    }
    `;

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi-graphql.netlify.app/.netlify/functions/index`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    })
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;

  function showFilmsButton() {
    if (showFilms === true) {
      setShowFilms(false);
    } else if (showFilms === false) {
      setShowFilms(true);
    }
  }

  function addFilms() {
    if (showFilms === true) {
      return (
        <div className="App">
          {data.data.allFilms.films.map((film) => (
            <Film
              title={film.title}
              producers={film.producers}
              releaseDate={film.releaseDate}
            />
          ))}
        </div>
      );
    }
  }
  return (
    <div>
      <button onClick={showFilmsButton}>Show films</button>;{addFilms()}
    </div>
  );
}
