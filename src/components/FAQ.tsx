import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does a website project take?',
      answer:
        'The timeline varies based on project complexity. A simple website typically takes 2-4 weeks, while more complex projects like e-commerce platforms or custom web applications may take 6-12 weeks. We provide a detailed timeline after understanding your requirements.',
    },
    {
      question: 'Do you provide SEO services?',
      answer:
        'Yes! We offer comprehensive SEO services including on-page optimization, technical SEO, keyword research, content optimization, and ongoing SEO maintenance. All our websites are built with SEO best practices in mind.',
    },
    {
      question: 'Do you provide website maintenance?',
      answer:
        'Absolutely! We offer ongoing maintenance packages that include regular updates, security monitoring, backups, performance optimization, and technical support. We ensure your website stays secure, fast, and up-to-date.',
    },
    {
      question: 'What technologies do you use?',
      answer:
        'We use modern, industry-standard technologies including React, Next.js, Node.js, WordPress, and more. We choose the best technology stack based on your specific project requirements and business goals.',
    },
    {
      question: 'Can you redesign my existing website?',
      answer:
        'Yes, we specialize in website redesigns! We can modernize your existing website with a fresh design, improved user experience, better performance, and enhanced functionality while preserving your brand identity.',
    },
    {
      question: 'What is your pricing structure?',
      answer:
        'Our pricing is project-based and depends on your specific requirements, features, and complexity. We provide transparent, detailed quotes with no hidden costs. Contact us for a free consultation and custom quote.',
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
            Frequently Asked{' '}
            <span className="text-[rgb(12,86,112)]">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Find quick answers to common
            questions below.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white border border-gray-200 rounded-2xl p-6 hover:border-[rgb(12,86,112)] transition-all text-left group"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[rgb(12,86,112)] transition-colors">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 bg-[rgb(12,86,112)] text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    {openIndex === index ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-[rgb(12,86,112)] text-white rounded-full font-semibold text-lg hover:bg-[rgb(10,70,92)] transition-all hover:scale-105"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
