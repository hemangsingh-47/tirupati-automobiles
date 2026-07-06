import PageHero from '../components/common/PageHero';

const Terms = () => {
  return (
    <main>
      <PageHero 
        title="Terms & Conditions" 
        description="Please read these terms carefully before using our services."
      />

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-yellow max-w-none">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">1. Agreement to Terms</h2>
            <p className="text-gray leading-relaxed mb-8">
              By accessing our website and utilizing the services provided by Tirupati Automobiles, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">2. Service Estimates & Authorization</h2>
            <p className="text-gray leading-relaxed mb-8">
              All initial repair estimates are approximations based on visual inspections. We will not begin any major repair work without your explicit authorization. If additional damage is discovered during repairs, we will contact you immediately for secondary authorization before proceeding.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">3. Payment Terms</h2>
            <p className="text-gray leading-relaxed mb-8">
              Payment is due in full upon completion of services and prior to the release of the vehicle. We accept cash, credit/debit cards, and UPI payments. For insurance claims, the customer is strictly responsible for paying any deductibles, depreciations, and non-covered parts as dictated by the insurance provider.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">4. Warranty Limitations</h2>
            <p className="text-gray leading-relaxed mb-8">
              We offer a limited warranty on labor and parts provided directly by our workshop. This warranty does not cover parts supplied by the customer, damage resulting from subsequent accidents, misuse, or failure to perform recommended routine maintenance.
            </p>

            <h2 className="text-3xl font-heading font-bold text-white mb-6">5. Vehicle Storage</h2>
            <p className="text-gray leading-relaxed mb-8">
              Vehicles left at our facility for more than 48 hours after you have been notified of repair completion may be subject to a daily storage fee. Tirupati Automobiles is not responsible for loss or damage to personal items left in the vehicle.
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

export default Terms;
