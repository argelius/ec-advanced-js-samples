import React, { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';

import axios from "axios";

function App() {
  const [query, updateQuery] = useState("");
  const [countries, updateCountries] = useState([]);
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(
    () => {
      if (query.length > 0) {
        axios
          .get(`https://restcountries.eu/rest/v2/name/${debouncedQuery}`)
          .then(response => {
            updateCountries(response.data);
          })
          .catch(error => {
            updateCountries([]);
          });
      }
    },
    [debouncedQuery]
  );

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={e => updateQuery(e.target.value)}
      />
      {query.length === 0 ? (
        <p>Search for something!</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capital</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.numericCode}>
                <td>{country.name}</td>
                <td>{country.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
