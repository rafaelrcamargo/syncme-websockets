import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Libs
import QRCode from "react-qr-code";

//Context
import { SyncContext } from "../context/SyncContext";
import { Modal } from "../components/Modal";

import "../styles/Home.css";
import "../styles/Modal.css";

import io from "socket.io-client";
const socket = io("wss://syncme-websockets-server.vercel.app:4000", { transports: ["websocket"] });

export default function Home() {
  const { rootId, mobileId } = useContext(SyncContext);
  const [isModal, setIsModal] = useState(false);
  let history = useHistory();

  useEffect(() => {
    socket.on("test-message-confimation", (data) => setIsModal(data));
    socket.on("sync-confimation", (data) => {
      data = JSON.parse(data);
      if (data.isSync) {
        if (data.rootId === parseInt(rootId) && data.mobileId === parseInt(mobileId)) {
          history.push(`/sync-desktop/${rootId}/${mobileId}`);
        }
      }
    });
  }, [rootId, mobileId]);

  const sendTestMessage = (e) => {
    socket.emit(
      "test-message",
      `{"rootId": ${rootId}, "mobileId": ${mobileId}, "timeStamp": ${Math.round(
        e.timeStamp
      )}}`
    );
  };

  return (
    <>
      {isModal && <Modal data={isModal} />}
      <div className="container-home">
        <h1 className="title-home">SyncMe.</h1>
        <p className="subtitle-home">
          A little project based on <strong>syncing desktop</strong>
          and <strong>mobile browser</strong>, and then interacting themselves.
        </p>
        <a
          href={`${window.location.href}sync-mobile/${rootId}/${mobileId}`}
          target="_blank"
          rel="noreferrer"
        >
          <QRCode
            className="qr-home"
            title={`${window.location.host}/sync-mobile/${rootId}/${mobileId}`}
            value={`${window.location.host}/sync-mobile/${rootId}/${mobileId}`}
            bgColor="#f5e7d5"
            fgColor="#262523"
            size={384}
          />
        </a>
        <button onClick={sendTestMessage}>Test message.</button>
      </div>
    </>
  );
}
