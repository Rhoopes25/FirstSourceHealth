import { ArrowRight, UserCircle, Search, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Fast, trustworthy health guidance for parents
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Get instant answers to your parenting health questions from reliable sources and our AI-powered assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/articles"
              className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <span>Explore Articles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/ai-chat"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a8a] transition-colors"
            >
              Chat with DocGPT
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#1e3a8a] mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Getting trusted health information is simple with FirstSource Health
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#1e3a8a] mb-3">Step 1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Profile Creation</h3>
              <p className="text-gray-600">
                Create your personalized profile with your children's ages and health interests for tailored content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#1e3a8a] mb-3">Step 2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Article Search</h3>
              <p className="text-gray-600">
                Browse our extensive library of expert-reviewed articles on pediatric care, nutrition, and safety.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#1e3a8a] mb-3">Step 3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Chat with DocGPT</h3>
              <p className="text-gray-600">
                Get instant answers to your specific questions from our AI assistant trained on trusted medical sources.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#1e3a8a] mb-3">Step 4</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Myth vs. Fact</h3>
              <p className="text-gray-600">
                Learn to distinguish medical facts from common myths with our evidence-based guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-6">
            Trusted by Parents Everywhere
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of parents who rely on FirstSource Health for accurate, timely health information when they need it most.
          </p>
          <Link
            to="/login"
            className="inline-block bg-[#1e3a8a] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
