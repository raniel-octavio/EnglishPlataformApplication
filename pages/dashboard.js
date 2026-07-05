import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [upcomingClasses] = useState([
    {
      id: 1,
      title: "Business English",
      teacher: "Sarah Johnson",
      date: "2026-07-05",
      time: "18:00",
      level: "B2",
    },
    {
      id: 2,
      title: "Conversational Practice",
      teacher: "Mike Davis",
      date: "2026-07-07",
      time: "20:00",
      level: "B1",
    },
    {
      id: 3,
      title: "Grammar Review",
      teacher: "Robert Green",
      date: "2026-07-08",
      time: "19:00",
      level: "C1",
    },
  ]);

  const [completedClasses] = useState([
    { id: 1, title: "English Basics", date: "2026-06-28", rating: 5 },
    { id: 2, title: "Verb Tenses", date: "2026-06-26", rating: 4.5 },
    { id: 3, title: "Pronunciation", date: "2026-06-24", rating: 5 },
  ]);

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

      <main className="flex-grow pt-20 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black text-white mb-2">
              Bem-vindo ao seu
              <span className="block text-yellow-400">Dashboard</span>
            </h1>
            <p className="text-lg text-blue-100">Acompanhe seu progresso e gerencie suas aulas</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: "📚", label: "Aulas Concluídas", value: "24", color: "from-blue-500" },
              { icon: "⏳", label: "Próximas Aulas", value: "3", color: "from-purple-500" },
              { icon: "⭐", label: "Sua Média", value: "4.8", color: "from-yellow-500" },
              { icon: "🔥", label: "Dias em Sequência", value: "12", color: "from-red-500" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} to-transparent bg-opacity-10 border border-blue-400/20 rounded-xl p-6`}
                variants={itemVariants}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-blue-200 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Classes */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
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
                      className="bg-slate-800/50 border border-blue-400/20 rounded-lg p-4 flex items-center justify-between hover:border-yellow-400/40 transition-all"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="flex-grow">
                        <h3 className="font-bold text-white text-lg">{cls.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-blue-200 text-sm">
                          <span>👨‍🏫 {cls.teacher}</span>
                          <span>📅 {cls.date}</span>
                          <span>⏰ {cls.time}</span>
                          <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                            {cls.level}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-lg ml-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Entrar →
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Progress Section */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-black text-white mb-6">Seu Progresso</h2>
                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  {[
                    { skill: "Listening", progress: 75 },
                    { skill: "Speaking", progress: 68 },
                    { skill: "Reading", progress: 82 },
                    { skill: "Writing", progress: 71 },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">{item.skill}</span>
                        <span className="text-yellow-400 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <motion.div
                className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-6xl mb-4">👨‍💼</div>
                <h3 className="text-white font-black text-xl mb-2">João Silva</h3>
                <p className="text-blue-200 text-sm mb-4">Membro desde Março, 2024</p>
                <motion.button
                  className="w-full bg-yellow-400 text-slate-900 font-bold py-2 rounded-lg hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Editar Perfil
                </motion.button>
              </motion.div>

              {/* Recent Classes */}
              <motion.div
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white font-black text-lg mb-4">Aulas Recentes</h3>
                <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
                  {completedClasses.map((cls) => (
                    <motion.div
                      key={cls.id}
                      className="bg-slate-800/50 rounded-lg p-3"
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-semibold text-sm">{cls.title}</span>
                        <span className="text-yellow-400 text-sm">⭐ {cls.rating}</span>
                      </div>
                      <span className="text-blue-200 text-xs">{cls.date}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-xl p-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl mb-3">✨</div>
                <h4 className="text-white font-bold mb-2">Novos Cursos</h4>
                <p className="text-blue-200 text-sm mb-4">Explore mais aulas especializadas</p>
                <motion.a
                  href="/classes"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-2 rounded-lg inline-block hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Aulas
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
