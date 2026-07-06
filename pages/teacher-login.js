import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("teacherLoggedIn", "true");
      setLoading(false);
      router.push("/teacher-platform");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-4 py-10 sm:py-26">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-yellow-300 font-bold mb-3">Acesso do professor</p>
            <h1 className="text-4xl font-black text-white mb-5">
              Entre para gerenciar suas aulas
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              A area do professor fica separada da area do aluno para organizar agenda, alunos,
              materiais e ganhos com mais clareza.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl p-5 sm:p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-black text-white mb-2">Login Professor</h2>
              <p className="text-blue-200 mb-8">Entre com sua conta de professor.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Email profissional</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="professor@email.com"
                    className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-yellow-400 transition-all"
                    required
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-blue-200 text-sm">Lembrar-me</span>
                  </label>
                  <Link href="#" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold">
                    Esqueci minha senha
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-3 rounded-lg disabled:opacity-50"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Entrando..." : "Entrar como professor"}
                </motion.button>
              </form>

              <p className="text-center text-blue-200 mt-8">
                Ainda nao ensina aqui?{" "}
                <Link href="/become-teacher" className="text-yellow-400 hover:text-yellow-300 font-bold">
                  Cadastre-se como professor
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
