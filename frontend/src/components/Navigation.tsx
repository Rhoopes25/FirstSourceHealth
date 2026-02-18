import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/Gemini_Generated_Image_rd16itrd16itrd16.png"
                alt="FirstSource Health Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold text-[#1e3a8a]">FirstSource Health</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/articles"
                className={`text-sm font-medium transition-colors ${
                  isActive('/articles')
                    ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                }`}
              >
                Articles
              </Link>
              <Link
                to="/myths"
                className={`text-sm font-medium transition-colors ${
                  isActive('/myths')
                    ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                }`}
              >
                Myth vs Fact
              </Link>
              <Link
                to="/ai-chat"
                className={`text-sm font-medium transition-colors ${
                  isActive('/ai-chat')
                    ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                }`}
              >
                AI Chat
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1'
                    : 'text-gray-600 hover:text-[#1e3a8a]'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/login"
                className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg hover:bg-[#1e40af] transition-colors text-sm font-medium"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Link
        to="/ai-chat"
        className="fixed bottom-6 right-6 bg-[#1e3a8a] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1e40af] transition-all hover:scale-105 flex items-center space-x-2 z-50"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Chat with our AI!</span>
      </Link>
    </>
  );
}