import { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm DocGPT, your AI health assistant. I'm here to provide general health information to help parents make informed decisions. Please note that I'm not a replacement for professional medical advice. If you're experiencing a medical emergency, please call 911 or seek immediate medical attention. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('fever')) {
      return "For fever management:\n\n• Normal temperature: 98.6°F (37°C)\n• Low-grade fever: 100.4°F - 102°F (38°C - 38.9°C)\n• High fever: Above 102°F (38.9°C)\n\nFor infants under 3 months with any fever, contact your pediatrician immediately. For older children, monitor symptoms and keep them hydrated. Use acetaminophen or ibuprofen as recommended by your doctor. Seek medical attention if fever persists beyond 3 days or is accompanied by severe symptoms.";
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('nap')) {
      return "Sleep needs vary by age:\n\n• Newborns (0-3 months): 14-17 hours\n• Infants (4-11 months): 12-15 hours\n• Toddlers (1-2 years): 11-14 hours\n• Preschoolers (3-5 years): 10-13 hours\n\nEstablish consistent bedtime routines, keep the room dark and cool, and avoid screens before bed. Remember, every child is different, and these are general guidelines.";
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition')) {
      return "For introducing solid foods:\n\n• Start around 6 months when baby shows readiness signs\n• Begin with single-ingredient purees\n• Wait 3-5 days between new foods to watch for allergies\n• Include iron-rich foods like meat and fortified cereals\n• Avoid honey before age 1\n\nOffer a variety of nutritious foods and let your child's appetite guide portion sizes. Consult your pediatrician about specific dietary concerns.";
    } else if (lowerMessage.includes('vaccine') || lowerMessage.includes('immunization')) {
      return "Vaccines are one of the most important ways to protect your child's health. The CDC-recommended schedule is designed to provide immunity when children are most vulnerable. Common vaccines include:\n\n• DTaP (Diphtheria, Tetanus, Pertussis)\n• MMR (Measles, Mumps, Rubella)\n• Polio\n• Hepatitis B\n• Hib (Haemophilus influenzae type b)\n\nYour pediatrician will provide a personalized schedule. Vaccines are safe, effective, and thoroughly tested.";
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
      return "⚠️ If you're experiencing a medical emergency:\n\n• Call 911 immediately\n• Go to the nearest emergency room\n• Call your local poison control center (1-800-222-1222) for poisoning\n\nSeek immediate care for:\n• Difficulty breathing\n• Uncontrolled bleeding\n• Loss of consciousness\n• Severe allergic reactions\n• High fever in infants under 3 months\n• Seizures\n• Severe head injuries\n\nRemember: I'm an AI assistant and cannot diagnose emergencies. Always err on the side of caution.";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Remember, while I can provide general health information, always consult with your pediatrician or healthcare provider for specific medical advice, diagnosis, or treatment. Is there anything else I can help you with today?";
    } else {
      return "Thank you for your question. I can provide general health information on topics like:\n\n• Childhood illnesses and symptoms\n• Nutrition and feeding\n• Sleep patterns\n• Developmental milestones\n• Vaccines and preventive care\n• Safety tips\n\nPlease remember that I provide general information and cannot diagnose conditions or replace professional medical advice. For specific concerns about your child, please consult your pediatrician. \n\nCould you please provide more details about what you'd like to know?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-[#1e3a8a] text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Chat with DocGPT</h1>
          <p className="text-blue-100">Your AI-powered health information assistant</p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-4xl mx-auto w-full mt-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Important Medical Disclaimer</p>
            <p>
              DocGPT provides general health information only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your pediatrician or other qualified health provider
              with any questions about your child's health. In case of emergency, call 911.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.isUser
                    ? 'bg-[#1e3a8a] text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {!message.isUser && (
                  <p className="font-semibold text-[#1e3a8a] mb-1 text-sm">DocGPT</p>
                )}
                <p className="whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 rounded-lg p-4 shadow-sm">
                <p className="font-semibold text-[#1e3a8a] mb-1 text-sm">DocGPT</p>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a health question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#1e40af] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
