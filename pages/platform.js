import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Platform() {
  const [activeTab, setActiveTab] = useState("aulas");
  const [files, setFiles] = useState([
    { id: 1, name: "Lesson_01.pdf", type: "pdf", size: "2.4 MB", date: "2026-07-04" },
    { id: 2, name: "Grammar_Notes.pptx", type: "pptx", size: "5.1 MB", date: "2026-07-03" },
    { id: 3, name: "Pronunciation_Guide.docx", type: "docx", size: "1.8 MB", date: "2026-07-02" },
  ]);
  const [inMeeting, setInMeeting] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [meetingError, setMeetingError] = useState("");
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [otherUserId, setOtherUserId] = useState(null);
  const roomId = "english-class-room";

  const stopLocalStream = () => {
    localStream?.getTracks().forEach((track) => track.stop());
    setLocalStream(null);
    localStreamRef.current = null;
  };

  const toggleMic = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMicEnabled((prev) => !prev);
  };

  const toggleCamera = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraEnabled((prev) => !prev);
  };

  const cleanUpMeeting = () => {
    if (pcRef.current) {
      pcRef.current.ontrack = null;
      pcRef.current.onicecandidate = null;
      pcRef.current.close();
      pcRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    stopLocalStream();
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    setIsSharingScreen(false);
    setRemoteConnected(false);
    setOtherUserId(null);
  };

  const createPeerConnection = (userId) => {
  const pc = new RTCPeerConnection();

  // Adicionar tracks locais (câmera/microfone)
  if (localStreamRef.current) {
    localStreamRef.current.getTracks().forEach(track => {
      pc.addTrack(track, localStreamRef.current);
    });
  }

  // Receber tracks remotas
  pc.ontrack = (event) => {
    if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = event.streams[0];
    remoteVideoRef.current.play().catch(() => {});
    setRemoteConnected(true); // <- marca que o remoto chegou
    }
  };

  // Enviar candidatos ICE para o outro peer
  pc.onicecandidate = (event) => {
    if (event.candidate && socketRef.current) {
      socketRef.current.emit("ice-candidate", {
        target: userId,
        candidate: event.candidate,
      });
    }
  };

    pcRef.current = pc;
    return pc;
  };



  const startScreenShare = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) return;
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = screenStream;
      setIsSharingScreen(true);

      // show screen locally in the local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
        localVideoRef.current.play().catch(() => {});
      }

      // replace outgoing video track if peer connection exists
      const pc = pcRef.current;
      const screenTrack = screenStream.getVideoTracks()[0];
      if (pc && screenTrack) {
        const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
        if (sender) {
          await sender.replaceTrack(screenTrack);
        }
      }

      // stop sharing when the user stops the screen share from browser UI
      screenTrack.onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error("Erro ao iniciar compartilhamento de tela:", err);
    }
  };

  const stopScreenShare = async () => {
    const screenStream = screenStreamRef.current;
    if (screenStream) {
      screenStream.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    setIsSharingScreen(false);

    // restore camera stream locally
    const camStream = localStreamRef.current;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = camStream;
      if (camStream) localVideoRef.current.play().catch(() => {});
    }

    // replace outgoing video track with camera if pc exists
    const pc = pcRef.current;
    if (pc && camStream) {
      const camTrack = camStream.getVideoTracks()[0];
      const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
      if (sender && camTrack) {
        try {
          await sender.replaceTrack(camTrack);
        } catch (err) {
          console.warn("Não foi possível restaurar track de câmera:", err);
        }
      }
    }
  };

  const handleReceiveOffer = async ({ sdp, caller }) => {
    if (!socketRef.current) return;
    const pc = createPeerConnection(caller);
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socketRef.current.emit("answer", {
      target: caller,
      sdp: pc.localDescription,
    });
  };

  const handleReceiveAnswer = async ({ sdp }) => {
    if (!pcRef.current) return;
    await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
  };

  const handleReceiveIce = async ({ candidate }) => {
    if (!pcRef.current || !candidate) return;
    await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  const callUser = async (userId) => {
    if (!socketRef.current || !localStream) return;
    const pc = createPeerConnection(userId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit("offer", {
      target: userId,
      sdp: pc.localDescription,
    });
  };

  const initSocket = async () => {
  if (socketRef.current) return;
  const { io } = await import("socket.io-client");

  // usar o link direto do Render
  const socketUrl = "https://englishplataformapplication.onrender.com";
  const socketPath = "/socket.io"; // padrão do socket.io

  const socket = io(socketUrl, {
    path: socketPath,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("✅ Conectado ao socket:", socket.id);
    socket.emit("join-room", roomId);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Erro de conexão:", err.message);
  });

  socket.on("other-user", (userId) => {
    setOtherUserId(userId);
    callUser(userId);
  });

  socket.on("offer", handleReceiveOffer);
  socket.on("answer", handleReceiveAnswer);
  socket.on("ice-candidate", handleReceiveIce);

  socketRef.current = socket;
};



  const handleStartMeeting = async () => {
    setMeetingError("");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Seu navegador não suporta câmera e microfone.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;
      setLocalStream(stream);

      await initSocket();
      setInMeeting(true);
      setActiveTab("reunion");
    } catch (error) {
      console.error("Erro ao acessar câmera/microfone:", error);
      setMeetingError("Não foi possível acessar câmera e microfone. Verifique as permissões do navegador.");
      setInMeeting(false);
    }
  };

  useEffect(() => {
    if (!localStream || !inMeeting) return;
    const videoEl = localVideoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.srcObject = localStream;
    videoEl.play().catch(() => {});
  }, [localStream, inMeeting]);

  useEffect(() => {
    return () => {
      cleanUpMeeting();
    };
  }, []);

  const upcomingClasses = [
    { id: 1, title: "Business English", teacher: "Sarah Johnson", date: "2026-07-05", time: "18:00", status: "próxima" },
    { id: 2, title: "Conversational Practice", teacher: "Mike Davis", date: "2026-07-07", time: "20:00", status: "agendada" },
    { id: 3, title: "Grammar Review", teacher: "Robert Green", date: "2026-07-08", time: "19:00", status: "agendada" },
  ];

  const calendarEvents = [
    { date: "2026-07-05", title: "Business English", time: "18:00" },
    { date: "2026-07-06", title: "Study Group", time: "15:00" },
    { date: "2026-07-07", title: "Conversational Practice", time: "20:00" },
    { date: "2026-07-08", title: "Grammar Review", time: "19:00" },
  ];

  const getFileIcon = (type) => {
    const icons = {
      pdf: "📄",
      pptx: "📊",
      docx: "📝",
      mp3: "🎵",
      mp4: "🎥",
    };
    return icons[type] || "📦";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    hover: { y: -5, boxShadow: "0 10px 30px rgba(250, 204, 21, 0.15)" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-3 sm:px-4 py-6 sm:py-15">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-black mb-2">
              <span className="text-white">Sua Plataforma de </span>
              <span className="text-yellow-400">Aprendizado</span>
            </h1>
            <p className="text-lg text-blue-100">Organize aulas, arquivos e reuniões em um só lugar</p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { id: "aulas", label: "📚 Minhas Aulas", icon: "📚" },
              { id: "reunion", label: "🎥 Reunião", icon: "🎥" },
              { id: "files", label: "📁 Arquivos", icon: "📁" },
              { id: "calendar", label: "📅 Calendário", icon: "📅" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-slate-900 shadow-lg"
                    : "bg-slate-800/50 border border-blue-400/30 text-blue-100 hover:border-yellow-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Aulas Tab */}
              {activeTab === "aulas" && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 sm:p-8">
                    <h2 className="text-2xl font-black text-white mb-6">Próximas Aulas</h2>
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {upcomingClasses.map((cls) => (
                        <motion.div
                          key={cls.id}
                          className="bg-slate-800/50 border border-blue-400/20 rounded-lg p-6 hover:border-yellow-400/40 transition-all"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-grow">
                              <h3 className="font-bold text-white text-lg mb-2">{cls.title}</h3>
                              <div className="flex items-center gap-4 text-blue-200 text-sm">
                                <span>👨‍🏫 {cls.teacher}</span>
                                <span>📅 {cls.date}</span>
                                <span>⏰ {cls.time}</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    cls.status === "próxima"
                                      ? "bg-yellow-400/20 text-yellow-300"
                                      : "bg-blue-400/20 text-blue-300"
                                  }`}
                                >
                                  {cls.status === "próxima" ? "Próxima" : "Agendada"}
                                </span>
                              </div>
                            </div>
                            {cls.status === "próxima" && (
                              <div className="flex flex-wrap items-center gap-3 sm:ml-4">
                                <motion.button
                                  onClick={handleStartMeeting}
                                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-5 sm:px-6 py-3 rounded-lg"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Entrar
                                </motion.button>
                                <motion.button
                                  onClick={handleStartMeeting}
                                  className="bg-slate-800 border border-blue-400/30 text-blue-100 font-bold px-5 sm:px-6 py-3 rounded-lg"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Teste
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Reunião Tab (Videochamada) */}
              {activeTab === "reunion" && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {!inMeeting ? (
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 sm:p-8 text-center">
                      <div className="text-6xl sm:text-8xl mb-6">🎥</div>
                      <h2 className="text-2xl font-bold text-white mb-4">Nenhuma aula em andamento</h2>
                      <p className="text-blue-200 mb-6">
                        Suas aulas agendadas aparecerão aqui. Clique em "Entrar" na aba de aulas para iniciar uma reunião.
                      </p>
                      <motion.button
                        onClick={handleStartMeeting}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Simular Aula
                      </motion.button>
                    </div>
                  ) : (
                    <div className="bg-black rounded-xl overflow-hidden border-2 border-yellow-400">
                      <div className="aspect-video bg-slate-800 flex items-center justify-center relative">
                        <div className="w-full h-full flex items-center justify-center bg-slate-900/20">
                        <video
                          ref={remoteVideoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                          style={{ backgroundColor: "#1e293b" }}
                        />
                        {!remoteConnected && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-slate-950/80 rounded-xl p-6 text-center text-blue-100">
                              <div className="text-6xl mb-3">👩‍🏫</div>
                              <p className="font-bold">Sem vídeo remoto ainda</p>
                              <p className="text-sm text-blue-200">A outra pessoa será exibida aqui quando a conexão for estabelecida.</p>
                            </div>
                          </div>
                        )}
                      </div>

                        <div className="absolute bottom-20 right-3 sm:bottom-4 sm:right-4 w-24 h-20 sm:w-32 sm:h-28 bg-slate-900/70 rounded-lg border-2 border-white overflow-hidden">
                          <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="absolute top-4 left-4 bg-slate-900/70 px-3 py-2 rounded-lg text-sm text-white">
                          <p className="font-bold">Reunião local</p>
                          <p className="text-blue-200">Câmera e microfone ativos</p>
                          <p className="text-xs text-slate-300 mt-1">Stream: {localStream ? "ativo" : "não iniciado"}</p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 sm:p-6 flex flex-wrap justify-center gap-2 sm:gap-4">
                          <motion.button
                            onClick={toggleMic}
                            className={`p-3 sm:p-4 rounded-full ${isMicEnabled ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-700"} text-white`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isMicEnabled ? "🎤" : "🔇"}
                          </motion.button>
                          <motion.button
                            onClick={toggleCamera}
                            className={`p-3 sm:p-4 rounded-full ${isCameraEnabled ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 hover:bg-gray-700"} text-white`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isCameraEnabled ? "📹" : "🚫📹"}
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              if (isSharingScreen) stopScreenShare();
                              else startScreenShare();
                            }}
                            className={`p-3 sm:p-4 rounded-full ${isSharingScreen ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"} text-white text-sm sm:text-base`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isSharingScreen ? "🛑 Tela" : "🖥️ Compartilhar"}
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              stopLocalStream();
                              setInMeeting(false);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-6 py-3 rounded-full font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Sair
                          </motion.button>
                        </div>
                      </div>

                      <div className="bg-slate-800 p-4 flex flex-col gap-2 max-h-32 overflow-y-auto">
                        {meetingError ? (
                          <p className="text-red-300 text-sm">{meetingError}</p>
                        ) : (
                          <p className="text-blue-100 text-sm">
                            <span className="font-bold text-yellow-400">Status:</span> câmera e microfone ligados. Este
                            fluxo é local; para conectar outra pessoa, será necessário um servidor de sinalização.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Arquivos Tab */}
              {activeTab === "files" && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 sm:p-8">
                    {/* Upload Area */}
                    <div className="mb-8">
                      <label className="block mb-4 text-white font-bold">Enviar Novo Arquivo</label>
                      <motion.label
                        className="block border-2 border-dashed border-yellow-400/50 rounded-lg p-4 sm:p-8 text-center cursor-pointer hover:border-yellow-400 transition-all"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-4xl mb-2">📤</div>
                        <p className="text-blue-100 font-semibold">Clique ou arraste arquivos aqui</p>
                        <p className="text-blue-300 text-sm">PDF, PowerPoint, Word, Vídeos, Áudio...</p>
                        <input type="file" className="hidden" />
                      </motion.label>
                    </div>

                    {/* Files List */}
                    <h3 className="text-xl font-bold text-white mb-4">Meus Arquivos</h3>
                    <motion.div
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {files.map((file) => (
                        <motion.div
                          key={file.id}
                          className="bg-slate-800/50 border border-blue-400/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-yellow-400/40 transition-all"
                          variants={cardVariants}
                          whileHover="hover"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{getFileIcon(file.type)}</span>
                            <div>
                              <h4 className="text-white font-semibold">{file.name}</h4>
                              <p className="text-blue-300 text-sm">{file.size} • {file.date}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              📥 Baixar
                            </motion.button>
                            <motion.button
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              🗑️
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Calendário Tab */}
              {activeTab === "calendar" && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Calendário de Aulas</h2>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-8 text-xs sm:text-sm">
                      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                        <div key={day} className="text-center text-blue-300 font-bold py-2">
                          {day}
                        </div>
                      ))}
                      {[...Array(35)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className={`aspect-square rounded-lg border text-center py-2 ${
                            idx < 5 || idx > 31
                              ? "bg-slate-800/20 border-slate-600"
                              : "bg-slate-800/50 border-blue-400/20 hover:border-yellow-400 cursor-pointer"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-white font-semibold text-sm">{idx < 5 || idx > 31 ? "" : idx - 4}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Events */}
                    <h3 className="text-lg font-bold text-white mb-4">Eventos Agendados</h3>
                    <motion.div
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {calendarEvents.map((event, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-slate-800/50 border border-yellow-400/30 rounded-lg p-4 flex items-center gap-4"
                          variants={itemVariants}
                        >
                          <div className="text-3xl">📌</div>
                          <div>
                            <h4 className="text-white font-bold">{event.title}</h4>
                            <p className="text-blue-300 text-sm">
                              {event.date} às {event.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <motion.div
                className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white font-bold mb-4">Seu Progresso</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-200">Aulas este mês</span>
                      <span className="text-yellow-400 font-bold">8/10</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-blue-200">Arquivos enviados</span>
                      <span className="text-yellow-400 font-bold">12 MB</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        transition={{ delay: 0.7, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 space-y-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white font-bold mb-4">Ações Rápidas</h3>
                {[
                  { icon: "📋", label: "Minhas Aulas", href: "/classes" },
                  { icon: "📞", label: "Suporte", href: "#" },
                  { icon: "⚙️", label: "Configurações", href: "#" },
                  { icon: "🚪", label: "Sair", href: "/login" },
                ].map((action, idx) => (
                  <motion.a
                    key={idx}
                    href={action.href}
                    className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 text-blue-100 hover:text-white p-3 rounded-lg transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span className="font-semibold">{action.label}</span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Support Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-xl p-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl mb-3">💬</div>
                <h4 className="text-white font-bold mb-2">Precisa de Ajuda?</h4>
                <p className="text-blue-200 text-sm mb-4">Fale com nosso suporte</p>
                <motion.button
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contatar
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
