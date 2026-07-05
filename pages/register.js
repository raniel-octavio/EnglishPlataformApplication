import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Gratuito");

  const teacherPlans = [
    {
      title: "Gratuito",
      price: "0",
      period: "mês",
      storage: "1GB",
      classes: "10 aulas",
      description: "Plano inicial para professores começarem a publicar suas aulas.",
      features: [
        "Até 20 alunos ativos",
        "Perfil público de professor",
        "Acesso ao painel básico",
        "Sem cobrança adicional",
      ],
    },
    {
      title: "Starter",
      price: "29",
      period: "mês",
      storage: "5GB",
      classes: "25 aulas",
      description: "Mais aulas mensais e visibilidade no site.",
      features: [
        "Até 50 alunos ativos",
        "Perfil em destaque",
        "Relatórios de aulas mensais",
        "Suporte prioritário básico",
      ],
    },
    {
      title: "Profissional",
      price: "69",
      period: "mês",
      storage: "15GB",
      classes: "60 aulas",
      description: "Para professores com agenda cheia e maior alcance.",
      features: [
        "Uploads ilimitados de materiais",
        "Agenda flexível e notificações",
        "Estatísticas avançadas",
        "Suporte prioritário",
      ],
    },
    {
      title: "Premium",
      price: "129",
      period: "mês",
      storage: "50GB",
      classes: "Aulas ilimitadas",
      description: "Plano completo para professores com alta demanda.",
      features: [
        "Suporte dedicado",
        "Conteúdo de vídeo e arquivos grandes",
        "Consultoria para crescimento",
        "Prioridade total no painel",
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
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }
    setLoading(true);
    // Simulação de registro
    setTimeout(() => {
      setLoading(false);
      router.push("/platform");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-20 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <motion.div
                  className="relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 className="text-5xl font-black text-white mb-6" variants={itemVariants}>
                    Comece sua jornada
                    <span className="block text-yellow-400">no inglês hoje</span>
                  </motion.h2>

                  <motion.p className="text-lg text-blue-100 mb-8 leading-relaxed" variants={itemVariants}>
                    Junte-se a mais de 50.000 alunos que já transformaram seu inglês com aulas personalizadas e professores certificados.
                  </motion.p>

                  <motion.div className="space-y-4 mb-8" variants={itemVariants}>
                    {[
                      { icon: "🎯", title: "Plano Personalizado", desc: "Aulas adaptadas ao seu nível" },
                      { icon: "👨‍🏫", title: "Professores Certificados", desc: "100% nativos e qualificados" },
                      { icon: "📱", title: "Aprenda em Qualquer Lugar", desc: "Desktop, tablet ou celular" },
                      { icon: "💬", title: "Suporte em PT", desc: "Sempre pronto para ajudar" },
                    ].map((benefit, idx) => (
                      <motion.div key={idx} className="flex gap-4" variants={itemVariants}>
                        <span className="text-3xl">{benefit.icon}</span>
                        <div>
                          <h4 className="text-white font-bold">{benefit.title}</h4>
                          <p className="text-blue-200 text-sm">{benefit.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
                    {[
                      { number: "50K+", label: "Alunos" },
                      { number: "98%", label: "Satisfação" },
                      { number: "15+", label: "Países" },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-lg p-3 text-center">
                        <div className="text-yellow-400 font-black text-lg">{stat.number}</div>
                        <div className="text-blue-200 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Register Form */}
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
                    Criar Conta
                  </motion.h1>
                  <motion.p className="text-blue-200 mb-8" variants={itemVariants}>
                    Primeira aula grátis, sem cartão de crédito
                  </motion.p>

                  <div className="mb-6 rounded-3xl border border-yellow-400/20 bg-slate-900/80 p-6">
                    <h3 className="text-white font-bold text-2xl mb-4">Escolha seu plano de professor</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {teacherPlans.map((plan) => (
                        <button
                          key={plan.title}
                          type="button"
                          onClick={() => setSelectedPlan(plan.title)}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            selectedPlan === plan.title
                              ? "border-yellow-400 bg-yellow-400/10"
                              : "border-blue-400/20 bg-slate-950/80 hover:border-yellow-400"
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
                          <p className="text-blue-300 text-sm mb-3">{plan.description}</p>
                          <div className="space-y-1 text-blue-100 text-xs">
                            {plan.features.map((feature) => (
                              <p key={feature}>• {feature}</p>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-blue-200 text-sm">
                      Plano selecionado: <span className="text-yellow-300">{selectedPlan}</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
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
                        placeholder="Mínimo 8 caracteres"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-2">Confirmar Senha</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
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
                        Concordo com os{" "}
                        <Link href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                          Termos de Serviço
                        </Link>
                        {" "}e{" "}
                        <Link href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                          Política de Privacidade
                        </Link>
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
                      {loading ? "Criando conta..." : "Criar Conta"}
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <motion.div className="my-6 flex items-center gap-4" variants={itemVariants}>
                    <div className="flex-grow border-t border-blue-400/30"></div>
                    <span className="text-blue-300 text-sm">Ou</span>
                    <div className="flex-grow border-t border-blue-400/30"></div>
                  </motion.div>

                  {/* Social Sign Up */}
                  <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
                    <button className="bg-slate-800/50 border border-blue-400/30 text-white py-3 rounded-lg hover:border-blue-300 transition flex items-center justify-center gap-2">
                      <span>G</span>
                      <span className="hidden sm:inline">Google</span>
                    </button>
                    <button className="bg-slate-800/50 border border-blue-400/30 text-white py-3 rounded-lg hover:border-blue-300 transition flex items-center justify-center gap-2">
                      <span>f</span>
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                  </motion.div>

                  {/* Login Link */}
                  <motion.p className="text-center text-blue-200 mt-8" variants={itemVariants}>
                    Já tem conta?{" "}
                    <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-bold transition">
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
