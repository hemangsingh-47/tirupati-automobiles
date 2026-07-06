import PageHero from '../components/common/PageHero';

const PrivacyPolicy = () => {
  return (
    <main>
      <PageHero 
        title="Privacy Policy" 
        description="How we collect, use, and protect your personal information."
      />

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-yellow max-w-none">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">1. Information We Collect</h2>
            <p className="text-gray leading-relaxed mb-8">
              At Tirupati Automobiles, we collect personal information that you provide to us directly, such as when you book a service, fill out a contact form, or interact with our team. This may include your name, phone number, email address, vehicle details (make, model, registration number), and insurance information.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">2. How We Use Your Information</h2>
            <p className="text-gray leading-relaxed mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray space-y-2 mb-8">
              <li>To schedule and process your vehicle service or repair.</li>
              <li>To communicate with you regarding your vehicle's status, estimates, and invoices.</li>
              <li>To facilitate cashless insurance claims with your provider.</li>
              <li>To send you service reminders, promotional offers, and updates (only if you have opted in).</li>
              <li>To improve our services and workshop operations.</li>
            </ul>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">3. Data Security</h2>
            <p className="text-gray leading-relaxed mb-8">
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We restrict access to your personal data to employees who need it to perform their job duties.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">4. Sharing of Information</h2>
            <p className="text-gray leading-relaxed mb-8">
              We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted third-party service providers (such as insurance companies or OEM parts suppliers) strictly for the purpose of fulfilling our services to you. We may also disclose information if required by law.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">5. Changes to This Policy</h2>
            <p className="text-gray leading-relaxed mb-8">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any updates will be posted on this page with a revised "Last Updated" date.
            </p>

            <p className="text-sm text-gray/60 mt-12 pt-8 border-t border-white/10">
              Last Updated: July 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
