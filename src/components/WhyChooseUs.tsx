import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  CheckCircle,
  Zap,
  Shield,
  Rocket,
  Headphones,
  TrendingUp,
} from 'lucide-react';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasons = [
    {
      icon: CheckCircle,
      title: 'Expert Development Team',
      description:
        'Highly skilled developers with years of experience in modern technologies.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description:
        'Quick turnaround times without compromising on quality or functionality.',
    },
    {
      icon: Shield,
      title: 'SEO-Friendly Websites',
      description:
        'Built with best SEO practices to help you rank higher in search engines.',
    },
    {
      icon: Rocket,
      title: 'Modern Technology Stack',
      description:
        'Using the latest frameworks and tools to build future-proof solutions.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Architecture',
      description:
        'Solutions designed to grow with your business needs seamlessly.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description:
        '24/7 customer support to ensure your success every step of the way.',
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="text-[rgb(12,86,112)]">Code Crafter</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine expertise, innovation, and dedication to deliver
            exceptional digital solutions that drive real results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-[rgb(12,86,112)] hover:shadow-xl transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(12,86,112)] to-[rgb(15,100,130)] rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-[rgb(12,86,112)] text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <reason.icon size={28} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[rgb(12,86,112)] to-[rgb(15,100,130)] rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Digital Presence?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing that drives your
            business forward.
          </p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-white text-[rgb(12,86,112)] rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 inline-block"
          >
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
