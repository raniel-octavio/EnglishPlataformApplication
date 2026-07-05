import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TeacherPlans() {
  const plans = [
    {
      title: "Gratuito",
      price: "0",
      period: "mes",
      classes: "4 aulas",
      storage: "1GB",
      description: "Para comecar a ensinar e testar a plataforma.",
      features: ["Ate 10 alunos ativos", "Perfil publico", "Painel basico", "Sem taxa mensal"],
      highlight: true,
    },
    {
      title: "Starter",
      price: "29",
      period: "mes",
      classes: "8 aulas",
      storage: "5GB",
      description: "Mais espaco e visibilidade para uma agenda em crescimento.",
      features: ["Ate 50 alunos ativos", "Perfil em destaque", "Relatorios mensais", "Suporte basico"],
    },
    {
      title: "Profissional",
      price: "69",
      period: "mes",
      classes: "16 aulas",
      storage: "15GB",
      description: "Para professores com rotina ativa e materiais frequentes.",
      features: ["Uploads amplos", "Agenda flexivel", "Estatisticas avancadas", "Suporte prioritario"],
    },
    {
      title: "Premium",
      price: "129",
      period: "mes",
      classes: "Ilimitadas",
      storage: "50GB",
      description: "Para crescer com mais recursos, prioridade e suporte dedicado.",
      features: ["Suporte dedicado", "Arquivos grandes", "Consultoria de crescimento", "Prioridade no painel"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 px-4 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-10 sm:mb-12 max-w-3xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Planos
              <span className="block text-yellow-400">para Professores</span>
            </h1>
            <p className="text-base sm:text-lg text-blue-100">
              Escolha um plano simples para organizar aulas, materiais e alunos dentro do seu ritmo de ensino.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.title}
                className={`rounded-xl p-6 border flex flex-col ${
                  plan.highlight
                    ? "border-yellow-300/50 bg-yellow-400/10"
                    : "border-blue-400/20 bg-slate-950/70"
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <p className="text-sm uppercase text-blue-200 mb-2">{plan.title}</p>
                <h2 className="text-3xl font-black text-white">
                  R$ {plan.price}
                  <span className="text-base font-medium text-blue-300">/{plan.period}</span>
                </h2>
                <p className="text-blue-300 text-sm mt-3 min-h-12">{plan.description}</p>

                <div className="space-y-2 my-5 text-blue-100 text-sm">
                  <p>
                    Aulas: <span className="text-yellow-300">{plan.classes}</span>
                  </p>
                  <p>
                    Armazenamento: <span className="text-yellow-300">{plan.storage}</span>
                  </p>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <p key={feature} className="text-blue-100 text-sm">
                      <span className="text-yellow-400">•</span> {feature}
                    </p>
                  ))}
                </div>

                <motion.a
                  href="/become-teacher"
                  className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-5 py-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Escolher plano
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
