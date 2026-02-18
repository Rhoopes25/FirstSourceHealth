import { useEffect, useState } from 'react';
import { Clock, Eye, Search, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  read_time: number;
  views: number;
  image_url: string;
  published_at: string;
  category: string;
  tags?: string[];
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, allArticles]);

  async function fetchArticles() {
    setLoading(true);
    try {
      let url = 'http://localhost:3000/api/articles?';

      if (selectedCategory === 'popular') {
        url += 'sort=popular';
      } else if (selectedCategory === 'pediatric_care') {
        url += 'category=pediatric_care';
      }

      const res = await fetch(url);
      const data = await res.json();
      setAllArticles(data);
      setArticles(data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
    setLoading(false);
  }

  function filterArticles() {
    if (!searchQuery.trim()) {
      setArticles(allArticles);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
    setArticles(filtered);
  }

  const categories = [
    { id: 'recent', label: 'Recent' },
    { id: 'for_you', label: 'For You' },
    { id: 'popular', label: 'Popular' },
    { id: 'pediatric_care', label: 'Pediatric Care' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1e3a8a] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Articles</h1>
          <p className="text-xl text-blue-100">
            Expert-reviewed content to help you make informed decisions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Filter by Category</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#1e3a8a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchQuery ? 'No articles found matching your search.' : 'No articles available.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              onClick={async () => {
                const res = await fetch(`http://localhost:3000/api/articles/${article.id}/view`, {
                  method: 'PUT',
                });
                const updated = await res.json();
                setArticles((prev) =>
                  prev.map((a) => (a.id === updated.id ? updated : a))
                );
              }}
            >
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium text-[#1e3a8a]">{article.author}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.read_time} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}