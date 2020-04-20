import React, { useState } from 'react';
import {
  IonTitle,
  IonItem,
  IonInput,
} from '@ionic/react';

import { useHttp } from '../hooks/http'

export function Repos() {
  const [searchKey, setSearchKey] = useState('react')
  const { fetchedData } = useHttp(`https://api.github.com/search/repositories?q=${searchKey}`, [setSearchKey])

  const repositories = fetchedData
    ? fetchedData.items
    : []

  function renderSearchInput() {
    return (
      <IonItem>
        <IonInput
          type="search"
          inputmode="search"
          placeholder="Search repositories..."
          onIonChange={e => setSearchKey(e.detail.value.trim())}
          debounce={300}
          autofocus
          clearInput
        />
      </IonItem>
    )
  }

  function renderSearchResults() {
    return (
      <>
        <IonTitle>Search results</IonTitle>
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
      </>
    )
  }

  return (
    <>
      {renderSearchInput()}
      {renderSearchResults()}
    </>
  )
}