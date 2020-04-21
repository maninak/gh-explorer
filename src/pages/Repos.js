import React, { useState } from 'react';
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
} from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { useFetch } from 'use-http'
import { useUrlSearchParams } from 'use-url-search-params';

export function Repos() {
  const [urlParams, setUrlParams] = useUrlSearchParams({ q: 'react' }, { q: String})
  const [searchKey, setSearchKey] = useState(urlParams.q)
  const { data } = useFetch({ path: `/search/repositories?q=${searchKey}` }, [searchKey])

  const repositories = data?.items ?? []

  function renderSearchInput() {
    return (
        <IonSearchbar
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
        {renderSearchResults()}
      </IonContent>
    </IonPage>
  )
}