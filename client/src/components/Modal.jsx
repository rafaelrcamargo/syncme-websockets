import React from 'react'

export   const Modal = (data) => {
  data = JSON.parse(data.data);
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <h1>Test message.</h1>
        <h2>
          Root Id: <span>{data.rootId}</span>
        </h2>
        <h2>
          Mobile Id: <span>{data.mobileId}</span>
        </h2>
        <h2>
          TimeStamp: <span>{data.timeStamp}</span>
        </h2>
        <button onClick={() => setIsModal(undefined)}>Close</button>
      </div>
    </div>
  );
};

