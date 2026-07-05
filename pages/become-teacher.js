import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BecomeTeacher() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "general",
    experience: 1,
    certifications: "",
    bio: "",
    acceptTerms: false,
  });
  const [selectedPlan, setSelectedPlan] = useState("Gratuito");
  const [loading, setLoading] = useState(false);

  const teacherPlans = [
    {
      title: "Gratuito",
      price: "0",
      period: "mês",
      classes: "4 aulas",
      storage: "1GB",
      description: "Plano inicial para começar a ensinar e conhecer a plataforma.",
      features: [
        "Até 10 alunos ativos",
        "Perfil público de professor",
        "Painel básico de gerência",
        "Sem taxa adicional",
      ],
    },
    {
      title: "Starter",
      price: "29",
      period: "mês",
      classes: "8 aulas",
      storage: "5GB",
      description: "Mais visibilidade e mais aulas por mês.",
      features: [
        "Até 50 alunos ativos",
        "Perfil em destaque",
        "Relatórios mensais",
        "Suporte básico prioritário",
      ],
    },
    {
      title: "Profissional",
      price: "69",
      period: "mês",
      classes: "16 aulas",
      storage: "15GB",
      description: "Para professores com alta demanda e agenda cheia.",
      features: [
        "Uploads ilimitados de materiais",
        "Agenda flexível",
        "Estatísticas avançadas",
        "Suporte prioritário",
      ],
    },
    {
      title: "Premium",
      price: "129",
      period: "mês",
      classes: "Aulas ilimitadas",
      storage: "50GB",
      description: "Para professores que querem crescer rápido.",
      features: [
        "Suporte dedicado",
        "Conteúdo de vídeo e arquivos grandes",
        "Consultoria para crescimento",
        "Prioridade no painel",
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/platform");
    }, 2000);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-20 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <motion.div
                  className="relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 className="text-4xl font-black text-white mb-6" variants={itemVariants}>
                    Ganhe Dinheiro Ensinando
                  </motion.h2>

                  <motion.p className="text-lg text-blue-100 mb-8 leading-relaxed" variants={itemVariants}>
                    Junte-se a centenas de professores que já ensinam com flexibilidade, alcance mais alunos e escolha o plano certo para sua rotina.
                  </motion.p>

                  <motion.div className="mb-6 rounded-3xl border border-yellow-400/20 bg-slate-900/80 p-5" variants={itemVariants}>
                    <h3 className="text-white font-bold text-xl mb-4">Escolha o melhor plano para você</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {teacherPlans.map((plan) => (
                        <button
                          key={plan.title}
                          type="button"
                          onClick={() => setSelectedPlan(plan.title)}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            selectedPlan === plan.title
                              ? "border-yellow-400 bg-yellow-400/10"
                              : "border-blue-400/20 bg-slate-950/70 hover:border-yellow-400"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm uppercase tracking-[0.25em] text-blue-200">{plan.title}</p>
                            <span className="text-yellow-300 text-sm">{plan.classes}</span>
                          </div>
                          <h4 className="text-2xl font-black text-white mb-2">
                            R$ {plan.price}
                            <span className="text-base font-medium text-blue-300">/{plan.period}</span>
                          </h4>
                          <p className="text-blue-300 text-sm mb-2">{plan.description}</p>
                          <p className="text-blue-200 text-xs mb-3">Armazenamento de arquivos: {plan.storage}</p>
                          <div className="space-y-1 text-blue-100 text-xs">
                            {plan.features.map((feature) => (
                              <p key={feature}>• {feature}</p>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-blue-200 text-sm">
                      Escolha o melhor plano para o seu ritmo de ensino: <span className="text-yellow-300">{selectedPlan}</span>
                    </p>
                  </motion.div>

                  <motion.div className="space-y-4" variants={itemVariants}>
                    {[
                      { icon: "💰", title: "Sua Renda", desc: "Recursos que ampliam seus ganhos." },
                      { icon: "📅", title: "Flexibilidade", desc: "Ensine nos horários que funcionam para você" },
                      { icon: "🌍", title: "Alcance Global", desc: "Conecte-se com alunos de qualquer lugar" },
                      { icon: "📊", title: "Análises", desc: "Veja seus resultados e melhore suas aulas" },
                    ].map((item, idx) => (
                      <motion.div key={idx} className="flex items-start gap-4" variants={itemVariants}>
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className="text-white font-bold">{item.title}</h4>
                          <p className="text-blue-200 text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-8 backdrop-blur-sm">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h1 className="text-3xl font-black text-white mb-2" variants={itemVariants}>
                    Registre-se como Professor
                  </motion.h1>
                  <motion.p className="text-blue-200 mb-8" variants={itemVariants}>
                    Comece a ganhar em minutos
                  </motion.p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Nome Completo</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Senha</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Speciality */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Especialidade</label>
                      <select
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-all"
                      >
                        <option value="general">Inglês Geral</option>
                        <option value="business">Business English</option>
                        <option value="kids">Crianças</option>
                        <option value="exam">Preparação para Exames</option>
                        <option value="conversation">Conversação</option>
                      </select>
                    </motion.div>

                    {/* Experience */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Anos de Experiência</label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Certifications */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">
                        Certificações (separadas por vírgula)
                      </label>
                      <input
                        type="text"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleChange}
                        placeholder="TEFL, TOEFL, IELTS, etc"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                      />
                    </motion.div>

                    {/* Bio */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Sobre Você</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Conte um pouco sobre sua experiência e metodologia"
                        rows="3"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                      />
                    </motion.div>

                    {/* Accept Terms */}
                    <motion.div className="flex items-start gap-3" variants={itemVariants}>
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="w-5 h-5 mt-1 rounded"
                        required
                      />
                      <label className="text-blue-200 text-sm">
                        Concordo com os Termos de Serviço e autorizo a plataforma a ficar com 15% de cada aula
                      </label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-3 rounded-lg hover:shadow-2xl transition-all disabled:opacity-50 mt-6"
                      disabled={loading || !formData.acceptTerms}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      variants={itemVariants}
                    >
                      {loading ? "Registrando..." : "Se Registrar como Professor"}
                    </motion.button>
                  </form>

                  {/* Login Link */}
                  <motion.p className="text-center text-blue-200 mt-6" variants={itemVariants}>
                    Já tem conta?{" "}
                    <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-bold">
                      Faça login aqui
                    </Link>
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
