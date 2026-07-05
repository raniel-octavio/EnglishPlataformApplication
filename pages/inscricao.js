import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Inscricao() {
  const router = useRouter();
  const { type, title, teacher, price, name, specialty } = router.query;

  const isCourse = type === "course";
  const heading = isCourse ? "Inscrição para aula" : "Inscrição com professor";
  const subject = isCourse ? title || "Curso selecionado" : name || "Professor selecionado";
  const subtitle = isCourse
    ? teacher || "Professor disponível"
    : specialty || "Especialidade disponível";
  const value = price || "Agende um horário";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-3xl p-8 md:p-10"
          >
            <p className="text-yellow-400 font-semibold uppercase tracking-[0.3em] mb-3">Inscrição</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{heading}</h1>
            <p className="text-blue-100 text-lg mb-8">
              Complete os dados abaixo para reservar sua aula e receberemos um contato em breve.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <div className="space-y-4">
                <div className="rounded-2xl border border-blue-400/20 bg-slate-950/60 p-6">
                  <p className="text-blue-300 text-sm mb-2">Seleção</p>
                  <h2 className="text-2xl font-bold text-white">{subject}</h2>
                  <p className="text-blue-200 mt-2">{subtitle}</p>
                  <p className="text-green-400 font-black text-xl mt-4">{value}</p>
                </div>

                <div className="rounded-2xl border border-blue-400/20 bg-slate-950/60 p-6">
                  <label className="block text-blue-200 text-sm mb-2">Seu nome</label>
                  <input className="w-full rounded-lg bg-slate-800 border border-blue-400/20 px-4 py-3 text-white" placeholder="Digite seu nome" />

                  <label className="block text-blue-200 text-sm mt-4 mb-2">E-mail</label>
                  <input className="w-full rounded-lg bg-slate-800 border border-blue-400/20 px-4 py-3 text-white" placeholder="seu@email.com" />

                  <label className="block text-blue-200 text-sm mt-4 mb-2">Objetivo da aula</label>
                  <textarea className="w-full rounded-lg bg-slate-800 border border-blue-400/20 px-4 py-3 text-white h-28" placeholder="Descreva o que você quer trabalhar" />
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">O que acontece depois?</h3>
                <ul className="space-y-3 text-blue-100">
                  <li>• Nossa equipe confirma o melhor horário.</li>
                  <li>• O professor entrará em contato pelo e-mail informado.</li>
                  <li>• Você receberá os detalhes da aula e o link da sessão.</li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-6 py-3 rounded-lg"
                >
                  Confirmar inscrição
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
