import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//Context
import { SyncContext } from "../context/SyncContext";

import "../styles/SyncMobile.css";

import io from "socket.io-client";
const socket = io("https://syncme-websockets-server.herokuapp.com:4000", { transports: ["websocket"] });

export default function SyncMobile() {
  const { rootId, mobileId } = useParams();
  const { setRootId, setMobileId } = useContext(SyncContext);

  useEffect(() => {
    if (rootId && mobileId) {
      setRootId(rootId);
      setMobileId(mobileId);
      socket.emit(
        "sync-status",
        `{"rootId": ${rootId}, "mobileId": ${mobileId}, "isSync": true}`
      );
    }
  }, [rootId, mobileId, setRootId, setMobileId]);

  return (
    <div className="container-home">
      {rootId && mobileId ? (
        <>
          <button
            className="big-boy"
            onClick={() =>
              socket.emit(
                "in-game-event",
                `{"rootId": ${rootId}, "mobileId": ${mobileId}, "isJump": true, "isReset": false}`
              )
            }
          >
            Jump?
          </button>
          <button
            onClick={() =>
              socket.emit(
                "in-game-event",
                `{"rootId": ${rootId}, "mobileId": ${mobileId}, "isJump": false, "isReset": true}`
              )
            }
          >
            Reset?
          </button>
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
