import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
`;

const VideoChat = () => {
  const roomId = useParams();
  const socket = io("/video");
  useEffect(() => {
    const videoGrid = document.getElementById("video-grid");
    const myPeer = new Peer(undefined, {
      host: "/",
      port: "3001",
    });
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    const peers = {};

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);

        myPeer.on("call", (call) => {
          call.answer(stream);
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });

        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      });

    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });

    myPeer.on("open", (id) => {
      socket.emit("join-room", roomId, id);
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on("close", () => {
        video.remove();
      });

      peers[userId] = call;
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    }
  }, [roomId]);

  return (
    <>
      <div id="video-grid"></div>
    </>
  );
};

export default VideoChat;
