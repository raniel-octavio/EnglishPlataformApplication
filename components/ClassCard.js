export default function ClassCard({ title, teacher, level, price }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2 text-gray-600 mb-4">
        <p><strong>Professor:</strong> {teacher}</p>
        <p><strong>Nível:</strong> <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{level}</span></p>
        <p><strong>Preço:</strong> <span className="text-green-600 font-bold">{price}</span></p>
      </div>
      <a
        href="/inscricao?type=course"
        className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-center"
      >
        Agendar Aula
      </a>
    </div>
  );
}
