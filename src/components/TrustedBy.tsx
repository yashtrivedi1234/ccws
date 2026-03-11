import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TrustedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companies = [
    'TechVision',
    'StyleHub',
    'GrowthLabs',
    'FoodieDelight',
    'HealthCare Plus',
    'EduTech',
    'FinanceHub',
    'RetailPro',
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted By <span className="text-[rgb(12,86,112)]">Leading Brands</span>
          </h2>
          <p className="text-lg text-gray-600">
            Proud to work with amazing companies across industries
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-12"
          >
            {[...companies, ...companies].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 bg-white rounded-2xl px-12 py-8 shadow-lg border border-gray-100 hover:border-[rgb(12,86,112)] transition-all group"
              >
                <div className="text-2xl font-bold text-gray-400 group-hover:text-[rgb(12,86,112)] transition-colors whitespace-nowrap">
                  {company}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
