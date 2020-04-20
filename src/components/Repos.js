import React, { useState } from 'react';
import {
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSearchbar,
  IonIcon,
  IonAvatar,
} from '@ionic/react';
import { starOutline } from 'ionicons/icons';

import { useHttp } from '../hooks/http'

import './Repos.css'

export function Repos() {
  const [searchKey, setSearchKey] = useState('react')
  const { fetchedData } = useHttp(`https://api.github.com/search/repositories?q=${searchKey}`, [setSearchKey])

  const repositories = fetchedData
    ? fetchedData.items
    : []

  function renderSearchInput() {
    return (
        <IonSearchbar
          inputmode="search"
          placeholder="Search repositories..."
          onIonChange={e => setSearchKey(e.detail.value.trim())}
          debounce={300}
          animated
        />
    )
  }

  function renderSearchResults() {
    return (
      <IonList>
        <IonListHeader>Search results</IonListHeader>
        {repositories.map(repo => (
          <IonItem key={repo.id} href="">
            <IonAvatar slot="start">
              <img
               src={repo.owner.avatar_url}
               alt={repo.owner.login}
               loading="lazy"
              />
            </IonAvatar>
            <IonLabel>
              <h2>{repo.name}</h2>
              <h3>{repo.owner.login}</h3>
              <p>{repo.description}</p>
              <div className="stargazers">
                <IonIcon size="small" icon={starOutline} />
                <p className="stargazers-count">{repo.stargazers_count}</p>
              </div>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    )
  }

  return (
    <>
      {renderSearchInput()}
      {renderSearchResults()}
    </>
  )
}