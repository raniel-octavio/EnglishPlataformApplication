import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: req.headers.origin,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        const otherSockets = Array.from(io.sockets.adapter.rooms.get(roomId) || []).filter(
          (id) => id !== socket.id
        );

        if (otherSockets.length > 0) {
          socket.emit("other-user", otherSockets[0]);
          socket.to(otherSockets[0]).emit("other-user", socket.id);
        }
      });

      socket.on("offer", ({ target, sdp }) => {
        socket.to(target).emit("offer", { caller: socket.id, sdp });
      });

      socket.on("answer", ({ target, sdp }) => {
        socket.to(target).emit("answer", { sdp });
      });

      socket.on("ice-candidate", ({ target, candidate }) => {
        socket.to(target).emit("ice-candidate", { candidate });
      });

      socket.on("disconnect", () => {
        // cleanup handled automatically by socket.io
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
