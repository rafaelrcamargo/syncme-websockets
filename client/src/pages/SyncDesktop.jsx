import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Context
import "../styles/SyncDesktop.css";

import io from "socket.io-client";
const socket = io("wss://syncme-websockets-server.vercel.app:4000", { transports: ["websocket"] });

export default function SyncDesktop() {
  const { rootId, mobileId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const playGame = () => {
    document.querySelector(".loading").style.opacity = 0;
    document.querySelector(".cactus").style.animationName = "cactus";
    document.querySelector(".ground").style.animationName = "ground";
  };

  useEffect(() => {
    socket.on("in-game-jump-event", (data) => {
      data = JSON.parse(data);
      if (data.rootId === parseInt(rootId) && data.mobileId === parseInt(mobileId)) {
        handleJump();
      }
    });
    socket.on("in-game-reset-event", (data) => {
      data = JSON.parse(data);
      if (data.rootId === parseInt(rootId) && data.mobileId === parseInt(mobileId)) {
        window.location.reload();
      }
    });
  }, []);

  useEffect(() => {
    if (document.querySelector(".dino")) {
      playGame();
      setIsLoaded(true);
    }
  }, [document]);

  let isAlive = setInterval(function () {
    if (isLoaded) {
      const dino = document.querySelector(".dino");
      const cactus = document.querySelector(".cactus");
      let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
      );
      let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 110) {
        // collision
        isAlive = "";
        document.querySelector(".game-over").style.opacity = 1;
        document.querySelector(".game-over svg").style.animationName =
          "gameover";
      }
    }
  }, 10);
  console.log(isAlive);

  const handleJump = () => {
    if (document.querySelector(".dino").classList.length > 1) {
      document.querySelector(".dino").classList.remove("dino--jumping");
    }
    document.querySelector(".dino").classList.add("dino--jumping");
    setTimeout(() => {
      document.querySelector(".dino").classList.remove("dino--jumping");
    }, 800);
  };

  return (
    <div className="container-home">
      {rootId && mobileId ? (
        <>
          <div className="game-screen">
            <div className="dino"></div>
            <div className="cactus"></div>
            <div className="ground"></div>
            <div className="loading">
              <img
                width="20"
                src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
                alt="loading"
              />
            </div>
            <div className="game-over">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="skull"
                className="svg-inline--fa fa-skull fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#fe2220"
                  d="M256 0C114.6 0 0 100.3 0 224c0 70.1 36.9 132.6 94.5 173.7 9.6 6.9 15.2 18.1 13.5 29.9l-9.4 66.2c-1.4 9.6 6 18.2 15.7 18.2H192v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h64v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h77.7c9.7 0 17.1-8.6 15.7-18.2l-9.4-66.2c-1.7-11.7 3.8-23 13.5-29.9C475.1 356.6 512 294.1 512 224 512 100.3 397.4 0 256 0zm-96 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm192 0c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
                ></path>
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="subtitle-home">
            <i>Loading...</i>
          </p>
        </>
      )}
    </div>
  );
}
