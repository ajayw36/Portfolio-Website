export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Resume</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="glass-card p-8 hover-card">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              Education
            </h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="text-xl text-indigo-400 font-medium">University of Michigan</h4>
                <p className="text-gray-300">Honors Mathematics and Computer Science</p>
                <p className="text-gray-400">Aug. 2025 – May 2028</p>
                <p className="text-sm text-gray-500 mt-2">Relevant Coursework: Programming and Introductory Data Structures, Linear Algebra, Discrete Math</p>
              </div>
              <div className="relative pl-8 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="text-xl text-indigo-400 font-medium">Boston University</h4>
                <p className="text-gray-300">Dual Enrollment through Boston University Academy</p>
                <p className="text-gray-400">July 2023 – May 2025</p>
                <p className="text-sm text-gray-500 mt-2">Relevant Coursework: Introduction to Computer Science 1 and 2, Introduction to Data Science with Python, Linear Algebra, Differential Equations, Statistics 1</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="glass-card p-8 hover-card">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              Experience
            </h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="text-xl text-indigo-400 font-medium">Director of Computer Science</h4>
                <p className="text-gray-300">Greater Boston STEM Program (gbSTEM)</p>
                <p className="text-gray-400">Sep. 2023 – May 2025</p>
                <p className="text-sm text-gray-500 mt-2">Managed a team of 15 instructors and created engaging project-based curriculum for Scratch, Python, and Web Development classes.</p>
              </div>
              <div className="relative pl-8 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="text-xl text-indigo-400 font-medium">Investment Analyst Intern</h4>
                <p className="text-gray-300">Silver Arc Capital</p>
                <p className="text-gray-400">June 2025 – August 2025</p>
                <p className="text-sm text-gray-500 mt-2">Conducted research for biotechnology-focused hedge fund, focusing on cystic fibrosis treatments and financial modeling.</p>
              </div>
              <div className="relative pl-8 border-l-2 border-indigo-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                <h4 className="text-xl text-indigo-400 font-medium">Neurology Research Intern</h4>
                <p className="text-gray-300">Mass General Hospital</p>
                <p className="text-gray-400">July 2024 – Sep. 2024</p>
                <p className="text-sm text-gray-500 mt-2">Developed ML models to identify sharp-wave ripples from high-density EEG datasets and produced research paper.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <div className="glass-card p-8 hover-card">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg text-indigo-400 mb-4">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Python', 'C++', 'HTML/CSS', 'JavaScript', 'Dart'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg text-indigo-400 mb-4">Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Flutter', 'Spring Boot', 'Firebase'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg text-indigo-400 mb-4">Tools & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {['Git/Github', 'VS Code', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'SciKit-learn'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 