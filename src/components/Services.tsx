import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Palette,
  ShoppingCart,
  LayoutGrid,
  TrendingUp,
  Search,
  Server,
  Smartphone,
  Image,
} from "lucide-react";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Palette,
      title: "Website Design",
      description:
        "Creative and modern website designs that reflect your brand and deliver an excellent user experience.",
    },
    {
      icon: LayoutGrid,
      title: "Custom Software Design",
      description:
        "Tailor-made software solutions designed to streamline your business operations and improve efficiency.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "High-performance Android and iOS applications built with modern technologies for seamless user experience.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description:
        "Complete e-commerce platforms with secure payment integration and smooth shopping experiences.",
    },
    {
      icon: Image,
      title: "Graphic Design",
      description:
        "Creative graphic design services including logos, branding materials, and marketing visuals.",
    },
    {
      icon: Search,
      title: "Search Engine Optimization",
      description:
        "Effective SEO strategies to improve search rankings and increase organic traffic to your website.",
    },
    {
      icon: TrendingUp,
      title: "Social Media Optimization",
      description:
        "Grow your brand visibility and engagement across social media platforms with strategic optimization.",
    },
    {
      icon: Server,
      title: "Web / VPS Hosting",
      description:
        "Reliable and secure web hosting and VPS solutions with high uptime and fast performance.",
    },
  ];

  return (
    <section
      id="services"
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
            Our <span className="text-[rgb(12,86,112)]">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to elevate your brand and
            drive business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[rgb(12,86,112)]/10 to-transparent rounded-bl-full -z-0 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <service.icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <motion.div className="mt-6 flex items-center text-[rgb(12,86,112)] font-semibold group-hover:translate-x-2 transition-transform">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;