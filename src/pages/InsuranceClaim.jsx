import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Accordion from '../components/common/Accordion';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';
import { Phone, Search, FileText, CheckCircle, Wrench, Key } from 'lucide-react';

const processSteps = [
  { icon: Phone, title: 'Contact Workshop', description: 'Call us immediately after the incident. Our advisors will guide you on the next immediate steps.' },
  { icon: Search, title: 'Vehicle Inspection', description: 'Bring your car in, or we can arrange towing. We conduct a thorough assessment of the damage.' },
  { icon: FileText, title: 'Insurance Documentation', description: 'Submit your policy, RC, and driving license. We handle the claim intimation and paperwork.' },
  { icon: CheckCircle, title: 'Repair Approval', description: 'The surveyor inspects the vehicle and we coordinate directly with them to get repair approval.' },
  { icon: Wrench, title: 'Repair Work', description: 'Our certified technicians commence structural and cosmetic repairs using OEM standard parts.' },
  { icon: Key, title: 'Delivery', description: 'Pay only the compulsory deductible/depreciation. Drive away with your car looking brand new.' }
];

const faqs = [
  { question: "Do you offer cashless facilities for all insurance providers?", answer: "Yes, we have tie-ups with almost all major insurance companies to provide a 100% cashless claim settlement experience." },
  { question: "What documents do I need to file a claim?", answer: "You will typically need your original driving license, RC book, insurance policy copy, and an FIR in case of severe accidents or third-party damage." },
  { question: "How long does the surveyor approval take?", answer: "Usually, an insurance surveyor inspects the vehicle within 24-48 hours of claim intimation. Approval follows shortly after their report." },
  { question: "Will I have to pay anything from my pocket?", answer: "In a cashless claim, you only pay the compulsory deductible and any depreciation charges as per your specific policy terms. We explain all this before starting repairs." }
];

const InsuranceClaim = () => {
  return (
    <main>
      <PageHero 
        title="Insurance Claim Assistance" 
        description="Experience a completely stress-free, 100% cashless insurance claim process. We handle the paperwork while you focus on peace of mind."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Claim Process */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="How It Works" title="The Claim Process" centered />
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full origin-left scale-x-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-surface lg:bg-transparent p-6 lg:p-0 rounded-xl border border-white/5 lg:border-none text-center relative group"
                  >
                    <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-background group-hover:border-primary transition-colors relative shadow-2xl z-20">
                      <Icon className="w-8 h-8 text-primary" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-background font-bold text-sm border-4 border-background">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Clarifications" title="Frequently Asked Questions" centered />
          <Accordion items={faqs} />
        </div>
      </section>

      <CtaSection />
    </main>
  );
};

export default InsuranceClaim;
