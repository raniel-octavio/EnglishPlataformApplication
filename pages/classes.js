import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Classes() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const classes = [
    {
      id: 1,
      title: "English for Beginners",
      teacher: "John Smith",
      level: "A1",
      category: "general",
      price: "R$ 50/aula",
      rating: 4.9,
      students: 234,
      image: "👨‍🏫",
      schedule: "Seg, Qua, Sex - 19h",
    },
    {
      id: 2,
      title: "Business English",
      teacher: "Sarah Johnson",
      level: "B2",
      category: "business",
      price: "R$ 80/aula",
      rating: 4.8,
      students: 156,
      image: "💼",
      schedule: "Ter, Qui - 18h",
    },
    {
      id: 3,
      title: "Conversational English",
      teacher: "Mike Davis",
      level: "B1",
      category: "general",
      price: "R$ 60/aula",
      rating: 4.9,
      students: 189,
      image: "💬",
      schedule: "Seg, Qua - 20h",
    },
    {
      id: 4,
      title: "TOEFL Preparation",
      teacher: "Emily Brown",
      level: "C1",
      category: "exam",
      price: "R$ 100/aula",
      rating: 4.7,
      students: 112,
      image: "📝",
      schedule: "Ter, Qui, Sab - 17h",
    },
    {
      id: 5,
      title: "Kids English",
      teacher: "Lisa White",
      level: "A1",
      category: "kids",
      price: "R$ 45/aula",
      rating: 5.0,
      students: 267,
      image: "👧",
      schedule: "Seg, Qua, Sex - 15h",
    },
    {
      id: 6,
      title: "Advanced Grammar",
      teacher: "Robert Green",
      level: "C2",
      category: "general",
      price: "R$ 70/aula",
      rating: 4.8,
      students: 98,
      image: "📚",
      schedule: "Ter, Sab - 19h",
    },
  ];

  const filteredClasses = classes.filter((cls) => {
    const levelMatch = selectedLevel === "all" || cls.level === selectedLevel;
    const categoryMatch = selectedCategory === "all" || cls.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(250, 204, 21, 0.2)",
    },
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
              Explore nossas
              <span className="block text-yellow-400">Aulas Disponíveis</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Escolha entre centenas de aulas personalizadas com professores certificados de todo o mundo.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Level Filter */}
            <div>
              <h3 className="text-white font-bold mb-3">Nível</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "A1", "B1", "B2", "C1", "C2"].map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedLevel === level
                        ? "bg-yellow-400 text-slate-900"
                        : "bg-slate-800/50 border border-blue-400/30 text-blue-100 hover:border-yellow-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level === "all" ? "Todos" : level}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-white font-bold mb-3">Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "Todas" },
                  { id: "general", label: "Geral" },
                  { id: "business", label: "Negócios" },
                  { id: "exam", label: "Exames" },
                  { id: "kids", label: "Crianças" },
                ].map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-yellow-400 text-slate-900"
                        : "bg-slate-800/50 border border-blue-400/30 text-blue-100 hover:border-yellow-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Classes Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredClasses.map((cls) => (
              <motion.div
                key={cls.id}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Class Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                  <div className="text-6xl mb-3">{cls.image}</div>
                  <h3 className="text-2xl font-black text-white">{cls.title}</h3>
                </div>

                {/* Class Content */}
                <div className="p-6 space-y-4">
                  {/* Teacher */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Professor:</span>
                    <span className="font-bold text-white">{cls.teacher}</span>
                  </div>

                  {/* Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Nível:</span>
                    <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-bold">
                      {cls.level}
                    </span>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Horário:</span>
                    <span className="text-white text-sm font-semibold">{cls.schedule}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Avaliação:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">⭐ {cls.rating}</span>
                      <span className="text-blue-300 text-sm">({cls.students})</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="border-t border-blue-400/20 pt-4 flex items-center justify-between">
                    <span className="text-green-400 font-bold text-lg">{cls.price}</span>
                    <motion.a
                      href="/register"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Agendar
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredClasses.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">Nenhuma aula encontrada</h3>
              <p className="text-blue-200">Tente ajustar seus filtros</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
