export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Portfolio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* KTP Life App */}
          <div className="glass-card group hover-card flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">KTP Life App</h3>
                <p className="text-gray-300 mb-4">
                  Designed and implemented a pledge task-tracking feature using Flutter SDK and Dart for Kappa Theta Pi, a professional technology fraternity at the University of Michigan.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Flutter</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Dart</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Firebase</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Figma</span>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mt-auto">
              <span className="text-gray-400 flex items-center">
                In Development
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Healthcare Analytics Dashboard */}
          <div className="glass-card group hover-card">
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Healthcare Analytics Dashboard</h3>
                <p className="text-gray-300 mb-4">
                  Built a full-stack web dashboard with React frontend and Spring Boot backend for Integrate, a University of Michigan–based healthcare startup.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Spring Boot</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">SQL</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">Tableau</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">TypeScript</span>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <span className="text-gray-400 flex items-center">
                In Development
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 