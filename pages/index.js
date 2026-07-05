import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-blue-200">+50.000 alunos em 15 países</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Aprenda inglês 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
                  do seu jeito.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg text-blue-100 mb-8 leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Aulas personalizadas com professores certificados, agendamento 24/7 e suporte completo em português.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="/register"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Agendar Aula
                  <span>→</span>
                </motion.a>
                <motion.a
                  href="/classes"
                  className="border-2 border-blue-300 text-blue-100 font-bold px-8 py-4 rounded-full hover:bg-blue-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Conhecer Planos
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8 text-blue-100 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <div className="font-bold text-xl text-yellow-400">1000+</div>
                  <div>Aulas por mês</div>
                </div>
                <div>
                  <div className="font-bold text-xl text-yellow-400">98%</div>
                  <div>Satisfação</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Student Circle */}
                <motion.div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-8xl">
                    👨‍💻
                  </div>
                </motion.div>

                {/* Teacher Circle */}
                <motion.div
                  className="absolute top-10 right-0 w-56 h-56 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl border-4 border-white/20"
                  animate={{ y: [0, -25, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-7xl">
                    👩‍🏫
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.svg
                  className="absolute top-32 right-20 w-32 h-32 text-blue-300/30"
                  viewBox="0 0 100 100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                </motion.svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Por que escolher 
                <span className="text-yellow-400"> EnglishClass</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                { icon: "🎯", title: "Personalizado", desc: "Seu próprio ritmo e horário" },
                { icon: "👨‍🎓", title: "Professores Experientes", desc: "100% certificados e nativos" },
                { icon: "💬", title: "Suporte em PT", desc: "Tire dúvidas quando precisar" },
                { icon: "📊", title: "Progresso Real", desc: "Veja seu avanço mês a mês" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 rounded-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Comece sua transformação hoje
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Primeira aula grátis, sem compromisso. Cancele quando quiser.
            </p>
            <motion.a
              href="/register"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-10 py-4 rounded-full inline-flex items-center gap-2 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Criar Conta Grátis
              <span>→</span>
            </motion.a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
