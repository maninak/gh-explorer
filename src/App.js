import React, { Fragment } from 'react';
import './App.css';

import { useHttp } from './hooks/http'

function App() {
  const { fetchedData } = useHttp('https://api.github.com/search/repositories?q=ts-xor')

  const repositories = fetchedData
    ? fetchedData.items
    : []

  function renderSearchResults() {
    return (
      <Fragment>
        <h3>Search results</h3>
        <table>
          <thead>
            <tr>
              <th align='left'>Name</th>
              <th align='left'>Stars</th>
            </tr>
          </thead>
          <tbody>
          {repositories.map(repo => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.stargazers_count}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </Fragment>
    )
  }

  return (
    <div className="App">
      {renderSearchResults()}
    </div>
  );
}

export default App;
