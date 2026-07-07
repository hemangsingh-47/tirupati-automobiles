import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { motion } from 'framer-motion';
import { Shield, Target } from 'lucide-react';
import { getUploadUrl } from '../utils/uploadUrl';
import { useCms } from '../context/CmsContext';

const timeline = [
  { year: '2014', title: 'The Beginning', description: 'Started as a small local garage in Sirohi with just two mechanics.' },
  { year: '2017', title: 'Expansion', description: 'Moved to RIICO Industrial Area and added specialized denting and painting booths.' },
  { year: '2020', title: 'Multi Brand Mastery', description: 'Partnered with major OEM parts suppliers to become a certified multi-brand service center.' },
  { year: '2023', title: 'Digital Transformation', description: 'Introduced computerized diagnostics and advanced structural repair equipment.' },
  { year: 'Present', title: 'Leading Workshop', description: 'Serving over 5000+ satisfied customers with 100% cashless insurance claim facilities.' }
];

const leadershipTeam = [
  {
    name: "Shailendra Singh Dabi",
    role: "Co-Founder",
    description: "As the Co-Founder of Tirupati Automobiles, Shailendra Singh Dabi is dedicated to delivering reliable, transparent, and high-quality automobile services. His vision is to combine trusted workmanship with modern customer service to create a workshop that customers can depend on.",
    image: "/team/shailendra-singh-dabi.jpg"
  },
  {
    name: "Narayan Singh Dabi",
    role: "Mentor & Technical Guide",
    description: "With years of practical experience in the automobile industry, Narayan Singh Dabi has guided the workshop with his technical knowledge, discipline, and commitment to quality. His mentorship has played a key role in the growth and success of Tirupati Automobiles.",
    image: "/team/narayan-singh-dabi.jpg"
  },
  {
    name: "Hemang Singh Solanki",
    role: "Full Stack MERN Developer",
    description: "Designed and developed the complete Tirupati Automobiles digital platform using the MERN Stack. Built the customer portal, admin dashboard, CMS, booking management, vehicle management system, insurance module, and responsive website to deliver a modern digital experience.",
    image: "/team/hemang-singh-solanki.jpg"
  }
];


const About = () => {
  const { content, team } = useCms();
  return (
    <main>
      <PageHero 
        title="About Us" 
        description="Learn more about our journey, our values, and why we are Sirohi's most trusted multi-brand car workshop."
        image="https://images.unsplash.com/photo-1504222490345-c075b6008014?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Company Story & Overview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <SectionHeading subtitle="Our Story" title={content?.aboutTitle || "A Legacy of Excellence in Automobile Care"} />
              <div className="text-gray text-lg leading-relaxed space-y-6">
                <p className="whitespace-pre-wrap">
                  {content?.aboutDescription || "Established in the heart of Sirohi, Tirupati Automobiles has grown from a humble repair shop into a state-of-the-art multi-brand workshop. We built our reputation on a foundation of trust, transparency, and technical superiority."}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
                <img 
                  src="/workshop-reception.jpg"
                  alt="Tirupati Automobiles Workshop" 
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-10 rounded-2xl border border-white/10"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">Our Mission</h3>
              <p className="text-gray leading-relaxed">
                To provide honest, reliable, and premium quality car repair services. We aim to educate our customers, ensure their safety on the road, and deliver an unmatched service experience that redefines the local automotive industry.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background p-10 rounded-2xl border border-white/10"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white mb-4">Our Vision</h3>
              <p className="text-gray leading-relaxed">
                To become the most trusted and universally recognized automobile service brand in Rajasthan, known for setting the benchmark in customer satisfaction, technological integration, and ethical business practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Our History" title="The Journey So Far" centered />
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-surface text-primary font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/10 bg-surface shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-xl">{item.title}</h4>
                    <span className="text-primary font-bold font-heading">{item.year}</span>
                  </div>
                  <p className="text-gray text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="py-24 bg-surface border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Meet the People Behind <span className="text-primary">Tirupati Automobiles</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray leading-relaxed"
            >
              Dedicated professionals committed to delivering trusted automobile care and building a premium digital experience.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {leadershipTeam.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-background rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-colors shadow-2xl relative overflow-hidden group"
              >
                {/* Accent Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 border-surface shadow-xl relative shrink-0"
                  >
                    <div className="absolute inset-0 border-2 border-primary rounded-full z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white font-heading mb-1">{member.name}</h3>
                  <p className="text-primary font-medium tracking-wide text-sm mb-6 uppercase tracking-wider">{member.role}</p>
                  
                  <div className="w-12 h-[2px] bg-white/10 mb-6 group-hover:bg-primary/50 transition-colors duration-300"></div>
                  
                  <p className="text-gray text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic CMS Team Section */}
      {team && team.length > 0 && (
        <section className="py-24 bg-surface border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Our Experts" title="Meet The Team" centered />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div 
                  key={member._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl overflow-hidden border border-white/5 group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white/5 relative">
                    {member.imageUrl ? (
                      <img 
                        src={getUploadUrl(member.imageUrl)} 
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray">No Image</div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white font-heading">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                    {member.experience && (
                      <p className="text-xs text-gray">{member.experience} Experience</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhyChooseUs />
      <CtaSection />
    </main>
  );
};

export default About;
