import { Link } from 'react-router-dom';
import { 
  FiCheckSquare, 
  FiGithub,
  FiUser,
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiHeadphones,
  FiTarget,
  FiTrello,
  FiUsers,
  FiShield,
  FiClock,
  FiBarChart,
  FiSmartphone,
  FiGlobe,
  FiCloud,
  FiRefreshCw,
  FiMessageSquare,
  FiPieChart,
  FiAlertCircle,
  FiCalendar,
  FiTag
} from 'react-icons/fi';

export default function LandingPage() {
  const mainFeatures = [
    {
      
      title: "Personal Task Management",
      description: "Organize your daily tasks, set priorities, and track your progress with our intuitive interface. Perfect for individual productivity and personal goal tracking.",
      icon: <FiTarget className="w-8 h-8" />
    },
    {
      
      title: "Project Organization",
      description: "Create project boards, manage deadlines, and keep all your project-related tasks in one place. Ideal for complex projects and milestone tracking.",
      icon: <FiTrello className="w-8 h-8" />
    },
    {
      
      title: "Team Collaboration",
      description: "Share tasks, assign responsibilities, and collaborate seamlessly with your team. Real-time updates and progress tracking for enhanced team productivity.",
      icon: <FiUsers className="w-8 h-8" />
    }
  ];

  const additionalFeatures = [
    {
      
      title: "Advanced Security",
      description: "Enterprise-grade security with end-to-end encryption, two-factor authentication, and regular backups to keep your data safe and secure.",
      icon: <FiShield className="w-8 h-8" />
    },
    {
      
      title: "Time Tracking",
      description: "Built-in time tracking capabilities to monitor project hours, analyze productivity patterns, and optimize your workflow efficiency.",
      icon: <FiClock className="w-8 h-8" />
    },
    {
     
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting tools to visualize progress, identify bottlenecks, and make data-driven decisions.",
      icon: <FiBarChart className="w-8 h-8" />
    }
  ];

  const workflowFeatures = [
    {
      
      title: "Smart Automation",
      description: "Automate repetitive tasks with custom workflows. Set up triggers, actions, and conditions to streamline your processes and save valuable time.",
      icon: <FiRefreshCw className="w-8 h-8" />
    },
    {
      
      title: "Team Communication",
      description: "Built-in chat and commenting system for seamless team collaboration. Keep discussions contextual and maintain clear communication channels.",
      icon: <FiMessageSquare className="w-8 h-8" />
    },
    {
      
      title: "Performance Metrics",
      description: "Track team and individual performance with detailed metrics. Monitor productivity trends and identify areas for improvement.",
      icon: <FiPieChart className="w-8 h-8" />
    }
  ];

  const integrationFeatures = [
    {
      
      title: "Mobile Access",
      description: "Access your tasks and projects on the go with our mobile apps. Stay productive whether you're at your desk or on the move.",
      icon: <FiSmartphone className="w-8 h-8" />
    },
    {
      
      title: "Global Accessibility",
      description: "Cloud-based platform accessible from anywhere in the world. Collaborate with team members across different time zones effortlessly.",
      icon: <FiGlobe className="w-8 h-8" />
    },
    {
     
      title: "Cloud Storage",
      description: "Secure cloud storage for all your project files and documents. Easy file sharing and version control built right into the platform.",
      icon: <FiCloud className="w-8 h-8" />
    }
  ];

  const productivityFeatures = [
    {
      
      title: "Priority Management",
      description: "Smart task prioritization system to help you focus on what matters most. Visual indicators and automated sorting based on urgency and importance.",
      icon: <FiAlertCircle className="w-8 h-8" />
    },
    {
      
      title: "Calendar Integration",
      description: "Seamless integration with popular calendar apps. Schedule tasks, set deadlines, and manage your time effectively across all platforms.",
      icon: <FiCalendar className="w-8 h-8" />
    },
    {
      
      title: "Smart Tagging",
      description: "Organize tasks and projects with customizable tags. Create your own classification system and find everything quickly when needed.",
      icon: <FiTag className="w-8 h-8" />
    }
  ];

  return (
    
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800 text-white overflow-x-hidden overflow-y-auto">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <FiCheckSquare className="w-8 h-8 text-emerald-400" />
          <span className="text-2xl font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-white hover:text-white transition">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 transition text-white">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Stay Organized, Get More Done
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            The simplest way to keep track of your tasks, deadlines, and goals.
          </p>
          <Link to="/register" className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-lg text-white inline-block">
            Start For Free
          </Link>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-400">{feature.number}</span>
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Capabilities Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Advanced Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-400">{feature.number}</span>
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Features Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Workflow Optimization</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-400">{feature.number}</span>
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Features Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Global Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {integrationFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-400">{feature.number}</span>
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Productivity Features Section */}
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Productivity Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productivityFeatures.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-400">{feature.number}</span>
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Organized?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are managing their tasks effectively with TaskFlow.
            </p>
            <Link to="/register" className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-lg text-white inline-block">
              Start For Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer section remains the same */}
      <footer className="w-full py-16 px-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900">
        {/* Footer content remains the same */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <FiCheckSquare className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold">TaskFlow</span>
              </div>
              <p className="text-gray-400">
                Empowering teams to achieve more through intelligent task management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition"><FiTwitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FiLinkedin className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition"><FiGithub className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Enterprise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <FiMail className="w-5 h-5" />
                  Taskflow@gmail.com
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <FiHeadphones className="w-5 h-5" />
                  +237 696736947
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 TaskFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}