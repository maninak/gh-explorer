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
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { useFetch } from 'use-http';
import { useParams } from 'react-router-dom'

import './Repo.css'

export default React.memo(() => {
  const { repoName, repoOwner } = useParams()
  const { data: repo } = useFetch({ path: `/repos/${repoOwner}/${repoName}` }, [repoName])
  const detailsUrlPrefix = `https://github.com/${repoOwner}/${repoName}`

  function renderRepoDetails() {
    return (
      <article>
        <div className="backdrop-container">
          <div className="backdrop-pattern" />
          <div className="gradient-overlay" />
        </div>
        <div className="avatar-container">
          <div className="avatar-wrap">
            <div className="avatar-bg" />
            <IonAvatar className="avatar">
              <img
                src={repo?.owner.avatar_url}
                alt={repo?.owner.login}
                height="120"
                width="120"
                loading="lazy"
              />
            </IonAvatar>
          </div>
        </div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol style={{ maxWidth: "500px"}}>
              <IonList>
                <IonListHeader>Details</IonListHeader>
                <IonItem>
                  <IonLabel>Language</IonLabel>
                  <IonBadge slot="end">{repo?.language}</IonBadge>
                </IonItem>
                <IonItem href={`${detailsUrlPrefix}/stargazers`}>
                  <IonLabel>Stargazers</IonLabel>
                  <IonBadge slot="end">{repo?.stargazers_count}</IonBadge>
                </IonItem>
                <IonItem href={`${detailsUrlPrefix}/issues`}>
                  <IonLabel>Issues</IonLabel>
                  <IonBadge slot="end">{repo?.open_issues_count}</IonBadge>
                </IonItem>
                <IonItem href={`${detailsUrlPrefix}/network/members`}>
                  <IonLabel>Forks</IonLabel>
                  <IonBadge slot="end">{repo?.forks_count}</IonBadge>
                </IonItem>
                <IonItem>
                  <IonLabel>Visibility</IonLabel>
                  <IonBadge slot="end">{repo?.private ? 'private' : 'public'}</IonBadge>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/*
        homepage link
        link to repo in github
        readme (in iframe?)
        share FAB */}
      </article>
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
      <IonContent>
        {useMemo(renderRepoDetails, [repo])}
      </IonContent>
    </IonPage>
  )
})
