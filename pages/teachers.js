import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Teachers() {
  const [filter, setFilter] = useState("all");

  const teachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Business English",
      rating: 4.9,
      students: 234,
      price: 80,
      image: "👩‍🏫",
      certifications: ["TOEFL", "IELTS"],
      bio: "Professora nativa com 10 anos de experiencia.",
    },
    {
      id: 2,
      name: "Mike Davis",
      specialty: "Conversational",
      rating: 4.8,
      students: 189,
      price: 60,
      image: "👨‍🏫",
      certifications: ["TESL"],
      bio: "Especialista em pronuncia e fluencia.",
    },
    {
      id: 3,
      name: "Emily Brown",
      specialty: "TOEFL Prep",
      rating: 4.7,
      students: 112,
      price: 100,
      image: "👩‍🏫",
      certifications: ["TOEFL", "IELTS", "CAMBRIDGE"],
      bio: "Preparadora de exames com alta taxa de aprovacao.",
    },
    {
      id: 4,
      name: "Lisa White",
      specialty: "Kids English",
      rating: 5.0,
      students: 267,
      price: 45,
      image: "👩‍🏫",
      certifications: ["TEYL"],
      bio: "Especialista em ensino para criancas.",
    },
    {
      id: 5,
      name: "Robert Green",
      specialty: "Grammar & Writing",
      rating: 4.8,
      students: 98,
      price: 70,
      image: "👨‍🏫",
      certifications: ["DELTA"],
      bio: "Mestre em linguistica e estrutura da lingua.",
    },
    {
      id: 6,
      name: "Anna Rodriguez",
      specialty: "Geral",
      rating: 4.9,
      students: 156,
      price: 65,
      image: "👩‍🏫",
      certifications: ["TEFL"],
      bio: "Professora versatil para todos os niveis.",
    },
  ];

  const filters = ["all", "Business", "Conversational", "TOEFL", "Kids", "Grammar"];
  const filteredTeachers =
    filter === "all"
      ? teachers
      : teachers.filter((teacher) => teacher.specialty.toLowerCase().includes(filter.toLowerCase()));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    hover: { y: -8, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.2)" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-4 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-10 sm:mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Nossos
              <span className="block text-yellow-400">Professores</span>
            </h1>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mb-6">
              Conheca os melhores professores de ingles. Escolha, agende e comece suas aulas.
            </p>

            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-5 sm:p-6 max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Voce e professor?</h3>
                  <p className="text-blue-100">
                    Veja os planos para ensinar na plataforma ou acesse seu ambiente de trabalho.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href="/teacher-plans"
                    className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-5 py-3 rounded-lg whitespace-nowrap"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Ver planos
                  </motion.a>
                  <motion.a
                    href="/teacher-login"
                    className="text-center bg-slate-800/70 border border-blue-400/30 text-blue-100 font-bold px-5 py-3 rounded-lg whitespace-nowrap"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Area professor
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4">Filtrar por especialidade</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
              {filters.map((spec) => (
                <motion.button
                  key={spec}
                  onClick={() => setFilter(spec)}
                  className={`px-5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    filter === spec
                      ? "bg-yellow-400 text-slate-900"
                      : "bg-slate-800/50 border border-blue-400/30 text-blue-100 hover:border-yellow-400"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {spec === "all" ? "Todos" : spec}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTeachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                  <div className="text-6xl mb-3">{teacher.image}</div>
                  <h3 className="text-2xl font-bold text-white">{teacher.name}</h3>
                  <p className="text-yellow-200 text-sm mt-1">{teacher.specialty}</p>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-blue-100 text-sm">{teacher.bio}</p>

                  <div className="flex items-center justify-between py-3 border-y border-blue-400/20">
                    <span className="text-yellow-400 font-bold">⭐ {teacher.rating}</span>
                    <span className="text-blue-300 text-sm">{teacher.students} alunos</span>
                  </div>

                  <div>
                    <p className="text-blue-200 text-xs mb-2">Certificacoes:</p>
                    <div className="flex flex-wrap gap-2">
                      {teacher.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs font-semibold"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-blue-400/20">
                    <div>
                      <p className="text-blue-300 text-xs">Por aula</p>
                      <p className="text-2xl font-black text-green-400">R$ {teacher.price}</p>
                    </div>
                    <motion.a
                      href={`/inscricao?type=teacher&name=${encodeURIComponent(teacher.name)}&specialty=${encodeURIComponent(teacher.specialty)}&price=${encodeURIComponent(teacher.price)}`}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-5 py-2 rounded-lg whitespace-nowrap"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Agendar
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
