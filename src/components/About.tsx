import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Users, Award, Target, Linkedin } from 'lucide-react';
import aksaImage from '../assets/aksa.jpeg';
import irshadImage from '../assets/irshad.jpeg';
import satyaImage from '../assets/satya.jpeg';
import sureshImage from '../assets/suresh.jpeg';
import yashImage from '../assets/yash.jpeg';
import shivangiImage from '../assets/shivangi.jpeg';
import shaluImage from '../assets/shalu.jpeg';
const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const teamMembers = [
    {
      name: 'Aksa Naisar',
      role: 'Founder & CEO',
      image: aksaImage,
      linkedinUrl: 'https://www.linkedin.com/in/aksanasir/',
    },
    {
      name: 'Satya Prakash',
      role: 'Software Developer',
      image: satyaImage,
      linkedinUrl: 'https://www.linkedin.com/in/satya-prakash-dev/',
    },
    {
      name: 'Suresh Kumar',
      role: 'Software Developer',
      image: sureshImage,
      linkedinUrl: 'https://www.linkedin.com/in/accessauthority/',
    },
    {
      name: 'Yash Trivedi',
      role: 'Software Developer',
      image: yashImage,
      linkedinUrl: 'https://www.linkedin.com/in/yash-trivedi-contact/',
    },
    {
      name: 'Shivagi Yadav',
      role: 'Software Developer',
      image: shivangiImage,
      linkedinUrl: 'https://www.linkedin.com/in/shivangi-ydv/',
    },
    {
      name: 'Shalu Kumari',
      role: 'Software Developer',
      image: shaluImage,
      linkedinUrl: 'https://www.linkedin.com/in/shalu-kumari-contact/',
    },
    {
      name: 'Irshad Ali',
      role: 'Software Developer',
      image: irshadImage,
      linkedinUrl: 'https://www.linkedin.com/in/irshad-ali-7755a5373/',
    },
    {
      name: 'Abhay',
      role: 'Software Developer',
      linkedinUrl: 'https://www.linkedin.com/in/abhay/',
    },
    {
      name: 'Ankit Pal',
      role: 'Video Editor',
      linkedinUrl: 'https://www.linkedin.com/in/ankit-pal/',
    },
    {
      name: 'Sandeep Yadav',
      role: 'Business Development Executive',
      linkedinUrl: 'https://www.linkedin.com/in/sandeep-yadav/',
    },
    {
      name: 'Kirti Maurya',
      role: 'Business Development Executive',
      linkedinUrl: 'https://www.linkedin.com/in/kirti-maurya/',
    },
  ];

  const highlights = [
    {
      icon: Code,
      title: 'Modern Technology',
      description: 'Using cutting-edge tech stack for best results',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to your success',
    },
    {
      icon: Award,
      title: 'Quality Work',
      description: 'Premium solutions that exceed expectations',
    },
    {
      icon: Target,
      title: 'Result Driven',
      description: 'Focused on achieving your business goals',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[rgb(12,86,112)]">Code Crafter</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Based in Lucknow, India, Code Crafter Web Solutions Pvt LTD is a
            leading digital agency specializing in building high-performance
            websites and modern digital solutions for businesses worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-[rgb(12,86,112)] hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-[rgb(12,86,112)] text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <highlight.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our <span className="text-[rgb(12,86,112)]">Team</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.a
              key={index}
              href={member.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative block bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100"
            >
              <div className="relative aspect-square bg-gradient-to-br from-[rgb(12,86,112)] to-[rgb(15,100,130)] rounded-xl mb-4 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-5xl font-bold text-white">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(12,86,112,0.82)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    <Linkedin size={16} />
                    View Profile
                  </span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">
                {member.name}
              </h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
