import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
  Award,
  MapPin,
  Phone,
  Download,
  Menu,
  X,
  ChevronDown,
  Trophy,
  Target,
  Zap,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Globe,
  Loader2,
  ArrowUp
} from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing Portfolio...",
    "Loading Projects...",
    "Preparing Experience...",
    "Almost Ready..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-8"
        />
        
        <motion.h2
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-2xl font-bold text-white mb-6"
        >
          {loadingTexts[currentText]}
        </motion.h2>
        
        <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-4"
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Define your section order at the top
  const SECTION_ORDER = ['Home', 'Skills', 'Projects', 'Experience', 'About', 'Contact', 'Resume'];

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTION_ORDER.map(s => s.toLowerCase());
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'shadcn', 'redux'],
    backend: ['Node.js', 'Express.js', 'RESTful APIs', 'Convex', 'FastAPI'],
    database: ['MongoDB', 'SQL', 'Prisma ORM', 'MySQL'],
    devops: ['Docker', 'Linux', 'Git', 'AWS (EC2, S3, DynamoDB)', 'CI/CD'],
    core_concept: ['Object Oriented Programming', 'Data Structure And Algorithm', 'System Design', 'Software Design'],
    other: ['Gemini API', 'LangGraph', 'JWT', 'Authentication', 'AI Integration']
  };

  const projects = [
    {
      title: 'Real-Time Collaborative Code Editor',
      description: 'A full-stack SaaS application built with Next.js and TypeScript, featuring real-time code editing with modern UI and collaborative features.',
      tech: ['Next.js', 'TypeScript', 'Convex', 'Clerk', 'LemonSqueezy'],
      features: [
        'Real-time collaborative editing with Operational Transforms',
        'Secure authentication with Clerk',
        'Subscription management with LemonSqueezy',
        'Low-latency synchronization using Convex backend'
      ],
      github: 'https://github.com/aryanrai97861/SAAS-Code-Editor',
      demo: 'https://saas-code-editor-peach.vercel.app/',
      image: '/SAAS.png'
    },
    {
      title: 'AI Meeting Scheduling Agent',
      description: 'An LLM-powered scheduling agent using LangGraph and FastAPI for intelligent meeting management with natural language processing.',
      tech: ['FastAPI', 'LangGraph', 'Streamlit', 'Gemini API'],
      features: [
        'Natural language processing for meeting requests',
        'Intelligent scheduling and conflict resolution',
        'Real-time monitoring dashboard',
        'User interaction analytics'
      ],
      github: 'https://github.com/aryanrai97861/Tailor-Talk-Calendar-LLM-Agent',
      demo: 'https://tailor-talk-calendar-llm-agent-echfzcjgbhzdfncjigcofu.streamlit.app/',
      image: '/calendar.png'
    },
    {
      title: 'AI Fitness Trainer',
      description: 'A voice-enabled AI fitness trainer that generates personalized workout and diet plans using advanced AI integration.',
      tech: ['Next.js', 'Vapi', 'Gemini API', 'Convex', 'Clerk', 'TypeScript'],
      features: [
        'Voice-enabled AI assistant',
        'Personalized workout and diet plans',
        'Secure user authentication',
        'Real-time data synchronization'
      ],
      github: 'https://github.com/aryanrai97861/AI-Fitness-Trainer',
      demo: 'https://ai-fitness-trainer-snowy.vercel.app/',
      image: '/AI_Fitness.png'
    },
    {
      title: 'AI Evaluator',
      description: 'A full-stack AI-powered evaluator using React and RESTful APIs to automate and streamline answer assessment using Gemini.',
      tech: ['React', 'Node.js', 'Express.js', 'Gemini API', 'PrismaORM', 'JavaScript'],
      features: [
        'Intelligent, context-aware evaluation of text-based submissions',
        'Modern, responsive user interface',
        'Automated answer assessment'
      ],
      github: 'https://github.com/aryanrai97861/AI-Evaluator',
      demo: 'https://ai-evaluator-sigma.vercel.app/',
      image: '/AI_Evaluator.png'
    }
  ];

  const experience = [
    {
      title: 'Full Stack Developer Intern',
      company: 'Quantinent Analytics',
      location: 'Ahmedabad, Gujarat, India',
      period: 'May 2025 – August 2025',
      achievements: [
        'Automated data extraction by integrating Tesseract.js OCR, reducing manual data entry time by 20%',
        'Designed and deployed RESTful APIs using Express.js, handling 100+ daily requests with optimized performance',
        'Streamlined deployment processes by containerizing services with Docker, improving deployment efficiency by 30%'
      ]
    }
  ];

  const certifications = [
    'Complete Data Structure and Algorithm Bootcamp (Udemy)',
    'Full Stack Developer Bootcamp (Udemy)',
    'Introduction to Generative AI (Microsoft)',
    'MongoDB Atlas (MongoDB)',
    'Oracle Certified Foundations Associate',
    'AI Essentials V2 (Coursera)'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const SKILL_LABELS = {
    languages: 'Languages',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps & Cloud',
    core_concept: 'Core Concept',
    other: 'Other'
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Aryan Kumar Rai
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {SECTION_ORDER.map((item, index) =>
                item === 'Resume' ? (
                  <motion.a
                    key={item}
                    href="https://drive.google.com/file/d/1Ngv9NJoJjjAC9hiS4f2KbkIPQt45aqav/view?usp=sharing" //Google Drive resume link
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm font-medium transition-all duration-300 hover:text-blue-400 relative text-gray-300"
                  >
                    {item}
                  </motion.a>
                ) : (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative ${
                      activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                      />
                    )}
                  </motion.button>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} className="text-gray-300" /> : <Menu size={24} className="text-gray-300" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 border-t border-gray-700"
            >
              <div className="px-4 py-2 space-y-1">
                {SECTION_ORDER.map((item) =>
                  item === 'Resume' ? (
                    <a
                      key={item}
                      href="https://drive.google.com/file/d/1Ngv9NJoJjjAC9hiS4f2KbkIPQt45aqav/view?usp=sharing" // Google Drive resume link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md"
                    >
                      {item}
                    </a>
                  ) : (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-md"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-6xl md:text-8xl font-extrabold text-white mb-6 leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05, color: "#60a5fa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  DESIGN.
                </motion.span>
                <br/>
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.05, color: "#a78bfa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  DEVELOP.
                </motion.span>
                <br/>
                <motion.span
                  className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  DOMINATE.
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Hi, I'm <span className="text-blue-400 font-semibold">Aryan Kumar Rai</span>, a Computer Science Engineering student, a Full Stack Software Developer, AI Enthusiast, and DevOps Engineer.
              </p>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Passionate about building modern web applications, automation, and creative problem-solving. 
                Currently pursuing B.Tech in Computer Science and Engineering.
              </p>
            </motion.div>
              
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center">
                  <Zap className="mr-2" size={20} />
                  View My Work
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center">
                  <Mail className="mr-2" size={20} />
                  Get In Touch
                </span>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-6"
            >
              {[
                { icon: Github, href: "https://github.com/aryanrai97861", color: "text-gray-400 hover:text-white" },
                { icon: Linkedin, href: "https://linkedin.com/in/aryan-kumar-rai", color: "text-gray-400 hover:text-blue-400" },
                { icon: Mail, href: "mailto:aryanrai97861@gmail.com", color: "text-gray-400 hover:text-red-400" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-10 hidden lg:block"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-full"></div>
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 right-10 hidden lg:block"
          style={{ animationDelay: '1s' }}
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-full"></div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  {category === 'languages' && <Code className="text-blue-400 mr-3" size={28} />}
                  {category === 'frontend' && <Smartphone className="text-green-400 mr-3" size={28} />}
                  {category === 'backend' && <Server className="text-purple-400 mr-3" size={28} />}
                  {category === 'database' && <Database className="text-orange-400 mr-3" size={28} />}
                  {category === 'devops' && <Globe className="text-red-400 mr-3" size={28} />}
                  {category === 'core_concept' && <Code className="text-indigo-400 mr-3" size={28}/>}
                  {category === 'other' && <Zap className="text-indigo-400 mr-3" size={28} />}
                  <h3 className="text-xl font-bold text-white">
                    {SKILL_LABELS[category] || category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full text-sm font-medium cursor-default border border-gray-600"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <motion.h3 
                      whileHover={{ color: "#60a5fa" }}
                      className="text-3xl font-bold text-white mb-4"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">{project.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-3 flex items-center">
                        <Target className="mr-2 text-blue-400" size={20} />
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                            <span className="text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 rounded-full text-sm font-medium border border-blue-700"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg font-medium"
                      >
                        <Github size={20} className="mr-2" />
                        Code
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-6 py-3 border-2 border-blue-400 text-blue-400 rounded-xl hover:bg-blue-400 hover:text-white transition-colors shadow-lg font-medium"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 p-8 rounded-2xl shadow-lg border border-gray-600"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-gray-600">
                      {/* Image Placeholder */}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-xl "
                        />
                      ) : (
                        <div className="w-28 h-28 bg-gray-700 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-500">
                          <span className="text-gray-400 text-lg">Image</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 mb-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white">{exp.title}</h3>
                    <p className="text-xl text-blue-400 font-semibold">{exp.company}</p>
                    <p className="text-gray-300 flex items-center mt-2">
                      <MapPin className="mr-2" size={16} />
                      {exp.location}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 rounded-full text-sm font-medium border border-blue-700">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-green-400" />
                    Key Achievements:
                  </h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <motion.li 
                        key={idx} 
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4"></div>
                        <span className="text-gray-300">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700"
            >
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Award className="mr-3 text-yellow-400" />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-gray-600"
                  >
                    <Award size={20} className="text-blue-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                Passionate Developer & Problem Solver
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                I'm a dedicated Software Developer with a strong foundation in modern web technologies 
                and a passion for creating innovative solutions. Currently pursuing my B.Tech in Computer 
                Science and Engineering.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                With hands-on experience in Frontend, Backend, and cloud technologies, I enjoy 
                building scalable applications that solve real-world problems. I am currently exploring 
                AI technolgies, data automation and API development, significantly improving operational efficiency.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { icon: Phone, text: "+91 7379963404" },
                  { icon: Mail, text: "aryanrai97861@gmail.com" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center p-3 bg-gray-800 rounded-lg shadow-md border border-gray-700"
                  >
                    <item.icon size={16} className="text-blue-400 mr-2" />
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
            >
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calendar className="mr-3 text-blue-400" />
                Education
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-gray-600">
                  <h5 className="font-semibold text-white">B.Tech in Computer Science and Engineering</h5>
                  <p className="text-gray-300">Raj Kumar Goel Institute of Technology</p>
                  <p className="text-sm text-gray-400">Nov 2022 – August 2026</p>
                </div>
              </div>

              <h4 className="text-2xl font-bold text-white mb-6 mt-8 flex items-center">
                <Trophy className="mr-3 text-yellow-400" />
                Achievements
              </h4>
              <div className="space-y-3">
                {[
                  "Solved 400+ DSA problems on LeetCode/GeeksforGeeks",
                  "Multiple certifications in Full Stack Development and AI",
                  "Built and deployed multiple production-ready applications"
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start p-3 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-gray-600"
                  >
                    <Star className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { icon: Mail, title: "Email", content: "aryanrai97861@gmail.com", color: "from-red-400 to-pink-500" },
                { icon: Phone, title: "Phone", content: "+91 7379963404", color: "from-green-400 to-blue-500" },
                { icon: MapPin, title: "Location", content: "Ghaziabad, Uttar Pradesh, India", color: "from-purple-400 to-indigo-500" }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mr-6`}>
                    <contact.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{contact.title}</h3>
                    <p className="text-gray-300">{contact.content}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-8">
                <h3 className="font-semibold text-white mb-6 text-xl flex items-center">
                  <Users className="mr-2 text-blue-400" />
                  Connect with me
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/aryanrai97861", color: "from-gray-700 to-gray-900" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/aryan-kumar-rai-a3547430b/", color: "from-blue-600 to-blue-700" },
                    { icon: Mail, href: "mailto:aryanrai97861@gmail.com", color: "from-red-500 to-red-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-gradient-to-r ${social.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700"
            >
              <h3 className="text-3xl font-bold text-white mb-6">Let's work together</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. Feel free to reach out through any of the channels above.
              </p>
              
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                href="mailto:aryanrai97861@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail size={24} className="mr-3" />
                Send me an email
              </motion.a>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-600">
                <h4 className="font-semibold text-white mb-3">Quick Response</h4>
                <p className="text-gray-300 text-sm">
                  I typically respond to emails within 24 hours. For urgent matters, 
                  feel free to reach out via phone or LinkedIn.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold mb-4"
            >
              Aryan Kumar Rai
            </motion.h3>
            <p className="text-gray-400 mb-8 text-lg">Software Developer | AI Enthusiast | Problem Solver</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Github, href: "https://github.com/aryanrai97861" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/aryan-kumar-rai-a3547430b/" },
                { icon: Mail, href: "mailto:aryanrai97861@gmail.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon size={28} />
                </motion.a>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 Aryan Kumar Rai. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default App;

