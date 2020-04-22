import React, { useMemo } from 'react'
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
import { useParams } from 'react-router-dom'

function Repo() {
  const { repoName, repoOwner } = useParams()
  const { data: repo } = useFetch({ path: `/repos/${repoOwner}/${repoName}` }, [repoName])
  console.log('repo =', repo) // TODO: delete

  function renderRepoDetails() {
    return (
      <>
        <p>Not much to show yet...</p>
        {/* <br/><br/>
        github icon avatar
        {repoName}
        repo owner avatar
        {repoOwner}
        {repo?.full_name}
        {repo?.private ? 'private' : 'public'}
        homepage link
        lint to repo in github
        stars with link
        language
        open issues count with link
        forks count with link
        readme (in iframe?)
        share FAB */}
      </>
    )
  }

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
        {useMemo(renderRepoDetails, [repo])}
      </IonContent>
    </IonPage>
  )
}

export default React.memo(Repo)
