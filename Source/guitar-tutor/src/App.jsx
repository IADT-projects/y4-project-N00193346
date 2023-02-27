import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import adapter from "webrtc-adapter";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";

import Menu from "./components/Menu";
import Videos from "./components/Videos";
import Amp from "./components/Amp";

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
`;

export const VideoStream = styled.video`
  background-color: black;
  width: 100%;
  height: 300px;
`;

const firebaseConfig = {
  apiKey: "AIzaSyAELfHh4mgVaAuqujhydOpoMhx5YrwWKRQ",
  authDomain: "testing-video-bf1a8.firebaseapp.com",
  projectId: "testing-video-bf1a8",
  storageBucket: "testing-video-bf1a8.appspot.com",
  messagingSenderId: "806540157505",
  appId: "1:806540157505:web:05d2f36e25a3f3eb695cc0",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  //Change Page
  const [currentPage, setCurrentPage] = useState("home");
  //Code used to answer call
  const [joinCode, setJoinCode] = useState("");

  console.log("Browser: " + adapter.browserDetails.version);

  return (
    <div className="app">
      {currentPage === "home" ? (
        <Menu
          joinCode={joinCode}
          setJoinCode={setJoinCode}
          setPage={setCurrentPage}
        />
      ) : (
        <Videos mode={currentPage} callId={joinCode} setPage={setCurrentPage} />
      )}

      <Amp />
    </div>
  );
}

export default App;
