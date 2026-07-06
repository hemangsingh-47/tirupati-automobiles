import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import CtaSection from '../components/home/CtaSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { motion } from 'framer-motion';
import { Shield, Target } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const timeline = [
  { year: '2014', title: 'The Beginning', description: 'Started as a small local garage in Sirohi with just two mechanics.' },
  { year: '2017', title: 'Expansion', description: 'Moved to RIICO Industrial Area and added specialized denting and painting booths.' },
  { year: '2020', title: 'Multi Brand Mastery', description: 'Partnered with major OEM parts suppliers to become a certified multi-brand service center.' },
  { year: '2023', title: 'Digital Transformation', description: 'Introduced computerized diagnostics and advanced structural repair equipment.' },
  { year: 'Present', title: 'Leading Workshop', description: 'Serving over 5000+ satisfied customers with 100% cashless insurance claim facilities.' }
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
                  src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Workshop Overview" 
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

      {/* Team Section */}
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
                        src={`http://localhost:5000/uploads/${member.imageUrl}`} 
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
