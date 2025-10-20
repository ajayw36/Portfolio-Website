import Resume from '@/components/Resume';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold gradient-text">AW</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#about" className="nav-link">About</a>
                <a href="#resume" className="nav-link">Resume</a>
                <a href="#portfolio" className="nav-link">Portfolio</a>
                <a href="#contact" className="nav-link">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Ajay Wadhwani</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            CS and Math at University of Michigan
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#portfolio"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 glass-card text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a Computer Science and Mathematics student at the University of Michigan with a passion for technology, research, and innovation. I've gained experience in machine learning research, investment analysis, and software development through various internships and projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I enjoy working on diverse projects spanning healthcare analytics, financial modeling, and mobile app development. When I'm not coding, you can find me skateboarding or playing the piano.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden">
                <img 
                  src="/DSC09525 4.JPG" 
                  alt="Ajay Wadhwani" 
                  className="w-full h-full object-cover object-center scale-150"
                  style={{ objectPosition: '60% center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <Resume />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ajay Wadhwani. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
