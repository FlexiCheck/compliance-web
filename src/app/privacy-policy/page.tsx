import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="container max-w-4xl py-12">
      <div className="prose prose-sm max-w-none">
        <h1 className="text-3xl font-bold mb-6 text-center">TokenHawk Privacy Policy</h1>
        <p className="mb-4">
          FlexiCheck, Inc. respects your privacy. This Privacy Policy explains how we collect, use,
          disclose, and protect your personal data in accordance with the General Data Protection
          Regulation (GDPR).
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Data Controller</h2>
          <p className="mb-4">
            FlexiCheck, Inc. is the controller of your personal data. Contact:{' '}
            <a href="mailto:tokenhawk@flexicheck.ai" className="text-blue-600 hover:underline">
              tokenhawk@flexicheck.ai
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Data We Collect</h2>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Email address</li>
            <li className="mb-1">Hashed password</li>
            <li className="mb-1">IP address, browser metadata</li>
            <li className="mb-1">Payment transaction metadata (if applicable)</li>
            <li className="mb-1">
              Usage logs and behavioral data (for performance, security, and support)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Legal Basis for Processing</h2>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Contractual necessity (e.g., account access)</li>
            <li className="mb-1">Legitimate interest (e.g., analytics, fraud prevention)</li>
            <li className="mb-1">Consent (e.g., marketing)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Use of Data</h2>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Deliver and improve services</li>
            <li className="mb-1">Communicate updates</li>
            <li className="mb-1">Detect misuse and secure the Platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Data Sharing</h2>
          <p className="mb-2">We may share limited personal data with:</p>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Hosting and infrastructure providers</li>
            <li className="mb-1">Payment processors</li>
            <li className="mb-1">Analytics and performance tools</li>
            <li className="mb-1">Regulatory bodies (when legally required)</li>
          </ul>
          <p className="mb-4">We do not sell your data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. International Transfers</h2>
          <p className="mb-4">
            Data may be transferred outside the EU, including to the U.S., with appropriate
            safeguards (e.g., SCCs).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">7. Retention</h2>
          <p className="mb-4">
            User data is retained as long as necessary to deliver the services or comply with legal
            obligations. We retain personal data for the duration of your account’s existence and
            thereafter only as necessary for legitimate business purposes or legal requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">8. Account & Data Deletion Requests</h2>
          <p className="mb-2">
            To request deletion of your account and all associated personal data, you must send an
            email to{' '}
            <a href="mailto:tokenhawk@flexicheck.ai" className="text-blue-600 hover:underline">
              tokenhawk@flexicheck.ai
            </a>{' '}
            from the email address linked to your account.
          </p>
          <p className="mb-2">
            We may request identity verification to ensure the integrity of the request.
          </p>
          <p className="mb-2">
            Once verified, we will initiate deletion and process the request within 60 days.
          </p>
          <p className="mb-2">
            Data may be retained beyond this period only where required by legal, accounting, or
            regulatory obligations.
          </p>
          <p className="mb-4">
            After deletion, we will either anonymize or securely erase your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">9. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Access</li>
            <li className="mb-1">Rectification</li>
            <li className="mb-1">Deletion</li>
            <li className="mb-1">Restriction or objection</li>
            <li className="mb-1">Data portability</li>
            <li className="mb-1">Lodge complaints with a supervisory authority</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">10. Cookies</h2>
          <p className="mb-2">We use:</p>
          <ul className="list-disc ml-6 mb-4">
            <li className="mb-1">Essential cookies for login/security</li>
            <li className="mb-1">Analytics cookies (with consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">11. Security</h2>
          <p className="mb-2">
            We implement encryption, access control, logging, and monitoring to protect your data
            against unauthorized access, misuse, or breach.
          </p>
          <p className="mb-4">
            Only authorized personnel with a strict need-to-know basis can access your personal
            data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">12. Changes</h2>
          <p className="mb-2">
            We may amend this policy periodically to reflect updates in laws, technologies, or our
            operations.
          </p>
          <p className="mb-4">Notice will be provided where legally required.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">13. Contact</h2>
          <p className="mb-4">
            For questions or privacy-related requests, email:{' '}
            <a href="mailto:tokenhawk@flexicheck.ai" className="text-blue-600 hover:underline">
              tokenhawk@flexicheck.ai
            </a>
          </p>
        </section>

        <div className="mt-8">
          <Link href="/sign-up" className="text-primary hover:underline">
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
