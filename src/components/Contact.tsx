import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@codecrafter.in',
      link: 'mailto:info@codecrafter.in',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 123 456 7890',
      link: 'tel:+911234567890',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Lucknow, Uttar Pradesh, India',
      link: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-gradient-to-b from-white to-gray-50"
    >
      {/* Top section: Form + Contact Info */}
      <div className="py-20 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In <span className="text-[rgb(12,86,112)]">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to start your project? Let's discuss how we can help bring
              your vision to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT COLUMN — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[rgb(12,86,112)] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[rgb(12,86,112)] focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[rgb(12,86,112)] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[rgb(12,86,112)] text-white rounded-xl font-semibold text-lg hover:bg-[rgb(10,70,92)] transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </motion.div>

            {/* RIGHT COLUMN — Contact Info + Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}

              <div className="bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Office Hours</h4>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH MAP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.0653415797037!2d81.00946497511869!3d26.83787396330324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd35011967e7%3A0xc4a2515047590d2a!2sCode%20Crafter%20Web%20Solutions%20%7C%20Website%20%26%20Software%20Development%20%7C%20Popular%20IT%20Service%20Providers%20Company%20in%20Lucknow!5e0!3m2!1sen!2sin!4v1773214372288!5m2!1sen!2sin"
          width="100%"
          height="480"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Code Crafter Web Solutions - Lucknow"
        />
      </motion.div>
    </section>
  );
};

export default Contact;