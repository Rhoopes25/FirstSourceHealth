import { Linkedin, Mail } from 'lucide-react';

export default function About() {
  const founders = [
    {
      name: 'William Gifford',
      role: 'Co-Founder & CEO',
      bio: 'Passionate about making healthcare information accessible to all parents.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    },
    {
      name: 'Parker Sandstrom',
      role: 'Co-Founder & CTO',
      bio: 'Technology leader dedicated to building intuitive health platforms.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
    },
    {
      name: 'Joshua Ethington',
      role: 'Co-Founder & Chief Medical Officer',
      bio: 'Pediatrician committed to evidence-based parenting resources.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    {
      name: 'Rachel Hoopes',
      role: 'Co-Founder & Chief Content Officer',
      bio: 'Healthcare writer ensuring all content meets the highest standards.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1e3a8a] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FirstSource Health</h1>
          <p className="text-xl text-blue-100">
            Empowering parents with trusted, accessible health information
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            At FirstSource Health, we believe every parent deserves quick access to reliable health information.
            We combine expert medical knowledge with cutting-edge AI technology to provide accurate, timely
            guidance when parents need it most. Our platform bridges the gap between general searches and
            professional medical care, helping families make informed decisions with confidence.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4 text-center">Why We Started</h2>
          <div className="bg-gray-50 p-8 rounded-xl max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              As parents and healthcare professionals, we experienced firsthand the challenge of finding
              trustworthy health information quickly. Late-night fever concerns, questions about developmental
              milestones, and uncertainty about when to call the doctor are universal parenting experiences.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We created FirstSource Health to be the reliable resource we wished we had—combining the
              convenience of instant answers with the credibility of medical expertise. Our goal is to reduce
              parental anxiety by providing clear, evidence-based information that empowers confident
              decision-making.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-12 text-center">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">{founder.name}</h3>
                  <p className="text-[#1e3a8a] font-medium mb-3">{founder.role}</p>
                  <p className="text-gray-600 mb-4">{founder.bio}</p>
                  <div className="flex space-x-3">
                    <button className="text-[#1e3a8a] hover:text-[#1e40af] transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="text-[#1e3a8a] hover:text-[#1e40af] transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 bg-[#1e3a8a] text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a growing community of informed parents who trust FirstSource Health for
            their family's health information needs.
          </p>
          <button className="bg-white text-[#1e3a8a] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
