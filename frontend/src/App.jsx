import { useState, useEffect } from 'react';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-xlmu.onrender.com/api';

  useEffect(() => {
    if (activePage === 'projects') {
      fetchProjects();
    }
    // Close mobile menu when page changes
    setIsMobileMenuOpen(false);
  }, [activePage]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([
        { 
          _id: 1, 
          title: 'Consultancy Website', 
          description: 'A responsive Consultancy website built with MERN Stack and Bootstrap with Admin Panel & Login system.',
          tech: ['React', 'Bootstrap', 'JavaScript'],
          github: 'https://github.com/yash936936/Consultancy_Website'
        },
        { 
          _id: 2, 
          title: 'Chatbot Web App', 
          description: 'Interactive web-based chatbot that answers user queries using API integrations and image input function.',
          tech: ['REST APIs', 'HTML/CSS/JS'],
          github: 'https://github.com/yash936936/ChatBot'
        },
        { 
          _id: 3, 
          title: 'E-Commerce', 
          description: 'Complete online shopping platform with user authentication, product management, and real-time cart updates.',
          tech: ['React', 'Express', 'MongoDB'],
          github: 'https://github.com/yash936936/MERN_ECOMMERCEE'
        },
        { 
          _id: 4, 
          title: 'Chat Application', 
          description: 'Real-time chat app with Socket.io and modern UI.',
          tech: ['React', 'Socket.io', 'Tailwind CSS'],
          github: 'https://github.com/yash936936/Chat_APP'
        },
        { 
          _id: 5, 
          title: 'Trend Analysis', 
          description: 'Analyzes consumer shopping trends using exploratory data analysis.',
          tech: ['Python', 'Pandas', 'Matplotlib'],
          github: 'https://github.com/yash936936/identifying-shopping-trends-using-data-analysis'
        },
        { 
          _id: 6, 
          title: 'Stock Price Prediction', 
          description: 'Predicts future stock prices using historical market data.',
          tech: ['Python', 'TensorFlow'],
          github: 'https://github.com/yash936936/Stock-Price-Prediction-Using-Time-Series-Regression'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const displayProjects = projects.length > 0 ? projects : [];

  const renderPage = () => {
    const textColor = darkMode ? 'text-white' : 'text-black';
    const bgColor = darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-100 to-white';
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
    const tagBg = darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800';

    switch (activePage) {
      case 'home':
        return (
          <section className={`${bgColor} p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between min-h-[80vh]`}>
            <div className="max-w-2xl order-2 lg:order-1 text-center lg:text-left">
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-purple-500'}`}>Hello there 👋</h1>
              <h2 className={`text-xl md:text-2xl lg:text-3xl mt-2 ${textColor}`}>Transforming Ideas into Scalable Digital Products</h2>
              <p className={`mt-4 ${textColor} text-sm md:text-base`}>I'm Yash Malik — a MERN stack developer from Delhi with a strong passion for coding, problem-solving, and exploring emerging technologies.</p>
              <ul className={`list-disc list-inside mt-4 ${textColor} text-sm md:text-base space-y-2`}>
                <li>Building full-stack projects that turn ideas into scalable products.</li>
                <li>Driven by a clear goal — to become a proficient full-stack developer.</li>
                <li>Transforming creative ideas into interactive digital experiences through code.</li>
              </ul>
              <div className="flex items-center justify-center lg:justify-start space-x-4 mt-6">
                <a href="https://github.com/yash936936" target="_blank" rel="noopener noreferrer" className={`${textColor} hover:text-purple-600 transition transform hover:scale-110`}>
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/yashmalik-/" target="_blank" rel="noopener noreferrer" className={`${textColor} hover:text-purple-600 transition transform hover:scale-110`}>
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="mailto:yashm15082005@gmail.com" className={`${textColor} hover:text-purple-600 transition transform hover:scale-110`} title="Email">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center lg:justify-start">
                <a 
                  href="https://drive.google.com/file/d/1zvtE8aSTT6AGmfx_6WMEG5984xSZ8uj-/view?usp=sharing" 
                  download
                  className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-900 hover:to-pink-900'} text-white px-4 py-3 md:px-6 md:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition transform hover:scale-105 shadow-lg text-sm md:text-base`}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </a>
                <button 
                  onClick={() => setActivePage('projects')}
                  className={`border-2 ${darkMode ? 'border-purple-500 text-purple-400 hover:bg-purple-900' : 'border-purple-800 text-purple-800 hover:bg-purple-50'} px-4 py-3 md:px-6 md:py-3 rounded-lg font-semibold transition transform hover:scale-105 text-sm md:text-base`}
                >
                  My Work
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 mb-6 lg:mb-0">
              <img 
                src="/Profile.png" 
                alt="Profile" 
                className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-58 lg:h-58 mx-auto lg:mx-0" 
              />
            </div>
          </section>
        );
      case 'about':
        return (
          <section className={`${bgColor} p-4 md:p-6 lg:p-8 min-h-[80vh]`}>
            <div className="max-w-4xl mx-auto">
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-purple-500'} text-center md:text-left`}>About me</h1>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
                <img src="/Profile.png" alt="Profile" className="rounded-full w-32 h-32 md:w-40 md:h-40 flex-shrink-0" />
                <div className="flex-1">
                  <p className={`mt-4 ${textColor} text-sm md:text-base`}>Hello, I'm Yash Malik, a MERN stack developer from Delhi with a strong foundation in full-stack web development. Currently pursuing my BCA degree, I'm committed to building innovative web applications and carving a successful career in the tech industry.</p>
                  <p className={`mt-2 ${textColor} text-sm md:text-base`}>As the next step in my journey, I'm focused on honing my web development skills by creating impactful full-stack projects.</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-purple-600 mt-4">💖 What I Love</h2>
                  <p className={`mt-2 ${textColor} text-sm md:text-base`}>I'm passionate about coding and constantly exploring diverse tech domains, including web development, AI/ML, and data analytics.</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-purple-600 mt-4">🎯 My Hobbies</h2>
                  <p className={`mt-2 ${textColor} text-sm md:text-base`}>"I thrive on innovation—whether developing full-stack web apps or exploring AI/ML projects, I love turning ideas into real-world solutions while challenging myself to grow.</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'skills':
        return (
          <section className={`${bgColor} p-4 md:p-6 lg:p-8 min-h-[80vh]`}>
            <div className="max-w-6xl mx-auto">
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-purple-500'} text-center md:text-left`}>My technical expertise</h1>
              <p className={`mt-4 ${textColor} text-sm md:text-base text-center md:text-left`}>I'm a tech explorer! This is where my strengths come alive. From creating interactive full-stack web apps to experimenting with AI/ML projects, my skills turn ideas into reality. Every project showcased here reflects my passion for building smart, scalable, and efficient digital solutions.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                <div>
                  <h2 className={`text-lg md:text-xl font-semibold ${textColor} mb-3 text-center md:text-left`}>Proficient with ⚡</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'Python'].map((skill) => (
                      <span key={skill} className={`${tagBg} px-3 py-2 md:px-4 md:py-2 rounded-full font-medium shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer text-sm md:text-base`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className={`text-lg md:text-xl font-semibold ${textColor} mb-3 text-center md:text-left`}>Comfortable with 🔧</h2>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {['Express', 'Node', 'MongoDB', 'MySQL', 'Render', 'Vercel'].map((skill) => (
                      <span key={skill} className={`${tagBg} px-3 py-2 md:px-4 md:py-2 rounded-full font-medium shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer text-sm md:text-base`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <h2 className={`text-lg md:text-xl font-semibold ${textColor} mb-3 text-center md:text-left`}>Have a strong foundation in 💪</h2>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  {['Communication', 'Research', 'Git & GitHub', 'Management', 'Teamwork', 'Problem Solving'].map((skill) => (
                    <span key={skill} className={`${tagBg} px-3 py-2 md:px-4 md:py-2 rounded-full font-medium shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer text-sm md:text-base`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case 'projects':
        return (
          <section className={`${bgColor} p-4 md:p-6 lg:p-8 min-h-[80vh]`}>
            <div className="max-w-7xl mx-auto">
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-purple-500'} text-center md:text-left`}>Projects</h1>
              <p className={`${textColor} mb-6 text-sm md:text-base text-center md:text-left`}>Browse my range of cutting-edge programming projects.</p>
              {loading ? (
                <div className={`text-center ${textColor} py-12`}>
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-lg">Loading projects...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {displayProjects.map((project) => (
                    <div
                      key={project._id}
                      className={`${cardBg} p-4 md:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <h2 className={`text-xl md:text-2xl font-bold ${textColor} mb-3`}>{project.title}</h2>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 min-h-[80px] md:min-h-[60px] text-sm md:text-base`}>
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                        {project.tech && project.tech.map((tech, index) => (
                          <span 
                            key={index}
                            className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-2 md:space-x-3 mt-4">
                        <a 
                          href={project.github || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-900'} text-white text-center py-2 rounded-lg font-medium transition flex items-center justify-center space-x-1 text-sm md:text-base`}
                        >
                          <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className={`${bgColor} p-4 md:p-6 lg:p-8 min-h-[80vh]`}>
            <div className="max-w-6xl mx-auto">
              <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-cyan-400' : 'text-purple-500'} text-center md:text-left`}>Get in touch</h1>
              <p className={`mt-4 ${textColor} text-sm md:text-base text-center md:text-left`}>Reach out to discuss opportunities, share ideas, or collaborate on projects. I'm always eager to connect, learn, and turn innovative concepts into reality—contact me via the form or social platforms.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 mb-6 md:mb-8 justify-center md:justify-start">
                <a 
                  href="mailto:yashm15082005@gmail.com"
                  className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} px-4 py-3 md:px-6 md:py-3 rounded-lg shadow-md transition transform hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} w-full sm:w-auto`}
                >
                  <svg className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <div className="text-left">
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                    <p className={`font-semibold ${textColor} text-sm md:text-base`}>yashm15082005@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/yashmalik-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} px-4 py-3 md:px-6 md:py-3 rounded-lg shadow-md transition transform hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} w-full sm:w-auto`}
                >
                  <svg className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <div className="text-left">
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>LinkedIn</p>
                    <p className={`font-semibold ${textColor} text-sm md:text-base`}>Connect with me</p>
                  </div>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-lg mx-auto md:mx-0">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={`w-full p-3 border border-gray-300 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} text-sm md:text-base`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={`w-full p-3 border border-gray-300 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} text-sm md:text-base`}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  required
                  className={`w-full p-3 border border-gray-300 rounded h-32 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} text-sm md:text-base`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''} w-full md:w-auto text-sm md:text-base`}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={darkMode ? 'text-white bg-gray-900 min-h-screen flex flex-col' : 'text-black bg-white min-h-screen flex flex-col'}>
      {/* Navigation Bar */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-purple-800'} p-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo/Brand - Hidden on mobile, visible on medium screens and up */}
          <div className="hidden md:block text-white font-bold text-lg">
            Yash Malik
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 text-white">
            {['home', 'about', 'skills', 'projects', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-700'} px-3 py-2 rounded transition capitalize ${activePage === page ? (darkMode ? 'bg-gray-700' : 'bg-purple-700') : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-700'} px-3 py-2 rounded flex items-center transition text-white`}
            >
              {darkMode ? '☀️' : '🌙'}
              <span className="hidden sm:inline ml-1">{darkMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2 rounded focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {['home', 'about', 'skills', 'projects', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`block w-full text-left px-4 py-3 rounded transition capitalize text-white ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-700'} ${activePage === page ? (darkMode ? 'bg-gray-700' : 'bg-purple-700') : ''}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-purple-800'} text-white p-6 text-center`}>
        <div className="max-w-7xl mx-auto">
          <p className="text-sm md:text-base">© 2025 Yash Malik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
