import http from "http";
import { Server } from "socket.io";

const server = http.createServer((req, res) => {
  // rota simples para teste
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket server is running");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Cliente conectado:", socket.id);

  socket.on("join-room", (roomId) => {
    console.log(`🚪 Socket ${socket.id} entrou na sala ${roomId}`);
    socket.join(roomId);

    const otherSockets = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
      .filter((id) => id !== socket.id);

    if (otherSockets.length > 0) {
      console.log(`👥 Notificando ${socket.id} sobre outro usuário ${otherSockets[0]}`);
      socket.emit("other-user", otherSockets[0]);
      socket.to(otherSockets[0]).emit("other-user", socket.id);
    }
  });

  socket.on("offer", ({ target, caller, sdp }) => {
    console.log(`📤 Offer recebida de ${socket.id} para ${target}`);
    socket.to(target).emit("offer", { caller: socket.id, sdp });
    console.log(`➡️ Offer repassada para ${target}`);
  });

  socket.on("answer", ({ target, caller, sdp }) => {
    console.log(`📤 Answer recebida de ${socket.id} para ${target}`);
    socket.to(target).emit("answer", { caller: socket.id, sdp });
    console.log(`➡️ Answer repassada para ${target}`);
  });

  socket.on("ice-candidate", ({ target, caller, candidate }) => {
    console.log(`❄️ ICE recebido de ${socket.id} para ${target}`);
    socket.to(target).emit("ice-candidate", { caller: socket.id, candidate });
    console.log(`➡️ ICE repassado para ${target}`);
  });
  
  socket.on("disconnect", () => {
    console.log("❌ Cliente saiu:", socket.id);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🚀 Socket server listening on port ${port}`);
});
