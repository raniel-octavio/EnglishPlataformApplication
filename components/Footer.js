import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-white py-12 px-4 border-t border-blue-500/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-black text-xl mb-3">
              <span className="text-white">English</span>
              <span className="text-yellow-400">Class</span>
            </h3>
            <p className="text-blue-200 text-sm">Plataforma de aulas de inglês online com professores certificados.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 text-yellow-400">Empresa</h4>
            <ul className="text-blue-200 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Carreiras</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 text-yellow-400">Suporte</h4>
            <ul className="text-blue-200 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition">Contato</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3 text-yellow-400">Legal</h4>
            <ul className="text-blue-200 text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-500/20 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; 2026 EnglishClass. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
