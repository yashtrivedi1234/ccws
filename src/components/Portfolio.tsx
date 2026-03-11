import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Modern online shopping experience with secure payments',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Corporate Website',
      category: 'UI/UX Design',
      description: 'Professional corporate identity and branding',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: 'Mobile App Design',
      category: 'App Design',
      description: 'Intuitive mobile application interface',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'SaaS Dashboard',
      category: 'Web Development',
      description: 'Complex data visualization and analytics platform',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Restaurant Website',
      category: 'Web Design',
      description: 'Beautiful food ordering and reservation system',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Healthcare Portal',
      category: 'Web Development',
      description: 'Patient management and telemedicine platform',
      gradient: 'from-indigo-500 to-blue-600',
    },
  ];

  return (
    <section id="portfolio" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Best <span className="text-[rgb(12,86,112)]">Work</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects that showcase our
            expertise and creativity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <div
                className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
                    View Project
                    <ExternalLink size={18} />
                  </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-white/30 rounded-xl transform rotate-12 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-[rgb(12,86,112)] font-semibold mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 border-2 border-[rgb(12,86,112)] text-[rgb(12,86,112)] rounded-full font-semibold text-lg hover:bg-[rgb(12,86,112)] hover:text-white transition-all hover:scale-105">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
