import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'CEO, TechVision India',
      feedback:
        'Code Crafter transformed our online presence completely. Their team delivered a stunning website that not only looks great but also performs exceptionally well. Highly recommended!',
      rating: 5,
      initial: 'R',
    },
    {
      name: 'Priya Sharma',
      role: 'Founder, StyleHub',
      feedback:
        'Working with Code Crafter was an absolute pleasure. They understood our vision and created an e-commerce platform that exceeded our expectations. Our sales have increased by 150%!',
      rating: 5,
      initial: 'P',
    },
    {
      name: 'Amit Verma',
      role: 'Marketing Director, GrowthLabs',
      feedback:
        'The team at Code Crafter is incredibly talented and professional. They delivered our project on time and provided excellent support. The results speak for themselves!',
      rating: 5,
      initial: 'A',
    },
    {
      name: 'Neha Gupta',
      role: 'Owner, FoodieDelight',
      feedback:
        'Our restaurant website looks amazing! The online ordering system works flawlessly, and we have seen a significant increase in orders. Thank you, Code Crafter!',
      rating: 5,
      initial: 'N',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
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
            What Our <span className="text-[rgb(12,86,112)]">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with us.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 0.9,
                  display: activeIndex === index ? 'block' : 'none',
                }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
              >
                <div className="flex justify-center mb-6">
                  <Quote
                    size={48}
                    className="text-[rgb(12,86,112)] opacity-20"
                  />
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-xl text-gray-700 text-center mb-8 leading-relaxed italic">
                  "{testimonial.feedback}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {testimonial.initial}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? 'bg-[rgb(12,86,112)] w-8'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
