import { useEffect, useState } from 'react';

interface Myth {
  id: number;
  myth: string;
  fact: string;
  category: string;
  source: string;
}

export default function Myths() {
  const [myths, setMyths] = useState<Myth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/myths')
      .then((res) => res.json())
      .then((data) => setMyths(data))
      .catch((err) => console.error('Failed to fetch myths:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1e3a8a] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Myth vs. Fact</h1>
          <p className="text-xl text-blue-100">
            Separating medical myths from the truth, backed by real sources
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {myths.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-l-4 border-red-400">
                  <div className="flex items-center mb-2">
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Myth
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg font-medium">{item.myth}</p>
                </div>
                <div className="p-6 border-l-4 border-green-400 bg-green-50">
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Fact
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg">{item.fact}</p>
                  {item.source && (
                    <p className="mt-3 text-sm text-gray-500">Source: {item.source}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}