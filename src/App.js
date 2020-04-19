import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
} from '@ionic/react';

import './App.css';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';


import { useHttp } from './hooks/http'

function App() {
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
          onIonChange={e => setSearchKey(e.target.value.trim())}
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
    <div className="App">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {renderSearchInput()}
          {renderSearchResults()}
        </IonContent>
      </IonPage>
    </div>
  );
}

export default App;
