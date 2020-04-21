import React from 'react'
import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useFetch } from 'use-http';

export function Repo({ match: { params: { repoName, repoOwner }} }) {
  // const { data } = useFetch(`/repos/${repoOwner}/${repoName}`)
  // console.log('data =', data) // TODO: delete

  return (
    <IonPage className="repo">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{repoName} by {repoOwner}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Not much to show yet...</p>
      </IonContent>
    </IonPage>
  )
}