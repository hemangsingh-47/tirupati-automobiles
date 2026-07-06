import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import Accordion from '../components/common/Accordion';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';

const faqCategories = [
  {
    title: 'General Service',
    questions: [
      { question: "What is included in a general car service?", answer: "A general service includes an engine oil change, oil filter replacement, air filter cleaning/replacement, brake inspection, fluid level top-ups, battery check, and a complete 360-degree vehicle inspection." },
      { question: "How often should I service my car?", answer: "We recommend a basic service every 10,000 kms or 6 months, whichever comes first. However, this may vary based on your car manufacturer's specific guidelines." },
      { question: "Do you service all car brands?", answer: "Yes, we are a multi-brand workshop equipped with the latest diagnostic tools and trained technicians to handle all major domestic and luxury car brands." }
    ]
  },
  {
    title: 'Booking & Payments',
    questions: [
      { question: "How do I book an appointment?", answer: "You can book an appointment by calling us directly, sending a WhatsApp message, or filling out the contact form on our website." },
      { question: "What payment methods do you accept?", answer: "We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and cash." },
      { question: "Do you provide estimates before starting the work?", answer: "Absolutely. After inspecting your vehicle, we provide a detailed, transparent estimate. We only begin work once you approve the cost." }
    ]
  },
  {
    title: 'Repairs & Warranty',
    questions: [
      { question: "Do you use genuine spare parts?", answer: "Yes, we strictly use 100% genuine OEM (Original Equipment Manufacturer) or OES parts to ensure the highest quality and longevity for your vehicle." },
      { question: "Is there a warranty on your repairs?", answer: "Yes, we offer a standard warranty on all our workmanship and the spare parts replaced, subject to the manufacturer's terms and conditions." },
      { question: "Can you fix major accident damage?", answer: "Yes, we have a dedicated body shop with specialized structural repair equipment, dent pulling tools, and a computerized paint matching booth to restore heavily damaged vehicles." }
    ]
  }
];

const Faq = () => {
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

          {faqCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-primary rounded-full mr-4"></span>
                {category.title}
              </h3>
              <Accordion items={category.questions} />
            </motion.div>
          ))}
          
        </div>
      </section>

      <CtaSection />
    </main>
  );
};

export default Faq;
