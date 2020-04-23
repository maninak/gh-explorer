import React, { useMemo } from 'react'
import {
  IonPage,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonAvatar,
} from '@ionic/react';
import { useFetch } from 'use-http';
import { useParams } from 'react-router-dom'

import './Repo.css'

export default React.memo(() => {
  const { repoName, repoOwner } = useParams()
  const { data: repo } = useFetch({ path: `/repos/${repoOwner}/${repoName}` }, [repoName])
  console.log('repo =', repo) // TODO: delete

  function renderRepoDetails() {
    return (
      <>
        <div className="backdrop-container">
          <div className="gradient-overlay" />
          <div className="backdrop-pattern" />
        </div>
        <div className="owner-avatar-container">
          <IonAvatar className="owner-avatar">
            <img
              src={repo?.owner.avatar_url}
              alt={repo?.owner.login}
              height="120"
              width="120"
              loading="lazy"
            />
          </IonAvatar>
        </div>
        <p className="ion-padding">Not much to see here yet...</p>
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
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{repoName} by {repoOwner}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {useMemo(renderRepoDetails, [repo])}
      </IonContent>
    </IonPage>
  )
})
