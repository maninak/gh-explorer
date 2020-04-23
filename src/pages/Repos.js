import React, { useState, useMemo, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonSearchbar,
  IonIcon,
  IonAvatar,
  isPlatform,
} from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { useFetch } from 'use-http'
import { useUrlSearchParams } from 'use-url-search-params';

import './Repos.css'

export default React.memo(() => {
  const [urlParams, setUrlParams] = useUrlSearchParams({ q: 'tetris' }, { q: String})
  const [searchKey, setSearchKey] = useState(urlParams.q)
  const { data: { items: repositories } } = useFetch({
    path: `/search/repositories?q=${searchKey}`,
    data: { items: [] }
  }, [searchKey])

  useEffect(()=> {
    if (isPlatform('desktop')) {
      const inputEl = document.querySelector('#repo-searchbar input')
      inputEl && inputEl.focus()
    }
  })

  function renderSearchInput() {
    return (
        <IonSearchbar
          id="repo-searchbar"
          value={searchKey}
          inputmode="search"
          placeholder="Search repositories..."
          onIonChange={e => {
            const newSearchKey = e.detail.value.trim()
            setSearchKey(newSearchKey)
            setUrlParams({ q: newSearchKey })
          }}
          debounce={300}
          animated
        />
    )
  }

  function renderSearchResults() {
    console.log('rendered results ') // TODO: delete
    return (
      <IonList>
        <IonListHeader>Search results</IonListHeader>
        {repositories.map(repo => (
          <IonItem key={repo.id} routerLink={`/repos/${repo.owner.login}/${repo.name}`}>
            <IonAvatar slot="start">
              <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              height="40"
              width="40"
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
    <IonPage className="repos">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Github Explorer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {renderSearchInput()}
        {useMemo(renderSearchResults, [repositories])}
      </IonContent>
    </IonPage>
  )
})
