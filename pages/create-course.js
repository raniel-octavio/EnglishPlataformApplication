import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreateCourse() {
  const router = useRouter();

  const [course, setCourse] = useState({
    title: "",
    category: "Inglês Geral",
    level: "Básico",
    description: "",
    thumbnail: "",
    price: "",
    duration: "",
    certificate: true,
    published: false,
  });

  const [modules, setModules] = useState([
    {
      title: "Módulo 1",
      lessons: [
        {
          title: "Aula 1",
          type: "Vídeo",
        },
      ],
    },
  ]);

  const handleCourseChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCourse({
      ...course,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        title: `Módulo ${modules.length + 1}`,
        lessons: [],
      },
    ]);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const updateModule = (index, value) => {
    const copy = [...modules];
    copy[index].title = value;
    setModules(copy);
  };

  const addLesson = (moduleIndex) => {
    const copy = [...modules];

    copy[moduleIndex].lessons.push({
      title: `Aula ${copy[moduleIndex].lessons.length + 1}`,
      type: "Vídeo",
    });

    setModules(copy);
  };

  const updateLesson = (
    moduleIndex,
    lessonIndex,
    field,
    value
  ) => {
    const copy = [...modules];

    copy[moduleIndex].lessons[lessonIndex][field] = value;

    setModules(copy);
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const copy = [...modules];

    copy[moduleIndex].lessons.splice(lessonIndex, 1);

    setModules(copy);
  };

  const saveCourse = () => {
    const data = {
      ...course,
      modules,
      createdAt: new Date(),
    };

    console.log(data);

    alert("Curso salvo com sucesso!");

    router.push("/teacher-platform");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex flex-col">

      <Navbar />

      <main className="flex-grow pt-24 pb-12 px-4">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <button
                onClick={() => router.push("/teacher-platform?tab=cursos")}
                className="mb-6 bg-slate-800 px-5 py-2 rounded-lg text-white hover:bg-slate-700"
                >
                ← Voltar
            </button>

            <h1 className="text-5xl font-black text-white">
              Criar Curso
            </h1>

            <p className="text-blue-200 mt-3">
              Cadastre um novo curso completo.
            </p>

          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            <div className="lg:col-span-2 space-y-6">

              <div className="bg-slate-950/60 rounded-xl p-6 border border-blue-400/20">

                <h2 className="text-2xl font-bold text-white mb-5">
                  Informações
                </h2>

                <div className="space-y-5">

                  <div>

                    <label className="text-white font-semibold">
                      Nome do Curso
                    </label>

                    <input
                      name="title"
                      value={course.title}
                      onChange={handleCourseChange}
                      className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                    />

                  </div>

                  <div>

                    <label className="text-white font-semibold">
                      Descrição
                    </label>

                    <textarea
                      rows={6}
                      name="description"
                      value={course.description}
                      onChange={handleCourseChange}
                      className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                    />

                  </div>

                  <div className="grid md:grid-cols-2 gap-4">

                    <div>

                      <label className="text-white font-semibold">
                        Categoria
                      </label>

                      <select
                        name="category"
                        value={course.category}
                        onChange={handleCourseChange}
                        className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                      >
                        <option>Inglês Geral</option>
                        <option>Business English</option>
                        <option>TOEFL</option>
                        <option>IELTS</option>
                        <option>Conversação</option>
                        <option>Gramática</option>
                      </select>

                    </div>

                    <div>

                      <label className="text-white font-semibold">
                        Nível
                      </label>

                      <select
                        name="level"
                        value={course.level}
                        onChange={handleCourseChange}
                        className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                      >
                        <option>Básico</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                      </select>

                    </div>

                  </div>

                  <div className="grid md:grid-cols-3 gap-4">

                    <div>

                      <label className="text-white font-semibold">
                        Valor
                      </label>

                      <input
                        name="price"
                        value={course.price}
                        onChange={handleCourseChange}
                        className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                      />

                    </div>

                    <div>

                      <label className="text-white font-semibold">
                        Duração
                      </label>

                      <input
                        name="duration"
                        value={course.duration}
                        onChange={handleCourseChange}
                        placeholder="20 horas"
                        className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                      />

                    </div>

                    <div>

                      <label className="text-white font-semibold">
                        Thumbnail
                      </label>

                      <input
                        name="thumbnail"
                        value={course.thumbnail}
                        onChange={handleCourseChange}
                        placeholder="URL"
                        className="mt-2 w-full bg-slate-800 rounded-lg p-3 text-white"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div>

              <div className="sticky top-24 bg-slate-950/60 rounded-xl border border-blue-400/20 p-6">

                <h2 className="text-white text-2xl font-bold mb-6">
                  Publicação
                </h2>

                <label className="flex items-center gap-3 text-white mb-4">

                  <input
                    type="checkbox"
                    name="certificate"
                    checked={course.certificate}
                    onChange={handleCourseChange}
                  />

                  Emitir certificado

                </label>

                <label className="flex items-center gap-3 text-white mb-6">

                  <input
                    type="checkbox"
                    name="published"
                    checked={course.published}
                    onChange={handleCourseChange}
                  />

                  Publicar imediatamente

                </label>

                <button
                  onClick={saveCourse}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold py-4 rounded-lg text-lg"
                >
                  Salvar Curso
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}