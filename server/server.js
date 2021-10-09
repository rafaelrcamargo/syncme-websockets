const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function (socket) {
  socket.on("test-message", function (data) {
    io.emit("test-message-confimation", data);
  });
  socket.on("sync-status", function (data) {
    io.emit("sync-confimation", data);
  });
  socket.on("in-game-event", function (data) {
    data = JSON.parse(data);
    if (data.isJump) {
      io.emit(
        "in-game-jump-event",
        `{"rootId": ${data.rootId}, "mobileId": ${data.mobileId}}`
      );
    }

    if (data.isReset) {
      io.emit(
        "in-game-reset-event",
        `{"rootId": ${data.rootId}, "mobileId": ${data.mobileId}}`
      );
    }
  });
});

http.listen(4000, function () {
  console.log("listening on *:4000");
});
