import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Teachers() {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Business English",
      rating: 4.9,
      students: 234,
      price: 80,
      image: "👩‍🏫",
      certifications: ["TOEFL", "IELTS"],
      bio: "Professora nativa com 10 anos de experiência",
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
      bio: "Especialista em pronúncia e fluência",
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
      bio: "Preparadora de exames com taxa de aprovação 95%",
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
      bio: "Especialista em ensino para crianças",
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
      bio: "Mestre em linguística e estrutura da língua",
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
      bio: "Professora versátil para todos os níveis",
    },
  ]);

  const [filter, setFilter] = useState("all");

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
    hover: { y: -10, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.2)" },
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
            <h1 className="text-5xl font-black text-white mb-4">
              Nossos
              <span className="block text-yellow-400">Professores</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mb-8">
              Conheça os melhores professores de inglês. Escolha, agende e comece suas aulas!
            </p>

            {/* CTA para professores */}
            <motion.div
              className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Você é Professor?</h3>
                  <p className="text-blue-100">Ganhe dinheiro ensinando inglês na nossa plataforma</p>
                </div>
                <motion.a
                  href="/become-teacher"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-lg whitespace-nowrap ml-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Se Registre →
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4">Filtrar por Especialidade</h3>
            <div className="flex flex-wrap gap-3">
              {["all", "Business", "Conversational", "TOEFL", "Kids", "Grammar"].map((spec) => (
                <motion.button
                  key={spec}
                  onClick={() => setFilter(spec)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    filter === spec
                      ? "bg-yellow-400 text-slate-900"
                      : "bg-slate-800/50 border border-blue-400/30 text-blue-100 hover:border-yellow-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {spec === "all" ? "Todos" : spec}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Teachers Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                  <div className="text-6xl mb-3">{teacher.image}</div>
                  <h3 className="text-2xl font-bold text-white">{teacher.name}</h3>
                  <p className="text-yellow-200 text-sm mt-1">{teacher.specialty}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Bio */}
                  <p className="text-blue-100 text-sm">{teacher.bio}</p>

                  {/* Rating */}
                  <div className="flex items-center justify-between py-3 border-y border-blue-400/20">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">⭐ {teacher.rating}</span>
                      <span className="text-blue-300 text-sm">({teacher.students} alunos)</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-blue-200 text-xs mb-2">Certificações:</p>
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

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-blue-400/20">
                    <div>
                      <p className="text-blue-300 text-xs">Por aula</p>
                      <p className="text-2xl font-black text-green-400">R$ {teacher.price}</p>
                    </div>
                    <motion.a
                      href="/register"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-6 py-2 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Agendar →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              { icon: "👥", label: "Professores Ativos", value: "150+" },
              { icon: "⭐", label: "Avaliação Média", value: "4.8/5" },
              { icon: "📚", label: "Aulas Mensais", value: "5.000+" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-blue-200 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
