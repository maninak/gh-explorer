import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Provider } from 'use-http'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import Repos from './pages/Repos';
import Repo from './pages/Repo';
import { useDetectColorScheme } from './hooks/useDetectColorScheme';

import './theme/variables.css';
import './App.css';

export function App() {
  const colorScheme = useDetectColorScheme()

  return (
    <Provider url='https://api.github.com'>
      <IonApp className={`${colorScheme === 'dark' ? 'dark-theme' : ''}`}>
        <IonReactHashRouter>
          <IonRouterOutlet id="main">
            <Route path="/repos" component={Repos} exact={true} />
            <Route path="/repos/:repoOwner/:repoName" component={Repo} />
            <Redirect to="repos" />
          </IonRouterOutlet>
        </IonReactHashRouter>
      </IonApp>
    </Provider>
  );
}
