import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de login
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
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <motion.div
                  className="relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 className="text-4xl font-black text-white mb-6" variants={itemVariants}>
                    Bem-vindo de volta!
                  </motion.h2>

                  <motion.p className="text-lg text-blue-100 mb-8 leading-relaxed" variants={itemVariants}>
                    Faça login na sua conta para acessar suas aulas agendadas, histórico de progresso e suas configurações personalizadas.
                  </motion.p>

                  <motion.div className="space-y-4" variants={itemVariants}>
                    {[
                      { icon: "✓", text: "Acesso a todas as suas aulas" },
                      { icon: "✓", text: "Histórico de progresso detalhado" },
                      { icon: "✓", text: "Agendamento flexível 24/7" },
                      { icon: "✓", text: "Suporte em português" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-blue-100">
                        <span className="text-yellow-400 font-bold text-xl">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Login visual */}
                  <motion.div
                    className="mt-12 relative"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                        <div>
                          <div className="h-2 w-24 bg-blue-300 rounded"></div>
                          <div className="h-2 w-32 bg-blue-400 rounded mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
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
                    Login
                  </motion.h1>
                  <motion.p className="text-blue-200 mb-8" variants={itemVariants}>
                    Entre na sua conta EnglishClass
                  </motion.p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-3">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-white font-semibold mb-3">Senha</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                        required
                      />
                    </motion.div>

                    {/* Remember Me & Forgot Password */}
                    <motion.div className="flex items-center justify-between" variants={itemVariants}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-blue-200 text-sm">Lembrar-me</span>
                      </label>
                      <Link href="#" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition">
                        Esqueci minha senha
                      </Link>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-3 rounded-lg hover:shadow-2xl transition-all disabled:opacity-50"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      variants={itemVariants}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <motion.div className="my-6 flex items-center gap-4" variants={itemVariants}>
                    <div className="flex-grow border-t border-blue-400/30"></div>
                    <span className="text-blue-300 text-sm">Ou</span>
                    <div className="flex-grow border-t border-blue-400/30"></div>
                  </motion.div>

                  {/* Social Login */}
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

                  {/* Sign Up Link */}
                  <motion.p className="text-center text-blue-200 mt-8" variants={itemVariants}>
                    Não tem conta?{" "}
                    <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-bold transition">
                      Cadastre-se aqui
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
