import React, { Fragment, useState } from 'react';
import { debounce } from 'lodash-es'

import './App.css';
import { useHttp } from './hooks/http'

function App() {
  const [searchKey, setSearchKey] = useState('react')
  const { fetchedData } = useHttp(`https://api.github.com/search/repositories?q=${searchKey}`, [setSearchKey])

  const repositories = fetchedData
    ? fetchedData.items
    : []

  function renderSearchInput() {
    const debouncedSetSearchKey = debounce(e => setSearchKey(e.target.value.trim()), 300)

    return (
      <input
        type="search"
        placeholder="Search repositories..."
        onChange={e => {
          e.persist()
          debouncedSetSearchKey(e)
        }}
        autoFocus
      />
    )
  }

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
              <td>{repo.full_name}</td>
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
      {renderSearchInput()}
      {renderSearchResults()}
    </div>
  );
}

export default App;
