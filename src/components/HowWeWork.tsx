    import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Palette, Code, Rocket } from 'lucide-react';

const HowWeWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Research & Strategy',
      description:
        'We begin by understanding your business goals, target audience, and competitive landscape to create a solid foundation for success.',
    },
    {
      number: '02',
      icon: Palette,
      title: 'Design & Prototyping',
      description:
        'Our designers create stunning, user-friendly interfaces with interactive prototypes for your review and feedback.',
    },
    {
      number: '03',
      icon: Code,
      title: 'Development & Testing',
      description:
        'Our expert developers bring designs to life with clean code, rigorous testing, and quality assurance at every step.',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Launch & Growth',
      description:
        'We deploy your project with precision and provide ongoing support to ensure continuous growth and success.',
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How We <span className="text-[rgb(12,86,112)]">Work</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our proven process ensures seamless execution from concept to launch
            and beyond.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[rgb(12,86,112)] to-[rgb(15,100,130)]" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <step.icon size={32} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-[rgb(12,86,112)] text-6xl font-bold opacity-10 absolute top-4 right-4">
                        {step.number}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] text-white rounded-full items-center justify-center font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>

              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to start your project?
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-[rgb(12,86,112)] text-white rounded-full font-semibold text-lg hover:bg-[rgb(10,70,92)] transition-all hover:scale-105"
          >
            Let's Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
