import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Accordion from '../components/common/Accordion';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';

import { useCms } from '../context/CmsContext';

const Faq = () => {
  const { faqs } = useCms();
  return (
    <main>
      <PageHero 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about our services, booking process, and workshop policies."
        image="https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
      />

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="text-center">
            <SectionHeading subtitle="Got Questions?" title="We Have Answers" centered />
          </div>

          {faqs && faqs.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Accordion items={faqs} />
            </motion.div>
          ) : (
            <div className="text-center text-gray">No FAQs available at the moment.</div>
          )}
          
        </div>
      </section>

      <CtaSection />
    </main>
  );
};

export default Faq;
