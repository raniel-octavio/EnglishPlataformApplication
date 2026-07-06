import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherPlatform() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("agenda");
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, [router.isReady, router.query.tab]);
  const [students, setStudents] = useState([
    { name: "Marina Costa", email: "marina@email.com", phone: "(11) 99999-0101", level: "Intermediario", goal: "Business English", progress: 78 },
    { name: "Rafael Lima", email: "rafael@email.com", phone: "(11) 99999-0202", level: "Basico", goal: "Conversacao", progress: 42 },
    { name: "Julia Alves", email: "julia@email.com", phone: "(11) 99999-0303", level: "Avancado", goal: "TOEFL Prep", progress: 88 },
  ]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    level: "Basico",
    goal: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("teacherLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/teacher-login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("teacherLoggedIn");
    router.push("/teacher-login");
  };

  const classes = [
    { id: 1, student: "Marina Costa", topic: "Business English", date: "Hoje", time: "18:00", status: "Confirmada" },
    { id: 2, student: "Rafael Lima", topic: "Conversacao", date: "Amanha", time: "20:00", status: "Pendente" },
    { id: 3, student: "Julia Alves", topic: "TOEFL Prep", date: "09/07", time: "19:30", status: "Confirmada" },
  ];

  const calendarEvents = [
    { date: "2026-07-05", title: "Marina Costa - Business English", time: "18:00" },
    { date: "2026-07-06", title: "Planejamento de aulas", time: "15:00" },
    { date: "2026-07-07", title: "Rafael Lima - Conversacao", time: "20:00" },
    { date: "2026-07-09", title: "Julia Alves - TOEFL Prep", time: "19:30" },
  ];

  const materials = ["Business vocabulary.pdf", "Pronunciation drills.mp4", "TOEFL checklist.docx"];

  const tabs = [
    { id: "agenda", label: "Agenda" },
    { id: "calendar", label: "Calendario" },
    { id: "cadastro", label: "Cadastrar aluno" },
    { id: "cursos", label: "Cadastrar Curso" },
    { id: "alunos", label: "Alunos" },
    { id: "materiais", label: "Materiais" },
    { id: "ganhos", label: "Ganhos" },
  ];

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setStudents((current) => [
      {
        ...newStudent,
        progress: 0,
      },
      ...current,
    ]);
    setNewStudent({
      name: "",
      email: "",
      phone: "",
      level: "Basico",
      goal: "",
    });
    setActiveTab("alunos");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <Navbar />
        <main className="flex-grow pt-24 px-4 py-10 flex items-center justify-center">
          <div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-6 text-center">
            <p className="text-yellow-300 font-bold mb-2">Verificando login</p>
            <p className="text-blue-100">Aguarde um instante...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-4 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-yellow-300 font-bold mb-2">Ambiente do professor</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">Painel de aulas</h1>
            <p className="text-blue-100 max-w-2xl">
              Organize agenda, alunos, materiais e ganhos em uma area separada da experiencia do aluno.
            </p>
            <button
              onClick={handleLogout}
              className="mt-5 bg-slate-800/70 border border-blue-400/30 text-blue-100 font-bold px-5 py-2 rounded-lg hover:border-yellow-400 transition"
            >
              Sair da area do professor
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-4 sticky top-24">
                <div className="mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl mb-3">
                    👩‍🏫
                  </div>
                  <h2 className="text-white font-bold">Sarah Johnson</h2>
                  <p className="text-blue-300 text-sm">Business English</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                        activeTab === tab.id
                          ? "bg-yellow-400 text-slate-900"
                          : "bg-slate-800/60 text-blue-100 hover:bg-slate-700/70"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <section className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Aulas no mes", value: "18" },
                  { label: "Alunos ativos", value: String(students.length) },
                  { label: "Receita prevista", value: "R$ 2.840" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5">
                    <p className="text-blue-300 text-sm">{stat.label}</p>
                    <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {activeTab === "agenda" && (
                <motion.div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-black text-white mb-5">Proximas aulas</h2>
                  <div className="space-y-3">
                    {classes.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-800/60 rounded-lg p-4">
                        <div>
                          <h3 className="text-white font-bold">{item.student}</h3>
                          <p className="text-blue-200 text-sm">{item.topic}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-blue-100">{item.date} as {item.time}</span>
                          <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full font-bold">{item.status}</span>
                          <button className="bg-yellow-400 text-slate-900 font-bold px-4 py-2 rounded-lg">Abrir aula</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "calendar" && (
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4 sm:p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Calendario de Aulas</h2>

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
                        <p className="text-white font-semibold text-xs sm:text-sm">
                          {idx < 5 || idx > 31 ? "" : idx - 4}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">Eventos Agendados</h3>
                  <div className="space-y-3">
                    {calendarEvents.map((event, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-slate-800/50 border border-yellow-400/30 rounded-lg p-4 flex items-center gap-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                      >
                        <div className="text-3xl">📌</div>
                        <div>
                          <h4 className="text-white font-bold">{event.title}</h4>
                          <p className="text-blue-300 text-sm">
                            {event.date} as {event.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "cadastro" && (
                <motion.div
                  className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-black text-white mb-2">Cadastrar aluno</h2>
                    <p className="text-blue-200">
                      Adicione um novo aluno ao seu ambiente de professor.
                    </p>
                  </div>

                  <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">Nome completo</label>
                      <input
                        type="text"
                        name="name"
                        value={newStudent.name}
                        onChange={handleStudentChange}
                        placeholder="Nome do aluno"
                        className="w-full bg-slate-800/60 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleStudentChange}
                        placeholder="aluno@email.com"
                        className="w-full bg-slate-800/60 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newStudent.phone}
                        onChange={handleStudentChange}
                        placeholder="(00) 00000-0000"
                        className="w-full bg-slate-800/60 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Nivel</label>
                      <select
                        name="level"
                        value={newStudent.level}
                        onChange={handleStudentChange}
                        className="w-full bg-slate-800/60 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-all"
                      >
                        <option value="Basico">Basico</option>
                        <option value="Intermediario">Intermediario</option>
                        <option value="Avancado">Avancado</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white font-semibold mb-2">Objetivo do aluno</label>
                      <input
                        type="text"
                        name="goal"
                        value={newStudent.goal}
                        onChange={handleStudentChange}
                        placeholder="Ex: conversacao, TOEFL, viagem, business"
                        className="w-full bg-slate-800/60 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setNewStudent({
                            name: "",
                            email: "",
                            phone: "",
                            level: "Basico",
                            goal: "",
                          })
                        }
                        className="bg-slate-800/70 border border-blue-400/30 text-blue-100 font-bold px-5 py-3 rounded-lg hover:border-yellow-400 transition"
                      >
                        Limpar
                      </button>
                      <motion.button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-6 py-3 rounded-lg"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Cadastrar aluno
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "alunos" && (
                <motion.div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-black text-white mb-5">Alunos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {students.map((student) => (
                      <div key={student.name} className="bg-slate-800/60 rounded-lg p-4">
                        <h3 className="text-white font-bold">{student.name}</h3>
                        <p className="text-blue-300 text-sm">{student.level}</p>
                        <div className="my-4 space-y-1 text-sm">
                          <p className="text-blue-100 break-all">{student.email}</p>
                          {student.phone && <p className="text-blue-200">{student.phone}</p>}
                          {student.goal && <p className="text-yellow-300">{student.goal}</p>}
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${student.progress}%` }} />
                        </div>
                        <p className="text-blue-200 text-sm mt-2">{student.progress}% de progresso</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {activeTab === "cursos" && (
              <motion.div
                className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      Cursos
                    </h2>
                    <p className="text-blue-200">
                      Gerencie os cursos disponíveis para seus alunos.
                    </p>
                  </div>

                  <button
                    onClick={() => router.push("/create-course")}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-6 py-3 rounded-lg hover:scale-105 transition"
                  >
                    + Criar curso
                  </button>
                </div>

                <div className="bg-slate-800/60 rounded-lg p-8 text-center">
                  <p className="text-blue-200">
                    Nenhum curso cadastrado.
                  </p>
                </div>
              </motion.div>
            )}
              {activeTab === "materiais" && (
                <motion.div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-black text-white mb-5">Materiais</h2>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center justify-between gap-4 bg-slate-800/60 rounded-lg p-4">
                        <span className="text-blue-100 font-semibold break-all">{material}</span>
                        <button className="bg-slate-700 text-blue-100 px-4 py-2 rounded-lg whitespace-nowrap">Editar</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "ganhos" && (
                <motion.div className="bg-slate-950/60 border border-blue-400/20 rounded-xl p-5 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-black text-white mb-5">Ganhos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-lg p-5">
                      <p className="text-blue-300 text-sm">Recebido</p>
                      <p className="text-3xl font-black text-green-400">R$ 1.960</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-5">
                      <p className="text-blue-300 text-sm">A receber</p>
                      <p className="text-3xl font-black text-yellow-300">R$ 880</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
