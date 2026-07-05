import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="font-black text-2xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white">English</span>
            <span className="text-yellow-400">Class</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-blue-100 hover:text-white transition">
            Como Funciona
          </Link>
          <Link href="/classes" className="text-blue-100 hover:text-white transition">
            Cursos
          </Link>
          <Link href="/teachers" className="text-blue-100 hover:text-white transition">
            Professores
          </Link>
          <Link href="/teacher-plans" className="text-blue-100 hover:text-white transition">
            Planos
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login" className="text-blue-100 hover:text-white transition">
            Aluno
          </Link>
          <Link href="/teacher-login" className="text-blue-100 hover:text-white transition">
            Professor
          </Link>
          <motion.a
            href="/classes"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-5 py-2 rounded-full hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Aula →
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="lg:hidden bg-slate-800 border-t border-blue-500/20 p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-blue-100 hover:text-white">
              Como Funciona
            </Link>
            <Link href="/classes" className="text-blue-100 hover:text-white">
              Cursos
            </Link>
            <Link href="/teachers" className="text-blue-100 hover:text-white">
              Professores
            </Link>
            <Link href="/teacher-plans" className="text-blue-100 hover:text-white">
              Planos
            </Link>
            <Link href="/login" className="text-blue-100 hover:text-white">
              Aluno
            </Link>
            <Link href="/teacher-login" className="text-blue-100 hover:text-white">
              Professor
            </Link>
            <Link href="/classes" className="text-yellow-300 font-bold">
              Agendar Aula
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
