import Link from 'next/link';

const TermsPage = () => {
  return (
    <div className="container max-w-4xl py-12">
      <div className="prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-6 text-center">TokenHawk Terms & Conditions</h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the TokenHawk website
            and services available at
            <a href="https://tokenhawk.xyz/" className="text-blue-600 hover:underline">
              {' '}
              https://tokenhawk.xyz/
            </a>
            (&quot;Platform&quot;), operated by FlexiCheck, Inc., a Delaware corporation with its
            registered office at 131 Continental Dr, Suite 305, Newark, Delaware 19713
            (&quot;FlexiCheck&quot;, &quot;we&quot;, &quot;our&quot;).
          </p>
          <p className="mb-4">
            By creating an account or using TokenHawk, you acknowledge that you have read,
            understood, and agree to be legally bound by these Terms. If you do not agree, you may
            not access or use the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">2. Eligibility and Account Registration</h2>
          <p className="mb-4">
            You must be at least 18 years old and legally capable in your jurisdiction to use
            TokenHawk. Upon registering with an email and password, you agree to provide accurate
            information and maintain its confidentiality. You are solely responsible for activity
            under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">3. Services Offered</h2>
          <p className="mb-2">
            TokenHawk enables users to conduct due diligence checks on cryptocurrency tokens,
            including:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li className="mb-1">Legitimacy assessments</li>
            <li className="mb-1">Adverse media screening</li>
            <li className="mb-1">Security score evaluations</li>
          </ul>
          <p className="mb-4">
            These checks are performed using third-party data sources and proprietary AI models. WE
            DO NOT GUARANTEE ACCURACY. Users must conduct their own research. TokenHawk does not
            offer investment advice or legal counsel.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">4. No Financial, Legal, or Security Advice</h2>
          <p className="mb-4">
            All information on TokenHawk is for informational purposes only. Nothing should be
            construed as financial, investment, legal, or cybersecurity advice. TokenHawk’s scores
            and analyses are automated and based on available data, which may be incomplete or
            out-of-date. Outputs are probabilistic and subject to error. You acknowledge that
            decisions based on TokenHawk data are made at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">5. Pricing, Payments & Refunds</h2>
          <p className="mb-4">
            Some services on TokenHawk are free; others are priced on a per-token basis. ALL
            PAYMENTS ARE FINAL. No refunds or chargebacks are permitted. You are purchasing access
            to gathered information and AI-generated analysis—not guaranteed outcomes. By paying,
            you waive all rights to challenge charges related to token reports.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">6. Data Sources & AI Limitations</h2>
          <p className="mb-4">
            TokenHawk integrates external APIs, scrapers, and public blockchain or web data. We do
            not independently verify the completeness or reliability of third-party content.
            AI-generated scores are illustrative and should not be viewed as conclusive or complete
            assessments.
          </p>
          <p className="mb-4">
            You are encouraged to triangulate with other research tools and to consult legal,
            financial, or security professionals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">7. License & Use Restrictions</h2>
          <p className="mb-2">
            You are granted a limited, personal, non-transferable, and revocable license to use
            TokenHawk for internal research purposes. You may not:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li className="mb-1">Reverse-engineer, scrape, or aggregate Platform content</li>
            <li className="mb-1">Resell, reproduce, or distribute any data or scores</li>
            <li className="mb-1">Bypass access controls or rate limits</li>
            <li className="mb-1">Use TokenHawk to offer competitive or commercial services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">8. Intellectual Property</h2>
          <p className="mb-4">
            All TokenHawk services, tools, branding, and generated content are owned by FlexiCheck
            or licensed. Feedback you provide may be used freely by us. Nothing in these Terms
            transfers any intellectual property rights to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">9. Disclaimer of Warranties</h2>
          <p className="mb-2">
            The Platform, Data, and Content are provided &quot;AS IS&quot; and &quot;AS
            AVAILABLE.&quot; We disclaim all warranties including fitness for purpose, accuracy, or
            availability. We do not guarantee that:
          </p>
          <ul className="list-disc ml-8 mb-4">
            <li className="mb-1">Scores are accurate</li>
            <li className="mb-1">Data is complete or timely</li>
            <li className="mb-1">The Platform is error-free, secure, or uninterrupted</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">10. Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, FlexiCheck shall not be liable for any indirect,
            incidental, or consequential damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">11. Indemnity</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless FlexiCheck and its affiliates against any
            claims or liabilities arising from your use of TokenHawk, your content submissions, or
            your violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">12. Availability & Modifications</h2>
          <p className="mb-4">
            We may modify or suspend Platform features at any time without notice. Access may be
            restricted during maintenance or due to unforeseen disruptions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">13. Termination</h2>
          <p className="mb-4">
            We may suspend or terminate your account without notice if you breach these Terms or
            misuse the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">14. Legal Compliance & Sanctions</h2>
          <p className="mb-4">
            You represent that you are not subject to any sanctions or operating in jurisdictions
            subject to embargoes. We may terminate your use immediately if continued access would
            violate U.S. or international sanctions laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">15. Governing Law & Jurisdiction</h2>
          <p className="mb-4">
            These Terms are governed by Delaware law. Any disputes shall be subject to the exclusive
            jurisdiction of the courts of Delaware, United States.
          </p>
        </section>

        <hr className="my-8 border-t border-gray-300" />

        <div className="mt-8">
          <Link href="/sign-up" className="text-primary hover:underline">
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
